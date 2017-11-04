import React, { Component } from 'react';
import { Input, Form, FormGroup, Col, Label, Button } from 'reactstrap';
/*
ALSO USED TO EDIT
 */
export default class CreatePost extends Component {

  createPost = () => {
    const {addPost, editPost, post, history} = this.props
    const title = this.title.value
    const body = this.body.value
    const author = this.author.value
    const category = this.category.value

    let b = {
      'title': title,
      'body': body,
      'author': author,
      'category': category,
    }
    if(post.id){
      b['id'] = post.id
      editPost({post: b})
    } else {
      addPost({post: b})
    }

    // Maybe clear vals? or will they clear on re-render?
    // this.title.value = ''

    // TRY to freaking navigate on submit!!!!!
    history.push("/")
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    this.createPost()
  }

  render(){
    const {post} = this.props

    return (
      <div>
        <h2>Create a New Post</h2>

        <Form onSubmit={this.handleFormSubmit}>
          <FormGroup row>
            <Label for="title" sm={2}>Title</Label>
            <Col sm={10}>
              <Input type="text" name="title" id="title" placeholder="New Post Title" defaultValue={post.title}
                     innerRef={(input) => this.title = input} />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="body" sm={2}>Body</Label>
            <Col sm={10}>
              <Input type="text" name="body" id="body" placeholder="New Post Body" defaultValue={post.body}
                     innerRef={(input) => this.body = input} />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="author" sm={2}>Author</Label>
            <Col sm={10}>
              <Input type="text" name="author" id="author" placeholder="New Post Author" defaultValue={post.author}
                     innerRef={(input) => this.author = input} />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="category" sm={2}>Category</Label>
            <Col sm={10}>
              <Input type="select" name="category" id="category" placeholder="New Post Category"
                     innerRef={(input) => this.category = input} defaultValue={post.category || ''} >
                <option disabled value=''> -- select an option -- </option>
                <option value='react'>react</option>
                <option value='redux'>redux</option>
                <option value='udacity'>udacity</option>
              </Input>
            </Col>
          </FormGroup>

          <FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button type='submit'>Create Post</Button>
            </Col>
          </FormGroup>
        </Form>

      </div>
    )
  }
}
