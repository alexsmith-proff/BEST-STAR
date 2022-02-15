////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW=0;
var canvasH=0;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 
 */
function initGameCanvas(w,h){
	var gameCanvas = document.getElementById("gameCanvas");
	gameCanvas.width = w;
	gameCanvas.height = h;
	
	canvasW=w;
	canvasH=h;
	stage = new createjs.Stage("gameCanvas");
	
	createjs.Touch.enable(stage);
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = true;
	
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", tick);	
}

var guide = false;
var canvasContainer, mainContainer, gameContainer, resultContainer;
var guideline, logo, buttonStart, buttonContinue, buttonFacebook, buttonTwitter, buttonWhatsapp, buttonFullscreen, buttonSoundOn, buttonSoundOff;

$.columnMask = [];
$.slots = [];
$.slotsWinFrame = [];
$.lines = [];

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas(){
	canvasContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	gameContainer = new createjs.Container();
	infoContainer = new createjs.Container();
	linesContainer = new createjs.Container();
	slotContainer = new createjs.Container();
	slotWinContainer = new createjs.Container();
	slotWinFrameContainer = new createjs.Container();
	confirmContainer = new createjs.Container();
	optionsContainer = new createjs.Container();
	resultContainer = new createjs.Container();
	
	logo = new createjs.Bitmap(loader.getResult('logo'));
	
	buttonStart = new createjs.Bitmap(loader.getResult('buttonStart'));
	centerReg(buttonStart);
	buttonStart.x = canvasW/2;
	buttonStart.y = canvasH/100 * 80;
	
	//game
	for(var n = 0; n<slots_arr.length; n++){
		$.slots[n] = new createjs.Bitmap(loader.getResult('slot'+n));
		centerReg($.slots[n]);
		$.slots[n].x = -500;
		
		var _frameW = slotSettings.width;
		var _frameH = slotSettings.height;
		var _frame = {"regX": _frameW/2, "regY": _frameH/2, "height": _frameH, "count": 10, "width": _frameW};
		var _animations = {static:{frames: [0], speed:1},
						   animate:{frames: [0,1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2,1,0], speed:1}};

		var itemSlotData = new createjs.SpriteSheet({
			"images": [loader.getResult('slotAnimate'+n).src],
			"frames": _frame,
			"animations": _animations
		});

		$.slots['animate'+n] = new createjs.Sprite(itemSlotData, "static");
		$.slots['animate'+n].framerate = 20;
		$.slots['animate'+n].x = -200;
		
		gameContainer.addChild($.slots[n], $.slots['animate'+n]);
	}
	
	itemMachine = new createjs.Bitmap(loader.getResult('itemMachine'));
	itemShadow = new createjs.Bitmap(loader.getResult('itemShadow'));
	
	buttonInfo = new createjs.Bitmap(loader.getResult('buttonInfo'));
	centerReg(buttonInfo);
	
	buttonLines = new createjs.Bitmap(loader.getResult('buttonLines'));
	centerReg(buttonLines);
	
	buttonBet = new createjs.Bitmap(loader.getResult('buttonBet'));
	centerReg(buttonBet);
	
	buttonMaxBet = new createjs.Bitmap(loader.getResult('buttonMaxBet'));
	centerReg(buttonMaxBet);
	
	buttonSpin = new createjs.Bitmap(loader.getResult('buttonSpin'));
	centerReg(buttonSpin);
	
	itemDisplayLines = new createjs.Bitmap(loader.getResult('itemDisplay'));
	centerReg(itemDisplayLines);
	
	itemDisplayBet = new createjs.Bitmap(loader.getResult('itemDisplay'));
	centerReg(itemDisplayBet);
	
	itemDisplayMaxBet = new createjs.Bitmap(loader.getResult('itemDisplay'));
	centerReg(itemDisplayMaxBet);
	
	itemDisplaySpin = new createjs.Bitmap(loader.getResult('itemDisplay'));
	centerReg(itemDisplaySpin);
	
	linesTxt = new createjs.Text();
	linesTxt.font = "30px bebas_neueregular";
	linesTxt.color = "#fff";
	linesTxt.textAlign = "center";
	linesTxt.textBaseline='alphabetic';
	linesTxt.text = 0;
	
	betTxt = new createjs.Text();
	betTxt.font = "30px bebas_neueregular";
	betTxt.color = "#fff";
	betTxt.textAlign = "center";
	betTxt.textBaseline='alphabetic';
	betTxt.text = 0;
	
	maxBetTxt = new createjs.Text();
	maxBetTxt.font = "30px bebas_neueregular";
	maxBetTxt.color = "#fff";
	maxBetTxt.textAlign = "center";
	maxBetTxt.textBaseline='alphabetic';
	maxBetTxt.text = 0;
	
	spinTxt = new createjs.Text();
	spinTxt.font = "30px bebas_neueregular";
	spinTxt.color = "#fff";
	spinTxt.textAlign = "center";
	spinTxt.textBaseline='alphabetic';
	spinTxt.text = 0;
	
	itemCredit = new createjs.Bitmap(loader.getResult('itemCredit'));
	centerReg(itemCredit);
	itemCreditAlert = new createjs.Bitmap(loader.getResult('itemCreditAlert'));
	centerReg(itemCreditAlert);
	itemCredit.x = itemCreditAlert.x = canvasW/2;
	itemCredit.y = itemCreditAlert.y = layoutPos.creditY;
	
	
	var _frameW = 348;
	var _frameH = 71;
	var _frame = {"regX": _frameW/2, "regY": _frameH/2, "height": _frameH, "count": 5, "width": _frameW};
	var _animations = {animate:{frames: [0,1,2,3,4], speed:1}};
						
	itemCreditData = new createjs.SpriteSheet({
		"images": [loader.getResult('itemCreditAnimate').src],
		"frames": _frame,
		"animations": _animations
	});
	
	itemCreditAnimate = new createjs.Sprite(itemCreditData, "animate");
	itemCreditAnimate.framerate = 20;
	itemCreditAnimate.x = canvasW/2;
	itemCreditAnimate.y = layoutPos.creditY;
	
	
	creditTxt = new createjs.Text();
	creditTxt.font = "35px bebas_neueregular";
	creditTxt.color = "#fff";
	creditTxt.textAlign = "center";
	creditTxt.textBaseline='alphabetic';
	creditTxt.text = 0;
	creditTxt.x = itemCredit.x;
	creditTxt.y = itemCredit.y+10;
	
	var objPos_arr = [buttonInfo, buttonLines, buttonBet, buttonMaxBet, buttonSpin];
	var objDisplayPos_arr = [null, itemDisplayLines, itemDisplayBet, itemDisplayMaxBet, itemDisplaySpin];
	var objTextPos_arr = [null, linesTxt, betTxt, maxBetTxt, spinTxt];
	
	if(lines_arr.length <= 1){
		buttonLines.visible = itemDisplayLines.visible = linesTxt.visible = false;
		var objPos_arr = [buttonInfo, buttonBet, buttonMaxBet, buttonSpin];
		var objDisplayPos_arr = [null, itemDisplayBet, itemDisplayMaxBet, itemDisplaySpin];
		var objTextPos_arr = [null, betTxt, maxBetTxt, spinTxt];	
	}
	
	var spacing = 10;
	var startX = 0;
	var startY = 0;
	var currentX = 0;
	var currentY = 0;
	
	var totalW = 0;
	
	for(var n=0; n<objPos_arr.length; n++){
		var curObj = objPos_arr[n];
		totalW += curObj.image.naturalWidth + spacing;
	}
	totalW -= objPos_arr[0].image.naturalWidth/2;
	totalW -= objPos_arr[objPos_arr.length-1].image.naturalWidth/2;
	totalW -= spacing;
	
	startX = canvasW/2 - (totalW/2);
	currentX = startX;
	currentY = layoutPos.buttonY;
	
	for(var n=0; n<objPos_arr.length; n++){
		var curObj = objPos_arr[n];
		
		if(n!= 0){
			currentX += (curObj.image.naturalWidth/2);
		}
		
		curObj.x = currentX;
		curObj.y = currentY;
		
		if(objDisplayPos_arr[n] != null){
			objDisplayPos_arr[n].x = currentX;
			objDisplayPos_arr[n].y = currentY-43;
		}
		
		if(objTextPos_arr[n] != null){
			objTextPos_arr[n].x = currentX;
			objTextPos_arr[n].y = currentY-43;
		}
		
		currentX += (curObj.image.naturalWidth/2) + spacing;
	}
	
	var _frameW = slotSettings.width;
	var _frameH = slotSettings.height;
	var _frame = {"regX": _frameW/2, "regY": _frameH/2, "height": _frameH, "count": 5, "width": _frameW};
	var _animations = {animate:{frames: [0,1,2,3,4], speed:1}};
						
	itemSlotFrameData = new createjs.SpriteSheet({
		"images": [loader.getResult('itemSlotFrame').src],
		"frames": _frame,
		"animations": _animations
	});
	
	itemSlotFrameAnimate = new createjs.Sprite(itemSlotFrameData, "animate");
	itemSlotFrameAnimate.framerate = 20;
	itemSlotFrameAnimate.x = -200;
	
	var _frameW = 60;
	var _frameH = 250;
	var _frame = {"regX": _frameW/2, "regY": _frameH/2, "height": _frameH, "count": 5, "width": _frameW};
	var _animations = {static:{frames: [0], speed:1},
					  animate:{frames: [0,1,2,3,4,3,2,1,0], speed:1, next:'static'}};
						
	itemHandleData = new createjs.SpriteSheet({
		"images": [loader.getResult('itemHandle').src],
		"frames": _frame,
		"animations": _animations
	});
	
	itemHandleAnimate = new createjs.Sprite(itemHandleData, "static");
	itemHandleAnimate.framerate = 20;
	itemHandleAnimate.x = canvasW/100 * 89;
	itemHandleAnimate.y = canvasH/100 * 42;
	
	//lines
	for(var n = 0; n<lines_arr.length; n++){
		$.lines['line'+n] = new createjs.Shape();
		if(lines_arr[n].path.length > 0){
		
			//shadow
			$.lines['line'+n].graphics.setStrokeStyle(lineSettings.stroke).beginStroke(lines_arr[n].shadow).moveTo(lines_arr[n].path[0].x, lines_arr[n].path[0].y+lineSettings.shadowY);
			for(var l = 0; l<lines_arr[n].path.length; l++){
				$.lines['line'+n].graphics.lineTo(lines_arr[n].path[l].x, lines_arr[n].path[l].y+lineSettings.shadowY);
			}
			$.lines['line'+n].graphics.endStroke();
			
			//stroke
			$.lines['line'+n].graphics.setStrokeStyle(lineSettings.stroke).beginStroke(lines_arr[n].color).moveTo(lines_arr[n].path[0].x, lines_arr[n].path[0].y);
			for(var l = 0; l<lines_arr[n].path.length; l++){
				$.lines['line'+n].graphics.lineTo(lines_arr[n].path[l].x, lines_arr[n].path[l].y);
			}
			$.lines['line'+n].graphics.endStroke();
		}
		
		linesContainer.addChild($.lines['line'+n]);
		
		for(var l = 0; l<lines_arr[n].sign.length; l++){
			$.lines['lineOn'+n+'_'+l] = new createjs.Bitmap(loader.getResult('itemLineDisplayOn'));
			centerReg($.lines['lineOn'+n+'_'+l]);
			$.lines['lineOn'+n+'_'+l].x = lines_arr[n].sign[l].x;
			$.lines['lineOn'+n+'_'+l].y = lines_arr[n].sign[l].y;
			
			$.lines['lineOff'+n+'_'+l] = new createjs.Bitmap(loader.getResult('itemLineDisplayOff'));
			centerReg($.lines['lineOff'+n+'_'+l]);
			$.lines['lineOff'+n+'_'+l].x = lines_arr[n].sign[l].x;
			$.lines['lineOff'+n+'_'+l].y = lines_arr[n].sign[l].y;
			
			$.lines['lineText'+n+'_'+l] = new createjs.Text();
			$.lines['lineText'+n+'_'+l].font = "25px bebas_neueregular";
			$.lines['lineText'+n+'_'+l].color = "#fff";
			$.lines['lineText'+n+'_'+l].textAlign = "center";
			$.lines['lineText'+n+'_'+l].textBaseline='alphabetic';
			$.lines['lineText'+n+'_'+l].text = n+1;
			$.lines['lineText'+n+'_'+l].x = lines_arr[n].sign[l].x;
			$.lines['lineText'+n+'_'+l].y = lines_arr[n].sign[l].y+10;
			
			if(lineSettings.sign){
				linesContainer.addChild($.lines['lineOn'+n+'_'+l], $.lines['lineOff'+n+'_'+l]);
			}
			if(lineSettings.number){
				linesContainer.addChild($.lines['lineText'+n+'_'+l]);	
			}
		}
	}
	
	//info
	itemInfo = new createjs.Bitmap(loader.getResult('itemInfo'));
	buttonClose = new createjs.Bitmap(loader.getResult('buttonClose'));
	centerReg(buttonClose);
	buttonClose.x = canvasW/2;
	buttonClose.y = canvasH/100 * 80;
	
	infoContainer.addChild(itemInfo, buttonClose);
	
	//result
	itemResult = new createjs.Bitmap(loader.getResult('itemResult'));
	
	resultTitleTxt = new createjs.Text();
	resultTitleTxt.font = "60px bebas_neueregular";
	resultTitleTxt.color = "#652312";
	resultTitleTxt.textAlign = "center";
	resultTitleTxt.textBaseline='alphabetic';
	resultTitleTxt.text = resultTitleText;
	resultTitleTxt.x = canvasW/2;
	resultTitleTxt.y = canvasH/100 * 33;
	
	resultScoreTxt = new createjs.Text();
	resultScoreTxt.font = "100px bebas_neueregular";
	resultScoreTxt.color = "#ff7900";
	resultScoreTxt.textAlign = "center";
	resultScoreTxt.textBaseline='alphabetic';
	resultScoreTxt.text = 'CREDIT : $500';
	resultScoreTxt.x = canvasW/2;
	resultScoreTxt.y = canvasH/100 * 45;
	
	resultShareTxt = new createjs.Text();
	resultShareTxt.font = "30px bebas_neueregular";
	resultShareTxt.color = "#5e5e5e";
	resultShareTxt.textAlign = "center";
	resultShareTxt.textBaseline='alphabetic';
	resultShareTxt.text = shareText;
	resultShareTxt.x = canvasW/2;
	resultShareTxt.y = canvasH/100 * 52;
	
	buttonFacebook = new createjs.Bitmap(loader.getResult('buttonFacebook'));
	buttonTwitter = new createjs.Bitmap(loader.getResult('buttonTwitter'));
	buttonWhatsapp = new createjs.Bitmap(loader.getResult('buttonWhatsapp'));
	centerReg(buttonFacebook);
	createHitarea(buttonFacebook);
	centerReg(buttonTwitter);
	createHitarea(buttonTwitter);
	centerReg(buttonWhatsapp);
	createHitarea(buttonWhatsapp);
	buttonFacebook.x = canvasW/100 * 42;
	buttonTwitter.x = canvasW/2;
	buttonWhatsapp.x = canvasW/100 * 58;
	buttonFacebook.y = buttonTwitter.y = buttonWhatsapp.y = canvasH/100*58;
	
	buttonContinue = new createjs.Bitmap(loader.getResult('buttonContinue'));
	centerReg(buttonContinue);
	createHitarea(buttonContinue);
	buttonContinue.x = canvasW/2;
	buttonContinue.y = canvasH/100 * 70;
	
	//option
	buttonFullscreen = new createjs.Bitmap(loader.getResult('buttonFullscreen'));
	centerReg(buttonFullscreen);
	buttonSoundOn = new createjs.Bitmap(loader.getResult('buttonSoundOn'));
	centerReg(buttonSoundOn);
	buttonSoundOff = new createjs.Bitmap(loader.getResult('buttonSoundOff'));
	centerReg(buttonSoundOff);
	buttonSoundOn.visible = false;
	buttonExit = new createjs.Bitmap(loader.getResult('buttonExit'));
	centerReg(buttonExit);
	buttonSettings = new createjs.Bitmap(loader.getResult('buttonSettings'));
	centerReg(buttonSettings);
	
	createHitarea(buttonFullscreen);
	createHitarea(buttonSoundOn);
	createHitarea(buttonSoundOff);
	createHitarea(buttonExit);
	createHitarea(buttonSettings);
	
	//exit
	itemExit = new createjs.Bitmap(loader.getResult('itemExit'));
	itemExit.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, itemExit.image.naturalWidth, itemExit.image.naturalHeight));
	
	buttonConfirm = new createjs.Bitmap(loader.getResult('buttonConfirm'));
	centerReg(buttonConfirm);
	buttonConfirm.x = canvasW/100* 42;
	buttonConfirm.y = canvasH/100 * 65;
	
	buttonCancel = new createjs.Bitmap(loader.getResult('buttonCancel'));
	centerReg(buttonCancel);
	buttonCancel.x = canvasW/100 * 58;
	buttonCancel.y = canvasH/100 * 65;
	
	confirmMessageTxt = new createjs.Text();
	confirmMessageTxt.font = "50px bebas_neueregular";
	confirmMessageTxt.color = "#652312";
	confirmMessageTxt.textAlign = "center";
	confirmMessageTxt.textBaseline='alphabetic';
	confirmMessageTxt.text = exitMessage;
	confirmMessageTxt.lineHeight = 50;
	confirmMessageTxt.x = canvasW/2;
	confirmMessageTxt.y = canvasH/100 *45;
	
	confirmContainer.addChild(itemExit, buttonConfirm, buttonCancel, confirmMessageTxt);
	confirmContainer.visible = false;
	
	if(guide){
		guideline = new createjs.Shape();	
		guideline.graphics.setStrokeStyle(2).beginStroke('red').drawRect((stageW-contentW)/2, (stageH-contentH)/2, contentW, contentH);
	}
	
	mainContainer.addChild(logo, buttonStart);
	gameContainer.addChild(itemSlotFrameAnimate, itemMachine, itemHandleAnimate, slotContainer, linesContainer, slotWinContainer, itemShadow, slotWinFrameContainer, itemDisplayLines, itemDisplayBet, itemDisplayMaxBet, itemDisplaySpin, buttonInfo, buttonLines, buttonBet, buttonMaxBet, buttonSpin, linesTxt, betTxt, maxBetTxt, spinTxt, itemCredit, itemCreditAlert, itemCreditAnimate, creditTxt, infoContainer);
	resultContainer.addChild(itemResult, resultTitleTxt, resultScoreTxt, buttonContinue);
	optionsContainer.addChild(buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonExit);
	optionsContainer.visible = false;
	
	if(shareEnable){
		resultContainer.addChild(resultShareTxt, buttonFacebook, buttonTwitter, buttonWhatsapp);
	}
	
	canvasContainer.addChild(mainContainer, gameContainer, resultContainer, confirmContainer, optionsContainer, buttonSettings, guideline);
	stage.addChild(canvasContainer);
	
	resizeCanvas();
}


/*!
 * 
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */
function resizeCanvas(){
 	if(canvasContainer!=undefined){
		buttonSettings.x = (canvasW - offset.x) - 60;
		buttonSettings.y = offset.y + 60;
		
		var distanceNum = 75;
		if(curPage != 'game'){
			buttonExit.visible = false;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+(distanceNum);
			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*2);
		}else{
			buttonExit.visible = true;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+(distanceNum);
			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*2);
			
			buttonExit.x = buttonSettings.x;
			buttonExit.y = buttonSettings.y+(distanceNum*3);
		}
	}
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
 function removeGameCanvas(){
	 stage.autoClear = true;
	 stage.removeAllChildren();
	 stage.update();
	 createjs.Ticker.removeEventListener("tick", tick);
	 createjs.Ticker.removeEventListener("tick", stage);
 }

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */ 
function tick(event) {
	updateGame();
	stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj){
	obj.regX=obj.image.naturalWidth/2;
	obj.regY=obj.image.naturalHeight/2;
}

function createHitarea(obj){
	obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));	
}