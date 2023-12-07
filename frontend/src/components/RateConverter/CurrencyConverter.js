// import React from 'react';
// import PropTypes from 'prop-types';

// const CurrencyConverter = ({ amount, currencies, currency, onAmountChange, onCurrencyChange }) => {
//   return (
//     <div>
//       <input value={amount} onChange={(e) => onAmountChange(e.target.value)} />
//       <select value={currency} onChange={(e) => onCurrencyChange(e.target.value)}>
//         {currencies.map((currency) => (
//           <option key={currency} value={currency}>
//             {currency}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// CurrencyConverter.propTypes = {
//   amount: PropTypes.number.isRequired,
//   currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
//   currency: PropTypes.string.isRequired,
//   onAmountChange: PropTypes.func.isRequired,
//   onCurrencyChange: PropTypes.func.isRequired,
// };

// export default CurrencyConverter;
