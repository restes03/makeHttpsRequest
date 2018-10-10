# makeHttpsRequest
0 dependency https request library 

const makeHttpsRequest = require('../http-request.js');


makeHttpsRequest.get(url, auth, function(error, data, response) {
            
  if (error) // data && response are null

  else if (data && response) {
      // data = buffered response body
      // response = raw response object
      }

})
