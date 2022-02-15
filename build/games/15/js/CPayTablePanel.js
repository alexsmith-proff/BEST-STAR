function CPayTablePanel(){
    var _iCurPage;
    var _aNumSymbolComboText;
    var _aWinComboText;
    var _aPages;
    var _oCurPage;
    
    var _oHitArea;
    var _oButArrowNext;
    var _oButArrowPrev;
    var _oContainer;
    
    this._init = function(){
        _iCurPage = 0;
        _aPages = new Array();
        
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        s_oAttachSection.addChild(_oContainer);
        
        //ATTACH PAGE 1
        var oContainerPage = new createjs.Container();
        _oContainer.addChild(oContainerPage);
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('paytable1'));
        oContainerPage.addChild(oBg);
        
        this._createPayouts(oContainerPage);
        
        var oTextLabel = new CTLText(oContainerPage, 
                    756, 460, 464, 130, 
                    54, "center", "#ffff00", FONT_GAME, 1,
                    10, 5,
                    TEXT_HELP_WILD,
                    true, true, true,false );        
                    

        
        _aPages[0] = oContainerPage;
        
        //ATTACH PAGE 2
        oContainerPage = new createjs.Container();
        oContainerPage.visible = false;
        _oContainer.addChild(oContainerPage);
        
        oBg = createBitmap(s_oSpriteLibrary.getSprite('paytable2'));
        oContainerPage.addChild(oBg);
        
        var oText = new CTLText(oContainerPage, 
                    756, 94, 460, 132, 
                    40, "center", "#ffff00", FONT_GAME, 1,
                    15, 5,
                    TEXT_HELP_BONUS1,
                    true, true, true, false );    
                    
              
        
        var oText2 = new CTLText(oContainerPage, 
                    280, 270, 460, 122, 
                    40, "center", "#ffff00", FONT_GAME, 1,
                    15, 5,
                    TEXT_HELP_BONUS2,
                    true, true, true, false );    
                

        
        _aPages[1] = oContainerPage;
        
        //ATTACH PAGE 3
        oContainerPage = new createjs.Container();
        oContainerPage.visible = false;
        _oContainer.addChild(oContainerPage);
        
        oBg = createBitmap(s_oSpriteLibrary.getSprite('paytable3'));
        oContainerPage.addChild(oBg);
        
        var oText = new CTLText(oContainerPage, 
                    493, 320, 540, 148, 
                    40, "center", "#ffff00", FONT_GAME, 1,
                    15, 5,
                    TEXT_HELP_FREESPIN,
                    true, true, true, false );   
                

        
        _aPages[2] = oContainerPage;
        
        _oCurPage = _aPages[_iCurPage];
        
        
        //ATTACH HIT AREA
        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        var oParent = this;
        _oHitArea.on("click",function(){oParent._onExit();});
        _oContainer.addChild(_oHitArea);
        
        //ATTACH ARROW
        _oButArrowNext = new CGfxButton(CANVAS_WIDTH - 300,50,s_oSpriteLibrary.getSprite('but_arrow_next'),_oContainer);
        _oButArrowNext.addEventListener(ON_MOUSE_UP, this._onNext, this);
        
        _oButArrowPrev = new CGfxButton(300,50,s_oSpriteLibrary.getSprite('but_arrow_prev'),_oContainer);
        _oButArrowPrev.addEventListener(ON_MOUSE_UP, this._onPrev, this);
    };
    
    this.unload = function(){
        var oParent = this;
        _oHitArea.off("click",function(){oParent._onExit()});
        
        s_oAttachSection.removeChild(_oContainer);
        
        for(var i=0;i<_aNumSymbolComboText.length;i++){
            _oContainer.removeChild(_aNumSymbolComboText[i]);
        }
        
        for(var j=0;j<_aWinComboText.length;j++){
            _oContainer.removeChild(_aWinComboText[j]);
        }
        
    };
    
    this._createPayouts = function(oContainerPage){
        _aNumSymbolComboText = new Array();
        _aWinComboText       = new Array();
        
        var iFontSize = 125;        


        var aPos = [{x:435,y:158},
                    {x:765,y:158},
                    {x:1087,y:158},
                    {x:435,y:340},
                    {x:765,y:340},
                    {x:1087,y:340},
                    {x:435,y:524}];
        
        
        for(var i=0; i < (s_aSymbolWin.length-3); i++){
            var aMultipliers = s_aSymbolWin[i];

            _aNumSymbolComboText[i] = new Array();
            _aWinComboText[i]       = new Array();
            
            var oContainerGroup = new createjs.Container();
            oContainerGroup.x = aPos[i].x;
            oContainerGroup.y =  aPos[i].y;
            _oContainer.addChild(oContainerGroup)
            

            var iY = 0;
            for( var j = aMultipliers.length-1; j >=0 ; j-- ){                       
                if( aMultipliers[j] === 0 ){
                    continue;
                }                
                

                var oTextMult = new CTLText(oContainerGroup, 
                    0,iY , 50, 30, 
                    iFontSize, "left", "#ffffff", FONT_GAME, 1,
                    2, 2,
                    "X"+(j+1),
                    true, true, true, false );
                        
                iY += oTextMult.getFontSize();

                _aNumSymbolComboText[i][j] = oTextMult;
                
                var oText = new CTLText(oContainerGroup, 
                    50, oTextMult.getY(), 50, 30, 
                    iFontSize, "right", "#ffff00", FONT_GAME, 1,
                    2, 2,
                    aMultipliers[j],
                    true, true, true, false );          

                _aWinComboText[i][j] = oText;
            }
            
            
            oContainerGroup.regY = oContainerGroup.getBounds().height/2;
        }
        
    };
    
    this._onNext = function(){
        if(_iCurPage === _aPages.length-1){
            _iCurPage = 0;
        }else{
            _iCurPage++;
        }
        
        
        _oCurPage.visible = false;
        _aPages[_iCurPage].visible = true;
        _oCurPage = _aPages[_iCurPage];
    };
    
    this._onPrev = function(){
        if(_iCurPage === 0){
            _iCurPage = _aPages.length -1;
        }else{
            _iCurPage--;
        }
        
        
        _oCurPage.visible = false;
        _aPages[_iCurPage].visible = true;
        _oCurPage = _aPages[_iCurPage];
    };
    
    this.show = function(){
        _iCurPage = 0;
        _oCurPage.visible = false;
        _aPages[_iCurPage].visible = true;
        _oCurPage = _aPages[_iCurPage];
        
        _oContainer.visible = true;
    };
    
    this.hide = function(){
        _oContainer.visible = false;
    };
    
    this.resetHighlightCombo = function(){
        for(var i=0;i<_aNumSymbolComboText.length;i++){
            for(var j=0;j<_aNumSymbolComboText[i].length;j++){
                var oNumSymbolComboText = _aNumSymbolComboText[i][j];
                var oWinComboText       = _aWinComboText[i][j];
                
                if(oNumSymbolComboText){
                    oNumSymbolComboText.setColor("#ffffff");    
                }
                if(oWinComboText){
                    _aWinComboText[i][j].setColor("#ffff00");
                    _aWinComboText[i][j].removeTweens();
                    _aWinComboText[i][j].setAlpha(1);  
                }
            }
        } 
    };
    
    this.highlightCombo = function(iSymbolValue,iNumCombo){
        if(iSymbolValue === BONUS_SYMBOL ||
           iSymbolValue === WILD_SYMBOL ||
           iSymbolValue === FREESPINS_SYMBOL ){
            return;
        }     


        _aWinComboText[iSymbolValue][iNumCombo-1].setColor("#ff0000");
        
        this.tweenAlpha(_aWinComboText[iSymbolValue][iNumCombo-1].getText(),0);
        
    };
    
    this.tweenAlpha = function(oText,iAlpha){
        var oParent = this;
        createjs.Tween.get(oText).to({alpha:iAlpha}, 200).call(
                function(){
                    if(iAlpha === 1){
                        oParent.tweenAlpha(oText,0);
                    }else{
                        oParent.tweenAlpha(oText,1);
                    }
                }
        );
    };
    
    this._onExit = function(){
        s_oGame.hidePayTable();
    };
    
    this.isVisible = function(){
        return _oContainer.visible;
    };
    
    this._init();
}