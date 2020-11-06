import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const $ = window.$;

export const StyledSheet = styled.nav`
  background-color: ${({ theme }) => theme.LightBlue};
  color: ${({ theme }) => theme.primaryLight};

  margin: auto;
  max-width: 1000px;

  div {
    top: 15%;
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }

  .caption p {
    color: ${({ theme }) => theme.primaryDark};
  }

`;
