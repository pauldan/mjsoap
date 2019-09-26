import styled from '@emotion/styled';

const Table = styled.table`
  border-bottom: 3px solid ${props => props.theme.color.secondary};
  width: 100%;
  box-shadow: ${props => props.theme.shadow2};
  border-radius: ${props => props.theme.border.radius};

  &.danger,
  &.warning,
  &.primary,
  &.info,
  &.success {
    tbody,
    thead {
      tr:nth-of-type(even) td,
      th {
        background: white;
      }
    }
  }
  &.danger {
    border-color: ${props => props.theme.color.dangerLight};
    background: ${props => props.theme.color.dangerLight};
    }
  }
  &.warning {
    border-color: ${props => props.theme.color.warningLight};
    background: ${props => props.theme.color.warningLight};
  }
  &.success {
    border-color: ${props => props.theme.color.success};
    background: ${props => props.theme.color.successLight};
  }
  &.info {
    border-color: ${props => props.theme.color.infoLight};
    background: ${props => props.theme.color.infoLight};
  }
  &.primary {
    border-color: ${props => props.theme.color.primary};
    background-color: ${props => props.theme.color.primaryLight};
  }
  &.selectable {
    tr {
      cursor: pointer;
    }
  }
  thead {
    th {
      font-weight: bold;
      border-bottom: 1px solid #ccc;
      background: hsl(0, 0%, 95%);
      text-align: left;
      padding: 0.2em 0.75em;
      border-bottom: 3px solid ${props => props.theme.color.secondary};
      border-color: inherit;
      &:first-of-type {
        border-radius: ${props => props.theme.border.radius} 0 0 0;
      }
      &:last-of-type {
        border-radius: 0 ${props => props.theme.border.radius} 0 0;
        user-select: none;
      }
      &.center {
        text-align: center;
      }
    }
  }
  tr {
    &.error {
      td {
        background: #f99;
        color: #fff;
      }
    }
    &.selected {
      td {
        background: #5050ff25;
      }
    }
    &:last-of-type {
      td:first-of-type {
        border-radius: 0 0 0 ${props => props.theme.border.radius};
      }
      td:last-of-type {
        border-radius: 0 0 ${props => props.theme.border.radius} 0;
      }
      td {
      }
    }
    &:nth-of-type(even) {
      td {
        background: hsl(0, 0%, 95%);
      }
    }
    td {
      &.clickable {
        a {
          text-decoration: underline;
          color: blue;
          cursor:pointer;
          &:hover {
            color: purple;
          }
        }
      }
      padding: 0.2em 0.75em;
      &.center {
        text-align: center;
      }
      &.buttons {
        display: grid;
        grid-auto-flow: column;
        align-items: center;
        justify-content: space-between;
      }
      a[aria-disabled='true'] {
        color: grey;
        pointer-events: none;
      }
      &.do-not-select {
        user-select: none;
      }
    }
    a {
      color: black;
      &:hover,
      &:visited {
        color: black;
      }
    }
  }
`;

export default Table;
