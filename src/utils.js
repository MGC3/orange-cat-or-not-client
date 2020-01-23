import * as tf from '@tensorflow/tfjs';

export const transformImagePromise = image =>
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
