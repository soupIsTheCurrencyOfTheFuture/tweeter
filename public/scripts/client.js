$(document).ready(function() {

    const createTweetElement = (obj) => {
        const name = obj['user']['name'];
        const avatar = obj['user']['avatars'];
        const handle = obj['user']['handle'];
        const content = obj['content']['text'];
        const timestamp = timeago.format(obj['created_at'])

        const tweet = $(`
        <section class="tweet">
            <header class="header-tweet">
            <div class="tweet-header-container">
                <img src=${avatar}></img>
                <p class="tweet-header-element">${name}</p>
            </div>
            <p class="tweeter-handle">${handle}</p>
            </header>
            <article class="tweet-content">${content}</article>
            <hr>
            <footer class="tweet-footer">
            <p class="tweet-date">${timestamp}</p>
            <div class="tweet-icons">
                <i class="fas fa-solid fa-flag icon-hover"></i>
                <i class="fas fa-solid fa-retweet icon-hover"></i>
                <i class="fas fa-solid fa-heart icon-hover"></i>
            </div>
            </footer>
        </section>
        `);
        return tweet
    }

    // Fake data taken from initial-tweets.json
    const data = [
        {
        "user": {
            "name": "Newton",
            "avatars": "https://i.imgur.com/73hZDYK.png",
            "handle": "@SirIsaac"
        },
        "content": {
            "text": "If I have seen further it is by standing on the shoulders of giants"
        },
        "created_at": 1461116232227
        },
        {
        "user": {
            "name": "Descartes",
            "avatars": "https://i.imgur.com/nlhLi3I.png",
            "handle": "@rd" },
        "content": {
            "text": "Je pense , donc je suis"
        },
        "created_at": 1461113959088
        }
    ]

    const renderTweets = function(tweets) {
        // loops through tweets
        for (const tweet of tweets) {
            $("#tweets-container").append(createTweetElement(tweet))
        }
    }

    renderTweets(data)

    $("#new-tweet-form" ).submit(function( event ) {
        event.preventDefault();
        $.post( "./server/data-files/initial-tweets.json", function( data ) {
            console.log(data)
        });
    });
});
