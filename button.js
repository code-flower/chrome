
(function($) {

  $(document).ready(function() {

    var url = encodeURIComponent(window.location.pathname.substring(1));
    console.log("repo url:", url);

    // add button to clone window
    var newButton = $(
      '<a ' + 
        'href="https://www.google.com/?repo=' + url + '"' + 
        'target="_blank" ' + 
        'class="btn btn-outline get-repo-btn">' + 
        'Visualize on codeflower.la' + 
      '</a>'
    ).css({
      'float': 'none',
      'width': '100%'
    });

    $('.get-repo-btn:last-child').after(newButton);

    // add link to Insights dropdown
    var btn = $('.reponav-dropdown');

    var newLink = $(
      '<a ' + 
        'class="dropdown-item" ' + 
        'href="https://www.google.com/?repo=' + url + '">' + 
        'Codeflower' + 
      '</a>'
    );

    btn.find('.dropdown-item').last().after(newLink);

  });

})(jQuery);


