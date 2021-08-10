$(document).ready(function() {

    const counter = $(".counter")

    $("#tweet-text").on('keyup', function() {

        counter.val(140 - $(this).val().length)

        if (!counter.hasClass('text-overload') && counter.val() < 0) {
            counter.addClass('text-overload')
        } else if (counter.hasClass('text-overload') && counter.val() > 0) {
            counter.removeClass('text-overload')
        }
    })
});