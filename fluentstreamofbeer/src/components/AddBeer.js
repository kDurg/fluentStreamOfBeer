import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Table, Container, Row, Col } from 'reactstrap';

const AddBeerForm = (props) => {
  return (
    <div>
      <Row>
          <FormGroup>
            <Label for="newestBeer">Add A New Beer To The Cooler</Label>
            <Input type="text" name="newBeerName" id="newestBeer" placeholder="Enter New Beer" />
          </FormGroup>
          <Button onClick={props.submitBeer}>Submit</Button>
      </Row>
    </div>
  )
}

export default AddBeerForm;