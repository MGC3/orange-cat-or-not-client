import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import './App.css';
import mango from './assets/mango.jpg';

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

  const handleClick = e => {
    e.preventDefault();
    setMessage('Loading');
    // grab the image
    let image = document.querySelector('#mango');

    // transform/preprocess the image
    // attrib: https://deeplizard.com/learn/video/eEkpBnOd8Zk
    let sample = tf.browser
      .fromPixels(image)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .sub(tf.scalar(127.5))
      .div(tf.scalar(127.5))
      .expandDims();

    // make a prediction on the transformed image
    model
      .predict(sample)
      .data()
      .then(data => orangeOrNot(data));
  };

  const orangeOrNot = input => {
    return input[0] < 0.5
      ? setMessage('You ARE an orange cat')
      : setMessage('You are NOT an orange cat');
  };

  return (
    <div className="app-container">
      <h1 className="title">Orange Cat or Not Orange Cat</h1>
      <button onClick={handleClick}>Test</button>
      <img src={mango} alt="" id="mango" />
      <h1>{message}</h1>
    </div>
  );
}

export default App;
