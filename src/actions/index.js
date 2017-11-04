import {createPostAPI, getAllPostsAPI, getCommentsAPI, createCommentAPI,
  votePostAPI, voteCommentAPI, deleteCommentAPI, deletePostAPI,
  editCommentAPI, editPostAPI} from "../posts_api_client"

export const ADD_POST = 'ADD_POST'
export const GET_POSTS = 'GET_POSTS'
export const VOTE_POST = 'VOTE_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const GET_COMMENTS = 'GET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'

// ------------------------------------------------------------------
// Posts
export const localGetPosts = (action) => {
  const {posts} = action
  return {
    type: GET_POSTS,
    posts
  }
}

export const getAllPosts = () => dispatch => {
  getAllPostsAPI().then(resp => resp.json()).then(postsArr => {
    dispatch(localGetPosts({'posts': postsArr}))
  })
}

export const localAddPost = (action) => {
  const {post} = action
  return {
    type: ADD_POST,
    post,
  }
}

// Thunked action creator. Returns a function (count the # of =>)
export const addPost = (post) => dispatch => {
  const {title, body, author, category} = post.post
  let bodyObj = {
    'title': title,
    'body': body,
    'author': author,
    'category': category,
  }

  const prom = createPostAPI(bodyObj)

  prom.then(resp => {
    // We should probably bail here if the http response fails yes?
    dispatch(localAddPost({post:bodyObj}))
  })
}

export const editPost = (post) => dispatch => {
  editPostAPI(post.post).then( () => {
    dispatch({type: EDIT_POST, post: post.post})
  })
}

export const votePost = (d) => dispatch => {
  votePostAPI(d).then(() => {
    dispatch({type: VOTE_POST, votePost: d})
  })
}

export const deletePost = (pid) => dispatch => {
  deletePostAPI(pid).then(() => {
    dispatch({type: DELETE_POST, deletePost: {postID: pid}})
  })
}

// ------------------------------------------------------------------
// Comments
export const localGetComments = (action) => {
  const {comments} = action
  return {
    type: GET_COMMENTS,
    comments
  }
}

export const getComments = ({postID}) => dispatch => {
  getCommentsAPI(postID).then(resp => resp.json()).then(commentsArr => {
    dispatch(localGetComments({'comments': commentsArr}))
  })
}

export const localAddComment = (action) => {
  const {comment} = action
  return {
    type: ADD_COMMENT,
    comment
  }
}

export const addComment = (comment) => dispatch => {

  const prom = createCommentAPI(comment.comment)

  prom.then(resp => {
    dispatch({type: ADD_COMMENT, comment:comment.comment})
  })
}

export const editComment = (comment) => dispatch => {

  const prom = editCommentAPI(comment.comment)

  prom.then(resp => {
    dispatch({type: EDIT_COMMENT, comment:comment.comment})
  })
}

export const voteComment = (d) => dispatch => {
  voteCommentAPI(d).then(resp => {
    dispatch({type: VOTE_COMMENT, voteComment: d})
  })
}

export const deleteComment = (d) => dispatch => {
  deleteCommentAPI(d.commentID).then(resp => {
    dispatch({type: DELETE_COMMENT, deleteComment: d})
  })
}
