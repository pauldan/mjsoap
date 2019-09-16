import React from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';

import Page from './Page';
import TextInput from './styled/TextInput';
import SelectInput from './styled/SelectInput';
import Button from './styled/Button';
import SearchForm from './styled/SearchForm';
import SelectInstitutie from './SelectInstitutie';
import Results from './Results';

const validationSchema = yup.object().shape({
  numeParte: yup.string(),
  numarDosar: yup
    .string()
    .matches(
      /^[0-9]+\/[0-9]+\/1|2[0-9][0-9][0-9]/,
      'Numarul dosarului tebuie sa fie de forma "123/123/2019"',
    ),
  obiectDosar: yup.string(),
  dataStart: yup.date(
    'Data început trebuie să fie o dată validă (aaaa-ll-zz).',
  ),
  dataStop: yup
    .date('Data sfârșit trebuie să fie o dată validă (aaaa-ll-zz).')
    .when('dataStart', {
      is: val => val,
      then: yup
        .date()
        .min(
          yup.ref('dataStart'),
          'Data de sfârșit trebuie să fie mai mare decât data de început',
        ),
    }),
});

const initialValues = {
  numarDosar: '',
  obiectDosar: '',
  numeParte: '',
  dataStart: '',
  dataStop: '',
  institutie: '',
};

const isChanged = values =>
  Object.keys(initialValues).reduce((acc, el) => {
    if (acc === true) return true;
    if (initialValues[el] !== values[el]) return true;
  }, false);

class Dosare extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
      loading: false,
      error: null,
      hasSearched: false,
    };
  }

  handleSubmit = async values => {
    this.setState({ loading: true });
    let { dataStop, dataStart, ...payload } = values;
    if (dataStart) {
      payload.dataStart = new Date(dataStart).toISOString();
    }
    if (dataStop) {
      payload.dataStop = new Date(dataStop).toISOString();
    }
    try {
      const res = await axios.post(
        process.env.URL_DOSARE || 'http://localhost:7000/cautare/dosare',
        {
          ...payload,
        },
        {
          method: 'post',
          body: {},
        },
      );
      if (res.data) {
        if (res.data.count > 0) {
          this.setState({
            results: res.data.result,
            loading: false,
            hasSearched: true,
          });
        } else {
          this.setState({ results: [], loading: false, hasSearched: true });
        }
      }
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };

  render() {
    const { results, loading, error, hasSearched } = this.state;
    return (
      <Page>
        <h1>Căutare dosare</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { setSubmitting }) => {
            await this.handleSubmit(values);
          }}
          validationSchema={validationSchema}
        >
          {({ values, errors, setFieldValue, handleChange, handleSubmit }) => {
            const {
              numarDosar,
              obiectDosar,
              numeParte,
              institutie,
              dataStart,
              dataStop,
            } = values;
            const {
              numarDosar: numarDosarError,
              obiectDosar: obiectDosarError,
              numeParte: numeParteError,
              institutie: institutieError,
              dataStart: dataStartError,
              dataStop: dataStopError,
            } = errors;
            return (
              <SearchForm onSubmit={handleSubmit} method="post">
                <TextInput
                  label="Număr dosar"
                  placeholder="Număr dosar"
                  name="numarDosar"
                  error={numarDosarError}
                  value={numarDosar}
                  onChange={handleChange}
                />
                <TextInput
                  label="Obiect dosar"
                  placeholder="Obiect dosar"
                  name="obiectDosar"
                  error={obiectDosarError}
                  value={obiectDosar}
                  onChange={handleChange}
                />
                <TextInput
                  label="Nume parte"
                  placeholder="Nume parte"
                  name="numeParte"
                  error={numeParteError}
                  value={numeParte}
                  onChange={handleChange}
                />
                <SelectInstitutie
                  label="Instituție"
                  placeholder="Instituție"
                  name="institutie"
                  error={institutieError}
                  value={institutie}
                  onChange={handleChange}
                />
                <TextInput
                  label="Dată început"
                  placeholder="Dată început"
                  name="dataStart"
                  type="date"
                  error={dataStartError}
                  value={dataStart}
                  onChange={handleChange}
                />
                <TextInput
                  label="Dată sfârșit"
                  placeholder="Dată sfârșit"
                  name="dataStop"
                  type="date"
                  error={dataStopError}
                  value={dataStop}
                  onChange={handleChange}
                />
                <div>
                  <Button
                    type="submit"
                    className="success"
                    disabled={!isChanged(values) || loading}
                  >
                    Caută
                  </Button>
                </div>
              </SearchForm>
            );
          }}
        </Formik>
        {hasSearched && <Results results={results} />}
      </Page>
    );
  }
}

export default Dosare;
