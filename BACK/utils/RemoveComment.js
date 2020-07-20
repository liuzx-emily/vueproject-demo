const fs = require("fs");
class RemoveComment {

  // 是否正处在一段多行注释中
  multiLineCommentsFlag = false;

  constructor({ srcFile, targetFile }) {
    if (/\.vue/.test(srcFile)) {
      // 处理 .vue 文件
      this.process_vue({ srcFile, targetFile });
    } else if (/\.js/.test(srcFile)) {
      // 处理 .js 文件
      this.process_js({ srcFile, targetFile });
    } else if (/\.scss/.test(srcFile)) {
      // 处理 .scss 文件
      this.process_scss({ srcFile, targetFile });
    } else {
      // 其他格式文件，直接复制
      fs.copyFileSync(srcFile, targetFile)
    }
  }

  process_js({ srcFile, targetFile }) {
    const content = fs.readFileSync(srcFile, { encoding: 'utf8' });
    const content_new = this.processCodeBlock({ content, multiLineCommentsStart: "/*", multiLineCommentsEnd: "*/", singleLineComments: "//" })
    fs.writeFileSync(targetFile, content_new)
  }

  process_scss({ srcFile, targetFile }) {
    const content = fs.readFileSync(srcFile, { encoding: 'utf8' });
    const content_new = this.processCodeBlock({ content, multiLineCommentsStart: "/*", multiLineCommentsEnd: "*/", singleLineComments: "//" })
    fs.writeFileSync(targetFile, content_new)
  }

  process_vue({ srcFile, targetFile }) {
    // 每个 .vue 文件中，有一个 <script>，0或1个 <template>，任意个 <style>
    const content = fs.readFileSync(srcFile, { encoding: 'utf8' });
    let leftover = content;
    // 1个 <script>
    const scriptRes = /<script>[\d\D]*<\/script>/.exec(leftover);
    leftover = splice(leftover, scriptRes.index, { howmany: scriptRes[0].length })
    const script_new = this.processCodeBlock({ content: scriptRes[0], multiLineCommentsStart: "/*", multiLineCommentsEnd: "*/", singleLineComments: "//" })
    // 0或1个 <template>
    const templateRes = /<template>[\d\D]*<\/template>/.exec(leftover);
    let template_new;
    if (templateRes) {
      leftover = splice(leftover, templateRes.index, { howmany: templateRes[0].length })
      template_new = this.processCodeBlock({ content: templateRes[0], multiLineCommentsStart: "<!--", multiLineCommentsEnd: "-->", singleLineComments: undefined })
    } else {
      template_new = "";
    }
    // 任意个 <style>
    var styleArr = leftover.match(/<style[^<]*>[^<]*<\/style>/gi) || [];
    var styleArr_new = [];
    for (let i = 0; i <= styleArr.length - 1; i++) {
      let style_new
      if (/lang="scss"|lang='scss'/.test(styleArr[i])) {
        style_new = this.processCodeBlock({ content: styleArr[i], multiLineCommentsStart: "/*", multiLineCommentsEnd: "*/", singleLineComments: "//" })
      } else {
        style_new = this.processCodeBlock({ content: styleArr[i], multiLineCommentsStart: "/*", multiLineCommentsEnd: "*/", singleLineComments: undefined })
      }
      styleArr_new.push(style_new);
    }
    const freshContent = template_new + '\n' + script_new + '\n' + styleArr_new.join("\n")
    fs.writeFileSync(targetFile, freshContent)
  }

  /* 
    处理一段代码
      multiLineCommentsStart ：多行注释起始标志
      multiLineCommentsEnd ：多行注释结束标志
      singleLineComments : 单行注释标志
   */
  processCodeBlock({ content, multiLineCommentsStart, multiLineCommentsEnd, singleLineComments } = { multiLineCommentsStart: undefined, multiLineCommentsEnd: undefined, singleLineComments: undefined }) {
    const lineArr = content.split(/\n/);
    const lineArr_new = [];
    // 每次处理一段代码前，先将 multiLineCommentsFlag 重置为false
    this.multiLineCommentsFlag = false;
    for (const line of lineArr) {
      // 一行行的处理代码
      let res = this.processOneLine({ line, multiLineCommentsStart, multiLineCommentsEnd, singleLineComments });
      if (res) {
        lineArr_new.push(res);
      }
    }
    const content_new = lineArr_new.join("\n");
    return content_new;
  }

  /* 
    处理一行代码
   */
  processOneLine({ line, multiLineCommentsStart, multiLineCommentsEnd, singleLineComments }) {
    let content = line;
    if (this.multiLineCommentsFlag) {// multiLineCommentsFlag 为 true，说明肯定有多行注释，不需要再验证 multiLineCommentsStart 是否存在
      // 处在一段多行注释中，只找 */
      if (content.includes(multiLineCommentsEnd)) {
        this.multiLineCommentsFlag = false;
        content = content.slice(content.indexOf(multiLineCommentsEnd) + multiLineCommentsEnd.length);  // 去掉 */ 前面的内容
        return this.processOneLine({ line: content, multiLineCommentsStart, multiLineCommentsEnd, singleLineComments });  // 递归
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
    let pos1 = -1;
    let pos2 = -1;
    if (singleLineComments) {
      /* 
        这里的 if 条件不能改成 content.indexOf 或者 content.includes，因为当注释标志为 undefined 时：
        'ha undefined'.indexOf(undefined)===3
        'ha undefined'.includes(undefined)===true
       */
      pos1 = content.indexOf(singleLineComments);
    }
    if (multiLineCommentsStart) {
      pos2 = content.indexOf(multiLineCommentsStart);
    }
    if (pos1 !== -1 && (pos2 === -1 || pos1 < pos2)) {
      content = content.slice(0, pos1);  // 去掉单行注释后面的内容
    } else if (pos2 !== -1) {
      let pos3 = content.indexOf(multiLineCommentsEnd);
      if (pos3 !== -1) {
        // 这段多行注释在当前行就结束了
        content = splice(content, pos2, { endIndex: pos3 + multiLineCommentsEnd.length }); // 删掉 /*  */ 中间的内容
        return this.processOneLine({ line: content, multiLineCommentsStart, multiLineCommentsEnd, singleLineComments });  // 递归
      } else {
        // 跨行了
        this.multiLineCommentsFlag = true;
        content = content.slice(0, pos2);  // 去掉 /* 后面的内容
      }
    }
    if (/^\s*$/.test(content)) {
      // 空白行不写入
      return;
    }
    return content;
  }

}
// str 的 splice 方法（ 模仿 Array.prototype.splice ）
function splice(str, startIndex, { howmany, endIndex }) {
  if (howmany && !endIndex) {
    endIndex = startIndex + howmany
  }
  return str.slice(0, startIndex) + str.slice(endIndex);
}

module.exports = RemoveComment 