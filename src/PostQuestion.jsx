import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import ReactMarkdown from 'react-markdown';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';

function PostQuestion() {
  const [code, setCode] = useState('');
  const [markdown, setMarkdown] = useState('');

  return (
    <div>
      <h2>Post a Question</h2>
      <div>
        <h3>Write Code</h3>
        <CodeMirror
          value={code}
          options={{
            mode: 'javascript',
            theme: 'material',
            lineNumbers: true,
          }}
          onBeforeChange={(editor, data, value) => {
            setCode(value);
          }}
        />
      </div>
      <div>
        <h3>Write Markdown</h3>
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Write your markdown here..."
        />
      </div>
      <div>
        <h3>Preview</h3>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}

export default PostQuestion;
