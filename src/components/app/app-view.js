import React, {useState} from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
import translate from 'engine/translator';
import cssTranslate from 'engine/styles/css-translator';

import './app.sass';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';

function AppView() {
  const [data, setData] = useState(() => {
    if (localStorage)
    {
      const input = localStorage.getItem('input');
      if (input)
      {
        return input;
      }
    }
    return '';
  });

  const output = translate(data);
  const style = cssTranslate(output.components);

  return (
    <div className={'App'}>
      <CodeMirror
        className={'App__main'}
        value={data}
        options={{
          mode: 'htmlmixed',
          theme: 'material',
          lineNumbers: true,
          lineWrapping: true
        }}
        onBeforeChange={(editor, data, value) => {
          setData(value);
        }}
        onChange={(editor, data, value) => {
          if (localStorage)
          {
            localStorage.setItem('input', value);
          }
        }}
      />
      <CodeMirror
          className={'App__html'}
          value={output.html}
          options={{
            mode: 'htmlmixed',
            theme: 'material',
            lineNumbers: true,
            readOnly: true,
            lineWrapping: true
          }}
      />
      <CodeMirror
          className={'App__style'}
          value={style}
          options={{
            mode: 'css',
            theme: 'material',
            lineNumbers: true,
            readOnly: true,
            lineWrapping: true
          }}
      />
    </div>
  );
}

export default AppView;
