$(document).ready(function(){  
	$content = $('#content');
	$messages = $('#messages');
	var count = 0;
	
	function save(msg) {
		var Message = Parse.Object.extend("Message");
		var message = new Message();
		message.save({content: msg}).then(function(object) {
		  	console.log("message saved");
		});
	}
	
	function saveMsg() {
		var arr = ["0","1","2","3","4","5","6","7","8","9"]
		console.log("arr length: " + arr.length);
		$.each(arr, function(index){
				Parse.Cloud.run('getMsg', {}, {
				success: function(msg) {
					save(msg+ ":" + index);
		     	},   
				error: function(error) {
					console.log("writeMsg error " + JSON.stringify(error));
				}
			})
		});
	}	
	
	function displayMsg() {
		console.log("Reading and displaying messages");
		Parse.Cloud.run('read', {}, {
			success: function(msg) {
				console.log("# messages:" + msg.length);
				$.each(msg, function(index){
		    		$messages.append("<p>" + index + "</p>"); 
			});			
			},
			error: function(error) {
				console.log("displayAll error " + error);
			}
		});
	}

	// Initialize Parse with your Parse application javascript keys
	 Parse.initialize("idhQyKbKtbEjLeVwbBXiblxig5aPrLcxjVq5Z4mV",
                 "wV4RAehtUgibr876dY9dhsHRC6xQYnBLnqrUOVW3");

	$content.empty();
	$messages.empty();
	
	$.when(saveMsg())
	  .done(function() {
		 console.log( 'success' );
	     displayMsg();
	  })
	  .fail(function() {
	    console.log( 'fail' );
	  });
	
	
});
