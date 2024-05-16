firebase.auth().onAuthStateChanged((user)=>{
    if(user){

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
        // creating a tweet collection
        document.getElementById("send").onclick = function () {
            let tweet = document.getElementById("tweet").value;
            let sendtweet = firebase.firestore().collection("Tweets").doc();
            sendtweet
              .set({
                tweets: tweet,
                userId: uid,
                tweetId: sendtweet.id,
                timestamp: D.getTime(),
                likes: 0,
                rewtweets: 0
              })
              .then(() => {
                window.location.reload();
              });
          };
          // Fetching tweeets from cloud firestore
            // 1. We fetch user data first
          firebase.firestore().collection('users').doc(uid).get().then((userDoc)=>{
            let userId = userDoc.data().userID
            console.log(userId)
              // 2. Then fetch the tweets
            firebase.firestore().collection('tweets').doc().get().then((tweetDoc)=>{
                let tweet = tweetDoc.data().tweets
                console.log(tweet)

                // 3. Here is where we'll execute the code 
                // for displaying the tweets on the browser
            })
          })

          // N.B// THis code shoud be within the if statement

    } else{
        window.location.href = 'login.html'
    }
})