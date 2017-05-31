$(window).on('load', function() {
  let path = window.location.pathname;
  if(path.indexOf('property') || path.indexOf('homes-detail')) {
    addButtons();
    loadDownloadPics();
    loadSummary();
  }
});
