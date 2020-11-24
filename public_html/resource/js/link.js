/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function getToken() {
    return  "apdtok=eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0.ea3NSEIJJz7zanAVRItYHg1P32UHn9Ala2kpyimhNsiIKJyQXiWfbQ.EDzE-0AzMVfRJfESkbiapA.qPRbVwx6kKmrINZOEoYM2mloL6jYYrRDzWTjIcBrMmu7TSICfg1X6hH2vTQxjjM8-9KZiolQLByKtjcaw47jlG2p_oZjJhVfcnS4TY6vMOKHsoCcszmUhTNjGrCNkg_wVZSa9OlNkwEd0_xdEMUh4Id5fdKvSpklJ0l42AINiPY.iF1aaWc-yXgPY0itoY96Ug"
//    return  "apdtok=eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0.3GJXeHFi_RKCskoP58QOR-GNlJITQS2HuFkUHbZ5hvHtxZ8IfA5FIw.dyIy_rwz6fQGwkZlz9z32g.1S5Fw38RAnAQJDnd7ZqoHTexAtVgqByuNTt3FaUI_UKB-ukPg0G6TqIDWa4uuZLBnVwlpci_17vPwdIRqcc5Bk3lTLsBMMnfwuWtv_Dxfqx7rSWiioSROgTwLmPEiYeIde6J9rFWYpfj07I5vmPeSOOWUn71mMNezmcFZWvQc6M.FQgGtlC2gn-OCT-p1uaAbw"
//    return '';
}

function getTokenDiff() {
    return  "apdtok=eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0.wegrk160_0vGAHJIBVXaDxBjwZsgywhE7o0fKfgDMpXRRyEMy4RO5g.9lFTrpK1ptbCeWEw7UUJHg.c1h-tQwjnQOvJ957d9Z-uf7NBnTzu9GpaBbIr4xIKIZS249Dr-H7XWMOJXcKCoEDG-pB2zLKJGb01UdnRKr1g-IR3zVpsLWeDcwtFh4tGEa0KjQCkGijSstBXECtrFsyk9ioUDLdAjjEQ47vwy-k1Wb4ZtttMbMah8HnyaY795w.f4ZX9XPaTlVO2ovlu6pX4w"

}
var urlGl = "https://app.apdvoice.com/";
//var urlGl = "http://localhost:8080/apd1/";
//var urlGl = ""


function initJSON() {
    var json = {kv: {}};
    try {
        json.kv.cookie = getToken();
    } catch (err) {
    }
    return json;
}