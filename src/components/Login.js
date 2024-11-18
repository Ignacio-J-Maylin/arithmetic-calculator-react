import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Tabs,
  Tab,
  Alert,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login, signup } = useContext(AuthContext);
  const [username, setUsername] = useState('testuser@gmail.com');
  const [password, setPassword] = useState('password123');
  const [activeTab, setActiveTab] = useState(0);
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const authAction = activeTab === 1 ? signup : login;
    const result = await authAction(username, password);

    if (result?.success) {
      setMessage(activeTab === 1 ? 'Signup successful!' : 'Login successful');
      setMessageColor('success');
      setTimeout(() => navigate('/dashboard'), 1000);
    } else {
      setMessage(result?.message || 'An unexpected error occurred');
      setMessageColor('error');
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setMessage('');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f7f9fc',
        padding: 2,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Ignacio J Maylin
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
        Sr. Backend & DevOps Developer
      </Typography>

      <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 400 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          sx={{ marginBottom: 2 }}
          TabIndicatorProps={{ style: { backgroundColor: '#1976d2' } }}
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        {message && (
          <Alert severity={messageColor === 'success' ? 'success' : 'error'} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            {activeTab === 1 ? 'Sign Up' : 'Login'}
          </Button>
        </form>
      </Paper>

      <Alert severity="info" sx={{ marginTop: 3, maxWidth: 400 }}>
        <Typography variant="body2" align="center">
          🎉 Thank you for using my calculator! Connect with me on{' '}
          <Link
            href="https://www.linkedin.com/in/ignacio-maylin/"
            target="_blank"
            underline="hover"
            color="inherit"
          >
            LinkedIn
          </Link>
          !
        </Typography>
      </Alert>
    </Box>
  );
};

export default Login;
