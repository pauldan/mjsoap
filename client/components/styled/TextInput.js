import React from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  input {
    border: none;
    background: hsl(0, 0%, 95%);
    height: 3rem;
    padding: 0.75rem 1.2rem;
    border: 1px solid hsla(0, 0%, 80%, 0.2);
    border-radius: ${props => props.theme.border.radius};
    font-size: 0.9rem;
    box-shadow: ${props => props.theme.shadow2};
    width: 100%;
    &:focus {
      outline: none;
      box-shadow: ${props =>
        props.theme.shadow2 + ',0 0 2px 2px hsla(255, 100%, 0%, 0.2)'};
    }
    &[type='number'] {
      padding-right: 4px;
      &::-webkit-inner-spin-button {
        width: 2px;
      }
    }
    &[type='date'] {
      padding: 0.63rem;
    }
    &.error {
      border-bottom-color: ${props => props.theme.color.danger};
    }
    &[disabled] {
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzhhYWGMYAEYB8RmROaABADeOQ8CXl/xfgAAAABJRU5ErkJggg==)
        repeat;
      border-color: ${props => props.theme.color.secondaryLight};
      cursor: not-allowed;
    }
    &.no-label:placeholder-shown::placeholder {
      color: black;
    }
  }

  input:placeholder-shown::placeholder {
    color: white;
  }

  /* label text */
  input:placeholder-shown ~ .textInput__label {
    transform: translate(1.3em, 2.65em);
    transition: all 250ms cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  .textInput__label {
    font-weight: bold;
    font-size: 0.9rem;
    transform: translate(0, 0);
    transition: transform 500ms cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  /* error */
  .textInput__error {
    color: ${props => props.theme.color.danger};
    font-size: 0.8em;
    font-style: italic;
    height: 1em;
  }
  .error {
    color: ${props => props.theme.color.danger};
  }
`;

const TextInput = ({ id, noError, required, error, label, ...props }) => {
  const inputClasses = `${error ? 'error' : ''} ${!label ? 'no-label' : ''}`;
  return (
    <Label htmlFor={id}>
      {!noError && <span className="textInput__error">{error}</span>}
      <input
        className={inputClasses}
        id={id}
        {...props}
        onFocus={e => e.target.select()}
      />
      <span className={`textInput__label ${error ? 'error' : ''}`}>
        {label}
        {required ? '*' : ''}
      </span>
    </Label>
  );
};

export default TextInput;
