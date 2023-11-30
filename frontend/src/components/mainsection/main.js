import React from 'react';
import { Carousel } from 'react-bootstrap';

function Main() {
  return (
    <div>
      {/* Carousel Section */}
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.squarespace-cdn.com/content/v1/5ad771bd266c0782e84d3c39/1674315088549-AVMR2XP8H66XJ2S4WB3D/Help+Consumers+Understand+How+Bank+Mergers+Affect+Them+And+Their+Money.jpg?format=1000w" // Replace with your image URL
            alt="Bank 1"
          />
          <Carousel.Caption>
            <p>Your Trusted Banking Partner</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe41tTKOqfPWXilb5UvISmIeUFGhUVx4Y8MQ&usqp=CAU" // Replace with your image URL
            alt="Bank 3"
          />
          <Carousel.Caption>
            <h3>Bank 3</h3>
            <p>Empowering Your Financial Journey</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.shutterstock.com/image-vector/money-transfer-online-global-mobile-260nw-2170434649.jpg" // Replace with your image URL
            alt="Forex-Remit"
          />
          <Carousel.Caption>
            <h3>Forex-Remit</h3>
            <p>Offers 24/7 services for outward remittance at the most attractive rates.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div id="services" className="our-services max-margin-top d-flex">
     <Container>
       <Row className="justify-content-center">
         <Col md={8} className="header-text text-center">
           <h2>Our <span className="blue-color">Services</span></h2>
           <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.</p>
         </Col>
       </Row>
     </Container>
   </div>
    </div>   
  );
}

export default Main;
