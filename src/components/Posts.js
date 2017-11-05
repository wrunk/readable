import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom'
import {humanDate} from "../utils"

// TODO probably could just be a function component
export default class Posts extends Component {
  state = {
    sortSelect: 1
  }

  changeSort(sortSelect) {
    this.setState({ sortSelect });
  }
  // Get a new array of posts based on the current sortSelect!
  getSortedPosts(posts){

    switch (this.state.sortSelect){
      case 1: // Vote Score DESC
        return posts.sort((a, b) => {
          if( a.voteScore > b.voteScore){ return -1 }
          if( a.voteScore < b.voteScore){ return 1 }
          return 0
        })
      case 2: // Vote Score ASC
        return posts.sort((a, b) => {
          if( a.voteScore > b.voteScore){ return 1 }
          if( a.voteScore < b.voteScore){ return -1 }
          return 0
        })

      case 3: // timestamp ASC
        return posts.sort((a, b) => {
          if( a.timestamp > b.timestamp){ return 1 }
          if( a.timestamp < b.timestamp){ return -1 }
          return 0
        })
      case 4: // timestamp DESC
        return posts.sort((a, b) => {
          if( a.timestamp > b.timestamp){ return -1 }
          if( a.timestamp < b.timestamp){ return 1 }
          return 0
        })
      default:
        return posts
    }
  }

  render(){
    const {posts, catTitle, history, votePost, editPost, deletePost} = this.props

    return (
      <div>
        <h2>{catTitle} Posts</h2>
        <h5>Sort By</h5>
        <ButtonGroup>
          <Button color="info" onClick={() => this.changeSort(1)} active={this.state.sortSelect === 1}>Vote Score (desc)</Button>
          <Button color="info" onClick={() => this.changeSort(2)} active={this.state.sortSelect === 2}>Vote Score (asc)</Button>
          <Button color="info" onClick={() => this.changeSort(3)} active={this.state.sortSelect === 3}>Timestamp (asc)</Button>
          <Button color="info" onClick={() => this.changeSort(4)} active={this.state.sortSelect === 4}>Timestamp (desc)</Button>
        </ButtonGroup>
        <br/>
        <Button color="success" onClick={() => history.push('/create-post')}>Add New Post</Button>
        <ListGroup>
          {this.getSortedPosts(posts).filter((p) => !(p.deleted)).map((post) => (
            <ListGroupItem key={post.id}>
              <div>
                <Link to={'/posts/' + post.id}>[{post.category}] {post.title} - By {post.author}</Link>
              </div>
              <div>
                {post.voteScore} Vote Score - {post.commentCount} Comments - Posted at {humanDate(post.timestamp)}
              </div>
              <div>
                <Button color="success" onClick={() => votePost({option: 'upVote', postID: post.id})}>UpVote Post</Button>
                <Button color="danger" onClick={() => votePost({option: 'downVote', postID: post.id})}>DownVote Post</Button>
                <Button color="info" onClick={() => history.push('/edit-post/' + post.id)}>Edit Post</Button>
                <Button color="danger" onClick={() => {
                  deletePost(post.id)
                  history.push('/')
                }}>Delete Post</Button>
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    )
  }
}
