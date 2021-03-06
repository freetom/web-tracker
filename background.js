recording=false
site=''
requests=[]
headers=[]
responses=[]

function download(name, data){
  var result = JSON.stringify(data);
  var url = 'data:application/json;base64,' + btoa(unescape(encodeURIComponent(result)));
  chrome.downloads.download({
      url: url,
      filename: name
  });
}

function downloadAll(){
  download('web-requests.json', requests)
  download('web-headers.json', headers)
  download('web-responses.json', responses)

  requests=[]
  headers=[]
  responses=[]
}

function messageHandler(msg, sender, sendResponse ){
  if(msg==null || msg==undefined)
    return false;
  if(msg.msg=='record' && msg.site!==undefined){
    site=msg.site
    recording=true
    sendResponse({msg:"ok"})
  }
  else if(msg.msg=='stop'){
    site=''
    recording=false
  }
  else if(msg.msg=='check'){
    if(recording)
      sendResponse({msg:"recording", site_: site})
    else
      sendResponse({msg:"not recording"})
  }
  else if(msg.msg=='download'){
    downloadAll()
  }
}

function checkName(url){
  if((pos=url.indexOf('/'))<=6){
    newUrl=url.substring(pos+2)
    pos=newUrl.indexOf('/')
    if(pos==-1)
      return newUrl.indexOf(site)!==-1
    else
      return newUrl.substring(0,pos).indexOf(site)!==-1
  }
  else
    return url.substring(0,pos).indexOf(site)!==-1
}

function recordRequest(requestDetails) {
  if(!recording)
    return
  url=requestDetails.url
  if(checkName(url)){
    requests.push(requestDetails)
  }
}

function recordHeaders(requestDetails) {
  if(!recording)
    return
  url=requestDetails.url
  if(checkName(url)){
    headers.push(requestDetails)
  }
}

function recordResponses(responseDetails){
  if(!recording)
    return
  url=responseDetails.url
  if(checkName(url)){
    chrome.tabs.sendMessage(responseDetails.tabId, {msg: 'DOMContent'}, function(DOMContent){
      responseDetails.httpResponse=DOMContent
      responses.push(responseDetails)
    })
  }
}

chrome.webRequest.onBeforeRequest.addListener(
  recordRequest,
  {urls: ["<all_urls>"]},
  ["requestBody"]
)
chrome.webRequest.onBeforeSendHeaders.addListener(
  recordHeaders,
  {urls: ["<all_urls>"]},
  ["requestHeaders"]
)
chrome.webRequest.onCompleted.addListener(
  recordResponses,
  {urls: ["<all_urls>"]}
)

chrome.runtime.onMessage.addListener(messageHandler)
