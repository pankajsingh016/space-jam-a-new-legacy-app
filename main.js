// A map of playerName to an array of playerPER values
var playerMap = new Map();

// Variables to keep track of constants 
const maxPlayersOnCourt = 5;
const numQuarters = 4;

// Variables to track state throughout the game
var currentQuarter = 0;
var playersOnCourt = 0;
var quarterInPlay = false;

// Variables to track the PER throughout the game
var quarterPER = 0;
var quarterAvePER = 0;
var totalAvePER = 0;