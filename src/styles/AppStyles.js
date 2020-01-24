import styled, { createGlobalStyle } from 'styled-components';

// export const GlobalStyle = createGlobalStyle`
//   @import url('https://fonts.googleapis.com/css?family=Space+Mono&display=swap');

//   body {
//     margin: 0;
//     font-family: 'Space Mono', monospace, -apple-system, BlinkMacSystemFont,
//       'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
//       'Droid Sans', 'Helvetica Neue', sans-serif;
//     -webkit-font-smoothing: antialiased;
//     -moz-osx-font-smoothing: grayscale;
//     background: #fef6e4;
//   }
// `;

export const AppContainer = styled.div`
  text-align: center;
  min-height: 100vh;
  min-width: 100vw;
`;

export const Title = styled.div`
  color: #001858;
  font-size: 48px;
  margin-top: 0;
  padding: 24px 0;

  @media (max-width: 400px) {
    font-size: 40px;
  }
`;

export const CalculateButton = styled.button`
  background: #ffffff;
  border: 3px solid black;
  border-radius: 4px;
  padding: 15px;
  font-size: 20px;
  font-family: inherit;
  cursor: pointer;
`;

export const Message = styled.h1`
  color: #001858;
`;
