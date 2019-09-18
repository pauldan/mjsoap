import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';

const StyledModal = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  justify-content: center;
  align-items: center;
`;

const Blur = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  filter: blur(100px);
`;

const Dialog = styled.div`
  z-index: 100;
  position: relative;
  background: #fff;
  border-radius: ${props => props.theme.border.radius};
  display: inline-block;
  margin: 1rem;
  position: relative;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23),
  justify-self: center;
  padding: 1em 1em;
  overflow-y: auto;
  max-height: 90vh;
  h5 {
    padding: 0;
    margin: 0;
    border-bottom: 1px solid #aaa;
  }
  p {
    margin-bottom: .5em;
  }
  div {
    width: 100%;
    display: flex;
    flex-direction: row;
    bottom: 0;
    justify-content: space-around;
    align-items: flex-end;
    button {
      &:hover {
        background: ${props => props.theme.color.primary};
        color: white;
        border-color: ${props => props.theme.color.primary};
      }
      border: 1px solid #aaa;
      font-size: .90em;
    }
  }
`;

const Modal = props => {
  const close = () => props.onCancel(false);

  const closeOnEscape = e => {
    if (e.key === 'Escape') close();
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', closeOnEscape, { passive: true });
    }
    return function unmount() {
      if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', closeOnEscape);
      }
    };
  });

  const { title, message, onConfirm, onCancel, open } = props;

  if (!open) return null;
  // check if its on the client (nossr)
  if (typeof window === 'undefined') return null;

  return ReactDOM.createPortal(
    <StyledModal onClick={onCancel}>
      <Blur />
      <Dialog onClick={e => e.stopPropagation()}>
        {props.children}
        <div>
          <button onClick={onCancel}>Ok</button>
        </div>
      </Dialog>
    </StyledModal>,
    document.getElementById('modal-root'),
  );
};
export default Modal;
