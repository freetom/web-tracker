
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg!==undefined && msg.msg === 'DOMContent') {
        sendResponse(document.all[0].outerHTML)
    }
});
