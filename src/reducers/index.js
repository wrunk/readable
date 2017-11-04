import {
  ADD_POST, GET_POSTS, VOTE_POST, GET_COMMENTS, ADD_COMMENT,
  VOTE_COMMENT, DELETE_POST, DELETE_COMMENT, EDIT_COMMENT, EDIT_POST
} from '../actions'

const initialState = {'posts': [], 'isLoading': true, 'comments': {}}

export default function reducePosts (state = initialState, action) {

  const {posts, comments, isLoading} = state

  switch (action.type){
    case ADD_POST:
      const {post} = action
      return {
        posts: [...posts, post],
        comments,
        isLoading
      }
    case GET_POSTS:
      const svrPosts = action.posts
      return {
        posts: [...svrPosts], isLoading: false, comments
      }
    case GET_COMMENTS:
      const svrComments = action.comments
      const cmts = {
        ...comments,
      }
      if(svrComments.length > 0){
        cmts[svrComments[0].parentId] = svrComments
      }
      return {
        comments: cmts,
        posts,
        isLoading
      }
    case ADD_COMMENT:
      const {comment} = action
      const oldComms = comments[comment.parentId] || []
      const coms = {
        ...comments,
        [comment.parentId]: [...oldComms, comment]
      }
      return {
        posts,
        isLoading,
        comments: coms
      }
    case VOTE_POST:
      const {votePost} = action
      const newPosts = posts.filter((p) => p.id !== votePost.postID)
      const vPost = posts.filter((p) => p.id === votePost.postID)[0]
      // TODO this sort of logic really shouldn't be in here. The server should give back the latest rep
      // of the post object to be subbed in.
      if(votePost.option === 'upVote'){
        vPost.voteScore++
      } else {
        vPost.voteScore--
      }
      return {
        isLoading,
        comments,
        posts: [...newPosts, vPost]
      }


    case VOTE_COMMENT:
      const {voteComment} = action
      const cid = voteComment.commentID
      const pid = voteComment.postID

      return {
        isLoading,
        comments: {
          ...comments,
          [pid]: comments[pid].map((c) => {
            if(c.id === cid) {
              if(voteComment.option === 'upVote'){
                return {...c, voteScore: c.voteScore + 1}
              }
              return {...c, voteScore: c.voteScore - 1}
            }
            return c
          })
        },
        posts
      }
    case DELETE_COMMENT:
      const {postID, commentID} = action.deleteComment

      return {
        isLoading,
        posts,
        comments: {
          ...comments,
          [postID]: comments[postID].map((c) => {
            if(c.id === commentID) {
              return {...c, deleted: true}
            }
            return c
          })

        }
      }

    case EDIT_POST:
      const po = action.post
      return {
        isLoading,
        posts: posts.map((p) => (
          (p.id === po.id) ? {...po}: p
        )),
        comments,
      }

    case EDIT_COMMENT:
      const co = action.comment
      return {
        isLoading,
        posts,
        comments: {
          ...comments,
          [co.parentId]: comments[co.parentId].map((c) => {
            if(c.id === co.id) {
              return {...co}
            }
            return c
          })
        }
      }

    case DELETE_POST:
      const pID= action.deletePost.postID

      return {
        isLoading,
        comments,
        posts: posts.map((p) => {
          if(p.id === pID){
            return {...p, deleted: true}
          }
          return p
        })
      }

    default:
      return state
  }
}
