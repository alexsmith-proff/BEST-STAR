function CPayTablePanel(){
    var _aNumSymbolComboText;
    var _aWinComboText;
    var _oWildText;
    var _oBg;
    var _oContainer;
    
    this._init = function(){
        _oContainer = new createjs.Container();
        
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('paytable'));
        _oContainer.addChild(_oBg);

        this._createPayouts();
        
        _oWildText = new CTLText(_oContainer, 
                    760, 466, 454, 120, 
                    26, "center", "#ffff00", FONT_GAME, 1,
                    0, 0,
                    TEXT_HELP_WILD,
                    true, true, true,
                    false );
                    

        
        _oContainer.visible = false;
        s_oStage.addChild(_oContainer);
        
        var oParent = this;
        _oContainer.on("pressup",function(){oParent._onExit()});
    };
    
    this.unload = function(){
        var oParent = this;
        _oContainer.off("pressup",function(){oParent._onExit()});
        
        s_oStage.removeChild(_oContainer);
        
        for(var i=0;i<_aNumSymbolComboText.length;i++){
            for(var j=0;j<_aNumSymbolComboText[i].length;j++){
                _oContainer.removeChild(_aNumSymbolComboText[i][j].getText());
                _oContainer.removeChild(_aWinComboText[i][j].getText());
            }
        }
        
    };
    
    this._createPayouts = function(){
        _aNumSymbolComboText = new Array();
        _aWinComboText = new Array();
        
        var aPos = [{x:440,y:112},{x:440,y:292},{x:440,y:476},{x:770,y:112},{x:770,y:292},{x:1090,y:112},{x:1090,y:292}];
        var iCurPos = 0;
        for(var i=0;i<s_aSymbolWin.length;i++){
            
            var aSymbolPayouts = new Array();
            for(var k=0;k<s_aSymbolWin[i].length;k++){
                aSymbolPayouts[k] = s_aSymbolWin[i][k];
            }
                    
            
            do{
                var iIndex = aSymbolPayouts.indexOf(0);
                if(iIndex !== -1){
                    aSymbolPayouts.splice(iIndex, 1);
                }
                
            }while(iIndex !== -1);
            
            var iLen = aSymbolPayouts.length;
            
            if(iLen === 0){
                continue;
            }
            
            var iOffsetY = 30;
            if(iLen === 4){
                iOffsetY = 25;
            }

            var iYPos = aPos[iCurPos].y;
            _aNumSymbolComboText[i] = new Array();
            _aWinComboText[i] = new Array();

            for(var j=0;j<iLen;j++){
                var oTextMult = new CTLText(_oContainer, 
                    aPos[iCurPos].x, iYPos, 44, 25, 
                    25, "left", "#ffffff", FONT_GAME, 1,
                    0, 0,
                    "X"+(5-j),
                    true, true, false,
                    false );
                    


                _aNumSymbolComboText[i][j] = oTextMult;
                
                var oText = new CTLText(_oContainer, 
                    oTextMult.getX() + 50, oTextMult.getY(), 44, 25, 
                    25, "left", "#ffff00", FONT_GAME, 1,
                    0, 0,
                    aSymbolPayouts[iLen-j-1],
                    true, true, false,
                    false );


                _aWinComboText[i][j] = oText;
            
                iYPos += iOffsetY;
            }
            
            iCurPos++;
        }
    };
    
    this.show = function(){
        _oContainer.visible = true;
    };
    
    this.hide = function(){
        _oContainer.visible = false;
    };
    
    this.resetHighlightCombo = function(){
        for(var i=0;i<_aNumSymbolComboText.length;i++){
            for(var j=0;j<_aNumSymbolComboText[i].length;j++){
                _aNumSymbolComboText[i][j].setColor("#ffffff");
                _aWinComboText[i][j].setColor("#ffff00");
                createjs.Tween.removeTweens(_aWinComboText[i][j].getText());
                _aWinComboText[i][j].setAlpha(1);
            }
        } 
    };
    
    this.highlightCombo = function(iSymbolValue,iNumCombo){
        
        _aWinComboText[iSymbolValue-1][NUM_REELS-iNumCombo].setColor("#ff0000");
        
        this.tweenAlpha(_aWinComboText[iSymbolValue-1][NUM_REELS-iNumCombo].getText(),0);
        
    };
    
    this.tweenAlpha = function(oText,iAlpha){
        var oParent = this;
        createjs.Tween.get(oText).to({alpha:iAlpha}, 200).call(function(){if(iAlpha === 1){
                                                                                    oParent.tweenAlpha(oText,0);
                                                                                }else{
                                                                                    oParent.tweenAlpha(oText,1);
                                                                                }
        });
    };
    
    this._onExit = function(){
        s_oGame.hidePayTable();
    };
    
    this.isVisible = function(){
        return _oContainer.visible;
    };
    
    this._init();
}