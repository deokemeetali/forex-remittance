import React, { useState } from 'react';
import Header from '../header/header';
import Main from '../mainsection/main';
import Footer from '../footer/footer';

function LandingPage() {
  const [loading, setLoading] = useState(false);
  // Function to set the loading state
  const setLoadingState = (isLoading) => {
    setLoading(isLoading);
  };

  return (
    <div className="landing-page-container">
      <Header setLoadingState={setLoadingState} />
      {' '}
      {/* Pass setLoadingState to Header */}
      {loading ? (
        <div className="loading-indicator">
          Loading...
        </div> // Conditionally render a loading indicator
      ) : (
        <>
          <Main />
          <Footer />
        </>
      )}
    </div>
  );
}

export default LandingPage;