let workIDdata;    
fetch("https://sheets.googleapis.com/v4/spreadsheets/1mtiU4mxa1y9RKBWINphOA29YCdswqwU4Et70w6_Ngzg/values/Sheet1!A:A?key=AIzaSyBMNs50J7ltAZGeDIImRf5qsj7oaC8pZhU&majorDimension=COLUMNS").then(
        function(u){ return u.json();}
      ).then(
        function(json){
          workIDdata = json;
        }
      )

let candIDdata;    
    fetch("https://sheets.googleapis.com/v4/spreadsheets/1mtiU4mxa1y9RKBWINphOA29YCdswqwU4Et70w6_Ngzg/values/Sheet1!F:F?key=AIzaSyBMNs50J7ltAZGeDIImRf5qsj7oaC8pZhU&majorDimension=COLUMNS").then(
            function(u){ return u.json();}
          ).then(
            function(json){
              candIDdata = json;
            }
          )


function getDifference(a, b)
      {
          var i = 0;
          var j = 0;
          var result = "";
  
          while (j < b.length)
          {
           if (a[i] != b[j] || i == a.length)
               result += b[j];
           else
               i++;
           j++;
          }
          return result;
      }

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // I used the class of the LinkedIn name html object to return the name of the person
    var name_f = document.getElementsByClassName("add-top-xs")[0].innerHTML.trim().split(' ').slice(0,2).join(' ');

    var pat_b = document.getElementsByClassName("nowrap")[0].innerHTML.trim();
    var name = (name_f + " " + pat_b).replace(/\s\s+/g, ' ');

    var startUrl = 'https://app2.greenhouse.io/people/';
    var workID = window.location.href.substr(28,7);
    var workIDindex = workIDdata['values'][0].indexOf(workID);
    var candID = candIDdata['values'][0][workIDindex];
    var Url = startUrl + candID;

    if (workIDindex === -1) {
      sendResponse({name: "This applicant's work ID is not in the databse"});
    } else if (workIDindex !== -1 && candID === 'undefined') {
      sendResponse({name: "This applicant's work ID is in the database but there is no candidate ID"});
    } else if (workIDindex !== -1 && candID !== 'undefined') {
      sendResponse({name: "The applicant is successfully found: here is the link:" + Url});
    } else {
      sendResponse({name: 'Something went wrong'});
    }

    //node.js request testing
    var fetch = require('node-fetch');

    fetch('https://app2.greenhouse.io/plans/4884435002/candidates?sort=last_activity+desc&type=all&full_text=1&job_status=all&search_terms=169927', {
        credentials: "include",
        headers: {
            'Cookie': '_ga=GA1.2.1681067373.1610348711; _hp2_props.1808403365=%7B%22user_type%22%3A%22site_admin%22%7D; __zlcmid=rxiBPvz6SgVMGw; inform_cookies=false; optimizelyEndUserId=oeu1610613205499r0.9673165147078173; _biz_uid=4bd1d2f0001d44ada74cf188dc4f82c8; cb_user_id=null; cb_group_id=null; cb_anonymous_id=%226fc62ee0-80bf-4a8d-8069-51da266dbba8%22; _fbp=fb.1.1610613207206.2022994153; _mkto_trk=id:750-ISS-976&token:_mch-greenhouse.io-1610613207220-71479; _biz_flagsA=%7B%22Version%22%3A1%2C%22ViewThrough%22%3A%221%22%2C%22XDomain%22%3A%221%22%7D; _biz_ABTestA=%5B1766166138%5D; ajs_anonymous_id=%22f0857090-dba8-41f1-86a3-0e0684f298f7%22; BE_CLA3=p_id%3Dundefined%26bf%3Dundefined%26bn%3DNaN%26bv%3D3.43%26s_expire%3D1610808439196%26s_id%3Dundefined; _biz_nA=38; _biz_pendingA=%5B%5D; __utmz=44269810.1623825356.603.14.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); _hp2_id.1168016336=%7B%22userId%22%3A%224675183419934657%22%2C%22pageviewId%22%3A%228787872588124759%22%2C%22sessionId%22%3A%221017743627510053%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; destination=Sunflower; gh_tz=Europe/Helsinki; __utmc=44269810; home_silo_id=2; _session_id=3fdfa897e947e165f586e12892ddfe40; _slvddv=true; _hp2_ses_props.1808403365=%7B%22ts%22%3A1625559711278%2C%22d%22%3A%22app2.greenhouse.io%22%2C%22h%22%3A%22%2Freport_builder%2Freport%22%7D; _sp_ses.a37a=*; __utma=44269810.1681067373.1610348711.1625556146.1625559715.667; _slvs=5e0fd677-8a0e-4fc7-8989-55d0e13ce115; __utmt=1; rv_content=%7B%22candidates%22%3A%5B%7B%22name%22%3A%22%D0%AF%D0%BD%D0%B0%20%D0%92%D0%B5%D1%80%D1%82%D1%8E%D1%85%22%2C%22job%22%3A%22%D0%A5%D1%83%D0%B4%D0%BE%D0%B6%D0%BD%D0%B8%D0%BA%22%2C%22url%22%3A%22%2Fpeople%2F85673881002%22%7D%2C%7B%22name%22%3A%22Gladys%20Zubairu%22%2C%22job%22%3A%22Customer%20support%20representative%22%2C%22url%22%3A%22%2Fpeople%2F68219408002%22%7D%2C%7B%22name%22%3A%22%D0%A1%D0%B5%D1%80%D0%B3%D1%96%D0%B9%20%D0%AF%D1%86%D0%B5%D0%BD%D0%BA%D0%BE%22%2C%22job%22%3A%22%D0%91%D1%83%D1%85%D0%B3%D0%B0%D0%BB%D1%82%D0%B5%D1%80%2C%20%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D0%BD%D0%B8%D0%BA%20%D0%B1%D1%83%D1%85%D0%B3%D0%B0%D0%BB%D1%82%D0%B5%D1%80%D0%B0%22%2C%22url%22%3A%22%2Fpeople%2F70320809002%22%7D%2C%7B%22name%22%3A%22%D0%A1%D0%B5%D1%80%D0%B3%D1%96%D0%B9%20%D0%AF%D1%86%D0%B5%D0%BD%D0%BA%D0%BE%22%2C%22job%22%3A%22%D0%9C%D0%B5%D0%BD%D0%B5%D0%B4%D0%B6%D0%B5%D1%80%20%D0%B7%20%D0%BF%D0%BE%D1%81%D1%82%D0%B0%D1%87%D0%B0%D0%BD%D0%BD%D1%8F%22%2C%22url%22%3A%22%2Fpeople%2F71897504002%22%7D%2C%7B%22name%22%3A%22Oleh%20Salamakha%22%2C%22job%22%3A%22Android-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA%22%2C%22url%22%3A%22%2Fpeople%2F66181165002%22%7D%2C%7B%22name%22%3A%22%D0%98%D0%BD%D0%BD%D0%B0%20%D0%91%D0%BE%D0%B3%D0%B4%D0%B0%D0%BD%22%2C%22job%22%3A%22%D0%90%D0%B4%D0%BC%D0%B8%D0%BD%D0%B8%D1%81%D1%82%D1%80%D0%B0%D1%82%D0%BE%D1%80%2C%20%D0%BC%D0%B5%D0%BD%D0%B5%D0%B4%D0%B6%D0%B5%D1%80%22%2C%22url%22%3A%22%2Fpeople%2F63039064002%22%7D%2C%7B%22name%22%3A%22%D0%86%D1%80%D0%B8%D0%BD%D0%B0%20%D0%9F%D0%BB%D1%8F%D1%88%D0%BA%D0%BE%22%2C%22job%22%3A%22%D0%A1%D0%B5%D0%BA%D1%80%D0%B5%D1%82%D0%B0%D1%80%2C%20%D0%BF%D0%BE%D0%BC%D1%96%D1%87%D0%BD%D0%B8%D0%BA%20%D0%BA%D0%B5%D1%80%D1%96%D0%B2%D0%BD%D0%B8%D0%BA%D0%B0%22%2C%22url%22%3A%22%2Fpeople%2F71857805002%22%7D%2C%7B%22name%22%3A%22%D0%90%D1%80%D1%82%D0%B5%D0%BC%20%D0%94%D0%B5%D0%BC%D1%87%D0%B5%D0%BD%D0%BA%D0%BE%22%2C%22job%22%3A%22%22%2C%22url%22%3A%22%2Fpeople%2F70240000002%22%7D%2C%7B%22name%22%3A%22Amit%20Singh%22%2C%22job%22%3A%22%22%2C%22url%22%3A%22%2Fpeople%2F46206269002%22%7D%2C%7B%22name%22%3A%22Trofim%20Prodayvoda%22%2C%22job%22%3A%22%22%2C%22url%22%3A%22%2Fpeople%2F28441594002%22%7D%5D%2C%22jobs%22%3A%5B%7B%22name%22%3A%22%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20Ring%20%2F%20Embedded%2F%20All_Locations%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%22%2C%22location%22%3A%22%22%2C%22url%22%3A%22%2Fsdash%2F4107629002%22%7D%2C%7B%22name%22%3A%22%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20Junior%20Reinsurance%20Broker-AON-06%2F2021%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%22%2C%22location%22%3A%22%22%2C%22url%22%3A%22%2Fsdash%2F4891507002%22%7D%2C%7B%22name%22%3A%22%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20Customer%20Support%20-%20650%20Health%20-%2006%2F21%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%22%2C%22location%22%3A%22%22%2C%22url%22%3A%22%2Fsdash%2F4903542002%22%7D%5D%7D; _sp_id.a37a=1bed1403-6fac-4b43-8e98-cdd924709317.1610348711.663.1625565357.1625556259.e5de7279-c881-4882-bd7c-e9ebce6b2bfe; __utmb=44269810.47.10.1625559715; _hp2_id.1808403365=%7B%22userId%22%3A%225809675629537463%22%2C%22pageviewId%22%3A%227380679824654050%22%2C%22sessionId%22%3A%228523094230968001%22%2C%22identity%22%3A%224208344002%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _dd_s=rum=1&id=26f26f1e-fdb5-40c6-a019-ed4a24e24392&created=1625565333097&expire=1625566280859&logs=1'
        }
    }).then(response => response.text())
    .then(data => {
      console.log(data.indexOf('<div class="no_results--header">No results found</div>'));
    })
    .catch((error) => {
      console.error(error);
    });
  });
 
    
  
    

    

/*

Testing fetching data with cookies 

fetch('https://app2.greenhouse.io/plans/4884435002/candidates?sort=last_activity+desc&type=all&full_text=1&job_status=all&search_terms=169927', {
        credentials: "include",
        headers: {
            'Cookie': '_ga=GA1.2.1681067373.1610348711; _hp2_props.1808403365=%7B%22user_type%22%3A%22site_admin%22%7D; __zlcmid=rxiBPvz6SgVMGw; inform_cookies=false; optimizelyEndUserId=oeu1610613205499r0.9673165147078173; _biz_uid=4bd1d2f0001d44ada74cf188dc4f82c8; cb_user_id=null; cb_group_id=null; cb_anonymous_id=%226fc62ee0-80bf-4a8d-8069-51da266dbba8%22; _fbp=fb.1.1610613207206.2022994153; _mkto_trk=id:750-ISS-976&token:_mch-greenhouse.io-1610613207220-71479; _biz_flagsA=%7B%22Version%22%3A1%2C%22ViewThrough%22%3A%221%22%2C%22XDomain%22%3A%221%22%7D; _biz_ABTestA=%5B1766166138%5D; ajs_anonymous_id=%22f0857090-dba8-41f1-86a3-0e0684f298f7%22; BE_CLA3=p_id%3Dundefined%26bf%3Dundefined%26bn%3DNaN%26bv%3D3.43%26s_expire%3D1610808439196%26s_id%3Dundefined; _biz_nA=38; _biz_pendingA=%5B%5D; __utmz=44269810.1623825356.603.14.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); _hp2_id.1168016336=%7B%22userId%22%3A%224675183419934657%22%2C%22pageviewId%22%3A%228787872588124759%22%2C%22sessionId%22%3A%221017743627510053%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; destination=Sunflower; gh_tz=Europe/Helsinki; __utmc=44269810; home_silo_id=2; _session_id=3fdfa897e947e165f586e12892ddfe40; _slvddv=true; _hp2_ses_props.1808403365=%7B%22ts%22%3A1625559711278%2C%22d%22%3A%22app2.greenhouse.io%22%2C%22h%22%3A%22%2Freport_builder%2Freport%22%7D; _sp_ses.a37a=*; __utma=44269810.1681067373.1610348711.1625556146.1625559715.667; _slvs=5e0fd677-8a0e-4fc7-8989-55d0e13ce115; __utmt=1; rv_content=%7B%22candidates%22%3A%5B%7B%22name%22%3A%22%D0%AF%D0%BD%D0%B0%20%D0%92%D0%B5%D1%80%D1%82%D1%8E%D1%85%22%2C%22job%22%3A%22%D0%A5%D1%83%D0%B4%D0%BE%D0%B6%D0%BD%D0%B8%D0%BA%22%2C%22url%22%3A%22%2Fpeople%2F85673881002%22%7D%2C%7B%22name%22%3A%22Gladys%20Zubairu%22%2C%22job%22%3A%22Customer%20support%20representative%22%2C%22url%22%3A%22%2Fpeople%2F68219408002%22%7D%2C%7B%22name%22%3A%22%D0%A1%D0%B5%D1%80%D0%B3%D1%96%D0%B9%20%D0%AF%D1%86%D0%B5%D0%BD%D0%BA%D0%BE%22%2C%22job%22%3A%22%D0%91%D1%83%D1%85%D0%B3%D0%B0%D0%BB%D1%82%D0%B5%D1%80%2C%20%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D0%BD%D0%B8%D0%BA%20%D0%B1%D1%83%D1%85%D0%B3%D0%B0%D0%BB%D1%82%D0%B5%D1%80%D0%B0%22%2C%22url%22%3A%22%2Fpeople%2F70320809002%22%7D%2C%7B%22name%22%3A%22%D0%A1%D0%B5%D1%80%D0%B3%D1%96%D0%B9%20%D0%AF%D1%86%D0%B5%D0%BD%D0%BA%D0%BE%22%2C%22job%22%3A%22%D0%9C%D0%B5%D0%BD%D0%B5%D0%B4%D0%B6%D0%B5%D1%80%20%D0%B7%20%D0%BF%D0%BE%D1%81%D1%82%D0%B0%D1%87%D0%B0%D0%BD%D0%BD%D1%8F%22%2C%22url%22%3A%22%2Fpeople%2F71897504002%22%7D%2C%7B%22name%22%3A%22Oleh%20Salamakha%22%2C%22job%22%3A%22Android-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA%22%2C%22url%22%3A%22%2Fpeople%2F66181165002%22%7D%2C%7B%22name%22%3A%22%D0%98%D0%BD%D0%BD%D0%B0%20%D0%91%D0%BE%D0%B3%D0%B4%D0%B0%D0%BD%22%2C%22job%22%3A%22%D0%90%D0%B4%D0%BC%D0%B8%D0%BD%D0%B8%D1%81%D1%82%D1%80%D0%B0%D1%82%D0%BE%D1%80%2C%20%D0%BC%D0%B5%D0%BD%D0%B5%D0%B4%D0%B6%D0%B5%D1%80%22%2C%22url%22%3A%22%2Fpeople%2F63039064002%22%7D%2C%7B%22name%22%3A%22%D0%86%D1%80%D0%B8%D0%BD%D0%B0%20%D0%9F%D0%BB%D1%8F%D1%88%D0%BA%D0%BE%22%2C%22job%22%3A%22%D0%A1%D0%B5%D0%BA%D1%80%D0%B5%D1%82%D0%B0%D1%80%2C%20%D0%BF%D0%BE%D0%BC%D1%96%D1%87%D0%BD%D0%B8%D0%BA%20%D0%BA%D0%B5%D1%80%D1%96%D0%B2%D0%BD%D0%B8%D0%BA%D0%B0%22%2C%22url%22%3A%22%2Fpeople%2F71857805002%22%7D%2C%7B%22name%22%3A%22%D0%90%D1%80%D1%82%D0%B5%D0%BC%20%D0%94%D0%B5%D0%BC%D1%87%D0%B5%D0%BD%D0%BA%D0%BE%22%2C%22job%22%3A%22%22%2C%22url%22%3A%22%2Fpeople%2F70240000002%22%7D%2C%7B%22name%22%3A%22Amit%20Singh%22%2C%22job%22%3A%22%22%2C%22url%22%3A%22%2Fpeople%2F46206269002%22%7D%2C%7B%22name%22%3A%22Trofim%20Prodayvoda%22%2C%22job%22%3A%22%22%2C%22url%22%3A%22%2Fpeople%2F28441594002%22%7D%5D%2C%22jobs%22%3A%5B%7B%22name%22%3A%22%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20Ring%20%2F%20Embedded%2F%20All_Locations%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%22%2C%22location%22%3A%22%22%2C%22url%22%3A%22%2Fsdash%2F4107629002%22%7D%2C%7B%22name%22%3A%22%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20Junior%20Reinsurance%20Broker-AON-06%2F2021%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%22%2C%22location%22%3A%22%22%2C%22url%22%3A%22%2Fsdash%2F4891507002%22%7D%2C%7B%22name%22%3A%22%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20Customer%20Support%20-%20650%20Health%20-%2006%2F21%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%22%2C%22location%22%3A%22%22%2C%22url%22%3A%22%2Fsdash%2F4903542002%22%7D%5D%7D; _sp_id.a37a=1bed1403-6fac-4b43-8e98-cdd924709317.1610348711.663.1625565357.1625556259.e5de7279-c881-4882-bd7c-e9ebce6b2bfe; __utmb=44269810.47.10.1625559715; _hp2_id.1808403365=%7B%22userId%22%3A%225809675629537463%22%2C%22pageviewId%22%3A%227380679824654050%22%2C%22sessionId%22%3A%228523094230968001%22%2C%22identity%22%3A%224208344002%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _dd_s=rum=1&id=26f26f1e-fdb5-40c6-a019-ed4a24e24392&created=1625565333097&expire=1625566280859&logs=1'
        }
    }).then(response => response.text())
    .then(data => {
      console.log(data.indexOf('<div class="no_results--header">No results found</div>'));
    })
    .catch((error) => {
      console.error(error);
    });

*/
