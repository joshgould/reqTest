Parse.Cloud.define("count", function(request, response) {
  	var Message = Parse.Object.extend("Message");
	var query = new Parse.Query(Message);
	console.log("val " +request.params.fieldVal);
	console.log("name " +request.params.fieldName);
	
	query.equalTo(request.params.fieldName,request.params.fieldVal);
	query.count({
	  success: function(count) {
  		console.log("count of " +request.params.fieldVal + " for " + request.params.fieldName + " is: " + JSON.stringify(count));
	 	response.success(count);
	  },
	  error: function(error) {
	    // The request failed
	  }
	});
});


Parse.Cloud.define("read", function(request, response) {
  	var Message = Parse.Object.extend("Message");
	var query = new Parse.Query(Message);
	query.select("idx","firstName","lastName","eyeColor");
	query.find({    
	success: function(results) {
		response.success(results);
    },
    error: function() {
      response.error("message lookup failed");
    }
	
  });
});

Parse.Cloud.define("saveList", function(request, response) {
    var messageList = new Array();

    for (var i=0; i<request.params.list.length; i++) {
        var Message = Parse.Object.extend("Message");
        var message = new Message();		
        var content = request.params.list[i];

		console.log("content is: " + JSON.stringify(content));
		message.set("firstName",content.firstName);   
		message.set("lastName",content.lastName);   
		message.set("eyeColor",content.eyeColor);   
		message.set("idx",content.id);   
		messageList[i]=message; //add another item to list
	}

    Parse.Object.saveAll(messageList,{
    success: function(list) {
      // All the objects were saved.
      response.success("ok");  //saveAll is now finished and we can properly exit with confidence :-)
    },
    error: function(error) {
      // An error occurred while saving one of the objects.
      response.error("failure on saving list " + JSON.stringify(error));
    },
  });
});





