const path = require("path");

const rootPath = __dirname;

let dbName = "music"

if(process.env.NODE_ENV === "test") {
  dbName = "music_test";
}

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, "public/uploads"),
  db: {
    name: dbName,
    url: "mongodb://localhost"
  },
  fb: {
    appId: "2717404738523499",
    appSecret: "8b50dbb0536192dfc8460cfa3e0bd6e7"
  }
};