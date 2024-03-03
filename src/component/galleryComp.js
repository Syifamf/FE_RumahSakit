import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "../CSS/main.css";
import Galery1 from "../assets/gallery/galery1.jpg";
import Galery2 from "../assets/gallery/galery2.png";
import Galery3 from "../assets/gallery/galery3.jpg";
import Galery4 from "../assets/gallery/galery4.png";
import Galery5 from "../assets/gallery/galery5.png";
import Galery6 from "../assets/gallery/galery6.jpg";


const Gallerycomp = () => {
  return (
    <div className='gallery min-vh-100 d-flex align-items-center' id='gallery'>
      <Container>
        <Row className='row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-1 g-4'>
          <Col>
          <img src={Galery1} alt='unshplash'className='w-100'></img>
          </Col>
          <Col>
          <img src={Galery2} alt='unshplash' className='w-100'></img>
          </Col>
          <Col>
          <img src={Galery3} alt='unshplash' className='w-100'></img>
          </Col>
          <Col>
          <img src={Galery4} alt='unshplash' className='w-100'></img>
          </Col>
          <Col>
          <img src={Galery5} alt='unshplash' className='w-100'></img>
          </Col>
          <Col>
          <img src={Galery6} alt='unshplash' className='w-100'></img>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Gallerycomp;