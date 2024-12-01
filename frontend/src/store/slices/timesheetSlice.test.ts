import { calculateTotalTime, parseTime, parseTimesheet, Task } from "./timesheetSlice";

describe('testing timesheet slice functions', () => {
    // parseTime(timeStr: string): Date 
    test('parseTime should return valid time', () => {
        var timeString = "1:00"

        var expected = new Date()
        expected.setHours(1, 0, 0, 0);

        expect(parseTime(timeString)).toEqual(expected);
    });

    // parseTimesheet(rawTimesheet: string): Array<Task>
    test('parseTimesheet should parse one task', () => {
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

        expect(parseTimesheet(rawTimesheet)).toEqual(expected);
    });

    test('parseTimesheet should parse one task with multiple windows', () => {
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

        expect(parseTimesheet(rawTimesheet)).toEqual(expected);
    });

    test('parseTimesheet should parse two tasks', () => {
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

        expect(parseTimesheet(rawTimesheet)).toEqual(expected);
    });

    test('parseTimesheet should parse task with no time', () => {
        var rawTimesheet =
            `
        Testing\n
        `

        var expected = Array<Task>();
        expected.push({
            name: "Testing",
            hours: 0
        })

        expect(parseTimesheet(rawTimesheet)).toEqual(expected);
    });

    // calculateTotalTime(tasks: Array<Task>): number
    test('calculateTotalTime should correctly calculate total time', () => {
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

        expect(calculateTotalTime(timesheet)).toEqual(7.25)
    });

    test('calculateTotalTime should correctly calculate total time when timesheet is empty', () => {
        var timesheet = Array<Task>();

        expect(calculateTotalTime(timesheet)).toEqual(0)
    });
});