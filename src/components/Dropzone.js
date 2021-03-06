import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  DropzoneContainer,
  ImageContainer,
  Image
} from '../styles/DropzoneStyles';

export default function Dropzone({ file, setFile, setMessage, imageRef }) {
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
    <DropzoneContainer {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <>
          {!file && (
            <p>Drag 'n' drop an image here, or click to select image</p>
          )}
          <ImageContainer>
            <Image alt="" id="uploaded-image" src={file} ref={imageRef} />
          </ImageContainer>
        </>
      )}
    </DropzoneContainer>
  );
}
