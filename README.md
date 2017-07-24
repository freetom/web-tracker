# web-tracker
Web extensions that allows to record the requests sent specific domains

## Purpose

This extension can track all the requests that you do when you are browsing a certain domain, and all its sub-domains and it allows you to export them in JSON format.

Web traces can then be used for the most disparate purposes. I.e. mutative testing of websites based on valid web traces.

## How it works

Click the button on toolbar to interact with the extension. You can use the button to start recording on a specific domain. When you stop the recording the browser will automatically download a JSON file with all the requests and relative information.

## Compatibility

Works on Google Chrome 59.

Does not work of Firefox 55, `chrome.downloads.download`, does not work, don't know why
