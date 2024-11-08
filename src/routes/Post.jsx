// src/routes/Post.jsx
import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import ReactMarkdown from 'react-markdown';
import { db, auth } from '../utils/firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/markdown/markdown';
import './Post.css';             

function Post() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [postData, setPostData] = useState({
    title: '',
    code: '',
    markdown: '',
    language: 'javascript'
  });

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'xml', label: 'HTML/XML' },
    { value: 'markdown', label: 'Markdown' }
  ];

  const validatePost = () => {
    if (!postData.title.trim()) {
      setError('Please enter a title');
      return false;
    }
    if (!postData.code.trim() && !postData.markdown.trim()) {
      setError('Please enter either code or description');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate the post
    if (!validatePost()) return;

    // Check if user is authenticated
    if (!auth.currentUser) {
      setError('Please log in to create a post');
      navigate('/login');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create post object
      const post = {
        title: postData.title,
        code: postData.code,
        markdown: postData.markdown,
        language: postData.language,
        userId: auth.currentUser.uid,
        author: auth.currentUser.displayName || auth.currentUser.email,
        createdAt: serverTimestamp(),
        likes: 0,
        comments: []
      };

      console.log('Post data before sending:', post); // Log post data for debugging

      // Add post to Firestore
      const docRef = await addDoc(collection(db, 'posts'), post);
      alert('Post created successfully!');

      // Reset form
      setPostData({
        title: '',
        code: '',
        markdown: '',
        language: 'javascript'
      });

      // Redirect to the post view page
      navigate(`/posts/${docRef.id}`);
      
    } catch (error) {
      console.error('Error creating post:', error);
      setError(`Failed to create post: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="post-container">
      <form onSubmit={handleSubmit} className="post-form">
        <div className="post-card">
          <h2>Create a Post</h2>
          
          {error && <div className="error-message">{error}</div>}

          {/* Title Input */}
          <div className="form-group">
            <label>Post Title</label>
            <input
              type="text"
              value={postData.title}
              onChange={(e) => setPostData({ ...postData, title: e.target.value })}
              placeholder="Enter post title..."
              className="title-input"
            />
          </div>

          {/* Code Editor Section */}
          <div className="form-group">
            <div className="code-header">
              <label>Code Editor</label>
              <select
                value={postData.language}
                onChange={(e) => setPostData({ ...postData, language: e.target.value })}
                className="language-select"
              >
                {languages.map(lang => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="code-editor">
              <CodeMirror
                value={postData.code}
                options={{
                  mode: postData.language,
                  theme: 'material',
                  lineNumbers: true,
                  lineWrapping: true
                }}
                onBeforeChange={(editor, data, value) => {
                  setPostData({ ...postData, code: value });
                }}
              />
            </div>
          </div>

          {/* Markdown Section */}
          <div className="form-group">
            <label>Description (Markdown)</label>
            <div className="markdown-container">
              <div className="markdown-editor">
                <textarea
                  value={postData.markdown}
                  onChange={(e) => setPostData({ ...postData, markdown: e.target.value })}
                  placeholder="Write your post content in markdown..."
                />
              </div>
              <div className="markdown-preview">
                <h4>Preview</h4>
                <div className="preview-content">
                  <ReactMarkdown>{postData.markdown}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Post...' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Post;
