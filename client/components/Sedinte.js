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
import ResultsSedinta from './ResultsSedinta';

const validationSchema = yup.object().shape({
  dataSedinta: yup
    .date('Data început trebuie să fie o dată validă (aaaa-ll-zz).')
    .required('Data ședinței este obligatorie'),
  institutie: yup.string().required('Instituția este obligatorie.'),
});

const initialValues = {
  dataSedinta: '',
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
    let { dataSedinta, ...payload } = values;
    if (dataSedinta) {
      payload.dataSedinta = new Date(dataSedinta).toISOString();
    }
    try {
      const res = await axios.post(
        process.env.URL_SEDINTE || 'http://localhost:7000/cautare/sedinte',
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
    console.log(results);
    return (
      <Page>
        <h1>Căutare ședințe</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { setSubmitting }) => {
            await this.handleSubmit(values);
          }}
          validationSchema={validationSchema}
        >
          {({ values, errors, setFieldValue, handleChange, handleSubmit }) => {
            const { institutie, dataSedinta } = values;
            const {
              institutie: institutieError,
              dataSedinta: dataSedintaError,
            } = errors;
            return (
              <SearchForm
                onSubmit={handleSubmit}
                method="post"
                disabled={loading}
              >
                <SelectInstitutie
                  label="Instituție"
                  placeholder="Instituție"
                  name="institutie"
                  error={institutieError}
                  value={institutie}
                  onChange={handleChange}
                />
                <TextInput
                  label="Dată ședință"
                  placeholder="Dată ședință"
                  name="dataSedinta"
                  type="date"
                  error={dataSedintaError}
                  value={dataSedinta}
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
        {hasSearched && <ResultsSedinta results={results} />}
      </Page>
    );
  }
}

export default Dosare;
