import React, {useState} from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
import translate from 'engine/translator';
import cssTranslate from 'engine/styles/css-translator';
import scssfmt from 'scssfmt';

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

  let html, style;
  try
  {
    const output = translate(data);
    style = scssfmt(cssTranslate(output.components));
    html = output.html;
  }
  catch (e)
  {
    console.error(e);
    html = '';
    style = '';
  }
  const display =
      '<!DOCTYPE html>' +
      '<html>' +
        '<head>' +
          '<link rel="stylesheet"' +
          '      href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.0.5/tailwind.min.css">' +
        '</head>' +
        '<body>' +
          data +
        '</body>' +
      '</html>';

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
      <iframe className={'App_display'} src={'data:text/html,' + display} sandbox={''}/>
      <CodeMirror
          className={'App__html'}
          value={html}
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
            mode: 'text/x-scss',
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
