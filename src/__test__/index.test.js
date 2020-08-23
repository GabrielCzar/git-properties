const build = require("../index");

build
  .buildGitInfo()
  .then((it) => console.log(it))
  .catch((err) => console.error(err));

build
  .default()
  .then((_) => console.log("FINISHED"))
  .catch((err) => console.error(err));
