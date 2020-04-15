import React from 'react';
export default ({ chats }) => (
  <ul className="container-fluid chat_list_ul d-block mx-auto">
    {chats.map((chat, i) => {
      return (
        <div key={i}>
          <div className="col-lg-4 col-xs-12">
            <div className="chatMessage_chat_list">
              <div className="box_chat_list">
                <p>
                  <strong>{chat.username}</strong>
                </p>
                <p>{chat.message}</p>
              </div>
              {/* <div className="imageHolder_chat_list">
                  <img
                    src="/images/avatar.png"
                    className="img-responsive avatar"
                    alt="logo"
                  />
                </div> */}
            </div>
          </div>
        </div>
      );
    })}
  </ul>
);
