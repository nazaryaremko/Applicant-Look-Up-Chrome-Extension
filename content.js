let workIDdata;    
fetch("https://sheets.googleapis.com/v4/spreadsheets/API_key/values/Sheet1!A:A?key=&majorDimension=COLUMNS").then(
        function(u){ return u.json();}
      ).then(
        function(json){
          workIDdata = json;
        }
      )

let candIDdata;    
    fetch("https://sheets.googleapis.com/v4/spreadsheets/API_key/values/Sheet1!F:F?key=&majorDimension=COLUMNS").then(
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
            'Cookie': //Cookies 
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
            'Cookie': 
        }
    }).then(response => response.text())
    .then(data => {
      console.log(data.indexOf('<div class="no_results--header">No results found</div>'));
    })
    .catch((error) => {
      console.error(error);
    });

*/
