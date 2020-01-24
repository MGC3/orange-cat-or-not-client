import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Dropzone({ file, setFile, setMessage }) {
  // when a file is dropped or selected from filesystem
  const onDrop = useCallback(acceptedFiles => {
    // create a URL based on the file and set it
    setFile(URL.createObjectURL(acceptedFiles[0]));
    // clear the message, so user doesn't continue to see old prediction
    setMessage('');
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: 'image/*'
  });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <>
          {!file && (
            <p>Drag 'n' drop an image here, or click to select image</p>
          )}
          <div className="image-container">
            <img alt="" id="uploaded-image" src={file} />
          </div>
        </>
      )}
    </div>
  );
}
