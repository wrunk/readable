import React,  { Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import {humanDate} from "../utils"

// postsArr should just be one item...
export class PostDetails extends Component {
  componentDidMount(){
    // Don't try to load on post not found
    if(this.props.posts.length === 0){
      return
    }
    this.props.loadComments({postID: this.props.posts[0].id})

  }
  getComSort = () => {
    const {comments} = this.props
    return comments.sort((a, b) => {
      if( a.voteScore > b.voteScore){ return -1 }
      if( a.voteScore < b.voteScore){ return 1 }
      return 0
    })
  }

  render() {

    const {history, votePost, voteComment, deletePost, deleteComment, comments} = this.props
    if(this.props.posts.length === 0){
      return (
        <div>
          <h2>Error! Post not found</h2>
        </div>
      )
    }

    const {title, body, id, timestamp, category, deleted, voteScore, author} = this.props.posts[0]
    const commentCount = comments.reduce((accum, c) => c.deleted? accum: accum+1 , 0)

    return (
      <div>
        <h2>Post Details</h2>
        <div>
        <Button color="success" onClick={() => history.push('/create-post')}>Add New Post</Button>
          <Button color="success" onClick={() => votePost({option: 'upVote', postID: id})}>UpVote Post</Button>
          <Button color="danger" onClick={() => votePost({option: 'downVote', postID: id})}>DownVote Post</Button>

          <Button color="info" onClick={() => history.push('/edit-post/' + id)}>Edit Post</Button>
        <Button color="danger" onClick={() => {
          deletePost(id)
          history.push('/')
        }}>Delete Post</Button>

        </div>
        <ListGroup>
          <ListGroupItem key='title'>Title: {title}</ListGroupItem>
          <ListGroupItem key='body'>Body: {body}</ListGroupItem>
          <ListGroupItem key='id'>ID: {id}</ListGroupItem>
          <ListGroupItem key='timestamp'>Timestamp: {humanDate(timestamp)}</ListGroupItem>
          <ListGroupItem key='category'>Category: {category}</ListGroupItem>
          <ListGroupItem key='commentCount'>CommentCount: {commentCount}</ListGroupItem>
          <ListGroupItem key='deleted'>Deleted?: {deleted}</ListGroupItem>
          <ListGroupItem key='voteScore'>Vote Score: {voteScore}</ListGroupItem>
          <ListGroupItem key='author'>Author: {author}</ListGroupItem>
        </ListGroup>
        <h2>Comments</h2>
        <Button color="success" onClick={() => history.push('/create-comment/' + id)}>Add New Comment</Button>
        <ListGroup>
          {this.getComSort().filter((c) => !(c.deleted)).map((c) => (
            <ListGroupItem key={c.id}>
              <div>
              {c.body} - by {c.author}
              </div>
              <div>
                Vote Score: {c.voteScore}
              </div>
              <div>
                <Button color="success" onClick={() => voteComment({option: 'upVote', postID: id, commentID: c.id})}>UpVote Comment</Button>
                <Button color="danger" onClick={() => voteComment({option: 'downVote', postID: id, commentID: c.id})}>DownVote Comment</Button>

                <Button color="info" onClick={() => history.push('/edit-comment/' + id + '/' + c.id)}>Edit Comment</Button>
                <Button color="danger" onClick={() => deleteComment({postID: id, commentID: c.id})}>Delete Comment</Button>

              </div>
              </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    )
  }
}
