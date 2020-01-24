import React, { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import Dropzone from './Dropzone';
import {
  GlobalStyle,
  AppContainer,
  Title,
  CalculateButton,
  Message
} from '../styles/AppStyles';
import '../styles/global-styles.css';
import { transformImagePromise } from '../utils';
import { apiUrl } from '../constants';

function App() {
  const [model, setModel] = useState(null);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // load our model from the api and then store it in state
    tf.loadLayersModel(apiUrl)
      .then(data => {
        setModel(data);
      })
      .catch(() => setMessage('Unable to load model'));
  }, []);

  const handleClick = e => {
    // transform the image
    transformImagePromise(imageRef.current)
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
    <>
      <GlobalStyle />
      <AppContainer>
        <Title>Orange Cat or Not Orange Cat</Title>
        <Dropzone
          file={file}
          setFile={setFile}
          setMessage={setMessage}
          imageRef={imageRef}
        />
        <CalculateButton disabled={!file} onClick={handleClick}>
          CALCULATE
        </CalculateButton>
        <Message>{message}</Message>
      </AppContainer>
    </>
  );
}

export default App;
