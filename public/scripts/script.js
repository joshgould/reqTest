$(document).ready(function(){  
	$content = $('#content');
	$messages = $('#messages');
	
	function save(msg) {
		var Message = Parse.Object.extend("Message");
		var message = new Message();
		message.save({content: msg});
	}
	
	function createArr(x) {
		var arr = [];
			for (var i=0; i<x; i++) {
						arr.push(i);
			} 
		
		return arr;
	}
		
	function saveMsg() {
		var arr = createArr(10);
		
		var promise = Parse.Cloud.run('ingestList', {datalist:arr}, {
	
			success: function(msg) {
				console.log("save msg sucess: " + msg);
		//		save(msg+ ":" + index);
	     	},   
			error: function(error) {
				console.log("writeMsg error " + JSON.stringify(error));
			}
		});
		
		
		// console.log("arr length: " + arr.length);
		// $.each(arr, function(index){
		// 	var promise = Parse.Cloud.run('getMsg', {}, {
		// 		success: function(msg) {
		// 			save(msg+ ":" + index);
		//      	},
		// 		error: function(error) {
		// 			console.log("writeMsg error " + JSON.stringify(error));
		// 		}
		// 	})
		// 	saves.push(promise);
		// });
		return promise;	
	}	
	
	function displayMsg() {
		console.log("Reading and displaying messages");
		Parse.Cloud.run('read', {}, {
			success: function(msg) {
				console.log("# messages:" + msg.length);
				$.each(msg, function(index){
		    		$messages.append("<p>" + msg[index].get("content") + "</p>"); 
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
	
	//var newsaves = saveMsg();
// console.log("saves length: " + newsaves.length);
		
	Parse.Promise.when(saveMsg()).done(function() {
	    displayMsg();
		console.log( 'success' );
	});
		
});
