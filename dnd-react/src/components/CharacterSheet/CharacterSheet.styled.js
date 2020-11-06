import styled from 'styled-components';

const $ = window.$;

export const StyledSheet = styled.nav`
  display: grid;
  content-align: center;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto;
  column-gap: 10px;
  row-gap: 15px;

  background: ${({ theme }) => theme.Linen};
  color: ${({ theme }) => theme.primaryDark};

  margin: auto;
  max-width: 1000px;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }

  #charName {
    grid-column-start: 1;
    grid-column-end: span 1;
    grid-row-start: 1;
    grid-row-end: 1;

    font-size: 1.8rem;
    text-transform: uppercase;
    padding: 20px;
    letter-spacing: 0.5rem;
    color: ${({ theme }) => theme.primaryDark};
    text-decoration: none;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 1.5rem;
      text-align: center;
    }
  }

  #charLvl {
    grid-column-start: 2;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 1;

    padding: 10px;
    font-size: 1.5rem;
  }

  #charClass {
    grid-column-start: 3;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 1;

    padding: 10px;
    font-size: 1.5rem;
    letter-spacing: 0.2rem;
  }

  #charSpells {
    grid-row-start: 2;
    grid-row-end: 2;
  }

  #charWeapons {
    grid-row-start: 2;
    grid-row-end: 2;
  }

`;
