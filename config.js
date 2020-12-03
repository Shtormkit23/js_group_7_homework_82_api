const path = require("path");

const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, "public/uploads"),
  db: {
    name: "music",
    url: "mongodb://localhost"
  },
  fb: {
    appId: "2717404738523499",
    appSecret: "8b50dbb0536192dfc8460cfa3e0bd6e7"
  }
};