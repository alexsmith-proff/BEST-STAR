function CBonusPanel(){
    var _bBonusItemClicked;
    var _iBonusMoney;
    var _iCurBet;
    var _aBonusItems;
    var _aBonusValue;
    var _aPrizeSprites;
    var _aPrizePrizes;
    var _aWinPos;
    var _oWinText;
    var _oContainer;
    
    this._init = function(){        
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bonus_bg'));
        _oContainer.alpha = 0;
        _oContainer.visible= false;
        _oContainer.addChild(oBg);
        
        var oData = {   // image to use
                        framerate: 6,
                        images: [s_oSpriteLibrary.getSprite('bonus_item')], 
                        // width, height & registration point of each sprite
                        frames: {width: BONUS_ITEM_WIDTH, height: BONUS_ITEM_HEIGHT}, 
                        animations: {  idle: [0],item_clicked:[1,14,"idle"]}
        };

        var oSpriteSheet = new createjs.SpriteSheet(oData);

        _aBonusItems = new Array();
        
        var aPos = [{x:253,y:30},{x:577,y:118},{x:946,y:19},{x:262,y:305},{x:927,y:305}];
        for(var i=0;i<5;i++){
            var oBonusItem = createSprite(oSpriteSheet, "idle",0,0,BONUS_ITEM_WIDTH,BONUS_ITEM_HEIGHT);
            oBonusItem.on("click", this._onBonusItemReleased, this,false,i);
            oBonusItem.x = aPos[i].x;
            oBonusItem.y = aPos[i].y;
            oBonusItem.visible = false;
            
            _oContainer.addChild(oBonusItem);
            
            _aBonusItems[i] = oBonusItem;
        }
        
        var oSprite = s_oSpriteLibrary.getSprite('bonus_prize');
        _aPrizeSprites = new Array();
        _aPrizePrizes = new Array();
        
        _aPrizeSprites[0] = createBitmap(oSprite);
        _aPrizeSprites[0].x = 300;
        _aPrizeSprites[0].y = CANVAS_HEIGHT - 90;
        _oContainer.addChild(_aPrizeSprites[0]);
        
        var oText = new createjs.Text("100","44px "+FONT_GAME, "#ffff00");
        oText.textAlign = "left";
        oText.x = _aPrizeSprites[0].x + oSprite.width + 10;
        oText.y = _aPrizeSprites[0].y + oSprite.height/2;
        oText.textBaseline = "middle";
        _oContainer.addChild(oText);
        _aPrizePrizes.push(oText);
        
        _aPrizeSprites[1] = createBitmap(oSprite);
        _aPrizeSprites[1].x = 600;
        _aPrizeSprites[1].y = CANVAS_HEIGHT - 90;
        _oContainer.addChild(_aPrizeSprites[1]);
        
        oText = new createjs.Text("200","44px "+FONT_GAME, "#ffff00");
        oText.textAlign = "left";
        oText.x = _aPrizeSprites[1].x + oSprite.width + 10;
        oText.y = _aPrizeSprites[1].y + oSprite.height/2;
        oText.textBaseline = "middle";
        _oContainer.addChild(oText);
        _aPrizePrizes.push(oText);
        
        _aPrizeSprites[2] = createBitmap(oSprite);
        _aPrizeSprites[2].x = 900;
        _aPrizeSprites[2].y = CANVAS_HEIGHT - 90;
        _oContainer.addChild(_aPrizeSprites[2]);
        
        oText = new createjs.Text("300","44px "+FONT_GAME, "#ffff00");
        oText.textAlign = "left";
        oText.x = _aPrizeSprites[2].x + oSprite.width + 10;
        oText.y = _aPrizeSprites[2].y + oSprite.height/2;
        oText.textBaseline = "middle";
        _oContainer.addChild(oText);
        _aPrizePrizes.push(oText);
        
        
        _aWinPos = [{x:440,y:129},{x:765,y:219},{x:1134,y:129},{x:450,y:405},{x:1114,y:405}];
        
    };
    
    this.unload = function(){
        for(var i=0;i<5;i++){
            _aBonusItems[i].off("click", this._onBonusItemReleased);
        }   
    };
    
    this.show = function(iNumBonusItem,iCurBet){
        $(s_oMain).trigger("bonus_start");
        
        _iCurBet = iCurBet;
        _bBonusItemClicked = false;
        
        switch(iNumBonusItem){
            case 3:{
                    _aBonusValue = BONUS_PRIZE[0];
                    break;
            }
            case 4:{
                    _aBonusValue = BONUS_PRIZE[1];
                    break;
            }
            case 5:{
                    _aBonusValue = BONUS_PRIZE[2];
                    break;
            }
            default:{
                    _aBonusValue = BONUS_PRIZE[0];
            }
        }
        
        _aPrizePrizes[0].text = "X" + _aBonusValue[0];
        _aPrizePrizes[1].text = "X" + _aBonusValue[1];
        _aPrizePrizes[2].text = "X" + _aBonusValue[2];
        
        for(var i=0;i<iNumBonusItem;i++){
            _aBonusItems[i].visible = true;
            
        }
        
        _oContainer.visible = true;
        createjs.Tween.get(_oContainer).to({alpha:1}, 1000);  
		
    };
    
    this._onBonusItemReleased = function(event,oData){
        if(_bBonusItemClicked){
            return;
        }
        
        _bBonusItemClicked = true;
        var iIndex = oData;
        
        do{
            var iRandPrize = Math.floor(Math.random()* s_aPrizeOccurence.length);
        }while(_aBonusValue[s_aPrizeOccurence[iRandPrize]]*_iCurBet > SLOT_CASH);    

        _iBonusMoney = _aBonusValue[s_aPrizeOccurence[iRandPrize]];
        _aBonusItems[iIndex].gotoAndPlay("item_clicked");
	
        
        playSound("choose_bonus_item",1,false);
        
        
        this.endBonus(iIndex);
    };
    
    this.endBonus = function(iIndex){
        //SHOW PRIZE WON
        _oWinText = new CScoreText("X"+_iBonusMoney,_aWinPos[iIndex].x ,_aWinPos[iIndex].y);
        
        setTimeout(function(){_oContainer.alpha = 0;
                                _oContainer.visible= false;
								for(var i=0;i<_aBonusItems.length;i++){
                                    _aBonusItems[i].visible = false;
                                }
                                s_oGame.endBonus(_iBonusMoney)},4000);
    };
    
    this._init();
}