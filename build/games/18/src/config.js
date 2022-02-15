var DEBUGMODE = false;

var GAME_PATH = '';

var BETS = [10,20,30,40,50,70,80,90,100,150,200,300,500];
var BET_POS = 0;
var BET = BETS[BET_POS];

var BEGIN_CREDITS = 1000;
var BEGIN_JACKPOT = 5000;
var DECIMAL = 0;

var CHANCES = [
	{sym: 1, count: 9},
	{sym: 2, count: 11},
	{sym: 3, count: 13},
	{sym: 4, count: 16},
	{sym: 5, count: 23},
	{sym: 6, count: 21},
	{sym: 7, count: 19},
	{sym: 8, count: 12},
	{sym: 9, count: 8},
	{sym: 10, count: 3},
];

var PUSHER = [
    {sym: 1, chance: 250, percent: 50},
    {sym: 2, chance: 250, percent: 50},
    {sym: 3, chance: 500, percent: 60},
    {sym: 4, chance: 500, percent: 60},
    {sym: 5, chance: 1000, percent: 70},
    {sym: 6, chance: 2500, percent: 80},
    {sym: 7, chance: 5000, percent: 90},
    {sym: 8, chance: 2000, percent: 50},
    {sym: 9, chance: 1000, percent: 50},
    {sym: 10, chance: 100, percent: 1}
];

var SYM_FAKTORS = [
	{sym: 1, match_3: 1, match_4: 1.5, match_5: 2},
	{sym: 2, match_3: 1, match_4: 1.5, match_5: 2},
	{sym: 3, match_3: 2, match_4: 3, match_5: 4},
	{sym: 4, match_3: 3, match_4: 4, match_5: 5},
	{sym: 5, match_3: 4, match_4: 5, match_5: 6},
	{sym: 6, match_3: 5, match_4: 6, match_5: 7},
	{sym: 7, match_3: 6, match_4: 7, match_5: 8},
	{sym: 8, match_3: 7, match_4: 8, match_5: 9},
	{sym: 9, match_3: 15}
];