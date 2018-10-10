'use strict'
/** http-request.js - Small module for sending http requests
 * 
 * @author: Russell Estes estex198@gmail.com
 */

const https = require('https');
const url = require('url');

var makeHttpsRequest = {
    
    get: function getRequest(urlStr, auth, callback) {
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
                    response.setEncoding('utf8');
                
                    let body = '';
                
                    response.on('data', function (chunk) {
                        body = body + chunk;
                    });
                
                    response.on('end',function(){
                        callback(error, body, response);
                    }); // end response.on('end')
                
                }); // end req = https.request()
            
                req.on('error', function (e) {
                    error = 'Something went wrong while attempting to retrieve data from server';
                });
            
                // write data to request body
                req.end();
            }
        } catch (err) {
            // do not pass err to error!
            console.log(err);
            error = 'Something went wrong while attempting to retrieve data from server';
        } finally {
            if (options.headers['authorization']) delete options.headers['authorization'];
            callback(error, null, null);
        }

    }   // end getRequest()
}

module.exports = makeHttpsRequest;
