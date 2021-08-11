$(document).ready(function() {
  // RELEVANT FUNCTION CALLS FOR AJAX REQUESTS

  // CREATES HTML ELEMENT BASED ON AN OBJECTS KEY VALUE PAIRS
  const createTweetElement = (obj) => {
    const name = obj['user']['name'];
    const avatar = obj['user']['avatars'];
    const handle = obj['user']['handle'];
    const content = obj['content']['text'];
    const timestamp = timeago.format(obj['created_at']);

    const tweet = $(`
        <section class="tweet">
            <header class="header-tweet">
            <div class="tweet-header-container">
                <img src=${escape(avatar)}></img>
                <p class="tweet-header-element">${escape(name)}</p>
            </div>
            <p class="tweeter-handle">${escape(handle)}</p>
            </header>
            <body>
            <article class="tweet-content">${escape(content)}</article>
            <hr>
            </body>
            <footer class="tweet-footer">
            <p class="tweet-date">${escape(timestamp)}</p>
            <div class="tweet-icons">
                <i class="fas fa-solid fa-flag icon-hover"></i>
                <i class="fas fa-solid fa-retweet icon-hover"></i>
                <i class="fas fa-solid fa-heart icon-hover"></i>
            </div>
            </footer>
        </section>
        `);
    return tweet;
  };
  // CREATES SAFE TEXT FROM USER SO SCRIPT INJECTION CANT BE MANIPULATED
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
    // LOOPS THROUGH ARRAY AND CALLS OUT CREATETWEETELEMENT FUNCTION
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      $("#tweets-container").prepend(createTweetElement(tweet));
    }
  };
  // LOADS TWEETS FROM /TWEETS JSON DATA
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      type: 'get',
      success: function(data) {
        renderTweets(data);
      },
      error: function(jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    });
  };
  // WINBDOW EVENT LISTENER FOR RETURN TO TOP BUTTON
  window.addEventListener('scroll', (event) => {
    if (window.scrollY > 0) {
      $(".return-to-top").css("display", "flex");
    } else {
      $(".return-to-top").css("display", "none");
    }
  });
  // EVENT HANDLER FOR NEW TWEET TOGGLE
  $(".nav-content-right").on("click", () => {
    $(".new-tweet").slideToggle();
  });
  // SUBMIT EVENT HANDLER AND AJAX POST REQUEST
  $("#new-tweet-form").submit(function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    const inputValue = $(this).find("#tweet-text").val();
        
    if (inputValue === '' || inputValue === null) {
      $(".error-message-short").css("visibility", "visible");
      $(".error-message-short").css("opacity", "1");
      $(".error-message-short").css("transform", "translateY(0px)");
      $(".error-message-short").text("youve gotta say something");
    } else if (inputValue.length > 140) {
      $(".error-message-short").css("visibility", "visible");
      $(".error-message-short").css("opacity", "1");
      $(".error-message-short").css("transform", "translateY(0px)");
      $(".error-message-short").text("youve said too much");
    } else {
      $(".error-message-short").css("visibility", "collapse");
      $(".error-message-short").css("opacity", "0");
      $(".error-message-short").css("transform", "translateY(100px)");
      $.post('/tweets', serializedData, loadTweets);
    }
  });

  // CALL LOAD TWEETS TO CALL INITIAL TWEETS IN DATABASE
  loadTweets();
});
