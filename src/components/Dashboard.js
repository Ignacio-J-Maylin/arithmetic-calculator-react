import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getUserCredits, addCredits, removeCredits, performOperation } from '../api';
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  TextField,
  Divider,
  Link,
  Alert,
} from '@mui/material';

const Dashboard = () => {
  const { auth, logout } = useContext(AuthContext);
  const [credits, setCredits] = useState(0);
  const [operationResult, setOperationResult] = useState(null);
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('addition');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchUserCredits();
    }
  }, [auth.isAuthenticated]);

  const fetchUserCredits = async () => {
    try {
      const response = await getUserCredits();
      setCredits(response.data.credits);
      setErrorMessage('');
    } catch (error) {
      console.error('Failed to retrieve credits', error);
    }
  };

  const handleAddCredits = async () => {
    try {
      await addCredits(50);
      await fetchUserCredits();
    } catch (error) {
      console.error('Failed to add credits', error);
    }
  };

  const handleRemoveCredits = async () => {
    try {
      await removeCredits(100);
      await fetchUserCredits();
    } catch (error) {
      if (error.response?.status === 402) {
        setErrorMessage('Not enough credits to remove');
      } else {
        console.error('Failed to remove credits', error);
      }
    }
  };

  const handleOperation = async () => {
    try {
      let response;
      if (operation === 'random_string') {
        response = await performOperation(operation);
      } else if (operation === 'square_root') {
        response = await performOperation(operation, parseFloat(num1));
      } else {
        response = await performOperation(operation, parseFloat(num1), parseFloat(num2));
      }
      setOperationResult(response.data.result);
      await fetchUserCredits();
    } catch (error) {
      if (error.response?.status === 402) {
        setErrorMessage('Not enough credits to perform this operation');
      } else {
        console.error('Failed to perform operation', error);
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f7f9fc',
        padding: 2,
      }}
    >
      <Paper elevation={4} sx={{ padding: 4, width: '100%', maxWidth: 500, borderRadius: 2 }}>
        
      <Typography variant="body2" align="center" gutterBottom>
        Ignacio J Maylin
      </Typography>
      <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
        Sr. Backend & DevOps Developer
      </Typography>
        {/* Promotion Banner */}
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body1" align="center">
            🎉 Thank you for using my calculator! Connect with me on{' '}
            <Link
              href="https://www.linkedin.com/in/ignacio-maylin/"
              target="_blank"
              underline="hover"
              color="inherit"
            >
              LinkedIn
            </Link>{' '}
            and let's grow together!
          </Typography>
        </Alert>
        <Typography variant="h5" align="center" gutterBottom>
          Calculator Dashboard
        </Typography>

        {/* Credits Section */}
        <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
          <Typography variant="h6" color="textSecondary">
            Credits: {credits}
          </Typography>
        </Box>

        {/* Error Message */}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        {/* Inputs for Numbers */}
        <Grid container spacing={2} alignItems="center">
          {operation !== 'random_string' && (
            <Grid item xs={operation === 'square_root' ? 12 : 6}>
              <TextField
                label={operation === 'square_root' ? 'Number' : 'Number 1'}
                type="number"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                fullWidth
              />
            </Grid>
          )}
          {operation !== 'square_root' && operation !== 'random_string' && (
            <Grid item xs={6}>
              <TextField
                label="Number 2"
                type="number"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                fullWidth
              />
            </Grid>
          )}
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Operation Buttons */}
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="subtitle1">Select Operation</Typography>
        </Box>
        <Grid container spacing={1}>
          {['addition', 'subtraction', 'multiplication', 'division'].map((op) => (
            <Grid item xs={3} key={op}>
              <Button
                variant={operation === op ? 'contained' : 'outlined'}
                color={operation === op ? 'primary' : 'inherit'}
                onClick={() => setOperation(op)}
                fullWidth
              >
                {op === 'addition' && '+'}
                {op === 'subtraction' && '-'}
                {op === 'multiplication' && '×'}
                {op === 'division' && '÷'}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={1} sx={{ mt: 1 }}>
          {['square_root', 'random_string'].map((op) => (
            <Grid item xs={6} key={op}>
              <Button
                variant={operation === op ? 'contained' : 'outlined'}
                color={operation === op ? 'primary' : 'inherit'}
                onClick={() => setOperation(op)}
                fullWidth
              >
                {op === 'square_root' ? '√' : 'Random'}
              </Button>
            </Grid>
          ))}
        </Grid>

        {/* Calculate Button */}
        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleOperation}
        >
          Calculate
        </Button>

        {/* Operation Result */}
        <Typography
          variant="h6"
          align="center"
          sx={{ color: operationResult !== null ? 'green' : 'text.secondary', mt: 2 }}
        >
          {operationResult !== null ? `Result: ${operationResult}` : 'Enter numbers to calculate'}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Credit Management */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={handleAddCredits}
              sx={{ height: 56 }}
            >
              Add Credits
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={handleRemoveCredits}
              sx={{ height: 56 }}
            >
              Remove Credits
            </Button>
          </Grid>
        </Grid>

        {/* Logout Button */}
        <Button
          variant="text"
          color="secondary"
          fullWidth
          onClick={logout}
          sx={{ mt: 2 }}
        >
          Logout
        </Button>
      </Paper>
    </Box>
  );
};

export default Dashboard;
