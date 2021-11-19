import React from 'react'
import hljs from 'highlight.js'
import ReactQuill from 'react-quill'
import katex from 'katex'
import 'highlight.js/styles/vs2015.css'
import 'react-quill/dist/quill.bubble.css'
import './style.overwrite.scss'
import 'katex/dist/katex.min.css'

window.katex = katex

const modules = {
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
  },
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'script',
  'formula',
  'code-block',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'align',
  'height',
  'width',
  'class',
  'style',
  'color', 'background'
]

const HtmlRender = (props) => {
  const { htmlData } = props
  const readOnly = true
  return (
    // <div dangerouslySetInnerHTML={{ __html: htmlData }} />
    <ReactQuill
      value={htmlData}
      readOnly={readOnly}
      theme="bubble"
      modules={modules}
      formats={formats}
    />
  )
}

export default HtmlRender
