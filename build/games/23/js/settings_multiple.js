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
					creditY:100, //credit postion y
					buttonY:670 //machine button position y
				};

var creditText = "CREDIT: $[NUMBER]"; //credit text display
var maxBetText = "BET: [NUMBER]"; //max bet text display
var winBetText = "WIN: $[NUMBER]"; //win text display

//slot settings
var slotSettings = {
						width:135, //slot width
						height:135, //slot height
						row:3, //total row
						column:5, //total column
						offsetX:0, //offset position x
						offsetY:-20 //offset position y
					};


//slots array			
var slots_arr = [
					{static:"assets/multiple/slot_01.png", animate:"assets/multiple/slot_01_Spritesheet4x3.png"},
					{static:"assets/multiple/slot_02.png", animate:"assets/multiple/slot_02_Spritesheet4x3.png"},
					{static:"assets/multiple/slot_03.png", animate:"assets/multiple/slot_03_Spritesheet4x3.png"},
					{static:"assets/multiple/slot_04.png", animate:"assets/multiple/slot_04_Spritesheet4x3.png"},
					{static:"assets/multiple/slot_05.png", animate:"assets/multiple/slot_05_Spritesheet4x3.png"},
					{static:"assets/multiple/slot_06.png", animate:"assets/multiple/slot_06_Spritesheet4x3.png"},
					{static:"assets/multiple/slot_07.png", animate:"assets/multiple/slot_07_Spritesheet4x3.png"},
					{static:"assets/multiple/slot_08.png", animate:"assets/multiple/slot_08_Spritesheet4x3.png"},
					{static:"assets/multiple/slot_09.png", animate:"assets/multiple/slot_09_Spritesheet4x3.png"},
					{static:"assets/multiple/slot_10.png", animate:"assets/multiple/slot_10_Spritesheet4x3.png"}
				];


//pay table array	
var enablePercentage = false;
var paytable_arr = [
					{index:[0,0], pay:1, percent:25},
					{index:[0,0,0], pay:5, percent:15},
					{index:[0,0,0,0], pay:10, percent:10},
					{index:[0,0,0,0,0], pay:15, percent:5},
					
					{index:[1,1], pay:1, percent:25},
					{index:[1,1,1], pay:5, percent:15},
					{index:[1,1,1,1], pay:10, percent:10},
					{index:[1,1,1,1,1], pay:15, percent:5},
					
					{index:[2,2], pay:1, percent:25},
					{index:[2,2,2], pay:5, percent:15},
					{index:[2,2,2,2], pay:10, percent:10},
					{index:[2,2,2,2,2], pay:15, percent:5},
					
					{index:[2,2], pay:1, percent:25},
					{index:[2,2,2], pay:5, percent:15},
					{index:[2,2,2,2], pay:10, percent:10},
					{index:[2,2,2,2,2], pay:15, percent:5},
					
					{index:[3,3], pay:2, percent:25},
					{index:[3,3,3], pay:10, percent:15},
					{index:[3,3,3,3], pay:20, percent:10},
					{index:[3,3,3,3,3], pay:35, percent:5},
					
					{index:[4,4], pay:2, percent:25},
					{index:[4,4,4], pay:10, percent:15},
					{index:[4,4,4,4], pay:20, percent:10},
					{index:[4,4,4,4,4], pay:35, percent:5},
					
					{index:[5,5], pay:5, percent:25},
					{index:[5,5,5], pay:15, percent:15},
					{index:[5,5,5,5], pay:25, percent:10},
					{index:[5,5,5,5,5], pay:50, percent:5},
					
					{index:[6,6], pay:5, percent:25},
					{index:[6,6,6], pay:15, percent:15},
					{index:[6,6,6,6], pay:25, percent:10},
					{index:[6,6,6,6,6], pay:50, percent:5},
					
					{index:[7,7], pay:10, percent:25},
					{index:[7,7,7], pay:25, percent:15},
					{index:[7,7,7,7], pay:50, percent:10},
					{index:[7,7,7,7,7], pay:100, percent:5},
					
					{index:[9,9,9], pay:100, percent:7},
					{index:[9,9,9,9], pay:150, percent:5},
					{index:[9,9,9,9,9], pay:200, percent:3}
				];

//wild array
var wild_arr = [8];


//line settings
var lineSettings = {
						display:true, //display line
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
						color:"#E02828", //line color
						shadow:"#8C1414", //line shadow color
						sign:[{x:250,y:359},{x:1028,y:359}], //sign position
						path:[{x:264,y:359},{x:1013,y:359}], //line path array
						slots:[{c:0,r:1},{c:1,r:1},{c:2,r:1},{c:3,r:1},{c:4,r:1}] //slots to match
					},
					{
						color:"#E02828",
						shadow:"#8C1414",
						sign:[{x:250,y:244},{x:1028,y:244}],
						path:[{x:264,y:244},{x:1013,y:244}],
						slots:[{c:0,r:0},{c:1,r:0},{c:2,r:0},{c:3,r:0},{c:4,r:0}]
					},
					{
						color:"#E02828",
						shadow:"#8C1414",
						sign:[{x:250,y:479},{x:1028,y:479}],
						path:[{x:264,y:479},{x:1013,y:479}],
						slots:[{c:0,r:2},{c:1,r:2},{c:2,r:2},{c:3,r:2},{c:4,r:2}]
					},
					{
						color:"#E02828",
						shadow:"#8C1414",
						sign:[{x:250,y:199},{x:1028,y:199}],
						path:[{x:264,y:199},{x:366,y:199},{x:642,y:502},{x:914,y:199},{x:1013,y:199}],
						slots:[{c:0,r:0},{c:1,r:1},{c:2,r:2},{c:3,r:1},{c:4,r:0}]
					},
					{
						color:"#E02828",
						shadow:"#8C1414",
						sign:[{x:250,y:522},{x:1028,y:522}],
						path:[{x:264,y:522},{x:366,y:522},{x:642,y:220},{x:914,y:522},{x:1013,y:522}],
						slots:[{c:0,r:2},{c:1,r:1},{c:2,r:0},{c:3,r:1},{c:4,r:2}]
					},
					{
						color:"#E02828",
						shadow:"#8C1414",
						sign:[{x:250,y:322},{x:1028,y:322}],
						path:[{x:264,y:324},{x:343,y:324},{x:504,y:501},{x:771,y:501},{x:940,y:324},{x:1013,y:324}],
						slots:[{c:0,r:1},{c:1,r:2},{c:2,r:2},{c:3,r:2},{c:4,r:1}]
					},
					{
						color:"#E02828",
						shadow:"#8C1414",
						sign:[{x:250,y:396},{x:1028,y:396}],
						path:[{x:264,y:394},{x:343,y:394},{x:504,y:216},{x:771,y:216},{x:940,y:394},{x:1013,y:394}],
						slots:[{c:0,r:1},{c:1,r:0},{c:2,r:0},{c:3,r:0},{c:4,r:1}]
					},
					{
						color:"#E02828",
						shadow:"#8C1414",
						sign:[{x:250,y:285},{x:1028,y:438}],
						path:[{x:264,y:285},{x:568,y:285},{x:704,y:438},{x:1013,y:438}],
						slots:[{c:0,r:0},{c:1,r:0},{c:2,r:1},{c:3,r:2},{c:4,r:2}]
					},
					{
						color:"#E02828",
						shadow:"#8C1414",
						sign:[{x:250,y:438},{x:1028,y:285}],
						path:[{x:264,y:438},{x:568,y:438},{x:704,y:285},{x:1013,y:285}],
						slots:[{c:0,r:2},{c:1,r:2},{c:2,r:1},{c:3,r:0},{c:4,r:0}]
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