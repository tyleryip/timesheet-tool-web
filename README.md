# OhSheet! The Timesheet Tool

[![Netlify Status](https://api.netlify.com/api/v1/badges/b3e4f960-45ac-42d5-83e8-24a8f78d1f41/deploy-status)](https://app.netlify.com/sites/oh-sheet/deploys)

[![Unit Test Status](https://github.com/tyleryip/timesheet-tool-web/actions/workflows/run-tests.yaml/badge.svg?branch=main)](https://github.com/tyleryip/timesheet-tool-web/actions/workflows/run-tests.yaml)

## About

The next iteration of timesheet tool, to be used in the browser without any installation or self-installed dependencies. Visit the [live demo site](https://oh-sheet.netlify.app).

## Features

The following features are included or planned for OhSheet.

- [x] Base timesheet parsing format (ex. 9:00-10:30)
- [x] Clear raw timesheet
- [x] Copy parsed timesheet to clipboard
- [x] Display total hours for validation
- [x] More flexible timesheet format (ex. 8-9)
- [x] Error handling and notifications
- [x] Pre-emptive validation and error notifications
- [ ] Show example toggle/button or help button
- [ ] Export parsed timesheet

## Available Scripts

To run the app in the local dev environment, navigate to the /frontend directory and run:

```
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To run unit tests using Jest:

```
npm test
```

Test results will output to `/reports`. Unit tests will also run on PR against main and develop.

## References

Icons for this project were taken from [Flaticon](https://www.flaticon.com).
