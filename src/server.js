const soap = require('soap');
const url = 'http://portalquery.just.ro/query.asmx?WSDL';
// var args = { op: 'CautareDosare2' };

soap.createClient(url, (err, client) => {
  if (err) {
    console.log(err);
    return;
  }
  // console.log(client.wsdl);
  client.CautareDosare({ numarDosar: '123/59/2019' }, (err, result) => {
    if (err) {
      console.error('[Error]' + JSON.stringify(err, null, 2));
    }
    if (result) {
      result.CautareDosareResult.Dosar.forEach(d =>
        console.log(JSON.stringify(d, null, 4)),
      );
    }
  });

  // console.log(client.describe());
});
