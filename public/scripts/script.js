$(document).ready(function(){  
	$content = $('#content');
	$messages = $('#messages');
	var fields = ['firstName','lastName','eyeColor'];
	var firstName = ['Josh', 'Jan', 'Josie', 'Jacob'];
	var lastName = ['Gould', 'Tai', 'Jones', 'Smith'];
	var eyeColor = ['blue', 'brown', 'hazel', 'light brown'];
	
	function Person(id,firstName,lastName,eyeColor) {
      this.id = id;	 
	  this.firstName = firstName;
	  this.lastName = lastName;
	  this.eyeColor = eyeColor;
  	}
	
	function random(list) {
		var i = Math.floor(Math.random() * 4);
		return (list[i]);
	}
	
	function createArr(x) {
		var arr = [];
		for (var i=0; i<x; i++) {
			var fname = random(firstName);
			var lname = random(lastName);
			var color = random(eyeColor);
			var person = new Person(i,fname,lname,color);
			arr.push(person);
		}
		return arr;
	}
		
	function saveMsg() {		
		var arr = createArr(10);
	//	console.log("arr is: " + JSON.stringify(arr));

		var promise = Parse.Cloud.run('saveList', {list:arr}, {
			success: function(msg) {
				console.log("save msg sucess: " + msg);
	     	},
			error: function(error) {
				console.log("writeMsg error " + JSON.stringify(error));
			}
		});
		return promise;
	}	
	
	
	
	function displayCounts() {
		console.log("Getting Counts");
		$.each(fields, function(idx){
			var fieldStr = fields[idx];
			var fieldList = eval(fieldStr);

			$.each(fieldList, function(index){
			console.log("fieldName: " + fieldStr + ". fields: " + fieldList);
			console.log("field at index: " + index + ": " + fieldList[index]);
			Parse.Cloud.run('count', {fieldName:fieldStr, fieldVal:fieldList[index]}, {
			 				success: function(count) {
			 					$content.append("<p>" + fieldList[index] + " counts:" + count + "</p>");
			 				},
			 				error: function(error) {
			 					console.log("displayAll error " + error);
			 				}
			 				});

			});
		});
				
	}	
	
	function displayMsg() {
		console.log("Reading and displaying messages");
		
		Parse.Cloud.run('read', {}, {
			success: function(msg) {
				//console.log("# messages:" + msg.length);
				//console.log("msg:" + JSON.stringify(msg));
				
				$.each(msg, function(index){
		    		$messages.append("<p>" + msg[index].get("idx")  + ": "+ msg[index].get("firstName") + " " + msg[index].get("lastName") + ",Eye Color: " + msg[index].get("eyeColor") + ".</p>"); 
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
		
	Parse.Promise.when(saveMsg()).done(function() {
	    displayCounts();
		displayMsg();
		console.log('success');
	});
		
});
