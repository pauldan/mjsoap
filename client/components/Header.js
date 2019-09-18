import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

const Nav = styled.nav`
  padding: 0 1em;
  background: black;
  color: white;
  display: flex;
  justify-content: space-between;
  border-bottom: 3px solid ${props => props.theme.color.primary};
  h1 {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  li {
    margin: 1em 0;
    margin-right: 10px;
  }
  li:last-of-type {
    margin-right: 0;
  }
  a {
    text-decoration: none;
    text-transform: uppercase;
    color: #fff;
    &.regular {
      color: ${props => props.theme.color.primary};
      text-transform: none;
      text-decoration: underline;
      display: grid;
      align-items: center;
      &::before {
        content: none;
      }
      &:hover {
        color: ${props => props.theme.color.primaryLight};
      }
      span {
        display: grid;
        justify-content: center;
        align-content: center;
        svg {
          height: 1.5em;
          width: 1.5em;
        }
      }
    }
    &:active,
    &.active,
    &:hover {
      color: #ccc;
      &::before {
        transform: scale(1, 1);
      }
    }
    &::before {
      content: '';
      display: block;
      position: relative;
      top: 0;
      height: 3px;
      border-radius: 10%;
      background: #ccc;
      width: 100%;
      transform: scale(0, 0.5);
      transition: transform 350ms cubic-bezier(0.075, 0.82, 0.165, 1);
    }
  }
`;

const Header = () => (
  <Nav>
    <h1>MJ PortalQuery</h1>
    <ul>
      <li>
        <Link href="/">
          <a>Dosare</a>
        </Link>
      </li>
      <li>
        <Link href="/dosare2">
          <a>Dosare2</a>
        </Link>
      </li>
      <li>
        <Link href="/sedinte">
          <a>Ședințe</a>
        </Link>
      </li>
    </ul>
  </Nav>
);

export default Header;
