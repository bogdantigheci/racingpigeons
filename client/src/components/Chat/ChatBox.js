import React from 'react';
const ChatBox = ({ text, username, handleTextChange }) => (
  <div className="container">
    <div className="chat_box">
      <div className="col-xs-12">
        <div className="chat">
          <div className="col-xs-5 col-xs-offset-3">
            <input
              type="text"
              value={text}
              placeholder="Enter your message here..."
              className="form-control"
              onChange={handleTextChange}
              onKeyDown={handleTextChange}
            />
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    </div>
  </div>
);
export default ChatBox;
