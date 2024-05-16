const D = new Date();
console.log(D.getFullYear());

document.addEventListener("DOMContentLoaded", function() {
  var tweet = document.getElementById("tweet");

  tweet.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      document.getElementById("send").click();
    }
  });
});

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    console.log(uid);

    var userEmail = user.email;
    console.log(userEmail);

    firebase
      .firestore()
      .collection("Users")
      .doc(uid)
      .get()
      .then((doc) => {
        let userName = doc.data().userName;
        let userEmail = doc.data().emailAddress;
        let handle = "@" + userName;
        document.getElementById("userName").innerText = userName;
        document.getElementById("email").innerText = handle;
      });

      
      // sending tweets to firestore database
    document.getElementById("send").onclick = function () {
      let tweet = document.getElementById("tweet").value;
      let sendtweet = firebase.firestore().collection("Tweets").doc();
      sendtweet
        .set({
          tweets: tweet,
          userId: uid,
          tweetId: sendtweet.id,
          todayDate: D.getTime(),
          likes: 0,
          retweets: 0,
        })
        .then(() => {
          window.location.reload();
        });
    };
    document.getElementById("signOut").onclick = function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          window.location.href = "/login.html";
        })
        .catch((error) => {
          // An error happened.
        });
    };
    firebase
      .firestore()
      .collection("Users")
      .get()
      .then((querryUser) => {
        querryUser.forEach((userDoc) => {
          let user = userDoc.data().userName;
          let userId = userDoc.data().userId;

          firebase
            .firestore()
            .collection("Tweets").orderBy("todayDate", "desc")
            .get()
            .then((querryTweets) => {
              let content = "";

              querryTweets.forEach((tweetDoc) => {
                let tweetUserId = tweetDoc.data().userId;
                let tweet = tweetDoc.data().tweets;
                let tweetid = tweetDoc.data().tweetId;
                let handle = "@" + user;
                let count = 0

                if (userId === tweetUserId) {
                  console.log(tweet);
                  content += `<div class="wehh">
                  <p>
                  <img id= "image" src= "/images/profile.jpg" alt=""/>
                  ${user}
                  <span id="handle"></span>
                  </p>
                  <p id="post" onclick="navigateToTweetPage(\'${tweetid}\')">${tweet}</p>
                  <p id="icon">
                  <i id='click' class='fa fa-comment-o' aria-hidden='true'></i>
                  <span>
                    <i id="click" class="fa fa-retweet" aria-hidden="true"></i>
                  </span>
                  <span>
                    <i id="click" onclick="${count=count+1}" class="fa fa-heart-o" aria-hidden="true"></i>
                    ${count}
                  </span>
                  </p>
                  </div>`;


                }
              });
              $("#formContainer").append(content);
            });
        });
      });

    window.navigateToTweetPage = function (tweetid) {
      console.log(tweetid);

      window.location.href = "tweet.html" + "?" + tweetid;
    };
  } else {
    window.location.href = "/login.html";
  }
});
