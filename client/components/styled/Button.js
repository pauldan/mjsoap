import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { withTheme } from 'emotion-theming';

const StyledButton = styled.button`
  font-size: 1em;
  font-weight: 700;
  letter-spacing: 1px;
  text-shadow: 1px 1px 1px hsla(0, 0%, 10%, 0.1);
  border-color: hsla(0, 0%, 80%, 0.2);
  background: hsl(0, 0%, 95%);
  padding: 0.75em 1.5em;
  box-shadow: ${props => props.theme.shadow3};
  border-radius: ${props => props.theme.border.radius};
  margin-bottom: 0.5em;
  box-shadow: ${props => props.theme.shadow2};
  user-select: none;
  border-bottom: 3px solid currentColor;
  &:disabled {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzhhYWGMYAEYB8RmROaABADeOQ8CXl/xfgAAAABJRU5ErkJggg==)
      repeat;
    color: #333;
    cursor: not-allowed;
  }
  &:hover {
    opacity: 0.75;
  }
  &:focus {
    outline: none;
    box-shadow: ${props => props.theme.shadow2focus};
  }
`;

const dynamicStyle = (variant, theme) => {
  if (!variant || variant === '' || variant === 'default')
    return css`
      color: ${theme.color.secondary};
    `;
  return css`
    color: ${theme.color[variant]};
  `;
};

const Button = ({ variant, children, theme, ...props }) => (
  <StyledButton css={dynamicStyle(variant, theme)} {...props}>
    {children}
  </StyledButton>
);

export default withTheme(Button);
