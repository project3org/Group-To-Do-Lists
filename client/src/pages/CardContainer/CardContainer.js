import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DeleteBtn from "../../components/DeleteBtn";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class CardContainer extends Component {
  componentDidMount() {
    console.log(this.props.signedIn);
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Card>
              <CardContent>

              </CardContent>
            </Card>
          </Col>  
        </Row>
      </Container>
    );
  };
};

// Create PropTypes
CardContainer.propTypes = {
  signedIn: PropTypes.bool.isRequired
}

// Maps States to Component Props
const mapStateToProps = state => ({
  signedIn: state.user.signedIn
});

// Export Component
export default connect(mapStateToProps, { })(CardContainer);