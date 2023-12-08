// import React, { useEffect, useState } from "react";
// import CurrencyConverter from "../RateConverter/CurrencyConverter";
// import axios from "axios";
// import { Container, Row, Col, Modal } from "react-bootstrap";
// import { Nav } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/currency.css";
// const API_KEY = "EHfodRyeaX28QDPWkeZOnPkvsy6yXqKe";
// const CURRENCY_API = `https://api.apilayer.com/exchangerates_data/latest?apikey=${API_KEY}`;
// const Currency = () => {
//   const [currencyRates, setCurrencyRates] = useState([]);
//   const [amountOne, setAmountOne] = useState(1);
//   const [amountTwo, setAmountTwo] = useState(1);
//   const [currencyOne, setCurrencyOne] = useState("USD");
//   const [currencyTwo, setCurrencyTwo] = useState("INR");
//   const [showModal, setShowModal] = useState(false);

//   const handleClose = () => setShowModal(false);
//   const handleShow = () => setShowModal(true);
//   useEffect(() => {
//     axios
//       .get(CURRENCY_API)
//       .then((response) => setCurrencyRates(response.data.rates))
//       .catch((err) => {
//         console.log(err);
//         setCurrencyRates(null);
//       });
//   }, []);
//   const handleAmountOne = (amountOne) => {
//     setAmountOne(amountOne);

//     // Update the second currency amount based on the conversion rate
//     const updatedAmountTwo = formateCurrency(
//       (amountOne * currencyRates[currencyTwo]) / currencyRates[currencyOne]
//     );
//     setAmountTwo(updatedAmountTwo);
//   };
//   useEffect(() => {
//     if (!currencyRates) {
//       handleAmountOne(1);
//     }
//   }, [currencyRates]);
//   const formateCurrency = (number) => {
//     return number.toFixed(2);
//   };

//   const handleCurrencyOne = (currencyOne) => {
//     setAmountTwo(
//       formateCurrency(
//         (amountOne * currencyRates[currencyTwo]) / currencyRates[currencyOne]
//       )
//     );
//     setCurrencyOne(currencyOne);
//   };

//   const handleAmountTwo = (amountTwo) => {
//     setAmountOne(
//       formateCurrency(
//         (amountTwo * currencyRates[currencyOne]) / currencyRates[currencyTwo]
//       )
//     );
//     setAmountTwo(amountTwo);
//   };

//   const handleCurrencyTwo = (currencyTwo) => {
//     setAmountOne(
//       formateCurrency(
//         (amountTwo * currencyRates[currencyOne]) / currencyRates[currencyTwo]
//       )
//     );
//     setCurrencyTwo(currencyTwo);
//   };

//   return (
//     <>
//       <Nav.Link
//         variant="outline-light"
//         className="me-1 attractive-text"
//         onClick={handleShow}
//       >
//         Quick Rates
//       </Nav.Link>
//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Currency Converter</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Container>
//             <Row className="mb-1">
//               <Col xs={12} md={12} className="right-side-content">
//                 <p className="oneCurrency">
//                   1 {currencyOne} = {formateCurrency(amountTwo / amountOne)}{" "}
//                   {currencyTwo}
//                 </p>
//               </Col>
//             </Row>
//             <Row>
//               <Col xs={10} md={6} className="left-side-content">
//                 <CurrencyConverter
//                   amount={amountOne}
//                   currency={currencyOne}
//                   currencies={Object.keys(currencyRates)}
//                   onAmountChange={handleAmountOne}
//                   onCurrencyChange={handleCurrencyOne}
//                   inputClass="small-input"
//                 />
//               </Col>
//               <Col xs={10} md={6} className="left-side-content">
//                 <CurrencyConverter
//                   amount={amountTwo}
//                   currency={currencyTwo}
//                   currencies={Object.keys(currencyRates)}
//                   onAmountChange={handleAmountTwo}
//                   onCurrencyChange={handleCurrencyTwo}
//                   inputClass="small-input"
//                 />
//               </Col>
//             </Row>
//           </Container>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default Currency;
