<?php

	$servername = "localhost";
	$uname = "root";
	$password = "";
	$dbname = "playerscores_db";

	// Database variables

	if (isset($_GET['username']) && isset($_GET['seconds'])){

		// If a username & seconds variable is passed do this...

		$username = $_GET['username'];
		$seconds = $_GET['seconds'];

		// Connect to the database
        
        $conn = new mysqli($servername, $uname, $password, $dbname);

		if ($conn->connect_error){
		    die("Connection failed: " . $conn->connect_error);
		} 

		// Build the query

		$sql = "INSERT INTO scores (username,seconds) VALUES ('" . $username . "','" . $seconds . "')";
	
		// Execute the query

		$result = $conn->query($sql);	

		// Release the connection

		$conn->close();

    }else{

    	// Connect to the database

    	$conn = new mysqli($servername, $uname, $password, $dbname);

		if($conn->connect_error){
		    die("Connection failed: " . $conn->connect_error);
		} 

		// Build the query

		$sql = "SELECT username, seconds FROM scores ORDER BY seconds ASC";
		
		// Execute the query

		$result = $conn->query($sql);

		// If there is more then 0 results, print/echo the highscore back

		if($result->num_rows > 0){
		    
		    while($row = $result->fetch_assoc()){
		        echo $row["username"]. " - Score [" . $row["seconds"] . "]</p>";
		    }

		}	

		// Release the connection

		$conn->close();
    }	

?>