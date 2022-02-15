declare module KE.display {
    class Button extends Phaser.Button {
        container: Phaser.Group;
        private _icon;
        private _offset;
        private _sound;
        protected _isDown: boolean;
        constructor(game: Phaser.Game, callback: Function, callbackContext: any, up_state: string, down_state: string, atlas: string, icon?: string, offset?: number, sound?: string);
        setIcon(frame: string): void;
        protected down(): void;
        protected up(): void;
    }
}
declare module KE.display {
    class Image9Patch extends PIXI.Strip {
        private _rect;
        private _needRedraw;
        private _multPoint;
        private _width;
        private _height;
        constructor(game: Phaser.Game, texture: string, frame: string, rect: PIXI.Rectangle);
        private getMult(i);
        private getVertex(i);
        readjustSize(): void;
        width: number;
        height: number;
        update(): void;
        postUpdate(): void;
    }
}
declare module KE.display {
    enum Orientation {
        Vertical = 1,
        Horizontal = 2,
    }
    class ScrollContainer extends Phaser.Group {
        private _verticalGap;
        private _w;
        private _h;
        private _scroll;
        private _po;
        private _mousedown;
        private _lastPos;
        private _lastDiff;
        private _scrollTween;
        private _maxVel;
        private _startDragTime;
        private _startDragPoint;
        private _orientation;
        private _msk;
        private _needMask;
        private _isDown;
        private _isOverFlow;
        constructor(game: Phaser.Game, width: number, height: number, needMask?: boolean);
        updateSize(w: number, h: number, o: Orientation): void;
        orientation: Orientation;
        removeChildren(beginIndex?: number, endIndex?: number): PIXI.DisplayObject[];
        addChild(child: PIXI.DisplayObject): PIXI.DisplayObject;
        verticalGap: number;
        scrollTo(x: number, y: number): void;
        onmousemove(pointer: Phaser.Pointer, x: number, y: number): void;
        onmousedown(s: Phaser.Sprite, pointer: Phaser.Pointer): void;
        onmouseup(s: Phaser.Sprite, pointer: Phaser.Pointer, isOver: boolean): void;
        readonly contentWidth: number;
        readonly width: number;
        readonly height: number;
        update(): void;
    }
}
declare module KE.display {
    class Slider extends Phaser.Group {
        onChange: Phaser.Signal;
        _bg: Image9Patch;
        _fill: Image9Patch;
        _values: Array<number>;
        _button: Phaser.Image;
        _height: number;
        _upState: string;
        _downState: string;
        _value: number;
        _downPoint: Phaser.Point;
        _startPos: number;
        _isDown: boolean;
        _minValue: number;
        _maxValue: number;
        constructor(game: Phaser.Game, up_state: string, down_state: string, bg: string, fill: string, atlas: string, values: Array<number>);
        height: number;
        value: number;
        down(target: Phaser.Image, pointer: any): void;
        up(): void;
        over(pointer: any, pointer_x: any, pointer_y: any): void;
    }
}
declare module KE.display {
    class TextButton extends Button {
        private _text;
        constructor(game: Phaser.Game, text: string, textStyle: Phaser.PhaserTextStyle, callback: Function, callbackContext: any, up_state: string, down_state: string, atlas: string, offset?: number, icon?: string);
    }
}
declare module KE.math {
    class Bezier {
        _vertices: Array<Vector3>;
        constructor(vertices: Array<Vector3>);
        getValue(t: number): Vector3;
    }
}
declare module KE.math {
    class FMath {
        static PI_05: number;
        static abs(value: number): number;
        static sign(num: number): number;
        static randomGauss(mu: number, sigma: number): number;
        static ease(t: number, a: number, b: number): number;
        static clamp(min: number, max: number, value: number): number;
        static lerp(v1: number, v2: number, t: number): number;
        static lerpClouds(amount: number, start: number, end: number): number;
        static degToRad(deg: number): number;
        static ease_inv(y: number, a: number, b: number): number;
        static easeInSine(t: number): number;
        static randomInt(a: number, b: number): number;
        static randomFloat(a: number, b: number): number;
        static randomBoolean(): boolean;
        static randomSign(): number;
    }
}
declare module KE.math {
    class FPoint {
        x: number;
        y: number;
        constructor(x: number, y: number);
        getDistanceToOrigin(): number;
        length(): number;
        normalized(): KE.math.FPoint;
        isEqualToPoint(p: KE.math.FPoint): boolean;
        addPoint(p: KE.math.FPoint): void;
        sum(p: KE.math.FPoint): KE.math.FPoint;
        subtractPoint(p: KE.math.FPoint): void;
        subtracted(p: KE.math.FPoint): KE.math.FPoint;
        setTo(p: KE.math.FPoint): void;
        scale(s: number): void;
        scaled(s: number): KE.math.FPoint;
        rotated(angle: number): KE.math.FPoint;
        rotate(angle: number): void;
        getDistanceToPoint(p: KE.math.FPoint): number;
        getAngle(): number;
        getDirectedAngle(second: KE.math.FPoint): number;
        getDirectedAngleNormalize(second: KE.math.FPoint): number;
    }
}
declare module KE.math {
    class SplineVector3 {
        gradient: Array<KE.math.Vector3>;
        private _vertices;
        constructor(vertices?: Array<KE.math.Vector3>, verticesSupport?: Array<KE.math.Vector3>, numPoints?: number);
        addKey(key: KE.math.Vector3): void;
        calculateGradient(numPoints: number): void;
        clear(): void;
        init(vertices: Array<KE.math.Vector3>, verticesSupport: Array<KE.math.Vector3>, numPoints: number): void;
        spline(p0: KE.math.Vector3, p1: KE.math.Vector3, p2: KE.math.Vector3, p3: KE.math.Vector3, t: number): KE.math.Vector3;
        getGlobalFrame(time: number): KE.math.Vector3;
        readonly vertices: Array<KE.math.Vector3>;
    }
}
declare module KE.math {
    class Vector3 {
        x: number;
        y: number;
        z: number;
        w: number;
        constructor(x?: number, y?: number, z?: number, w?: number);
    }
}
declare module KE.ui {
    class ResizeManager {
        static _resizibles: Array<Resizible>;
        static _simpleResizibles: Array<SimpleResizible>;
        static _cache: {};
        static _bounds: PIXI.Rectangle;
        static _pointCache: PIXI.Point;
        static newWidth: number;
        static newHeight: number;
        static center: PIXI.Point;
        static root: PIXI.DisplayObject;
        private static _funs;
        static resize(newWidth: number, newHeight: number): void;
        private static resizeSimpleObject(sRes);
        private static resizeObject(res);
        static add(object: PIXI.DisplayObjectContainer, hAlign: number, vAlign: number, paddingX?: number, paddingY?: number, stretch?: number, addX?: number, addY?: number): void;
        static addSimple(object: PIXI.DisplayObject, hPercent: number, vPercent: number): void;
        static addFun(fun: (w: number, h: number) => void): void;
        static remove(object: PIXI.DisplayObject): void;
    }
}
declare module KE.ui {
    class Resizible {
        static LEFT: number;
        static RIGHT: number;
        static CENTER: number;
        static TOP: number;
        static BOTTOM: number;
        static NON_STRETCH: number;
        static V_STRETCH: number;
        static H_STRETCH: number;
        static FULL_STRETCH: number;
        static FILL_STRETCH: number;
        stretch: number;
        hAlign: number;
        vAlign: number;
        object: PIXI.DisplayObjectContainer;
        paddingX: number;
        paddingY: number;
        constructor(object: PIXI.DisplayObjectContainer, vAlign: number, hAlign: number, paddingX?: number, paddingY?: number, stretch?: number);
    }
}
declare module KE.ui {
    class SimpleResizible {
        object: PIXI.DisplayObject;
        hAlign: number;
        vAlign: number;
        constructor(object: PIXI.DisplayObject, hAlign: number, vAlign: number);
    }
}
declare module KE {
    class Persistence {
        private static _data;
        private static _sharedObject;
        private static _slot;
        static init(slot?: string): void;
        static load(): void;
        static save(callback?: Function): void;
        static getNumber(id: string, def?: number): number;
        static setNumber(id: string, value: number): void;
        static getString(id: string, def?: string): string;
        static setString(id: string, value: string): void;
        static set(id: string, value: any): void;
        static addNumber(id: string, value: number): void;
        static getBool(id: string, def?: boolean): boolean;
        static setBool(id: string, value: boolean): void;
        static clear(): void;
    }
}
declare module RushSlots {
    class App extends Phaser.Game {
        constructor();
        resize(): void;
    }
}
declare module RushSlots.Slots {
    class Board extends Phaser.Group {
        spinCompleted: Phaser.Signal;
        protected _columns: Array<Column>;
        protected _lines: Array<Line>;
        protected _map: Array<Array<Chip>>;
        protected _gameConfig: any;
        constructor(game: Phaser.Game, gameConfig: any);
        readonly w: number;
        readonly h: number;
        startSpin(): void;
        stopSpin(): void;
        private columnStopped();
        showHihglight(chips: Array<number>, color: number): void;
        hideHihglight(chips: Array<number>): void;
        private spinComplete();
    }
}
declare module RushSlots.Slots {
    class Cell extends Phaser.Group {
    }
}
declare module RushSlots.Slots {
    class Chip extends Phaser.Group {
        protected _color: number;
        private _highlight;
        constructor(game: Phaser.Game, chipConfig: any);
        update(): void;
        readonly color: number;
        showHihgLight(): void;
        hideHihglight(): void;
    }
}
declare module RushSlots.Slots {
    class ChipsFactory {
        static create(game: Phaser.Game, chipConfig: any): Chip;
    }
}
declare module RushSlots.Slots {
    class Column extends Phaser.Group {
        stopSpin: Phaser.Signal;
        protected _speed: number;
        protected _chips: Array<Chip>;
        private _isStopping;
        private _targetStopY;
        protected _gameConfig: {
            board: {
                width: number;
                height: number;
                cells: Array<number>;
                cellWidth: number;
                cellHeight: number;
            };
            chips: Array<{
                height: number;
                type: string;
                color: number;
            }>;
        };
        constructor(game: Phaser.Game, gameConfig: any, index: number);
        private shuffleArr(a);
        speed: number;
        getChipAt(index: number): Chip;
        update(): void;
        stop(): void;
    }
}
declare module RushSlots.Slots {
    class Line {
        private _cells;
        private _result;
        constructor(data: Array<Array<number>>);
        readonly cells: Array<Phaser.Point>;
        getColorsInLine(boardMap: Array<Array<Chip>>): Array<Chip>;
    }
}
declare module RushSlots {
    class LineView extends Phaser.Group {
        center: Phaser.Point;
        chips: Array<number>;
        color: number;
        constructor(game: Phaser.Game, gameConfig: any, index: number);
        private getCrosses(a, b, c, r);
        show(): void;
        hide(): void;
        private getAngle(a, b, c);
    }
}
declare module RushSlots.Mine {
    class BoardView extends Phaser.Group {
        private _lampOn;
        private _lampGalo;
        private _lamp;
        private _lampTimer;
        private _lampNextWink;
        private _lampWinkingTimer;
        private _lampWinksAmount;
        private _ropeHook;
        private _hook;
        constructor(game: Phaser.Game, board: Slots.Board);
        update(): void;
        private switchLamp();
        private switchLight(isOn);
        private objectTouch(object);
    }
}
declare module RushSlots.Mine {
    class ColorChip extends RushSlots.Slots.Chip {
        constructor(game: Phaser.Game, chipConfig: any);
    }
}
declare module RushSlots {
    class User {
        private static _instance;
        static readonly instance: User;
        onChange: Phaser.Signal;
        private _coins;
        private _level;
        private _levelFill;
        private _levelPoints;
        private _levelValues;
        init(levelValues: Array<number>): void;
        load(): void;
        save(): void;
        coins: number;
        readonly levelFill: number;
        readonly level: number;
        readonly levelPoints: number;
        addLevelPoints(value: number): void;
    }
}
declare module RushSlots {
    class Boot extends Phaser.State {
        private _oldWidth;
        private _oldHeight;
        preload(): void;
        create(): void;
        resizegame(scale: Phaser.ScaleManager, parentBounds: Phaser.Rectangle): any;
    }
}
declare module RushSlots {
    class MenuState extends Phaser.State {
        private _items;
        private _gamesScroller;
        private _menuItems;
        protected _pointsPopup: PointsPopup;
        private _bg;
        private _logo;
        private _topBlock;
        private _bonusBlock;
        private _playButton;
        preload(): void;
        create(): void;
        private playGame();
        private bonusTaken(bonusPrize);
    }
}
declare module RushSlots {
    class SlotsState extends Phaser.State {
        protected _root: Phaser.Group;
        protected _overlay: Phaser.Group;
        protected _pointsPopup: PointsPopup;
        protected _prizes: Array<number>;
        protected _lineViews: LineView[];
        protected _resultLines: Array<{
            color: number;
            line: number;
            amount: number;
        }>;
        protected _gameConfig: any;
        protected _bottomBlock: SlotsBottomBlock;
        protected _isSpinning: boolean;
        private _currentPointsLine;
        private _pointsShowTime;
        private _pointsShowDelay;
        private _pointsTimer;
        private _previousLineHided;
        private _helpDialog;
        isAutoSpin: boolean;
        protected _wasCreated: boolean;
        protected _gameId: string;
        protected _board: Slots.Board;
        protected createConfig(id: string): void;
        create(): void;
        start(): void;
        private helpTriggered();
        private closeTriggered();
        private switchAutoSpin();
        protected showPrizes(): void;
        update(): void;
        protected startSpin(): void;
        protected spinCompleted(resultLines: Array<{
            color: number;
            line: number;
            amount: number;
        }>): void;
    }
}
declare module RushSlots.Mine {
    class MineGameState extends SlotsState {
        private _bgSound;
        preload(): void;
        start(): void;
        create(): void;
        protected startSpin(): void;
    }
}
declare module RushSlots {
    class Preloader extends Phaser.State {
        loaderText: Phaser.Text;
        preload(): void;
        create(): void;
        update(): void;
        startMainMenu(): void;
    }
}
declare module RushSlots {
    class DigitsValue extends Phaser.Group {
        private _value;
        private _text;
        constructor(game: Phaser.Game, icon: string, width: number);
        value: number;
    }
}
declare module RushSlots {
    class BottomBlock extends Phaser.Group {
        private _container;
        constructor(game: Phaser.Game);
    }
}
declare module RushSlots {
    class FillHolder extends Phaser.Group {
        private _label;
        private _value;
        private _icon;
        private _filler;
        constructor(game: Phaser.Game, width: number, icon?: string);
        fill: number;
        value: number;
    }
}
declare module RushSlots {
    class MenuBottomBlock extends BottomBlock {
        constructor(game: Phaser.Game);
    }
}
declare module RushSlots {
    class MenuGameItem extends Phaser.Group {
        private _gameId;
        private _downPoint;
        private _isDown;
        constructor(game: Phaser.Game, gameId: string);
        private inputDown(s, pointer);
        private inputUp(s, pointer);
        update(): void;
        private playClicked();
    }
}
declare module RushSlots {
    class TextHolder extends Phaser.Group {
        private _label;
        private _value;
        private _icon;
        constructor(game: Phaser.Game, width: number, bgImage: string, textMargin: number);
        value: number;
    }
}
declare module RushSlots {
    class TimeBonusBlock extends Phaser.Group {
        bonusTaken: Phaser.Signal;
        private _bonusButton;
        private _lastGet;
        private _bonusPeriod;
        private _bonusPrize;
        private _coinTween;
        private _coin;
        private _timerLabel;
        private _time;
        constructor(game: Phaser.Game);
        private showBonusButton();
        private hideBonusButton();
        update(): void;
        private updateTimeLabel(time);
        private numberToString(num);
        private takeButtonTapped();
    }
}
declare module RushSlots {
    class BaseWidePopup extends Phaser.Group {
        event: Phaser.Signal;
        private _fadeBg;
        private _bg;
        private _header;
        protected _content: Phaser.Group;
        constructor(game: Phaser.Game, label: string);
        show(): void;
        hide(): void;
        hideCompleted(): void;
    }
}
declare module RushSlots {
    class PaytablePopup extends BaseWidePopup {
        private _leftButton;
        private _rightButton;
        private _tables;
        private _isLocked;
        private _currentPage;
        private _pagesAmount;
        constructor(game: Phaser.Game, gameId: string);
        private leftTapped();
        private rightTapped();
        private close();
        private unlock();
    }
}
declare module RushSlots {
    class BetMenu extends Phaser.Group {
        autoSpin: Phaser.Signal;
        helpTrigger: Phaser.Signal;
        private _container;
        private _opened;
        private _autoSpinButton;
        private _betMinusButton;
        private _betPlusButton;
        private _betMaxButton;
        private _betLabel;
        private _betValues;
        private _currentBetNum;
        private _maxBetNum;
        private _linesAmount;
        private _isAutoSpin;
        constructor(game: Phaser.Game, linesAmount: number);
        private helpTriggered();
        private betMinusTapped();
        private betPlusTapped();
        readonly currentBet: number;
        private updateBetButtons();
        private autoSpinTapped();
        private maxBetTapped();
        private bgTapped();
        open(): void;
        hide(): void;
    }
}
declare module RushSlots {
    class PaytableChainBlock extends Phaser.Group {
        constructor(game: Phaser.Game, index: number, w: number, h: number, items: Array<Array<number>>, cells: Array<number>);
    }
}
declare module RushSlots {
    class PaytableChipBlock extends Phaser.Group {
        constructor(game: Phaser.Game, config: any);
    }
}
declare module RushSlots {
    class PointsPopup extends Phaser.Group {
        private _text;
        private _amount;
        private _isActive;
        private _lastTween;
        constructor(game: Phaser.Game);
        showWhole(amount: number, x: number, y: number): void;
        showPart(amount: number, x: number, y: number): void;
        hide(): void;
        amount: number;
        destroy(destroyChildren?: boolean, soft?: boolean): void;
    }
}
declare module RushSlots {
    class SlotsBottomBlock extends BottomBlock {
        onSpin: Phaser.Signal;
        onAutoSpin: Phaser.Signal;
        onHelp: Phaser.Signal;
        private _spinButton;
        private _betMenu;
        constructor(game: Phaser.Game, linesAmount: number);
        private updateSize(w, h);
        readonly currentBet: number;
        private autoSpin();
        private help();
        private spinClicked();
    }
}
declare module RushSlots {
    class TopBlock extends Phaser.Group {
        private _coins;
        private _levelValue;
        constructor(game: Phaser.Game);
        private dataChanged();
    }
}
declare module RushSlots {
    class SlotsTopBlock extends TopBlock {
        onSpin: Phaser.Signal;
        onClose: Phaser.Signal;
        private _spinButton;
        constructor(game: Phaser.Game);
        private closeTriggered();
        private spinClicked();
    }
}
