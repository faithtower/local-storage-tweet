// variables
const tweetList = document.getElementById('tweet-list');



// event Listeners

const eventListeners = () => {
    //form Submission
    document.querySelector('#form').addEventListener('submit', newTweet);

    //remove tweet from list
    tweetList.addEventListener('click', removeTweet);

    //document
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);

}


// functions

const newTweet = (e) => {
    e.preventDefault();

    //read the text area value
    let tweet = document.getElementById('tweet').value;

    if (tweet) {
        // create remove button
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-tweet';
        removeBtn.textContent = 'X';

        //create an <li> Element
        const li = document.createElement('li');
        li.textContent = tweet;

        //Add remove button to each tweet that is generated
        li.appendChild(removeBtn);

        //Add tweet to list
        tweetList.appendChild(li);

        //Tweets local storage
        addTweetLocalStorage(tweet);

        //print alert
        alert('Tweet Added');
        document.getElementById('tweet').value = '';

    } else {
        alert('Please enter Tweet Content');
    }


}

//removes tweet from the DOM
const removeTweet = (e) => {
    if (e.target.classList.contains('remove-tweet')) {
        e.target.parentElement.remove();
    }

    //remove from storage
    removeTweetLocalStorage(e.target.parentElement.textContent);
}

const addTweetLocalStorage = (tweet) => {
    let tweets = getTweetsFromLocalStorage();

    //Add tweet to array
    tweets.push(tweet);

    // Convert tweet array to string
    localStorage.setItem('tweets', JSON.stringify(tweets));

}

const getTweetsFromLocalStorage = () => {
    let tweets;
    let tweetsLS = localStorage.getItem('tweets');

    if (tweetsLS === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(tweetsLS);
    }
    return tweets;
}

//print local storage tweets on load
const localStorageOnLoad = () => {
    //get tweets from local storage
    let tweets = getTweetsFromLocalStorage();

    tweets.forEach((tweet) => {
        // create remove button
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-tweet';
        removeBtn.textContent = 'X';

        //create an <li> Element
        const li = document.createElement('li');
        li.textContent = tweet;

        //Add remove button to each tweet that is generated
        li.appendChild(removeBtn);

        //Add tweet to list
        tweetList.appendChild(li);

    });
}

// removes the tweet from local storage
const removeTweetLocalStorage = (tweet) => {
    //get tweets from local storage
    let tweets = getTweetsFromLocalStorage();

    // remove the X from the string
    const tweetDelete = tweet.substring(0, tweet.length - 1);

    //loop through the list and remove the array that's equal

    tweets.forEach((tweetLS, index) => {
        if (tweetDelete === tweetLS) {
            tweets.splice(index, 1);
        }
    })
    //save the data
    localStorage.setItem('tweets', JSON.stringify(tweets));

}


//Function calls

eventListeners();