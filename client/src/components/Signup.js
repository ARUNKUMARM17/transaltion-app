import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid, Container, Link } from '@mui/material';
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@mui/system';

// Keyframe for form animation
const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(50px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redirect to home or dashboard after successful signup
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container
      sx={{
        minHeight: '100vh', // Full height of the screen
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
      }}
    >
      <Grid container sx={{ height: '100vh' }}>
        {}
        <Grid item xs={12} md={6} sx={{
          backgroundImage: 'url(signup.png)', 
          backgroundSize: 'contain',
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat', 
          padding: 4, 
        }}></Grid>

        {}
        <Grid item xs={12} md={6} sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.85)', 
          padding: 3,
        }}>
          <Box
            sx={{
              width: '100%',
              maxWidth: 400,
              textAlign: 'center',
              animation: `${fadeIn} 1s ease-out`, // Fade-in animation
            }}
          >
            <Typography variant="h3" sx={{ mb: 3, fontFamily: 'Poppins, sans-serif', color: '#2575fc' }}>
              Create an Account 🚀
            </Typography>
            {error && <Typography sx={{ color: 'error.main', mb: 2 }}>{error}</Typography>}
            
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              variant="outlined"
              InputLabelProps={{ style: { color: '#2575fc' } }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              variant="outlined"
              InputLabelProps={{ style: { color: '#2575fc' } }}
            />
            <Button
              variant="contained"
              onClick={handleSignup}
              sx={{
                mt: 2,
                backgroundColor: '#2575fc',
                '&:hover': {
                  backgroundColor: '#6a11cb',
                },
                padding: '12px 20px',
                fontSize: '16px',
                fontFamily: 'Poppins, sans-serif',
              }}
              fullWidth
            >
              Sign Up 🚀
            </Button>

            {/* Login Link */}
            <Typography sx={{ mt: 2 }}>
              Already have an account?{' '}
              <Link href="/login" sx={{ color: '#2575fc', textDecoration: 'none', fontWeight: 'bold' }}>
                Login
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Signup;
