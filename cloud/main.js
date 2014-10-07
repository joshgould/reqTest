
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:

//require('cloud/app.js');


Parse.Cloud.define("getMsg", function(request, response) {
  response.success("foo");
});


Parse.Cloud.define("read", function(request, response) {
  	var query = new Parse.Query("Message");
	query.select("content");
	query.find({
    success: function(results) {
		response.success(results);
    },
    error: function() {
      response.error("message lookup failed");
    }
  });
});





