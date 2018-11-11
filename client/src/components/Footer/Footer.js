// Import react and dependencies
import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { Col, Container, Row, Footer } from "mdbreact";

// Creating style to make footer sticky
const styles = {
  footer: {
    paddingTop: '50vh',
    width: '100%',
    bottom: 0

  }
};

// Create component
class FooterPagePro extends React.Component {
  // Render Component
  render() {
    return (
      <Footer
        color="stylish-color-dark"
        className="page-footer font-small pt-4 mt-4"
        style={styles.footer}
      >
        <Container fluid className="text-center text-md-left">
          <Row>
            <Col md="4">
              <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">
                About Gratify
              </h5>
              <p>
                Here at Gratify, our goal is to make organizing group centered task lists a breeze. Our site is founded on the idea of giving users 'gratification' upon completing tasks. Hints the name 'Gratify'!
              </p>
            </Col>
            <hr className="clearfix w-100 d-md-none" />
            <Col md='4'>
              <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">
                Contact Us
              </h5>
              <p>
                Email: gratify.devs@gmail.com
                <br />
                Phone: 867-5309
              </p>
            </Col>
            <hr className="clearfix w-100 d-md-none" />
            <Col md="4">
              <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">
                Links
              </h5>
              <ul className="list-unstyled">
                <li>
                  <a href="https://github.com/project3org/Group-To-Do-Lists" target="_blank">
                    Gratify's GitHub Rep
                    <i className="fa fa-github"></i>
                  </a>
                </li>
                <li>
                  <a href="#!"  target="_blank">Link 2</a>
                </li>
                <li>
                  <a href="#!"  target="_blank">Link 3</a>
                </li>
                <li>
                <div>Flavicon made by <a href="http://www.freepik.com" title="Freepik"  target="_blank">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"  target="_blank">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></div>
                </li>
              </ul>
            </Col>
            {/* Leaving this here, in case we deside to add more Links later */}
            {/* <hr className="clearfix w-100 d-md-none" />
            <Col md="2">
              <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">
                Links
              </h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#!">Link 1</a>
                </li>
                <li>
                  <a href="#!">Link 2</a>
                </li>
                <li>
                  <a href="#!">Link 3</a>
                </li>
                <li>
                  <a href="#!">Link 4</a>
                </li>
              </ul>
            </Col> */}
          </Row>
        </Container>
        <div className="footer-copyright text-center py-3">
          <Container fluid>
            &copy; {new Date().getFullYear()} Copyright: {"Corey Mitchell and Tyrell Bopp"}
          </Container>
        </div>
      </Footer>
    );
  }
}

// Export Component
export default FooterPagePro;