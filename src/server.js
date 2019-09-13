const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const soap = require('soap');

const PORT = Number.parseInt(process.env.PORT, 10) || 7000;
const URL = 'http://portalquery.just.ro/query.asmx?WSDL';

const app = express();

// middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes

/*
      <numarDosar>string</numarDosar>
      <obiectDosar>string</obiectDosar>
      <numeParte>string</numeParte>
      <institutie>CurteadeApelBUCURESTI or TribunalulBUCURESTI or JudecatoriaSECTORUL4BUCURESTI or TribunalulTIMIS or CurteadeApelBACAU or CurteadeApelCLUJ or CurteadeApelORADEA or CurteadeApelCONSTANTA or CurteadeApelSUCEAVA or TribunalulBOTOSANI or CurteadeApelPLOIESTI or CurteadeApelTARGUMURES or CurteadeApelGALATI or CurteadeApelIASI or CurteadeApelPITESTI or CurteadeApelCRAIOVA or JudecatoriaARAD or CurteadeApelALBAIULIA or CurteadeApelTIMISOARA or TribunalulBRASOV or TribunalulDOLJ or CurteadeApelBRASOV or CurteaMilitaradeApelBUCURESTI or TribunalulSATUMARE or TribunalulSALAJ or TribunalulSIBIU or TribunalulSUCEAVA or TribunalulTELEORMAN or TribunalulTULCEA or TribunalulVASLUI or TribunalulVALCEA or TribunalulVRANCEA or TribunalulMilitarBUCURESTI or TribunalulILFOV or JudecatoriaBUFTEA or TribunalulGORJ or TribunalulHARGHITA or TribunalulHUNEDOARA or TribunalulIALOMITA or TribunalulIASI or TribunalulMARAMURES or TribunalulMEHEDINTI or TribunalulMURES or TribunalulNEAMT or TribunalulOLT or TribunalulPRAHOVA or TribunalulALBA or TribunalulARAD or TribunalulARGES or TribunalulBACAU or TribunalulBIHOR or TribunalulBISTRITANASAUD or TribunalulBRAILA or TribunalulBUZAU or TribunalulCARASSEVERIN or TribunalulCALARASI or TribunalulCLUJ or TribunalulCONSTANTA or TribunalulCOVASNA or TribunalulDAMBOVITA or TribunalulGALATI or TribunalulGIURGIU or JudecatoriaADJUD or JudecatoriaAGNITA or JudecatoriaAIUD or JudecatoriaALBAIULIA or JudecatoriaALESD or JudecatoriaBABADAG or JudecatoriaBACAU or JudecatoriaBAIADEARAMA or JudecatoriaBAIAMARE or JudecatoriaBAILESTI or JudecatoriaBALS or JudecatoriaBALCESTI or JudecatoriaBECLEAN or JudecatoriaBEIUS or JudecatoriaBICAZ or JudecatoriaBARLAD or JudecatoriaBISTRITA or JudecatoriaBLAJ or JudecatoriaBOLINTINVALE or JudecatoriaBOTOSANI or JudecatoriaBOZOVICI or JudecatoriaBRAD or JudecatoriaBRAILA or JudecatoriaBRASOV or JudecatoriaBREZOI or JudecatoriaBUHUSI or JudecatoriaBUZAU or JudecatoriaCALAFAT or JudecatoriaCALARASI or JudecatoriaCAMPENI or JudecatoriaCAMPINA or JudecatoriaCAMPULUNG or JudecatoriaCAMPULUNGMOLDOVENESC or JudecatoriaCARACAL or JudecatoriaCARANSEBES or JudecatoriaCHISINEUCRIS or JudecatoriaCLUJNAPOCA or JudecatoriaCONSTANTA or JudecatoriaCORABIA or JudecatoriaCOSTESTI or JudecatoriaCRAIOVA or JudecatoriaCURTEADEARGES or JudecatoriaDarabani or JudecatoriaCAREI or JudecatoriaDEJ or JudecatoriaDETA or JudecatoriaDEVA or JudecatoriaDOROHOI or JudecatoriaDRAGASANI or JudecatoriaDRAGOMIRESTI or JudecatoriaDROBETATURNUSEVERIN or JudecatoriaFAGARAS or JudecatoriaFALTICENI or JudecatoriaFAUREI or JudecatoriaFETESTI or JudecatoriaFILIASI or JudecatoriaFOCSANI or JudecatoriaGAESTI or JudecatoriaGALATI or JudecatoriaGHEORGHENI or JudecatoriaGHERLA or JudecatoriaGIURGIU or JudecatoriaGURAHUMORULUI or JudecatoriaGURAHONT or JudecatoriaHARLAU or JudecatoriaHATEG or JudecatoriaHOREZU or JudecatoriaHUEDIN or JudecatoriaHUNEDOARA or JudecatoriaHUSI or JudecatoriaIASI or JudecatoriaINEU or JudecatoriaINSURATEI or JudecatoriaINTORSURABUZAULUI or JudecatoriaLEHLIUGARA or JudecatoriaLIPOVA or JudecatoriaLUDUS or JudecatoriaLUGOJ or JudecatoriaMACIN or JudecatoriaMANGALIA or JudecatoriaMARGHITA or JudecatoriaMEDGIDIA or JudecatoriaMEDIAS or JudecatoriaMIERCUREACIUC or JudecatoriaMIZIL or JudecatoriaMOINESTI or JudecatoriaMOLDOVANOUA or JudecatoriaMORENI or JudecatoriaMOTRU or JudecatoriaMURGENI or JudecatoriaNASAUD or JudecatoriaNEGRESTIOAS or JudecatoriaNOVACI or JudecatoriaODORHEIULSECUIESC or JudecatoriaOLTENITA or JudecatoriaONESTI or JudecatoriaORADEA or JudecatoriaORASTIE or JudecatoriaORAVITA or JudecatoriaORSOVA or JudecatoriaPANCIU or JudecatoriaPATARLAGELE or JudecatoriaPETROSANI or JudecatoriaPIATRANEAMT or JudecatoriaPITESTI or JudecatoriaPLOIESTI or JudecatoriaPOGOANELE or JudecatoriaPUCIOASA or JudecatoriaRACARI or JudecatoriaRADAUTI or JudecatoriaRADUCANENI or JudecatoriaRAMNICUSARAT or JudecatoriaRAMNICUVALCEA or JudecatoriaREGHIN or JudecatoriaRESITA or JudecatoriaROMAN or JudecatoriaROSIORIDEVEDE or JudecatoriaRUPEA or JudecatoriaSALISTE or JudecatoriaSANNICOLAULMARE or JudecatoriaSATUMARE or JudecatoriaSAVENI or JudecatoriaSEBES or JudecatoriaSECTORUL1BUCURESTI or JudecatoriaSECTORUL2BUCURESTI or JudecatoriaSECTORUL3BUCURESTI or JudecatoriaSECTORUL5BUCURESTI or JudecatoriaSECTORUL6BUCURESTI or JudecatoriaSEGARCEA or JudecatoriaSFANTUGHEORGHE or JudecatoriaSIBIU or JudecatoriaSIGHETUMARMATIEI or JudecatoriaSIGHISOARA or JudecatoriaSIMLEULSILVANIEI or JudecatoriaSINAIA or JudecatoriaSLATINA or JudecatoriaSLOBOZIA or JudecatoriaSTREHAIA or JudecatoriaSUCEAVA or JudecatoriaTARGOVISTE or JudecatoriaTARGUBUJOR or JudecatoriaTARGUCARBUNESTI or JudecatoriaTARGUJIU or JudecatoriaTARGULAPUS or JudecatoriaTARGUMURES or JudecatoriaTARGUNEAMT or JudecatoriaTARGUSECUIESC or JudecatoriaTARNAVENI or JudecatoriaTECUCI or JudecatoriaTIMISOARA or JudecatoriaTOPLITA or JudecatoriaTULCEA or JudecatoriaTURDA or JudecatoriaTURNUMAGURELE or JudecatoriaURZICENI or JudecatoriaVALENIIDEMUNTE or JudecatoriaVANJUMARE or JudecatoriaVASLUI or JudecatoriaVATRADORNEI or JudecatoriaVIDELE or JudecatoriaVISEUDESUS or JudecatoriaZALAU or JudecatoriaZARNESTI or JudecatoriaZIMNICEA or TribunalulMilitarIASI or JudecatoriaALEXANDRIA or TribunalulMilitarTIMISOARA or TribunalulMilitarCLUJNAPOCA or TribunalulMilitarTeritorialBUCURESTI or JudecatoriaAVRIG or JudecatoriaTOPOLOVENI or JudecatoriaPODUTURCULUI or JudecatoriaFAGET or JudecatoriaSALONTA or JudecatoriaLIESTI or JudecatoriaHARSOVA or JudecatoriaSOMCUTAMARE or JudecatoriaPASCANI or TribunalulComercialARGES or TribunalulComercialCLUJ or TribunalulComercialMURES or TribunalulpentruminoriSifamilieBRASOV or JudecatoriaCORNETU or JudecatoriaJIBOU</institutie>
      <dataStart>dateTime</dataStart>
      <dataStop>dateTime</dataStop>
*/

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
  console.log(`[INFO] Searching for \n${JSON.stringify(search, null, 2)}`);
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
      console.log(`[Request] ${eid} ${new Date().toLocaleString()}`);
    });
    client.on('response', (body, response, eid) => {
      console.log(`[Response] ${eid} ${new Date().toLocaleString()}`);
    });
    client.CautareDosare(search, (err, result) => {
      if (err) {
        console.log(`[Error] ${JSON.stringify(err, null, 2)}`);
        return res.status(503).send({ error: err });
      }
      if (result) {
        res
          .status(200)
          .send({ count: result.CautareDosareResult.Dosar.length, result });
      } else {
        res.status(200).send({ count: 0 });
      }
    });
  });
});

/*
      <numarDosar>string</numarDosar>
      <obiectDosar>string</obiectDosar>
      <numeParte>string</numeParte>
      <institutie>CurteadeApelBUCURESTI or TribunalulBUCURESTI or JudecatoriaSECTORUL4BUCURESTI or TribunalulTIMIS or CurteadeApelBACAU or CurteadeApelCLUJ or CurteadeApelORADEA or CurteadeApelCONSTANTA or CurteadeApelSUCEAVA or TribunalulBOTOSANI or CurteadeApelPLOIESTI or CurteadeApelTARGUMURES or CurteadeApelGALATI or CurteadeApelIASI or CurteadeApelPITESTI or CurteadeApelCRAIOVA or JudecatoriaARAD or CurteadeApelALBAIULIA or CurteadeApelTIMISOARA or TribunalulBRASOV or TribunalulDOLJ or CurteadeApelBRASOV or CurteaMilitaradeApelBUCURESTI or TribunalulSATUMARE or TribunalulSALAJ or TribunalulSIBIU or TribunalulSUCEAVA or TribunalulTELEORMAN or TribunalulTULCEA or TribunalulVASLUI or TribunalulVALCEA or TribunalulVRANCEA or TribunalulMilitarBUCURESTI or TribunalulILFOV or JudecatoriaBUFTEA or TribunalulGORJ or TribunalulHARGHITA or TribunalulHUNEDOARA or TribunalulIALOMITA or TribunalulIASI or TribunalulMARAMURES or TribunalulMEHEDINTI or TribunalulMURES or TribunalulNEAMT or TribunalulOLT or TribunalulPRAHOVA or TribunalulALBA or TribunalulARAD or TribunalulARGES or TribunalulBACAU or TribunalulBIHOR or TribunalulBISTRITANASAUD or TribunalulBRAILA or TribunalulBUZAU or TribunalulCARASSEVERIN or TribunalulCALARASI or TribunalulCLUJ or TribunalulCONSTANTA or TribunalulCOVASNA or TribunalulDAMBOVITA or TribunalulGALATI or TribunalulGIURGIU or JudecatoriaADJUD or JudecatoriaAGNITA or JudecatoriaAIUD or JudecatoriaALBAIULIA or JudecatoriaALESD or JudecatoriaBABADAG or JudecatoriaBACAU or JudecatoriaBAIADEARAMA or JudecatoriaBAIAMARE or JudecatoriaBAILESTI or JudecatoriaBALS or JudecatoriaBALCESTI or JudecatoriaBECLEAN or JudecatoriaBEIUS or JudecatoriaBICAZ or JudecatoriaBARLAD or JudecatoriaBISTRITA or JudecatoriaBLAJ or JudecatoriaBOLINTINVALE or JudecatoriaBOTOSANI or JudecatoriaBOZOVICI or JudecatoriaBRAD or JudecatoriaBRAILA or JudecatoriaBRASOV or JudecatoriaBREZOI or JudecatoriaBUHUSI or JudecatoriaBUZAU or JudecatoriaCALAFAT or JudecatoriaCALARASI or JudecatoriaCAMPENI or JudecatoriaCAMPINA or JudecatoriaCAMPULUNG or JudecatoriaCAMPULUNGMOLDOVENESC or JudecatoriaCARACAL or JudecatoriaCARANSEBES or JudecatoriaCHISINEUCRIS or JudecatoriaCLUJNAPOCA or JudecatoriaCONSTANTA or JudecatoriaCORABIA or JudecatoriaCOSTESTI or JudecatoriaCRAIOVA or JudecatoriaCURTEADEARGES or JudecatoriaDarabani or JudecatoriaCAREI or JudecatoriaDEJ or JudecatoriaDETA or JudecatoriaDEVA or JudecatoriaDOROHOI or JudecatoriaDRAGASANI or JudecatoriaDRAGOMIRESTI or JudecatoriaDROBETATURNUSEVERIN or JudecatoriaFAGARAS or JudecatoriaFALTICENI or JudecatoriaFAUREI or JudecatoriaFETESTI or JudecatoriaFILIASI or JudecatoriaFOCSANI or JudecatoriaGAESTI or JudecatoriaGALATI or JudecatoriaGHEORGHENI or JudecatoriaGHERLA or JudecatoriaGIURGIU or JudecatoriaGURAHUMORULUI or JudecatoriaGURAHONT or JudecatoriaHARLAU or JudecatoriaHATEG or JudecatoriaHOREZU or JudecatoriaHUEDIN or JudecatoriaHUNEDOARA or JudecatoriaHUSI or JudecatoriaIASI or JudecatoriaINEU or JudecatoriaINSURATEI or JudecatoriaINTORSURABUZAULUI or JudecatoriaLEHLIUGARA or JudecatoriaLIPOVA or JudecatoriaLUDUS or JudecatoriaLUGOJ or JudecatoriaMACIN or JudecatoriaMANGALIA or JudecatoriaMARGHITA or JudecatoriaMEDGIDIA or JudecatoriaMEDIAS or JudecatoriaMIERCUREACIUC or JudecatoriaMIZIL or JudecatoriaMOINESTI or JudecatoriaMOLDOVANOUA or JudecatoriaMORENI or JudecatoriaMOTRU or JudecatoriaMURGENI or JudecatoriaNASAUD or JudecatoriaNEGRESTIOAS or JudecatoriaNOVACI or JudecatoriaODORHEIULSECUIESC or JudecatoriaOLTENITA or JudecatoriaONESTI or JudecatoriaORADEA or JudecatoriaORASTIE or JudecatoriaORAVITA or JudecatoriaORSOVA or JudecatoriaPANCIU or JudecatoriaPATARLAGELE or JudecatoriaPETROSANI or JudecatoriaPIATRANEAMT or JudecatoriaPITESTI or JudecatoriaPLOIESTI or JudecatoriaPOGOANELE or JudecatoriaPUCIOASA or JudecatoriaRACARI or JudecatoriaRADAUTI or JudecatoriaRADUCANENI or JudecatoriaRAMNICUSARAT or JudecatoriaRAMNICUVALCEA or JudecatoriaREGHIN or JudecatoriaRESITA or JudecatoriaROMAN or JudecatoriaROSIORIDEVEDE or JudecatoriaRUPEA or JudecatoriaSALISTE or JudecatoriaSANNICOLAULMARE or JudecatoriaSATUMARE or JudecatoriaSAVENI or JudecatoriaSEBES or JudecatoriaSECTORUL1BUCURESTI or JudecatoriaSECTORUL2BUCURESTI or JudecatoriaSECTORUL3BUCURESTI or JudecatoriaSECTORUL5BUCURESTI or JudecatoriaSECTORUL6BUCURESTI or JudecatoriaSEGARCEA or JudecatoriaSFANTUGHEORGHE or JudecatoriaSIBIU or JudecatoriaSIGHETUMARMATIEI or JudecatoriaSIGHISOARA or JudecatoriaSIMLEULSILVANIEI or JudecatoriaSINAIA or JudecatoriaSLATINA or JudecatoriaSLOBOZIA or JudecatoriaSTREHAIA or JudecatoriaSUCEAVA or JudecatoriaTARGOVISTE or JudecatoriaTARGUBUJOR or JudecatoriaTARGUCARBUNESTI or JudecatoriaTARGUJIU or JudecatoriaTARGULAPUS or JudecatoriaTARGUMURES or JudecatoriaTARGUNEAMT or JudecatoriaTARGUSECUIESC or JudecatoriaTARNAVENI or JudecatoriaTECUCI or JudecatoriaTIMISOARA or JudecatoriaTOPLITA or JudecatoriaTULCEA or JudecatoriaTURDA or JudecatoriaTURNUMAGURELE or JudecatoriaURZICENI or JudecatoriaVALENIIDEMUNTE or JudecatoriaVANJUMARE or JudecatoriaVASLUI or JudecatoriaVATRADORNEI or JudecatoriaVIDELE or JudecatoriaVISEUDESUS or JudecatoriaZALAU or JudecatoriaZARNESTI or JudecatoriaZIMNICEA or TribunalulMilitarIASI or JudecatoriaALEXANDRIA or TribunalulMilitarTIMISOARA or TribunalulMilitarCLUJNAPOCA or TribunalulMilitarTeritorialBUCURESTI or JudecatoriaAVRIG or JudecatoriaTOPOLOVENI or JudecatoriaPODUTURCULUI or JudecatoriaFAGET or JudecatoriaSALONTA or JudecatoriaLIESTI or JudecatoriaHARSOVA or JudecatoriaSOMCUTAMARE or JudecatoriaPASCANI or TribunalulComercialARGES or TribunalulComercialCLUJ or TribunalulComercialMURES or TribunalulpentruminoriSifamilieBRASOV or JudecatoriaCORNETU or JudecatoriaJIBOU</institutie>
      <dataStart>dateTime</dataStart>
      <dataStop>dateTime</dataStop>
      <dataUltimaModificareStart>dateTime</dataUltimaModificareStart>
      <dataUltimaModificareStop>dateTime</dataUltimaModificareStop>
*/

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
  console.log(`[INFO] Searching for \n ${JSON.stringify(search, null, 2)}`);
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
      console.log(`[Request] ${eid} ${new Date().toLocaleString()}`);
    });
    client.on('response', (body, response, eid) => {
      console.log(`[Response] ${eid} ${new Date().toLocaleString()}`);
    });
    client.CautareDosare2(search, (err, result) => {
      if (err) {
        console.log(`[Error] ${JSON.stringify(err, null, 2)}`);
        return res.status(503).send({ error: err });
      }
      if (result) {
        res
          .status(200)
          .send({ count: result.CautareDosare2Result.Dosar.length, result });
      } else {
        res.status(200).send({ count: 0 });
      }
    });
  });
});

/*
  <dataSedinta>dateTime</dataSedinta>
  <institutie>CurteadeApelBUCURESTI or TribunalulBUCURESTI or JudecatoriaSECTORUL4BUCURESTI or TribunalulTIMIS or CurteadeApelBACAU or CurteadeApelCLUJ or CurteadeApelORADEA or CurteadeApelCONSTANTA or CurteadeApelSUCEAVA or TribunalulBOTOSANI or CurteadeApelPLOIESTI or CurteadeApelTARGUMURES or CurteadeApelGALATI or CurteadeApelIASI or CurteadeApelPITESTI or CurteadeApelCRAIOVA or JudecatoriaARAD or CurteadeApelALBAIULIA or CurteadeApelTIMISOARA or TribunalulBRASOV or TribunalulDOLJ or CurteadeApelBRASOV or CurteaMilitaradeApelBUCURESTI or TribunalulSATUMARE or TribunalulSALAJ or TribunalulSIBIU or TribunalulSUCEAVA or TribunalulTELEORMAN or TribunalulTULCEA or TribunalulVASLUI or TribunalulVALCEA or TribunalulVRANCEA or TribunalulMilitarBUCURESTI or TribunalulILFOV or JudecatoriaBUFTEA or TribunalulGORJ or TribunalulHARGHITA or TribunalulHUNEDOARA or TribunalulIALOMITA or TribunalulIASI or TribunalulMARAMURES or TribunalulMEHEDINTI or TribunalulMURES or TribunalulNEAMT or TribunalulOLT or TribunalulPRAHOVA or TribunalulALBA or TribunalulARAD or TribunalulARGES or TribunalulBACAU or TribunalulBIHOR or TribunalulBISTRITANASAUD or TribunalulBRAILA or TribunalulBUZAU or TribunalulCARASSEVERIN or TribunalulCALARASI or TribunalulCLUJ or TribunalulCONSTANTA or TribunalulCOVASNA or TribunalulDAMBOVITA or TribunalulGALATI or TribunalulGIURGIU or JudecatoriaADJUD or JudecatoriaAGNITA or JudecatoriaAIUD or JudecatoriaALBAIULIA or JudecatoriaALESD or JudecatoriaBABADAG or JudecatoriaBACAU or JudecatoriaBAIADEARAMA or JudecatoriaBAIAMARE or JudecatoriaBAILESTI or JudecatoriaBALS or JudecatoriaBALCESTI or JudecatoriaBECLEAN or JudecatoriaBEIUS or JudecatoriaBICAZ or JudecatoriaBARLAD or JudecatoriaBISTRITA or JudecatoriaBLAJ or JudecatoriaBOLINTINVALE or JudecatoriaBOTOSANI or JudecatoriaBOZOVICI or JudecatoriaBRAD or JudecatoriaBRAILA or JudecatoriaBRASOV or JudecatoriaBREZOI or JudecatoriaBUHUSI or JudecatoriaBUZAU or JudecatoriaCALAFAT or JudecatoriaCALARASI or JudecatoriaCAMPENI or JudecatoriaCAMPINA or JudecatoriaCAMPULUNG or JudecatoriaCAMPULUNGMOLDOVENESC or JudecatoriaCARACAL or JudecatoriaCARANSEBES or JudecatoriaCHISINEUCRIS or JudecatoriaCLUJNAPOCA or JudecatoriaCONSTANTA or JudecatoriaCORABIA or JudecatoriaCOSTESTI or JudecatoriaCRAIOVA or JudecatoriaCURTEADEARGES or JudecatoriaDarabani or JudecatoriaCAREI or JudecatoriaDEJ or JudecatoriaDETA or JudecatoriaDEVA or JudecatoriaDOROHOI or JudecatoriaDRAGASANI or JudecatoriaDRAGOMIRESTI or JudecatoriaDROBETATURNUSEVERIN or JudecatoriaFAGARAS or JudecatoriaFALTICENI or JudecatoriaFAUREI or JudecatoriaFETESTI or JudecatoriaFILIASI or JudecatoriaFOCSANI or JudecatoriaGAESTI or JudecatoriaGALATI or JudecatoriaGHEORGHENI or JudecatoriaGHERLA or JudecatoriaGIURGIU or JudecatoriaGURAHUMORULUI or JudecatoriaGURAHONT or JudecatoriaHARLAU or JudecatoriaHATEG or JudecatoriaHOREZU or JudecatoriaHUEDIN or JudecatoriaHUNEDOARA or JudecatoriaHUSI or JudecatoriaIASI or JudecatoriaINEU or JudecatoriaINSURATEI or JudecatoriaINTORSURABUZAULUI or JudecatoriaLEHLIUGARA or JudecatoriaLIPOVA or JudecatoriaLUDUS or JudecatoriaLUGOJ or JudecatoriaMACIN or JudecatoriaMANGALIA or JudecatoriaMARGHITA or JudecatoriaMEDGIDIA or JudecatoriaMEDIAS or JudecatoriaMIERCUREACIUC or JudecatoriaMIZIL or JudecatoriaMOINESTI or JudecatoriaMOLDOVANOUA or JudecatoriaMORENI or JudecatoriaMOTRU or JudecatoriaMURGENI or JudecatoriaNASAUD or JudecatoriaNEGRESTIOAS or JudecatoriaNOVACI or JudecatoriaODORHEIULSECUIESC or JudecatoriaOLTENITA or JudecatoriaONESTI or JudecatoriaORADEA or JudecatoriaORASTIE or JudecatoriaORAVITA or JudecatoriaORSOVA or JudecatoriaPANCIU or JudecatoriaPATARLAGELE or JudecatoriaPETROSANI or JudecatoriaPIATRANEAMT or JudecatoriaPITESTI or JudecatoriaPLOIESTI or JudecatoriaPOGOANELE or JudecatoriaPUCIOASA or JudecatoriaRACARI or JudecatoriaRADAUTI or JudecatoriaRADUCANENI or JudecatoriaRAMNICUSARAT or JudecatoriaRAMNICUVALCEA or JudecatoriaREGHIN or JudecatoriaRESITA or JudecatoriaROMAN or JudecatoriaROSIORIDEVEDE or JudecatoriaRUPEA or JudecatoriaSALISTE or JudecatoriaSANNICOLAULMARE or JudecatoriaSATUMARE or JudecatoriaSAVENI or JudecatoriaSEBES or JudecatoriaSECTORUL1BUCURESTI or JudecatoriaSECTORUL2BUCURESTI or JudecatoriaSECTORUL3BUCURESTI or JudecatoriaSECTORUL5BUCURESTI or JudecatoriaSECTORUL6BUCURESTI or JudecatoriaSEGARCEA or JudecatoriaSFANTUGHEORGHE or JudecatoriaSIBIU or JudecatoriaSIGHETUMARMATIEI or JudecatoriaSIGHISOARA or JudecatoriaSIMLEULSILVANIEI or JudecatoriaSINAIA or JudecatoriaSLATINA or JudecatoriaSLOBOZIA or JudecatoriaSTREHAIA or JudecatoriaSUCEAVA or JudecatoriaTARGOVISTE or JudecatoriaTARGUBUJOR or JudecatoriaTARGUCARBUNESTI or JudecatoriaTARGUJIU or JudecatoriaTARGULAPUS or JudecatoriaTARGUMURES or JudecatoriaTARGUNEAMT or JudecatoriaTARGUSECUIESC or JudecatoriaTARNAVENI or JudecatoriaTECUCI or JudecatoriaTIMISOARA or JudecatoriaTOPLITA or JudecatoriaTULCEA or JudecatoriaTURDA or JudecatoriaTURNUMAGURELE or JudecatoriaURZICENI or JudecatoriaVALENIIDEMUNTE or JudecatoriaVANJUMARE or JudecatoriaVASLUI or JudecatoriaVATRADORNEI or JudecatoriaVIDELE or JudecatoriaVISEUDESUS or JudecatoriaZALAU or JudecatoriaZARNESTI or JudecatoriaZIMNICEA or TribunalulMilitarIASI or JudecatoriaALEXANDRIA or TribunalulMilitarTIMISOARA or TribunalulMilitarCLUJNAPOCA or TribunalulMilitarTeritorialBUCURESTI or JudecatoriaAVRIG or JudecatoriaTOPOLOVENI or JudecatoriaPODUTURCULUI or JudecatoriaFAGET or JudecatoriaSALONTA or JudecatoriaLIESTI or JudecatoriaHARSOVA or JudecatoriaSOMCUTAMARE or JudecatoriaPASCANI or TribunalulComercialARGES or TribunalulComercialCLUJ or TribunalulComercialMURES or TribunalulpentruminoriSifamilieBRASOV or JudecatoriaCORNETU or JudecatoriaJIBOU</institutie>
*/
app.post('/cautare/sedinte', (req, res) => {
  const { institutie, dataSedinta } = req.body;
  const search = {};
  if (institutie) {
    search.institutie = institutie;
  }
  if (dataSedinta) {
    search.dataSedinta = new Date(dataSedinta).toISOString();
  }
  console.log(`[INFO] Searching for \n ${JSON.stringify(search, null, 2)}`);
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
      console.log(`[Request] ${eid} ${new Date().toLocaleString()}`);
    });
    client.on('response', (body, response, eid) => {
      console.log(`[Response] ${eid} ${new Date().toLocaleString()}`);
    });
    client.CautareSedinte(search, (err, result) => {
      if (err) {
        console.log(`[Error] ${JSON.stringify(err, null, 2)}`);
        return res.status(503).send({ error: err });
      }
      if (result) {
        res
          .status(200)
          .send({ count: result.CautareSedinteResult.Sedinta.length, result });
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
