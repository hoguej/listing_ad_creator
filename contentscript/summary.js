function loadSummary() {

  let url = window.location.href;

  // ==COPY TO CLIPBOARD FUNCTION start==

  function copyToClipboard(url, addr, {bd, ba, sqft}, broker, agent, view, website){
    console.log('copyToClipboard called');
    // need to be without spaces
    let textToClip =
`Full details: ${url}${view}

${addr} - ${bd} BD ${ba} BA ${sqft} SqFt

Listing Courtesy of : ${broker} ${agent}`;

    copyToClipboardHidden(textToClip);

    // copying with hidden textarea help
    function copyToClipboardHidden(text) {
        let tempInput = $("<textarea>");
        $("body").append(tempInput);
        tempInput.val(text).select();
        document.execCommand("cut");
        tempInput.remove();
    }

    // message to background to notificate
    console.log('Getting ready to send copytoclipboad message');
    chrome.runtime.sendMessage({
        action: `copied-${website}`,
        copied: true
      }, function(response) {

      });
  }

  // ==COPY TO CLIPBOARD FUNCTION end==



  // summary for ohiohousefinder

  $('.summary-ohoihousefinder').on('click', function(){
    console.log('summary-ohiohousefinder clicked');

    // get url last char (for adding ?view)
    let urlLastChar = url.charAt(url.length-1)

    // get address
    let addrPure = $('.prop-address h1').text();
    let addrFirstComa = addrPure.match(/\,/);
    let addrFirstCut = addrPure.slice(addrFirstComa.index + 1);
    let addrSecondComa = addrFirstCut.match(/\,/);
    let addrSecondCut = addrFirstCut.slice(1, -(addrFirstCut.length - addrSecondComa.index));

    // get property details
    let propertyDetailsEl = $('.prop-sup-details dd');
    let propertyDetails = {
      bd: $(propertyDetailsEl[1]).text(),
      ba: $(propertyDetailsEl[2]).text(),
      sqft: $(propertyDetailsEl[3]).text()
    };

    var broker = '';
    var agent = '';

    // get broker and agent
    if ($($('.listing-courtesy p')[1]).text()) {
      var courtesy = $($('.listing-courtesy p')[1]).text();
      var brokerFirstCut = courtesy.slice((courtesy.match(/\----/).index + 5));
      broker = brokerFirstCut.slice(0, -(brokerFirstCut.length - (brokerFirstCut.match(/[0-9]/)).index + 2))
      var agentFirstCut = courtesy.slice(courtesy.match(/:+/).index + 2);
      agent = agentFirstCut.slice(0, -(agentFirstCut.length - (agentFirstCut.match(/\----/).index - 1)));
    } else {
      courtesy = $($('.listing-courtesy p')[0]).text();
      broker = courtesy.replace('Listing courtesy of ', '');
    }

    agent = agent.trim();
    broker = broker.trim();

    if(urlLastChar == '#'){
      url = url.slice(0, -1);
      copyToClipboard(url, addrSecondCut, propertyDetails, broker, agent, '?view', 'ohiohousefinder');
    } else {
      copyToClipboard(url, addrSecondCut, propertyDetails, broker, agent, '?view', 'ohiohousefinder');
    }

  });



  // summary for realtor.com

  $('.summary-realtorcom').on('click', function(){
    console.log('summary-realtorcom clicked');
    let addr = $($('.ldp-header-address span')[1]).text();

    let propertyDetailsEl = $('#ldp-property-meta ul li span');
    let propertyDetails = {};
    propertyDetails = {
        bd: $(propertyDetailsEl[0]).text(),
        ba: $(propertyDetailsEl[1]).text(),
        sqft: $.trim($($('#ldp-property-meta li[data-label="property-meta-sqft"] span')[0]).text())
    }


    //get broker
    let brokerEl = $('.business-card-broker li');
    let broker = '';
    if($(brokerEl[1]).find('a') == true){
      broker = $(brokerEl[1]).find('a').text();
    } else {
      broker = $(brokerEl[1]).text();
    }

    //get agent
    let agentEl = $('.business-card-agent li');
    let agent = $.trim($(agentEl[1]).find('a').text());

    copyToClipboard(url, addr, propertyDetails, broker, agent, '', 'realtorcom');
  });
};
