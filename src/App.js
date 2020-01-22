import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import './App.css';

function App() {
  const [model, setModel] = useState(null);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    // load our model from the api and then store it in state
    tf.loadLayersModel(
      'https://aqueous-river-22133.herokuapp.com/model/model.json'
    )
      .then(data => {
        setModel(data);
        setMessage('Model successfully loaded');
      })
      .catch(() => setMessage('Unable to load model'));
  }, []);

  const transformImagePromise = image =>
    new Promise((resolve, reject) => {
      // transform/preprocess the image
      // attrib: https://deeplizard.com/learn/video/eEkpBnOd8Zk
      let sample = tf.browser
        .fromPixels(image)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .sub(tf.scalar(127.5))
        .div(tf.scalar(127.5))
        .expandDims();

      sample ? resolve(sample) : reject(console.error);
    });

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

  const handleChange = e => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="app-container">
      <h1 className="title">Orange Cat or Not Orange Cat</h1>
      {/* from https://medium.com/@650egor/react-30-day-challenge-day-2-image-upload-preview-2d534f8eaaa */}
      <div>
        <div className="image-container">
          <img alt="" id="uploaded-image" src={file} />
        </div>
        <div className="btn-group">
          <input
            id="file-input"
            onChange={handleChange}
            type="file"
            className="btn-file"
          />
          <label className="btn" htmlFor="file-input">
            Choose a file
          </label>
          <button disabled={!file} className="btn" onClick={handleClick}>
            CALCULATE
          </button>
        </div>
        <h1>{message}</h1>
      </div>
    </div>
  );
}

export default App;
