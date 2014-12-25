exports = module.exports = {};

exports.genRandomId = function(){
  return Math.random().toString(36).replace(/[^a-z]+/g, '').slice(0,4);
};

exports.defaultMarkdownMessage = "class: center, middle\n\n"+
  "# Slideshow from markdown\n\n"+
  "Powered by [remark](https://github.com/gnab/remark) & [firebase](https://firebase.com)\n\n"+
  "[Our github repository](https://github.com/juanpabloaj/platon)\n\n"+
  "---\n\n"+
  "# more details about syntax \n\n"+
  "- [Remark](https://github.com/gnab/remark)\n"+
  "- [Wikipedia markdown](http://en.wikipedia.org/wiki/Markdown)\n"+
  "- [Github Markdown Cheatsheet]"+
  "(https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)";
