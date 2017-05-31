function addButtons() {
  // buttons for OhioHouseFinder
  $('.top-nav').after('<div class="row collapse extension-wrapper-ohoihousefinder"></div>')
  $('.extension-wrapper-ohoihousefinder').append('<div class="small-12 columns extension-buttons-ohoihousefinder"></div>').css('padding', '20px 0 0 20px')
  $('.extension-buttons-ohoihousefinder').append('<div><button class="download-ohoihousefinder">Download Pics</button></div>');
  $('.extension-buttons-ohoihousefinder').append('<div><button class="summary-ohoihousefinder">Create Summary</button></div>');

  // buttons for realtor.com
  $('.global-navbar').after('<div class="container extension-wrapper-realtorcom"></div>');
  $('.extension-wrapper-realtorcom').append('<div class="extension-buttons-realtorcom">');
  $('.extension-buttons-realtorcom').append('<button class="download-realtorcom">Download Pics</button>')
  $('.extension-buttons-realtorcom').append('<button class="summary-realtorcom">Create Summary</button>')
};
