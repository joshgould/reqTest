
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:

//require('cloud/app.js');


Parse.Cloud.define("getMsg", function(request, response) {
  response.success("foo");
});


Parse.Cloud.define("read", function(request, response) {
  	var query = new Parse.Query("DataClass");
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


Parse.Cloud.define("ingestList", function(request, response) {
    //take in JSON with dict

    var newts = new Array();

    for (var i=0; i<request.params.datalist.length; i++) {
        //add these entries to db
        var DataClass = Parse.Object.extend("DataClass");
        var newuser = new DataClass();

        var origdata = request.params.datalist[i];
        
		newuser.set("content","baz:" + origdata);
   
        newts[i]=newuser; //add another item to list        

        }

    Parse.Object.saveAll(newts,{
    success: function(list) {
      // All the objects were saved.
      response.success("ok " );  //saveAll is now finished and we can properly exit with confidence :-)
    },
    error: function(error) {
      // An error occurred while saving one of the objects.
      response.error("failure on saving list ");
    },
  });

//default body does not do  response.success or response.error 

});





