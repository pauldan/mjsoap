import styled from '@emotion/styled';

const CodeSnippet = styled.pre`
  background: #eee;
  border: 1px solid #ccc;
  padding: 1em;
  margin: 1em 0;
  border-radius: 5px;
  overflow: scroll;
  max-height: 70vh;
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
