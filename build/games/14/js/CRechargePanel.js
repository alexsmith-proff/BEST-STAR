function CRechargePanel(){
    var _oListener;
    var _oBg;
    var _oButRecharge;
    var _oButExit;
    var _oMsgText;
    var _oMsgTextOutline;

    
    var _oContainer;
    
    var _oThis = this;
    
    this._init = function(){
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        s_oStage.addChild(_oContainer);
        
       
        
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('msg_box'));
        _oListener = _oBg.on("click",function(){});
        _oContainer.addChild(_oBg);
        
       
        _oMsgTextOutline = new CTLText(_oContainer, 
                    CANVAS_WIDTH/2-300, 170, 600, 150, 
                    40, "center", "#000", FONT_GAME, 1,
                    0, 0,
                    TEXT_NO_MONEY,
                    true, true, true,
                    false );
                    
        _oMsgTextOutline.setOutline(3);
       
        _oMsgText = new CTLText(_oContainer, 
                    CANVAS_WIDTH/2-300, 170, 600, 150, 
                    40, "center", "#fff", FONT_GAME, 1,
                    0, 0,
                    TEXT_NO_MONEY,
                    true, true, true,
                    false );
        
        _oButExit = new CTextButton(CANVAS_WIDTH/2 - 200,CANVAS_HEIGHT/2 + 100,s_oSpriteLibrary.getSprite("info_but"),TEXT_EXIT,FONT_GAME,"#fff",40,_oContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        _oButRecharge = new CTextButton(CANVAS_WIDTH/2 +200,CANVAS_HEIGHT/2 + 100,s_oSpriteLibrary.getSprite("info_but"),TEXT_RECHARGE,FONT_GAME,"#fff",40,_oContainer);
        _oButRecharge.addEventListener(ON_MOUSE_UP,this._onRecharge,this);
        
	

    };

    
    this.unload = function(){
        _oBg.off("click", _oListener);
        
        _oButExit.unload(); 
        _oButExit = null;
        _oButRecharge.unload();

        s_oStage.removeChild(_oContainer);
    };
    
    this.show = function(){
        _oContainer.alpha = 0;
        _oContainer.visible = true;
        createjs.Tween.get(_oContainer).to({alpha:1} , 600,createjs.Ease.cubicOut);
    };
    
    this.hide = function(){
        _oContainer.visible = false;
    };
    
    this._onExit = function(){
         _oThis.hide();
         s_oInterface.enableGuiButtons();
    };
    
    this._onRecharge = function(){
        $(s_oMain).trigger("recharge");
        
        _oThis.hide();
    };
    
    this._init();
    
    
};


