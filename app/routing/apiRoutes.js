// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendData = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

  // app.get("/api/waitlist", function(req, res) {
  //   res.json(waitListData);
  // });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware

    // Compatability logic goes here
    // if (friendData.length < 5) {
      console.log(req.body);
      // req.friendData.friendScore = JSON.parse(req.friendData.friendScore);
      friendData.push(req.body);
      friendData[friendData.length-1].friendScore=JSON.parse(friendData[friendData.length-1].friendScore);
      console.log(friendData);

      total=friendData.length-1;
      console.log("total: " +total);
      lowScore = 100;
      matchindex = -1;
      score = 0;

      for (var i=0; i<friendData.length-1; i++) {
        for (var j=0; j<friendData[i].friendScore.length;j++){
          score += Math.abs(friendData[i].friendScore[j]-friendData[total].friendScore[j])
          console.log("for loop score: " + score);
        }
        if (score<lowScore) {
          lowScore = score;
          console.log("lowscore: " + lowScore);
          matchIndex = i;
          console.log("match index:" + matchIndex);
          // score = 0;
        };
        score = 0;
      };
      res.json(friendData[matchIndex]);
      // res.json(friendData[matchIndex].friendName);
      // res.json(friendData[matchIndex].friendPhoto);


      // res.json(true);
    // }
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function() {
    // Empty out the arrays of data
    friendData = [];
    // waitListData = [];

    console.log(friends);
  });
};
