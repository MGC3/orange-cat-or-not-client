import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import './App.css';

function App() {
  const [model, setModel] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // load our model from the api and then store it in state
    let model = tf
      .loadLayersModel(
        'https://aqueous-river-22133.herokuapp.com/model/model.json'
      )
      .then(data => {
        setModel(data);
        setMessage('Model successfully loaded');
      })
      .catch(err => console.warn('Unable to load model'));
  }, []);

  return (
    <div className="app-container">
      <h1 className="title">Orange Cat or Not Orange Cat</h1>
      <h3>{message}</h3>
    </div>
  );
}

export default App;
