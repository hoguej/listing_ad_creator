// alert('background loaded');

let retries = 5;
function downloadImgs(url, path, i, retry){
  console.log('downloadImgs called');
  retry = retry || 0;
  retry++;

  if(! url.startsWith('http')) {
    url = 'http:' + url;
  }
  console.log({action: 'download', url: url, path: path, i: i, retry: retry, retries: retries});
  chrome.downloads.download({
    url: url,
    filename: `${path}/${i}.jpg`
  }, function() {
    if(chrome.runtime.lastError && retry < retries) {
      console.log(chrome.runtime.lastError);
      console.log('retrying ' + i);
      downloadImgs(url, path, i, retry);
    }
  });
}


let opt = {};
chrome.runtime.onMessage.addListener(function(msg, sender ,sendResponse){
  console.log('Adding listeners');
  switch(msg.action) {
    case 'download':
      console.log('download called');
      for(i = 0; i < msg.urls.length + 1; i++){
        if(msg.urls[i] == ''){
          console.log('faild');
        } else {
          downloadImgs(msg.urls[i], msg.addr, i);
        }
      }
      break;
    case 'copied-ohiohousefinder':
      console.log('notify copied to clipboard OHF');
      opt = {
        type: "basic",
        title: "Copied!",
        message: "Information was copied to clipboard",
        iconUrl: "ohiohousefinder.png"
      }
      chrome.notifications.create(opt);
    break;
    case 'copied-realtorcom':
      console.log('notify copied to clipboard r.com');
      opt = {
        type: "basic",
        title: "Copied!",
        message: "Information was copied to clipboard",
        iconUrl: "realtorcom.png"
      };
      chrome.notifications.create(opt);
    break;
  }
});
