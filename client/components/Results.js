import React from 'react';
import styled from '@emotion/styled';

import Table from './styled/Table';
import Link from 'next/link';

const Hr = styled.hr`
  color: ${props => props.theme.color.default}
  width: 80%;
  margin: 1em 0;
`;

const Results = ({ results }) => {
  const count = results.length;
  if (count === 0) return <h3>Nici un rezultat.</h3>;
  return (
    <>
      <Hr />
      <h3>{`${count} ${count === 1 ? 'rezultat' : 'rezultate'}`}</h3>
      {count > 0 && (
        <Table>
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
              ({
                categorieCazNume,
                data,
                dataModificare,
                departament,
                institutie,
                numar,
                numarVechi,
                obiect,
                stadiuProcesualNume,
              }) => (
                <tr key={numar}>
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
                    <Link href="">
                      <a>[Detalii]</a>
                    </Link>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </Table>
      )}
    </>
  );
};
export default Results;
