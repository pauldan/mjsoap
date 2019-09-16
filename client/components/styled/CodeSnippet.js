import styled from '@emotion/styled';

const CodeSnippet = styled.pre`
  background: #eee;
  outline: 1px solid #ccc;
  padding: 1em;
  margin: 1em 0;
  border-radius: 5px;
  .string {
    color: green;
  }
  .number {
    color: darkorange;
  }
  .boolean {
    color: blue;
  }
  .null {
    color: magenta;
  }
  .key {
    color: red;
  }
`;

export default CodeSnippet;
