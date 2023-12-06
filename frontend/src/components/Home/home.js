import React from 'react';
import { Container, Row, Col, Card,Button} from 'react-bootstrap';
import '../styles/Home.css'; // Import your external CSS file for styling
import Homenav from './H-navbar';
import BeneficiaryForm from '../../beneficiaryFrom';

function Home() {
  return (
    <div>
      <Homenav /> {/* Include the Header component at the top of the Home component */}

      {/* Forex Remittance Section with Background Image */}
      <div className="forex-remittance-section">
      <Container>
        <Row>
          <Col>
            <h2>Forex Remittance</h2>
            <p>Offers 24/7 services for outward remittance at the most attractive rates.</p>
          <BeneficiaryForm/>
          </Col>
        </Row>
      </Container>
    </div>

      {/* How It Works Section */}
      <Container className="mt-5">
        <h2>How it Works</h2>
        <p>Learn how our forex remittance service works.</p>
        {/* Add your content for how it works */}
      </Container>

      {/* Who Can Remit Section */}
      <Container className="mt-5">
        <h2>Who Can Remit?</h2>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Federal Bank Customers</Card.Title>
                <Card.Text>
                  All resident customers holding Savings Account with Federal Bank Ltd.
                  All NRI customers holding NRE Savings Account with Federal Bank Ltd.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Others</Card.Title>
                <Button variant="outline-primary" className="rounded-pill mt-3">
                  Open Account Online
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
