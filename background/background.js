function downloadImgs(url, path, i){
  chrome.downloads.download({
    url: url,
    filename: `${path}/${i}.jpg`
  });
}


let opt = {};
chrome.runtime.onMessage.addListener(function(msg, sender ,sendResponse){
  switch(msg.action) {
    case 'download':
      for(i = 1; i < msg.urls.length + 1; i++){
        if(msg.urls[i] == ''){
          console.log('faild');
        } else {
          downloadImgs(msg.urls[i], msg.addr, i);
        }
      }
      break;
    case 'copied-ohiohousefinder':
      opt = {
        type: "basic",
        title: "Copied!",
        message: "Information was copied to clipboard",
        iconUrl: "ohiohousefinder.png"
      }
      chrome.notifications.create(opt);
      break;
      case 'copied-realtorcom':
      opt = {
        type: "basic",
        title: "Copied!",
        message: "Information was copied to clipboard",
        iconUrl: "realtorcom.png"
      }
      chrome.notifications.create(opt);
      break;
  }
});
