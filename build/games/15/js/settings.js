var CANVAS_WIDTH = 1500;
var CANVAS_HEIGHT = 640;

var EDGEBOARD_X = 300;
var EDGEBOARD_Y = 0;

var FPS_TIME      = 1000/24;
var DISABLE_SOUND_MOBILE = false;
var FONT_GAME = "rugamikaregular";
var FONT_PAYTABLE = "Arial";

var STATE_LOADING = 0;
var STATE_MENU    = 1;
var STATE_HELP    = 1;
var STATE_GAME    = 3;

var GAME_STATE_IDLE         = 0;
var GAME_STATE_SPINNING     = 1;
var GAME_STATE_SHOW_ALL_WIN = 2;
var GAME_STATE_SHOW_WIN     = 3;
var GAME_STATE_BONUS        = 4;

var REEL_STATE_START   = 0;
var REEL_STATE_MOVING = 1;
var REEL_STATE_STOP    = 2;

var ON_MOUSE_DOWN = 0;
var ON_MOUSE_UP   = 1;
var ON_MOUSE_OVER = 2;
var ON_MOUSE_OUT  = 3;
var ON_DRAG_START = 4;
var ON_DRAG_END   = 5;

var REEL_OFFSET_X = 380;
var REEL_OFFSET_Y = 84;

var NUM_REELS = 5;
var NUM_ROWS = 3;
var NUM_SYMBOLS = 10;
var WILD_SYMBOL = 8;
var BONUS_SYMBOL = 8;
var FREESPINS_SYMBOL = 9;
var NUM_PAYLINES = 20;
var SYMBOL_SIZE = 140;
var SPACE_BETWEEN_SYMBOLS = 10;
var MAX_FRAMES_REEL_EASE = 16;
var MIN_REEL_LOOPS;
var REEL_DELAY;
var REEL_START_Y = REEL_OFFSET_Y - (SYMBOL_SIZE * 3);
var REEL_ARRIVAL_Y = REEL_OFFSET_Y + (SYMBOL_SIZE * 3);
var TIME_SHOW_WIN;
var TIME_SHOW_ALL_WINS;
var COIN_BET;
var MIN_BET;
var MAX_BET;
var TOTAL_MONEY;
var WIN_OCCURRENCE;
var SLOT_CASH;
var MIN_WIN;
var FREESPIN_OCCURRENCE;
var BONUS_OCCURRENCE;
var FREESPIN_SYMBOL_NUM_OCCURR;
var NUM_FREESPIN;
var BONUS_PRIZE;
var BONUS_PRIZE_OCCURR;
var COIN_BET;
var PAYTABLE_VALUES;

var BONUS_FREESPIN = 1;
var BONUS_WHEEL = 2;
var WHEEL_SETTINGS;
var SEGMENT_ROT = 360 /20;
var TIME_ANIM_IDLE = 10000;
var MIN_FAKE_SPIN = 3;
var WHEEL_SPIN_TIMESPEED = 2600;
var ANIM_SPIN_TIMESPEED = 50;
var TIME_ANIM_WIN = 5000;
var ANIM_WIN1_TIMESPEED = 300;
var ANIM_WIN2_TIMESPEED = 50;
var LED_SPIN = 3;
var ANIM_IDLE1_TIMESPEED = 2000;
var ANIM_IDLE2_TIMESPEED = 100;
var ANIM_IDLE3_TIMESPEED = 150;

var STATE_BONUS_IDLE = 0;
var STATE_BONUS_SPIN = 1;
var STATE_BONUS_WIN = 2;
var STATE_BONUS_LOSE = 3;

var NUM_SPIN_FOR_ADS;

var ENABLE_FULLSCREEN;
var ENABLE_CHECK_ORIENTATION;
var SHOW_CREDITS;