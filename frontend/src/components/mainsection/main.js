import React from 'react';
import { Carousel,Container,Row,Col, Card, Button} from 'react-bootstrap';
import '../styles/main.css';
 // Make sure to import your stylesheet
function Main() {
  return (
    <div>
      {/* Carousel Section */}
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image "
            src="https://images.squarespace-cdn.com/content/v1/5ad771bd266c0782e84d3c39/1674315088549-AVMR2XP8H66XJ2S4WB3D/Help+Consumers+Understand+How+Bank+Mergers+Affect+Them+And+Their+Money.jpg?format=1000w" // Replace with your image URL
            alt="Bank 1"
          />
          <Carousel.Caption className="carousel-caption">
            <p className="caption-text">Your Trusted Banking Partner</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe41tTKOqfPWXilb5UvISmIeUFGhUVx4Y8MQ&usqp=CAU" // Replace with your image URL
            alt="Bank 3"
          />
          <Carousel.Caption className="carousel-caption">
            <p className="caption-text">Empowering Your Financial Journey</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://www.shutterstock.com/image-vector/money-transfer-online-global-mobile-260nw-2170434649.jpg" // Replace with your image URL
            alt="Forex-Remit"
          />
          <Carousel.Caption  className="carousel-caption">
            <h3 className="caption-text">Forex-Remit</h3>
            <p className="caption-text">Offers 24/7 services for outward remittance at the most attractive rates.</p>
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
      <div className="service-cards-section flex padding-horizontal">
        <Row>
          <Col md={4}>
            <Card className="service-card">
              <Card.Img variant="top" src="images/s1.png" alt="" />
              <Card.Body>
                <Card.Title>CURRENCY WALLET</Card.Title>
                <Card.Text>
                  fact that a reader will be distracted by the readable content of a page when looking at its layout.
                  The point of using
                </Card.Text>
                <div className="read-more">Read More</div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="service-card">
              <Card.Img variant="top" src="images/s2.png" alt="" />
              <Card.Body>
                <Card.Title>CURRENCY WALLET</Card.Title>
                <Card.Text>
                  fact that a reader will be distracted by the readable content of a page when looking at its layout.
                  The point of using
                </Card.Text>
                <div className="read-more">Read More</div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="service-card">
              <Card.Img variant="top" src="images/s3.png" alt="" />
              <Card.Body>
                <Card.Title>CURRENCY WALLET</Card.Title>
                <Card.Text>
                  fact that a reader will be distracted by the readable content of a page when looking at its layout.
                  The point of using
                </Card.Text>
                <div className="read-more">Read More</div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Button className="primary-btn">View All</Button>
      </div>
      </div>
    <div id="about" className="about-us">
        <Container>
          <Row className="header-text">
            <Col>
              <h2>About <span className="blue-color">Us</span></h2>
              <p>Magni quod blanditiis non minus sed aut voluptatum illum quisquam aspernatur ullam vel beatae rerum ipsum
                voluptatibus</p>
            </Col>
          </Row>
          <Row className="about-content">
            <Col md={6}>
              <img src="images/about-img.png" alt="" />
            </Col>
            <Col md={6}>
              <div className="about-content-right">
                <h2>We Are Finexo</h2>
                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                  alteration in some form, by injected humour, or randomised words which don&apos;t look even slightly
                  believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn&apos;t
                  anything embarrassing hidden in the middle of text. All</p>
                <p>Molestiae odio earum non qui cumque provident voluptates, repellendus exercitationem, possimus at
                  iste corrupti officiis unde alias eius ducimus reiciendis soluta eveniet. Nobis ullam ab omnis quasi
                  expedita.</p>
                <Button className="primary-btn">Read More</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div id="why-us" className="choose-us">
        <Container>
          <Row className="header-text">
            <Col>
              <h2> Why Choose <span className="blue-color">Us</span></h2>
            </Col>
          </Row>
          <Row className="choose-box">
            <Col md={4}>
              <img src="images/w1.png" alt="" />
              <h3>Expert Management</h3>
              <p>Incidunt odit rerum tenetur alias architecto asperiores omnis cumque doloribus aperiam numquam! Eligendi
                corrupti, molestias laborum dolores quod nisi vitae voluptate ipsa? In tempore voluptate ducimus officia
                id, aspernatur nihil. Tempore laborum nesciunt ut veniam, nemo officia ullam repudiandae repellat
                veritatis unde reiciendis possimus animi autem natus</p>
            </Col>
            <Col md={4}>
              <img src="images/w2.png" alt="" />
              <h3>Secure Investment</h3>
              <p>Incidunt odit rerum tenetur alias architecto asperiores omnis cumque doloribus aperiam numquam! Eligendi
                corrupti, molestias laborum dolores quod nisi vitae voluptate ipsa? In tempore voluptate ducimus officia
                id, aspernatur nihil. Tempore laborum nesciunt ut veniam, nemo officia ullam repudiandae repellat
                veritatis unde reiciendis possimus animi autem natus</p>
            </Col>
            <Col md={4}>
              <img src="images/w3.png" alt="" />
              <h3>Instant Trading</h3>
              <p>Incidunt odit rerum tenetur alias architecto asperiores omnis cumque doloribus aperiam numquam! Eligendi
                corrupti, molestias laborum dolores quod nisi vitae voluptate ipsa? In tempore voluptate ducimus officia
                id, aspernatur nihil. Tempore laborum nesciunt ut veniam, nemo officia ullam repudiandae repellat
                veritatis unde reiciendis possimus animi autem natus</p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>   
  );
}

export default Main;
