$(document).ready(function(){

	// When the page loads.. pull the username from the Url

	var usernameVal = location.search.split('username=')[1];
	$('.username').html(usernameVal);

	// Start the game timer automatically

	var secondsVal = 0;
	var timeSetter = setInterval(timer, 1000);

	// Timer starts at 0 and tracks how many seconds the player is taking

	function timer(){

		$('.timer').html("Timer: " + secondsVal);
		secondsVal += 1;
	}

	// Anytime a user submits a letter, run the makeGuess function

	$("form").submit(function(){

		var letter = $('form').find('input[name="letter"]').val();

		$('form').find('input[name="letter"]').val("");
		
		event.preventDefault();
		// Stops the form submitting and reloading the page

		makeGuess(letter);		
	});

	var guessLimit = 7;
	var guessCount = 0;
	var guessedCharacters = [];
	var randomWord = ['S','E','C','R','E','T'];
	var secretWord = ['_','_','_','_','_','_'];;

	$('.secretword').html("Secret word: " + secretWord);

	function makeGuess(letter){

		letter = letter.toUpperCase();

		// First check if the player has enough guesses left

		if(guessCount >= guessLimit){
			alert("Out of tries, you lost...");
	    	window.location.href = "http://localhost:80/index";
	    	event.preventDefault();
		}

		// Check if the letter is in the word

		var rightletter = checkLetter(randomWord,letter);

		if(rightletter){
			
			// If the letter is in the word, update the secretWord with the right letter

			for (var i = 0; i < randomWord.length; i++) {
			
				if(randomWord[i] == letter){
					secretWord[i] = letter;					
				}
			}

			// Use jQuery to update the secret word seemlessly on the webpage

			$('.secretword').html("Secret word: " + secretWord);
		}
		else{

			// Otherwise do nothing, bad guess, lose a try/guess

			guessCount += 1;
		}		

		// Either way, add the guessed letter to our guessCharacters array

		guessedCharacters.push(letter);

		// Update tries counter in the webpage
		// Update guessed letters in the webpage

		$('.tries').html("Tries:  " + guessCount + "/" + guessLimit);
		$('.guessedletters').html("Guessed Letters:  " + guessedCharacters);

		// Check if the player has won

		if(checkIfWon(secretWord,randomWord)){
		
			alert("You won!");

			// Push the score and username to the database

			$.get( "databasetalker.php", { 
				username : usernameVal ,
				seconds : secondsVal });

			window.location.href = "http://localhost:80/index";
	    	event.preventDefault();
		}
	}

	function checkIfWon(secretWord, randomWord){

		// Check if the whole word has been revealed

		for (var i = 0; i < secretWord.length; i++) {

			if(secretWord[i] != randomWord[i]){
			
				// If any of the letters don't match the word hasn't been revealed yet

				return false;			
			}
		}

		// If all the letters match, game is won/over, return true

		return true;
	}

	function checkLetter(randomWord, letter){

		if (randomWord.indexOf(letter) > -1)
		    return true;
		else
			return false;

		// If the word contains the letter, return true.
	}

});