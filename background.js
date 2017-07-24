recording=false
site=''
requests=[]

function download(){
  var result = JSON.stringify(requests);

  // Save as file
  var url = 'data:application/json;base64,' + btoa(result);
  chrome.downloads.download({
      url: url,
      filename: 'web-trace.json'
  });
  requests=[]
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
    download()
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

chrome.webRequest.onBeforeRequest.addListener(
  recordRequest,
  {urls: ["<all_urls>"]},
  ["requestBody"]
)
chrome.webRequest.onBeforeSendHeaders.addListener(
  recordRequest,
  {urls: ["<all_urls>"]},
  ["requestHeaders"]
)
chrome.runtime.onMessage.addListener(messageHandler)
