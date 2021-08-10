/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (obj) => {
    const name = obj['user']['name'];
    const avatar = obj['user']['avatars'];
    const handle = obj['user']['handle'];
    const content = obj['content']['text'];

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
        <p class="tweet-date">10 days ago</p>
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

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
 }

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$(document).ready(function() {
    $("#tweets-container").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});