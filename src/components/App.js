import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap';
import {connect} from 'react-redux'
import {addPost, getAllPosts, getComments, addComment, votePost, voteComment, deleteComment,
  deletePost, editComment, editPost} from "../actions"
import Posts from './Posts'
import { Route, Link, withRouter } from 'react-router-dom'
import CreatePost from "./CreatePost"
import {PostDetails} from "./PostDetails"
import {Categories} from "./Categories"
import {upperFirst} from "../utils"
import CreateComment from "./CreateComment"

class App extends React.Component {
  state = {
    isOpen: false,
    rSelected: 1
  }
  componentDidMount = () => {
    this.props.loadPosts()
  }

  // Some example bootstrap nav crap
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    // console.log(this.props)
    const {posts, addPost, isLoading, loadComments, comments, addComment, votePost, voteComment,
      deleteComment, deletePost, history, editComment, editPost} = this.props
    return (
      <div>

        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/">Readable - All Internet Trollzz Welcome</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/">Home - All Poasts</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/create-post">Create Post</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <br/>

        <Container>

          {/*Show all posts - pass in props so we can get to the history from Route */}
          <Route exact path="/" render={(props) => (
            <div>
              <h2>Categories</h2>
              <Categories categories={['react', 'redux', 'udacity']}/>
              <br/>

              <Posts {...props} catTitle={'All'} posts={posts} votePost={votePost} deletePost={deletePost}
                     voteComment={voteComment}/>
            </div>
          )}/>

          {/* Show the form to create a new post
         - pass in props so we can get to the history from Route */}
          <Route exact path="/create-post" render={(props) => (
            <CreatePost {...props} addPost={addPost} post={{}}/>
          )}/>

          <Route path="/edit-post/:postID" render={(props) => {
            const {postID} = props.match.params

            return(
              <div>
                <h2>Categories</h2>
                <Categories categories={['react', 'redux', 'udacity']}/>
                <br/>
                <CreatePost {...props} addPost={addPost} editPost={editPost} post={posts.reduce((accum, p) => (
                  (p.id === postID) ? {...p} : accum
                ), {})}/>
              </div>
            )
          }}/>


          {/* SHOW AN INDIVIDUAL POST PAGE*/}
          <Route path="/posts/:postID" render={(props) => {
            const {postID} = props.match.params
            const postComments = comments[postID] || []



            if (isLoading){
              return (<h1> BEEEEEE beeep beep beep beep beep BEEEE Beep</h1>)
            }
            return (
              <div>
                <h2>Categories</h2>
                <Categories categories={['react', 'redux', 'udacity']}/>
                <br/>
              <PostDetails {...props} loadComments={loadComments} deletePost={deletePost}
                                 deleteComment={deleteComment} votePost={votePost}
                                 voteComment={voteComment} comments={postComments}
                                 posts={posts.filter((post) => post.id === postID )}/>
              </div>
            )
          }}/>

          <Route path="/categories/:cat" render={(props) => {
            const {cat} = props.match.params
            return (
              <div>
                <h2>Categories</h2>
                <Categories categories={['react', 'redux', 'udacity']}/>
                <br/>
                <Posts {...props} catTitle={upperFirst(cat)} votePost={votePost}
                       voteComment={voteComment} deletePost={deletePost}
                       posts={posts.filter((post) => post.category === cat)} />

              </div>
            )
          }}/>

          <Route path="/create-comment/:postID" render={(props) => {
            const {postID} = props.match.params
            return(<CreateComment {...props} postID={postID} addComment={addComment} />)
          }}/>

          <Route path="/edit-comment/:postID/:commentID" render={(props) => {
            const {postID, commentID} = props.match.params
            let comms = comments[postID] || []
            // TODO this really should try to load comments or something, redirect for now.. =/
            if(!comments[postID]){
              history.push('/')
              return null
            }

            return(<CreateComment {...props}
                                  postID={postID}
                                  comment={comms.reduce((finalC, c) => {
                                    if(c.id === commentID){
                                      return c
                                    }
                                    return finalC
                                  }, {})}
                                  addComment={addComment}
                                  editComment={editComment}
            />)
          }}/>

        </Container>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    posts:state.posts.posts,
    comments:state.posts.comments,
    isLoading: state.posts.isLoading,
  }
}

function mapDispatchToProps(dispatch){
  return {
    addPost: (data) => dispatch(addPost(data)),
    addComment: (data) => dispatch(addComment(data)),
    loadPosts: (data) => dispatch(getAllPosts(data)),
    loadComments: (data) => dispatch(getComments(data)),
    votePost: (data) => dispatch(votePost(data)),
    voteComment: (data) => dispatch(voteComment(data)),
    deleteComment: (data) => dispatch(deleteComment(data)),
    deletePost: (data) => dispatch(deletePost(data)),
    editComment: (data) => dispatch(editComment(data)),
    editPost: (data) => dispatch(editPost(data)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
