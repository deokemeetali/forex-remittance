import React, { useState } from 'react';
import axios from 'axios';

const AuthenticationComponent = () => {
  const [loginId, setLoginId] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [authToken, setAuthToken] = useState(null);
  const [error, setError] = useState(null);

  const authenticateCurrencycloud = async () => {
    try {
      const apiUrl = 'https://devapi.currencycloud.com/v2/authenticate/api';

      const formData = new FormData();
      formData.append('api_key', apiKey);
      formData.append('login_id', loginId);

      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const receivedAuthToken = response.data.auth_token;
      setAuthToken(receivedAuthToken);
    } catch (error) {
      setError(error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Currencycloud Authentication</h2>
      <label>
        Login ID:
        <input type="text" value={loginId} onChange={(e) => setLoginId(e.target.value)} />
      </label>
      <br />
      <label>
        API Key:
        <input type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
      </label>
      <br />
      <button onClick={authenticateCurrencycloud}>Authenticate</button>
      <br />
      {authToken && <p>Authentication successful. Auth Token: {authToken}</p>}
      {error && <p style={{ color: 'red' }}>Authentication failed: {JSON.stringify(error)}</p>}
    </div>
  );
};

export default AuthenticationComponent;
