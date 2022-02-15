////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

 /*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
function initPreload(){
	toggleLoader(true);
	
	checkMobileEvent();
	
	$(window).resize(function(){
		resizeGameFunc();
	});
	resizeGameFunc();
	
	loader = new createjs.LoadQueue(false);
	manifest=[
			{src:'assets/logo.png', id:'logo'},
			{src:'assets/button_start.png', id:'buttonStart'},
			
			//multi-line slots
			{src:'assets/multiple/item_machine.png', id:'itemMachine'},
			{src:'assets/multiple/frame_Spritesheet5x1.png', id:'itemSlotFrame'},
			{src:'assets/multiple/item_shadow.png', id:'itemShadow'},
			{src:'assets/multiple/item_info.png', id:'itemInfo'},
		
			//classic three line slots
			//{src:'assets/classic/item_machine.png', id:'itemMachine'},
			//{src:'assets/classic/frame_Spritesheet5x1.png', id:'itemSlotFrame'},
			//{src:'assets/classic/item_shadow.png', id:'itemShadow'},
			//{src:'assets/classic/item_info.png', id:'itemInfo'},
		
			{src:'assets/button_close.png', id:'buttonClose'},
			{src:'assets/button_info.png', id:'buttonInfo'},
			{src:'assets/button_lines.png', id:'buttonLines'},
			{src:'assets/button_bet.png', id:'buttonBet'},
			{src:'assets/button_maxbet.png', id:'buttonMaxBet'},
			{src:'assets/button_spin.png', id:'buttonSpin'},
			{src:'assets/item_display.png', id:'itemDisplay'},
			{src:'assets/handle_Spritesheet5x1.png', id:'itemHandle'},
			{src:'assets/credit_Spritesheet3x2.png', id:'itemCreditAnimate'},
			
			{src:'assets/line_display_off.png', id:'itemLineDisplayOff'},
			{src:'assets/line_display_on.png', id:'itemLineDisplayOn'},
			
			{src:'assets/item_credit.png', id:'itemCredit'},
			{src:'assets/item_credit_alert.png', id:'itemCreditAlert'},
			
			{src:'assets/button_confirm.png', id:'buttonConfirm'},
			{src:'assets/button_cancel.png', id:'buttonCancel'},
			{src:'assets/item_exit.png', id:'itemExit'},
			
			{src:'assets/button_continue.png', id:'buttonContinue'},
			{src:'assets/item_result.png', id:'itemResult'},
			{src:'assets/button_facebook.png', id:'buttonFacebook'},
			{src:'assets/button_twitter.png', id:'buttonTwitter'},
			{src:'assets/button_whatsapp.png', id:'buttonWhatsapp'},
			{src:'assets/button_fullscreen.png', id:'buttonFullscreen'},
			{src:'assets/button_sound_on.png', id:'buttonSoundOn'},
			{src:'assets/button_sound_off.png', id:'buttonSoundOff'},
			{src:'assets/button_exit.png', id:'buttonExit'},
			{src:'assets/button_setting.png', id:'buttonSettings'}];

	//memberpayment
	if(typeof memberData != 'undefined' && enableMembership){
		addMemberRewardAssets();
	}
			
	for(var n = 0; n<slots_arr.length; n++){
		manifest.push({src:slots_arr[n].static, id:'slot'+n});
		manifest.push({src:slots_arr[n].animate, id:'slotAnimate'+n});
	}
	
	soundOn = true;
	if($.browser.mobile || isTablet){
		if(!enableMobileSound){
			soundOn=false;
		}
	}
	
	if(soundOn){
		manifest.push({src:'assets/sounds/click.ogg', id:'soundClick'});
		manifest.push({src:'assets/sounds/result.ogg', id:'soundResult'});
		manifest.push({src:'assets/sounds/puller.ogg', id:'soundPuller'});
		manifest.push({src:'assets/sounds/stop.ogg', id:'soundStop'});
		manifest.push({src:'assets/sounds/spin.ogg', id:'soundSpin'});
		manifest.push({src:'assets/sounds/win.ogg', id:'soundWin'});
		manifest.push({src:'assets/sounds/alert.ogg', id:'soundAlert'});
		
		createjs.Sound.alternateExtensions = ["mp3"];
		loader.installPlugin(createjs.Sound);
	}
	
	loader.addEventListener("complete", handleComplete);
	loader.addEventListener("fileload", fileComplete);
	loader.addEventListener("error",handleFileError);
	loader.on("progress", handleProgress, this);
	loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS FILE COMPLETE EVENT - This is the function that runs to update when file loaded complete
 * 
 */
function fileComplete(evt) {
	var item = evt.item;
	//console.log("Event Callback file loaded ", evt.item.id);
}

/*!
 * 
 * CANVAS FILE HANDLE EVENT - This is the function that runs to handle file error
 * 
 */
function handleFileError(evt) {
	console.log("error ", evt);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
	$('#mainLoader span').html(Math.round(loader.progress/1*100)+'%');
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
	toggleLoader(false);
	initMain();
};

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con){
	if(con){
		$('#mainLoader').show();
	}else{
		$('#mainLoader').hide();
	}
}