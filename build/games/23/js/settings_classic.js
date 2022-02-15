////////////////////////////////////////////////////////////
// SETTINGS
////////////////////////////////////////////////////////////

var creditAmount = 30; //game start credit

//bet amount array
var betAmount_arr = [
						0.05,
						0.10,
						0.15,
						0.20,
						0.25,
						0.30,
						0.35,
						0.40,
						0.45,
						0.50
					];
					
var layoutPos = {
					creditY:160,  //credit postion y
					buttonY:610  //machine button postion y
				};

var creditText = "CREDIT: $[NUMBER]"; //credit text display
var maxBetText = "BET: [NUMBER]"; //max bet text display
var winBetText = "WIN: $[NUMBER]"; //win text display

//slot settings
var slotSettings = {
						width:260, //slot width
						height:260, //slot height
						row:1, //total row
						column:3, //total column
						offsetX:0, //offset position x
						offsetY:-20 //offset position y
					};


//slots array			
var slots_arr = [
					{static:"assets/classic/slot_01.png", animate:"assets/classic/slot_01_Spritesheet4x3.png"},
					{static:"assets/classic/slot_02.png", animate:"assets/classic/slot_02_Spritesheet4x3.png"},
					{static:"assets/classic/slot_03.png", animate:"assets/classic/slot_03_Spritesheet4x3.png"},
					{static:"assets/classic/slot_04.png", animate:"assets/classic/slot_04_Spritesheet4x3.png"},
					{static:"assets/classic/slot_05.png", animate:"assets/classic/slot_05_Spritesheet4x3.png"}
				];


//pay table array
var enablePercentage = false; //option to have result base on percentage
var overallPercent = 200;
var paytable_arr = [
					{index:[0,1,2], pay:10, percent:50},
					{index:[0,0,0], pay:30, percent:40},
					{index:[1,1,1], pay:60, percent:30},
					{index:[2,2,2], pay:100, percent:20},
					{index:[3,3,3], pay:200, percent:10},
					{index:[4,4,4], pay:300, percent:5}
				];

//wild array
var wild_arr = [];


//line settings
var lineSettings = {
						display:false, //display line
						stroke:5, //stroke size
						shadowY:4, //shadow position y
						timer:2, //display timer
						winTimer:2, //win display timer
						sign:true, //display sign
						number:true //display number
						
					};

//lines array
var lines_arr = [
					{
						color:"#E02828",
						shadow:"#8C1414",
						sign:[],
						path:[],
						slots:[{c:0,r:0},{c:1,r:0},{c:2,r:0}]
					}
				];


//spin settings	
var spinSettings = {
						slots:15, //total row of slots to spin
						startSpeed:1, //start speed
						delay:0.2, //delay for each column
						spinningSpeed:1, //spinning speed
						increaseSpeed:0.3, //increase speed for each column
						stopSpeed:0.3, //stop speed
						handle:true //show pull handle
					};

var exitMessage = "ARE YOUR SURE YOU\nWANT TO QUIT THE GAME?"; //exit game message

var resultTitleText = "YOU HAVE WON"; //result title text
var resultScoreText = "$[NUMBER]"; //result score text



//Social share, [SCORE] will replace with game score
var shareEnable = true; //toggle share
var shareText = "SHARE YOUR SCORE"; //social share message
var shareTitle = "Highscore on Slot Machine Game is $[SCORE].";//social share score title
var shareMessage = "$[SCORE] is mine new highscore on Slot Machine Game! Play it now!"; //social share score message