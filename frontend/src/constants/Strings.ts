import { TimesheetError } from "../store/slices/timesheetSlice";
import { TimesheetErrorType } from "../types/TimesheetErrorType";

// InputTextBox
export const inputLabel = "Raw Timesheet";
export const inputPlaceholder = "Paste your raw timesheet here."
export const clearButtonTooltip = "Clear"

// OutputTextBox
export const outputLabel = "Parsed Timesheet";
export const outputPlaceholder = "Click → to parse timesheet."
export const totalTimeLabel = "Total time: {totalTime}"
export const copyButtonTooltip = "Copy"

// ParseButton
export const parseButtonString = "Parse";
export const parseButtonTooltip = "Parse timesheet"

// Errors
const missingTaskNameMessage = "Error: Missing task name near '{line}'."
const missingOrInvalidTimespanMessage = "Error: Missing or invalid timespan near '{line}'."
const timespanEqualToZeroMessage = "Error: Timespan equal to zero near '{line}'."

export function getErrorMessage(error: TimesheetError): string {
    var errorMessage = "";
    switch (error.errorType) {
        case TimesheetErrorType.MissingTaskName: {
            errorMessage = missingTaskNameMessage.replace("{line}", error.line);
            break;
        }
        case TimesheetErrorType.MissingOrInvalidTimespan: {
            errorMessage = missingOrInvalidTimespanMessage.replace("{line}", error.line);
            break;
        }
        case TimesheetErrorType.TimespanEqualToZero: {
            errorMessage = timespanEqualToZeroMessage.replace("{line}", error.line);
            break;
        }
        default: {
            errorMessage = "Unknown error occurred."
            break;
        }
    }

    return errorMessage
}
