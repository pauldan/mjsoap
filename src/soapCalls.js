const soap = require('soap');
const URL = 'http://portalquery.just.ro/query.asmx?WSDL';

const cautareDosare = (req, res) => {
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
  console.log(
    `[Request from ${req.ip}] Searching for\n${JSON.stringify(
      search,
      null,
      2,
    )}`,
  );
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
      console.log(`[APICall for ${req.ip}] ${eid}`);
    });
    client.on('response', (body, response, eid) => {
      console.log(`[Response to ${req.ip}] ${eid}`);
    });
    client.CautareDosare(search, (err, result /* , body, eid */) => {
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
};

const describe = (req, res) => {
  console.log(`[Request from ${req.ip}] Searching for institutions`);
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
      console.error(`[ERROR] ${eid} Soap error: ${err}`);
    });
    client.on('request', (xml, eid) => {
      console.log(`[API Call for ${req.ip}] ${eid}`);
    });
    client.on('response', (body, response, eid) => {
      console.log(`[Response to ${req.ip}] ${eid}`);
    });
    res.send(`<pre>${JSON.stringify(client.describe(), null, 2)}</pre>`);
  });
};

module.exports = {
  describe,
  cautareDosare,
};
