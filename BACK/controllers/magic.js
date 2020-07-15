const fs = require("fs");
const os = require('os');
const readline = require('readline');

let multiLineCommentsFlag = false;
/* 
  使用：用浏览器直接访问 http://localhost:3526/magic/removeComments.nb
  清除注释。说明：
  - srcDir 中的内容不会变化
  - 只处理 .js 和 .vue 文件
  - 忽略标致：magic-remove-comments-ignore-line
  - 有 eslint-disable 的行不会进行处理
 */
const removeComments = async (ctx, next) => {
  try {
    const srcDir = "../FRONT/src"
    const targetDir = "../FRONT/src2"
    await processDir(srcDir, targetDir);
    ctx.response.body = { code: 1 };
  } catch (error) {
    ctx.response.body = { code: 0, message: error };
  }
};

module.exports = [
  { method: 'GET', url: "/magic/removeComments.nb", function: removeComments },
];

// tools
async function processDir(srcDir, targetDir) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }
  const res = fs.readdirSync(srcDir, { withFileTypes: true }); //路径是从node运行根目录开始算
  for (let i in res) {
    let o = res[i]
    if (o.isFile()) {
      await processOneFile(srcDir + "/" + o.name, targetDir + "/" + o.name)
    } else {
      await processDir(srcDir + "/" + o.name, targetDir + "/" + o.name);
    }
  }
}

async function processOneFile(srcFile, targetFile) {
  // 只处理 .js 和 .vue 文件。其他格式文件，直接复制
  if (!/\.vue|js/.test(srcFile)) {
    fs.copyFileSync(srcFile, targetFile)
    return;
  }
  const fr = fs.createReadStream(srcFile);
  const fw = fs.createWriteStream(targetFile);
  const rl = readline.createInterface({
    input: fr,
    crlfDelay: Infinity
  });
  // 注意：我们使用 crlfDelay 选项将 input.txt 中的所有 CR LF 实例（'\r\n'）识别为单个换行符。
  for await (const line of rl) {
    let res = processOneLine(line);
    if (res) {
      fw.write(res + os.EOL);
    }
  }
}
function processOneLine(line) {
  let content = line;
  if (multiLineCommentsFlag) {
    // 处在一段多行注释中，只找 */
    if (content.includes("*/")) {
      multiLineCommentsFlag = false;
      content = content.slice(content.indexOf("*/") + 2);  // 去掉 */ 前面的内容
      return processOneLine(content);  // 递归
    } else {
      return;
    }
  }
  // 走到这里，说明不处在多行注释中

  // 看到忽视标志，那么这行不处理。并且删掉忽视标志
  if (content.includes("magic-remove-comments-ignore-line")) {
    return content.replace("magic-remove-comments-ignore-line", "");
  }
  // eslint-disable不能删，不然lint通不过就报错了
  if (content.includes("eslint-disable")) {
    return content;
  }

  let pos1 = content.indexOf("//");
  let pos2 = content.indexOf("/*");
  if (pos1 !== -1 && (pos2 === -1 || pos1 < pos2)) {
    content = content.slice(0, pos1);  // 去掉//后面的内容【//存在，并且//比/*靠前或者/*根本不存在】
  } else if (pos2 !== -1) {
    let pos3 = content.indexOf("*/");
    if (pos3 !== -1) {
      // 这段多行注释在当前行就结束了
      content = content.slice(0, pos2) + content.slice(pos3 + 2); // 删掉 /* */中间的内容
      return processOneLine(content);  // 递归
    } else {
      // 跨行了
      multiLineCommentsFlag = true;
      content = content.slice(0, pos2);  // 去掉 /* 后面的内容
    }
  }
  if (/^\s*$/.test(content)) {
    // 空白行不写入
    return;
  }
  return content;
}