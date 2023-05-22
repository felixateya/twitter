const D = new Date();
console.log(D.toDateString());

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var selectId = decodeURIComponent(window.location.search);
    var selectTweetId = selectId.substring(1);
    var selectCommentId = selectId.substring(1);
    var querrycomment;
    let c;
    // countComment();
    console.log(querrycomment);
    
    
    document.getElementById("submit").onclick = function () {
      var uid = user.uid;
      console.log(uid);
      
      selectCommentId = selectId.substring(1);
      let comment = document.getElementById("comment").value;
      let sendComment = firebase.firestore().collection("Comments").doc();
      console.log(comment);
      sendComment
      .set({
        comments: comment,
          userId: uid,
          commentId: sendComment.id,
          commentTweetId: selectTweetId,
        })
        .then(() => {
          window.location.reload();
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
            .collection("Tweets")
            .get()
            .then((querryTweet) => {
              let content = "";

              querryTweet.forEach((tweetDoc) => {
                let tweetUserId = tweetDoc.data().userId;
                let tweet = tweetDoc.data().tweets;
                let tweetid = tweetDoc.data().tweetId;
                let handle = "@" + user;

                if ((userId == tweetUserId) & (tweetid == selectTweetId)) {
                  console.log(tweet);
                  var c = querrycomment;
                  content += '<div class="wehh" id= "wehh">';
                  content +=
                    "<p>" +
                    "<img id='image' src= '/images/profile.jpg' alt=''>" +
                    user +
                    " " +
                    "<span id= 'handle' >" +
                    handle +
                    "</span>" +
                    "</p>";
                  content += "<p id='post'>" + tweet + "</p>";
                  content +=
                    "<p id='icon'>" +
                    "<i id='click' class='fa fa-comment-o' aria-hidden='true'>" +
                    "</i>" +
                    " " +
                    c +
                    "<span>" +
                    "<i id='click' class='fa fa-retweet' aria-hidden='true'>" +
                    "</i>" +
                    " " +
                    "</span>" +
                    "<span>" +
                    "<i id='click' class='fa fa-heart-o' aria-hidden='true'>" +
                    "</i>" +
                    " " +
                    "</span>" +
                    "</p>";
                  content += "</div>";
                }
              });
              $("#formContainer").append(content);

              firebase
                .firestore()
                .collection("Comments")
                .get()
                .then((querryComment) => {
                  querryComment.forEach((commentDoc) => {
                    let commentUserId = commentDoc.data().userId;
                    let comment = commentDoc.data().comments;
                    let commentTweetid = commentDoc.data().commentTweetId;
                    let handle = "@" + user;
                    let content = "";


                    function countComment (){querrycomment = querryComment.size;
                    }
                    countComment()
                    if (
                      userId == commentUserId &&
                      selectTweetId == commentTweetid
                    ) {
                      let c = querrycomment;
                      console.log(comment);
                      content += '<div class="wehh" id= "wehh">';
                      content +=
                        "<p>" +
                        "<img id='image' src= '/images/profile.jpg' alt=''>" +
                        user +
                        " " +
                        "<span id= 'handle' >" +
                        handle +
                        "</span>" +
                        "</p>";
                      content += "<p id='post'>" + comment + "</p>";
                      content +=
                        "<p id='icon'>" +
                        "<i id='click' class='fa fa-comment-o' aria-hidden='true'>" +
                        "</i>" +
                        " " +
                        "<span>" +
                        "<i id='click' class='fa fa-retweet' aria-hidden='true'>" +
                        "</i>" +
                        " " +
                        "</span>" +
                        "<span>" +
                        "<i id='click' class='fa fa-heart-o' aria-hidden='true'>" +
                        "</i>" +
                        " " +
                        "</span>" +
                        "</p>";
                      content += "</div>";
                    }
                    $("#commentContainer").append(content);
                  });
                });
            });
        });
      });
  } else {
    window.location.href = "login.html";
  }
});
