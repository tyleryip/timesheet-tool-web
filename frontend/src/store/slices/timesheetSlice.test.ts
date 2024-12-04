import { TimesheetErrorType } from "../../types/TimesheetErrorType";
import { calculateDurationInHours, calculateTotalTime, parseTime, parseTimesheet, Task, TimesheetError, validateTimesheet } from "./timesheetSlice";

describe('timesheet parsing functions', () => {
    describe('parseTime(timeStr: string): Date', () => {
        it('should return valid time', () => {
            // Arrange
            var timeString = "1:00"

            var expected = new Date()
            expected.setHours(1, 0, 0, 0);

            // Act
            var actual = parseTime(timeString)

            // Assert
            expect(actual).toEqual(expected);
        });

        it('should return valid time with no minute value', () => {
            // Arrange
            var timeString = "2"

            var expected = new Date()
            expected.setHours(2, 0, 0, 0);

            // Act
            var actual = parseTime(timeString)

            // Assert
            expect(actual).toEqual(expected);
        });
    });

    describe('parseTimesheet(rawTimesheet: string): Array<Task>', () => {
        it('should parse one task', () => {
            // Arrange
            var rawTimesheet =
                `
            Testing\n
            9:00-10:00\n
            `

            var expected = Array<Task>();
            expected.push({
                name: "Testing",
                hours: 1
            })

            // Act
            var actual = parseTimesheet(rawTimesheet)

            // Assert
            expect(actual).toEqual(expected);
        });

        it('should parse one task with no minute values', () => {
            // Arrange
            var rawTimesheet =
                `
            Testing\n
            9-10\n
            `

            var expected = Array<Task>();
            expected.push({
                name: "Testing",
                hours: 1
            })

            // Act
            var actual = parseTimesheet(rawTimesheet)

            // Assert
            expect(actual).toEqual(expected);
        });

        it('should parse one task with multiple windows', () => {
            // Arrange
            var rawTimesheet =
                `
            Testing\n
            9:00-10:00\n
            11:00-11:30
            `

            var expected = Array<Task>();
            expected.push({
                name: "Testing",
                hours: 1.5
            })

            // Act
            var actual = parseTimesheet(rawTimesheet)

            // Assert
            expect(actual).toEqual(expected);
        });

        it('should parse one task with multiple windows and mixed formats', () => {
            // Arrange
            var rawTimesheet =
                `
            Testing\n
            9-10\n
            10:30-11\n
            11:00 - 12:00
            12:30 - 1
            1- 2
            2:30 -3:00
            `

            var expected = Array<Task>();
            expected.push({
                name: "Testing",
                hours: 4.5
            })

            // Act
            var actual = parseTimesheet(rawTimesheet)

            // Assert
            expect(actual).toEqual(expected);
        });

        it('should parse two tasks', () => {
            // Arrange
            var rawTimesheet =
                `
            Testing\n
            9:00-10:00\n
            \n
            Standup
            10:00-10:30\n
            `

            var expected = Array<Task>();
            expected.push({
                name: "Testing",
                hours: 1
            })
            expected.push({
                name: "Standup",
                hours: 0.5
            })

            // Act
            var actual = parseTimesheet(rawTimesheet)

            // Assert
            expect(actual).toEqual(expected);
        });

        it('should parse task with no time', () => {
            // Arrange
            var rawTimesheet =
                `
            Testing\n
            `

            var expected = Array<Task>();
            expected.push({
                name: "Testing",
                hours: 0
            })

            // Act
            var actual = parseTimesheet(rawTimesheet)

            // Assert
            expect(actual).toEqual(expected);
        });
    })

    describe('calculateTotalTime(tasks: Array<Task>): number', () => {
        it('should calculate the correct total time', () => {
            // Arrange
            var timesheet = Array<Task>();

            timesheet.push({
                name: "Task 1",
                hours: 1
            });
            timesheet.push({
                name: "Task 2",
                hours: 2.5
            });
            timesheet.push({
                name: "Task 3",
                hours: 3.75
            });
            timesheet.push({
                name: "Task 4",
                hours: 0
            });

            // Act
            var actual = calculateTotalTime(timesheet)

            // Assert
            expect(actual).toEqual(7.25)
        });

        it('should calculate the correct total time when timesheet is empty', () => {
            // Arrange
            var timesheet = Array<Task>();

            // Act
            var actual = calculateTotalTime(timesheet)

            //Assert
            expect(actual).toEqual(0)
        });
    });

    describe('calculateDurationInHours(timespanStart: string, timespanEnd: string): number', () => {
        it('should calculate the correct duration', () => {
            // Arrange
            var start = "8:00"
            var end = "9:30"

            var expected = 1.5

            // Act
            var actual = calculateDurationInHours(start, end)

            // Assert
            expect(actual).toBe(expected)
        });

        it('should calculate the correct duration when task starts at noon and ends after noon', () => {
            // Arrange
            var start = "12:00"
            var end = "1:30"

            var expected = 1.5

            // Act
            var actual = calculateDurationInHours(start, end)

            // Assert
            expect(actual).toBe(expected)
        });

        it('should calculate the correct duration when task starts at noon and ends during noon', () => {
            // Arrange
            var start = "12:00"
            var end = "12:45"

            var expected = 0.75

            // Act
            var actual = calculateDurationInHours(start, end)

            // Assert
            expect(actual).toBe(expected)
        });

        it('should calculate the correct duration when task in the morning and ends in the afternoon', () => {
            // Arrange
            var start = "11:00"
            var end = "1:45"

            var expected = 2.75

            // Act
            var actual = calculateDurationInHours(start, end)

            // Assert
            expect(actual).toBe(expected)
        });
    });

    describe('validateTimesheet(rawTimesheet: string): Array<TimesheetError>', () => {
        it('should catch a missing task name error', () => {
            // Arrange
            var timesheet =
                `
            10-11:30
            `

            var expected = Array<TimesheetError>()
            expected.push({
                line: "10-11:30",
                errorType: TimesheetErrorType.MissingTaskName
            })

            // Act
            var actual = validateTimesheet(timesheet)

            // Assert
            expect(actual).toEqual(expected)
        })

        it('should catch a timespan equal to zero error', () => {
            // Arrange
            var timesheet =
                `
            Task
            10-10
            `

            var expected = Array<TimesheetError>()
            expected.push({
                line: "10-10",
                errorType: TimesheetErrorType.TimespanEqualToZero
            })

            // Act
            var actual = validateTimesheet(timesheet)

            // Assert
            expect(actual).toEqual(expected)
        })

        it('should catch a missing or invalid timespan error', () => {
            // Arrange
            var timesheet =
                `
            Task A

            Task B
            1-111111
            `

            var expected = Array<TimesheetError>()
            expected.push({
                line: "Task B",
                errorType: TimesheetErrorType.MissingOrInvalidTimespan
            })
            expected.push({
                line: "1-111111",
                errorType: TimesheetErrorType.MissingOrInvalidTimespan
            })

            // Act
            var actual = validateTimesheet(timesheet)

            // Assert
            expect(actual).toEqual(expected)
        })
    })
});