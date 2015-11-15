exports = module.exports = {};

var ID_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz'+
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
var ID_LENGTH     = 4;

exports.genRandomId = function(){
    var id = '';
    for (var x = 0; x < ID_LENGTH; x++) {
        id += ID_CHARACTERS.charAt(Math.floor(Math.random() * 62));
    }

    return id;
};

exports.defaultMarkdownMessage = 'class: center, middle\n\n'+
  '# Edit the text and create your slideshow\n\n'+
  'Created by [juanpabloaj](https://twitter.com/juanpabloaj), '+
  'powered by [remark](https://github.com/gnab/remark) & '+
  '[firebase](https://firebase.com)\n\n'+
  '[Our github repository](https://github.com/juanpabloaj/platon)\n\n'+
  '---\n\n'+
  '# More details about syntax \n\n'+
  '- [Remark](https://github.com/gnab/remark)\n'+
  '- [Wikipedia markdown](http://en.wikipedia.org/wiki/Markdown)\n'+
  '- [Github Markdown Cheatsheet]'+
  '(https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)\n\n'+
  '---\n\n'+
  '## Slideshow from a github gist\n\n'+
  'Create a github gist with markdown code\n\n'+
  'https://gist.github.com/\n\n'+
  'Example\n\n'+
  'https://gist.github.com/juanpabloaj/8f231e0003db50c1fcb7\n\n'+
  'with the gist id generate the presentation\n\n'+
  'http://platon.io/gist/8f231e0003db50c1fcb7';
