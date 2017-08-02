
// this runs inside the iframe that get's added in index.js

(function($) {

  chrome.runtime.sendMessage({type: 'request-repo'}, function(repo) {

    // when we get a response, first grab the config file
    var configUrl = chrome.extension.getURL('/config.json');
    $.getJSON(configUrl, function(config) {

      // construct url for the iframe
      var url = config.originUrl + 
                '?owner='  + repo.owner + 
                '&name='   + repo.name + 
                (repo.branch ? '&branch=' + repo.branch : '');

      // add the iframe to the body
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