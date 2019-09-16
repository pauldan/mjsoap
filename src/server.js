const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const soap = require('soap');
const cors = require('cors');

const PORT = Number.parseInt(process.env.PORT, 10) || 7000;
const URL = 'http://portalquery.just.ro/query.asmx?WSDL';

const app = express();

// middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: 'omit',
  }),
);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/static', express.static(path.join(__dirname, 'public')));

// routes

app.post('/cautare/dosare', (req, res) => {
  const searchOptions = [
    'numarDosar',
    'obiectDosar',
    'numeParte',
    'institutie',
    'dataStart',
    'dataStop',
  ];

  const search = searchOptions.reduce((acc, el) => {
    const value = req.body[el];
    if (value) return { ...acc, [el]: value };
    return acc;
  }, {});
  console.log(`[INFO] Searching for\n${JSON.stringify(search, null, 2)}`);
  soap.createClient(URL, { forceSoap12Headers: true }, (err, client) => {
    if (err) {
      res.status(503).send({ message: 'Server error' });
      return;
    }
    if (!client) {
      res.status(503).send({ message: 'Soap Client could not be created.' });
      return;
    }
    client.on('soapError', (err, eid) => {
      console.error(
        `[ERROR] ${eid} ${new Date().toLocaleString()} Soap error: ${err}`,
      );
    });
    client.on('request', (xml, eid) => {
      console.log(
        `[Request from ${req.ip}] ${eid} ${new Date().toLocaleString()}`,
      );
      console.log(req.ip);
    });
    client.on('response', (body, response, eid) => {
      console.log(
        `[Response to ${req.ip}] ${eid} ${new Date().toLocaleString()}`,
      );
    });
    client.CautareDosare(search, (err, result, body, eid) => {
      if (err) {
        console.log(`[Error] ${JSON.stringify(err, null, 2)}`);
        return res.status(503).send({ error: err });
      }
      if (result) {
        res.status(200).send({
          count: result.CautareDosareResult.Dosar.length,
          result: result.CautareDosareResult.Dosar,
        });
      } else {
        res.status(200).send({ count: 0 });
      }
    });
  });
});

app.post('/cautare/dosare2', (req, res) => {
  const searchOptions = [
    'numarDosar',
    'obiectDosar',
    'numeParte',
    'institutie',
    'dataStart',
    'dataStop',
    'dataUltimaModificareStart',
    'dataUltimaModificareStop',
  ];

  const search = searchOptions.reduce((acc, el) => {
    const value = req.body[el];
    if (value) return { ...acc, [el]: value };
    return acc;
  }, {});
  console.log(`[INFO] Searching for\n${JSON.stringify(search, null, 2)}`);
  soap.createClient(URL, (err, client) => {
    if (err) {
      res.status(503).send({ message: 'Server error' });
      return;
    }
    if (!client) {
      res.status(503).send({ message: 'Soap Client could not be created.' });
      return;
    }
    client.on('soapError', (err, eid) => {
      console.error(
        `[ERROR] ${eid} ${new Date().toLocaleString()} Soap error: ${err}`,
      );
    });
    client.on('request', (xml, eid) => {
      console.log(
        `[Request from ${req.ip}] ${eid} ${new Date().toLocaleString()}`,
      );
    });
    client.on('response', (body, response, eid) => {
      console.log(
        `[Response to ${req.ip}] ${eid} ${new Date().toLocaleString()}`,
      );
    });
    client.CautareDosare2(search, (err, result) => {
      if (err) {
        console.log(`[Error] ${JSON.stringify(err, null, 2)}`);
        return res.status(503).send({ error: err });
      }
      if (result) {
        res.status(200).send({
          count: result.CautareDosare2Result.Dosar.length,
          result: result.CautareDosare2Result.Dosar,
        });
      } else {
        res.status(200).send({ count: 0 });
      }
    });
  });
});

app.post('/cautare/sedinte', (req, res) => {
  const { institutie, dataSedinta } = req.body;
  const search = {};
  if (institutie) {
    search.institutie = institutie;
  }
  if (dataSedinta) {
    search.dataSedinta = new Date(dataSedinta).toISOString();
  }
  console.log(`[INFO] Searching for\n${JSON.stringify(search, null, 2)}`);
  soap.createClient(URL, (err, client) => {
    if (err) {
      res.status(503).send({ message: 'Server error' });
      return;
    }
    if (!client) {
      res.status(503).send({ message: 'Soap Client could not be created.' });
      return;
    }
    client.on('soapError', (err, eid) => {
      console.error(
        `[ERROR] ${eid} ${new Date().toLocaleString()} Soap error: ${err}`,
      );
    });
    client.on('request', (xml, eid) => {
      console.log(
        `[Request from ${req.ip}] ${eid} ${new Date().toLocaleString()}`,
      );
    });
    client.on('response', (body, response, eid) => {
      console.log(
        `[Response to ${req.ip}] ${eid} ${new Date().toLocaleString()}`,
      );
    });
    client.CautareSedinte(search, (err, result) => {
      if (err) {
        console.log(`[Error] ${JSON.stringify(err, null, 2)}`);
        return res.status(503).send({ error: err });
      }
      if (result) {
        res.status(200).send({
          count: result.CautareSedinteResult.Sedinta.length,
          result: result.CautareSedinteResult.Sedinta,
        });
      } else {
        res.status(200).send({ count: 0 });
      }
    });
  });
});

app.set('port', PORT);
const server = http.createServer(app);
server.listen(PORT, err => {
  if (err) {
    console.error(err);
    exit(1);
  }
  console.log(`> Server running on port ${PORT}...`);
});

module.exports = app;
