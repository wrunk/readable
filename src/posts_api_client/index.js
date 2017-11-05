
const urlBase = 'http://localhost:3001'
const authToken = 'user-hello'

export const getAllPostsAPI = () => {
  return fetch(urlBase + '/posts', {
    'headers': {'Authorization': authToken}
  })
}

// We don't do error checking at this point
export const createPostAPI = (postBodyObj) => {
  const uuidv4 = require('uuid/v4'); // WHYTF is this using require??

  postBodyObj['id'] = uuidv4()
  postBodyObj['timestamp'] = Date.now()

  return fetch(urlBase + '/posts', {
    'method': 'POST',
    'headers': {"Authorization": authToken, 'Content-Type': 'application/json'},
    'body': JSON.stringify(postBodyObj)
  })
}

export const editPostAPI = (postBodyObj) => {
  postBodyObj['timestamp'] = Date.now()
  return fetch(urlBase + '/posts/' + postBodyObj.id, {
    'method': 'PUT',
    'headers': {"Authorization": authToken, 'Content-Type': 'application/json'},
    'body': JSON.stringify(postBodyObj)
  })

}

export const getCommentsAPI = (postID) => {
  return fetch(urlBase + '/posts/' + postID + '/comments', {
    'headers': {'Authorization': authToken}
  })
}

export const createCommentAPI = (postBodyObj) => {
  const uuidv4 = require('uuid/v4'); // WHYTF is this using require??

  postBodyObj['id'] = uuidv4()
  postBodyObj['timestamp'] = Date.now()
  postBodyObj['voteScore'] = 1

  return fetch(urlBase + '/comments', {
    'method': 'POST',
    'headers': {"Authorization": authToken, 'Content-Type': 'application/json'},
    'body': JSON.stringify(postBodyObj)
  })
}

export const editCommentAPI = (postBodyObj) => {
  postBodyObj['timestamp'] = Date.now()

  return fetch(urlBase + '/comments/' + postBodyObj.id, {
    'method': 'PUT',
    'headers': {"Authorization": authToken, 'Content-Type': 'application/json'},
    'body': JSON.stringify(postBodyObj)
  })
}

export const votePostAPI = (postBodyObj) => {
  const {postID} = postBodyObj
  return fetch(urlBase + '/posts/' + postID, {
    'method': 'POST',
    'headers': {"Authorization": authToken, 'Content-Type': 'application/json'},
    'body': JSON.stringify(postBodyObj)
  })
}

export const voteCommentAPI = (postBodyObj) => {
  const {commentID} = postBodyObj
  return fetch(urlBase + '/comments/' + commentID, {
    'method': 'POST',
    'headers': {"Authorization": authToken, 'Content-Type': 'application/json'},
    'body': JSON.stringify(postBodyObj)
  })
}

export const deleteCommentAPI = (commentID) => {
  return fetch(urlBase + '/comments/' + commentID, {
    'method': 'DELETE',
    'headers': {"Authorization": authToken, 'Content-Type': 'application/json'}
  })
}

export const deletePostAPI = (postID) => {
  return fetch(urlBase + '/posts/' + postID, {
    'method': 'DELETE',
    'headers': {"Authorization": authToken, 'Content-Type': 'application/json'}
  })
}
