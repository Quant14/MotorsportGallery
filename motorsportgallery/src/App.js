import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const handleUpload = async () => {
        if (selectedFile) {
          const formData = new FormData();
          formData.append('image', selectedFile);
      
          try {
            const response = await axios.post('YOUR_API_URL', formData);
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        }
      };
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = async () => {
        const base64Data = reader.result.split(',')[1];

        try {
          const response = await axios.post('https://cfaxb9x4b9.execute-api.eu-central-1.amazonaws.com/dev', 
          { "body": "base64Data" }, 
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Headers': 'Content-Type',
              'Access-Control-Allow-Methods': ['OPTIONS', 'POST', 'GET'],
              'Access-Control-Allow-Origin': '*'
            }
          });
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>UPLOAD</button>
    </div>
  );
};

export default App;
