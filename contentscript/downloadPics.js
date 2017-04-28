$(function(){
  
  // ==GET IMAGES start==

  let images = [];

  // send images to background script to download
  function sendDownload(imgURLs, addr){
    chrome.runtime.sendMessage({
      action: 'download',
      urls: imgURLs,
      addr: addr
    });
  };

  // get all src's
  function getPicsSrc(addr, galleryPicTag, attr){
    $(galleryPicTag).each(function() { 
      images.push($(this).attr(attr));
    });
    sendDownload(images, $.trim(addr));
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
    }, 5000)
  });
})