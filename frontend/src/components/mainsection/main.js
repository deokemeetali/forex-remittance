import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.css";
// Make sure to import your stylesheet
function Main() {
  return (
    <>
      {/* Main Page Content */}
      <div className="main-page-content padding-horizontal flex mainPageBackground">
        <div className="main-content-text">
          <h1>
            Crypto <br /> Currency{" "}
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea quam
            ullam distinctio quis veritatis rem illum dolorum inventore minima
            omnis maxime nisi ab expedita consequuntur, eius ducimus magnam,
            quidem ad. Tenetur quis repellendus velit dicta, quae provident
            facere fugiat, neque voluptas inventore earum voluptatem mollitia!
          </p>
        </div>
        <div className="main-image">
          <img src="images/slider-img.png" alt="" />
        </div>
      </div>

      {/* Service Cards Section */}
      <div
        id="services"
        className="our-services max margin-top flex text-center"
      >
        <div className="header-text">
          <h2>
            Our <span className="blue-color">Services</span>
          </h2>
          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration...
          </p>
        </div>

        <Row className="service-cards-section flex padding-horizontal">
          {/* Service Card 1 */}
          <Col lg={4} md={6} sm={12}>
            <Card className="service-card">
              <Card.Img variant="top" src="images/s1.png" alt="" />
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title>CURRENCY WALLET</Card.Title>
                <Card.Text>
                  Fact that a reader will be distracted by the readable content
                  of a page...
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Service Card 2 */}
          <Col lg={4} md={6} sm={12}>
            <Card className="service-card">
              <Card.Img variant="top" src="images/s2.png" alt="" />
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title>CURRENCY WALLET</Card.Title>
                <Card.Text>
                  Fact that a reader will be distracted by the readable content
                  of a page...
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Service Card 3 */}
          <Col lg={4} md={6} sm={12}>
            <Card className="service-card">
              <Card.Img variant="top" src="images/s3.png" alt="" />
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title>CURRENCY WALLET</Card.Title>
                <Card.Text>
                  Fact that a reader will be distracted by the readable content
                  of a page...
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* About Us Section */}
      <div id="about" className="about-us text-center">
        <div className="header-text">
          <h2>
            About <span className="blue-color">Us</span>
          </h2>
          <p>
            Magni quod blanditiis non minus sed aut voluptatum illum quisquam...
          </p>
        </div>
        <div className="about-content container">
          <div className="row align-items-center">
            <div className="col-md-6 order-md-1">
              <img src="images/about-img.png" alt="" className="img-fluid" />
            </div>
            <div className="col-md-6 order-md-2">
              <div className="about-content-right">
                <h2>We Are Finexo</h2>
                <p>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don&apos;t
                  look even slightly believable. If you are going to use a
                  passage of Lorem Ipsum, you need to be sure there isn&apos;t
                  anything embarrassing hidden in the middle of text. All the
                  Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary, making this the first true
                  generator on the Internet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div id="why-us" className="choose-us text-center">
      <div className="header-text">
        <h2>
          Why Choose <span className="blue-color">Us</span>
        </h2>
      </div>
      <Row className="choose-box">
        {/* Choose Box 1 */}
        <Col md={4} className="choose-box-item text-center">
          <img src="images/w1.png" alt="" />
          <h3>Expert Management</h3>
          <p>
            Expert Management for banks involves a strategic approach tofinancial leadership, combining extensive industry knowledge with
            cutting-edge insights. Our team of seasoned professionals excels incrafting tailored solutions, navigating regulatory landscapes, and
            optimizing financial performance.
          </p>
        </Col>

        {/* Choose Box 2 */}
        <Col md={4} className="choose-box-item">
          <img src="images/w2.png" alt="" />
          <h3>Secure Investment</h3>
          <p>
            Secure Investment is the cornerstone of financial peace of mind,providing individuals with a reliable avenue to grow and protect
            their wealth. With a focus on risk mitigation and robust investment strategies, we prioritize the security and stability of your assets.
            Our expert team navigates the complex financial landscape to identify opportunities that align with your financial goals.
          </p>
        </Col>

        {/* Choose Box 3 */}
        <Col md={4} className="choose-box-item">
          <img src="images/w3.png" alt="" />
          <h3>Instant Trading</h3>
          <p>
            Instant Trading in the Forex (foreign exchange) market offers a dynamic and efficient platform for swift and seamless execution of
            trades. With real-time data feeds and lightning-fast order processing, our Instant Trading service empowers traders to
            capitalize on market fluctuations instantly. Whether you are a seasoned investor or a newcomer to the Forex market, our platform
            provides the tools and speed needed to make split-second decisions.
          </p>
        </Col>
      </Row>
    </div>
    </>
  );
}

export default Main;
