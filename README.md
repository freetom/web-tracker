# web-tracker
Web extensions that allows to record the requests sent to specific domains

## Purpose

This extension tracks all the requests/responses that your browser sends to a domain and all its subdomains (once the recording function is activated). When stopped, the trace will be downloaded in three JSON files that contains respectively requests, headers and responses.

Web traces can then be used for the most disparate purposes..

I.e: 
* Mutative testing of websites based on valid web traces.
* Response time analysis to detect DoS loopholes
* Post-browsing web scraping
* Other purposes based on web traffic analysis

## How it works

Click the button on toolbar to interact with the extension. You can use the button to start recording on a specific domain. When you stop the recording the browser will automatically download three JSON files with all the **requests**, **headers** and **responses**.

## Compatibility

Works on Google Chrome 59.

Does not work of Firefox 55, `chrome.downloads.download`, does not work, don't know why

## Install

`git clone https://github.com/freetom/web-tracker/`

Open chrome and go on `chrome://extensions`, tick "developer mode", click "load unpacked extension", give him the folder of the just downloaded `web-tracker`. Done
