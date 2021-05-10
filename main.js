// A map of playerName to an array of playerPER values
var playerMap = new Map();

// Variables to keep track of constants
const maxPlayersOnCourt = 5;
const numQuarters = 4;

// Variables to track state throughout the game
var currentQuarter = 0;
var playersOnCourt = 0;
var quarterInPlay = false;

// Variables to track PER throughout the game
var quarterPER = 0;
var quarterAvePER = 0;
var totalAvePER = 0;

// Function to read in all player stats.
function processPlayers(allPlayerStats) {
    // Split the data by newline into an array.
    var allPlayerStatLines = allPlayerStats.split(/\r\n|\n/);

    // Remove the header line (first line)
    allPlayerStatLines.shift();

    // Loop through the 15 players and create a map entry of player name to player PER
    for (var statLine of allPlayerStatLines) {
        // Get all individual stat values
        var stats = statLine.split(',');
        // If it's just an empty line, skip it
        if (!stats || stats.length <= 1) continue; // empty line

        // The second column has the player name
        var playerName = stats[nameIndex];

        // check if player exists in map
        if (!playerMap.has(playerName)) {
            // First time we see the player; Add them in!
            playerMap.set(playerName, []);
        }

        // Get per value for player
        var per = parseFloat(stats[perIndex]);

        // Add per value to player's array (the next quarter)
        playerMap.get(playerName).push(per);
    }

    // Add the players to the bench.
    displayPlayerBench();
}

// Function to add the players to the bench to start the game.
function displayPlayerBench() {
    // Get the bench div in which the players will be shown.
    var bench = document.getElementById('playersOnBench');

    // For each player, create a button. 
    for (let playerName of playerMap.keys()) {
        // Create a button for each player
        var newPlayer = document.createElement('button');

        // Set the ID to the name of the player so we can get it later
        newPlayer.id = playerName;

        // Identify the style class, which will set the color scheme
        newPlayer.className = 'playerButton';

        // When the button is clicked, call the movePlayer function
        newPlayer.onclick = movePlayer;
        
        // Add the players image to the button
        var playerImage = document.createElement('img');

        // Set the source (or location) of the image
        playerImage.src = 'images/'+playerName+'.png';

        // Add the image to the button
        newPlayer.appendChild(playerImage);

        // Add the button to the bench.
        bench.appendChild(newPlayer);
    }

    // Display cards for all players
    displayPlayerCards();
}

/*
<button id="Bugs Bunny" class ="playerButton" onclick="displayPlayerBench()"><img src ="./images/Bugs Bunny.png"></button>
          <button id="Daffy Duck" class ="playerButton" onclick="displayPlayerBench()"><img src ="./images/Daffy Duck.png"></button>
          <button id="Elmer Fudd" class ="playerButton" onclick="displayPlayerBench()"><img src ="./images/Elmer Fudd.png"></button>
          <button id="Foghorn Leghorn" class ="playerButton" onclick="displayPlayerBench()"><img src ="./images/Foghorn Leghorn.png"></button>
          <button id="Gossamer" class ="playerButton" onclick="displayPlayerBench()"><img src ="./images/Gossamer.png"></button>
          <button id="Granny" class ="playerButton" onclick="displayPlayerBench()"><img src ="./images/Granny.png"></button>
          <button id="Lola Bunny" class ="playerButton" onclick="displayPlayerBench()"><img src ="./images/Lola Bunny.png"></button>
          <button id="Marvin the Martian" class ="playerButton" onclick="displayPlayerBench()""><img src ="./images/Marvin the Martian.png"></button>
          <button id="Penelope" class ="playerButton" onclick="displayPlayerBench()"><img src ="./images/Penelope.png"></button>
          <button id="Porky Pig" class ="playerButton" onclick="displayPlayerBench()"><img src ="./images/Porky Pig.png"></button>
          <button id="Road Runner" class ="playerButton" onclick="displayPlayerBench()"><img src ="./images/Road Runner.png"></button>
          <button id="Sylvester" class ="playerButton" onclick ="displayPlayerBench()"><img src ="./images/Sylvester.png"></button>
          <button id="Tasmanian Devil" class ="playerButton" onclick ="displayPlayerBench()"><img src ="./images/Tasmanian Devil.png"></button>
          <button id="Tweety" class ="playerButton" onclick ="displayPlayerBench()"><img src ="./images/Tweety.png"></button>
          <button id="Wile E. Coyote" class ="playerButton" onclick ="displayPlayerBench()"><img src ="./images/Wile E. Coyote.png"></button>
          <button id="Yosemite Sam" class ="playerButton" onclick ="displayPlayerBench()"><img src ="./images/Yosemite Sam.png"></button>
          
*/
// This function is called at the beginning of the game play to initialize
// PER for each player, and at each quarter to do two things: 
// 1. Ensure the players currently on the court have the correct PER represented
// 2. Update the stats for each player for the current quarter
function displayPlayerCards() {
    // Get the div in which the stats will be shown.
    var playerCardDisplay = document.getElementById('playerCards');

    // For each player, create a player stat card to show the PER for that player for a 
    // specific quarter.
    for (let [playerName, playerStats] of playerMap.entries()) {
        // Create an overall div that will contain the player stat information.
        var playerCard = document.createElement('div');

        // Set an ID for the card so we can get it later
        playerCard.id = playerName + '_card';

        // Set the style class name
        playerCard.className = 'playerCard';

        // Add the player image to the div.
        var playerImage = document.createElement('img');

        // Set the style for the image
        playerImage.className = 'perCard';

        // Load the image
        playerImage.src = 'images/'+playerName+'.png';

        // Add the image to the card
        playerCard.appendChild(playerImage);

        // Add the player's PER to the div.
        var newPlayerPER = document.createElement('p');

        // Set the style for the number
        newPlayerPER.className = 'perCard';

        // Set the text for the PER
        newPlayerPER.innerText = 'PER: ' + playerStats[currentQuarter].toPrecision(4);

        // Add the PER
        playerCard.appendChild(newPlayerPER);

        // Add the player stat card to the game.
        playerCardDisplay.appendChild(playerCard);
    }
}