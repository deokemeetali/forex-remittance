import React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import { useNavigate } from 'react-router-dom';
import './confirmationwindow.css';

const ConfirmationWindow = () => {
  const navigate = useNavigate();
  const handleOkClick = () =>{
    navigate('/mainpage/dashboard')
  }
  return (
    <div className="confirmation-container">
    <Card className="confirmation-card">
      <CardOverflow variant="solid" color="warning">
        <AspectRatio
          variant="outlined"
          color="warning"
          ratio="1"
          sx={{
            m: 'auto',
            transform: 'translateY(50%)',
            borderRadius: '50%',
            width: 'var(--icon-size)',
            boxShadow: 'sm',
            bgcolor: 'background.surface',
            position: 'relative',
          }}
        >
          <div>
            <BakeryDiningIcon color="warning" sx={{ fontSize: '4rem' }} />
          </div>
        </AspectRatio>
      </CardOverflow>
      <Typography level="title-lg" sx={{ mt: 'calc(var(--icon-size) / 2)' }}>
        🎊 Transaction Completed 🎊
      </Typography>
      <CardContent sx={{ maxWidth: '40ch' }}>
      Thank you for choosing Forex Remittance! Your transaction is complete.
      For any assistance, contact customer support.
      </CardContent>
      <CardActions
        orientation="vertical"
        buttonFlex={1}
        sx={{
          '--Button-radius': '40px',
          width: 'clamp(min(100%, 160px), 50%, min(100%, 200px))',
        }}
      >
        <Button variant="solid" color="warning" onClick={handleOkClick}>
          OK
        </Button>
      </CardActions>
    </Card>
    </div>
  );
};

export default ConfirmationWindow;