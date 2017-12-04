import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import {Link} from 'react-router-dom'

// postsArr should just be one item...
export const Categories = ({categories}) => {


  return (
    <div>
      <ListGroup>
        {categories.map((category) => (
          <ListGroupItem key={category}>
            <Link to={'/' + category}>View Category: {category}</Link>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  )
}
