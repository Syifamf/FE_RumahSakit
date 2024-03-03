import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../CSS/main.css";

const HeroComp = () => {
  return (
    <div className="hero min-vh-100 w-100" id="home">
      <Container>
        <Row>
          <Col className="text-center">
            <h1>HEALTY FOR SAFETY</h1>
            <p className="text-opacity-75 m-100 ">
              serving with the best quality, professional doctors and medical
              staff as well as complete facilities ensure you get the best
              treatment according to your needs.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroComp;
