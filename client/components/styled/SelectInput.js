import React, { useState } from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
  display: flex;
  flex-direction: column-reverse;
  select {
    height: 3rem;
    padding: 0.69rem;
    background: hsl(0, 0%, 95%);
    border: none;
    border-radius: ${props => props.theme.border.radius};
    font-size: 0.9em;
    box-shadow: ${props => props.theme.shadow2};
    width: 100%;
    border-bottom-width: 4px;
    border-bottom-color: ${props => props.theme.color.primary};
    &:focus {
      outline: none;
      box-shadow: ${props =>
        props.theme.shadow2 + ', 0 0 2px 2px hsla(255,100%, 0%, 0.2)'};
    }
    &:disabled {
      color: red;
      pointer-events: none;
    }
    &[multiple] {
      height: 10rem;
      overflow-y: scroll;
      width: auto;
    }
    width: 100%;
    &.error {
      border: 1px solid ${props => props.theme.color.danger};
      border-bottom-width: 4px;
    }
    &[multiple] {
      height: 10em;
      overflow-y: scroll;
    }
  }
  input {
    display: none;
  }

  /* label text */
  .textInput__label.hidden {
    transform: translateX(0.75rem) translateY(2.35rem);
    transition: all 200ms cubic-bezier(0.165, 0.84, 0.44, 1);
    font-size: 0.9em;
  }
  .textInput__label {
    display: block;
    width: 100%;
    font-weight: bold;
    pointer-events: none;
    font-size: 0.9em;
    transform: translate(0, 0);
    transition: transform 500ms cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  /* error */
  .textInput__error {
    color: red;
    font-size: 0.8em;
    font-style: italic;
    height: 1em;
  }

  .error {
    color: red;
  }
`;

const SelectInput = ({
  id,
  multiple,
  error,
  label,
  children,
  value,
  noEmpty,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [focused, setFocused] = useState(false);

  const handleChange = e => {
    props.onChange(e);
    setInternalValue(e.target.value);
  };
  return (
    <Label htmlFor={id}>
      <span className="textInput__error">{error}</span>
      <select
        id={id}
        multiple={multiple}
        className={error ? 'error' : ''}
        value={value}
        {...props}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {!multiple && !noEmpty && <option value="" />}
        {children}
      </select>
      <span
        className={`textInput__label ${error ? 'error' : ''} ${
          (value === '' || internalValue === '') && !focused ? 'hidden' : ''
        }`}
      >
        {label}
      </span>
    </Label>
  );
};

export default SelectInput;
