// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

!function(){function e(e){test.mode(e,r,Array.prototype.slice.call(arguments,1),"multiplexing")}CodeMirror.defineMode("markdown_with_stex",function(){var e=CodeMirror.getMode({},"stex"),r=CodeMirror.getMode({},"markdown"),o={open:"$",close:"$",mode:e,delimStyle:"delim",innerStyle:"inner"};return CodeMirror.multiplexingMode(r,o)});var r=CodeMirror.getMode({},"markdown_with_stex");e("stexInsideMarkdown","[strong **Equation:**] [delim $][inner&tag \\pi][delim $]")}();