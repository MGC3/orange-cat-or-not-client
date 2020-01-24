import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import './App.css';
import { transformImagePromise } from './utils';
import { apiUrl } from './constants';
import Dropzone from './Dropzone';

function App() {
  const [model, setModel] = useState(null);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    // load our model from the api and then store it in state
    tf.loadLayersModel(apiUrl)
      .then(data => {
        setModel(data);
      })
      .catch(() => setMessage('Unable to load model'));
  }, []);

  const handleClick = e => {
    e.preventDefault();
    // grab the image
    let image = document.querySelector('#uploaded-image');
    // transform the image
    transformImagePromise(image)
      // run the prediction on the image
      .then(transformedImage => model.predict(transformedImage).data())
      // translate the prediction
      .then(prediction => orangeOrNot(prediction))
      .catch(console.error);
  };

  const orangeOrNot = prediction => {
    return prediction[0] < 0.5
      ? setMessage('You ARE an orange cat')
      : setMessage('You are NOT an orange cat');
  };

  return (
    <div className="app-container">
      <h1 className="title">Orange Cat or Not Orange Cat</h1>
      <Dropzone file={file} setFile={setFile} setMessage={setMessage} />
      <button disabled={!file} className="btn" onClick={handleClick}>
        CALCULATE
      </button>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
