const soap = require('soap');
const url = 'http://portalquery.just.ro/query.asmx?WSDL';
// var args = { op: 'CautareDosare2' };

const createClient = url =>
  soap.createClient(url, (err, client) => {
    if (err) {
      console.error(err);
      return null;
    }
    return client;
    // // console.log(client.wsdl);
    // client.CautareDosare({ numeParte: 'Ghercea' }, (err, result) => {
    //   if (err) {
    //     console.error('[Error]' + JSON.stringify(err, null, 2));
    //   }
    //   if (result) {
    //     result.CautareDosareResult.Dosar.forEach(d =>
    //       console.log(JSON.stringify(d, null, 4)),
    //     );
    //     console.log(
    //       `[INFO] Found ${
    //         result ? result.CautareDosareResult.Dosar.length : 0
    //       } results`,
    //     );
    //   }
    // });

    // console.log(client.describe());
  });

module.exports = createClient;
