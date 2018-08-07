var request = require("request");
var fs = require("fs");
var authentication = '-u jordanyoungs:da296213625280444dcfaa6cdae0a7e6b21d9d84 ';

console.log('Welcome to the GithubAvatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
  // var error = null;
  // request.get("https://api.github.com/repos/" + repoOwner + "/" + repoName
  //   + "/contributors/" + "?access_token=" + token)
  // .on('error', function (err) {
  //   error = err;
  // })
  // .on('response', function (response) {
  //   cb(error, response);
  //   })
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});