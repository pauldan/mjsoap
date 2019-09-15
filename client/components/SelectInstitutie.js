import React from 'react';
import SelectInput from './styled/SelectInput';

const institutii = [
  'CurteaMilitaradeApelBUCURESTI',
  'CurteadeApelALBAIULIA',
  'CurteadeApelBACAU',
  'CurteadeApelBRASOV',
  'CurteadeApelBUCURESTI',
  'CurteadeApelCLUJ',
  'CurteadeApelCONSTANTA',
  'CurteadeApelCRAIOVA',
  'CurteadeApelGALATI',
  'CurteadeApelIASI',
  'CurteadeApelORADEA',
  'CurteadeApelPITESTI',
  'CurteadeApelPLOIESTI',
  'CurteadeApelSUCEAVA',
  'CurteadeApelTARGUMURES',
  'CurteadeApelTIMISOARA',
  'JudecatoriaADJUD',
  'JudecatoriaAGNITA',
  'JudecatoriaAIUD',
  'JudecatoriaALBAIULIA',
  'JudecatoriaALESD',
  'JudecatoriaALEXANDRIA',
  'JudecatoriaARAD',
  'JudecatoriaAVRIG',
  'JudecatoriaBABADAG',
  'JudecatoriaBACAU',
  'JudecatoriaBAIADEARAMA',
  'JudecatoriaBAIAMARE',
  'JudecatoriaBAILESTI',
  'JudecatoriaBALCESTI',
  'JudecatoriaBALS',
  'JudecatoriaBARLAD',
  'JudecatoriaBECLEAN',
  'JudecatoriaBEIUS',
  'JudecatoriaBICAZ',
  'JudecatoriaBISTRITA',
  'JudecatoriaBLAJ',
  'JudecatoriaBOLINTINVALE',
  'JudecatoriaBOTOSANI',
  'JudecatoriaBOZOVICI',
  'JudecatoriaBRAD',
  'JudecatoriaBRAILA',
  'JudecatoriaBRASOV',
  'JudecatoriaBREZOI',
  'JudecatoriaBUFTEA',
  'JudecatoriaBUHUSI',
  'JudecatoriaBUZAU',
  'JudecatoriaCALAFAT',
  'JudecatoriaCALARASI',
  'JudecatoriaCAMPENI',
  'JudecatoriaCAMPINA',
  'JudecatoriaCAMPULUNG',
  'JudecatoriaCAMPULUNGMOLDOVENESC',
  'JudecatoriaCARACAL',
  'JudecatoriaCARANSEBES',
  'JudecatoriaCAREI',
  'JudecatoriaCHISINEUCRIS',
  'JudecatoriaCLUJNAPOCA',
  'JudecatoriaCONSTANTA',
  'JudecatoriaCORABIA',
  'JudecatoriaCORNETU',
  'JudecatoriaCOSTESTI',
  'JudecatoriaCRAIOVA',
  'JudecatoriaCURTEADEARGES',
  'JudecatoriaDEJ',
  'JudecatoriaDETA',
  'JudecatoriaDEVA',
  'JudecatoriaDOROHOI',
  'JudecatoriaDRAGASANI',
  'JudecatoriaDRAGOMIRESTI',
  'JudecatoriaDROBETATURNUSEVERIN',
  'JudecatoriaDarabani',
  'JudecatoriaFAGARAS',
  'JudecatoriaFAGET',
  'JudecatoriaFALTICENI',
  'JudecatoriaFAUREI',
  'JudecatoriaFETESTI',
  'JudecatoriaFILIASI',
  'JudecatoriaFOCSANI',
  'JudecatoriaGAESTI',
  'JudecatoriaGALATI',
  'JudecatoriaGHEORGHENI',
  'JudecatoriaGHERLA',
  'JudecatoriaGIURGIU',
  'JudecatoriaGURAHONT',
  'JudecatoriaGURAHUMORULUI',
  'JudecatoriaHARLAU',
  'JudecatoriaHARSOVA',
  'JudecatoriaHATEG',
  'JudecatoriaHOREZU',
  'JudecatoriaHUEDIN',
  'JudecatoriaHUNEDOARA',
  'JudecatoriaHUSI',
  'JudecatoriaIASI',
  'JudecatoriaINEU',
  'JudecatoriaINSURATEI',
  'JudecatoriaINTORSURABUZAULUI',
  'JudecatoriaJIBOU',
  'JudecatoriaLEHLIUGARA',
  'JudecatoriaLIESTI',
  'JudecatoriaLIPOVA',
  'JudecatoriaLUDUS',
  'JudecatoriaLUGOJ',
  'JudecatoriaMACIN',
  'JudecatoriaMANGALIA',
  'JudecatoriaMARGHITA',
  'JudecatoriaMEDGIDIA',
  'JudecatoriaMEDIAS',
  'JudecatoriaMIERCUREACIUC',
  'JudecatoriaMIZIL',
  'JudecatoriaMOINESTI',
  'JudecatoriaMOLDOVANOUA',
  'JudecatoriaMORENI',
  'JudecatoriaMOTRU',
  'JudecatoriaMURGENI',
  'JudecatoriaNASAUD',
  'JudecatoriaNEGRESTIOAS',
  'JudecatoriaNOVACI',
  'JudecatoriaODORHEIULSECUIESC',
  'JudecatoriaOLTENITA',
  'JudecatoriaONESTI',
  'JudecatoriaORADEA',
  'JudecatoriaORASTIE',
  'JudecatoriaORAVITA',
  'JudecatoriaORSOVA',
  'JudecatoriaPANCIU',
  'JudecatoriaPASCANI',
  'JudecatoriaPATARLAGELE',
  'JudecatoriaPETROSANI',
  'JudecatoriaPIATRANEAMT',
  'JudecatoriaPITESTI',
  'JudecatoriaPLOIESTI',
  'JudecatoriaPODUTURCULUI',
  'JudecatoriaPOGOANELE',
  'JudecatoriaPUCIOASA',
  'JudecatoriaRACARI',
  'JudecatoriaRADAUTI',
  'JudecatoriaRADUCANENI',
  'JudecatoriaRAMNICUSARAT',
  'JudecatoriaRAMNICUVALCEA',
  'JudecatoriaREGHIN',
  'JudecatoriaRESITA',
  'JudecatoriaROMAN',
  'JudecatoriaROSIORIDEVEDE',
  'JudecatoriaRUPEA',
  'JudecatoriaSALISTE',
  'JudecatoriaSALONTA',
  'JudecatoriaSANNICOLAULMARE',
  'JudecatoriaSATUMARE',
  'JudecatoriaSAVENI',
  'JudecatoriaSEBES',
  'JudecatoriaSECTORUL1BUCURESTI',
  'JudecatoriaSECTORUL2BUCURESTI',
  'JudecatoriaSECTORUL3BUCURESTI',
  'JudecatoriaSECTORUL4BUCURESTI',
  'JudecatoriaSECTORUL5BUCURESTI',
  'JudecatoriaSECTORUL6BUCURESTI',
  'JudecatoriaSEGARCEA',
  'JudecatoriaSFANTUGHEORGHE',
  'JudecatoriaSIBIU',
  'JudecatoriaSIGHETUMARMATIEI',
  'JudecatoriaSIGHISOARA',
  'JudecatoriaSIMLEULSILVANIEI',
  'JudecatoriaSINAIA',
  'JudecatoriaSLATINA',
  'JudecatoriaSLOBOZIA',
  'JudecatoriaSOMCUTAMARE',
  'JudecatoriaSTREHAIA',
  'JudecatoriaSUCEAVA',
  'JudecatoriaTARGOVISTE',
  'JudecatoriaTARGUBUJOR',
  'JudecatoriaTARGUCARBUNESTI',
  'JudecatoriaTARGUJIU',
  'JudecatoriaTARGULAPUS',
  'JudecatoriaTARGUMURES',
  'JudecatoriaTARGUNEAMT',
  'JudecatoriaTARGUSECUIESC',
  'JudecatoriaTARNAVENI',
  'JudecatoriaTECUCI',
  'JudecatoriaTIMISOARA',
  'JudecatoriaTOPLITA',
  'JudecatoriaTOPOLOVENI',
  'JudecatoriaTULCEA',
  'JudecatoriaTURDA',
  'JudecatoriaTURNUMAGURELE',
  'JudecatoriaURZICENI',
  'JudecatoriaVALENIIDEMUNTE',
  'JudecatoriaVANJUMARE',
  'JudecatoriaVASLUI',
  'JudecatoriaVATRADORNEI',
  'JudecatoriaVIDELE',
  'JudecatoriaVISEUDESUS',
  'JudecatoriaZALAU',
  'JudecatoriaZARNESTI',
  'JudecatoriaZIMNICEA',
  'TribunalulALBA',
  'TribunalulARAD',
  'TribunalulARGES',
  'TribunalulBACAU',
  'TribunalulBIHOR',
  'TribunalulBISTRITANASAUD',
  'TribunalulBOTOSANI',
  'TribunalulBRAILA',
  'TribunalulBRASOV',
  'TribunalulBUCURESTI',
  'TribunalulBUZAU',
  'TribunalulCALARASI',
  'TribunalulCARASSEVERIN',
  'TribunalulCLUJ',
  'TribunalulCONSTANTA',
  'TribunalulCOVASNA',
  'TribunalulComercialARGES',
  'TribunalulComercialCLUJ',
  'TribunalulComercialMURES',
  'TribunalulDAMBOVITA',
  'TribunalulDOLJ',
  'TribunalulGALATI',
  'TribunalulGIURGIU',
  'TribunalulGORJ',
  'TribunalulHARGHITA',
  'TribunalulHUNEDOARA',
  'TribunalulIALOMITA',
  'TribunalulIASI',
  'TribunalulILFOV',
  'TribunalulMARAMURES',
  'TribunalulMEHEDINTI',
  'TribunalulMURES',
  'TribunalulMilitarBUCURESTI',
  'TribunalulMilitarCLUJNAPOCA',
  'TribunalulMilitarIASI',
  'TribunalulMilitarTIMISOARA',
  'TribunalulMilitarTeritorialBUCURESTI',
  'TribunalulNEAMT',
  'TribunalulOLT',
  'TribunalulPRAHOVA',
  'TribunalulSALAJ',
  'TribunalulSATUMARE',
  'TribunalulSIBIU',
  'TribunalulSUCEAVA',
  'TribunalulTELEORMAN',
  'TribunalulTIMIS',
  'TribunalulTULCEA',
  'TribunalulVALCEA',
  'TribunalulVASLUI',
  'TribunalulVRANCEA',
  'TribunalulpentruminoriSifamilieBRASOV',
].sort();

const SelectInstitutie = props => (
  <SelectInput {...props}>
    {institutii.map(el => (
      <option key={el} value={el}>
        {el}
      </option>
    ))}
  </SelectInput>
);

export default SelectInstitutie;
