'use strict'
/** http-request.js - Small module for sending http requests
 * 
 * @author: Russell Estes estex198@gmail.com
 */

const https = require('https');
const url = require('url');

var makeHttpsRequest = {
    
    get: function getRequest(urlStr, auth, logit, callback) {
        let options = {};
        let error = '';
        try {
            

            if (urlStr != undefined) {
                const urlQuery = url.parse(urlStr);
                options = {
                    hostname: urlQuery.hostname,
                    protocol: urlQuery.protocol,
                    port: urlQuery.port || 443,
                    path: urlQuery.path,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    rejectUnauthorized: false
                };
                if (auth) options.headers['authorization'] = auth;




                let req = https.request(options, function (response) {
                    if (logit) console.log('Sending request ---> ' + urlStr);
                    response.setEncoding('utf8');
                
                    let body = '';
                
                    response.on('data', function (chunk) {
                        body = body + chunk;
                    });
                
                    response.on('end',function(){
                        if (logit) console.log(response.statusCode);
                        callback(error, body, response);
                    }); // end response.on('end')
                
                }); // end req = https.request()
            


                req.on('error', function (err) {
                    if (err.code === "ECONNRESET") {
                        console.log("Connection timed out while attempting to retrieve data from:" + urlStr);
                        //specific error treatment
                    }
                    else {
                        error = 'Error: ' + err.code + '\nUnable to retrieve data from:' + urlStr;
                        console.log()
                    }
                    
                });
            
                // write data to request body
                req.end();
            }
        } catch (err) {
            // do not pass err to error!
            console.log(err);
            error = 'Something went wrong while attempting to retrieve data from server';
            callback(error, null, null);
        } finally {
            if (options.headers['authorization']) delete options.headers['authorization'];
            
        }

    }   // end getRequest()
}

module.exports = makeHttpsRequest;
