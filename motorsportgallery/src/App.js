import logo from './logo.svg';
import './App.css';

import AWS from 'aws-sdk';

import React, { useState } from 'react';
import axios from 'axios';

AWS.config.update({
  region: 'eu-central-1',
  accessKeyId: 'AKIA4V4XOMTSF4MXOA2P',
  secretAccessKey: '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'
});

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = async () => {
        const base64Data = reader.result.split(',')[1];

        try {
          const request = new AWS.HttpRequest('https://cfaxb9x4b9.execute-api.eu-central-1.amazonaws.com/dev', 'eu-central-1');
          request.method = 'OPTIONS';
          request.headers['Content-Type'] = 'image/png';
          request.body = "{ \"body\": \"" + base64Data + "\" }";

          const signer = new AWS.Signers.V4(request, 'execute-api');
          signer.addAuthorization(AWS.config.credentials, new Date());

          const response = await axios({
            method: request.method,
            url: request.endpoint.href,
            headers: request.headers,
            data: request.body
          });

          /*const response = await axios.post('https://cfaxb9x4b9.execute-api.eu-central-1.amazonaws.com/dev', 
          { "body": "base64Data" }, 
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Headers': 'Content-Type',
              'Access-Control-Allow-Methods': ['OPTIONS', 'POST', 'GET'],
              'Access-Control-Allow-Origin': '*'
            }
          });*/
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
