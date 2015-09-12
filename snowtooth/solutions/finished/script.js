$(document).ready(function () {


    $('article>img').hide();

    // Add a Click Handler to Page Navigation
    $('nav>a').click(navigateToPage);

    // Checks to see if the main conent area is open
    function isOpen() {
        return $('main').height() !== 0;
    }

    // Handler for when a nav link is clicked
    function navigateToPage(e) {

        // Prevent link navigation, browser default behav
        e.preventDefault();

        // Setup a variable for the clicked link and the clicked page
        var link = $(this),
            page = link.attr('href');

        // If the main content area is not open it, open it up
        if (!isOpen()) {
            $('main').animate({
                height: '75%'
            }, 500, function () {

                // Show the page associated with the link that was just clicked
                changePage(link, page);
            });
        } else {

            // Show the page associated with the link that was just clicked
            changePage(link, page);
        }
    }

    function changePage(link, page) {
        var img;

        // Remove selected class from currently selected nav element and add the click handler
        $('nav>a.selected').toggleClass('selected', 150).off('click').click(navigateToPage);

        // Add the selected class to this nav element and remove the navigateToPage click handler
        link.delay(150).toggleClass('selected', 150).off('click').click(function (e) {
            e.preventDefault();
        });

        // Hide the Current Articlea nd setup the currentPage
        $('article').hide();

        // Find the page image for the header
        img = $(page).show().find('img').attr('src');

        // Add Background Image to Header
        $('header>h1').html(page.replace(/#|-/g, ' '));
        $('body>header').css({
            'background-image': 'url(' + img + ')'
        });

        // Load Images when Page is requested
        $(page).find('span[data-url]')

            // Adds loading animation
            .addClass('loading image')

            // Displays loading message
            .html('Loading')

            // Displays current span
            .css('display', 'block')

            // for every lazy loaded image
            .each(function () {

                // The current span that contains the image to load
                var span = $(this);

                // Create a new image and load it
                $('<img>').attr({
                    'src': span.attr('data-url'),
                    'alt': ''
                })

                    //when the image loads...
                    .load(function () {

                        // Remove the loading message
                        span.html('');

                        // Remove the data-url for the image from the span
                        span.removeAttr('data-url');

                        // Add the newly loaded image to the span
                        span.append(this);


                    })

                    // If an Error Occures while loading the image
                    .error(function () {

                        // Display a red error message
                        span.html('Error Loading Image').removeClass('loading').css('color', 'red');
                    });

            });

        // Check the current page, if this is a status page render the status
        if (page === '#lift-status') {
            renderLiftStatus();
        } else if (page === '#trail-status') {
            renderTrailStatus();
        }

    }

});

function renderLiftStatus() {

    // Load the current lift data
    $.getJSON('http://www.moonhighway.com/class/api/snowtooth/lifts', function (data) {

        // Empty the present table
        $('tbody').empty();

        // For each Data Record create a table row and add lift data to that row
        $.each(data, function (i) {
            var tr = $('<tr>').attr('id', 'lift-' + i)
                .appendTo('tbody');
            $('<td>').text(this.name).appendTo(tr);
            $('<td>').text(this.type).appendTo(tr);
            $('<td>').text(this.status).appendTo(tr);
        });

        // Colorize the lift status text based on lift status
        $('td:contains("open")').css('color', 'green');
        $('td:contains("closed")').css('color', 'red');
        $('td:contains("hold")').css('color', 'goldenrod');

        // Show the table
        $('table').fadeIn(1000).delay(1000);

    });
}

function renderTrailStatus() {

    // Load the current trail data
    $.getJSON('http://www.moonhighway.com/class/api/snowtooth/trails', function (data) {

        // Empty the current list of trails
        $('ul#trails').empty();

        // Create a list item for each trail adn add trail name, status, and difficulty
        $.each(data, function (i) {
            $('<li>').addClass(this.difficulty).text(this.name + ' - ' + this.status).appendTo('ul#trails');
        });

        // Colorize list item based upon trail status
        $('li:contains("open")').css('color', 'darkgreen');
        $('li:contains("closed")').css('color', 'red');

    });

}
