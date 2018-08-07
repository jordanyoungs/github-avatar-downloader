var request = require("request");
var fs = require("fs");
var secrets = require("./secrets.js");
var owner = process.argv[2];
var name = process.argv[3];

if (!owner) {
  console.log("Must provide repo owner argument!");
  return;
}
if (!name) {
  console.log("Must provide repo name argument!");
  return;
}

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

getRepoContributors(owner, name, function(err, result) {
  console.log("Errors:", err);
  if (!fs.existsSync("./avatars")) {
    fs.mkdirSync("./avatars");
  }
  for (var contributor of result) {
    downloadImageByURL(contributor.avatar_url, "./avatars/" + contributor.login + ".jpg");
  }
});

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./kvirani.jpg")