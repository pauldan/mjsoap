import React from 'react';
import styled from '@emotion/styled';

const StyledLoading = styled.div`
  height: 1em;
  width: auto;
  text-align: center;
  position: relative;
  display: grid;
  justify-content: center;
  align-content: center;
  grid-auto-flow: column;
  grid-gap: 0.15em;
  div {
    width: 16px;
    height: 16px;
    background-color: ${props => props.theme.color.default};
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    &.bounce1 {
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }
    &.bounce2 {
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }

    @-webkit-keyframes sk-bouncedelay {
      0%,
      80%,
      100% {
        -webkit-transform: scale(0);
      }
      40% {
        -webkit-transform: scale(1);
      }
    }

    @keyframes sk-bouncedelay {
      0%,
      80%,
      100% {
        -webkit-transform: scale(0);
        transform: scale(0);
      }
      40% {
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }
  }
  }
`;

const Loading = () => (
  <StyledLoading>
    <div className="bounce1" />
    <div className="bounce2" />
    <div className="bounce3" />
  </StyledLoading>
);

export default Loading;
