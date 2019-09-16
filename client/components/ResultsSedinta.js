import React from 'react';
import styled from '@emotion/styled';

import Table from './styled/Table';
import CodeSnippet from './styled/CodeSnippet';
import Link from 'next/link';
import Modal from './Modal';

import syntaxHighlight from '../utils/syntaxHighlight';

const Hr = styled.hr`
  color: ${props => props.theme.color.default}
  width: 80%;
  margin: 1em 0;
`;

const Results = ({ results }) => {
  const count = results.length;
  if (count === 0) return <h3>Nici un rezultat.</h3>;

  const [selected, select] = React.useState(-1);
  const unselect = () => select(-1);
  return (
    <>
      <Hr />
      <h3>{`${count} ${count === 1 ? 'rezultat' : 'rezultate'}`}</h3>
      {selected !== -1 && (
        <Modal open onCancel={unselect}>
          <CodeSnippet
            dangerouslySetInnerHTML={{
              __html: syntaxHighlight(results[selected]),
            }}
          />
        </Modal>
      )}
      {count > 0 && (
        <Table>
          <thead>
            <tr>
              <th>Secția</th>
              <th>Complet</th>
              <th>Data</th>
              <th>Ora</th>
              <th>Dosare</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {results.map(({ data, departament, ora, dosare, complet }, idx) => (
              <tr
                key={`${complet} ${new Date(data).getTime()}`}
                className={idx === selected ? 'selected' : ''}
              >
                <td>{departament}</td>
                <td>{complet}</td>
                <td>{new Date(data).toLocaleDateString()}</td>
                <td>{ora}</td>
                <td>
                  {(dosare &&
                    dosare.SedintaDosar &&
                    dosare.SedintaDosar.length) ||
                    '-'}
                </td>
                <td>
                  <button onClick={e => select(idx)}>Detalii</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};
export default Results;
