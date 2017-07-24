
recording=false

function sanitize(string){
  safeContent=/^([a-zA-Z0-9\-\. ])*$/
  if(safeContent.test(string))
    return string
  else
    return 'error'
}

function record(){
  if(recording){
    chrome.runtime.sendMessage({msg:'stop'});
    chrome.runtime.sendMessage({msg:'check'},check);
    chrome.runtime.sendMessage({msg:'download'});
  }
  else
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      var url = new URL(tabs[0].url)
      var domain = url.hostname
      chrome.runtime.sendMessage({msg:'record', site: domain});
      chrome.runtime.sendMessage({msg:'check'},check);
    })
}

function check(msg){
  if(msg.msg=='recording'){
    document.getElementById("record").innerHTML='Recording traffic on '+sanitize(msg.site_)
    recording=true
  }
  else{
    recording=false
    document.getElementById("record").innerHTML='Click to record traffic on '
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var url = new URL(tabs[0].url)
      var domain = url.hostname
      if(domain.indexOf('.')!==-1)
        document.getElementById("record").innerHTML+=sanitize(domain)
      else
        document.getElementById("record").innerHTML='Cannot record traffic in special tabs'
    })
  }
}

function mapEvents(){
  document.getElementById("record").addEventListener("click",record);
}

function startup(){
  mapEvents()
  chrome.runtime.sendMessage({msg:'check'},check);
}

document.addEventListener("DOMContentLoaded",startup)
