import { Quill } from 'react-quill';
import { ImageDrop } from 'quill-image-drop-module';
import ImageResize from 'quill-image-resize-module';

Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageDrop', ImageDrop);

const Link = Quill.import('formats/link');
Link.sanitize = function(url) {
  console.log(url);
  return url;
};

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 * https://github.com/kensnyder/quill-image-resize-module/issues/7#issuecomment-304463415
 */

const popOverMenu = [
  [{ header: '2' }],
  [{ color: ['black', 'red', 'green', 'blue'] }],
  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  ['link'],
  ['clean'],
];

const sideMenu = [
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['image', 'video'],
  ['clean'],
];

const quillModules = isSideMenu => ({
  imageDrop: true,
  imageResize: {},
  toolbar: isSideMenu ? sideMenu : popOverMenu,
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
});

export default quillModules;
