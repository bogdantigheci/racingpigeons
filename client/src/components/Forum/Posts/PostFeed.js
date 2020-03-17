import React from 'react';
import PostItem from './PostItem';

const PostFeed = props => {
  return (
    <div>
      {props.posts &&
        props.posts.posts &&
        props.posts.posts.map(post => <PostItem key={post._id} post={post} />)}
    </div>
  );
};
export default PostFeed;
