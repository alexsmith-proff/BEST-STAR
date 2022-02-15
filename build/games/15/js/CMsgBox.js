function CMsgBox(){
    
    var _oBg;
    var _oMsgText;
    var _oMsgTextBack;
    var _oButExit;
    var _oGroup;
    
    this._init = function(){
        _oGroup = new createjs.Container();
        _oGroup.visible = false;
        s_oStage.addChild(_oGroup);
        
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('msg_box'));
        _oGroup.addChild(_oBg);

        _oMsgTextBack = new CTLText(_oGroup, 
                    CANVAS_WIDTH/2-298, (CANVAS_HEIGHT/2)-118, 600, 150, 
                    40, "center", "#000", FONT_GAME, 1,
                    0, 0,
                    " ",
                    true, true, true,
                    false );

        _oMsgText = new CTLText(_oGroup, 
                    CANVAS_WIDTH/2-300, (CANVAS_HEIGHT/2)-120, 600, 150, 
                    40, "center", "#fff", FONT_GAME, 1,
                    0, 0,
                    " ",
                    true, true, true,
                    false );
                                                      
        _oButExit = new CTextButton((CANVAS_WIDTH/2),CANVAS_HEIGHT - 200,s_oSpriteLibrary.getSprite('but_bg'),TEXT_OK,"walibi0615bold","#ffffff",40,_oGroup);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this); 
    };
    
    this.show = function(szMsg){
        _oMsgTextBack.refreshText(szMsg);
        _oMsgText.refreshText(szMsg);
        _oGroup.visible = true;
    };
    
    this.hide = function(){
        _oGroup.visible = false;
    };
    
    this._onExit = function(){
        this.hide();
    };
    
    this._init();
    
    return this;
}