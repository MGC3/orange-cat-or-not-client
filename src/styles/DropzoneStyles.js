import styled from 'styled-components';

export const DropzoneContainer = styled.div`
  height: 350px;
  width: 350px;
  margin: 0 auto 18px auto;
  border: dashed 8px #001858;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 400px) {
    height: 300px;
    width: 300px;
  }
`;

export const ImageContainer = styled.div`
  height: 350px;
  width: 350px;
  position: absolute;
  @media screen and (max-width: 400px) {
    height: 300px;
    width: 300px;
  }
`;

export const Image = styled.img`
  max-height: 100%;
  max-width: 100%;
`;
