import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const timespanRegex = new RegExp("^([1-9][\d]?\:[\d]+)\-([1-9][\d]?\:[\d]+)$");

export interface TimesheetState {
    input: string;
    output: string;
}

const initialState: TimesheetState = {
    input: "",
    output: "",
};

export const timesheetSlice = createSlice({
    name: "timesheet",
    initialState,
    reducers: {
        changeInput: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                input: action.payload,
            };
        },
        parseInput: (state) => {
            return {
                ...state,
                output: parseTimesheet(state.input)
            };
        },
        clearOutput: (state) => {
            return {
                ...state,
                output: ""
            };
        }
    }
});

// Helper function to convert a time string "HH:mm" to a Date object
function parseTime(timeStr: string): Date {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // Set hours and minutes
    return date;
}

function parseTimesheet(rawTimesheet: string): string {
    let lines = rawTimesheet.split('\n')
    let output = "";
    let totalTime = 0;

    const tasks: { [key: string]: number } = {};
    let currentTask = "";

    // Parse line by line to extract tasks and convert timespans into durations
    for (const line of lines) {
        const timespanMatch = line.match(timespanRegex);

        // Skip empty lines
        if (line.trim() === "") {
            continue;
        }

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

            const durationInMillis = endTime.getTime() - startTime.getTime();
            const durationInHours = durationInMillis / (1000 * 60 * 60); // Convert from milliseconds to hours

            if (tasks[currentTask] !== undefined) {
                tasks[currentTask] += durationInHours;
            } else {
                tasks[currentTask] = durationInHours;
            }

            totalTime += durationInHours;

        } else {
            currentTask = line.trim();
            if (!(currentTask in tasks)) {
                tasks[currentTask] = 0;
            }
        }
    }

    // Create the output string from the tasks
    for (const [key, value] of Object.entries(tasks)) {
        // Handle edge case for singular hour
        if (value !== 1) {
            output += `${key} (${value} hours)\n\n`;
        } else {
            output += `${key} (1 hour)\n\n`;
        }
    }

    // Show total time at the end for validation
    output += `TOTAL TIME: ${totalTime} hours`;

    return output;
}

export const { changeInput, parseInput, clearOutput } = timesheetSlice.actions

export const selectInput = (state: RootState) => state.timesheet.input;
export const selectOutput = (state: RootState) => state.timesheet.output;

export default timesheetSlice.reducer
