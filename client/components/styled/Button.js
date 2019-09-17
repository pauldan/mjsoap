import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { withTheme } from 'emotion-theming';

import Loading from './Loading';

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
    box-shadow: ${props =>
      props.theme.shadow2 + ', 0 0 2px 2px hsla(255, 100%, 0%, .2)'};
  }
  &.loading {
    background: none;
  }
`;

const HideText = styled.span`
  visibility: hidden;
  display: block;
  height: 0;
  max-height: 0;
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

const Button = ({ variant, children, theme, loading, ...props }) => (
  <StyledButton
    css={dynamicStyle(variant, theme)}
    {...props}
    className={loading ? 'loading' : ''}
  >
    {loading ? (
      <>
        <Loading />
        <HideText>{children}</HideText>
      </>
    ) : (
      children
    )}
  </StyledButton>
);

export default withTheme(Button);
