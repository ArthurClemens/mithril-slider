const sh = require("shelljs");

sh.rm("-rf", "../gh-pages/*");
sh.cp("-R", "packages/examples/dist/assets", "../gh-pages/");
sh.cp("-R", "packages/examples/dist/data", "../gh-pages/");
sh.cp("-R", "packages/examples/dist/js", "../gh-pages/");
sh.cp("packages/examples/dist/index.html", "../gh-pages/");