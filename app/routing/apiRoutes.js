

var friendData = require("../data/friends");



module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });


  app.post("/api/friends", function(req, res) {
   
      console.log(req.body);

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

  });



  app.post("/api/clear", function() {
    // Empty out the arrays of data
    friendData = [];
    // waitListData = [];

    console.log(friends);
  });
};
