$(document).ready(function () {

    $('article>img').hide();
    $('nav>a').click(navigateToPage);

    function isOpen() {
        return $('main').height() !== 0;
    }

    function navigateToPage(e) {

        e.preventDefault();

        var link = $(this),
            page = link.attr('href');

        if (!isOpen()) {
            $('main').animate({
                height: '75%'
            }, 500, function () {
                changePage(link, page);
            });
        } else {
            changePage(link, page);
        }
    }

    function changePage(link, page) {
        var img;

        $('nav>a.selected').toggleClass('selected', 150).off('click').click(navigateToPage);
        link.delay(150).toggleClass('selected', 150).off('click').click(function (e) {
            e.preventDefault();
        });


        $('article').hide();
        img = $(page).show().find('img').attr('src');

        $('header>h1').html(page.replace(/#|-/g, ' '));
        $('body>header').css({
            'background-image': 'url(' + img + ')'
        });

    }

});