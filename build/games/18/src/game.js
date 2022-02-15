var BasicGame = {};

var JACKPOT = $.jStorage.get("user_jackpot");
var CREDITS = $.jStorage.get("user_credits");
var FS = $.jStorage.get("user_fs");
var SFX = $.jStorage.get("opt_sfx");
var MUSIC = $.jStorage.get("opt_music");
var LANGUAGE = $.jStorage.get("opt_language");
if(JACKPOT === null){JACKPOT = BEGIN_JACKPOT;}
if(JACKPOT == 0){JACKPOT = BEGIN_JACKPOT;}
if(CREDITS === null || CREDITS < BETS[0]){CREDITS = BEGIN_CREDITS;}
if(FS === null){
	FS = [];
	for(var i = 0; i < BETS.length; i++){
		FS.push(0);
	}
}
if(SFX === null){SFX = true;}
if(MUSIC === null){MUSIC = true;}
if(LANGUAGE === null){LANGUAGE = 'en';}

/*
vpos is the col the value is the row, 0.5 is the first Symbol upside 1.5 the middle 2.5 on
bottom vdif is for change the line on the symbol so that not 2 lines on the same position
*/
var WLDATA = [
    {line: 0, color: '0b6de6', vpos1: 0.5, vpos2: 0.5, vpos3: 0.5, vpos4: 0.5, vpos5: 0.5, vdif: -100},
    {line: 1, color: '0bd9e6', vpos1: 0.5, vpos2: 0.5, vpos3: 1.5, vpos4: 0.5, vpos5: 0.5, vdif: -70},
    {line: 2, color: '2ae60b', vpos1: 0.5, vpos2: 1.5, vpos3: 1.5, vpos4: 1.5, vpos5: 0.5, vdif: -40},
    {line: 3, color: 'a0e60b', vpos1: 0.5, vpos2: 1.5, vpos3: 2.5, vpos4: 1.5, vpos5: 0.5, vdif: -10},
    {line: 4, color: 'e6d90b', vpos1: 0.5, vpos2: 1.5, vpos3: 0.5, vpos4: 1.5, vpos5: 0.5, vdif: 20},
    {line: 5, color: 'e6770b', vpos1: 1.5, vpos2: 0.5, vpos3: 0.5, vpos4: 0.5, vpos5: 1.5, vdif: -80},
    {line: 6, color: 'e62a0b', vpos1: 1.5, vpos2: 1.5, vpos3: 1.5, vpos4: 1.5, vpos5: 1.5, vdif: -25},
    {line: 7, color: 'e60b68', vpos1: 1.5, vpos2: 2.5, vpos3: 2.5, vpos4: 2.5, vpos5: 1.5, vdif: 30},
    {line: 8, color: 'd90be6', vpos1: 2.5, vpos2: 2.5, vpos3: 2.5, vpos4: 2.5, vpos5: 2.5, vdif: -100},
    {line: 9, color: '720be6', vpos1: 2.5, vpos2: 2.5, vpos3: 1.5, vpos4: 2.5, vpos5: 2.5, vdif: -70},
    {line: 10, color: '530be6', vpos1: 2.5, vpos2: 1.5, vpos3: 1.5, vpos4: 1.5, vpos5: 2.5, vdif: -40},
    {line: 11, color: '0b15e6', vpos1: 2.5, vpos2: 1.5, vpos3: 0.5, vpos4: 1.5, vpos5: 2.5, vdif: -10},
    {line: 12, color: 'c2c2c2', vpos1: 2.5, vpos2: 1.5, vpos3: 2.5, vpos4: 1.5, vpos5: 2.5, vdif: 20}
];

var LANG = {
	en:{
		welcome: "Welcome",
		settings_title_1: "Settings",
		settings_title_2: "Language",
		settings_opt_label_1: "Sound",
		settings_opt_label_2: "Music",
		settings_opt_label_3: "Fullscreen",
		helpmenu_title: "Paytable",
		msg_error_credits: "No credits!",
		msg_play: "Game is running ...",
		msg_win: "You Win",
		msg_win_jp: "You Win the Jackpot!",
		msg_totalwin: "Total Win",
		msg_scatterwin_1: "You Won",
		msg_scatterwin_2: "Freegames",
		msg_nowins: "Lose!",
		bet: "Bet",
		desc_jp_sym: "Jackpot",
        desc_fs1_sym: "Symbol on",
        desc_fs2_sym: "wheel 1,3,5",
        desc_fs3_sym: "Freegames"
	},
	de:{
		welcome: "Willkommen",
		settings_title_1: "Einstellungen",
		settings_title_2: "Sprache",
		settings_opt_label_1: "Soundeffekte",
		settings_opt_label_2: "Musik",
		settings_opt_label_3: "Vollbild",
		helpmenu_title: "Gewinntabelle",
		msg_error_credits: "Keine Kredits!",
		msg_play: "Spiel läuuft ...",
		msg_win: "Gewonnen",
		msg_win_jp: "Du hast den Jackpot gewonnen!",
		msg_totalwin: "Gesamt gewinn",
		msg_scatterwin_1: "Du hast",
		msg_scatterwin_2: "Freispiele gewonnen!",
		msg_nowins: "Verloren!",
		bet: "Einsatz",
		desc_jp_sym: "Jackpot",
        desc_fs1_sym: "Symbol auf",
        desc_fs2_sym: "Walze 1,3,5",
        desc_fs3_sym: "Freispiele"
	},
	es:{
		welcome: "Bienvenida",
		settings_title_1: "Ajustes",
		settings_title_2: "Idioma",
		settings_opt_label_1: "Efectos sonoros",
		settings_opt_label_2: "Música",
		settings_opt_label_3: "Pantalla completa",
		helpmenu_title: "Tabla de ganancia",
		msg_error_credits: "Sin crédito!",
		msg_play: "El juego se está ejecutando ...",
		msg_win: "Won",
		msg_win_jp: "Te has ganado la bote!",
		msg_totalwin: "Beneficio total",
		msg_scatterwin_1: "Ganado",
		msg_scatterwin_2: "Juegos",
		msg_nowins: "Perdido!",
		bet: "Apuesta",
		desc_jp_sym: "Bote",
        desc_fs1_sym: "Símbolo en",
        desc_fs2_sym: "rueda 1,3,5",
        desc_fs3_sym: "Juegos gratis"
	}
};


function sizeHandler(){
    $("#game").css("height", $(window).innerHeight());
}
$(window).resize(function() {
    sizeHandler();
});
$(document).ready(function(){
    sizeHandler();
});

BasicGame.GameLoad = function (game){};

BasicGame.GameLoad.prototype = {
	init: function() {
        this.game.renderer.renderSession.roundPixels = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
	},
	preload: function() {
		this.game.load.image('bg1', GAME_PATH+'assets/bg1.png');
		this.game.load.image('bg2', GAME_PATH+'assets/bg2.png');
		this.game.load.image('bg3', GAME_PATH+'assets/bg3.png');
		this.game.load.image('bg4', GAME_PATH+'assets/bg4.png');
		this.game.load.image('bg5', GAME_PATH+'assets/bg5.png');
		this.game.load.image('preloader_logo', GAME_PATH+'assets/loading.png');
	},
    create: function() {

        this.paralax1 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bg1');
        this.paralax2 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bg2');
        this.paralax3 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bg3');
        this.paralax4 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bg4');
        this.paralax5 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bg5');
        this.paralax1.anchor.setTo(0.5, 0.5);
        this.paralax2.anchor.setTo(0.5, 0.5);
        this.paralax3.anchor.setTo(0.5, 0.5);
        this.paralax4.anchor.setTo(0.5, 0.5);
        this.paralax5.anchor.setTo(0.5, 0.5);
		var logo = this.game.add.sprite(200, 400, 'preloader_logo');
		logo.x = this.game.world.centerX - (logo.width / 2);

		var bar = this.LoaderBar('408', '40', this.game.world.centerX-204, 600, '#f3e619', '#2872e0');
		this.LoaderBar_Set(bar, 0);
		this.game.load.onFileComplete.add(function(progress, cacheKey, success, totalLoaded, totalFiles){
            this.LoaderBar_Set(bar, progress);
            if(DEBUGMODE === true){
            	console.log('progress: '+progress);
            }
        	if(progress == 100){
            	this.CallEventTimer = this.time.events.add(Phaser.Timer.SECOND, this.CallGame, this);
          	}
		}, this);
		this.BeginLoad();
    },
    BeginLoad: function (){
        this.load.atlasJSONHash('basis', GAME_PATH+'assets/basis_high.png', GAME_PATH+'assets/basis_high.json');
        this.load.atlasJSONHash('symbols', GAME_PATH+'assets/symbols.png', GAME_PATH+'assets/symbols.json');
        this.load.atlasJSONHash('anim', GAME_PATH+'assets/animation.png', GAME_PATH+'assets/animation.json');
        this.load.audio('sfx_win_jackpot', [GAME_PATH+'assets/audio/win_jackpot.mp3', GAME_PATH+'assets/audio/win_jackpot.ogg']);
        this.load.audio('sfx_win_freegames', [GAME_PATH+'assets/audio/win_freegames.mp3', GAME_PATH+'assets/audio/win_freegames.ogg']);
        this.load.audio('sfx_win_normal', [GAME_PATH+'assets/audio/win_normal.mp3', GAME_PATH+'assets/audio/win_normal.ogg']);
        this.load.audio('sfx_wheel_start', [GAME_PATH+'assets/audio/wheel_start.mp3', GAME_PATH+'assets/audio/wheel_start.ogg']);
        this.load.audio('sfx_wheel_stop', [GAME_PATH+'assets/audio/wheel_stop.mp3', GAME_PATH+'assets/audio/wheel_stop.ogg']);
        this.load.audio('music_bg', [GAME_PATH+'assets/audio/bg.mp3', GAME_PATH+'assets/audio/bg.ogg']);
    	this.load.start();
    },
	CallGame: function (){
		this.state.start('Game');
	},
	LoaderBar: function(width, height, pos_x, pos_y, Color, BarColor){
		var progress = game.add.group();

        var barbg = game.add.bitmapData(width, height);
        barbg.ctx.beginPath();
        barbg.ctx.rect(0, 0, width, height);
        barbg.ctx.fillStyle = Color;
        barbg.ctx.fill();

        var bar = game.add.bitmapData(width-6, height-6);
        bar.ctx.beginPath();
        bar.ctx.rect(0, 0, width-6, height-6);
        bar.ctx.fillStyle = BarColor;
        bar.ctx.fill();

        barbg = game.add.sprite(pos_x, pos_y, barbg);
        bar = game.add.sprite(pos_x+3, pos_y+3, bar);
		bar.origsize = width-6;
        progress.add(barbg);
        progress.add(bar);

		return progress;
	},
	LoaderBar_Set: function(bar, percent){
		bar.children[1].width = bar.children[1].origsize / 100 * percent
	}
};

BasicGame.Game = function (game){
    this.play = false;
    this.help = false;
    this.help_delay = false;
    this.settings = false;
    this.settings_delay = false;
    this.autoplay = false;
    this.winlines = [];
    this.c_win = 0;
    this.jpwin = 0;
    this.jp_number = 0;
	this.coin_ani = false;
	this.coin_ani_c = 0;
    this.nextCheckLine = 0;
};

BasicGame.Game.prototype = {

  	create: function(){

        this.paralax1 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bg1');
        this.paralax2 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bg2');
        this.paralax3 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bg3');
        this.paralax4 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bg4');
        this.paralax5 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bg5');
        this.paralax1.anchor.setTo(0.5, 0.5);
        this.paralax2.anchor.setTo(0.5, 0.5);
        this.paralax3.anchor.setTo(0.5, 0.5);
        this.paralax4.anchor.setTo(0.5, 0.5);
        this.paralax5.anchor.setTo(0.5, 0.5);

  		this.updateParalax();

		this.sym_width = 270;
		this.sym_height = 270;
		this.sym_pos_y = 145;
		this.sym_pos_x = 320;

		this.walze1 = this.CreateReel(this.sym_pos_x, this.sym_pos_y, this.sym_width, this.sym_height);
		this.walze2 = this.CreateReel(this.sym_pos_x + this.sym_width, this.sym_pos_y, this.sym_width, this.sym_height);
		this.walze3 = this.CreateReel(this.sym_pos_x + this.sym_width * 2, this.sym_pos_y, this.sym_width, this.sym_height);
		this.walze4 = this.CreateReel(this.sym_pos_x + this.sym_width * 3, this.sym_pos_y, this.sym_width, this.sym_height);
		this.walze5 = this.CreateReel(this.sym_pos_x + this.sym_width * 4, this.sym_pos_y, this.sym_width, this.sym_height);


		this.logo = this.game.add.sprite(this.game.world.centerX, 0, 'basis', 'logo.png');
		this.logo.anchor.setTo(0.5, 0);

		// Audio

		this.WheelStartSFX = this.add.audio('sfx_wheel_start');
		this.WheelStopSFX = this.add.audio('sfx_wheel_stop');
		this.WinNormalSFX = this.add.audio('sfx_win_normal');
		this.WinJackpotSFX = this.add.audio('sfx_win_jackpot');
		this.WinFreegamesSFX = this.add.audio('sfx_win_freegames');
		MusicBG = this.add.audio('music_bg');
		if(MUSIC === true){
			MusicBG.play('', 0, 1, true);
		}

		this.wlg = this.add.group();
		var sym_begin = this.sym_pos_x; // X Cord. begin of the first Slot Symbol
		var h1_begin = 280; // X End from Button (left)
		var h2_begin = h1_begin;
		var h1_end = 1450; // X Begin from button (right)
		var h2_end = h1_end;
		var sym_v = 0; // Y Begin of the first Line
		var sym_v_steps = 63; // Y space from buttons
		var h_begin_now = h2_begin;
		var h_end_now = h2_end;
		var sym_pos = 0;
		for(i = 0; i < WLDATA.length; i++){
			if(h_begin_now == h2_begin){h_begin_now = h1_begin; h_end_now = h1_end;} else {h_begin_now = h2_begin; h_end_now = h2_end;}
			this.winlines[WLDATA[i].line] = this.wlg.add(this.GenerateLines(
			h_begin_now,
			h_end_now,
			sym_begin,
			sym_v,
			sym_v_steps,
			sym_pos,
			WLDATA[i].color, WLDATA[i].vpos1, WLDATA[i].vpos2, WLDATA[i].vpos3, WLDATA[i].vpos4, WLDATA[i].vpos5, WLDATA[i].vdif));
            sym_v += sym_v_steps;
            sym_pos++;
		}
		this.wlg.y = 175;
		this.wlg.setAll('visible', false);

		this.wl_left = this.createWinlineButtons(this.sym_pos_x - 80, this.sym_pos_y, this.sym_height * 3, 13);
		this.wl_right = this.createWinlineButtons(this.sym_pos_x + (this.sym_width * 5) + 30, this.sym_pos_y, this.sym_height * 3, 13);

		// Animation Left
        this.robot = this.add.sprite(20, 600, 'anim','Fire2_000.png');
        this.robot.scale.set(1.5);
        this.robot.animations.add('Fire', Phaser.Animation.generateFrameNames('Fire2_', 0, 19, '.png', 3), 20, false, false);
        this.robot.animations.add('Attack', Phaser.Animation.generateFrameNames('Attack_', 0, 19, '.png', 3), 20, false, false);
    	this.RoboRand = [];
    	for(var i = 0; i < 20; i++){this.RoboRand.push(0);}
    	for(var i = 0; i < 10; i++){this.RoboRand.push('Fire');}
    	for(var i = 0; i < 10; i++){this.RoboRand.push('Attack');}
    	this.shuffle(this.RoboRand);
    	this.time.events.loop(Phaser.Timer.SECOND * 30, this.RoboAction, this);


        this.menu = this.add.sprite(0, 0, 'basis', 'menu.png');

		this.gamebuttons = this.add.group();
		this.autobutton = this.gamebuttons.create(710, 990, 'basis','btn_auto_en.png');
		this.startbutton = this.gamebuttons.create(835, 980, 'basis','btn_play.png');
		this.settingsbutton = this.gamebuttons.create(925, 990, 'basis','btn_options_en.png');
		this.infobutton = this.gamebuttons.create(1065, 990, 'basis','btn_info_en.png');
		this.betless = this.gamebuttons.create(450, 1014, 'basis','btn_less.png');
		this.betmore = this.gamebuttons.create(602, 1014, 'basis','btn_more.png');
		this.gamebuttons.setAll('inputEnabled', true);
		this.gamebuttons.setAll('input.useHandCursor', true);
		this.gamebuttons.setAll('input.pixelPerfectOver', true);
		this.gamebuttons.setAll('input.pixelPerfectClick', true);
		this.autobutton.events.onInputDown.add(this.PressAutoplay, this);
		this.settingsbutton.events.onInputDown.add(this.PressSettings, this);
		this.infobutton.events.onInputDown.add(this.PressInfo, this);
        this.betless.events.onInputDown.add(this.PressBetLess, this);
        this.betmore.events.onInputDown.add(this.PressBetMore, this);
        this.startbutton.events.onInputDown.add(this.PressPlay, this);

		// labels
		this.label_jp = this.add.sprite(20, 973, 'basis', 'label_jackpot_en.png');
		this.label_credits = this.add.sprite(230, 973, 'basis', 'label_credits_en.png');
		this.label_bet = this.add.sprite(440, 973, 'basis', 'label_bet_en.png');
		this.label_msg = this.add.sprite(1285, 973, 'basis', 'label_message_en.png');
		this.label_fs = this.add.sprite(1765, 973, 'basis', 'label_fs_en.png');

		// Fields
		this.ValueJackpot = this.game.add.text(115, 1012, this.number_format(JACKPOT, DECIMAL, ',', ''), {font: "bold 18px Arial", fill: "#ffffff"});
		this.ValueCredits = this.game.add.text(320, 1012, this.number_format(CREDITS, DECIMAL, ',', ''), {font: "bold 18px Arial", fill: "#ffffff"});
		this.ValueBet = this.game.add.text(535, 1012, this.number_format(BETS[BET_POS], DECIMAL, ',', ''), {font: "bold 18px Arial", fill: "#ffffff"});
		this.ValueFs = this.game.add.text(1775, 1012, this.number_format(FS[BET_POS], DECIMAL, ',', ''), {font: "bold 18px Arial", fill: "#ffffff"});
		this.ValueMessage = this.game.add.text(1295, 1012, LANG[LANGUAGE]['welcome'], {font: "bold 18px Arial", fill: "#ffffff"});
		this.ValueJackpot.anchor.x = 0.5;
		this.ValueCredits.anchor.x = 0.5;
		this.ValueBet.anchor.x = 0.5;

		// Jackpot Frame
		this.jpframe = this.add.group();
		this.jpbg_width = 600;
		this.jpbg_height = 420;

        var jpbg = game.add.bitmapData(this.jpbg_width, this.jpbg_height);
        jpbg.ctx.beginPath();
        jpbg.ctx.rect(0, 0, this.jpbg_width, this.jpbg_height);
        jpbg.ctx.fillStyle = '#f3e619';
        jpbg.ctx.fill();
		this.jpbg = this.game.add.sprite(0, 0, jpbg);

        var jpbg2 = game.add.bitmapData(this.jpbg_width - 6, this.jpbg_height - 6);
        jpbg2.ctx.beginPath();
        jpbg2.ctx.rect(0, 0, this.jpbg_width, this.jpbg_height);
        jpbg2.ctx.fillStyle = '#0c131c';
        jpbg2.ctx.fill();
		this.jpbg2 = this.game.add.sprite(3, 3, jpbg2);

		this.jpframe.add(this.jpbg);
		this.jpframe.add(this.jpbg2);
		this.jppic = this.jpframe.create(this.jpbg_width / 2, this.jpbg_height / 2, 'symbols','sym_10.png');
		this.jppic.anchor.x = 0.5;
		this.jppic.anchor.y = 0.5;
		this.jpframe_title = this.game.add.text(this.jpframe.width / 2, 30, LANG[LANGUAGE]['msg_win_jp'], {font: "bold 38px Arial", fill: "#ffffff"});
		this.jpframe_title.anchor.x = 0.5;
		this.jpwin_field = this.game.add.text(this.jpframe.width / 2, this.jpframe.height - 70, 0, {font: "bold 38px Arial", fill: "#ffffff"});
		this.jpwin_field.anchor.x = 0.5;
		this.jpframe.add(this.jpframe_title);
		this.jpframe.add(this.jpwin_field);
		this.jpframe.x = this.game.width / 2 - this.jpframe.width / 2;
		this.jpframe.y = this.game.height / 2 - this.jpframe.height / 2;
		this.jpframe.visible = false;

		// Helpmenu
		this.helpmenu = this.add.group();
		this.helpmenubuttons = this.add.group();
		this.helpbg_width = 1450;
		this.helpbg_height = 750;

        var helpbg = game.add.bitmapData(this.helpbg_width, this.helpbg_height);
        helpbg.ctx.beginPath();
        helpbg.ctx.rect(0, 0, this.helpbg_width, this.helpbg_height);
        helpbg.ctx.fillStyle = '#f3e619';
        helpbg.ctx.fill();
		this.helpbg = this.game.add.sprite(this.game.width - this.helpbg_width, 160, helpbg);

        var helpbg2 = game.add.bitmapData(this.helpbg_width - 3, this.helpbg_height - 6);
        helpbg2.ctx.beginPath();
        helpbg2.ctx.rect(0, 0, this.helpbg_width, this.helpbg_height);
        helpbg2.ctx.fillStyle = '#0c131c';
        helpbg2.ctx.fill();
		this.helpbg2 = this.game.add.sprite(this.game.width - this.helpbg_width + 3, 163, helpbg2);

		this.helpmenu.add(this.helpbg);
		this.helpmenu.add(this.helpbg2);
		this.helpmenu_close_button = this.helpmenubuttons.create(this.helpbg2.x- 10, this.helpbg2.y-10, 'basis','btn_close.png');
		this.helpmenubuttons.setAll('inputEnabled', true);
		this.helpmenubuttons.setAll('input.useHandCursor', true);
		this.helpmenubuttons.setAll('input.pixelPerfectOver', true);
		this.helpmenubuttons.setAll('input.pixelPerfectClick', true);
		this.helpmenu_close_button.events.onInputDown.add(this.PressInfo, this);
		this.helpmenu_title1 = this.game.add.text(this.helpbg.x + this.helpbg.width / 2, this.helpbg.y + 30, LANG[LANGUAGE]['helpmenu_title'], {font: "bold 38px Arial", fill: "#ffffff"});
		this.helpmenu_title1.anchor.x = 0.5;
		this.helpmenu.add(this.helpmenu_title1);
		var ybegin = this.helpbg.y + 100;
		var xbegin = this.helpbg.x + 40;
		var ypos = ybegin;
		var xpos = xbegin;
		this.faktorlables = this.add.group();
		for(var i = 1; i < 11; i++){
			if(i == 5 || i == 9){
				ypos += 140;
				xpos = xbegin;
			}
			var c = this.helpmenu.create(xpos, ypos, 'symbols', 'sym_'+i+'.png');
			c.scale.setTo(0.5);

            var bg = game.add.bitmapData(175, c.height);
            bg.ctx.beginPath();
            bg.ctx.rect(0, 0, 175, c.height);
            bg.ctx.fillStyle = '#1c4c6a';
            bg.ctx.fill();
            bg = this.game.add.sprite(c.x + c.width + 10, c.y, bg);
            this.helpmenu.add(bg);
			xpos += 345;
		}
		this.helpmenu.add(this.faktorlables);
		var ybegin = this.helpbg.y + 580;
		var xbegin = this.helpbg.x + 337;
		var ypos = ybegin;
		var xpos = xbegin;
		for(var i = 0; i < WLDATA.length; i++){
            var wl = this.GenerateHelpWinline(i);
            if(i == 7){
            	ypos += 80;
            	xpos = xbegin + 58;
            }
            wl.x = xpos;
            wl.y = ypos;
            this.helpmenu.add(wl);
            xpos += 116;
		}
		this.helpmenu.add(this.helpmenubuttons);
		this.helpmenu.x = this.game.width;

		// Settingsmenu
		this.settingsmenu = this.add.group();
		this.settingsmenubuttons = this.add.group();
		this.settingsbg_width = 430;
		this.settingsbg_height = 440;
        var settingsbg = game.add.bitmapData(this.settingsbg_width, this.settingsbg_height);
        settingsbg.ctx.beginPath();
        settingsbg.ctx.rect(0, 0, this.settingsbg_width, this.settingsbg_height);
        settingsbg.ctx.fillStyle = '#f3e619';
        settingsbg.ctx.fill();
		this.settingsbg = this.game.add.sprite(0, 0, settingsbg);
        var settingsbg2 = game.add.bitmapData(this.settingsbg_width - 3, this.settingsbg_height - 6);
        settingsbg2.ctx.beginPath();
        settingsbg2.ctx.rect(0, 0, this.settingsbg_width, this.settingsbg_height);
        settingsbg2.ctx.fillStyle = '#0c131c';
        settingsbg2.ctx.fill();
		this.settingsbg2 = this.game.add.sprite(0, 3, settingsbg2);
		this.settingsmenu.add(this.settingsbg);
		this.settingsmenu.add(this.settingsbg2);

		// labels
		this.settings_title1 = this.game.add.text(this.settingsbg_width / 2, 30, '', {font: "bold 38px Arial", fill: "#ffffff"});
		this.settings_title1.anchor.x = 0.5;
		this.settings_title2 = this.game.add.text(this.settingsbg_width / 2, 240, '', {font: "bold 38px Arial", fill: "#ffffff"});
		this.settings_title2.anchor.x = 0.5;
		this.settings_opt_label1 = this.game.add.text(100, 110, '', {font: "bold 20px Arial", fill: "#ffffff"});
		this.settings_opt_label2 = this.game.add.text(100, 150, '', {font: "bold 20px Arial", fill: "#ffffff"});
		this.settingsmenu.add(this.settings_title1);
		this.settingsmenu.add(this.settings_title2);
		this.settingsmenu.add(this.settings_opt_label1);
		this.settingsmenu.add(this.settings_opt_label2);
		this.settings_opt_label3 = this.game.add.text(100, 190, '', {font: "bold 20px Arial", fill: "#ffffff"});
		this.settingsmenu.add(this.settings_opt_label3);

		// Buttons
		this.settings_close_button = this.settingsmenubuttons.create(this.settingsmenu.width - 35, -10, 'basis','btn_close.png');
		this.settings_sfx_button = this.settingsmenubuttons.create(300, 110, 'basis','btn_opt_activ.png');
		if(SFX === false){this.settings_sfx_button.frameName = 'btn_opt_normal.png';}
		this.settings_music_button = this.settingsmenubuttons.create(300, 150, 'basis','btn_opt_activ.png');
		if(MUSIC === false){this.settings_music_button.frameName = 'btn_opt_normal.png';}
		this.settings_fullscreen_button = this.settingsmenubuttons.create(300, 190, 'basis','btn_opt_normal.png');
		this.settings_lang1_button = this.settingsmenubuttons.create(this.settingsbg_width / 2 - 80, 320, 'basis','lang_en.png');
		this.settings_lang2_button = this.settingsmenubuttons.create(this.settingsbg_width / 2, 320, 'basis','lang_de.png');
		this.settings_lang3_button = this.settingsmenubuttons.create(this.settingsbg_width / 2 + 80, 320, 'basis','lang_es.png');
		this.settings_lang1_button.anchor.x = 0.5;
		this.settings_lang2_button.anchor.x = 0.5;
		this.settings_lang3_button.anchor.x = 0.5;
		this.settingsmenubuttons.setAll('inputEnabled', true);
		this.settingsmenubuttons.setAll('input.useHandCursor', true);
		this.settings_close_button.input.pixelPerfectOver = true;
		this.settings_close_button.input.pixelPerfectClick = true;
		this.settings_lang1_button.input.pixelPerfectOver = true;
		this.settings_lang1_button.input.pixelPerfectClick = true;
		this.settings_lang2_button.input.pixelPerfectOver = true;
		this.settings_lang2_button.input.pixelPerfectClick = true;
		this.settings_lang3_button.input.pixelPerfectOver = true;
		this.settings_lang3_button.input.pixelPerfectClick = true;
		this.settings_close_button.events.onInputDown.add(this.PressSettings, this);
		this.settings_sfx_button.events.onInputDown.add(this.PressSFX, this);
		this.settings_music_button.events.onInputDown.add(this.PressMusic, this);
		this.settings_fullscreen_button.events.onInputDown.add(this.PressFullScreen, this);
		this.settings_lang1_button.events.onInputDown.add(function(){this.PressLang('en');}, this);
		this.settings_lang2_button.events.onInputDown.add(function(){this.PressLang('de');}, this);
		this.settings_lang3_button.events.onInputDown.add(function(){this.PressLang('es');}, this);
		this.settingsmenu.add(this.settingsmenubuttons);
		this.settingsmenu.x = -this.settingsbg_width - 50;
		this.settingsmenu.y = 160;

		// Show Winlines
		/*
        for(var i = 0; i < this.winlines.length; i++){
            this.winlines[i].visible = true;
        }
        */

		this.UpdateLanguage();
		this.ValueMessage.text = LANG[LANGUAGE]['welcome'];
	},
	CreateReel: function(x, y, width, height){
		var reel = this.add.group();
		var sym_y = y + height * 2;
		for(var i = 0; i < 9; i++){
			var c = this.add.sprite(x, sym_y, 'symbols', 'sym_'+this.game.rnd.between(1,10)+'.png');
			sym_y -= height;
			if(i > 5){
				for(var n = 1; n < 11; n++){
					c.animations.add('sym_' + n, Phaser.Animation.generateFrameNames('sym_' + n + '_', 1, 20, '.png', 2), 8, false, false);
				}
			}
			reel.add(c);
		}
        var mask = game.add.graphics(0, 0);
        mask.beginFill(0xff0000);
        mask.drawRect(x, y, width, height * 3);
        reel.mask = mask;
		return reel;
	},
	createWinlineButtons: function(x, y, height, winlines){
		var winlinebuttons = this.add.group();
		var space = 2;
		var buttonSize = (height - (winlines * space)) / winlines;
		if(buttonSize > 53){
			buttonSize = 53;
			var spacer = height - (buttonSize * winlines);
			space = spacer / (winlines - 1);
		}
        for(var i = 1; i <= winlines; i++){
        	var button_container = this.add.group();
            var button = game.add.bitmapData(buttonSize, buttonSize);
            button.ctx.beginPath();
            button.ctx.rect(0, 0, buttonSize, buttonSize);
            button.ctx.fillStyle = '#'+WLDATA[(i-1)].color;
            button.ctx.fill();
            var label = this.game.add.text(x + button.width / 2, y + ((button.height - (button.height / 1.5)) / 2), i, {font: "bold "+(button.height / 1.5)+"px Arial", fill: "#ffffff"});
            label.anchor.set(0.5, 0);
            button_container.create(x, y, button);
            winlinebuttons.add(button_container);
            y += buttonSize + space;
        }
        return winlinebuttons;
	},
    CreateFaktorLabels: function(xpos, ypos, i){
        if(i < 9){
            var t1 = this.game.add.text(xpos + 170, ypos + 10, '3 = '+LANG[LANGUAGE]['bet']+' x' + SYM_FAKTORS[i-1]['match_3'], {font: "bold 18px Arial", fill: "#ffffff"});
            var t2 = this.game.add.text(xpos + 170, t1.y + 39, '4 = '+LANG[LANGUAGE]['bet']+' x' + SYM_FAKTORS[i-1]['match_4'], {font: "bold 18px Arial", fill: "#ffffff"});
            var t3 = this.game.add.text(xpos + 170, t2.y + 39, '5 = '+LANG[LANGUAGE]['bet']+' x' + SYM_FAKTORS[i-1]['match_5'], {font: "bold 18px Arial", fill: "#ffffff"});
            this.faktorlables.add(t1);
            this.faktorlables.add(t2);
            this.faktorlables.add(t3);
        }
        else if(i == 9){
            var t1 = this.game.add.text(xpos + 170, ypos + 10, LANG[LANGUAGE]['desc_fs1_sym'], {font: "bold 18px Arial", fill: "#ffffff"});
            var t2 = this.game.add.text(xpos + 170, t1.y + 39, LANG[LANGUAGE]['desc_fs2_sym']+ ' =', {font: "bold 18px Arial", fill: "#ffffff"});
            var t3 = this.game.add.text(xpos + 170, t2.y + 39, SYM_FAKTORS[8]['match_3']+' '+LANG[LANGUAGE]['desc_fs3_sym'], {font: "bold 18px Arial", fill: "#ffffff"});
            this.faktorlables.add(t1);
            this.faktorlables.add(t2);
            this.faktorlables.add(t3);
        }
        else if(i == 10){
            var t2 = this.game.add.text(xpos + 170, ypos + 49, '5 = '+LANG[LANGUAGE]['desc_jp_sym'], {font: "bold 18px Arial", fill: "#ffffff"});
            this.faktorlables.add(t2);
        }
    },
	PressAutoplay: function(){
		if(this.autoplay === true){
			this.autoplay = false;
			this.autobutton.tint = '0xffffff';
		} else {
			this.autoplay = true;
			this.autobutton.tint = '0xcccccc';
		}
	},
	PressInfo: function(){
    	if(!this.play && !this.settings && !this.settings_delay && !this.help && !this.help_delay){
    		this.infobutton.tint = '0xcccccc';
    		this.help_delay = true;
    		this.info_ani = this.add.tween(this.helpmenu).to( { x: 0 }, 300, Phaser.Easing.Linear.None, true, 500);
    		this.info_ani.onComplete.add(function(){
				this.help_delay = false;
				this.help = true;
    		},this);
    	}
        if(this.help == true && !this.help_delay){
    		this.help_delay = true;
    		this.info_ani2 = this.add.tween(this.helpmenu).to( { x: this.game.width }, 300, Phaser.Easing.Linear.None, true, 500);
    		this.info_ani2.onComplete.add(function(){
				this.help_delay = false;
				this.help = false;
				this.infobutton.tint = '0xffffff';
    		},this);
    	}
	},
	PressSettings: function(){
    	if(!this.play && !this.settings && !this.settings_delay && !this.help && !this.help_delay){
    		this.settingsbutton.tint = '0xcccccc';
    		this.settings_delay = true;
    		this.settings_ani = this.add.tween(this.settingsmenu).to( { x: 0 }, 300, Phaser.Easing.Linear.None, true, 500);
    		this.settings_ani.onComplete.add(function(){
				this.settings_delay = false;
				this.settings = true;
    		},this);
    	}
        if(this.settings == true && !this.settings_delay){
    		this.settings_delay = true;
    		this.settings_ani2 = this.add.tween(this.settingsmenu).to( { x: -this.settingsbg_width - 50 }, 300, Phaser.Easing.Linear.None, true, 500);
    		this.settings_ani2.onComplete.add(function(){
				this.settings_delay = false;
				this.settings = false;
				this.settingsbutton.tint = '0xffffff';
    		},this);
    	}
	},
	PressBetLess: function(){
		if(DEBUGMODE === true){
			console.log('count bet pos: '+BETS.length);
			console.log('bet old pos: '+BET_POS);
			console.log('bet old: '+BET);
		}
		if(BET_POS > 0){
			BET_POS--;
			this.updateFS();
            BET = BETS[BET_POS];
            if(DEBUGMODE === true){
                console.log('bet new pos: '+BET_POS);
                console.log('bet new: '+BET);
            }
            this.ValueBet.text = this.number_format(BET, DECIMAL, ',', '');
		}
	},
	PressBetMore: function(){
		if(DEBUGMODE === true){
			console.log('count bet pos: '+BETS.length);
			console.log('bet old pos: '+BET_POS);
			console.log('bet old: '+BET);
		}
		if(BET_POS < BETS.length - 1){
			BET_POS++;
			this.updateFS();
            BET = BETS[BET_POS];
            if(DEBUGMODE === true){
                console.log('bet new pos: '+BET_POS);
                console.log('bet new: '+BET);
            }
            this.ValueBet.text = this.number_format(BET, DECIMAL, ',', '');
		}
	},
    PressSFX: function(){
    	if(SFX === true){
    		SFX = false;
    		this.settings_sfx_button.frameName = 'btn_opt_normal.png';
    	} else {
    		SFX = true;
    		this.settings_sfx_button.frameName = 'btn_opt_activ.png';
    	}
    	$.jStorage.set("opt_sfx", SFX);
    },
    PressMusic: function(){
    	if(MUSIC === true){
    		MUSIC = false;
    		MusicBG.stop();
    		this.settings_music_button.frameName = 'btn_opt_normal.png';
    	} else {
    		MUSIC = true;
    		MusicBG.play('', 0, 1, true);
    		this.settings_music_button.frameName = 'btn_opt_activ.png';
    	}
    	$.jStorage.set("opt_music", MUSIC);
    },
    PressFullScreen: function(){
        if(this.game.scale.isFullScreen){
            this.game.scale.stopFullScreen();
            this.settings_fullscreen_button.frameName = 'btn_opt_normal.png';
        } else {
            this.game.scale.startFullScreen(false);
            this.settings_fullscreen_button.frameName = 'btn_opt_activ.png';
        }
    },
    PressLang: function(lang){
        LANGUAGE = lang;
        this.UpdateLanguage();
    },
    UpdateLanguage: function(){
    	if(DEBUGMODE === true){
    		console.log('update language | new language: '+LANGUAGE);
    	}
		this.label_jp.frameName = 'label_jackpot_'+LANGUAGE+'.png';
		this.label_credits.frameName = 'label_credits_'+LANGUAGE+'.png';
		this.label_bet.frameName = 'label_bet_'+LANGUAGE+'.png';
		this.label_msg.frameName = 'label_message_'+LANGUAGE+'.png';
		this.label_fs.frameName = 'label_fs_'+LANGUAGE+'.png';
		this.autobutton.frameName = 'btn_auto_'+LANGUAGE+'.png';
		this.settingsbutton.frameName = 'btn_options_'+LANGUAGE+'.png';
		this.infobutton.frameName = 'btn_info_'+LANGUAGE+'.png';
		this.settings_title1.text = LANG[LANGUAGE]['settings_title_1'];
		this.settings_title2.text = LANG[LANGUAGE]['settings_title_2'];
		this.settings_opt_label1.text = LANG[LANGUAGE]['settings_opt_label_1'];
		this.settings_opt_label2.text = LANG[LANGUAGE]['settings_opt_label_2'];
		this.settings_opt_label3.text = LANG[LANGUAGE]['settings_opt_label_3'];
		this.helpmenu_title1.text = LANG[LANGUAGE]['helpmenu_title'];

		// Delete Faktor Fields and Create it new with the new Language
		for(var c in this.faktorlables.children){
			this.faktorlables.children[c].kill();
		}
		var ybegin = this.helpbg.y + 103;
		var xbegin = this.helpbg.x + 40;
		var ypos = ybegin;
		var xpos = xbegin;
		for(var i = 1; i < 11; i++){
			if(i == 5 || i == 9){
				ypos += 140;
				xpos = xbegin;
			}
			this.CreateFaktorLabels(xpos, ypos, i);
			xpos += 345;
		}
		this.ValueMessage.text = '';
		$.jStorage.set("opt_language", LANGUAGE);
    },
    PressPlay: function(){
    	if(!this.play && !this.help && !this.settings){
            this.InitPlay();
            this.startbutton.tint = '0xcccccc';
        }
        else if(this.play && this.autoplay){
        	this.PressAutoplay();
        }
    },
    InitPlay: function(){
    	if(CREDITS >= BET || FS[BET_POS] > 0){
    		if(FS[BET_POS] > 0){
    			FS[BET_POS]--;
    		} else {
    			JACKPOT += BET / 100 * 1;
    			CREDITS -= BET;
    		}
			this.updateFS();
    		this.updateJACKPOT();
    		this.updateCREDITS();
            for(var i = 0; i < WLDATA.length; i++){
                this.winlines[i].visible = false;
            }
            this.play = true;
            this.jpwin = 0;
            this.jp_number = 0;
            this.nextCheckLine = 0;
            this.w1run_begin = 2;
            this.w2run_begin = 2;
            this.w3run_begin = 2;
            this.w4run_begin = 2;
            this.w5run_begin = 2;
            this.w1run = this.w1run_begin;
            this.w2run = this.w2run_begin;
            this.w3run = this.w3run_begin;
            this.w4run = this.w4run_begin;
            this.w5run = this.w5run_begin;
            this.walze1.y = 0;
            this.walze2.y = 0;
            this.walze3.y = 0;
            this.walze4.y = 0;
            this.walze5.y = 0;
            this.walze1.children[3].frameName = 'sym_'+this.game.rnd.between(1,10)+'.png';
            this.walze1.children[4].frameName = 'sym_'+this.game.rnd.between(1,10)+'.png';
            this.walze1.children[5].frameName = 'sym_'+this.game.rnd.between(1,10)+'.png';
            this.walze2.children[3].frameName = 'sym_'+this.game.rnd.between(1,10)+'.png';
            this.walze2.children[4].frameName = 'sym_'+this.game.rnd.between(1,10)+'.png';
            this.walze2.children[5].frameName = 'sym_'+this.game.rnd.between(1,10)+'.png';
            this.walze3.children[3].frameName = 'sym_'+this.game.rnd.between(1,10)+'.png';
            this.walze3.children[4].frameName = 'sym_'+this.game.rnd.between(1,10)+'.png';
            this.walze3.children[5].frameName = 'sym_'+this.game.rnd.between(1,10)+'.png';
            this.walze4.children[3].frameName = 'sym_'+this.game.rnd.between(1,10)+'.png';
            this.walze4.children[4].frameName = 'sym_'+this.game.rnd.between(1,10)+'.png';
            this.walze4.children[5].frameName = 'sym_'+this.game.rnd.between(1,10)+'.png';
            this.walze5.children[3].frameName = 'sym_'+this.game.rnd.between(1,10)+'.png';
            this.walze5.children[4].frameName = 'sym_'+this.game.rnd.between(1,10)+'.png';
            this.walze5.children[5].frameName = 'sym_'+this.game.rnd.between(1,10)+'.png';

            this.ValueMessage.text = LANG[LANGUAGE]['msg_play'];

            // Calculation Symbols
			this.ressyms = [];
            this.poolsyms = [];
            for(var i = 0; i <= 9; i++){
                for (var n = 0; n < CHANCES[i]['count']; n++){
                    this.poolsyms.push(i+1);
                }
            }
            for(var i = 0; i < 16; i++){
            	this.shuffle(this.poolsyms);
                this.ressyms.push(this.poolsyms[i]);
            }
            for(var i = 1; i <= 9; i++){
                if(this.game.rnd.between(0, PUSHER[i]['chance']) == 1){
                    for(var n = 0; n < this.ressyms.length; n++){
                        if(this.game.rnd.between(1,100) <= PUSHER[i]['percent']){
                            this.ressyms[n] = i;
                        }
                    }
                }
            }


			// for testing symbols
			/*
            this.ressyms = [];
            for(var i = 0; i <= 15; i++){
            	this.ressyms.push(8);
            }
			*/

            this.PlayWalze1();
            this.PlayWalze2();
            this.PlayWalze3();
            this.PlayWalze4();
            this.PlayWalze5();
		} else {
			this.ValueMessage.text = LANG[LANGUAGE]['msg_error_credits'];
		}
    },
    shuffle: function(array){
    	var currentIndex = array.length, temporaryValue, randomIndex ;
      	while (0 !== currentIndex) {
      		randomIndex = Math.floor(Math.random() * currentIndex);
        	currentIndex -= 1;
        	temporaryValue = array[currentIndex];
        	array[currentIndex] = array[randomIndex];
        	array[randomIndex] = temporaryValue;
      	}
      	return array;
    },
	number_format: function(number, decimals, decPoint, thousandsSep){
		number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
		var n = !isFinite(+number) ? 0 : +number
		var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
		var sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
		var dec = (typeof decPoint === 'undefined') ? '.' : decPoint
		var s = ''
		var toFixedFix = function (n, prec) {
			var k = Math.pow(10, prec)
			return '' + (Math.round(n * k) / k).toFixed(prec)
		}

		s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
		if (s[0].length > 3) {
			s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
		}
		if ((s[1] || '').length < prec) {
			s[1] = s[1] || ''
			s[1] += new Array(prec - s[1].length + 1).join('0')
		}
		return s.join(dec)
	},
    CoinAni: function(CheckLine){
    	this.coins = this.add.group();
    	this.nextCheckLine = CheckLine;
    	this.jpframe.visible = true;
    	this.CreateCoin();
    	this.coin_ani = true;
    },
    CreateCoin: function(){
    	var pos = this.game.world.randomX;
        this.coin = this.coins.create(pos, -80, 'basis', 'coin_01.png');
        if(pos + this.coin.width > this.game.world.width){
        	this.coin.y -= this.coin.width;
        }
        if(pos - this.coin.width < 0){
        	this.coin.y += this.coin.width;
        }
        this.coin.animations.add('idle', Phaser.Animation.generateFrameNames('coin_', 1, 6, '.png', 2), 20, true, false);
        this.coin.animations.play('idle');
        this.add.tween(this.coin).to({ y: this.game.height + 100 }, 2000, Phaser.Easing.Linear.None, true);
    },
    CheckCoin: function(sprite){
        if(sprite.y > this.game.height){
            this.coins.remove(sprite, true);
        }
    },
    GenerateHelpWinline: function(line){
    	var width = 17;
    	var height = 17;
    	var ypos = 0;
    	var xpos = 0;
    	var color = '#1c1a16';
    	wl = this.add.group();
    	for(var i = 0; i < 5; i++){
    		ypos = 0;
    		for(var n = 0; n < 3; n++){
    			if(WLDATA[line]['vpos'+(i+1)] - 0.5 == n){
    				color = '#f3e619';
    			} else {
    				color = '#1c4c6a';
    			}
                var sym = game.add.bitmapData(this.settingsbg_width, this.settingsbg_height);
                sym.ctx.beginPath();
                sym.ctx.rect(0, 0, width, height);
                sym.ctx.fillStyle = color;
                sym.ctx.fill();
                sym = this.game.add.sprite(xpos, ypos, sym);
                ypos += height + 2;
                wl.add(sym);
    		}
    		xpos += width + 2;
    	}
    	return wl;
    },
    GenerateLines: function(begin_pos, end_pos, sym_begin, sym_v, sym_v_steps, sym_pos, color, vpos1, vpos2, vpos3, vpos4, vpos5, vdif){
        var winl = this.add.graphics(begin_pos, sym_v);
        winl.lineStyle(10, '0x'+color, 0.8);
        winl.lineTo(this.sym_width * 0.5 + (sym_begin - begin_pos), this.sym_height * vpos1 - sym_v_steps * sym_pos + vdif);
        winl.lineTo(this.sym_width * 1.5 + (sym_begin - begin_pos), this.sym_height * vpos2 - sym_v_steps * sym_pos + vdif);
        winl.lineTo(this.sym_width * 2.5 + (sym_begin - begin_pos), this.sym_height * vpos3 - sym_v_steps * sym_pos + vdif);
        winl.lineTo(this.sym_width * 3.5 + (sym_begin - begin_pos), this.sym_height * vpos4 - sym_v_steps * sym_pos + vdif);
        winl.lineTo(this.sym_width * 4.5 + (sym_begin - begin_pos), this.sym_height * vpos5 - sym_v_steps * sym_pos + vdif);
        winl.lineTo(end_pos, 0);
        return winl;
    },
    PlayWalze1: function(){
    	if(DEBUGMODE === true){
    		console.log('play wheel 1');
    	}
    	var speed = 500;
    	var art = Phaser.Easing.Linear.None;
    	this.walze1.children[8].frameName = 'sym_'+this.ressyms[0]+'.png';
    	this.walze1.children[7].frameName = 'sym_'+this.ressyms[1]+'.png';
        this.walze1.children[6].frameName = 'sym_'+this.ressyms[2]+'.png';
    	this.walze1_ani = this.add.tween(this.walze1).to( { y: this.walze1.y+(this.sym_height*6) }, speed, art, true);
    	if(SFX === true){
    		this.walze1_ani.onStart.add(function(){this.WheelStartSFX.play('', 0, 1, true);},this);
    	}
    	this.walze1_ani.onComplete.add(function(){
    		if(this.w1run > 0){
                this.walze1.y = 0;
                this.w1run--;
                this.PlayWalze1();
    		} else {
                if(SFX === true){
                    this.WheelStopSFX.play();
                }
                this.walze1.children[2].frameName = 'sym_'+this.ressyms[0]+'.png';
                this.walze1.children[1].frameName = 'sym_'+this.ressyms[1]+'.png';
                this.walze1.children[0].frameName = 'sym_'+this.ressyms[2]+'.png';
                if(this.ressyms[0] == 9 || this.ressyms[1] == 9 || this.ressyms[2] == 9){
                	this.w2run += 1;
                	this.w2run_begin += 1;
                	this.w3run += 5;
                	this.w3run_begin += 5;
                	this.w4run += 5;
                	this.w4run_begin += 5;
                	this.w5run += 5;
                	this.w5run_begin += 5;
                }
            }
    	},this);
    },
    PlayWalze2: function(){
    	if(DEBUGMODE === true){
    		console.log('play wheel 2');
    	}
    	var speed = 500;
    	var delay = 0;
    	if(this.w2run == this.w2run_begin){
    		var delay = 400;
    	}
    	var art = Phaser.Easing.Linear.None;
    	this.walze2.children[8].frameName = 'sym_'+this.ressyms[3]+'.png';
    	this.walze2.children[7].frameName = 'sym_'+this.ressyms[4]+'.png';
        this.walze2.children[6].frameName = 'sym_'+this.ressyms[5]+'.png';
    	this.walze2_ani = this.add.tween(this.walze2).to( { y: this.walze2.y+(this.sym_height*6) }, speed, art, true, delay);
    	this.walze2_ani.onComplete.add(function(){
    		if(this.w2run > 0){
                this.walze2.y = 0;
                this.w2run--;
                this.PlayWalze2();
    		} else {
                if(SFX === true){
                    this.WheelStopSFX.play();
                }
                this.walze2.children[2].frameName = 'sym_'+this.ressyms[3]+'.png';
                this.walze2.children[1].frameName = 'sym_'+this.ressyms[4]+'.png';
                this.walze2.children[0].frameName = 'sym_'+this.ressyms[5]+'.png';
            }
    	},this);
    },
    PlayWalze3: function(){
    	if(DEBUGMODE === true){
    		console.log('play wheel 3');
    	}
    	var speed = 500;
    	var delay = 0;
    	if(this.w3run == this.w3run_begin){
    		var delay = 1000;
    	}
    	var art = Phaser.Easing.Linear.None;
    	this.walze3.children[8].frameName = 'sym_'+this.ressyms[6]+'.png';
    	this.walze3.children[7].frameName = 'sym_'+this.ressyms[7]+'.png';
        this.walze3.children[6].frameName = 'sym_'+this.ressyms[8]+'.png';
    	this.walze3_ani = this.add.tween(this.walze3).to( { y: this.walze3.y+(this.sym_height*6) }, speed, art, true, delay);
    	this.walze3_ani.onComplete.add(function(){
    		if(this.w3run > 0){
                this.walze3.y = 0;
                this.w3run--;
                this.PlayWalze3();
    		} else {
                if(SFX === true){
                    this.WheelStopSFX.play();
                }
                this.walze3.children[2].frameName = 'sym_'+this.ressyms[6]+'.png';
                this.walze3.children[1].frameName = 'sym_'+this.ressyms[7]+'.png';
                this.walze3.children[0].frameName = 'sym_'+this.ressyms[8]+'.png';
                if((this.ressyms[0] == 9 || this.ressyms[1] == 9 || this.ressyms[2] == 9) && (this.ressyms[6] == 9 || this.ressyms[7] == 9 || this.ressyms[8] == 9)){
                	this.w4run += 1;
                	this.w4run_begin += 1;
                	this.w5run += 7;
                	this.w5run_begin += 7;
                }
            }
    	},this);
    },
    PlayWalze4: function(){
    	if(DEBUGMODE === true){
    		console.log('play wheel 4');
    	}
    	var speed = 500;
    	var delay = 0;
    	if(this.w4run == this.w4run_begin){
    		var delay = 1500;
    	}
    	var art = Phaser.Easing.Linear.None;
    	this.walze4.children[8].frameName = 'sym_'+this.ressyms[9]+'.png';
    	this.walze4.children[7].frameName = 'sym_'+this.ressyms[10]+'.png';
        this.walze4.children[6].frameName = 'sym_'+this.ressyms[11]+'.png';
    	this.walze4_ani = this.add.tween(this.walze4).to( { y: this.walze4.y+(this.sym_height*6) }, speed, art, true, delay);
    	this.walze4_ani.onComplete.add(function(){
    		if(this.w4run > 0){
                this.walze4.y = 0;
                this.w4run--;
                this.PlayWalze4();
    		} else {
                if(SFX === true){
                    this.WheelStopSFX.play();
                }
                this.walze4.children[2].frameName = 'sym_'+this.ressyms[9]+'.png';
                this.walze4.children[1].frameName = 'sym_'+this.ressyms[10]+'.png';
                this.walze4.children[0].frameName = 'sym_'+this.ressyms[11]+'.png';
			}
    	},this);
    },
    PlayWalze5: function(){
    	if(DEBUGMODE === true){
    		console.log('play wheel 5');
    	}
    	var speed = 500;
    	var delay = 0;
    	if(this.w5run == this.w5run_begin){
    		var delay = 2000;
    	}
    	var art = Phaser.Easing.Linear.None;
    	this.walze5.children[8].frameName = 'sym_'+this.ressyms[12]+'.png';
    	this.walze5.children[7].frameName = 'sym_'+this.ressyms[13]+'.png';
        this.walze5.children[6].frameName = 'sym_'+this.ressyms[14]+'.png';
    	this.walze5_ani = this.add.tween(this.walze5).to( { y: this.walze5.y+(this.sym_height*6) }, speed, art, true, delay);
    	this.walze5_ani.onComplete.add(function(){
    		if(this.w5run > 0){
                this.walze5.y = 0;
                this.w5run--;
                this.PlayWalze5();
    		} else {
                this.walze5.children[2].frameName = 'sym_'+this.ressyms[12]+'.png';
                this.walze5.children[1].frameName = 'sym_'+this.ressyms[13]+'.png';
                this.walze5.children[0].frameName = 'sym_'+this.ressyms[14]+'.png';
                if(SFX === true){
                	this.WheelStartSFX.stop();
                    this.WheelStopSFX.play();
                }
                this.CallEventTimer = this.time.events.add(Phaser.Timer.SECOND, function(){
                    this.CheckWinlines(0);
                }, this);
			}
    	},this);
    },
    CheckWinlines: function(CheckLine){
    	var win = 0;
    	var match = 0;
    	var isJP = false;
    	if(this.walze1.children[this.Reverse(WLDATA[CheckLine].vpos1 - 0.5)].frameName == this.walze2.children[this.Reverse(WLDATA[CheckLine].vpos2 - 0.5)].frameName &&
    		this.walze2.children[this.Reverse(WLDATA[CheckLine].vpos2 - 0.5)].frameName == this.walze3.children[this.Reverse(WLDATA[CheckLine].vpos3 - 0.5)].frameName &&
    		this.walze3.children[this.Reverse(WLDATA[CheckLine].vpos3 - 0.5)].frameName == this.walze4.children[this.Reverse(WLDATA[CheckLine].vpos4 - 0.5)].frameName &&
    		this.walze4.children[this.Reverse(WLDATA[CheckLine].vpos4 - 0.5)].frameName == this.walze5.children[this.Reverse(WLDATA[CheckLine].vpos5 - 0.5)].frameName &&
    		this.walze1.children[this.Reverse(WLDATA[CheckLine].vpos1 - 0.5)].frameName != 'sym_9.png'
    	){
    		match = 5;
    	}
    	else if(this.walze1.children[this.Reverse(WLDATA[CheckLine].vpos1 - 0.5)].frameName == this.walze2.children[this.Reverse(WLDATA[CheckLine].vpos2 - 0.5)].frameName &&
    		this.walze2.children[this.Reverse(WLDATA[CheckLine].vpos2 - 0.5)].frameName == this.walze3.children[this.Reverse(WLDATA[CheckLine].vpos3 - 0.5)].frameName &&
    		this.walze3.children[this.Reverse(WLDATA[CheckLine].vpos3 - 0.5)].frameName == this.walze4.children[this.Reverse(WLDATA[CheckLine].vpos4 - 0.5)].frameName &&
    		this.walze1.children[this.Reverse(WLDATA[CheckLine].vpos1 - 0.5)].frameName != 'sym_10.png' &&
    		this.walze1.children[this.Reverse(WLDATA[CheckLine].vpos1 - 0.5)].frameName != 'sym_9.png'
    	){
			match = 4;
    	}
    	else if(this.walze1.children[this.Reverse(WLDATA[CheckLine].vpos1 - 0.5)].frameName == this.walze2.children[this.Reverse(WLDATA[CheckLine].vpos2 - 0.5)].frameName &&
    		this.walze2.children[this.Reverse(WLDATA[CheckLine].vpos2 - 0.5)].frameName == this.walze3.children[this.Reverse(WLDATA[CheckLine].vpos3 - 0.5)].frameName &&
    		this.walze1.children[this.Reverse(WLDATA[CheckLine].vpos1 - 0.5)].frameName != 'sym_10.png' &&
    		this.walze1.children[this.Reverse(WLDATA[CheckLine].vpos1 - 0.5)].frameName != 'sym_9.png'
    	){
			match = 3;
    	}
    	if(match > 0){
    		var winsym = this.GetSymbolNumber(this.walze1.children[this.Reverse(WLDATA[CheckLine].vpos1 - 0.5)].frameName);
    		if(winsym == 10 && match == 5 && JACKPOT > 0){
                if(SFX === true){
                    this.WinJackpotSFX.play();
                }
                win = JACKPOT;
                JACKPOT = 0;
                this.updateJACKPOT();
                isJP = true;
                this.jpwin = win;
    		}
    		else if(winsym != 10){
    			if(SFX === true){
    				this.WinNormalSFX.play();
    			}
    			win = SYM_FAKTORS[winsym-1]['match_'+match] * BET;
			} else {
				win = 0;
			}
    		if(DEBUGMODE === true){
    			console.log('match: ' + match);
    			console.log('winsymbol: ' + winsym);
    			console.log('on line: ' + CheckLine);
    			console.log('win: ' +win);
    		}
			if(this.number_format(win) != 0){
                this.walze1.children[this.Reverse(WLDATA[CheckLine].vpos1 - 0.5) + 6].animations.play('sym_' + winsym);
                this.walze2.children[this.Reverse(WLDATA[CheckLine].vpos2 - 0.5) + 6].animations.play('sym_' + winsym);
                this.walze3.children[this.Reverse(WLDATA[CheckLine].vpos3 - 0.5) + 6].animations.play('sym_' + winsym);
                if(match > 3){
                    this.walze4.children[this.Reverse(WLDATA[CheckLine].vpos4 - 0.5) + 6].animations.play('sym_' + winsym);
                    if(match > 4){
                        this.walze5.children[this.Reverse(WLDATA[CheckLine].vpos5 - 0.5) + 6].animations.play('sym_' + winsym);
                    }
                }
                this.c_win += win;
                CREDITS += win;
                this.updateCREDITS();

				this.winlines[WLDATA[CheckLine].line].visible = true;
				if(isJP === true){
					this.CoinAni(CheckLine);
					this.ValueMessage.text = LANG[LANGUAGE]['msg_win_jp'] + ' ' + this.number_format(win, DECIMAL, ',', '');
				} else {
					this.ValueMessage.text = LANG[LANGUAGE]['msg_win'] + ' ' + this.number_format(win, DECIMAL, ',', '');
                    this.CallEventTimer = this.time.events.add(Phaser.Timer.SECOND * 3, function(){
                        this.winlines[WLDATA[CheckLine].line].visible = false;
                        this.CheckWinlines_finish(CheckLine);
                    }, this);
				}
    		} else {
				this.CheckWinlines_finish(CheckLine);
			}
    	} else {
    		this.CheckWinlines_finish(CheckLine);
    	}
    },
    GetSymbolNumber: function(name){
    	if(name.length > 9){
    		name = name.slice(4, 6);
    	} else {
    		name = name.slice(4, 5);
    	}
    	return name;
    },
    CheckWinlines_finish: function(CheckLine){
        CheckLine++;
        if(CheckLine < WLDATA.length){
            this.CheckWinlines(CheckLine);
        } else {
    		this.FSCheck();
    	}
    },
    Reverse: function(number){
    	if(number == 2){
    		number = 0;
    	}
    	else if(number == 0){
    		number = 2;
    	}
    	return number;
    },
    FSCheck: function(){
    	this.scatter_win = 0;
    	var scatter = 0;
    	var match = 0;
    	if(this.walze1.children[0].frameName == 'sym_9.png' || this.walze1.children[1].frameName == 'sym_9.png' || this.walze1.children[2].frameName == 'sym_9.png'){
    		scatter++;
    	}
    	if(this.walze3.children[0].frameName == 'sym_9.png' || this.walze3.children[1].frameName == 'sym_9.png' || this.walze3.children[2].frameName == 'sym_9.png'){
    		scatter++;
    	}
    	if(this.walze5.children[0].frameName == 'sym_9.png' || this.walze5.children[1].frameName == 'sym_9.png' || this.walze5.children[2].frameName == 'sym_9.png'){
    		scatter++;
    	}
    	if(scatter > 2){
            if(SFX === true){
                this.WinFreegamesSFX.play();
            }
            if(this.walze1.children[0].frameName == 'sym_9.png'){
                this.walze1.children[6].animations.play('sym_9');
            }
            else if(this.walze1.children[1].frameName == 'sym_9.png'){
                this.walze1.children[7].animations.play('sym_9');
            }
            else if(this.walze1.children[2].frameName == 'sym_9.png'){
                this.walze1.children[8].animations.play('sym_9');
            }
            if(this.walze3.children[0].frameName == 'sym_9.png'){
                this.walze3.children[6].animations.play('sym_9');
            }
            else if(this.walze3.children[1].frameName == 'sym_9.png'){
                this.walze3.children[7].animations.play('sym_9');
            }
            else if(this.walze3.children[2].frameName == 'sym_9.png'){
                this.walze3.children[8].animations.play('sym_9');
            }
            if(this.walze5.children[0].frameName == 'sym_9.png'){
                this.walze5.children[6].animations.play('sym_9');
            }
            else if(this.walze5.children[1].frameName == 'sym_9.png'){
                this.walze5.children[7].animations.play('sym_9');
            }
            else if(this.walze5.children[2].frameName == 'sym_9.png'){
                this.walze5.children[8].animations.play('sym_9');
            }
            this.scatter_win = SYM_FAKTORS[8]['match_'+scatter];
            FS[BET_POS] += this.scatter_win;
            this.updateFS();
			this.ValueMessage.text = LANG[LANGUAGE]['msg_scatterwin_1'] + ' ' + this.number_format(this.scatter_win, DECIMAL, ',', '') + ' ' + LANG[LANGUAGE]['msg_scatterwin_2'];
			this.initFinishGame();
    	} else {
    		this.initFinishGame();
    	}
    },
    initFinishGame: function(){
    	if(this.c_win > 0){
    		addwin = '';
    		if(this.scatter_win > 0){
    			addwin = LANG[LANGUAGE]['msg_scatterwin_1'] + ' ' + this.number_format(this.scatter_win, DECIMAL, ',', '') + ' ' + LANG[LANGUAGE]['msg_scatterwin_2'];
    		}
    		this.ValueMessage.text = LANG[LANGUAGE]['msg_totalwin'] + ' ' + this.number_format(this.c_win, DECIMAL, ',', '')+ ' ' + addwin;
    		this.c_win = 0;
    	}
    	else if(this.scatter_win > 0){
    		this.ValueMessage.text = LANG[LANGUAGE]['msg_scatterwin_1'] + ' ' + this.number_format(this.scatter_win, DECIMAL, ',', '') + ' ' + LANG[LANGUAGE]['msg_scatterwin_2'];
    	} else {
    		this.ValueMessage.text = LANG[LANGUAGE]['msg_nowins'];

    	}
    	this.time.events.add(Phaser.Timer.SECOND, this.FinishGame, this);
    },
    FinishGame: function(){
    	if(JACKPOT == 0){
    		JACKPOT = BEGIN_JACKPOT;
    		this.updateJACKPOT();
    	}
    	if(this.autoplay === true){
    		this.InitPlay();
    	} else {
    		this.play = false;
    		this.startbutton.tint = '0xffffff';
    	}
    },
    updateCREDITS: function(){
    	$.jStorage.set("user_credits", CREDITS);
    	this.ValueCredits.text = this.number_format(CREDITS, DECIMAL, ',', '');
    },
    updateFS: function(){
    	$.jStorage.set("user_fs", FS);
    	this.ValueFs.text = this.number_format(FS[BET_POS], DECIMAL, ',', '');
    },
    updateJACKPOT: function(){
    	$.jStorage.set("user_jackpot", JACKPOT);
    	this.ValueJackpot.text = this.number_format(JACKPOT, DECIMAL, ',', '');
    },
    updateParalax: function(){
        this.paralax1.x = this.game.input.mousePointer.x * 0.05 + 800;
        this.paralax1.y = this.game.input.mousePointer.y * 0.05 + 400;
        this.paralax2.x = this.game.input.mousePointer.x * 0.1 + 800;
        this.paralax2.y = this.game.input.mousePointer.y * 0.1 + 400;
        this.paralax3.x = this.game.input.mousePointer.x * 0.10 + 400;
        this.paralax3.y = this.game.input.mousePointer.y * 0.10 + 450;
        this.paralax4.x = this.game.input.mousePointer.x * 0.15 + 440;
        this.paralax4.y = this.game.input.mousePointer.y * 0.15 + 450;
        this.paralax5.x = this.game.input.mousePointer.x * 0.2 + 1100;
        this.paralax5.y = this.game.input.mousePointer.y * 0.2 + 650;
    },
    RoboAction: function(){
    	var rand = this.game.rnd.between(0, this.RoboRand.length);
    	console.log('rand');
    	if(rand != 0){
        	this.robot.animations.play(this.RoboRand[rand]);
    	}
    },
    update: function(){
		this.updateParalax();

        if(this.game.scale.isFullScreen){
            this.settings_fullscreen_button.frameName = 'btn_opt_activ.png';
        } else {
            this.settings_fullscreen_button.frameName = 'btn_opt_normal.png';
        }
		if(this.coin_ani === true){
			var r = Math.round(this.jpwin / 500);
			if(r < 1){
				r = 1;
			}
			if(this.jp_number + r < this.jpwin){
				this.jp_number += r;
				this.jpwin_field.text = this.number_format(this.jp_number, DECIMAL, ',', '');
			} else {
				this.jpwin_field.text = this.number_format(this.jpwin, DECIMAL, ',', '');
				this.coin_ani = false;
                this.CallEventTimer = this.time.events.add(Phaser.Timer.SECOND * 2, function(){
                    this.winlines[WLDATA[this.nextCheckLine].line].visible = false;
                    this.CheckWinlines_finish(this.nextCheckLine);
                    this.jpframe.visible = false;
                }, this);
			}
    		this.coins.setAll('y', 10, true, true, 1);
    		this.coins.forEach(this.CheckCoin, this, true);
    		if(this.coin_ani_c >= 7){
    			this.game.time.events.add(1000, this.CreateCoin, this);
    			this.coin_ani_c = 0;
    		} else {
    			this.coin_ani_c++;
    		}
		}
    }
}

var game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'game');
game.state.add('GameLoad', BasicGame.GameLoad);
game.state.add('Game', BasicGame.Game);
game.state.start('GameLoad');