$(document).ready(function(){

	// Load Scores from database

	$.get("databasetalker.php", function(data){
		$(".highScores").html(data);
	});

	// Play the game

	$("form").submit(function(){

		var username = $('form').find('input[name="username"]').val();

		// Check that the name pulled from the form isn't blank

	    if(username != ""){
	    	
	    	// Load the game if the name isn't blank.

	    	window.location.href = "http://localhost:80/gamepage?username=" + username;
	    	event.preventDefault();

	    }else{

	    	// Otherwise show the warning message.

	    	$('.warning').html('<b>Please put in a username</b>');
	    	event.preventDefault();
	    }

	});

});