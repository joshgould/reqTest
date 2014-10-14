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

Parse.Cloud.define("saveList", function(request, response) {
    var messageList = new Array();

    for (var i=0; i<request.params.list.length; i++) {
        var Message = Parse.Object.extend("Message");
        var message = new Message();
        var content = request.params.list[i];
		message.set("content","bar:" + content);   
        messageList[i]=message; //add another item to list
	}

    Parse.Object.saveAll(messageList,{
    success: function(list) {
      // All the objects were saved.
      response.success("ok " );  //saveAll is now finished and we can properly exit with confidence :-)
    },
    error: function(error) {
      // An error occurred while saving one of the objects.
      response.error("failure on saving list ");
    },
  });
});





