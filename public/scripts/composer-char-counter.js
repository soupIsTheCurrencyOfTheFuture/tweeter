$(document).ready(function() {

  $("#tweet-text").on('keyup', function() {

    const counter = $(this).siblings(".tweeter-submission-flex").children('.counter');
    counter.val(140 - $(this).val().length);

    if (!counter.hasClass('text-overload') && counter.val() < 0) {
      counter.addClass('text-overload');
    } else if (counter.hasClass('text-overload') && counter.val() > 0) {
      counter.removeClass('text-overload');
    }
  });
});