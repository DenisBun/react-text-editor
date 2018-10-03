import { Quill } from 'react-quill';
import {ImageDrop} from 'quill-image-drop-module';
import ImageResize from 'quill-image-resize-module';

Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageDrop', ImageDrop);

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 * https://github.com/kensnyder/quill-image-resize-module/issues/7#issuecomment-304463415
 */
const quillModules = {
  imageDrop: true,
  imageResize: {},
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
};

export default quillModules;