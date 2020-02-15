jQuery(document).ready(function() {

    /*
        Fullscreen Background
    */
    $.backstretch("static/img/top-contentBGalt.jpg");

    /*
        Open / Close Menu 
    */
    $('.hamburger-button button').on('click', function() {
        $('.top-menu').toggleClass('active');
        $(this).toggleClass('menu-closed');
    });

});