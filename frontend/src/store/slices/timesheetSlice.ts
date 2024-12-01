import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const timespanRegex = /([1-9][\d]?:[\d]+)\s*-\s*([1-9][\d]?:[\d]+)/;

export interface Task {
    name: string,
    hours: number
}

export interface TimesheetState {
    input: string;
    timesheet: Array<Task>;
    output: string;
    totalTime: number | null
}

const initialState: TimesheetState = {
    input: "",
    timesheet: Array<Task>(),
    output: "",
    totalTime: 0
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
            };
        },
        setOutput: (state) => {
            var parsedTimesheet = parseTimesheet(state.input)
            var generatedOutput = generateOutput(parsedTimesheet)
            var totalTime = calculateTotalTime(parsedTimesheet)

            return {
                ...state,
                timesheet: parsedTimesheet,
                output: generatedOutput,
                totalTime: totalTime
            };
        },
        clearInput: (_) => {
            return {
                input: "",
                timesheet: Array<Task>(),
                output: "",
                totalTime: 0,
            };
        },
        clearOutput: (state) => {
            return {
                ...state,
                timesheet: Array<Task>(),
                output: "",
                totalTime: 0,
            };
        }
    }
});

/// Timesheet parsing functions

// TODO: break this function down into more testable functions, 
// add exception handling and validation
export function parseTimesheet(rawTimesheet: string): Array<Task> {
    // Split the raw timesheet string into individual lines
    let lines = rawTimesheet.split('\n').map((line) => line.trim())

    let tasksMap = new Map<string, number>();
    let currentTask = "";

    for (const line of lines) {
        // Skip empty lines
        if (line === "") {
            continue;
        }

        const timespanMatch = line.match(timespanRegex);
        if (timespanMatch) {
            const start = timespanMatch[1];
            const end = timespanMatch[2];

            let startTime = parseTime(start);
            let endTime = parseTime(end);

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
            const durationHours = durationMilliseconds / (1000 * 60 * 60); // Convert from milliseconds to hours

            if (tasksMap.has(currentTask)) {
                var currentDuration = tasksMap.get(currentTask) ?? 0
                tasksMap.set(currentTask, currentDuration + durationHours);
            } else {
                tasksMap.set(currentTask, durationHours);
            }
        }
        else {
            currentTask = line.trim();
            if (!tasksMap.has(currentTask)) {
                tasksMap.set(currentTask, 0);
            }
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
 * Given a string in this format "XX:xx", convert it into a Date
 * where the time portion where the hour value is XX and the minute
 * value is xx
 * @param timeStr a string in the format "XX:xx"
 * @returns 
 */
export function parseTime(timeStr: string): Date {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
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

export const { setInput, setOutput, clearInput, clearOutput } = timesheetSlice.actions

export const selectInput = (state: RootState) => state.timesheet.input;
export const selectOutput = (state: RootState) => state.timesheet.output;
export const selectTotalTime = (state: RootState) => state.timesheet.totalTime;

export default timesheetSlice.reducer
