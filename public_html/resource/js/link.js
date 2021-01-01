/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function getToken() {
    return  "apdtok=eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0.ea3NSEIJJz7zanAVRItYHg1P32UHn9Ala2kpyimhNsiIKJyQXiWfbQ.EDzE-0AzMVfRJfESkbiapA.qPRbVwx6kKmrINZOEoYM2mloL6jYYrRDzWTjIcBrMmu7TSICfg1X6hH2vTQxjjM8-9KZiolQLByKtjcaw47jlG2p_oZjJhVfcnS4TY6vMOKHsoCcszmUhTNjGrCNkg_wVZSa9OlNkwEd0_xdEMUh4Id5fdKvSpklJ0l42AINiPY.iF1aaWc-yXgPY0itoY96Ug"
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