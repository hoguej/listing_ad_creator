$(function(){

  // ==GET IMAGES start==

  let images = [];
  let maxAttempts = 5;


  // send images to background script to download
  function downloadFile(imgUrl, addr, index, attempt){
    // keep track of attempts in case it fails
    attempt = attempt || 0;
    attempt++;

    var fileExt = imgUrl.split('.').pop();
    var filename = addr + '/' + index + fileExt;

    chrome.runtime.sendMessage({
      action: 'download',
      url: imgUrl,
      filename: filename
    }, function(response){
      if(chrome.runtime.lastError && attempt < maxAttempts) {
        debugger;
        console.log(chrome.runtime.lastError);
        console.log('Attempting to download file again: ' + imgUrl);
        downloadFile(imgUrl, addr, index, attempt);
      }
    });
  };

  function downloadFiles(imgUrls, addr, attempt) {
    imgUrls.forEach(function(imgUrl, index){
      downloadFile(imgUrl, addr, index);
    });
  };

  // get all src's
  function getPicsSrc(addr, galleryPicTag, attr){
    $(galleryPicTag).each(function() {
      images.push($(this).attr(attr));
    });
    downloadFiles(images, $.trim(addr));
  };

  // ==GET IMAGES end==



  // download pics from ohiohousefinder
  $('.download-ohoihousefinder').on('click', function(){
    let addr = $('.prop-address h1 a').text();
    $('.view_gallery button').click();
    let galleryPicTag = '.galleryPopup img';
    let attr = 'src';

    getPicsSrc(addr, galleryPicTag, attr);
  });


  // download pics from realtor.com
  $('.download-realtorcom').on('click', function(){
    let addr = $('.ldp-header-address').attr('content');
    $('#hero-view-photo i').click();
    let galleryPicTag = '#ldp-fullscreen-gallery .modal-body .owl-item img';
    let attr = 'data-src';

    // timeout for full slider loading
    setTimeout(function(){
      $('.cloned').remove();
      getPicsSrc(addr, galleryPicTag, attr);
    }, 2000)
  });
})
