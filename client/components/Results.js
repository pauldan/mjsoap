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

const ScrollWrapper = styled.div`
  overflow: auto;
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
        <ScrollWrapper>
          <Table style={{ fontSize: '0.9em' }}>
            <thead>
              <tr>
                <th>Numar dosar</th>
                <th>Data</th>
                <th>Obiect</th>
                <th>Materie</th>
                <th>Stadiu procesual</th>
                <th>Secția</th>
                <th>Instanța</th>
                <th>Ultima modificare</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {results.map(
                (
                  {
                    categorieCazNume,
                    data,
                    dataModificare,
                    departament,
                    institutie,
                    numar,
                    numarVechi,
                    obiect,
                    stadiuProcesualNume,
                  },
                  idx,
                ) => (
                  <tr
                    key={numar}
                    className={idx === selected ? 'selected' : ''}
                  >
                    <td>
                      {numar}
                      {numarVechi && `(${numarVechi})`}
                    </td>
                    <td>{new Date(data).toLocaleDateString()}</td>
                    <td>{obiect}</td>
                    <td>{categorieCazNume}</td>
                    <td>{stadiuProcesualNume}</td>
                    <td>{departament}</td>
                    <td>{institutie}</td>
                    <td>{new Date(dataModificare).toLocaleDateString()}</td>
                    <td>
                      <button onClick={e => select(idx)}>Detalii</button>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </Table>
        </ScrollWrapper>
      )}
    </>
  );
};
export default Results;
