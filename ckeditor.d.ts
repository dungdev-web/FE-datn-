declare module '@ckeditor/ckeditor5-react' {
  import * as React from 'react';
  import { Editor } from '@ckeditor/ckeditor5-core';

  export interface CKEditorProps {
    editor: any;
    data?: string;
    config?: object;
    disabled?: boolean;
    id?: string;
    name?: string;
    onReady?: (editor: Editor) => void;
    onChange?: (event: Event, editor: Editor) => void;
    onBlur?: (event: Event, editor: Editor) => void;
    onFocus?: (event: Event, editor: Editor) => void;
  }

  export class CKEditor extends React.Component<CKEditorProps> {}
}

declare module '@ckeditor/ckeditor5-build-classic' {
  import { Editor } from '@ckeditor/ckeditor5-core';
  const ClassicEditor: {
    new (...args: any[]): Editor;
    create: (...args: any[]) => Promise<Editor>;
  };
  export default ClassicEditor;
}
