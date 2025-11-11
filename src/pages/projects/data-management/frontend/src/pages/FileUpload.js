import React, { useState } from 'react';
import axios from 'axios';
import { supabase } from '../utils/supabaseClient';
import { Box, Button, Typography, Container, Alert, LinearProgress, Input } from '@mui/material';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setError('');
    setSuccess('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a CSV file first.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Get the current user's session token
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session) {
        throw new Error(sessionError?.message || 'You must be logged in to upload files.');
      }

      const token = session.access_token;

      const formData = new FormData();
      formData.append('file', selectedFile);

      // Make sure the backend URL is correct
      const response = await axios.post('http://localhost:3006/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // Send the JWT token
        }
      });

      setSuccess(response.data.message || 'File uploaded successfully!');
      setSelectedFile(null); // Clear file input after successful upload
      // Optionally clear the actual input element if needed
      document.getElementById('csv-upload-input').value = '';

    } catch (err) {
      console.error('Upload error:', err);
      let errorMessage = 'Failed to upload file.';
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage = err.response.data?.message || errorMessage;
      } else if (err.request) {
        // The request was made but no response was received
        errorMessage = 'No response from server. Please check backend connection.';
      } else if (err.message) {
        // Something happened in setting up the request that triggered an Error
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          border: '1px solid #ddd',
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Upload Inventory CSV
        </Typography>
        <Box sx={{ width: '100%', mt: 2, mb: 2 }}>
          <Input
            id="csv-upload-input"
            type="file"
            onChange={handleFileChange}
            disabled={loading}
            inputProps={{ accept: '.csv' }} // Accept only CSV files
            fullWidth
            sx={{ display: 'block' }} // Ensure input takes width
          />
        </Box>

        {loading && <LinearProgress sx={{ width: '100%', mb: 2 }} />}

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
            {success}
          </Alert>
        )}

        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={loading || !selectedFile}
          fullWidth
        >
          {loading ? 'Uploading...' : 'Upload File'}
        </Button>
      </Box>
    </Container>
  );
};

export default FileUpload;