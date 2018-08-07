var request = require("request");
var fs = require("fs");
var secrets = require("./secrets.js");

console.log('Welcome to the GithubAvatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
    },
    Authorization: 'token ' + secrets.GITHUB_TOKEN
  };

  request(options, function(err, res, body) {
    cb(err, JSON.parse(body));
  });
}

function downloadImageByURL(url, filePath) {
  request(url).pipe(fs.createWriteStream(filePath));
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  fs.mkdirSync("./avatars");
  for (var contributor of result) {
    downloadImageByURL(contributor.avatar_url, "./avatars/" + contributor.login + ".jpg");
  }
});

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./kvirani.jpg")