import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../CSS/main.css";

const FooterComp = () => {
  return (
    <div className="footer pb-3 pt-4">
      <Container>
        <Row>
          <Col>
            <h3 className="fw-bold text-black">HealtyWeb</h3>
          </Col>
          <Col className="text-end">
            <i class="fa-brands fa-facebook fs-1  mx-lg-3 mx-2"></i>
            <i class="fa-brands fa-twitter fs-1  mx-lg-3 mx-2"></i>
            <i class="fa-solid fa-link fs-1 mx-lg-3 mx-2"></i>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-center text-white-20">
              &copy; Copyright By HealtyWeb 2024. All Right Reserved. strio_
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FooterComp;
