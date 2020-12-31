/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function getToken() {
    return  "apdtok=eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0.mjCmSGzzUBYZRaTfjCmhRgI3DiKQFWfgMqWR9_xobgXIUh_z8o3EmA.0mmH0xF7DaavC-wR3F80Vw.EyvIrmG0_wBRm_ZgvPF1k-udJi1YK1m-FYfOCxmERYPhhTDv2GtfrpTmHG-7vSr8NqsM0Khv8AGbLT_vDTnzeVseGPVBwwrKyEWY7jB2U3vLadFOKwJA191axyIoAA8mp0zsV2i7i_NXIamWZ_5V69II5JjbPyTnM3cd-dRjPlI.-OZX47q5cidLZW2PGtQmdA"
//    return  "apdtok=eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0.3GJXeHFi_RKCskoP58QOR-GNlJITQS2HuFkUHbZ5hvHtxZ8IfA5FIw.dyIy_rwz6fQGwkZlz9z32g.1S5Fw38RAnAQJDnd7ZqoHTexAtVgqByuNTt3FaUI_UKB-ukPg0G6TqIDWa4uuZLBnVwlpci_17vPwdIRqcc5Bk3lTLsBMMnfwuWtv_Dxfqx7rSWiioSROgTwLmPEiYeIde6J9rFWYpfj07I5vmPeSOOWUn71mMNezmcFZWvQc6M.FQgGtlC2gn-OCT-p1uaAbw"
//    return '';
}

function getTokenDiff() {
  return  "apdtok=eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0.mjCmSGzzUBYZRaTfjCmhRgI3DiKQFWfgMqWR9_xobgXIUh_z8o3EmA.0mmH0xF7DaavC-wR3F80Vw.EyvIrmG0_wBRm_ZgvPF1k-udJi1YK1m-FYfOCxmERYPhhTDv2GtfrpTmHG-7vSr8NqsM0Khv8AGbLT_vDTnzeVseGPVBwwrKyEWY7jB2U3vLadFOKwJA191axyIoAA8mp0zsV2i7i_NXIamWZ_5V69II5JjbPyTnM3cd-dRjPlI.-OZX47q5cidLZW2PGtQmdA"
}
//var urlGl = "https://app.apdvoice.com/";
var urlGl = "http://localhost:8080/apd1/";
//var urlGl = ""


function initJSON() {
    var json = {kv: {}};
    try {
        json.kv.cookie = getToken();
    } catch (err) {
    }
    return json;
}