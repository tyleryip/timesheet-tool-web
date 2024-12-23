import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TimesheetErrorType } from "../../types/TimesheetErrorType";

const timespanRegex = /^(\d{1,2}(?::\d{2})?)\s*-\s*(\d{1,2}(?::\d{2})?)$/;

export interface Task {
    name: string,
    hours: number
}

export interface TimesheetError {
    line: string,
    errorType: TimesheetErrorType
}

export interface TimesheetState {
    input: string;
    timesheet: Array<Task>;
    output: string;
    totalTime: number | null
    errors: Array<TimesheetError>;
}

const initialState: TimesheetState = {
    input: "",
    timesheet: Array<Task>(),
    output: "",
    totalTime: 0,
    errors: Array<TimesheetError>()
};

export const timesheetSlice = createSlice({
    name: "timesheet",
    initialState,
    reducers: {
        setInput: (_, action: PayloadAction<string>) => {
            return {
                input: action.payload,
                timesheet: Array<Task>(),
                output: "",
                totalTime: 0,
                errors: Array<TimesheetError>()
            };
        },
        validateInput: (state) => {
            var errors = validateTimesheet(state.input)

            return {
                ...state,
                errors: errors
            }
        },
        setOutput: (state) => {
            var parsedTimesheet = parseTimesheet(state.input)
            var generatedOutput = generateOutput(parsedTimesheet)
            var totalTime = calculateTotalTime(parsedTimesheet)

            return {
                ...state,
                timesheet: parsedTimesheet,
                output: generatedOutput,
                totalTime: totalTime,
                errors: Array<TimesheetError>()
            };
        },
        clearInput: (_) => {
            return {
                input: "",
                timesheet: Array<Task>(),
                output: "",
                totalTime: 0,
                errors: Array<TimesheetError>()
            };
        },
        clearOutput: (state) => {
            return {
                ...state,
                timesheet: Array<Task>(),
                output: "",
                totalTime: 0,
                errors: Array<TimesheetError>()
            };
        }
    }
});

/// Timesheet parsing functions

/**
 * Given a string representing a raw timesheet, validate it errors that would prevent successful parsing
 * and return a list of those errors.
 * @param rawTimesheet a string, representing a raw timesheet
 * @returns an array of errors
 */
export function validateTimesheet(rawTimesheet: string): Array<TimesheetError> {
    let errors = Array<TimesheetError>();

    // Split the raw timesheet string into individual lines
    let lines = rawTimesheet.split('\n').map((line) => line.trim())

    let currentTask = "";
    let currentDuration = 0;
    for (const line of lines) {
        if (line === "") {
            // Skip empty lines
            continue;
        }

        // Validate timespan lines
        const timespanMatch = line.match(timespanRegex);
        if (timespanMatch) {
            // Rule 1: Timespans must be proceeded by a task name
            if (currentTask === "") {
                errors.push({
                    line: line,
                    errorType: TimesheetErrorType.MissingTaskName
                })
            }

            const start = timespanMatch[1];
            const end = timespanMatch[2];

            var durationHours = calculateDurationInHours(start, end)

            if (durationHours === 0) {
                // Rule 2: All timespans must be greater than zero
                errors.push({
                    line: line,
                    errorType: TimesheetErrorType.TimespanEqualToZero
                })
            }

            currentDuration += durationHours;

            continue;
        }

        // Validate task lines

        // Rule 2: All tasks must have a non-zero duration,
        // except for the first task which may have duration of zero until its timespan is reached)
        if ((currentTask !== "" && line !== currentTask && currentDuration === 0)
            || (lines.length === 1)) {
            errors.push({
                line: line,
                errorType: TimesheetErrorType.MissingOrInvalidTimespan
            })
        }

        // Reset the current task and current duration
        currentTask = line.trim();
        currentDuration = 0;
    }

    return errors
}

/**
 * Given a string representing a raw timesheet, parse it into an array of tasks.
 * @param rawTimesheet a string, representing the raw timesheet
 * @returns an array of tasks, representing the parsed content of the timesheet
 */
export function parseTimesheet(rawTimesheet: string): Array<Task> {
    let tasksMap = new Map<string, number>();

    // Split the raw timesheet string into individual lines
    let lines = rawTimesheet.split('\n').map((line) => line.trim())

    let currentTask = "";
    for (const line of lines) {
        if (line === "") {
            // Skip empty lines
            continue;
        }

        const timespanMatch = line.match(timespanRegex);
        if (timespanMatch) {
            const start = timespanMatch[1];
            const end = timespanMatch[2];

            var durationHours = calculateDurationInHours(start, end)

            // Add duration to task map
            var currentDuration = tasksMap.get(currentTask) ?? 0
            tasksMap.set(currentTask, currentDuration + durationHours);

            continue;
        }

        // Add task to task map
        currentTask = line.trim();
        if (!tasksMap.has(currentTask)) {
            tasksMap.set(currentTask, 0);
        }
    }

    // Convert task map into array
    let tasksArray = Array<Task>();
    tasksMap.forEach((value, key) => {
        tasksArray.push({
            name: key,
            hours: value
        })
    });

    return tasksArray
}

/**
 * Given two strings in this format XX:xx, convert them into
 * a timespan and a return the duration between them.
 * @param timespanStart a string in the format XX:xx
 * @param timespanEnd a string in the format XX:xx
 * @returns the duration between the timespanStart and timespanEnd
 */
export function calculateDurationInHours(timespanStart: string, timespanEnd: string): number {
    const startTime = parseTime(timespanStart);
    const endTime = parseTime(timespanEnd);

    // Edge case: if task only starts during the noon hour and does not end, 
    // we need to convert the start time hour to 0.
    if (startTime.getHours() === 12 && endTime.getHours() !== 12) {
        startTime.setHours(0); // Adjust start time to 0 hours
    }

    // Edge case: if task starts during the noon hour AND ends during the noon hour, 
    // we need to convert both the start and end time to 0.
    if (startTime.getHours() === 12 && endTime.getHours() === 12) {
        startTime.setHours(0);
        endTime.setHours(0);
    }

    // Edge case: if task starts in morning and ends in afternoon, add 12 hours to the end time
    if (endTime < startTime) {
        endTime.setHours(endTime.getHours() + 12);
    }

    const durationMilliseconds = endTime.getTime() - startTime.getTime();

    // Convert from milliseconds to hours
    return durationMilliseconds / (1000 * 60 * 60);
}

/**
 * Given a string in this format "XX:xx", convert it into a Date
 * where the time portion where the hour value is XX and the minute
 * value is xx
 * @param timeStr a string in the format "XX:xx"
 * @returns 
 */
export function parseTime(timeStr: string): Date {
    const date = new Date();

    const [hours, minutes] = timeStr.includes(':') ?
        timeStr.split(':').map(Number) :
        [Number(timeStr), 0];

    date.setHours(hours, minutes, 0, 0);
    return date;
}

/**
 * Given a timesheet, generate a parsed timesheet output string
 * @param timesheet 
 * @returns a string representing the parsed output of the timesheet
 */
export function generateOutput(timesheet: Array<Task>): string {
    let output = "";
    timesheet.forEach((task: Task) => {
        if (task.hours === 0) {
            // Ignore tasks with no durations
            return;
        }

        output += `${task.name} (${getHoursString(task.hours)})\n\n`;
    });

    return output.trim();
}

/**
 * Given a number representing hours, returns a string that denotes the number of hour(s), 
 * accounting for plural or singular values
 * @param hours
 * @returns a string with the number of hours, empty string if hours is zero
 */
export function getHoursString(hours: number): string {
    switch (hours) {
        case 0:
            return "";
        case 1:
            return "1 hour"
        default:
            return `${Number(hours.toFixed(2))} hours`
    }
}

/**
 * Given a timesheet, returns the sum of the hours
 * @param timesheet
 * @returns the sum of the hours in the timesheet, zero if the timesheet is empty
 */
export function calculateTotalTime(timesheet: Array<Task>): number {
    let totalTime = 0;
    timesheet.forEach((task: Task) => {
        totalTime += task.hours
    });

    return totalTime;
}

export const { setInput, setOutput, validateInput, clearInput, clearOutput } = timesheetSlice.actions

export const selectInput = (state: RootState) => state.timesheet.input;
export const selectOutput = (state: RootState) => state.timesheet.output;
export const selectTotalTime = (state: RootState) => state.timesheet.totalTime;
export const selectErrors = (state: RootState) => state.timesheet.errors;

export default timesheetSlice.reducer
