// MuiProgressBar.js
import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const MuiProgressBar = ({ currentStep, totalSteps }) => {
  const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={currentStep - 1}>
        {steps.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {currentStep === totalSteps ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {currentStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button disabled={currentStep === 0} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button
              disabled={currentStep === totalSteps - 1}
              sx={{ mr: 1 }}
            >
              Next
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

MuiProgressBar.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
};

export default MuiProgressBar;