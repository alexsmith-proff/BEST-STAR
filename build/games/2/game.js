var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var KE;
(function (KE) {
    var display;
    (function (display) {
        var Button = (function (_super) {
            __extends(Button, _super);
            function Button(game, callback, callbackContext, up_state, down_state, atlas, icon, offset, sound) {
                if (icon === void 0) { icon = ""; }
                if (offset === void 0) { offset = 2; }
                if (sound === void 0) { sound = "click"; }
                _super.call(this, game, 0, 0, atlas, callback, callbackContext, up_state, up_state, down_state, up_state);
                this._sound = "click";
                this._isDown = false;
                this._offset = offset;
                this._sound = sound;
                this.container = new Phaser.Group(game);
                this.addChild(this.container);
                if (icon) {
                    this._icon = new Phaser.Image(game, 0, 0, atlas, icon);
                    this.container.addChild(this._icon);
                    this._icon.position.set(this.width / 2 - this._icon.width / 2, this.height / 2 - this._icon.height / 2 - 3);
                }
                this.events.onInputDown.add(this.down, this);
                this.events.onInputUp.add(this.up, this);
                this.events.onInputOut.add(this.up, this);
            }
            Button.prototype.setIcon = function (frame) {
                this._icon.frameName = frame;
                this._icon.position.set(this.width / 2 - this._icon.width / 2, this.height / 2 - this._icon.height / 2 - 3);
            };
            Button.prototype.down = function () {
                this._isDown = true;
                this.container.y = this._offset;
                this.game.sound.play(this._sound);
            };
            Button.prototype.up = function () {
                this._isDown = false;
                this.container.y = 0;
            };
            return Button;
        }(Phaser.Button));
        display.Button = Button;
    })(display = KE.display || (KE.display = {}));
})(KE || (KE = {}));
/// <reference path="./Button.ts" />
var KE;
(function (KE) {
    var display;
    (function (display) {
        var TextButton = (function (_super) {
            __extends(TextButton, _super);
            function TextButton(game, text, textStyle, callback, callbackContext, up_state, down_state, atlas, offset, icon) {
                if (offset === void 0) { offset = 2; }
                if (icon === void 0) { icon = ""; }
                _super.call(this, game, callback, callbackContext, up_state, down_state, atlas, icon, offset);
                this._text = new Phaser.Text(game, 0, 0, text, textStyle);
                var textBounds = this._text.getLocalBounds();
                this._text.x = this.width / 2 - textBounds.width / 2;
                this._text.y = this.height / 2 - textBounds.height / 2;
                this.container.add(this._text);
            }
            return TextButton;
        }(display.Button));
        display.TextButton = TextButton;
    })(display = KE.display || (KE.display = {}));
})(KE || (KE = {}));
var KE;
(function (KE) {
    var display;
    (function (display) {
        (function (Orientation) {
            Orientation[Orientation["Vertical"] = 1] = "Vertical";
            Orientation[Orientation["Horizontal"] = 2] = "Horizontal";
        })(display.Orientation || (display.Orientation = {}));
        var Orientation = display.Orientation;
        var ScrollContainer = (function (_super) {
            __extends(ScrollContainer, _super);
            function ScrollContainer(game, width, height, needMask) {
                if (needMask === void 0) { needMask = true; }
                _super.call(this, game);
                this._verticalGap = 0;
                this._mousedown = false;
                this._lastPos = new PIXI.Point();
                this._lastDiff = null;
                this._scrollTween = null;
                this._maxVel = 0;
                this._startDragPoint = new Phaser.Point();
                this._orientation = Orientation.Vertical;
                this._po = new Phaser.Sprite(game, 0, 0);
                this._scroll = new Phaser.Group(game);
                this._needMask = needMask;
                this._po.addChild(this._scroll);
                this._w = width;
                this._h = height;
                this._msk = new Phaser.Graphics(game);
                this._msk.beginFill(0xFFFFFF)
                    .drawRect(0, 0, width, height)
                    .endFill();
                if (needMask) {
                    this._po.addChild(this._msk);
                    this._scroll.mask = this._msk;
                }
                _super.prototype.addChild.call(this, this._po);
                this._po.inputEnabled = true;
                /* this._po.input.allowHorizontalDrag = false;
                 this._po.input.draggable = true;*/
                this._po.hitArea = new PIXI.Rectangle(0, 0, width, height);
                //this._po.events.onInputOut.add(this.onmouseup, this);
                //this._po.events.onInputDown.add(this.onmousedown, this);
                //this._po.events.onInputUp.add(this.onmouseup, this);
                //PIXI.ticker.shared.add();
            }
            ScrollContainer.prototype.updateSize = function (w, h, o) {
                if (this._w == w && this._h == h)
                    return;
                this._msk.clear();
                this._msk.beginFill(0xFFFFFF)
                    .drawRect(0, 0, w, h)
                    .endFill();
                if (this._needMask)
                    this._scroll.mask = this._msk;
                this._w = w;
                this._h = h;
                this._po.hitArea = new PIXI.Rectangle(0, 0, w, h);
                this.orientation = o;
            };
            Object.defineProperty(ScrollContainer.prototype, "orientation", {
                get: function () {
                    return this._orientation;
                },
                set: function (o) {
                    this._orientation = o;
                    this._maxVel = 0;
                    this.onmouseup(this._po, null, false);
                    if (o == Orientation.Horizontal) {
                        this._scroll.y = 0;
                    }
                    else {
                        this._scroll.x = 0;
                    }
                },
                enumerable: true,
                configurable: true
            });
            ScrollContainer.prototype.removeChildren = function (beginIndex, endIndex) {
                return this._scroll.removeChildren(beginIndex, endIndex);
            };
            ScrollContainer.prototype.addChild = function (child) {
                child.y = this._scroll.getLocalBounds().height;
                if (this._scroll.children.length)
                    child.y += this._verticalGap;
                this._scroll.addChild(child);
                return child;
            };
            Object.defineProperty(ScrollContainer.prototype, "verticalGap", {
                get: function () {
                    return this._verticalGap;
                },
                set: function (value) {
                    this._verticalGap = value;
                },
                enumerable: true,
                configurable: true
            });
            ScrollContainer.prototype.scrollTo = function (x, y) {
                if (x != NaN) {
                    this._scroll.x = x;
                }
                if (y != NaN) {
                    this._scroll.y = y;
                }
            };
            ScrollContainer.prototype.onmousemove = function (pointer, x, y) {
                //e.stopPropagation();
                if (this._orientation == Orientation.Vertical && this._scroll.height < this._h)
                    return;
                else if (this._orientation == Orientation.Horizontal && this._scroll.width < this._w)
                    return;
                if (this._mousedown) {
                    if (this._orientation == Orientation.Vertical) {
                        this._lastDiff = pointer.clientY - this._lastPos.y;
                        this._lastPos.y = pointer.clientY;
                        if (this._scroll.y > 0 || this._scroll.y + this._scroll.height * 1.1 < this._h) {
                            this._scroll.y += this._lastDiff / 5;
                            this._isOverFlow = true;
                        }
                        else {
                            this._scroll.y += this._lastDiff;
                            this._isOverFlow = false;
                        }
                    }
                    else {
                        this._lastDiff = pointer.clientX - this._lastPos.x;
                        this._lastPos.x = pointer.clientX;
                        if (this._scroll.x > 0 || this._scroll.x + this._scroll.width * 1.05 < this._w) {
                            this._scroll.x += this._lastDiff / 5;
                            this._isOverFlow = true;
                        }
                        else {
                            this._scroll.x += this._lastDiff;
                            this._isOverFlow = false;
                        }
                    }
                }
            };
            ScrollContainer.prototype.onmousedown = function (s, pointer) {
                //e.stopPropagation();
                if (this._orientation == Orientation.Vertical && this._scroll.height < this._h)
                    return;
                else if (this._orientation == Orientation.Horizontal && this._scroll.width < this._w)
                    return;
                //let lp = pointer..getLocalPosition(this._po);
                if (this._po.hitArea.contains(pointer.clientX, pointer.clientY)) {
                    //var clientY: number = !e.data.originalEvent.touches ? e.data.originalEvent.clientY : e.data.originalEvent.touches[0].clientY;
                    this._mousedown = true;
                    // if (scrollTween) scrollTween.kill();
                    this._lastPos.y = this._startDragPoint.y = pointer.clientY;
                    this._lastPos.x = this._startDragPoint.x = pointer.clientX;
                    this.game.input.addMoveCallback(this.onmousemove, this);
                    this._startDragTime = this.game.time.now;
                }
            };
            ScrollContainer.prototype.onmouseup = function (s, pointer, isOver) {
                //e.stopPropagation();
                if (this._orientation == Orientation.Vertical) {
                    if (this._scroll.height < this._h)
                        return;
                    if (this._scroll.y > 0) {
                        this._scroll.y = 0;
                    }
                    else if (this._scroll.y + this._scroll.height * 1.1 < this._h) {
                        this._scroll.y = this._h - this._scroll.height * 1.1;
                        this._maxVel = 0;
                    }
                }
                else {
                    if (this._scroll.width < this._w)
                        return;
                    if (this._scroll.x > 0) {
                        this._scroll.x = 0;
                    }
                    else if (this._scroll.x + this._scroll.width * 1.05 < this._w) {
                        this._scroll.x = this._w - this._scroll.width * 1.05;
                        this._maxVel = 0;
                    }
                }
                this._mousedown = false;
                this._lastDiff = 0;
                this.game.input.deleteMoveCallback(this.onmousemove, this);
                if (this._orientation == Orientation.Vertical)
                    this._maxVel = pointer ? (pointer.clientY - this._startDragPoint.y) / (this.game.time.now - this._startDragTime) * 1000 : 0;
                else
                    this._maxVel = pointer ? (pointer.clientX - this._startDragPoint.x) / (this.game.time.now - this._startDragTime) * 1000 : 0;
            };
            Object.defineProperty(ScrollContainer.prototype, "contentWidth", {
                get: function () {
                    return this._scroll.width * 1.05;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ScrollContainer.prototype, "width", {
                get: function () {
                    return this._w;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ScrollContainer.prototype, "height", {
                get: function () {
                    return this._h;
                },
                enumerable: true,
                configurable: true
            });
            ScrollContainer.prototype.update = function () {
                if (!this._isDown && this.game.input.activePointer && this.game.input.activePointer.isDown) {
                    this.onmousedown(null, this.game.input.activePointer);
                    this._isDown = true;
                }
                else if (this._isDown && (this.game.input.activePointer && !this.game.input.activePointer.isDown || !this.game.input.activePointer)) {
                    this.onmouseup(null, this.game.input.activePointer, true);
                    this._isDown = false;
                }
                for (var i = 0; i < this._scroll.children.length; i++) {
                    this._scroll.children[i]["update"]();
                }
                if (this._maxVel && !this._mousedown) {
                    if (this._orientation == Orientation.Vertical) {
                        this._scroll.y += this._maxVel * this.game.time.elapsedMS / 1000;
                        this._maxVel *= 0.95;
                        if (this._scroll.y > 0) {
                            this._scroll.y = 0;
                            this._maxVel = 0;
                        }
                        if (this._scroll.y + this._scroll.height * 1.1 < this._h) {
                            this._maxVel = 0;
                            this._scroll.y = this._h - this._scroll.height * 1.1;
                        }
                        if (Math.abs(this._maxVel) < 3) {
                            this._maxVel = 0;
                        }
                    }
                    else {
                        this._scroll.x += this._maxVel * this.game.time.elapsedMS / 1000;
                        this._maxVel *= 0.95;
                        if (this._scroll.x > 0) {
                            this._scroll.x = 0;
                            this._maxVel = 0;
                        }
                        if (this._scroll.x + this._scroll.getBounds().width * 1.05 < this._w) {
                            this._maxVel = 0;
                            this._scroll.x = this._w - this._scroll.width * 1.05;
                        }
                        if (Math.abs(this._maxVel) < 3) {
                            this._maxVel = 0;
                        }
                    }
                }
            };
            return ScrollContainer;
        }(Phaser.Group));
        display.ScrollContainer = ScrollContainer;
    })(display = KE.display || (KE.display = {}));
})(KE || (KE = {}));
var KE;
(function (KE) {
    var display;
    (function (display) {
        var Slider = (function (_super) {
            __extends(Slider, _super);
            function Slider(game, up_state, down_state, bg, fill, atlas, values) {
                _super.call(this, game);
                this.onChange = new Phaser.Signal();
                this._value = 0;
                this._downPoint = new Phaser.Point();
                this._startPos = 0;
                this._isDown = false;
                this._bg = new display.Image9Patch(game, atlas, bg, new PIXI.Rectangle(0, 16, 24, 2));
                this._fill = new display.Image9Patch(game, atlas, fill, new PIXI.Rectangle(0, 12, 24, 1));
                this._values = values;
                this._button = new Phaser.Image(game, 0, 0, atlas, up_state);
                this.addChild(this._bg);
                this.addChild(this._fill);
                this.addChild(this._button);
                this._bg.x = -this._bg.width / 2;
                this._fill.x = -this._fill.width / 2;
                this._button.x = -this._button.width / 2;
                this._upState = up_state;
                this._downState = down_state;
                this._button.events.onInputDown.add(this.down, this);
                this._button.events.onInputUp.add(this.up, this);
                game.input.addMoveCallback(this.over, this);
                this._button.inputEnabled = true;
                this._minValue = -10;
                this._maxValue = this._height - this._button.height * 0.8;
            }
            Object.defineProperty(Slider.prototype, "height", {
                set: function (value) {
                    this._bg.height = value;
                    this._height = value;
                    this._minValue = -10;
                    this._maxValue = this._height - this._button.height * 0.8;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Slider.prototype, "value", {
                get: function () {
                    return this._value;
                },
                set: function (v) {
                    this._fill.height = (this._height - this._button.height) * v + this._button.height * 0.5;
                    this._fill.y = (this._height - this._button.height) * (1 - v) + this._button.height * 0.5;
                    this._button.y = (1 - v) * (this._maxValue - this._minValue);
                    this._value = v;
                    this.onChange.dispatch();
                },
                enumerable: true,
                configurable: true
            });
            Slider.prototype.down = function (target, pointer) {
                this._button.frameName = this._downState;
                this._downPoint.set(pointer.x, pointer.y);
                this._startPos = this._button.y;
                this._isDown = true;
            };
            Slider.prototype.up = function () {
                this._button.frameName = this._upState;
                this._isDown = false;
            };
            Slider.prototype.over = function (pointer, pointer_x, pointer_y) {
                if (this._isDown) {
                    var cy = KE.math.FMath.clamp(this._minValue, this._maxValue, this._startPos + (pointer.y - this._downPoint.y));
                    var v = 1 - cy / (this._maxValue - this._minValue);
                    for (var i = 0; i < this._values.length; i++) {
                        if (i == 0 && v < (this._values[1] - this._values[0]) / 2) {
                            v = this._values[0];
                            break;
                        }
                        else if (i == this._values.length - 1 && v >= this._values[this._values.length - 2] + (this._values[this._values.length - 1] - this._values[this._values.length - 2]) / 2) {
                            v = this._values[this._values.length - 1];
                            break;
                        }
                        if (v >= this._values[i - 1] + (this._values[i] - this._values[i - 1]) / 2 && v < this._values[i] + (this._values[i + 1] - this._values[i]) / 2) {
                            v = this._values[i];
                            break;
                        }
                    }
                    this._button.y = this._minValue + (this._maxValue - this._minValue) * (1 - v);
                    this._fill.height = (this._height - this._button.height) * v + this._button.height * 0.5;
                    this._fill.y = (this._height - this._button.height) * (1 - v) + this._button.height * 0.5;
                    this._value = v;
                    this.onChange.dispatch();
                }
            };
            return Slider;
        }(Phaser.Group));
        display.Slider = Slider;
    })(display = KE.display || (KE.display = {}));
})(KE || (KE = {}));
var KE;
(function (KE) {
    var display;
    (function (display) {
        var Image9Patch = (function (_super) {
            __extends(Image9Patch, _super);
            function Image9Patch(game, texture, frame, rect) {
                _super.call(this, new Phaser.Image(game, 0, 0, texture, frame).texture);
                this._needRedraw = true;
                this._multPoint = new PIXI.Point();
                this._width = 0;
                this._height = 0;
                this.uvs = new Float32Array(new Array(32));
                this.vertices = new Float32Array(new Array(32));
                var indices = [];
                var totalSub = 3 * 3;
                for (var i = 0; i < totalSub; i++) {
                    var xpos = i % 3;
                    var ypos = (i / 3) | 0;
                    var value = (ypos * 4) + xpos;
                    var value2 = (ypos * 4) + xpos + 1;
                    var value3 = ((ypos + 1) * 4) + xpos;
                    var value4 = ((ypos + 1) * 4) + xpos + 1;
                    indices.push(value, value2, value3);
                    indices.push(value2, value4, value3);
                }
                this.indices = new Uint16Array(indices);
                this._rect = rect;
                this._width = this.texture.frame.width;
                this._height = this.texture.frame.height;
                this._rect.x = KE.math.FMath.clamp(0, 1, this._rect.x / this._width);
                this._rect.y = KE.math.FMath.clamp(0, 1, this._rect.y / this._height);
                this._rect.width = KE.math.FMath.clamp(0, 1, this._rect.width / this._width);
                this._rect.height = KE.math.FMath.clamp(0, 1, this._rect.height / this._height);
                this.readjustSize();
            }
            Image9Patch.prototype.getMult = function (i) {
                switch (i % 4) {
                    case 0:
                        this._multPoint.x = 0;
                        break;
                    case 1:
                        this._multPoint.x = this._rect.x;
                        break;
                    case 2:
                        this._multPoint.x = this._rect.x + this._rect.width;
                        break;
                    case 3:
                        this._multPoint.x = 1;
                        break;
                }
                switch (Math.floor(i / 4)) {
                    case 0:
                        this._multPoint.y = 0;
                        break;
                    case 1:
                        this._multPoint.y = this._rect.y;
                        break;
                    case 2:
                        this._multPoint.y = this._rect.y + this._rect.height;
                        break;
                    case 3:
                        this._multPoint.y = 1;
                        break;
                }
            };
            Image9Patch.prototype.getVertex = function (i) {
                switch (i % 4) {
                    case 0:
                        this._multPoint.x = 0;
                        break;
                    case 1:
                        this._multPoint.x = this._rect.x * this.texture.frame.width;
                        break;
                    case 2:
                        this._multPoint.x = this._width - (1 - this._rect.x - this._rect.width) * this.texture.frame.width;
                        break;
                    case 3:
                        this._multPoint.x = this._width;
                        break;
                }
                switch (Math.floor(i / 4)) {
                    case 0:
                        this._multPoint.y = 0;
                        break;
                    case 1:
                        this._multPoint.y = this._rect.y * this.texture.frame.height;
                        break;
                    case 2:
                        this._multPoint.y = this._height - (1 - this._rect.y - this._rect.height) * this.texture.frame.height;
                        break;
                    case 3:
                        this._multPoint.y = this._height;
                        break;
                }
            };
            Image9Patch.prototype.readjustSize = function () {
                for (var i = 0; i < 16; i++) {
                    this.getVertex(i);
                    this.vertices[i * 2] = this._multPoint.x;
                    this.vertices[i * 2 + 1] = this._multPoint.y;
                    this.getMult(i);
                    this.uvs[i * 2] = this.texture.frame.x / this.texture.baseTexture.width + this._multPoint.x * this.texture.frame.width / this.texture.baseTexture.width;
                    this.uvs[i * 2 + 1] = this.texture.frame.y / this.texture.baseTexture.height + this._multPoint.y * this.texture.frame.height / this.texture.baseTexture.height;
                }
                this._needRedraw = true;
            };
            Object.defineProperty(Image9Patch.prototype, "width", {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    this._width = value;
                    this.readjustSize();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Image9Patch.prototype, "height", {
                get: function () {
                    return this._height;
                },
                set: function (value) {
                    this._height = value;
                    this.readjustSize();
                },
                enumerable: true,
                configurable: true
            });
            Image9Patch.prototype.update = function () {
            };
            Image9Patch.prototype.postUpdate = function () {
            };
            return Image9Patch;
        }(PIXI.Strip));
        display.Image9Patch = Image9Patch;
    })(display = KE.display || (KE.display = {}));
})(KE || (KE = {}));
var RushSlots;
(function (RushSlots) {
    var App = (function (_super) {
        __extends(App, _super);
        function App() {
            _super.call(this, 1024, 600, Phaser.AUTO, 'content', null);
            this.state.add('Boot', RushSlots.Boot, false);
            this.state.add('Preloader', RushSlots.Preloader, false);
            this.state.add('Menu', RushSlots.MenuState, false);
            this.state.add('Game_china', RushSlots.China.ChinaGameState, false);
            this.state.start('Boot');
        }
        App.prototype.resize = function () {
            var w = window.innerWidth;
            var h = window.innerHeight;
            this.scale.setGameSize(w, h);
        };
        return App;
    }(Phaser.Game));
    RushSlots.App = App;
})(RushSlots || (RushSlots = {}));
window.onload = function () {
    new RushSlots.App();
};
var KE;
(function (KE) {
    var math;
    (function (math) {
        var Bezier = (function () {
            function Bezier(vertices) {
                this._vertices = vertices;
            }
            Bezier.prototype.getValue = function (t) {
                var r = new math.Vector3();
                r.x = this._vertices[0].x * (1 - t) * (1 - t) + this._vertices[1].x * 2 * (1 - t) * t + this._vertices[2].x * t * t;
                r.y = this._vertices[0].y * (1 - t) * (1 - t) + this._vertices[1].y * 2 * (1 - t) * t + this._vertices[2].y * t * t;
                r.z = this._vertices[0].z * (1 - t) * (1 - t) + this._vertices[1].z * 2 * (1 - t) * t + this._vertices[2].z * t * t;
                r.w = this._vertices[0].w * (1 - t) * (1 - t) + this._vertices[1].w * 2 * (1 - t) * t + this._vertices[2].w * t * t;
                return r;
            };
            return Bezier;
        }());
        math.Bezier = Bezier;
    })(math = KE.math || (KE.math = {}));
})(KE || (KE = {}));
var KE;
(function (KE) {
    var math;
    (function (math) {
        var FMath = (function () {
            function FMath() {
            }
            FMath.abs = function (value) {
                if (value < 0)
                    value = -value;
                return value;
            };
            FMath.sign = function (num) {
                return (num > 0) ? 1 : ((num < 0) ? -1 : 0);
            };
            FMath.randomGauss = function (mu, sigma) {
                var a = 0;
                var b = 0;
                var s = 0;
                do {
                    a = 2 * Math.random() - 1;
                    b = 2 * Math.random() - 1;
                    s = a * a + b * b;
                } while (s >= 1 || s == 0);
                var multiplier = Math.sqrt(-2 * Math.log(s) / s);
                return mu + sigma * a * multiplier;
            };
            FMath.ease = function (t, a, b) {
                var k = 0;
                var s = a + b;
                if (s == 0)
                    return t;
                if (s > 1) {
                    a = a / s;
                    b = b / s;
                }
                k = 1 / (2 - a - b);
                if (t < a) {
                    return ((k / a) * t * t);
                }
                else {
                    if (t <= 1 - b) {
                        return (k * (2 * t - a));
                    }
                    else {
                        t = 1 - t;
                        return (1 - (k / b) * t * t);
                    }
                }
            };
            FMath.clamp = function (min, max, value) {
                if (value > max)
                    return max;
                if (value < min)
                    return min;
                return value;
            };
            FMath.lerp = function (v1, v2, t) {
                if (t <= 0)
                    return v1;
                if (t >= 1)
                    return v2;
                return (v1 + (v2 - v1) * t);
            };
            FMath.lerpClouds = function (amount, start, end) {
                if (start == end) {
                    return start;
                }
                return ((1 - amount) * start) + (amount * end);
            };
            FMath.degToRad = function (deg) {
                return deg * (Math.PI / 180);
            };
            FMath.ease_inv = function (y, a, b) {
                if (y < 0 || y > 1 || a < 0 || b < 0)
                    return y;
                var s = a + b;
                if (s == 0)
                    return y;
                if (s > 1) {
                    a /= s;
                    b /= s;
                }
                var k = 1 / (2 - a - b);
                if (y < k * a)
                    return Math.sqrt(a * y / k);
                else if (y < 1 - k * b)
                    return (y + a * k) / (2 * k);
                else
                    return 1 - Math.sqrt(b * (1 - y) / k);
            };
            FMath.easeInSine = function (t) {
                return (t == 1) ? 1 : -Math.cos(t * this.PI_05) + 1;
            };
            FMath.randomInt = function (a, b) {
                var result = 0;
                if (a == b) {
                    result = a;
                }
                else if (a > b) {
                    result = (b + Math.random() * (a - b));
                }
                else {
                    result = (a + Math.random() * (b - a));
                }
                return result;
            };
            FMath.randomFloat = function (a, b) {
                var result = 0.0;
                if (a == b) {
                    result = a;
                }
                else if (a > b) {
                    result = b + Math.random() * (a - b);
                }
                else {
                    result = a + Math.random() * (b - a);
                }
                return result;
            };
            FMath.randomBoolean = function () {
                return Math.random() > 0.5;
            };
            FMath.randomSign = function () {
                var value = this.sign(-0.5 + Math.random());
                return value == 0 ? 1 : value;
            };
            FMath.PI_05 = Math.PI / 2;
            return FMath;
        }());
        math.FMath = FMath;
    })(math = KE.math || (KE.math = {}));
})(KE || (KE = {}));
var KE;
(function (KE) {
    var math;
    (function (math) {
        var FPoint = (function () {
            function FPoint(x, y) {
                this.x = NaN;
                this.y = NaN;
                this.x = x;
                this.y = y;
            }
            FPoint.prototype.getDistanceToOrigin = function () {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            };
            FPoint.prototype.length = function () {
                return this.getDistanceToOrigin();
            };
            FPoint.prototype.normalized = function () {
                var lengthInv = 1.0 / Math.sqrt(this.x * this.x + this.y * this.y);
                return new KE.math.FPoint(this.x * lengthInv, this.y * lengthInv);
            };
            FPoint.prototype.isEqualToPoint = function (p) {
                return (this.x == p.x && this.y == p.y);
            };
            FPoint.prototype.addPoint = function (p) {
                this.x += p.x;
                this.y += p.y;
            };
            FPoint.prototype.sum = function (p) {
                return new KE.math.FPoint(p.x + this.x, p.y + this.y);
            };
            FPoint.prototype.subtractPoint = function (p) {
                this.x -= p.x;
                this.y -= p.y;
            };
            FPoint.prototype.subtracted = function (p) {
                return new KE.math.FPoint(this.x - p.x, this.y - p.y);
            };
            FPoint.prototype.setTo = function (p) {
                this.x = p.x;
                this.y = p.y;
            };
            FPoint.prototype.scale = function (s) {
                this.x *= s;
                this.y *= s;
            };
            FPoint.prototype.scaled = function (s) {
                return new KE.math.FPoint(this.x * s, this.y * s);
            };
            FPoint.prototype.rotated = function (angle) {
                var sin = Math.sin(angle);
                var cos = Math.cos(angle);
                var newX = this.x * cos + this.y * sin;
                var newY = -this.x * sin + this.y * cos;
                return new KE.math.FPoint(newX, newY);
            };
            FPoint.prototype.rotate = function (angle) {
                var sin = Math.sin(angle);
                var cos = Math.cos(angle);
                var newX = this.x * cos + this.y * sin;
                var newY = -this.x * sin + this.y * cos;
                this.x = newX;
                this.y = newY;
            };
            FPoint.prototype.getDistanceToPoint = function (p) {
                return Math.sqrt((this.x - p.x) * (this.x - p.x) + (this.y - p.y) * (this.y - p.y));
            };
            FPoint.prototype.getAngle = function () {
                return Math.atan2(this.y, this.x);
            };
            FPoint.prototype.getDirectedAngle = function (second) {
                var angle1 = this.getAngle();
                var angle2 = second.getAngle();
                return angle2 - angle1;
            };
            FPoint.prototype.getDirectedAngleNormalize = function (second) {
                var ans = this.getDirectedAngle(second);
                while (ans < 0) {
                    ans += Math.PI * 2;
                }
                while (ans >= Math.PI * 2) {
                    ans -= Math.PI * 2;
                }
                return ans;
            };
            return FPoint;
        }());
        math.FPoint = FPoint;
    })(math = KE.math || (KE.math = {}));
})(KE || (KE = {}));
var KE;
(function (KE) {
    var math;
    (function (math) {
        var SplineVector3 = (function () {
            function SplineVector3(vertices, verticesSupport, numPoints) {
                if (vertices === void 0) { vertices = null; }
                if (verticesSupport === void 0) { verticesSupport = null; }
                if (numPoints === void 0) { numPoints = 0; }
                this.gradient = new Array();
                this._vertices = new Array();
                if (vertices != null)
                    this.init(vertices, verticesSupport, numPoints);
            }
            SplineVector3.prototype.addKey = function (key) {
                this._vertices.push(key);
            };
            SplineVector3.prototype.calculateGradient = function (numPoints) {
                this.init(this._vertices, null, numPoints);
            };
            SplineVector3.prototype.clear = function () {
                if (this._vertices != null) {
                    this._vertices.splice(0, this._vertices.length);
                }
                if (this.gradient != null) {
                    this.gradient.splice(0, this.gradient.length);
                }
            };
            SplineVector3.prototype.init = function (vertices, verticesSupport, numPoints) {
                this.gradient.length = 0;
                var vLength = vertices.length - 1;
                for (var i = 0; i <= numPoints; i++) {
                    var offset = vLength * i / numPoints;
                    var vertexIndex = Math.floor(offset);
                    var p0 = null;
                    var p0Index = vertexIndex - 1;
                    if (p0Index < 0 && verticesSupport != null)
                        p0 = verticesSupport[0];
                    else if (p0Index < 0 && verticesSupport == null)
                        p0 = vertices[0];
                    else
                        p0 = vertices[p0Index];
                    var p1 = vertices[vertexIndex];
                    var p2 = null;
                    var p2Index = vertexIndex + 1;
                    if (p2Index == vertices.length && verticesSupport != null)
                        p2 = verticesSupport[0];
                    else if (p2Index == vertices.length && verticesSupport == null)
                        p2 = vertices[p2Index - 1];
                    else
                        p2 = vertices[p2Index];
                    var p3 = null;
                    var p3Index = vertexIndex + 2;
                    if (p3Index == vertices.length && verticesSupport != null)
                        p3 = verticesSupport[vertices.length - 1];
                    else if (p3Index == vertices.length && verticesSupport == null)
                        p3 = vertices[vertices.length - 1];
                    else if (p3Index == vertices.length + 1 && verticesSupport != null)
                        p3 = verticesSupport[vertices.length - 2];
                    else if (p3Index == vertices.length + 1 && verticesSupport == null)
                        p3 = vertices[vertices.length - 1];
                    else
                        p3 = vertices[vertexIndex + 2];
                    var q = this.spline(p0, p1, p2, p3, offset - vertexIndex);
                    this.gradient.push(q);
                }
            };
            SplineVector3.prototype.spline = function (p0, p1, p2, p3, t) {
                return new KE.math.Vector3(0.5 * ((2 * p1.x) + t * ((-p0.x + p2.x) + t * ((2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) + t * (-p0.x + 3 * p1.x - 3 * p2.x + p3.x)))), 0.5 * ((2 * p1.y) + t * ((-p0.y + p2.y) + t * ((2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) + t * (-p0.y + 3 * p1.y - 3 * p2.y + p3.y)))), 0.5 * ((2 * p1.z) + t * ((-p0.z + p2.z) + t * ((2 * p0.z - 5 * p1.z + 4 * p2.z - p3.z) + t * (-p0.z + 3 * p1.z - 3 * p2.z + p3.z)))), 0.5 * ((2 * p1.w) + t * ((-p0.w + p2.w) + t * ((2 * p0.w - 5 * p1.w + 4 * p2.w - p3.w) + t * (-p0.w + 3 * p1.w - 3 * p2.w + p3.w)))));
            };
            SplineVector3.prototype.getGlobalFrame = function (time) {
                time = KE.math.FMath.clamp(0, 1, time);
                var stepLength = 1 / this.gradient.length;
                var currentStep = Math.floor(time * this.gradient.length);
                if (currentStep >= this.gradient.length - 1)
                    currentStep = this.gradient.length - 2;
                var currenStepDelay = time / stepLength - currentStep;
                var result = new KE.math.Vector3();
                result.x = this.gradient[currentStep].x + (this.gradient[currentStep + 1].x - this.gradient[currentStep].x) * currenStepDelay;
                result.y = this.gradient[currentStep].y + (this.gradient[currentStep + 1].y - this.gradient[currentStep].y) * currenStepDelay;
                result.z = this.gradient[currentStep].z + (this.gradient[currentStep + 1].z - this.gradient[currentStep].z) * currenStepDelay;
                result.w = this.gradient[currentStep].w + (this.gradient[currentStep + 1].w - this.gradient[currentStep].w) * currenStepDelay;
                return result;
            };
            Object.defineProperty(SplineVector3.prototype, "vertices", {
                get: function () {
                    return this._vertices;
                },
                enumerable: true,
                configurable: true
            });
            return SplineVector3;
        }());
        math.SplineVector3 = SplineVector3;
    })(math = KE.math || (KE.math = {}));
})(KE || (KE = {}));
var KE;
(function (KE) {
    var math;
    (function (math) {
        var Vector3 = (function () {
            function Vector3(x, y, z, w) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (z === void 0) { z = 0; }
                if (w === void 0) { w = 0; }
                this.x = x;
                this.y = y;
                this.z = z;
                this.w = w;
            }
            return Vector3;
        }());
        math.Vector3 = Vector3;
    })(math = KE.math || (KE.math = {}));
})(KE || (KE = {}));
var RushSlots;
(function (RushSlots) {
    var Slots;
    (function (Slots) {
        var ChipsFactory = (function () {
            function ChipsFactory() {
            }
            ChipsFactory.create = function (game, chipConfig) {
                switch (chipConfig.type) {
                    case "china_chip":
                        return new RushSlots.China.ChinaColorChip(game, chipConfig);
                }
                return null;
            };
            return ChipsFactory;
        }());
        Slots.ChipsFactory = ChipsFactory;
    })(Slots = RushSlots.Slots || (RushSlots.Slots = {}));
})(RushSlots || (RushSlots = {}));
var RushSlots;
(function (RushSlots) {
    var China;
    (function (China) {
        var BoardView = (function (_super) {
            __extends(BoardView, _super);
            function BoardView(game, board) {
                _super.call(this, game, null, "", false);
                var sky_top = new Phaser.Image(game, 0, 0, "china", "sky_top");
                sky_top.anchor.set(0.5, 1);
                sky_top.width = 2000;
                sky_top.height = 800;
                sky_top.y = -400;
                var skyGradient = new Phaser.Image(game, 0, 0, "china", "sky_gradient");
                skyGradient.anchor.set(0.5, 0);
                skyGradient.width = 2000;
                skyGradient.scale.y = 1.4;
                skyGradient.y = -400;
                var bottomBg = new Phaser.Image(game, 0, 0, "china", "bottom_bg");
                bottomBg.anchor.set(0.5, 0);
                bottomBg.y = 224;
                bottomBg.width = 2000;
                bottomBg.height = 1000;
                var boardBg = new Phaser.Image(game, -304, -250, "china", "board_bg");
                var frameLeft = new Phaser.Image(game, -442, -250, "china", "frame_left");
                var frameRight = new Phaser.Image(game, 267, -250, "china", "frame_right");
                var frameTop = new Phaser.Image(game, -512, -488, "china", "frame_top");
                var floor = new Phaser.Image(game, -550, 224, "china", "china_floor");
                var leftTree1 = new Phaser.Image(game, -600, -200, "china", "tree");
                var leftTree2 = new Phaser.Image(game, -520, -80, "china", "tree");
                var rightTree1 = new Phaser.Image(game, 600, -200, "china", "tree");
                var rightTree2 = new Phaser.Image(game, 520, -80, "china", "tree");
                rightTree1.scale.set(-1, 1);
                rightTree2.scale.set(-1, 1);
                var fenceRight1 = new Phaser.Image(game, 365, 80, "china", "fence");
                var fenceRight2 = new Phaser.Image(game, 505, 80, "china", "fence");
                var fenceLeft1 = new Phaser.Image(game, -365, 80, "china", "fence");
                var fenceLeft2 = new Phaser.Image(game, -505, 80, "china", "fence");
                fenceLeft1.scale.set(-1, 1);
                fenceLeft2.scale.set(-1, 1);
                var lightLeft1 = new China.ChinaLight(game, 1, 1 * Math.PI / 55, -Math.PI / 20);
                var lightLeft2 = new China.ChinaLight(game, 2, 3 * Math.PI / 55, Math.PI / 35);
                var lightLeft3 = new China.ChinaLight(game, 3, 2 * Math.PI / 55, -Math.PI / 30);
                lightLeft1.position.set(-420, -315);
                lightLeft2.position.set(-420, -315);
                lightLeft3.position.set(-420, -315);
                var lightRight1 = new China.ChinaLight(game, 1, -1 * Math.PI / 55, Math.PI / 20);
                var lightRight2 = new China.ChinaLight(game, 2, -3 * Math.PI / 55, -Math.PI / 35);
                var lightRight3 = new China.ChinaLight(game, 3, -2 * Math.PI / 55, Math.PI / 30);
                lightRight1.position.set(420, -315);
                lightRight2.position.set(420, -315);
                lightRight3.position.set(420, -315);
                this.add(skyGradient);
                for (var i = 0; i < 20; i++) {
                    var star = new Phaser.Image(game, -800 + Math.random() * 1600, -700 + Math.random() * 800, "china", "star");
                    star.scale.x = star.scale.y = 0.3 + Math.random() * 0.4;
                    star.alpha = 0.2 + Math.random() * 0.4;
                    this.add(star);
                }
                this.add(bottomBg);
                this.add(boardBg);
                this.add(board);
                this.add(floor);
                this.add(sky_top);
                this.add(leftTree1);
                this.add(leftTree2);
                this.add(rightTree1);
                this.add(rightTree2);
                this.add(fenceRight2);
                this.add(fenceRight1);
                this.add(fenceLeft2);
                this.add(fenceLeft1);
                this.add(frameLeft);
                this.add(frameRight);
                this.add(frameTop);
                this.add(lightLeft3);
                this.add(lightLeft2);
                this.add(lightLeft1);
                this.add(lightRight3);
                this.add(lightRight2);
                this.add(lightRight1);
                this.pivot.set(-5, -30);
            }
            return BoardView;
        }(Phaser.Group));
        China.BoardView = BoardView;
    })(China = RushSlots.China || (RushSlots.China = {}));
})(RushSlots || (RushSlots = {}));
var RushSlots;
(function (RushSlots) {
    var Slots;
    (function (Slots) {
        var Board = (function (_super) {
            __extends(Board, _super);
            function Board(game, gameConfig) {
                _super.call(this, game);
                this.spinCompleted = new Phaser.Signal();
                this._columns = [];
                this._lines = [];
                this._map = [];
                this._gameConfig = gameConfig;
                for (var i = 0; i < gameConfig.board.width; i++) {
                    var column = new Slots.Column(game, gameConfig, i);
                    column.x = gameConfig.board.cellWidth * (i);
                    this._columns.push(column);
                    this.add(column);
                    for (var j = 0; j < gameConfig.board.height; j++) {
                        this._map[i] = [];
                        this._map[i][j] = null;
                    }
                }
                for (var i = 0; i < gameConfig.board.lines.length; i++) {
                    this._lines.push(new Slots.Line(gameConfig.board.lines[i]));
                }
                this.pivot.set(this.w / 2, this.h / 2);
            }
            Object.defineProperty(Board.prototype, "w", {
                get: function () {
                    return this._gameConfig.board.width * this._gameConfig.board.cellWidth;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Board.prototype, "h", {
                get: function () {
                    return this._gameConfig.board.height * this._gameConfig.board.cellHeight;
                },
                enumerable: true,
                configurable: true
            });
            Board.prototype.startSpin = function () {
                for (var i = 0; i < this._columns.length; i++) {
                    this.game.add.tween(this._columns[i])
                        .to({ speed: -200 }, 300, Phaser.Easing.Cubic.Out, true, /*i * 20*/ 0);
                    this.game.add.tween(this._columns[i])
                        .to({ speed: 2000 + Math.random() * 2000 }, 900, Phaser.Easing.Cubic.Out, true, /*i * 200 + */ 300);
                }
                this.game.add.tween(this).to({}, 1, null, true, 1000 + Math.random() * 1500).onComplete.addOnce(this.stopSpin, this);
            };
            Board.prototype.stopSpin = function () {
                for (var i = 0; i < this._columns.length; i++) {
                    this.game.add.tween(this._columns[i])
                        .to({}, 0, Phaser.Easing.Linear.None, true, i * 250 + Math.random() * 250)
                        .onComplete.add(this._columns[i].stop, this._columns[i]);
                    this._columns[i].stopSpin.addOnce(this.columnStopped, this);
                }
            };
            Board.prototype.columnStopped = function () {
                for (var i = 0; i < this._columns.length; i++) {
                    if (this._columns[i].speed != 0)
                        return;
                }
                for (var i = 0; i < this._gameConfig.board.width; i++) {
                    for (var j = 0; j < this._gameConfig.board.height; j++) {
                        this._map[i][j] = this._columns[i].getChipAt(j);
                    }
                }
                this.spinComplete();
            };
            Board.prototype.showHihglight = function (chips, color) {
                for (var i = 0; i < chips.length; i++) {
                    var chip = this._map[i][chips[i]];
                    if (chip.color == color)
                        chip.showHihgLight();
                }
            };
            Board.prototype.hideHihglight = function (chips) {
                for (var i = 0; i < chips.length; i++) {
                    if (this._map[i] && this._map[i][chips[i]])
                        this._map[i][chips[i]].hideHihglight();
                }
            };
            Board.prototype.spinComplete = function () {
                var resultLines = [];
                for (var i = 0; i < this._lines.length; i++) {
                    var line = this._lines[i].getColorsInLine(this._map);
                    var colors = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    for (var j = 0; j < line.length; j++) {
                        if (!colors[line[j].color])
                            colors[line[j].color] = 0;
                        colors[line[j].color]++;
                    }
                    for (var j = 0; j < 15; j++) {
                        if (colors[j] > 2) {
                            resultLines.push({ color: j, line: i, amount: colors[j] });
                            break;
                        }
                    }
                }
                this.spinCompleted.dispatch(resultLines);
            };
            return Board;
        }(Phaser.Group));
        Slots.Board = Board;
    })(Slots = RushSlots.Slots || (RushSlots.Slots = {}));
})(RushSlots || (RushSlots = {}));
var RushSlots;
(function (RushSlots) {
    var Slots;
    (function (Slots) {
        var Cell = (function (_super) {
            __extends(Cell, _super);
            function Cell() {
                _super.apply(this, arguments);
            }
            return Cell;
        }(Phaser.Group));
        Slots.Cell = Cell;
    })(Slots = RushSlots.Slots || (RushSlots.Slots = {}));
})(RushSlots || (RushSlots = {}));
var RushSlots;
(function (RushSlots) {
    var Slots;
    (function (Slots) {
        var Chip = (function (_super) {
            __extends(Chip, _super);
            function Chip(game, chipConfig) {
                _super.call(this, game);
                this._color = chipConfig.color;
                this._highlight = new Phaser.Image(game, 0, 0, "china", "rays");
                this._highlight.anchor.set(0.5, 0.5);
                this._highlight.blendMode = Phaser.blendModes.ADD;
                //this._highlight.y = this._highlight.height / 2;
                this._highlight.visible = false;
                this.add(this._highlight);
            }
            Chip.prototype.update = function () {
                if (this._highlight.visible) {
                    var dt = this.game.time.elapsed / 1000;
                    this._highlight.rotation += Math.PI / 4 * dt;
                }
            };
            Object.defineProperty(Chip.prototype, "color", {
                get: function () {
                    return this._color;
                },
                enumerable: true,
                configurable: true
            });
            Chip.prototype.showHihgLight = function () {
                this._highlight.visible = true;
            };
            Chip.prototype.hideHihglight = function () {
                this._highlight.rotation = 0;
                this._highlight.visible = false;
            };
            return Chip;
        }(Phaser.Group));
        Slots.Chip = Chip;
    })(Slots = RushSlots.Slots || (RushSlots.Slots = {}));
})(RushSlots || (RushSlots = {}));
var RushSlots;
(function (RushSlots) {
    var Slots;
    (function (Slots) {
        var Column = (function (_super) {
            __extends(Column, _super);
            function Column(game, gameConfig, index) {
                _super.call(this, game);
                this.stopSpin = new Phaser.Signal();
                this._speed = 0;
                this._chips = [];
                this._isStopping = false;
                this._targetStopY = 0;
                this._gameConfig = gameConfig;
                var column = this.shuffleArr(gameConfig.columns[index]);
                var chips = gameConfig.chips;
                for (var i = 1; i < 6; i++) {
                    var chip = Slots.ChipsFactory.create(game, chips[column[column.length - i]]);
                    chip.y = -gameConfig.board.cellHeight * i + gameConfig.board.cellHeight * 0.35;
                    chip.x = gameConfig.board.cellWidth / 2;
                    this.add(chip);
                }
                for (var i = 0; i < column.length; i++) {
                    var chip = Slots.ChipsFactory.create(game, chips[column[i]]);
                    chip.y = gameConfig.board.cellHeight * i + gameConfig.board.cellHeight * 0.35;
                    chip.x = gameConfig.board.cellWidth / 2;
                    this.add(chip);
                    this._chips.push(chip);
                }
            }
            Column.prototype.shuffleArr = function (a) {
                var j, x, i;
                for (i = a.length - 1; i > 0; i--) {
                    j = Math.floor(Math.random() * (i + 1));
                    x = a[i];
                    a[i] = a[j];
                    a[j] = x;
                }
                return a;
            };
            Object.defineProperty(Column.prototype, "speed", {
                get: function () {
                    return this._speed;
                },
                set: function (value) {
                    this._speed = value;
                },
                enumerable: true,
                configurable: true
            });
            Column.prototype.getChipAt = function (index) {
                var currentY = Math.floor(this.y / this._gameConfig.board.cellHeight) - index;
                if (currentY > 0)
                    return this._chips[this._chips.length - currentY];
                else
                    return this._chips[-currentY];
            };
            Column.prototype.update = function () {
                _super.prototype.update.call(this);
                if (this._isStopping) {
                    var dest = this._targetStopY - this.y;
                    if (this.y >= this._targetStopY - 3) {
                        dest = 0;
                        this.y = this._targetStopY;
                        this._isStopping = false;
                        this._speed = 0;
                        this.stopSpin.dispatch();
                    }
                    this._speed = dest * 8;
                }
                var dt = this.game.time.elapsed / 1000;
                if (dt > 0.32)
                    dt = 0.32;
                this.y += this._speed * dt;
                if (this.y > (this._gameConfig.board.height) * this._gameConfig.board.cellHeight) {
                    this.y -= (this._chips.length - this._gameConfig.board.height) * this._gameConfig.board.cellHeight;
                }
                for (var i = 0; i < this._chips.length; i++) {
                    var chip = this._chips[i];
                    var chipY = chip.y + this.y;
                    if (chipY >= -this._gameConfig.board.cellHeight && chipY < this._gameConfig.board.height * this._gameConfig.board.cellHeight) {
                        chip.visible = true;
                    }
                    else
                        chip.visible = false;
                }
            };
            Column.prototype.stop = function () {
                this._isStopping = true;
                this._targetStopY = this.y - this.y % this._gameConfig.board.cellHeight + this._gameConfig.board.cellHeight;
            };
            return Column;
        }(Phaser.Group));
        Slots.Column = Column;
    })(Slots = RushSlots.Slots || (RushSlots.Slots = {}));
})(RushSlots || (RushSlots = {}));
var RushSlots;
(function (RushSlots) {
    var Slots;
    (function (Slots) {
        var Line = (function () {
            function Line(data) {
                this._cells = [];
                this._result = [];
                for (var i = 0; i < data.length; i++) {
                    this._cells.push(new Phaser.Point(data[i][0], data[i][1]));
                    this._result.push(null);
                }
            }
            Object.defineProperty(Line.prototype, "cells", {
                get: function () {
                    return this._cells;
                },
                enumerable: true,
                configurable: true
            });
            Line.prototype.getColorsInLine = function (boardMap) {
                for (var i = 0; i < this._cells.length; i++) {
                    this._result[i] = boardMap[this._cells[i].x][this._cells[i].y];
                }
                return this._result;
            };
            return Line;
        }());
        Slots.Line = Line;
    })(Slots = RushSlots.Slots || (RushSlots.Slots = {}));
})(RushSlots || (RushSlots = {}));
var RushSlots;
(function (RushSlots) {
    var China;
    (function (China) {
        var ChinaColorChip = (function (_super) {
            __extends(ChinaColorChip, _super);
            function ChinaColorChip(game, chipConfig) {
                _super.call(this, game, chipConfig);
                var bg = new Phaser.Image(game, 0, 0, "china", "china_chip_" + chipConfig.color);
                bg.pivot.x = bg.width / 2;
                bg.pivot.y = bg.height / 2;
                bg.scale.set(0.95, 0.95);
                this.add(bg);
            }
            return ChinaColorChip;
        }(RushSlots.Slots.Chip));
        China.ChinaColorChip = ChinaColorChip;
    })(China = RushSlots.China || (RushSlots.China = {}));
})(RushSlots || (RushSlots = {}));
var RushSlots;
(function (RushSlots) {
    var China;
    (function (China) {
        var ChinaLight = (function (_super) {
            __extends(ChinaLight, _super);
            function ChinaLight(game, num, startAngle, lightAngle) {
                _super.call(this, game);
                var rope = new Phaser.Image(game, 0, 0, "china", "rope_" + num);
                var light = new Phaser.Image(game, 0, 0, "china", "light_" + num);
                rope.anchor.set(0.5, 0);
                light.anchor.set(0.5, 0);
                light.y = rope.height * 0.97;
                var angle = Math.PI / 50 + Math.random() * Math.PI / 50;
                var duration = 4000 + Math.random() * 1000;
                this.rotation = startAngle - angle / 2;
                light.rotation = lightAngle + angle / 2;
                this.add(rope);
                this.add(light);
                this.game.add.tween(this).to({ rotation: startAngle + angle / 2 }, duration, Phaser.Easing.Cubic.InOut, true, 0, -1, true);
                this.game.add.tween(light).to({ rotation: startAngle - angle / 2 }, duration, Phaser.Easing.Cubic.InOut, true, 0, -1, true);
            }
            return ChinaLight;
        }(Phaser.Group));
        China.ChinaLight = ChinaLight;
    })(China = RushSlots.China || (RushSlots.China = {}));
})(RushSlots || (RushSlots = {}));
var RushSlots;
(function (RushSlots) {
    var LineView = (function (_super) {
        __extends(LineView, _super);
        function LineView(game, gameConfig, index) {
            _super.call(this, game);
            this.center = new Phaser.Point;
            this.chips = [];
            this.color = -1;
            var cellWidth = gameConfig.board.cellWidth;
            var cellHeight = gameConfig.board.cellHeight;
            var cellHip = Math.sqrt(cellWidth * cellWidth + cellHeight * cellHeight);
            var line = gameConfig.board.lines[index];
            this.center.set(line[2][0] * cellWidth - cellWidth * gameConfig.board.width / 2, line[2][1] * cellHeight - cellHeight * gameConfig.board.height / 2);
            var points = [];
            var dt = 6 / (line.length + 1);
            for (var i = 0; i < line.length; i++) {
                this.chips.push(line[i][1]);
            }
            for (var i = 0; i <= line.length; i++) {
                points.push(new Phaser.Point(i * dt, 0));
            }
            var segmentLeft = new Phaser.Image(game, 0, 0, "ui", "line_bg");
            var lineRope = new PIXI.Strip(segmentLeft.texture);
            var numSectors = (line.length + 1);
            lineRope.indices = new Uint16Array((numSectors) * 6);
            var k = 0;
            for (var i = 0; i < numSectors * 2; i += 2) {
                lineRope.indices[k++] = i;
                lineRope.indices[k++] = i + 1;
                lineRope.indices[k++] = i + 2;
                lineRope.indices[k++] = i + 1;
                lineRope.indices[k++] = i + 2;
                lineRope.indices[k++] = i + 3;
            }
            lineRope.uvs = new Float32Array((numSectors + 1) * 4);
            k = 0;
            var w = lineRope.texture.frame.width / (numSectors + 1);
            for (var i = 0; i <= numSectors; i++) {
                lineRope.uvs[k++] = (lineRope.texture.frame.x + w * i /*+ lineRope.texture.frame.width * 0.5*/) / lineRope.texture.width;
                lineRope.uvs[k++] = (lineRope.texture.frame.y) / lineRope.texture.height;
                lineRope.uvs[k++] = (lineRope.texture.frame.x + w * i /*+ lineRope.texture.frame.width * 0.5*/) / lineRope.texture.width;
                lineRope.uvs[k++] = (lineRope.texture.frame.y + lineRope.texture.frame.height) / lineRope.texture.height;
            }
            lineRope.vertices = new Float32Array((numSectors + 1) * 4);
            var r = lineRope.texture.frame.height * 0.4;
            lineRope.vertices[0] = 0;
            lineRope.vertices[1] = (line[0][1] + 0.5) * cellHeight - r;
            lineRope.vertices[2] = 0;
            lineRope.vertices[3] = (line[0][1] + 0.5) * cellHeight + r;
            k = 4;
            for (var i = 0; i < numSectors - 1; i++) {
                var cell = new Phaser.Point(line[i][0], line[i][1]);
                var nextPoint = new Phaser.Point();
                var prevPoint = new Phaser.Point();
                var currentPoint = new Phaser.Point();
                if (i == numSectors - 2) {
                    nextPoint.set((i + 1.5) * cellWidth, (cell.y + 0.5) * cellHeight);
                    prevPoint.set((i - 0.5) * cellWidth, (line[i - 1][1] + 0.5) * cellHeight);
                }
                else if (i == 0) {
                    nextPoint.set((i + 1.5) * cellWidth, (line[i + 1][1] + 0.5) * cellHeight);
                    prevPoint.set((i - 0.5) * cellWidth, (cell.y + 0.5) * cellHeight);
                }
                else {
                    nextPoint.set((i + 1.5) * cellWidth, (line[i + 1][1] + 0.5) * cellHeight);
                    prevPoint.set((i - 0.5) * cellWidth, (line[i - 1][1] + 0.5) * cellHeight);
                }
                currentPoint.set((i + 0.5) * cellWidth, (cell.y + 0.5) * cellHeight);
                var angle = this.getAngle(prevPoint, currentPoint, nextPoint) / 2;
                var pointsCross = this.getCrosses(prevPoint, currentPoint, nextPoint, r);
                lineRope.vertices[k++] = pointsCross[0].x; //(i + 0.5) * cellWidth + r*Math.cos(angle);
                lineRope.vertices[k++] = pointsCross[0].y; //(cell.y + 0.5) * cellHeight - r * Math.sin(angle);
                lineRope.vertices[k++] = pointsCross[1].x; //(i + 0.5) * cellWidth + r * Math.cos(angle + Math.PI);
                lineRope.vertices[k++] = pointsCross[1].y; //(cell.y + 0.5) * cellHeight - r * Math.sin(angle + Math.PI);
            }
            lineRope.vertices[k++] = (line.length + 0.5) * cellWidth;
            lineRope.vertices[k++] = (line[line.length - 1][1] + 0.5) * cellHeight - r;
            lineRope.vertices[k++] = (line.length + 0.5) * cellWidth;
            lineRope.vertices[k++] = (line[line.length - 1][1] + 0.5) * cellHeight + r;
            lineRope["update"] = lineRope["postUpdate"] = function () { };
            lineRope.blendMode = PIXI.blendModes.ADD;
            this.add(lineRope);
        }
        LineView.prototype.getCrosses = function (a, b, c, r) {
            var v1 = new Phaser.Point(b.x - a.x, b.y - a.y).normalize();
            var v2 = new Phaser.Point(c.x - b.x, c.y - b.y).normalize();
            var v1t = new Phaser.Point(-v1.y, v1.x);
            var v2t = new Phaser.Point(-v2.y, v2.x);
            v1t = v1t.multiply(r, r);
            v2t = v2t.multiply(r, r);
            var p1 = new Phaser.Point(a.x + v1t.x, a.y + v1t.y);
            var p1t = new Phaser.Point(a.x - v1t.x, a.y - v1t.y);
            var p2 = new Phaser.Point(b.x + v1t.x, b.y + v1t.y);
            var p2t = new Phaser.Point(b.x - v1t.x, b.y - v1t.y);
            var p3 = new Phaser.Point(b.x + v2t.x, b.y + v2t.y);
            var p3t = new Phaser.Point(b.x - v2t.x, b.y - v2t.y);
            var p4 = new Phaser.Point(c.x + v2t.x, c.y + v2t.y);
            var p4t = new Phaser.Point(c.x - v2t.x, c.y - v2t.y);
            var cross1 = new Phaser.Point();
            var cross2 = new Phaser.Point();
            var cd1 = ((p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x));
            if (Math.abs(cd1) < 0.00001) {
                cross1.setTo(p2.x, p2.y);
            }
            else {
                cross1.set(((p1.x * p2.y - p1.y * p2.x) * (p3.x - p4.x) - (p1.x - p2.x) * (p3.x * p4.y - p3.y * p4.x)) / cd1, ((p1.x * p2.y - p1.y * p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x * p4.y - p3.y * p4.x)) / cd1);
            }
            var cd2 = ((p1t.x - p2t.x) * (p3t.y - p4t.y) - (p1t.y - p2t.y) * (p3t.x - p4t.x));
            if (Math.abs(cd2) < 0.00001) {
                cross2.setTo(p2t.x, p2t.y);
            }
            else {
                cross2.set(((p1t.x * p2t.y - p1t.y * p2t.x) * (p3t.x - p4t.x) - (p1t.x - p2t.x) * (p3t.x * p4t.y - p3t.y * p4t.x)) / cd2, ((p1t.x * p2t.y - p1t.y * p2t.x) * (p3t.y - p4t.y) - (p1t.y - p2t.y) * (p3t.x * p4t.y - p3t.y * p4t.x)) / cd2);
            }
            return [cross2, cross1];
        };
        LineView.prototype.show = function () {
            this.visible = true;
            this.alpha = 0;
            this.game.add.tween(this).to({ alpha: 1 }, 200, null, true);
        };
        LineView.prototype.hide = function () {
            this.visible = false;
        };
        LineView.prototype.getAngle = function (a, b, c) {
            var x1 = a.x - b.x, x2 = c.x - b.x;
            var y1 = a.y - b.y, y2 = c.y - b.y;
            var d1 = Math.sqrt(x1 * x1 + y1 * y1);
            var d2 = Math.sqrt(x2 * x2 + y2 * y2);
            if ((x1 * y2 - y1 * x2) < 0)
                return Math.acos((x1 * y2 + y1 * x2) / (d1 * d2));
            else
                return Math.PI * 2 - Math.acos((x1 * y2 + y1 * x2) / (d1 * d2));
        };
        return LineView;
    }(Phaser.Group));
    RushSlots.LineView = LineView;
})(RushSlots || (RushSlots = {}));
var RushSlots;
(function (RushSlots) {
    var User = (function () {
        function User() {
            this.onChange = new Phaser.Signal();
            this._coins = 100000;
            this._level = 1;
            this._levelFill = 0;
            this._levelPoints = 0;
        }
        Object.defineProperty(User, "instance", {
            get: function () {
                if (!User._instance)
                    User._instance = new User();
                return User._instance;
            },
            enumerable: true,
            configurable: true
        });
        User.prototype.init = function (levelValues) {
            KE.Persistence.init("10");
            this._levelValues = levelValues;
            this.load();
        };
        User.prototype.load = function () {
            KE.Persistence.load();
            this._coins = KE.Persistence.getNumber("coins", 100000);
            this._level = KE.Persistence.getNumber("level", 1);
            this._levelPoints = KE.Persistence.getNumber("levelPoints", 0);
            var nextLevelPoints = this._levelValues[this._level];
            this._levelFill = this._levelPoints / nextLevelPoints;
            this.onChange.dispatch();
        };
        User.prototype.save = function () {
            KE.Persistence.setNumber("coins", this._coins);
            KE.Persistence.setNumber("level", this._level);
            KE.Persistence.setNumber("levelPoints", this._levelPoints);
            KE.Persistence.save();
        };
        Object.defineProperty(User.prototype, "coins", {
            get: function () {
                return this._coins;
            },
            set: function (value) {
                this._coins = value;
                this.onChange.dispatch();
                this.save();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(User.prototype, "levelFill", {
            get: function () {
                return this._levelFill;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(User.prototype, "level", {
            get: function () {
                return this._level;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(User.prototype, "levelPoints", {
            get: function () {
                return this._levelPoints;
            },
            enumerable: true,
            configurable: true
        });
        User.prototype.addLevelPoints = function (value) {
            if (this._levelValues.length <= this._level + 1)
                return;
            var nextLevelPoints = this._levelValues[this._level];
            while (true) {
                var neededPoints = nextLevelPoints - this._levelPoints;
                if (value < neededPoints) {
                    this._levelPoints += value;
                    break;
                }
                else {
                    value -= neededPoints;
                    this._level++;
                    this._levelPoints = 0;
                    nextLevelPoints = this._levelValues[this._level];
                }
            }
            this._levelFill = this._levelPoints / nextLevelPoints;
            this.onChange.dispatch();
            this.save();
        };
        return User;
    }());
    RushSlots.User = User;
})(RushSlots || (RushSlots = {}));
var RushSlots;
(function (RushSlots) {
    var SlotsState = (function (_super) {
        __extends(SlotsState, _super);
        function SlotsState() {
            _super.apply(this, arguments);
            this._prizes = [];
            this._lineViews = [];
            this._isSpinning = false;
            this._currentPointsLine = -1;
            this._pointsShowTime = 2.5;
            this._pointsShowDelay = 3.5;
            this._pointsTimer = 0;
            this._previousLineHided = false;
            this.isAutoSpin = false;
            this._wasCreated = false;
        }
        SlotsState.prototype.createConfig = function (id) {
            this._gameId = id;
            this._gameConfig = this.game.cache.getJSON("data", false).games[id];
        };
        SlotsState.prototype.create = function () {
            this.start();
            if (this._root) {
                this._pointsPopup.destroy(true);
                this._root.removeAll(true);
                this._overlay.removeAll(true);
            }
            this._root = this.add.group();
            this._overlay = this.add.group();
            var top = this.add.group();
            this._bottomBlock = new RushSlots.SlotsBottomBlock(this.game, this._gameConfig.board.lines.length);
            this._bottomBlock.onAutoSpin.add(this.switchAutoSpin, this);
            this._bottomBlock.onHelp.add(this.helpTriggered, this);
            var closeButton = new KE.display.Button(this.game, this.closeTriggered, this, "close_button_up", "close_button_down", "ui");
            closeButton.pivot.set(closeButton.width + 14, -14);
            top.add(closeButton);
            KE.ui.ResizeManager.addSimple(closeButton, 1, 0);
            this._pointsPopup = new RushSlots.PointsPopup(this.game);
            this._overlay.add(this._pointsPopup);
            KE.ui.ResizeManager.addSimple(this._overlay, 0.5, 0.5);
            this._helpDialog = new RushSlots.PaytablePopup(this.game, this._gameId);
            top.add(this._helpDialog);
            KE.ui.ResizeManager.addSimple(this._helpDialog, 0.5, 0.5);
        };
        SlotsState.prototype.start = function () {
            this.isAutoSpin = false;
            this._isSpinning = false;
            this._resultLines = null;
        };
        SlotsState.prototype.helpTriggered = function () {
            this._helpDialog.show();
        };
        SlotsState.prototype.closeTriggered = function () {
            this.state.start('Menu');
        };
        SlotsState.prototype.switchAutoSpin = function () {
            this.isAutoSpin = !this.isAutoSpin;
        };
        SlotsState.prototype.showPrizes = function () {
            var wholePrize = 0;
            for (var i = 0; i < this._prizes.length; i++) {
                wholePrize += this._prizes[i];
            }
            if (wholePrize > 0) {
                this._pointsPopup.showWhole(wholePrize, 0, 0);
            }
            else if (this.isAutoSpin) {
                this.startSpin();
            }
        };
        SlotsState.prototype.update = function () {
            if (!this._isSpinning && this._resultLines != null && this._resultLines.length) {
                this._pointsTimer += this.game.time.physicsElapsed;
                if (this._pointsTimer > this._pointsShowTime && !this._previousLineHided) {
                    this._previousLineHided = true;
                    this._pointsPopup.hide();
                    for (var i = 0; i < this._lineViews.length; i++) {
                        this._lineViews[i].visible = false;
                        this._board.hideHihglight(this._lineViews[i].chips);
                    }
                    this._currentPointsLine++;
                    if (this._currentPointsLine >= this._resultLines.length) {
                        this._currentPointsLine = 0;
                    }
                    if (this.isAutoSpin) {
                        this.startSpin();
                    }
                }
                if (this._pointsTimer > this._pointsShowDelay) {
                    this._previousLineHided = false;
                    this._pointsTimer = 0;
                    var currentLine = this._lineViews[this._resultLines[this._currentPointsLine].line];
                    currentLine.show();
                    this._pointsPopup.showPart(this._prizes[this._currentPointsLine], 0, currentLine.center.y + 50);
                    this._board.showHihglight(currentLine.chips, currentLine.color);
                }
            }
        };
        SlotsState.prototype.startSpin = function () {
            if (this._isSpinning) {
                if (this.isAutoSpin)
                    this.isAutoSpin = false;
                return;
            }
            for (var i = 0; i < this._lineViews.length; i++) {
                if (this._lineViews[i].chips)
                    this._board.hideHihglight(this._lineViews[i].chips);
            }
            this._previousLineHided = false;
            this._resultLines = null;
            this._pointsTimer = 0;
            this._pointsPopup.hide();
            this._currentPointsLine = -1;
            this._isSpinning = true;
            for (var i = 0; i < this._lineViews.length; i++) {
                this._lineViews[i].visible = false;
            }
        };
        SlotsState.prototype.spinCompleted = function (resultLines) {
            this._prizes.length = 0;
            var startY = -resultLines.length * 3;
            for (var i = 0; i < resultLines.length; i++) {
                this._lineViews[resultLines[i].line].visible = true;
                this._lineViews[resultLines[i].line].color = resultLines[i].color;
                this._lineViews[resultLines[i].line].y = startY + i * 6;
                var linePrize = this._gameConfig.chips[resultLines[i].color].prize[resultLines[i].amount - 3] * this._bottomBlock.currentBet;
                RushSlots.User.instance.coins += linePrize;
                this._prizes.push(linePrize);
            }
            this._resultLines = resultLines;
            this._isSpinning = false;
            this.showPrizes();
        };
        return SlotsState;
    }(Phaser.State));
    RushSlots.SlotsState = SlotsState;
})(RushSlots || (RushSlots = {}));
///<reference path="SlotsState.ts"/>
var RushSlots;
(function (RushSlots) {
    var China;
    (function (China) {
        var ChinaGameState = (function (_super) {
            __extends(ChinaGameState, _super);
            function ChinaGameState() {
                _super.apply(this, arguments);
            }
            ChinaGameState.prototype.preload = function () {
                //You can preload an image here if you dont want to use text for the loading screen
                this.load.atlasJSONHash('china', './assets/gfx/1x/china.png', './assets/gfx/1x/china.json');
            };
            ChinaGameState.prototype.start = function () {
                _super.prototype.start.call(this);
            };
            ChinaGameState.prototype.create = function () {
                var _this = this;
                _super.prototype.createConfig.call(this, "china");
                _super.prototype.create.call(this);
                var topBlock = new RushSlots.TopBlock(this.game);
                this._bottomBlock.onSpin.add(this.startSpin, this);
                this._board = new RushSlots.Slots.Board(this.game, this._gameConfig);
                for (var i = 0; i < this._gameConfig.board.lines.length; i++) {
                    var lineView = new RushSlots.LineView(this.game, this._gameConfig, i);
                    lineView.visible = false;
                    this._lineViews.push(lineView);
                    this._board.add(lineView);
                }
                var boardView = new China.BoardView(this.game, this._board);
                this._root.add(boardView);
                this._root.add(topBlock);
                this._root.add(this._bottomBlock);
                KE.ui.ResizeManager.addSimple(topBlock, 0, 0);
                KE.ui.ResizeManager.addSimple(boardView, 0.5, 0.5);
                boardView.pivot.y = -1000;
                this.game.add.tween(boardView.pivot).to({ y: 70 }, 450, Phaser.Easing.Cubic.Out, true, 450).onComplete.addOnce(function () {
                    _this.game.add.tween(boardView.pivot).to({ y: 0 }, 250, null, true);
                }, this);
                topBlock.pivot.x = 300;
                this.game.add.tween(topBlock.pivot).to({ x: -30 }, 450, Phaser.Easing.Cubic.Out, true, 450).onComplete.addOnce(function () {
                    _this.game.add.tween(topBlock.pivot).to({ x: 0 }, 250, null, true);
                }, this);
                this._bottomBlock.pivot.y = -200;
                this.game.add.tween(this._bottomBlock.pivot).to({ y: 0 }, 450, Phaser.Easing.Cubic.Out, true, 650);
            };
            ChinaGameState.prototype.startSpin = function () {
                if (this._isSpinning)
                    return;
                _super.prototype.startSpin.call(this);
                var bet = this._bottomBlock.currentBet * this._gameConfig.board.lines.length;
                RushSlots.User.instance.coins -= bet;
                RushSlots.User.instance.addLevelPoints(bet);
                this._board.startSpin();
                this._board.spinCompleted.addOnce(this.spinCompleted, this);
            };
            return ChinaGameState;
        }(RushSlots.SlotsState));
        China.ChinaGameState = ChinaGameState;
    })(China = RushSlots.China || (RushSlots.China = {}));
})(RushSlots || (RushSlots = {}));
var RushSlots;
(function (RushSlots) {
    var MenuState = (function (_super) {
        __extends(MenuState, _super);
        function MenuState() {
            _super.apply(this, arguments);
            this._items = [];
            this._menuItems = [];
        }
        MenuState.prototype.preload = function () {
            //You can preload an image here if you dont want to use text for the loading screen
        };
        MenuState.prototype.create = function () {
            var _this = this;
            this._menuItems.length = 0;
            this.stage.setBackgroundColor(0x381948);
            var root = this.add.group();
            this._bg = this.add.image(0, 0, "background", "", root);
            this._logo = new Phaser.Image(this.game, 0, 0, "ui", "game_logo");
            this._logo.anchor.set(0.5, 0);
            this._topBlock = new RushSlots.TopBlock(this.game);
            this._playButton = new KE.display.Button(this.game, this.playGame, this, "play_button", "play_button", "ui");
            this._playButton.anchor.set(0.5, 0.5);
            root.add(this._logo);
            root.add(this._playButton);
            root.add(this._topBlock);
            this._bonusBlock = new RushSlots.TimeBonusBlock(this.game);
            root.add(this._bonusBlock);
            this._bonusBlock.bonusTaken.add(this.bonusTaken, this);
            this._pointsPopup = new RushSlots.PointsPopup(this.game);
            root.add(this._pointsPopup);
            KE.ui.ResizeManager.add(this._bg, KE.ui.Resizible.CENTER, KE.ui.Resizible.CENTER, 0, 0, KE.ui.Resizible.FILL_STRETCH);
            KE.ui.ResizeManager.addSimple(this._topBlock, 0, 0);
            KE.ui.ResizeManager.addSimple(this._bonusBlock, 0.85, 1);
            KE.ui.ResizeManager.addSimple(this._pointsPopup, 0.5, 0.5);
            KE.ui.ResizeManager.addSimple(this._logo, 0.5, 0.1);
            KE.ui.ResizeManager.addSimple(this._playButton, 0.5, 0.75);
            this._logo.pivot.y = 700;
            this.game.add.tween(this._logo.pivot).to({ y: -30 }, 450, Phaser.Easing.Cubic.Out, true).onComplete.addOnce(function () {
                _this.game.add.tween(_this._logo.pivot).to({ y: 0 }, 250, null, true);
            }, this);
            this._playButton.inputEnabled = false;
            this._playButton.scale.set(0, 0);
            this.game.add.tween(this._playButton.scale).to({ x: 1.2, y: 1.2 }, 350, Phaser.Easing.Cubic.Out, true, 250).onComplete.addOnce(function () {
                _this.game.add.tween(_this._playButton.scale).to({ x: 1, y: 1 }, 250, null, true);
                _this._playButton.inputEnabled = true;
            }, this);
            this._topBlock.pivot.x = 300;
            this.game.add.tween(this._topBlock.pivot).to({ x: -30 }, 450, Phaser.Easing.Cubic.Out, true, 450).onComplete.addOnce(function () {
                _this.game.add.tween(_this._topBlock.pivot).to({ x: 0 }, 250, null, true);
            }, this);
            this._bonusBlock.pivot.x = -300;
            this.game.add.tween(this._bonusBlock.pivot).to({ x: 30 }, 450, Phaser.Easing.Cubic.Out, true, 650).onComplete.addOnce(function () {
                _this.game.add.tween(_this._bonusBlock.pivot).to({ x: 0 }, 250, null, true);
            }, this);
            this._bg.alpha = 0;
            this.game.add.tween(this._bg).to({ alpha: 1 }, 250, null, true);
        };
        MenuState.prototype.playGame = function () {
            var _this = this;
            this._playButton.inputEnabled = false;
            this.game.add.tween(this._logo.pivot).to({ y: -30 }, 250, null, true, 650).onComplete.addOnce(function () {
                _this.game.add.tween(_this._logo.pivot).to({ y: 700 }, 250, Phaser.Easing.Cubic.In, true);
            }, this);
            this.game.add.tween(this._playButton.scale).to({ x: 1.2, y: 1.2 }, 250, Phaser.Easing.Cubic.Out, true).onComplete.addOnce(function () {
                _this.game.add.tween(_this._playButton.scale).to({ x: 0, y: 0 }, 350, null, true);
            }, this);
            this.game.add.tween(this._topBlock.pivot).to({ x: -30 }, 250, Phaser.Easing.Cubic.Out, true, 250).onComplete.addOnce(function () {
                _this.game.add.tween(_this._topBlock.pivot).to({ x: 300 }, 450, null, true);
            }, this);
            this.game.add.tween(this._bonusBlock.pivot).to({ x: 30 }, 250, Phaser.Easing.Cubic.Out, true, 0).onComplete.addOnce(function () {
                _this.game.add.tween(_this._bonusBlock.pivot).to({ x: -300 }, 450, null, true);
            }, this);
            this.game.add.tween(this._bg).to({ alpha: 0 }, 250, null, true, 850).onComplete.addOnce(function () { _this.game.state.start('Game_china', true, false); }, this);
        };
        MenuState.prototype.bonusTaken = function (bonusPrize) {
            this._pointsPopup.showWhole(bonusPrize, 0, 0);
            this.game.add.tween(this._pointsPopup).to({}, 2000, null, true).onComplete.addOnce(this._pointsPopup.hide, this._pointsPopup);
        };
        return MenuState;
    }(Phaser.State));
    RushSlots.MenuState = MenuState;
})(RushSlots || (RushSlots = {}));
var RushSlots;
(function (RushSlots) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            //You can preload an image here if you dont want to use text for the loading screen
            //this.load.json('loadData', './assets/data/load.json');
        };
        Boot.prototype.create = function () {
            this.stage.setBackgroundColor(0x381948);
            this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
            this.game.scale.setResizeCallback(this.resizegame, this);
            this.resizegame(this.game.scale, null);
            this.game.state.start('Preloader', true, false);
        };
        Boot.prototype.resizegame = function (scale, parentBounds) {
            // this part resizes the canvas but keeps ratio the same  
            if (this._oldWidth == window.innerWidth && this._oldHeight == window.innerHeight)
                return;
            this._oldWidth = window.innerWidth;
            this._oldHeight = window.innerHeight;
            var scaleValue = 1;
            var addScale = 1;
            var targetWidth = 700;
            var ratio = 1 - Math.min(window.innerWidth, window.innerHeight) / Math.max(window.innerWidth, window.innerHeight);
            if (ratio < 0.33) {
                addScale = 0.65 + ratio * 0.8;
            }
            if (window.innerWidth < window.innerHeight) {
                scaleValue = window.innerWidth / targetWidth;
                this.game.scale.setGameSize(targetWidth / addScale, window.innerHeight / scaleValue / addScale);
            }
            else {
                scaleValue = window.innerHeight / targetWidth;
                this.game.scale.setGameSize(window.innerWidth / scaleValue / addScale, targetWidth / addScale);
            }
            this.game.scale.setUserScale(scaleValue * addScale, scaleValue * addScale);
            this.game.scale.refresh();
            KE.ui.ResizeManager.resize(this.game.scale.width, this.game.scale.height);
        };
        return Boot;
    }(Phaser.State));
    RushSlots.Boot = Boot;
})(RushSlots || (RushSlots = {}));
var RushSlots;
(function (RushSlots) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            this.loaderText = this.game.add.text(this.world.centerX, this.world.centerY + 100, "Loading...", { font: "42px Riffic", fill: "#A9A9A9", align: "center" });
            this.loaderText.anchor.setTo(0.5);
            this.load.bitmapFont("float_digits", "./fonts/float_digits.png", "./fonts/float_digits.xml");
            this.load.json('data', './assets/data/data.json?v=' + Math.random());
            this.load.image('background', './assets/gfx/1x/background.jpg');
            this.load.atlasJSONHash('ui', './assets/gfx/1x/ui.png', './assets/gfx/1x/ui.json');
            this.load.audio("click", ['./assets/sounds/click.mp3']);
        };
        Preloader.prototype.create = function () {
            this.game.sound.add("click");
            RushSlots.User.instance.init(this.game.cache.getJSON("data", false)["levels"]);
            this.game.state.start('Menu', true, false);
        };
        Preloader.prototype.update = function () {
        };
        Preloader.prototype.startMainMenu = function () {
        };
        return Preloader;
    }(Phaser.State));
    RushSlots.Preloader = Preloader;
})(RushSlots || (RushSlots = {}));
var KE;
(function (KE) {
    var ui;
    (function (ui) {
        var ResizeManager = (function () {
            function ResizeManager() {
            }
            ResizeManager.resize = function (newWidth, newHeight) {
                ResizeManager.newHeight = (newHeight);
                ResizeManager.newWidth = (newWidth);
                for (var i = (0); i < ResizeManager._resizibles.length; i++) {
                    var res = ResizeManager._resizibles[i];
                    if (!res.object.parent)
                        continue;
                    ResizeManager.resizeObject(res);
                }
                for (i = (0); i < ResizeManager._simpleResizibles.length; i++) {
                    var sRes = ResizeManager._simpleResizibles[i];
                    if (!sRes.object.parent)
                        continue;
                    ResizeManager.resizeSimpleObject(sRes);
                }
                for (i = (0); i < ResizeManager._funs.length; i++) {
                    if (ResizeManager._funs[i])
                        ResizeManager._funs[i](newWidth, newHeight);
                }
                this.center.set(newWidth / 2, newHeight / 2);
            };
            ResizeManager.resizeSimpleObject = function (sRes) {
                if (sRes.hAlign >= 0)
                    ResizeManager._pointCache.x = ResizeManager.newWidth * sRes.hAlign;
                if (sRes.vAlign >= 0)
                    ResizeManager._pointCache.y = ResizeManager.newHeight * sRes.vAlign;
                ResizeManager._pointCache = sRes.object.parent.toLocal(ResizeManager._pointCache, ResizeManager.root);
                if (sRes.hAlign >= 0)
                    sRes.object.x = ResizeManager._pointCache.x;
                if (sRes.vAlign >= 0)
                    sRes.object.y = ResizeManager._pointCache.y;
            };
            ResizeManager.resizeObject = function (res) {
                ResizeManager._bounds = res.object.getLocalBounds();
                if (res.stretch == ui.Resizible.H_STRETCH || res.stretch == ui.Resizible.FULL_STRETCH) {
                    ResizeManager._bounds.width = res.object.width = (ResizeManager.newWidth - (res.object.x - ResizeManager._bounds.x) - res.paddingX * 2) / res.object.parent.worldScale.x;
                }
                if (res.stretch == ui.Resizible.V_STRETCH || res.stretch == ui.Resizible.FULL_STRETCH) {
                    ResizeManager._bounds.height = res.object.height = (ResizeManager.newHeight - (res.object.y - ResizeManager._bounds.y) - res.paddingY * 2) / res.object.parent.worldScale.y;
                }
                if (res.stretch == ui.Resizible.FILL_STRETCH) {
                    var wRatio = ResizeManager._bounds.width / ResizeManager.newWidth;
                    var hRatio = ResizeManager._bounds.height / ResizeManager.newHeight;
                    if (wRatio <= hRatio) {
                        res.object.width = ResizeManager.newWidth - res.paddingX * 2;
                        res.object.height = ResizeManager._bounds.height * res.object.width / ResizeManager._bounds.width - res.paddingY * 2;
                    }
                    else {
                        res.object.height = ResizeManager.newHeight - res.paddingY * 2;
                        res.object.width = ResizeManager._bounds.width * res.object.height / ResizeManager._bounds.height - res.paddingX * 2;
                    }
                    ResizeManager._bounds.width = res.object.width - res.paddingX * 2;
                    ResizeManager._bounds.height = res.object.height - res.paddingY * 2;
                }
                if (res.hAlign == ui.Resizible.CENTER) {
                    ResizeManager._pointCache.x = ResizeManager.newWidth / 2 - ResizeManager._bounds.width / 2;
                }
                else if (res.hAlign == ui.Resizible.LEFT) {
                    ResizeManager._pointCache.x = res.paddingX - ResizeManager._bounds.x;
                }
                else if (res.hAlign == ui.Resizible.RIGHT) {
                    ResizeManager._pointCache.x = ResizeManager.newWidth - res.paddingX - ResizeManager._bounds.width - ResizeManager._bounds.x;
                }
                if (res.vAlign == ui.Resizible.CENTER) {
                    ResizeManager._pointCache.y = ResizeManager.newHeight / 2 - ResizeManager._bounds.height / 2;
                }
                else if (res.vAlign == ui.Resizible.TOP) {
                    ResizeManager._pointCache.y = res.paddingY - ResizeManager._bounds.y;
                }
                else if (res.vAlign == ui.Resizible.BOTTOM) {
                    ResizeManager._pointCache.y = ResizeManager.newHeight - res.paddingY - ResizeManager._bounds.height - ResizeManager._bounds.y;
                }
                ResizeManager._pointCache = res.object.parent.toLocal(ResizeManager._pointCache, ResizeManager.root);
                res.object.x = ResizeManager._pointCache.x;
                res.object.y = ResizeManager._pointCache.y;
            };
            ResizeManager.add = function (object, hAlign, vAlign, paddingX, paddingY, stretch, addX, addY) {
                if (paddingX === void 0) { paddingX = 0; }
                if (paddingY === void 0) { paddingY = 0; }
                if (stretch === void 0) { stretch = 0; }
                if (addX === void 0) { addX = 0; }
                if (addY === void 0) { addY = 0; }
                var resizible = new ui.Resizible(object, vAlign, hAlign, paddingX, paddingY, stretch);
                ResizeManager._resizibles.push(resizible);
                //ResizeManager._cache[object] = resizible;
                ResizeManager.resizeObject(resizible);
            };
            ResizeManager.addSimple = function (object, hPercent, vPercent) {
                var resizible = new ui.SimpleResizible(object, hPercent, vPercent);
                ResizeManager._simpleResizibles.push(resizible);
                //ResizeManager._cache.setItem(object,resizible);
                ResizeManager.resizeSimpleObject(resizible);
            };
            ResizeManager.addFun = function (fun) {
                this._funs.push(fun);
            };
            ResizeManager.remove = function (object) {
                /*if(ResizeManager._cache.getItem(object))
                {
                    var i:number = (ResizeManager._resizibles.indexOf(ResizeManager._cache.getItem(object)));
                    if(i >= 0)
                        ResizeManager._resizibles.splice(i,1);
                    else
                    {
                        ResizeManager._simpleResizibles.splice(ResizeManager._simpleResizibles.indexOf(ResizeManager._cache.getItem(object)),1);
                    }
                    ResizeManager._cache.delItem(object);
                }*/
            };
            ResizeManager.newWidth = 0;
            ResizeManager.newHeight = 0;
            ResizeManager.center = new PIXI.Point();
            ResizeManager._funs = [];
            return ResizeManager;
        }());
        ui.ResizeManager = ResizeManager;
    })(ui = KE.ui || (KE.ui = {}));
})(KE || (KE = {}));
KE.ui.ResizeManager._resizibles = new Array();
KE.ui.ResizeManager._simpleResizibles = new Array();
KE.ui.ResizeManager._cache = {};
KE.ui.ResizeManager._bounds = new PIXI.Rectangle();
KE.ui.ResizeManager._pointCache = new PIXI.Point();
var KE;
(function (KE) {
    var ui;
    (function (ui) {
        var Resizible = (function () {
            function Resizible(object, vAlign, hAlign, paddingX, paddingY, stretch) {
                if (paddingX === void 0) { paddingX = 0; }
                if (paddingY === void 0) { paddingY = 0; }
                if (stretch === void 0) { stretch = 0; }
                this.stretch = 0;
                this.hAlign = 0;
                this.vAlign = 0;
                this.paddingX = 0;
                this.paddingY = 0;
                this.paddingX = (paddingX);
                this.paddingY = (paddingY);
                this.stretch = (stretch);
                this.hAlign = (hAlign);
                this.vAlign = (vAlign);
                this.object = object;
            }
            return Resizible;
        }());
        ui.Resizible = Resizible;
    })(ui = KE.ui || (KE.ui = {}));
})(KE || (KE = {}));
KE.ui.Resizible.LEFT = 0;
KE.ui.Resizible.RIGHT = 1;
KE.ui.Resizible.CENTER = 2;
KE.ui.Resizible.TOP = 3;
KE.ui.Resizible.BOTTOM = 4;
KE.ui.Resizible.NON_STRETCH = 0;
KE.ui.Resizible.V_STRETCH = 1;
KE.ui.Resizible.H_STRETCH = 2;
KE.ui.Resizible.FULL_STRETCH = 3;
KE.ui.Resizible.FILL_STRETCH = 4;
var KE;
(function (KE) {
    var ui;
    (function (ui) {
        var SimpleResizible = (function () {
            function SimpleResizible(object, hAlign, vAlign) {
                this.hAlign = NaN;
                this.vAlign = NaN;
                this.hAlign = hAlign;
                this.vAlign = vAlign;
                this.object = object;
            }
            return SimpleResizible;
        }());
        ui.SimpleResizible = SimpleResizible;
    })(ui = KE.ui || (KE.ui = {}));
})(KE || (KE = {}));
var KE;
(function (KE) {
    var Persistence = (function () {
        function Persistence() {
        }
        Persistence.init = function (slot) {
            if (slot === void 0) { slot = "3"; }
            this._slot = slot;
            this._sharedObject = localStorage;
            this.load();
        };
        Persistence.load = function () {
            var data = this._sharedObject.getItem("save_" + this._slot);
            if (!data)
                this._data = {};
            else
                this._data = JSON.parse(data);
        };
        Persistence.save = function (callback) {
            if (callback === void 0) { callback = null; }
            try {
                this._sharedObject.setItem("save_" + this._slot, JSON.stringify(this._data));
            }
            catch (e) {
                console.log("save is not possible");
            }
        };
        Persistence.getNumber = function (id, def) {
            if (def === void 0) { def = 0; }
            /*if (id == "coin")
                return 5000;*/
            if (!isNaN(this._data[id]))
                return this._data[id];
            return def;
        };
        Persistence.setNumber = function (id, value) {
            this.set(id, value);
        };
        Persistence.getString = function (id, def) {
            if (def === void 0) { def = ""; }
            if (this._data[id])
                return String(this._data[id]);
            return def;
        };
        Persistence.setString = function (id, value) {
            this.set(id, value);
        };
        Persistence.set = function (id, value) {
            this._data[id] = value;
        };
        Persistence.addNumber = function (id, value) {
            this.setNumber(id, this.getNumber(id) + value);
        };
        Persistence.getBool = function (id, def) {
            if (def === void 0) { def = false; }
            /*if (id == "tutorial_passed")
                return false;*/
            if (this._data.hasOwnProperty(id))
                return this._data[id];
            return def;
        };
        Persistence.setBool = function (id, value) {
            this._data[id] = value;
        };
        Persistence.clear = function () {
            this._data = {};
            this.save();
        };
        Persistence._data = {};
        return Persistence;
    }());
    KE.Persistence = Persistence;
})(KE || (KE = {}));
var RushSlots;
(function (RushSlots) {
    var DigitsValue = (function (_super) {
        __extends(DigitsValue, _super);
        function DigitsValue(game, icon, width) {
            _super.call(this, game);
            this._value = 0;
            var bg = new Phaser.Image(game, 0, 0, "ui", "top_container_bg");
            bg.width = width;
            this.add(bg);
        }
        Object.defineProperty(DigitsValue.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (v) {
            },
            enumerable: true,
            configurable: true
        });
        return DigitsValue;
    }(Phaser.Group));
    RushSlots.DigitsValue = DigitsValue;
})(RushSlots || (RushSlots = {}));
var RushSlots;
(function (RushSlots) {
    var TimeBonusBlock = (function (_super) {
        __extends(TimeBonusBlock, _super);
        function TimeBonusBlock(game) {
            _super.call(this, game);
            this.bonusTaken = new Phaser.Signal();
            this._lastGet = -1;
            this._bonusPeriod = 0;
            this._bonusPrize = 0;
            this._time = 0;
            var bonusData = this.game.cache.getJSON("data", false).bonus;
            this._bonusPeriod = bonusData.period;
            this._bonusPrize = bonusData.prize;
            this._lastGet = KE.Persistence.getNumber("bonus_last_get", -1);
            if (this._lastGet < 0) {
                this._lastGet = Date.now();
                KE.Persistence.setNumber("bonus_last_get", this._lastGet);
                KE.Persistence.save();
            }
            var bg = new Phaser.Image(game, 0, 0, "ui", "time_bonus_bg");
            bg.anchor.set(0.5, 1);
            this._coin = new Phaser.Image(game, 0, 0, "ui", "big_coin");
            this._coin.anchor.set(0.5, 0.8);
            this._coin.y = -22;
            this._coinTween = game.add.tween(this._coin).to({ y: -30 }, 1200, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
            this._bonusButton = new KE.display.TextButton(game, "Take Bonus!", { font: "Riffic", fontSize: 18, fill: "#fefefe" }, this.takeButtonTapped, this, "time_bonus_button_up", "time_bonus_button_down", "ui", 3);
            this._bonusButton.position.set(-this._bonusButton.width / 2, -49);
            this._timerLabel = new Phaser.Text(this.game, 0, -23, "01:15:00", { fontSize: 24, fill: "#fefefe" });
            this._timerLabel.anchor.set(0.5, 0.5);
            this.add(this._coin);
            this.add(bg);
            this.add(this._timerLabel);
            this.add(this._bonusButton);
            var now = Date.now();
            this.updateTimeLabel(now);
            this._bonusButton.visible = false;
            if (now - this._lastGet > this._bonusPeriod) {
                this.showBonusButton();
            }
            this._time = now / 1000;
        }
        TimeBonusBlock.prototype.showBonusButton = function () {
            if (this._bonusButton.visible)
                return;
            this._bonusButton.visible = true;
            this._coinTween.stop();
            this.game.tweens.remove(this._coinTween);
            this._coin.y = -22;
            this._coinTween = this.game.add.tween(this._coin.scale).to({ x: 1.3, y: 1.3 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
        };
        TimeBonusBlock.prototype.hideBonusButton = function () {
            if (!this._bonusButton.visible)
                return;
            this._bonusButton.visible = false;
            this._coinTween.stop(true);
            this.game.tweens.remove(this._coinTween);
            this._coin.y = -22;
            this._coin.scale.set(1, 1);
            this._coinTween = this.game.add.tween(this._coin).to({ y: -30 }, 1200, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
        };
        TimeBonusBlock.prototype.update = function () {
            var time = Date.now() / 1000;
            if (time > this._time) {
                this._time = time;
                this.updateTimeLabel(time * 1000 - this._lastGet);
                if (time * 1000 - this._lastGet > this._bonusPeriod) {
                    this.showBonusButton();
                }
            }
        };
        TimeBonusBlock.prototype.updateTimeLabel = function (time) {
            var timeDate = new Date(this._bonusPeriod - time);
            this._timerLabel.text = this.numberToString(timeDate.getUTCHours()) + ":" + this.numberToString(timeDate.getMinutes()) + ":" + this.numberToString(timeDate.getSeconds());
        };
        TimeBonusBlock.prototype.numberToString = function (num) {
            if (num < 10)
                return "0" + num;
            return "" + num;
        };
        TimeBonusBlock.prototype.takeButtonTapped = function () {
            var now = Date.now();
            this._lastGet = now;
            RushSlots.User.instance.coins += this._bonusPrize;
            KE.Persistence.setNumber("bonus_last_get", now);
            KE.Persistence.save();
            this.updateTimeLabel(now);
            this._time = now / 1000;
            this.hideBonusButton();
            this.bonusTaken.dispatch(this._bonusPrize);
        };
        return TimeBonusBlock;
    }(Phaser.Group));
    RushSlots.TimeBonusBlock = TimeBonusBlock;
})(RushSlots || (RushSlots = {}));
var RushSlots;
(function (RushSlots) {
    var BottomBlock = (function (_super) {
        __extends(BottomBlock, _super);
        function BottomBlock(game) {
            _super.call(this, game);
            /* this._container = new Phaser.Group(game, this);
             let bg = game.add.image(0, 0, "ui", "bet_menu_bg", this._container);
             / *let bgLeft = game.add.image(-3 * bg.width / 2 + 1, 0, "ui", "bottom_panel", this);
             let bgRight = game.add.image(bg.width / 2 - 1, 0, "ui", "bottom_panel", this);
             bg.pivot.x = bg.width / 2;
             bgLeft.pivot.y = bgRight.pivot.y = bg.pivot.y = bg.height;* /
             bg.pivot.x = bg.width / 2;
             this._container.y = -340;
             this.game.add.tween(this._container).to({ y: -76 }, 500, Phaser.Easing.Cubic.In, true, 1000);*/
        }
        return BottomBlock;
    }(Phaser.Group));
    RushSlots.BottomBlock = BottomBlock;
})(RushSlots || (RushSlots = {}));
var RushSlots;
(function (RushSlots) {
    var MenuBottomBlock = (function (_super) {
        __extends(MenuBottomBlock, _super);
        function MenuBottomBlock(game) {
            _super.call(this, game);
        }
        return MenuBottomBlock;
    }(RushSlots.BottomBlock));
    RushSlots.MenuBottomBlock = MenuBottomBlock;
})(RushSlots || (RushSlots = {}));
var RushSlots;
(function (RushSlots) {
    var MenuGameItem = (function (_super) {
        __extends(MenuGameItem, _super);
        function MenuGameItem(game, gameId) {
            _super.call(this, game);
            this._downPoint = new Phaser.Point();
            this._isDown = false;
            this._gameId = gameId;
            //let bg = game.add.image(0, 0, "ui", "game_panel_bg", this);
            var logo = game.add.image(8, 6, "ui", gameId + "_game_button", this);
            var playButton = new Phaser.Image(game, 0, 0, "ui", "menu_green_button");
            playButton.anchor.set(0.5, 0.5);
            playButton.x = 178;
            playButton.y = logo.height - 57;
            this.add(playButton);
            this.pivot.set(logo.width / 2, logo.height / 2);
            logo.inputEnabled = true;
            logo.events.onInputDown.add(this.inputDown, this);
            logo.events.onInputUp.add(this.inputUp, this);
        }
        MenuGameItem.prototype.inputDown = function (s, pointer) {
            this.scale.set(0.9, 0.9);
            this._downPoint.set(pointer.x, pointer.y);
            this._isDown = true;
        };
        MenuGameItem.prototype.inputUp = function (s, pointer) {
            if (!this._isDown)
                return;
            this.scale.set(1, 1);
            this.game.state.start('Game_' + this._gameId, true, false);
            this._isDown = false;
        };
        MenuGameItem.prototype.update = function () {
            if (this._isDown) {
                if (this.game.input.activePointer.position.distance(this._downPoint) > 30) {
                    this._isDown = false;
                    this.scale.set(1, 1);
                }
            }
        };
        MenuGameItem.prototype.playClicked = function () {
            this.game.state.start('Game_' + this._gameId, true, false);
        };
        return MenuGameItem;
    }(Phaser.Group));
    RushSlots.MenuGameItem = MenuGameItem;
})(RushSlots || (RushSlots = {}));
var RushSlots;
(function (RushSlots) {
    var FillHolder = (function (_super) {
        __extends(FillHolder, _super);
        function FillHolder(game, width, icon) {
            if (icon === void 0) { icon = ""; }
            _super.call(this, game);
            var bg = new Phaser.Image(game, 0, 0, "ui", "input_bg");
            //bg.width = width;
            this._label = new Phaser.Text(game, -10, 21, "28", { font: "Riffic", fontSize: 22, fill: "#ffffff" });
            this._label.setShadow(0, 2, "#622b08");
            this._label.anchor.set(0.5, 0.5);
            this._filler = new KE.display.Image9Patch(game, "ui", "input_fill", new PIXI.Rectangle(0, 0, 10, 36));
            this._filler.y = 2;
            this._filler.x = 0;
            this._filler.height = 34;
            this.add(bg);
            this.add(this._filler);
            if (icon) {
                this._icon = new Phaser.Image(game, 0, 0, "ui", icon);
                this._icon.anchor.set(0.5, 0.5);
                this._icon.y = bg.height / 2;
                this._icon.x = -10;
                this.add(this._icon);
            }
            this.add(this._label);
            this.fill = 0;
        }
        Object.defineProperty(FillHolder.prototype, "fill", {
            set: function (value) {
                this._filler.width = 17 + 209 * value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FillHolder.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                this._value = value;
                this._label.text = "" + value;
                if (this._icon && this.game) {
                    this.game.add.tween(this._icon.scale).to({ x: 1.15, y: 1.15 }, 100, Phaser.Easing.Cubic.Out, true, 0, 0, true);
                }
            },
            enumerable: true,
            configurable: true
        });
        return FillHolder;
    }(Phaser.Group));
    RushSlots.FillHolder = FillHolder;
})(RushSlots || (RushSlots = {}));
var RushSlots;
(function (RushSlots) {
    var TextHolder = (function (_super) {
        __extends(TextHolder, _super);
        function TextHolder(game, width, bgImage, textMargin) {
            _super.call(this, game);
            var bg = new Phaser.Image(game, 0, 0, "ui", bgImage);
            //bg.width = width;
            this._label = new Phaser.Text(game, textMargin, 0, "1567894", { fontSize: 24, fill: "#402b27" });
            this._label.y = (bg.height) / 2;
            this._label.anchor.set(0.5, 0.5);
            this.add(bg);
            this.add(this._label);
        }
        Object.defineProperty(TextHolder.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                this._value = Math.floor(value);
                this._label.text = "" + this._value;
            },
            enumerable: true,
            configurable: true
        });
        return TextHolder;
    }(Phaser.Group));
    RushSlots.TextHolder = TextHolder;
})(RushSlots || (RushSlots = {}));
var RushSlots;
(function (RushSlots) {
    var BaseWidePopup = (function (_super) {
        __extends(BaseWidePopup, _super);
        function BaseWidePopup(game, label) {
            _super.call(this, game);
            this.event = new Phaser.Signal();
            this._fadeBg = new Phaser.Image(game, -1500, -1500, "ui", "slot_table_item");
            this._fadeBg.width = this._fadeBg.height = 3000;
            this._fadeBg.tint = 0;
            this._fadeBg.alpha = 0.4;
            this.add(this._fadeBg);
            this._content = new Phaser.Group(game, this);
            this._bg = new Phaser.Group(game, this._content);
            this._header = new Phaser.Group(game, this._content);
            for (var i = 0; i < 10; i++) {
                var bgPart = new Phaser.Image(game, 218 * 5 - 219 * i, -260, "ui", "wide_dialog_bg");
                this._bg.add(bgPart);
            }
            var headerBg = new Phaser.Image(game, 0, 0, "ui", "popup_header_bg");
            headerBg.anchor.set(0.5, 0.5);
            this._header.add(headerBg);
            this._header.y = -255;
            var headerLabel = new Phaser.Text(game, 0, 0, label, { font: "Riffic", fontSize: 38, fill: "#ffffff" });
            headerLabel.anchor.set(0.5, 0.5);
            this._header.add(headerLabel);
            this.visible = false;
        }
        BaseWidePopup.prototype.show = function () {
            this._content.scale.set(0.1, 0.03);
            this._fadeBg.alpha = 0;
            this.visible =
                this._fadeBg.interactive =
                    this._fadeBg.inputEnabled = true;
            this.game.add.tween(this._fadeBg).to({ alpha: 0.4 }, 300, Phaser.Easing.Cubic.In, true);
            this.game.add.tween(this._content.scale).to({ x: 1 }, 300, Phaser.Easing.Cubic.Out, true);
            this.game.add.tween(this._content.scale).to({ y: 1 }, 250, Phaser.Easing.Cubic.Out, true, 170);
        };
        BaseWidePopup.prototype.hide = function () {
            this.game.add.tween(this._fadeBg).to({ alpha: 0 }, 300, Phaser.Easing.Cubic.In, true);
            this.game.add.tween(this._content.scale).to({ y: 0.02 }, 250, Phaser.Easing.Cubic.In, true);
            this.game.add.tween(this._content.scale).to({ x: 0.03 }, 300, Phaser.Easing.Cubic.In, true, 140).onComplete.add(this.hideCompleted, this);
        };
        BaseWidePopup.prototype.hideCompleted = function () {
            this.visible =
                this._fadeBg.interactive =
                    this._fadeBg.inputEnabled = false;
        };
        return BaseWidePopup;
    }(Phaser.Group));
    RushSlots.BaseWidePopup = BaseWidePopup;
})(RushSlots || (RushSlots = {}));
var RushSlots;
(function (RushSlots) {
    var PaytablePopup = (function (_super) {
        __extends(PaytablePopup, _super);
        function PaytablePopup(game, gameId) {
            _super.call(this, game, "Paytable");
            this._isLocked = true;
            this._currentPage = 0;
            this._pagesAmount = 0;
            this._leftButton = new Phaser.Button(game, -320, -20, "ui", this.leftTapped, this, "left_button_up", "left_button_up", "left_button_down", "left_button_up");
            this._rightButton = new Phaser.Button(game, 320, -20, "ui", this.rightTapped, this, "right_button_up", "right_button_up", "right_button_down", "right_button_up");
            this._leftButton.visible = false;
            this._isLocked = false;
            this._leftButton.anchor.set(0.5, 0.5);
            this._rightButton.anchor.set(0.5, 0.5);
            this._tables = new Phaser.Group(game);
            this._tables.x = 0;
            this._tables.y = 0;
            ;
            var gameConfig = this.game.cache.getJSON("data", false).games[gameId];
            var payTableChips = gameConfig.board.paytable_pages;
            for (var j = 0; j < payTableChips.length; j++) {
                var h = Math.floor((payTableChips[j].length - 1) / 3) + 1;
                for (var i = 0; i < payTableChips[j].length; i++) {
                    var item = new RushSlots.PaytableChipBlock(game, gameConfig.chips[payTableChips[j][i]]);
                    item.x = this._pagesAmount * 1000 - 230 + (i % 3) * 180;
                    item.y = Math.floor(i / 3) * 140 - h * 70;
                    this._tables.add(item);
                }
                this._pagesAmount++;
            }
            var cnt = 0;
            for (var i = 0; i < gameConfig.board.lines.length; i++) {
                var item = new RushSlots.PaytableChainBlock(game, i + 1, gameConfig.board.width, gameConfig.board.height, gameConfig.board.lines[i], gameConfig.board.cells);
                item.x = this._pagesAmount * 1000 - 230 + (cnt % 3) * 180;
                item.y = Math.floor(cnt / 3) * 93 - 160;
                this._tables.add(item);
                cnt++;
                if (cnt == 12) {
                    this._pagesAmount++;
                    cnt = 0;
                }
            }
            var closeButton = new KE.display.TextButton(game, "Close", { font: "Riffic", fontSize: 22, fill: "#fefefe" }, this.close, this, "big_green_button_up", "big_green_button_down", "ui", 4);
            //closeButton.anchor.set(0.5, 0.5);
            closeButton.y = 175;
            closeButton.x = -closeButton.width / 2;
            this._content.add(this._leftButton);
            this._content.add(this._rightButton);
            this._content.add(this._tables);
            this._content.add(closeButton);
        }
        PaytablePopup.prototype.leftTapped = function () {
            if (!this._isLocked) {
                this.game.add.tween(this._tables).to({ x: -(this._currentPage - 1) * 1000 }, 300, Phaser.Easing.Cubic.Out, true).onComplete.add(this.unlock, this);
                if (this._currentPage == this._pagesAmount) {
                    this._rightButton.visible = true;
                }
                this._currentPage--;
                if (this._currentPage == 0) {
                    this._leftButton.visible = false;
                }
            }
        };
        PaytablePopup.prototype.rightTapped = function () {
            if (!this._isLocked) {
                this._isLocked = true;
                this.game.add.tween(this._tables).to({ x: -(this._currentPage + 1) * 1000 }, 300, Phaser.Easing.Cubic.Out, true).onComplete.add(this.unlock, this);
                if (this._currentPage == 0) {
                    this._leftButton.visible = true;
                }
                this._currentPage++;
                if (this._currentPage == this._pagesAmount) {
                    this._rightButton.visible = false;
                }
            }
        };
        PaytablePopup.prototype.close = function () {
            _super.prototype.hide.call(this);
        };
        PaytablePopup.prototype.unlock = function () {
            this._isLocked = false;
        };
        return PaytablePopup;
    }(RushSlots.BaseWidePopup));
    RushSlots.PaytablePopup = PaytablePopup;
})(RushSlots || (RushSlots = {}));
var RushSlots;
(function (RushSlots) {
    var BetMenu = (function (_super) {
        __extends(BetMenu, _super);
        function BetMenu(game, linesAmount) {
            _super.call(this, game);
            this.autoSpin = new Phaser.Signal();
            this.helpTrigger = new Phaser.Signal();
            this._opened = false;
            this._betValues = [100, 200, 500, 700, 1000, 2000, 5000, 10000];
            this._currentBetNum = 0;
            this._maxBetNum = 4;
            this._isAutoSpin = false;
            this._linesAmount = linesAmount;
            this._container = new Phaser.Group(game, this);
            var bg = game.add.sprite(0, 0, "ui", "bet_menu_bg", this._container);
            bg.pivot.x = bg.width / 2;
            this._container.y = -68;
            //bg.inputEnabled = true;
            //bg.events.onInputDown.add(this.bgTapped, this);
            var middleLine = bg.height * 0.47;
            this._autoSpinButton = new KE.display.TextButton(game, "Autospin", { font: "Riffic", fontSize: 22, fill: "#fefefe" }, this.autoSpinTapped, this, "big_green_button_up", "big_green_button_down", "ui", 4);
            this._betMaxButton = new KE.display.TextButton(game, "Bet Max", { font: "Riffic", fontSize: 22, fill: "#fefefe" }, this.maxBetTapped, this, "big_green_button_up", "big_green_button_down", "ui", 4);
            this._autoSpinButton.y = this._betMaxButton.y = middleLine - this._betMaxButton.height / 2 + 1;
            this._autoSpinButton.x = bg.width / 2 - 18 - this._betMaxButton.width;
            this._betMaxButton.x = 32;
            var betBG = new Phaser.Image(game, 0, 0, "ui", "bet_amount_bg");
            betBG.position.set(-227, middleLine - betBG.height / 2 + 2);
            this._betMinusButton = new KE.display.TextButton(game, "-", { font: "Riffic", fontSize: 36, fill: "#fefefe" }, this.betMinusTapped, this, "small_orange_button_up", "small_orange_button_down", "ui", 4);
            this._betMinusButton.x = betBG.x + 5;
            this._betMinusButton.y = middleLine - this._betMinusButton.height / 2 - 3;
            this._betPlusButton = new KE.display.TextButton(game, "+", { font: "Riffic", fontSize: 36, fill: "#fefefe" }, this.betPlusTapped, this, "small_orange_button_up", "small_orange_button_down", "ui", 4);
            this._betPlusButton.x = betBG.x + betBG.width - this._betMinusButton.width - 5;
            this._betPlusButton.y = middleLine - this._betMinusButton.height / 2 - 3;
            this._betLabel = new Phaser.Text(game, betBG.x + betBG.width / 2, betBG.y + betBG.height / 2 + 2, "100", { font: "Arial", fontSize: 26, fill: "#fefefe" });
            this._betLabel.anchor.set(0.5, 0.5);
            var betPerLine = new Phaser.Text(game, 0, betBG.y, "Bet per line", { font: "Riffic", fontSize: 32, fill: "#613f0e" });
            betPerLine.anchor.set(0.5, 1);
            var helpButton = new KE.display.Button(game, this.helpTriggered, this, "help_button_up", "help_button_down", "ui");
            helpButton.x = -308;
            helpButton.y = middleLine - helpButton.height / 2 + 1;
            this._container.add(betBG);
            this._container.add(helpButton);
            this._container.add(this._betLabel);
            //this._container.add(betPerLine);
            this._container.add(this._autoSpinButton);
            this._container.add(this._betMaxButton);
            this._container.add(this._betMinusButton);
            this._container.add(this._betPlusButton);
            this._currentBetNum = KE.Persistence.getNumber("currentBetNum", 0);
            this.updateBetButtons();
        }
        BetMenu.prototype.helpTriggered = function () {
            this.helpTrigger.dispatch();
        };
        BetMenu.prototype.betMinusTapped = function () {
            this._currentBetNum--;
            this.updateBetButtons();
        };
        BetMenu.prototype.betPlusTapped = function () {
            this._currentBetNum++;
            this.updateBetButtons();
        };
        Object.defineProperty(BetMenu.prototype, "currentBet", {
            get: function () {
                return this._betValues[this._currentBetNum];
            },
            enumerable: true,
            configurable: true
        });
        BetMenu.prototype.updateBetButtons = function () {
            KE.Persistence.setNumber("currentBetNum", this._currentBetNum);
            KE.Persistence.save();
            this._betLabel.text = "" + (this._betValues[this._currentBetNum] * this._linesAmount);
            if (this._currentBetNum == 0) {
                this._currentBetNum = 0;
                this._betMinusButton.inputEnabled = false;
                this._betMinusButton.setFrames("small_orange_button_disable", "small_orange_button_disable", "small_orange_button_disable", "small_orange_button_disable");
            }
            else if (this._currentBetNum == this._maxBetNum) {
                this._currentBetNum = this._maxBetNum;
                this._betPlusButton.setFrames("small_orange_button_disable", "small_orange_button_disable", "small_orange_button_disable", "small_orange_button_disable");
                this._betPlusButton.inputEnabled = false;
                this._betMaxButton.setFrames("big_orange_button_up", "big_orange_button_up", "big_orange_button_up", "big_orange_button_up");
                this._betMaxButton.inputEnabled = false;
            }
            if (this._currentBetNum > 0 && !this._betMinusButton.inputEnabled) {
                this._betMinusButton.setFrames("small_orange_button_up", "small_orange_button_up", "small_orange_button_down", "small_orange_button_up");
                this._betMinusButton.inputEnabled = true;
                this._betMaxButton.setFrames("big_green_button_up", "big_green_button_up", "big_green_button_down", "big_green_button_up");
                this._betMaxButton.inputEnabled = true;
            }
            if (this._currentBetNum < this._maxBetNum && !this._betPlusButton.inputEnabled) {
                this._betPlusButton.setFrames("small_orange_button_up", "small_orange_button_up", "small_orange_button_down", "small_orange_button_up");
                this._betPlusButton.inputEnabled = true;
                this._betMaxButton.setFrames("big_green_button_up", "big_green_button_up", "big_green_button_down", "big_green_button_up");
                this._betMaxButton.inputEnabled = true;
            }
        };
        BetMenu.prototype.autoSpinTapped = function () {
            this._isAutoSpin = !this._isAutoSpin;
            if (!this._isAutoSpin)
                this._autoSpinButton.setFrames("big_green_button_up", "big_green_button_up", "big_green_button_down", "big_green_button_up");
            else
                this._autoSpinButton.setFrames("big_orange_button_up", "big_green_orange_up", "big_orange_button_down", "big_orange_button_up");
            this.autoSpin.dispatch();
        };
        BetMenu.prototype.maxBetTapped = function () {
            this._currentBetNum = this._maxBetNum;
            this.updateBetButtons();
            this._betMaxButton.setFrames("big_orange_button_up", "big_orange_button_up", "big_orange_button_up", "big_orange_button_up");
            this._betMaxButton.inputEnabled = false;
        };
        BetMenu.prototype.bgTapped = function () {
            if (this._opened) {
                this.hide();
            }
            else {
                this.open();
            }
            this._opened = !this._opened;
        };
        BetMenu.prototype.open = function () {
            //this.game.add.tween(this._container).to({ y: -340 }, 400, Phaser.Easing.Cubic.Out, true);
        };
        BetMenu.prototype.hide = function () {
            //this.game.add.tween(this._container).to({ y: -76 }, 400, Phaser.Easing.Cubic.Out, true);
        };
        return BetMenu;
    }(Phaser.Group));
    RushSlots.BetMenu = BetMenu;
})(RushSlots || (RushSlots = {}));
var RushSlots;
(function (RushSlots) {
    var PaytableChainBlock = (function (_super) {
        __extends(PaytableChainBlock, _super);
        function PaytableChainBlock(game, index, w, h, items, cells) {
            _super.call(this, game);
            var num = new Phaser.Text(game, 0, 0, "" + index, { fontSize: 32, font: "Riffic" });
            num.anchor.set(1, 0.5);
            this.add(num);
            for (var i = 0; i < w; i++) {
                for (var j = 0; j < h; j++) {
                    if (cells[i + j * w]) {
                        var sq = new Phaser.Image(game, 10 + i * 18, -h * 7 + j * 16, "ui", "slot_table_item");
                        sq.width = 16;
                        sq.height = 14;
                        sq.tint = items[i][1] == j ? 0xff4d4d : 0xd6a865;
                        this.add(sq);
                    }
                }
            }
        }
        return PaytableChainBlock;
    }(Phaser.Group));
    RushSlots.PaytableChainBlock = PaytableChainBlock;
})(RushSlots || (RushSlots = {}));
var RushSlots;
(function (RushSlots) {
    var PaytableChipBlock = (function (_super) {
        __extends(PaytableChipBlock, _super);
        function PaytableChipBlock(game, config) {
            _super.call(this, game);
            var logo = RushSlots.Slots.ChipsFactory.create(game, config);
            var sc = 100 / (logo.width > logo.height ? logo.width : logo.height);
            logo.scale.set(sc, sc);
            logo.y = logo.height / 2;
            for (var i = 0; i < 3; i++) {
                var prize = new Phaser.Text(game, 45, 24 * i + 10, "x" + (i + 3) + "  " + config.prize[i], { fontSize: 24 });
                this.add(prize);
            }
            this.add(logo);
        }
        return PaytableChipBlock;
    }(Phaser.Group));
    RushSlots.PaytableChipBlock = PaytableChipBlock;
})(RushSlots || (RushSlots = {}));
var RushSlots;
(function (RushSlots) {
    var PointsPopup = (function (_super) {
        __extends(PointsPopup, _super);
        function PointsPopup(game) {
            _super.call(this, game);
            this._isActive = false;
            this._text = new Phaser.BitmapText(game, 0, 0, "float_digits", "", 72);
            this._text.anchor.set(0.5, 0.5);
            this._text.autoCull = false;
            this.add(this._text);
            this._text.scale.set(0, 0);
        }
        PointsPopup.prototype.showWhole = function (amount, x, y) {
            this._amount = 0;
            this._text.text = "0";
            this._text.position.set(x, y);
            this._text.scale.set(0, 0);
            this.game.add.tween(this).to({ amount: amount }, 800).start();
            this._lastTween = this.game.add.tween(this._text.scale).to({ x: 1, y: 1 }, 350, Phaser.Easing.Cubic.Out, true);
            this._isActive = true;
        };
        PointsPopup.prototype.showPart = function (amount, x, y) {
            this._amount = 0;
            this._text.text = amount + "";
            this._text.position.set(x, y);
            this._text.scale.set(0, 0);
            this._lastTween = this.game.add.tween(this._text.scale).to({ x: 1, y: 1 }, 200, Phaser.Easing.Cubic.Out, true);
        };
        PointsPopup.prototype.hide = function () {
            this.game.add.tween(this._text.scale).to({ x: 0, y: 0 }, 300, Phaser.Easing.Cubic.In, true);
            this._isActive = false;
        };
        Object.defineProperty(PointsPopup.prototype, "amount", {
            get: function () {
                return this._amount;
            },
            set: function (value) {
                this._amount = Math.floor(value);
                this._text.text = this._amount + "";
            },
            enumerable: true,
            configurable: true
        });
        PointsPopup.prototype.destroy = function (destroyChildren, soft) {
            if (destroyChildren === void 0) { destroyChildren = true; }
            if (soft === void 0) { soft = false; }
            if (this._lastTween)
                this._lastTween.stop(false);
            if (this.game) {
                this.game.tweens.removeFrom(this, true);
                this.game.tweens.removeFrom(this._text.scale, true);
            }
            _super.prototype.destroy.call(this, destroyChildren, soft);
        };
        return PointsPopup;
    }(Phaser.Group));
    RushSlots.PointsPopup = PointsPopup;
})(RushSlots || (RushSlots = {}));
var RushSlots;
(function (RushSlots) {
    var TopBlock = (function (_super) {
        __extends(TopBlock, _super);
        function TopBlock(game) {
            _super.call(this, game);
            this._coins = new RushSlots.TextHolder(game, 150, "ui_coin_counter", 130);
            this._coins.x = 14;
            this._coins.y = 14;
            this.add(this._coins);
            this._coins.value = RushSlots.User.instance.coins;
            RushSlots.User.instance.onChange.add(this.dataChanged, this);
            this.dataChanged();
        }
        TopBlock.prototype.dataChanged = function () {
            if (this.game)
                this.game.add.tween(this._coins).to({ value: RushSlots.User.instance.coins }, 300, null, true);
        };
        return TopBlock;
    }(Phaser.Group));
    RushSlots.TopBlock = TopBlock;
})(RushSlots || (RushSlots = {}));
///<reference path="../TopBlock.ts" />
var RushSlots;
(function (RushSlots) {
    var SlotsTopBlock = (function (_super) {
        __extends(SlotsTopBlock, _super);
        function SlotsTopBlock(game) {
            _super.call(this, game);
            this.onSpin = new Phaser.Signal();
            this.onClose = new Phaser.Signal();
            var closeButton = new KE.display.Button(game, this.closeTriggered, this, "close_button_up", "close_button_down", "ui");
            closeButton.x = 410;
            this.add(closeButton);
        }
        SlotsTopBlock.prototype.closeTriggered = function () {
            this.onClose.dispatch();
        };
        SlotsTopBlock.prototype.spinClicked = function () {
            this.onSpin.dispatch();
        };
        return SlotsTopBlock;
    }(RushSlots.TopBlock));
    RushSlots.SlotsTopBlock = SlotsTopBlock;
})(RushSlots || (RushSlots = {}));
var RushSlots;
(function (RushSlots) {
    var SlotsBottomBlock = (function (_super) {
        __extends(SlotsBottomBlock, _super);
        function SlotsBottomBlock(game, linesAmount) {
            var _this = this;
            _super.call(this, game);
            this.onSpin = new Phaser.Signal();
            this.onAutoSpin = new Phaser.Signal();
            this.onHelp = new Phaser.Signal();
            this._spinButton = new KE.display.TextButton(game, "Spin", { font: "Riffic", fill: "#fefefe", fontSize: 64 }, this.spinClicked, this, "spin_button_up", "spin_button_down", "ui", 1);
            this._spinButton.pivot.set(190, 190);
            this._betMenu = new RushSlots.BetMenu(game, linesAmount);
            this._betMenu.autoSpin.add(this.autoSpin, this);
            this._betMenu.helpTrigger.add(this.help, this);
            this.add(this._spinButton);
            this.add(this._betMenu);
            KE.ui.ResizeManager.addSimple(this._betMenu, 0.5, 1);
            KE.ui.ResizeManager.addSimple(this._spinButton, 1, 1);
            KE.ui.ResizeManager.addFun(function (w, h) { return _this.updateSize(w, h); });
            this.updateSize(KE.ui.ResizeManager.newWidth, KE.ui.ResizeManager.newHeight);
        }
        SlotsBottomBlock.prototype.updateSize = function (w, h) {
            if (w < h && w / h < 0.8) {
                this._spinButton.pivot.set(180, 260);
                this._betMenu.scale.set(1.11, 1.11);
            }
            else {
                this._spinButton.pivot.set(190, 190);
                this._betMenu.scale.set(1, 1);
            }
        };
        Object.defineProperty(SlotsBottomBlock.prototype, "currentBet", {
            get: function () {
                return this._betMenu.currentBet;
            },
            enumerable: true,
            configurable: true
        });
        SlotsBottomBlock.prototype.autoSpin = function () {
            this.onAutoSpin.dispatch();
        };
        SlotsBottomBlock.prototype.help = function () {
            this.onHelp.dispatch();
        };
        SlotsBottomBlock.prototype.spinClicked = function () {
            this.onSpin.dispatch();
        };
        return SlotsBottomBlock;
    }(RushSlots.BottomBlock));
    RushSlots.SlotsBottomBlock = SlotsBottomBlock;
})(RushSlots || (RushSlots = {}));
//# sourceMappingURL=game.js.map