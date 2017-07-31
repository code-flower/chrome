
// this runs inside the iframe that get's added in index.js

(function($) {

  chrome.runtime.sendMessage({type: 'request-repo'}, function(response) {

    // when we get a response, first grab the config file
    var configUrl = chrome.extension.getURL('/config.json');
    $.getJSON(configUrl, function(config) {

      // and then add the iframe using the originUrl from the config
      var url = config.originUrl + '?repo=' + encodeURIComponent(response.repo);
      $('body').append(    
        '<iframe ' +
          'src="' + url + '" ' + 
          'style="width: 100%; height: 100%; border: none; overflower: hidden;" ' + 
          'allowfullscreen>' + 
        '</iframe>'
      );

    });
  });

})(jQuery);