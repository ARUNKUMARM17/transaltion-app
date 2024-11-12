import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid, Container, Link } from '@mui/material';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@mui/system';


const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(50px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); 
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container
      sx={{
        minHeight: '100vh', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
      }}
    >
      <Grid container sx={{ height: '100vh' }}>
        {}
        <Grid item xs={12} md={6} sx={{
          backgroundImage: 'url(login.png)', 
          backgroundSize: 'contain', 
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat', 
          padding: 4, 
        }}></Grid>

        {/* Right Section for the login form */}
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
              animation: `${fadeIn} 1s ease-out`, 
            }}
          >
            <Typography variant="h3" sx={{ mb: 3, fontFamily: 'Poppins, sans-serif', color: '#2575fc' }}>
              Welcome Back! 👋
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
              onClick={handleLogin}
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
              Login 🚀
            </Button>

            {/* Sign Up Link */}
            <Typography sx={{ mt: 2 }}>
              Don't have an account?{' '}
              <Link href="/register" sx={{ color: '#2575fc', textDecoration: 'none', fontWeight: 'bold' }}>
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
