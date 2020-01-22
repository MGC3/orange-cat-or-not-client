import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import './App.css';

function App() {
  const [model, setModel] = useState(null);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

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
    let image = document.querySelector('#uploaded-image');

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

  const handleChange = e => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="app-container">
      <h1 className="title">Orange Cat or Not Orange Cat</h1>
      {/* from https://medium.com/@650egor/react-30-day-challenge-day-2-image-upload-preview-2d534f8eaaa */}
      <div>
        <div className="image-container">
          <img id="uploaded-image" src={file} />
        </div>
        <div className="btn-group">
          <input type="file" onChange={handleChange} />
          <button className="btn" onClick={handleClick}>
            CALCULATE
          </button>
        </div>
        <h1>{message}</h1>
      </div>
    </div>
  );
}

export default App;
