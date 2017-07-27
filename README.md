# web-tracker
Web extensions that allows to record the requests sent to specific domains

## Purpose

This extension tracks all the requests you do to a domain and all of its subdomains once the recording function is activated. When terminated, the trace will be downloaded in two JSON files that contains respectively requests and headers.

Web traces can then be used for the most disparate purposes. I.e. mutative testing of websites based on valid web traces.

## How it works

Click the button on toolbar to interact with the extension. You can use the button to start recording on a specific domain. When you stop the recording the browser will automatically download a JSON file with all the requests and relative information.

## Compatibility

Works on Google Chrome 59.

Does not work of Firefox 55, `chrome.downloads.download`, does not work, don't know why

## Install

`git clone https://github.com/freetom/web-tracker/`

Open chrome and go on `chrome://extensions`, tick "developer mode", click "load unpacked extension", give him the folder of the just downloaded `web-tracker`. Done

## Possible improvements

The add-on currenty supports the dumping of HTTP request headers and parameters. It might be interesting to add the recording of the responses too.
