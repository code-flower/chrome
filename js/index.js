
(function($) {

  //////////////// FUNCTIONS /////////////////

  // determine whether this is a page when we should run the code
  function extensionActive() {
    var btn = $('.reponav-dropdown button');
    return !!(btn && btn.text().trim() === 'Insights');
  }

  // determine what repo/branch is on the page
  function getRepo() {
    var path = window.location.pathname.substring(1);
    var arr1 = path.split('/tree/');
    var arr2 = arr1[0].split('/');

    return {
      owner:  arr2[0],
      name:   arr2[1],
      branch: arr1[1] || null
    };
  }

  // add the Codeflower item to the Insights dropdown
  function addMenuItem() {

    // the icon
    var octicon = (
      '<svg aria-hidden="true" class="octicon octicon-telescope" height="16" version="1.1" viewBox="0 0 12 16" width="12">' + 
        '<path fill-rule="evenodd" d="M8 9l3 6h-1l-2-4v5H7v-6l-2 5H4l2-5 2-1zM7 0H6v1h1V0zM5 3H4v1h1V3zM2 1H1v1h1V1zM.63 9a.52.52 0 0 0-.16.67l.55.92c.13.23.41.31.64.2l1.39-.66-1.16-2-1.27.86.01.01zm7.89-5.39l-5.8 3.95L3.95 9.7l6.33-3.03-1.77-3.06h.01zm4.22 1.28l-1.47-2.52a.51.51 0 0 0-.72-.17l-1.2.83 1.84 3.2 1.33-.64c.27-.13.36-.44.22-.7z"></path>' + 
      '</svg>'
    );

    // add link to Insights dropdown
    $('.reponav-dropdown .dropdown-item:last-of-type').after(
      '<a ' + 
        'id="codeflower-init"' + 
        'class="dropdown-item" ' + 
        'href="#" ' + 
        'data-skip-pjax>' + 
        octicon + 
        '&nbsp;Codeflower' + 
      '</a>'
    );

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

  // 
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
      container.append(
        '<iframe ' +
          'src="' + chrome.runtime.getURL('html/frame.html') + '" ' + 
          'style="width: 100%; height: 100%; border: none; overflower: hidden;" ' + 
          'allowfullscreen>' + 
        '</iframe>'
      );
    }
  }

  /////////////////// MAIN ///////////////////

  // add menu item initial load
  $(document).ready(function() {

    if (extensionActive()) {
      addMenuItem();

      // re-add menu item on tab changes 
      // see https://github.com/defunkt/jquery-pjax
      $(document).on('pjax:complete', addMenuItem);

      // response to requests for the repo from the frame script
      chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.type === 'get-repo')
          sendResponse(getRepo());
      });
    }

  });

})(jQuery);


