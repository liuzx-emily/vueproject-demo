
const fs = require("fs");
const RemoveComment = require("../utils/RemoveComment.js")

const removeComments = async (ctx, next) => {
  try {
    processDir("../FRONT/src_original", "../FRONT/src");
    // processOneFile("F:/test/demo.vue", "F:/test/demo2.vue");
    ctx.response.body = { code: 1 };
  } catch (error) {
    ctx.response.body = { code: 0, message: error.toString() };
  }
};

module.exports = [
  { method: 'GET', url: "/magic/removeComments.nb", function: removeComments },
];

function processDir(srcDir, targetDir) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }
  const res = fs.readdirSync(srcDir, { withFileTypes: true }); //路径是从node运行根目录开始算
  for (let i in res) {
    let o = res[i]
    if (o.isFile()) {
      processOneFile(srcDir + "/" + o.name, targetDir + "/" + o.name)
    } else {
      processDir(srcDir + "/" + o.name, targetDir + "/" + o.name);
    }
  }
}

function processOneFile(srcFile, targetFile) {
  new RemoveComment({ srcFile, targetFile });
}
