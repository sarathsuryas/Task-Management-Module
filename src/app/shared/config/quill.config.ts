import { QuillModules } from 'ngx-quill';

export const QUILL_EDITOR_CONFIG: QuillModules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
  ],
};
