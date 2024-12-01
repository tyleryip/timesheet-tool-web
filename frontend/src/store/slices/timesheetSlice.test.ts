import { calculateTotalTime, parseTime, parseTimesheet, Task } from "./timesheetSlice";

describe('testing timesheet slice functions', () => {
    // parseTime(timeStr: string): Date 
    test('parseTime should return valid time', () => {
        // Arrange
        var timeString = "1:00"

        var expected = new Date()
        expected.setHours(1, 0, 0, 0);

        // Act
        var actual = parseTime(timeString)

        // Assert
        expect(actual).toEqual(expected);
    });

    // parseTimesheet(rawTimesheet: string): Array<Task>
    test('parseTimesheet should parse one task', () => {
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

    test('parseTimesheet should parse one task with multiple windows', () => {
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

    test('parseTimesheet should parse two tasks', () => {
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

    test('parseTimesheet should parse task with no time', () => {
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

    // calculateTotalTime(tasks: Array<Task>): number
    test('calculateTotalTime should correctly calculate total time', () => {
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

    test('calculateTotalTime should correctly calculate total time when timesheet is empty', () => {
        // Arrange
        var timesheet = Array<Task>();

        // Act
        var actual = calculateTotalTime(timesheet)

        //Assert
        expect(actual).toEqual(0)
    });
});