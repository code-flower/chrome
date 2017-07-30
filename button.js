
(function($) {

  ////////// INIT CODEFLOWER /////////

  function injectCodeflower() {
    var container = $(
      '<div ' + 
        'style="width: 90vw; height: 90vh; padding: 0px; margin: 0 auto;"' +
        'class="container codeflower">' + 
      '</div>'
    );

    $('.pagehead').next().replaceWith(container);

    // get around chrome's content security policy regarding iframes
    // by creating a frame within a frame
    // https://stackoverflow.com/questions/24641592/injecting-iframe-into-page-with-restrictive-content-security-policy
    var extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
    if (!location.ancestorOrigins.contains(extensionOrigin)) {
      var iframe = document.createElement('iframe');
      iframe.src = chrome.runtime.getURL('frame.html');
      iframe.style.cssText = 'width: 100%; height: 100%; border: none; overflower: hidden;';
      iframe.setAttribute('allowFullScreen', '');
      container.append(iframe);

      // this seems like it should work but doesn't
      // https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
      console.log("requesting full screen:", iframe);
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      }
    }
  }

  /////////// ADD MENU ITEM //////////

  function addMenuItem() {

    var author = $('[itemprop="author"] a').text(),
        name   = $('[itemprop="name"]   a').text();

    console.log("author:", author);
    console.log("name:", name);

    if (!author || !name)
      return false;

    var url = "http://localhost:3000/?repo=" + encodeURIComponent(author + '/' + name);

    var octicon = (
      '<svg aria-hidden="true" class="octicon octicon-telescope" height="16" version="1.1" viewBox="0 0 12 16" width="12">' + 
        '<path fill-rule="evenodd" d="M8 9l3 6h-1l-2-4v5H7v-6l-2 5H4l2-5 2-1zM7 0H6v1h1V0zM5 3H4v1h1V3zM2 1H1v1h1V1zM.63 9a.52.52 0 0 0-.16.67l.55.92c.13.23.41.31.64.2l1.39-.66-1.16-2-1.27.86.01.01zm7.89-5.39l-5.8 3.95L3.95 9.7l6.33-3.03-1.77-3.06h.01zm4.22 1.28l-1.47-2.52a.51.51 0 0 0-.72-.17l-1.2.83 1.84 3.2 1.33-.64c.27-.13.36-.44.22-.7z"></path>' + 
      '</svg>'
    );

    // add link to Insights dropdown
    var newLink = $(
      '<a ' + 
        'id="codeflower-init"' + 
        'class="dropdown-item" ' + 
        'href="#"' + 
        // 'href="' + url + '" ' + 
        // 'target="_blank" ' + 
        'data-skip-pjax>' + 
        octicon + 
        '&nbsp;Codeflower' + 
      '</a>'
    );

    $('.reponav-dropdown .dropdown-item:last-child').after(newLink);

    // add click handler
    $('#codeflower-init').click(function(e) {
      // don't follow the link
      e.preventDefault();

      // close the dropdown menu
      $('body').trigger('click');

      // inject codeflower into the DOM
      injectCodeflower();
    });

  }

  ////////// EVENT LISTENERS ///////////

  // add menu item initial load
  $(document).ready(addMenuItem);

  // re-add menu item on tab changes 
  // see https://github.com/defunkt/jquery-pjax
  $(document).on('pjax:complete', addMenuItem);

})(jQuery);


