
// this runs inside the iframe that get's added in index.js

(function($) {

  chrome.runtime.sendMessage({type: "request-repo"}, function(response) {
    var url = 'https://codeflower.la?repo=' + encodeURIComponent(response.repo);
    $('body').append(    
      '<iframe ' +
        'src="' + url + '" ' + 
        'style="width: 100%; height: 100%; border: none; overflower: hidden;" ' + 
        'allowfullscreen>' + 
      '</iframe>'
    );
  });

})(jQuery);