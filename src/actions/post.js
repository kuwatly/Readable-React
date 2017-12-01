import {
  apiAddPost,
  apiEditPost,
  apiDeletePost,
  apiGetPosts,
  apiUpVotePost,
  apiDownVotePost,
  apiGetPostsForCategory,
  apiGetPostDetails,
} from "../api/post";

export const LOAD_POSTS = 'LOAD_POSTS';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const VOTE_UP_POST = 'VOTE_UP_POST';
export const VOTE_DOWN_POST = 'VOTE_DOWN_POST';
export const HANDLE_POST_CONTENTS_CHANGE = 'HANDLE_POST_CONTENTS_CHANGE';
export const LOAD_POSTS_FOR_CATEGORY = 'LOAD_POSTS_FOR_CATEGORY';
export const LOAD_POST_DETAILS = 'LOAD_POST_DETAILS';

export const loadPosts = () => dispatch => (
  apiGetPosts()
    .then(posts => dispatch({
      type: LOAD_POSTS,
      posts
    }))
);

export const addPost = (post) => dispatch => (
  apiAddPost(post)
    .then(newPost => dispatch({
      type: ADD_POST,
      newPost
    }))
);

export const editPost = ({id, title, body}) => dispatch => (
  apiEditPost({id, title, body})
    .then(post => dispatch({
      type: EDIT_POST,
      post
    }))
);

export const removePost = (id) => dispatch => (
  apiDeletePost(id)
    .then(() => dispatch({
      type: REMOVE_POST,
      id
    }))
);

export const voteUpPost = (post) => dispatch => (
  apiUpVotePost(post.id)
    .then(post => dispatch({
      type: VOTE_UP_POST,
      post
    }))
);

export const voteDownPost = (post) => dispatch => (
  apiDownVotePost(post.id)
    .then(post => dispatch({
      type: VOTE_DOWN_POST,
      post
    }))
);

export const handlePostContentsChange = (posts) => ({
  type: HANDLE_POST_CONTENTS_CHANGE,
  posts
});

export const fetchPostsByCategory = (category) => dispatch => (
  apiGetPostsForCategory(category)
    .then(posts => dispatch({
      type: LOAD_POSTS_FOR_CATEGORY,
      category,
      posts
    }))
);

export const fetchPostDetails = (id) => dispatch => (
  apiGetPostDetails(id)
    .then(post => dispatch({
      type: LOAD_POST_DETAILS,
      post
    }))
);