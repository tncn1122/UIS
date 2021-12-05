import React, { useState } from "react";
import hljs from 'highlight.js'
import ReactQuill, { Quill } from 'react-quill';
import { ImageDrop } from 'quill-image-drop-module'
import katex from "katex";
import ImageResize from 'quill-image-resize-module-react'
import VideoResize from 'quill-video-resize-module2'
import htmlEditButton from 'quill-html-edit-button';
import 'highlight.js/styles/vs2015.css'
import 'react-quill/dist/quill.snow.css';
import './style.overwrite.scss'
import "katex/dist/katex.min.css";

window.katex = katex;

// TODO resize image
Quill.register({
  'modules/ImageResize': ImageResize,
  'modules/imageDrop': ImageDrop,
  'modules/htmlEditButton': htmlEditButton,
  'modules/VideoResize': VideoResize,
});

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
const modules = {
  syntax: {
    highlight: text => hljs.highlightAuto(text).value,
  },
  toolbar: [
    [{ 'font': [] }, { 'size': [] }],
    [{ 'color': [] }, { 'background': [] }, 'bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block', { script: 'sub' }, { script: 'super' }, 'formula'],
    [{ 'align': [] }, { 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image', 'video'],
  ],
  htmlEditButton: {
    buttonHTML: "HTML",
    okText: "Ok",
    cancelText: "Cancel",
  },
  ImageResize: {
    // parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize', 'Toolbar']
  },
  VideoResize: {
    modules: ['Resize', 'DisplaySize', 'Toolbar'],
    tagName: 'iframe', // iframe | video
  },
  imageDrop: true,
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}

/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote', 'script', 'formula', 'color', 'background',
  'code-block',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',
  'align', 'height', 'width', 'class', 'style'
]

const RichTextEditor = (props) => {
  const { onChange, value, readOnly } = props

  return (
    <ReactQuill
      theme="snow"
      value={value || ''}
      formats={formats}
      modules={readOnly ? { toolbar: false } : modules}
      onChange={onChange}
      readOnly={readOnly}
    />
  );
}
RichTextEditor.defaultProps = {
  readOnly: false,
}

export default RichTextEditor