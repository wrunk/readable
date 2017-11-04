import React, { Component } from 'react';
import { Input, Form, FormGroup, Col, Label, Button } from 'reactstrap';
/*
ALSO USED TO EDIT
 */
export default class CreateComment extends Component {

  createComment = () => {
    const {addComment, editComment, history, postID, comment} = this.props
    const body = this.body.value
    const author = this.author.value

    let comm = {
      'body': body,
      'author': author,
      'parentId': postID,
    }
    if(comment && comment.id){
      comm['id']= comment.id
      editComment({comment: comm})
    } else {
      addComment({comment: comm})
    }

    history.push("/posts/" + postID)
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    this.createComment()
  }

  render(){

    const comment = this.props.comment || {}

    return (
      <div>
        <h2>Create a New Comment</h2>

        <Form onSubmit={this.handleFormSubmit}>

          <FormGroup row>
            <Label for="body" sm={2}>Body</Label>
            <Col sm={10}>
              <Input type="text" name="body" id="body" placeholder="Body" defaultValue={comment['body']}
                     innerRef={(input) => this.body = input} />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="author" sm={2}>Author</Label>
            <Col sm={10}>
              <Input type="text" name="author" id="author" placeholder="Author" defaultValue={comment['author']}
                     innerRef={(input) => this.author = input} />
            </Col>
          </FormGroup>


          <FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button type='submit'>Create Comment</Button>
            </Col>
          </FormGroup>
        </Form>

      </div>
    )
  }
}
