function loadDownloadPics() {
  // ==GET IMAGES start==

  let images = [];

  // send images to background script to download
  function sendDownload(imgURLs, addr){
    console.log('sendDownload called');
    chrome.runtime.sendMessage({
      action: 'download',
      urls: imgURLs,
      addr: addr
    });
    $('.close').click();
  };

  // get all src's
  function getPicsSrc(addr, galleryPicTag, attr){
    console.log('getPicsSrc called');
    $(galleryPicTag).each(function() {
      images.push($(this).attr(attr));
    });
    sendDownload(images, $.trim(addr));
  };

  // ==GET IMAGES end==


  // download pics from ohiohousefinder
  $('.download-ohoihousefinder').on('click', function(){
    console.log('download-ohiohousefinder clicked');
    let addr = $('.prop-address h1').text();
    $('.view_gallery button').click();
    let galleryPicTag = '.galleryPopup img';
    let attr = 'src';

    console.log('*** Calling getPicsSrc ***');
    console.log(addr);
    console.log(galleryPicTag);
    console.log(attr);
    getPicsSrc(addr, galleryPicTag, attr);
  });


  // download pics from realtor.com
  $('.download-realtorcom').on('click', function(){
    console.log('download-realtorcom clicked');
    let addr = $('.ldp-header-address').attr('content');
    $('#hero-view-photo i').click();
    let galleryPicTag = '#ldp-fullscreen-gallery .modal-body .owl-item img';
    let attr = 'data-src';

    // timeout for full slider loading
    $('.cloned').remove();
    // getPicsSrc(addr, galleryPicTag, attr);
    setTimeout(function(){
      $('.cloned').remove();
      getPicsSrc(addr, galleryPicTag, attr);
    }, 3000)
  });
};
