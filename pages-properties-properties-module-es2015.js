(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-properties-properties-module"],{

/***/ "./node_modules/agm-overlays/AgmOverlay.component.js":
/*!***********************************************************!*\
  !*** ./node_modules/agm-overlays/AgmOverlay.component.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
var core_2 = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
var AgmOverlay = (function () {
    function AgmOverlay(_mapsWrapper, _markerManager) {
        this._mapsWrapper = _mapsWrapper;
        this._markerManager = _markerManager;
        this.visible = true;
        this.zIndex = 1;
        this.markerClick = new core_1.EventEmitter();
        this.openInfoWindow = true;
        this.infoWindow = new core_1.QueryList();
        this.draggable = false;
        this._observableSubscriptions = [];
    }
    AgmOverlay.prototype.ngAfterViewInit = function () {
        var _this = this;
        var iWins = this.template.nativeElement.getElementsByTagName('agm-info-window');
        for (var x = iWins.length - 1; x >= 0; --x) {
            iWins[x].parentNode.removeChild(iWins[x]);
        }
        this.load().then(function () {
            _this.onChanges = _this.onChangesOverride;
        });
    };
    AgmOverlay.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.infoWindow.changes.subscribe(function () { return _this.handleInfoWindowUpdate(); });
    };
    AgmOverlay.prototype.ngOnChanges = function (changes) {
        this.onChanges(changes);
    };
    AgmOverlay.prototype.onChanges = function (changes) { };
    AgmOverlay.prototype.onChangesOverride = function (changes) {
        var _this = this;
        if (changes.latitude || changes.longitude || changes.zIndex) {
            this.overlayView.latitude = this.latitude;
            this.overlayView.longitude = this.longitude;
            this.overlayView.zIndex = this.zIndex;
            this.destroy().then(function () { return _this.load(); });
        }
    };
    AgmOverlay.prototype.ngOnDestroy = function () {
        this.destroy();
    };
    AgmOverlay.prototype.destroy = function () {
        this.destroyed = true;
        var promise = this._markerManager.deleteMarker(this.overlayView);
        if (this.overlayView) {
            if (this.overlayView.div) {
                this.overlayView.remove();
            }
            this.overlayView.setMap(null);
        }
        this._observableSubscriptions.forEach(function (s) { return s.unsubscribe(); });
        delete this.overlayView;
        return promise;
    };
    AgmOverlay.prototype.handleInfoWindowUpdate = function () {
        var _this = this;
        if (this.infoWindow.length > 1) {
            throw new Error('Expected no more than one info window.');
        }
        this.infoWindow.forEach(function (iWin) {
            iWin.hostMarker = _this.overlayView;
        });
    };
    AgmOverlay.prototype.load = function () {
        var _this = this;
        return this._mapsWrapper.getNativeMap()
            .then(function (map) {
            var overlay = _this.getOverlay(map);
            _this._markerManager.addMarker(overlay);
            _this._addEventListeners();
            return _this._markerManager.getNativeMarker(overlay);
        })
            .then(function (nativeMarker) {
            var setMap = nativeMarker.setMap;
            if (nativeMarker['map']) {
                _this.overlayView.setMap(nativeMarker['map']);
            }
            nativeMarker.setMap = function (map) {
                setMap.call(nativeMarker, map);
                if (_this.overlayView) {
                    _this.overlayView.setMap(map);
                }
            };
        });
    };
    AgmOverlay.prototype.getOverlay = function (map) {
        var _this = this;
        this.overlayView = this.overlayView || new google.maps.OverlayView();
        this.overlayView.iconUrl = " ";
        this.overlayView.latitude = this.latitude;
        this.overlayView.longitude = this.longitude;
        this.overlayView.visible = false;
        if (this.bounds) {
            this.overlayView.bounds_ = new google.maps.LatLngBounds(new google.maps.LatLng(this.latitude + this.bounds.x.latitude, this.longitude + this.bounds.x.longitude), new google.maps.LatLng(this.latitude + this.bounds.y.latitude, this.longitude + this.bounds.y.longitude));
        }
        var elm = this.template.nativeElement.children[0];
        var restore = function (div) {
            _this.template.nativeElement.appendChild(div);
        };
        this.overlayView.remove = function () {
            if (!this.div)
                return;
            this.div.parentNode.removeChild(this.div);
            restore(this.div);
            delete this.div;
        };
        this.overlayView.getDiv = function () {
            return this.div;
        };
        this.overlayView.draw = function () {
            if (!this.div) {
                this.div = elm;
                var panes = this.getPanes();
                if (!panes || !panes.overlayImage)
                    return;
                panes.overlayImage.appendChild(elm);
            }
            var latlng = new google.maps.LatLng(this.latitude, this.longitude);
            var proj = this.getProjection();
            if (!proj)
                return;
            var point = proj.fromLatLngToDivPixel(latlng);
            if (point) {
                elm.style.left = (point.x - 10) + 'px';
                elm.style.top = (point.y - 20) + 'px';
            }
            if (this.bounds_) {
                var proj_1 = this.getProjection();
                var sw = proj_1.fromLatLngToDivPixel(this.bounds_.getSouthWest());
                var ne = proj_1.fromLatLngToDivPixel(this.bounds_.getNorthEast());
                this.div.style.left = sw.x + 'px';
                this.div.style.top = ne.y + 'px';
                this.div.children[0].style.width = ne.x - sw.x + 'px';
                this.div.children[0].style.height = sw.y - ne.y + 'px';
            }
        };
        elm.addEventListener("click", function (event) {
            _this.handleTap();
            event.stopPropagation();
        });
        this.handleInfoWindowUpdate();
        return this.overlayView;
    };
    AgmOverlay.prototype.handleTap = function () {
        if (this.openInfoWindow) {
            this.infoWindow.forEach(function (infoWindow) {
                infoWindow.open();
            });
        }
        this.markerClick.emit(null);
    };
    AgmOverlay.prototype._addEventListeners = function () {
        var _this = this;
        var eo = this._markerManager.createEventObservable('click', this.overlayView);
        var cs = eo.subscribe(function () { return _this.handleTap(); });
        this._observableSubscriptions.push(cs);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], AgmOverlay.prototype, "latitude", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], AgmOverlay.prototype, "longitude", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AgmOverlay.prototype, "visible", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], AgmOverlay.prototype, "zIndex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AgmOverlay.prototype, "bounds", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AgmOverlay.prototype, "markerClick", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AgmOverlay.prototype, "openInfoWindow", void 0);
    __decorate([
        core_1.ContentChildren(core_2.AgmInfoWindow),
        __metadata("design:type", core_1.QueryList)
    ], AgmOverlay.prototype, "infoWindow", void 0);
    __decorate([
        core_1.Input('markerDraggable'),
        __metadata("design:type", Boolean)
    ], AgmOverlay.prototype, "draggable", void 0);
    __decorate([
        core_1.ViewChild('content', { read: core_1.ElementRef }),
        __metadata("design:type", core_1.ElementRef)
    ], AgmOverlay.prototype, "template", void 0);
    AgmOverlay = __decorate([
        core_1.Component({
            selector: "agm-overlay",
            template: '<div #content><div style="position:absolute"><ng-content></ng-content></div></div>'
        }),
        __metadata("design:paramtypes", [core_2.GoogleMapsAPIWrapper,
            core_2.MarkerManager])
    ], AgmOverlay);
    return AgmOverlay;
}());
exports.AgmOverlay = AgmOverlay;


/***/ }),

/***/ "./node_modules/agm-overlays/AgmOverlays.module.js":
/*!*********************************************************!*\
  !*** ./node_modules/agm-overlays/AgmOverlays.module.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
var common_1 = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
var AgmOverlay_component_1 = __webpack_require__(/*! ./AgmOverlay.component */ "./node_modules/agm-overlays/AgmOverlay.component.js");
var AgmOverlays = (function () {
    function AgmOverlays() {
    }
    AgmOverlays = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: [AgmOverlay_component_1.AgmOverlay],
            exports: [AgmOverlay_component_1.AgmOverlay],
        })
    ], AgmOverlays);
    return AgmOverlays;
}());
exports.AgmOverlays = AgmOverlays;


/***/ }),

/***/ "./node_modules/agm-overlays/index.js":
/*!********************************************!*\
  !*** ./node_modules/agm-overlays/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./AgmOverlay.component */ "./node_modules/agm-overlays/AgmOverlay.component.js"));
__export(__webpack_require__(/*! ./AgmOverlays.module */ "./node_modules/agm-overlays/AgmOverlays.module.js"));


/***/ }),

/***/ "./node_modules/mat-video/fesm2015/mat-video.js":
/*!******************************************************!*\
  !*** ./node_modules/mat-video/fesm2015/mat-video.js ***!
  \******************************************************/
/*! exports provided: MatVideoModule, ɵa, ɵb, ɵc, ɵd, ɵe, ɵf, ɵg, ɵh, ɵi, ɵj, ɵk, ɵl, ɵm, ɵn, ɵo, ɵp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatVideoModule", function() { return MatVideoModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return SecondsToTimePipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return MatVideoComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵc", function() { return EventService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵd", function() { return MatSliderProgressBarComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵe", function() { return MatPlayButtonComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵf", function() { return MatVolumeControlComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵg", function() { return MatDownloadButtonComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵh", function() { return MatFullscreenButtonComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵi", function() { return FullscreenService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵj", function() { return MatTimeControlComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵk", function() { return MatQualityControlComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵl", function() { return MatVideoSpinnerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵm", function() { return MatSeekProgressControlComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵn", function() { return MatVideoSourceDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵo", function() { return MatVideoTrackDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵp", function() { return MatFrameByFrameControlComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm2015/button.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm2015/icon.js");
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/slider */ "./node_modules/@angular/material/esm2015/slider.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/esm2015/a11y.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/esm2015/bidi.js");









let EventService = class EventService {
    constructor() { }
    addEvents(renderer, events) {
        for (const event of events)
            event.dispose = renderer.listen(event.element, event.name, newEvent => event.callback(newEvent));
    }
    removeEvents(events) {
        for (const event of events)
            if (event.dispose)
                event.dispose();
    }
};
EventService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [])
], EventService);

let MatVideoComponent = class MatVideoComponent {
    constructor(renderer, evt) {
        this.renderer = renderer;
        this.evt = evt;
        this.src = null;
        this.title = null;
        this.autoplay = false;
        this.preload = true;
        this.loop = false;
        this.quality = true;
        this.fullscreen = true;
        this.showFrameByFrame = false;
        this.fps = 29.97;
        this.download = false;
        this.color = 'primary';
        this.spinner = 'spin';
        this.poster = null;
        this.keyboard = true;
        this.overlay = null;
        this.muted = false;
        this.mutedChange = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
        this.timeChange = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
        this.playing = false;
        this.isFullscreen = false;
        this.videoLoaded = false;
        this.isMouseMoving = false;
        this.isMouseMovingTimeout = 2000;
    }
    get time() {
        return this.getVideoTag().currentTime;
    }
    set time(val) {
        const video = this.getVideoTag();
        if (video && val) {
            if (val > video.duration) {
                val = video.duration;
            }
            if (val < 0) {
                val = 0;
            }
            if (val !== video.currentTime) {
                video.currentTime = val;
            }
            if (this.lastTime !== video.currentTime) {
                setTimeout(() => this.timeChange.emit(video.currentTime), 0);
                this.lastTime = video.currentTime;
            }
        }
    }
    ngAfterViewInit() {
        this.events = [
            { element: this.video.nativeElement, name: 'loadstart', callback: event => this.videoLoaded = false, dispose: null },
            { element: this.video.nativeElement, name: 'loadedmetadata', callback: event => this.evLoadedMetadata(event), dispose: null },
            { element: this.video.nativeElement, name: 'error', callback: event => console.error('Unhandled Video Error', event), dispose: null },
            { element: this.video.nativeElement, name: 'contextmenu', callback: event => event.preventDefault(), dispose: null },
            { element: this.video.nativeElement, name: 'timeupdate', callback: event => this.evTimeUpdate(event), dispose: null },
            { element: this.player.nativeElement, name: 'mousemove', callback: event => this.evMouseMove(event), dispose: null }
        ];
        this.video.nativeElement.onloadeddata = () => this.videoLoaded = true;
        this.evt.addEvents(this.renderer, this.events);
    }
    ngOnDestroy() {
        this.video.nativeElement.onloadeddata = null;
        this.evt.removeEvents(this.events);
    }
    load() {
        if (this.video && this.video.nativeElement)
            this.video.nativeElement.load();
    }
    getVideoTag() {
        return this.video && this.video.nativeElement ? this.video.nativeElement : null;
    }
    evLoadedMetadata(event) {
        this.videoWidth = this.video.nativeElement.videoWidth;
        this.videoHeight = this.video.nativeElement.videoHeight;
        this.videoLoaded = true;
    }
    evMouseMove(event) {
        this.isMouseMoving = true;
        clearTimeout(this.isMouseMovingTimer);
        this.isMouseMovingTimer = setTimeout(() => {
            this.isMouseMoving = false;
        }, this.isMouseMovingTimeout);
    }
    evTimeUpdate(event) {
        this.time = this.getVideoTag().currentTime;
    }
    getOverlayClass(activeClass, inactiveClass) {
        if (this.overlay === null) {
            return (!this.playing || this.isMouseMoving) ? activeClass : inactiveClass;
        }
        else {
            return this.overlay ? activeClass : inactiveClass;
        }
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])('player'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"])
], MatVideoComponent.prototype, "player", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])('video'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"])
], MatVideoComponent.prototype, "video", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], MatVideoComponent.prototype, "src", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], MatVideoComponent.prototype, "title", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
], MatVideoComponent.prototype, "autoplay", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
], MatVideoComponent.prototype, "preload", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
], MatVideoComponent.prototype, "loop", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
], MatVideoComponent.prototype, "quality", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
], MatVideoComponent.prototype, "fullscreen", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
], MatVideoComponent.prototype, "showFrameByFrame", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
], MatVideoComponent.prototype, "fps", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
], MatVideoComponent.prototype, "download", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], MatVideoComponent.prototype, "color", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], MatVideoComponent.prototype, "spinner", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], MatVideoComponent.prototype, "poster", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
], MatVideoComponent.prototype, "keyboard", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
], MatVideoComponent.prototype, "overlay", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
], MatVideoComponent.prototype, "muted", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
], MatVideoComponent.prototype, "mutedChange", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Number])
], MatVideoComponent.prototype, "time", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
], MatVideoComponent.prototype, "timeChange", void 0);
MatVideoComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'mat-video',
        template: "<div #player class=\"videoplayer\" [ngClass]=\"getOverlayClass('show-mouse', 'hide-mouse')\">\r\n    <div class=\"header\" *ngIf=\"title\" [ngClass]=\"getOverlayClass('visible', 'hidden')\">\r\n        {{title}}\r\n    </div>\r\n\r\n    <video #video class=\"video\" [attr.src]=\"src ? src : null\" [attr.autoplay]=\"autoplay ? true : null\"\r\n        [preload]=\"preload ? 'auto' : 'metadata'\" [attr.poster]=\"poster ? poster : null\"\r\n        [attr.loop]=\"loop ? loop : null\">\r\n        <ng-content select=\"source\"></ng-content>\r\n        <ng-content select=\"track\"></ng-content>\r\n        This browser does not support HTML5 video.\r\n    </video>\r\n\r\n    <div class=\"controls\" *ngIf=\"videoLoaded\" [ngClass]=\"getOverlayClass('visible', 'hidden')\">\r\n        <div class=\"progress\">\r\n            <mat-seek-progress-control [color]=\"color\" [video]=\"video\"></mat-seek-progress-control>\r\n        </div>\r\n\r\n        <div class=\"menu\">\r\n            <div class=\"left\">\r\n                <mat-play-button (playChanged)=\"playing = $event\" [video]=\"video\" [keyboard]=\"keyboard\">\r\n                </mat-play-button>\r\n\r\n                <mat-frame-by-frame-control *ngIf=\"showFrameByFrame\" [video]=\"video\" [fps]=\"fps\"></mat-frame-by-frame-control>\r\n\r\n                <mat-volume-control [muted]=\"muted\" (mutedChanged)=\"muted = $event; mutedChange.emit(muted);\"\r\n                    [color]=\"color\" [video]=\"video\" [keyboard]=\"keyboard\">\r\n                </mat-volume-control>\r\n\r\n                <mat-time-control [video]=\"video\"></mat-time-control>\r\n            </div>\r\n\r\n            <div class=\"right\">\r\n                <mat-quality-control *ngIf=\"quality\" [video]=\"video\"></mat-quality-control>\r\n\r\n                <mat-download-button *ngIf=\"download\" [title]=\"title\" [video]=\"video\"></mat-download-button>\r\n\r\n                <mat-fullscreen-button *ngIf=\"fullscreen\" (fullscreenChanged)=\"isFullscreen = $event\" [player]=\"player\"\r\n                    [keyboard]=\"keyboard\"></mat-fullscreen-button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <mat-video-spinner [spinner]=\"spinner\" [video]=\"video\"></mat-video-spinner>\r\n</div>\r\n",
        styles: [".videoplayer{font-family:Roboto,\"Helvetica Neue\",sans-serif;background-color:#000;position:relative;width:100%;height:100%}.header{color:#fff;display:flex;justify-content:center;align-items:center;position:absolute;left:0;top:0;padding:14px 0;width:100%;z-index:1;background-image:linear-gradient(to top,rgba(0,0,0,0),rgba(0,0,0,.65))}.video{display:block;width:100%;height:100%;z-index:0}.controls{color:#fff;position:absolute;left:0;bottom:0;width:100%;z-index:1;background-image:linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,.65))}.controls .progress{height:26px}.controls .menu{display:flex;align-items:center;flex-direction:row;justify-content:space-between;height:48px}.controls .menu .left{justify-content:flex-start}.controls .menu .right{justify-content:flex-end}.visible{visibility:visible;opacity:1;transition:opacity .5s linear}.hidden{visibility:hidden;opacity:0;transition:visibility .5s,opacity .5s linear}.show-mouse{cursor:default}.hide-mouse{cursor:none}", "@font-face{font-family:'Material Icons';font-style:normal;font-weight:400;src:url(https://fonts.gstatic.com/s/materialicons/v36/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2) format('woff2')}::ng-deep.material-icons{font-family:'Material Icons';font-weight:400;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;font-feature-settings:'liga';-webkit-font-feature-settings:'liga';-webkit-font-smoothing:antialiased}"]
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_2__["Renderer2"],
        EventService])
], MatVideoComponent);

let MatVideoSourceDirective = class MatVideoSourceDirective {
    constructor(matVideoComponent, el) {
        this.matVideoComponent = matVideoComponent;
        this.el = el;
        this.src = null;
        this.type = null;
        this.init = true;
        this.video = matVideoComponent;
        this.source = el.nativeElement;
        this.init = false;
    }
    ngOnChanges(changes) {
        this.source.src = this.src;
        this.source.type = this.type;
        if (!this.init)
            this.video.load();
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], MatVideoSourceDirective.prototype, "src", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], MatVideoSourceDirective.prototype, "type", void 0);
MatVideoSourceDirective = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Directive"])({
        selector: '[matVideoSource]'
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Host"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [MatVideoComponent,
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"]])
], MatVideoSourceDirective);

let MatVideoTrackDirective = class MatVideoTrackDirective {
    constructor(matVideoComponent, el) {
        this.matVideoComponent = matVideoComponent;
        this.el = el;
        this.src = null;
        this.kind = null;
        this.srclang = null;
        this.label = null;
        this.init = true;
        this.video = matVideoComponent;
        this.track = el.nativeElement;
        this.init = false;
    }
    ngOnChanges(changes) {
        this.track.src = this.src;
        this.track.kind = this.kind;
        this.track.srclang = this.srclang;
        this.track.label = this.label;
        if (!this.init)
            this.video.load();
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], MatVideoTrackDirective.prototype, "src", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], MatVideoTrackDirective.prototype, "kind", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], MatVideoTrackDirective.prototype, "srclang", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], MatVideoTrackDirective.prototype, "label", void 0);
MatVideoTrackDirective = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Directive"])({
        selector: '[matVideoTrack]'
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Host"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [MatVideoComponent,
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"]])
], MatVideoTrackDirective);

/** Counter used to generate unique IDs for progress bars. */
let sliderprogressbarId = 0;
let MatSliderProgressBarComponent = class MatSliderProgressBarComponent extends _angular_material_slider__WEBPACK_IMPORTED_MODULE_5__["MatSlider"] {
    constructor(elementRef, focusMonitor, changeDetectorRef, dir, tabIndex) {
        super(elementRef, focusMonitor, changeDetectorRef, dir, tabIndex);
        this.mode = 'buffer';
        this.value = 0;
        this._bufferValue = 0;
        /** The id of the progress bar. */
        this.sliderprogressbarId = `mat-slider-progress-bar-${sliderprogressbarId++}`;
        this.tabIndex = parseInt(tabIndex) || 0;
    }
    /** Buffer value of the progress bar. Defaults to zero. */
    get bufferValue() { return this._bufferValue; }
    set bufferValue(v) { this._bufferValue = clamp(v || 0); }
    /** CSS styles for the track fill element. */
    get _trackBufferStyles() {
        if (this.mode === 'buffer') {
            const axis = this.vertical ? 'Y' : 'X';
            return {
                'transform': `translate${axis}(0px) scale${axis}(${this._bufferValue / 100})`
            };
        }
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], MatSliderProgressBarComponent.prototype, "mode", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
], MatSliderProgressBarComponent.prototype, "value", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Number])
], MatSliderProgressBarComponent.prototype, "bufferValue", null);
MatSliderProgressBarComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'mat-slider-progress-bar',
        template: "<div class=\"mat-slider-wrapper\" #sliderWrapper>\r\n    <div class=\"mat-slider-track-wrapper\">\r\n        <svg width=\"100%\" height=\"2\" focusable=\"false\" class=\"mat-slider-progress-background\">\r\n            <defs>\r\n                <pattern [id]=\"sliderprogressbarId\" x=\"2.5\" y=\"0\" width=\"5\" height=\"2.5\" patternUnits=\"userSpaceOnUse\">\r\n                    <circle cx=\"1.25\" cy=\"1.25\" r=\"1.25\" />\r\n                </pattern>\r\n            </defs>\r\n            <rect [attr.fill]=\"'url(#' + sliderprogressbarId + ')'\" width=\"100%\" height=\"100%\" />\r\n        </svg>\r\n        <div class=\"mat-slider-track-fill mat-slider-track-buffer\" [ngStyle]=\"_trackBufferStyles\"></div>\r\n        <div class=\"mat-slider-track-fill\" [ngStyle]=\"_trackFillStyles\"></div>\r\n    </div>\r\n    <div class=\"mat-slider-ticks-container\" [ngStyle]=\"_ticksContainerStyles\">\r\n        <div class=\"mat-slider-ticks\" [ngStyle]=\"_ticksStyles\"></div>\r\n    </div>\r\n    <div class=\"mat-slider-thumb-container\" [ngStyle]=\"_thumbContainerStyles\">\r\n        <div class=\"mat-slider-focus-ring\"></div>\r\n        <div class=\"mat-slider-thumb\"></div>\r\n        <div class=\"mat-slider-thumb-label\">\r\n            <span class=\"mat-slider-thumb-label-text\">{{displayValue}}</span>\r\n        </div>\r\n    </div>\r\n</div>",
        providers: [_angular_material_slider__WEBPACK_IMPORTED_MODULE_5__["MAT_SLIDER_VALUE_ACCESSOR"]],
        host: {
            '(focus)': '_onFocus()',
            '(blur)': '_onBlur()',
            '(click)': 'this["_onClick"] ? this["_onClick"]($event) : null',
            '(mousedown)': 'this["_onMousedown"] ? this["_onMousedown"]($event) : null',
            '(keydown)': '_onKeydown($event)',
            '(keyup)': '_onKeyup()',
            '(mouseenter)': '_onMouseenter()',
            '(slide)': '_onSlide($event)',
            '(slideend)': '_onSlideEnd()',
            '(slidestart)': '_onSlideStart($event)',
            'class': 'mat-slider',
            'role': 'slider',
            '[tabIndex]': 'tabIndex',
            '[attr.aria-disabled]': 'disabled',
            '[attr.aria-valuemax]': 'max',
            '[attr.aria-valuemin]': 'min',
            '[attr.aria-valuenow]': 'value',
            '[attr.aria-orientation]': 'vertical ? "vertical" : "horizontal"',
            '[class.mat-slider-disabled]': 'disabled',
            '[class.mat-slider-has-ticks]': 'tickInterval',
            '[class.mat-slider-horizontal]': '!vertical',
            '[class.mat-slider-axis-inverted]': '_invertAxis',
            '[class.mat-slider-sliding]': '_isSliding',
            '[class.mat-slider-thumb-label-showing]': 'thumbLabel',
            '[class.mat-slider-vertical]': 'vertical',
            '[class.mat-slider-min-value]': '_isMinValue',
            '[class.mat-slider-hide-last-tick]': 'disabled || _isMinValue && _thumbGap && _invertAxis',
        },
        inputs: ['disabled', 'color', 'tabIndex'],
        changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectionStrategy"].OnPush,
        styles: [":host{width:100%}.mat-slider-progress-background{position:absolute;height:2px;width:100%;fill:#d3d3d3}.mat-slider-track-buffer{background-color:#d3d3d3!important}.mat-slider-thumb{border-color:transparent!important;visibility:hidden;opacity:0;transition:visibility .2s,opacity .2s linear}:host:hover .mat-slider-thumb{visibility:visible;opacity:1;transition:opacity .2s linear}"]
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Optional"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Attribute"])('tabindex')),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"],
        _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_6__["FocusMonitor"],
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectorRef"],
        _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_7__["Directionality"], String])
], MatSliderProgressBarComponent);
/** Clamps a value to be between two numbers, by default 0 and 100. */
function clamp(v, min = 0, max = 100) {
    return Math.max(min, Math.min(max, v));
}

let SecondsToTimePipe = class SecondsToTimePipe {
    constructor() {
        this.times = {
            year: 31557600,
            month: 2629746,
            day: 86400,
            hour: 3600,
        };
    }
    transform(seconds) {
        if (!seconds)
            return '0:00';
        else {
            let time_string = '';
            for (const key in this.times) {
                if (Math.floor(seconds / this.times[key]) > 0) {
                    time_string += Math.floor(seconds / this.times[key]).toString() + ':';
                    seconds = seconds - this.times[key] * Math.floor(seconds / this.times[key]);
                }
            }
            time_string += Math.floor(seconds / 60).toString() + ':';
            seconds = seconds - 60 * Math.floor(seconds / 60);
            if (Math.floor(seconds) < 10)
                time_string += '0';
            time_string += Math.floor(seconds).toString();
            return time_string;
        }
    }
};
SecondsToTimePipe = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Pipe"])({
        name: 'secondsToTime'
    })
], SecondsToTimePipe);

let FullscreenService = class FullscreenService {
    constructor() {
        this.fnMap = [
            // Object keys
            [
                'requestFullscreen',
                'exitFullscreen',
                'fullscreenElement',
                'fullscreenEnabled',
                'fullscreenchange',
                'fullscreenerror'
            ],
            // New WebKit
            [
                'webkitRequestFullscreen',
                'webkitExitFullscreen',
                'webkitFullscreenElement',
                'webkitFullscreenEnabled',
                'webkitfullscreenchange',
                'webkitfullscreenerror'
            ],
            // Old WebKit (Safari 5.1)
            [
                'webkitRequestFullScreen',
                'webkitCancelFullScreen',
                'webkitCurrentFullScreenElement',
                'webkitCancelFullScreen',
                'webkitfullscreenchange',
                'webkitfullscreenerror'
            ],
            // Mozilla
            [
                'mozRequestFullScreen',
                'mozCancelFullScreen',
                'mozFullScreenElement',
                'mozFullScreenEnabled',
                'mozfullscreenchange',
                'mozfullscreenerror'
            ],
            // MS
            [
                'msRequestFullscreen',
                'msExitFullscreen',
                'msFullscreenElement',
                'msFullscreenEnabled',
                'MSFullscreenChange',
                'MSFullscreenError'
            ]
        ];
        this.keyboardAllowed = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element;
        const ret = {};
        let val;
        for (let i = 0; i < this.fnMap.length; i++) {
            val = this.fnMap[i];
            if (val && val[1] in document) {
                for (i = 0; i < val.length; i++) {
                    // Map everything to the first list of keys
                    ret[this.fnMap[0][i].toString()] = val[i];
                }
                this.fn = ret;
            }
        }
    }
    request(elem) {
        const request = this.fn.requestFullscreen;
        elem = elem || document.documentElement;
        // Work around Safari 5.1 bug: reports support for
        // keyboard in fullscreen even though it doesn't.
        // Browser sniffing, since the alternative with
        // setTimeout is even worse.
        if (/5\.1[.\d]* Safari/.test(navigator.userAgent)) {
            elem[request]();
        }
        else {
            elem[request](this.keyboardAllowed ? Element.ALLOW_KEYBOARD_INPUT : {});
        }
    }
    exit() {
        document[this.fn.exitFullscreen]();
    }
    toggle(elem) {
        if (this.isFullscreen()) {
            this.exit();
        }
        else {
            this.request(elem);
        }
    }
    onChange(callback) {
        document.addEventListener(this.fn.fullscreenchange, callback, false);
    }
    onError(callback) {
        document.addEventListener(this.fn.fullscreenerror, callback, false);
    }
    isFullscreen() {
        return Boolean(document[this.fn.fullscreenElement]);
    }
    isEnabled() {
        // Coerce to boolean in case of old WebKit
        return Boolean(document[this.fn.fullscreenEnabled]);
    }
    getElement() {
        return document[this.fn.fullscreenElement];
    }
};
FullscreenService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [])
], FullscreenService);

let MatDownloadButtonComponent = class MatDownloadButtonComponent {
    constructor() { }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", HTMLVideoElement)
], MatDownloadButtonComponent.prototype, "video", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], MatDownloadButtonComponent.prototype, "title", void 0);
MatDownloadButtonComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'mat-download-button',
        template: "<a mat-icon-button [href]=\"video?.currentSrc\" [download]=\"title\">\r\n  <mat-icon>file_download</mat-icon>\r\n</a>",
        styles: ["a{color:inherit;text-decoration:none}"]
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [])
], MatDownloadButtonComponent);

let MatFrameByFrameControlComponent = class MatFrameByFrameControlComponent {
    constructor() {
        this.fps = 29.97;
    }
    ngOnInit() {
    }
    seekFrames(nbFrames) {
        if (!this.video.paused) {
            this.video.pause();
        }
        const currentFrames = this.video.currentTime * this.fps;
        const newPos = ((currentFrames + nbFrames) / this.fps) + 0.00001;
        this.video.currentTime = newPos;
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", HTMLVideoElement)
], MatFrameByFrameControlComponent.prototype, "video", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
], MatFrameByFrameControlComponent.prototype, "fps", void 0);
MatFrameByFrameControlComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'mat-frame-by-frame-control',
        template: "<button mat-icon-button (click)=\"seekFrames(-5)\">\r\n    <mat-icon>skip_previous</mat-icon>\r\n</button>\r\n\r\n<button mat-icon-button (click)=\"seekFrames(-1)\">\r\n    <mat-icon>arrow_left</mat-icon>\r\n</button>\r\n\r\n<button mat-icon-button (click)=\"seekFrames(1)\">\r\n    <mat-icon>arrow_right</mat-icon>\r\n</button>\r\n\r\n<button mat-icon-button (click)=\"seekFrames(5)\">\r\n    <mat-icon>skip_next</mat-icon>\r\n</button>",
        styles: [""]
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [])
], MatFrameByFrameControlComponent);

let MatFullscreenButtonComponent = class MatFullscreenButtonComponent {
    constructor(fscreen, evt) {
        this.fscreen = fscreen;
        this.evt = evt;
        this.canFullscreen = false;
        this.fullscreen = false;
        this.fullscreenChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
        this.keyboard = true;
    }
    ngOnInit() {
        if (this.fscreen.isEnabled())
            this.canFullscreen = true;
        this.fscreen.onChange(event => this.fscreen.isFullscreen() ? this.onChangesFullscreen(true) : this.onChangesFullscreen(false));
    }
    setFullscreen(value) {
        if (this.canFullscreen && this.fullscreen !== value)
            this.toggleFullscreen();
    }
    toggleFullscreen() {
        this.fullscreen = !this.fullscreen;
        this.updateFullscreen();
    }
    updateFullscreen() {
        this.fullscreen ? this.fscreen.request(this.player) : this.fscreen.exit();
        this.fullscreenChanged.emit(this.fullscreen);
    }
    onChangesFullscreen(value) {
        this.fullscreen = value;
        this.fullscreenChanged.emit(this.fullscreen);
    }
    onFullscreenKey(event) {
        if (this.keyboard) {
            this.toggleFullscreen();
            event.preventDefault();
        }
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", HTMLVideoElement)
], MatFullscreenButtonComponent.prototype, "player", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
], MatFullscreenButtonComponent.prototype, "fullscreen", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
], MatFullscreenButtonComponent.prototype, "fullscreenChanged", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
], MatFullscreenButtonComponent.prototype, "keyboard", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["HostListener"])('document:keyup.f', ['$event']),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [KeyboardEvent]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], MatFullscreenButtonComponent.prototype, "onFullscreenKey", null);
MatFullscreenButtonComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'mat-fullscreen-button',
        template: "<button mat-icon-button [disabled]=\"!canFullscreen\" (click)=\"toggleFullscreen()\">\r\n  <mat-icon *ngIf=\"!fullscreen\">fullscreen</mat-icon>\r\n  <mat-icon *ngIf=\"fullscreen\">fullscreen_exit</mat-icon>\r\n</button>",
        styles: [""]
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [FullscreenService,
        EventService])
], MatFullscreenButtonComponent);

let MatPlayButtonComponent = class MatPlayButtonComponent {
    constructor(renderer, evt) {
        this.renderer = renderer;
        this.evt = evt;
        this.play = false;
        this.playChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
        this.keyboard = true;
    }
    ngAfterViewInit() {
        this.events = [
            { element: this.video, name: 'play', callback: event => this.setVideoPlayback(true), dispose: null },
            { element: this.video, name: 'pause', callback: event => this.setVideoPlayback(false), dispose: null },
            { element: this.video, name: 'durationchange', callback: event => this.setVideoPlayback(false), dispose: null },
            { element: this.video, name: 'ended', callback: event => this.setVideoPlayback(false), dispose: null },
            { element: this.video, name: 'click', callback: event => this.toggleVideoPlayback(), dispose: null }
        ];
        this.evt.addEvents(this.renderer, this.events);
    }
    ngOnDestroy() {
        this.evt.removeEvents(this.events);
    }
    setVideoPlayback(value) {
        if (this.play !== value)
            this.toggleVideoPlayback();
    }
    toggleVideoPlayback() {
        this.play = !this.play;
        this.updateVideoPlayback();
    }
    updateVideoPlayback() {
        this.play ? this.video.play() : this.video.pause();
        this.playChanged.emit(this.play);
    }
    onPlayKey(event) {
        if (this.keyboard) {
            this.toggleVideoPlayback();
            event.preventDefault();
        }
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", HTMLVideoElement)
], MatPlayButtonComponent.prototype, "video", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
], MatPlayButtonComponent.prototype, "play", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
], MatPlayButtonComponent.prototype, "playChanged", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
], MatPlayButtonComponent.prototype, "keyboard", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["HostListener"])('document:keyup.space', ['$event']),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [KeyboardEvent]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], MatPlayButtonComponent.prototype, "onPlayKey", null);
MatPlayButtonComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'mat-play-button',
        template: "<button mat-icon-button (click)=\"toggleVideoPlayback()\">\r\n  <mat-icon *ngIf=\"!play\">play_arrow</mat-icon>\r\n  <mat-icon *ngIf=\"play\">pause</mat-icon>\r\n</button>",
        styles: [""]
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_2__["Renderer2"],
        EventService])
], MatPlayButtonComponent);

let MatQualityControlComponent = class MatQualityControlComponent {
    constructor() { }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", HTMLVideoElement)
], MatQualityControlComponent.prototype, "video", void 0);
MatQualityControlComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'mat-quality-control',
        template: "<div *ngIf=\"video && video.videoHeight\" class=\"quality\">\r\n  {{ video.videoHeight }}p\r\n</div>",
        styles: [".quality{display:inline-block;font-size:12px;padding-left:12px;padding-right:12px}"]
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [])
], MatQualityControlComponent);

let MatSeekProgressControlComponent = class MatSeekProgressControlComponent {
    constructor(renderer, evt) {
        this.renderer = renderer;
        this.evt = evt;
        this.curTimePercent = 0;
        this.bufTimePercent = 0;
        this.video = null;
        this.color = 'primary';
        this.currentTime = 0;
        this.currentTimeChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
        this.bufferedTime = 0;
        this.bufferedTimeChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
    }
    ngAfterViewInit() {
        this.events = [
            { element: this.video, name: 'seeking', callback: event => this.updateCurrentTime(this.video.currentTime), dispose: null },
            { element: this.video, name: 'canplaythrough', callback: event => this.updateBufferedTime(), dispose: null },
            { element: this.video, name: 'timeupdate', callback: event => this.updateCurrentTime(this.video.currentTime), dispose: null },
            { element: this.video, name: 'progress', callback: event => this.updateBufferedTime(), dispose: null }
        ];
        this.evt.addEvents(this.renderer, this.events);
    }
    ngOnDestroy() {
        this.evt.removeEvents(this.events);
    }
    seekVideo(value) {
        const percentage = value / 100;
        const newTime = this.video.duration * percentage;
        this.video.currentTime = newTime;
    }
    updateCurrentTime(time) {
        this.currentTime = time;
        this.curTimePercent = this.updateTime(this.currentTimeChanged, this.currentTime);
    }
    updateBufferedTime() {
        if (this.video.buffered.length > 0) {
            let largestBufferValue = 0;
            for (let i = 0; i < this.video.buffered.length; i++) {
                const cur = this.video.currentTime;
                const start = this.video.buffered.start(i);
                const end = this.video.buffered.end(i);
                if (start <= cur && end > cur && (end - start) > largestBufferValue)
                    largestBufferValue = end;
            }
            this.bufferedTime = largestBufferValue;
            this.bufTimePercent = this.updateTime(this.bufferedTimeChanged, this.bufferedTime);
        }
    }
    updateTime(emitter, time) {
        emitter.emit(time);
        return time / this.video.duration * 100;
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", HTMLVideoElement)
], MatSeekProgressControlComponent.prototype, "video", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], MatSeekProgressControlComponent.prototype, "color", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
], MatSeekProgressControlComponent.prototype, "currentTime", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
], MatSeekProgressControlComponent.prototype, "currentTimeChanged", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
], MatSeekProgressControlComponent.prototype, "bufferedTime", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
], MatSeekProgressControlComponent.prototype, "bufferedTimeChanged", void 0);
MatSeekProgressControlComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'mat-seek-progress-control',
        template: "<mat-slider-progress-bar [color]=\"color\" mode=\"buffer\" step=\"0.01\" [value]=\"curTimePercent\" [bufferValue]=\"bufTimePercent\"\n  (input)=\"seekVideo($event.value)\"></mat-slider-progress-bar>",
        styles: [""]
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_2__["Renderer2"],
        EventService])
], MatSeekProgressControlComponent);

let MatTimeControlComponent = class MatTimeControlComponent {
    constructor() { }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", HTMLVideoElement)
], MatTimeControlComponent.prototype, "video", void 0);
MatTimeControlComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'mat-time-control',
        template: "<div class=\"playtime\">\r\n  {{ video?.currentTime | secondsToTime }} / {{ video?.duration | secondsToTime}}\r\n</div>",
        styles: [".playtime{display:inline;font-size:12px}"]
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [])
], MatTimeControlComponent);

let MatVideoSpinnerComponent = class MatVideoSpinnerComponent {
    constructor(renderer, evt) {
        this.renderer = renderer;
        this.evt = evt;
        this.spinner = 'spin';
        this.videoBuffering = false;
        this.videoLoaded = false;
        this.events = [];
    }
    ngAfterViewInit() {
        this.events = [
            { element: this.video, name: 'loadstart', callback: event => this.videoLoaded = false, dispose: null },
            { element: this.video, name: 'loadedmetadata', callback: event => this.videoLoaded = true, dispose: null },
            { element: this.video, name: 'canplay', callback: event => this.videoBuffering = false, dispose: null },
            { element: this.video, name: 'waiting', callback: event => this.videoBuffering = true, dispose: null },
            { element: this.video, name: 'durationchange', callback: event => this.videoBuffering = true, dispose: null }
        ];
        this.video.onloadeddata = () => this.videoLoaded = true;
        this.evt.addEvents(this.renderer, this.events);
    }
    ngOnDestroy() {
        this.video.onloadeddata = null;
        this.evt.removeEvents(this.events);
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", HTMLVideoElement)
], MatVideoSpinnerComponent.prototype, "video", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], MatVideoSpinnerComponent.prototype, "spinner", void 0);
MatVideoSpinnerComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'mat-video-spinner',
        template: "<div *ngIf=\"!videoLoaded || videoBuffering\" [class]=\"spinner\"></div>",
        styles: [":host{position:absolute;left:calc(50% - 32px);top:calc(50% - 32px);z-index:1}", ".spin{box-sizing:border-box;width:64px;height:64px;border-radius:100%;border:10px solid rgba(255,255,255,.2);border-top-color:#fff;-webkit-animation:1s linear infinite spin;animation:1s linear infinite spin}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0)}100%{-webkit-transform:rotate(360deg)}}@keyframes spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}", ".dot{width:64px;height:64px;background-color:#fff;border-radius:100%;-webkit-animation:1s ease-in-out infinite dot;animation:1s ease-in-out infinite dot}@-webkit-keyframes dot{0%{-webkit-transform:scale(0)}100%{-webkit-transform:scale(1);opacity:0}}@keyframes dot{0%{-webkit-transform:scale(0);transform:scale(0)}100%{-webkit-transform:scale(1);transform:scale(1);opacity:0}}", ".split-ring{display:inline-block;width:64px;height:64px}.split-ring:after{content:\" \";display:block;width:46px;height:46px;margin:1px;border-radius:50%;border:5px solid #fff;border-color:#fff transparent;-webkit-animation:1.2s linear infinite split-ring;animation:1.2s linear infinite split-ring}@-webkit-keyframes split-ring{0%{-webkit-transform:rotate(0)}100%{-webkit-transform:rotate(360deg)}}@keyframes split-ring{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}", ".hourglass{display:inline-block;position:relative;width:64px;height:64px}.hourglass:after{content:\" \";display:block;border-radius:50%;width:0;height:0;margin:6px;box-sizing:border-box;border:26px solid #fff;border-color:#fff transparent;-webkit-animation:1.2s infinite hourglass;animation:1.2s infinite hourglass}@-webkit-keyframes hourglass{0%{-webkit-transform:rotate(0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19)}50%{-webkit-transform:rotate(360deg);-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1)}100%{-webkit-transform:rotate(720deg)}}@keyframes hourglass{0%{-webkit-transform:rotate(0);transform:rotate(0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}50%{-webkit-transform:rotate(360deg);transform:rotate(360deg);-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}100%{-webkit-transform:rotate(720deg);transform:rotate(720deg)}}"]
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_2__["Renderer2"],
        EventService])
], MatVideoSpinnerComponent);

let MatVolumeControlComponent = class MatVolumeControlComponent {
    constructor(evt) {
        this.evt = evt;
        this.video = null;
        this.color = 'primary';
        this.volume = 1;
        this.volumeChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
        this._muted = false;
        this.mutedChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
        this.keyboard = true;
    }
    get muted() { return this._muted; }
    set muted(v) {
        this._muted = v;
        this.video.muted = this._muted;
    }
    setVolume(value) {
        this.volume = value;
        this.video.volume = this.volume;
        this.volumeChanged.emit(this.volume);
        if (this.volume > 0)
            this.setMuted(false);
    }
    setMuted(value) {
        if (this.muted !== value)
            this.toggleMuted();
    }
    toggleMuted() {
        this.muted = !this.muted;
        this.updateMuted();
    }
    updateMuted() {
        this.video.muted = this.muted;
        this.mutedChanged.emit(this.muted);
    }
    onMuteKey(event) {
        if (this.keyboard) {
            this.toggleMuted();
            event.preventDefault();
        }
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", HTMLVideoElement)
], MatVolumeControlComponent.prototype, "video", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], MatVolumeControlComponent.prototype, "color", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
], MatVolumeControlComponent.prototype, "volume", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
], MatVolumeControlComponent.prototype, "volumeChanged", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Boolean])
], MatVolumeControlComponent.prototype, "muted", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
], MatVolumeControlComponent.prototype, "mutedChanged", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
], MatVolumeControlComponent.prototype, "keyboard", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["HostListener"])('document:keyup.m', ['$event']),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [KeyboardEvent]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], MatVolumeControlComponent.prototype, "onMuteKey", null);
MatVolumeControlComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'mat-volume-control',
        template: "<div class=\"volume-control\">\r\n  <button mat-icon-button (click)=\"toggleMuted()\">\r\n    <mat-icon *ngIf=\"muted || volume === 0\">volume_off</mat-icon>\r\n    <mat-icon *ngIf=\"!muted && volume > 0 && volume < 0.25\">volume_mute</mat-icon>\r\n    <mat-icon *ngIf=\"!muted && volume >= 0.25 && volume < 0.5\">volume_down</mat-icon>\r\n    <mat-icon *ngIf=\"!muted && volume >= 0.5\">volume_up</mat-icon>\r\n  </button>\r\n  <mat-slider class=\"volume-slider\" [color]=\"color\" min=\"0\" max=\"1\" step=\"0.01\" value=\"1\" (input)=\"setVolume($event.value)\">\r\n  </mat-slider>\r\n</div>",
        styles: [".volume-control{display:inline}.volume-slider{margin-left:-15px}::ng-deep.mat-slider-thumb{border-color:transparent!important}::ng-deep.mat-slider-track-background{background-color:#d3d3d3!important;-webkit-transform:translateX(0)!important;transform:translateX(0)!important}.volume-control .volume-slider{visibility:hidden;opacity:0;min-width:0;width:0;transition:visibility .2s,opacity .2s linear,width .2s linear}.volume-control:hover .volume-slider{visibility:visible;opacity:1;min-width:90px;width:90px;transition:opacity .2s linear,width .2s linear,min-width .2s linear}"]
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [EventService])
], MatVolumeControlComponent);

let MatVideoModule = class MatVideoModule {
};
MatVideoModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            SecondsToTimePipe,
            MatVideoComponent,
            MatSliderProgressBarComponent,
            MatPlayButtonComponent,
            MatVolumeControlComponent,
            MatDownloadButtonComponent,
            MatFullscreenButtonComponent,
            MatTimeControlComponent,
            MatQualityControlComponent,
            MatVideoSpinnerComponent,
            MatSeekProgressControlComponent,
            MatVideoSourceDirective,
            MatVideoTrackDirective,
            MatFrameByFrameControlComponent
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"],
            _angular_material_slider__WEBPACK_IMPORTED_MODULE_5__["MatSliderModule"],
        ],
        exports: [
            MatVideoComponent,
            MatVideoSourceDirective,
            MatVideoTrackDirective
        ],
        providers: [
            FullscreenService,
            EventService
        ]
    })
], MatVideoModule);

/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=mat-video.js.map


/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/properties/map/map.component.html":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/properties/map/map.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <!-- <agm-map [zoom]=\"12\" [latitude]=\"lat\" [longitude]=\"lng\" (boundsChange)=\"doSomething2($event)\">\r\n        <agm-overlay *ngFor=\"let almacen of almacenes;let i=index\" [latitude]=\"almacen.latitudInstalacion\"\r\n            [longitude]=\"almacen.longitudInstalacion\">\r\n            <div class=\"block\">\r\n                <strong style=\"color:white;\">{{almacen.idInstalacion}}</strong>\r\n            </div>\r\n            <agm-info-window>Info Window {{i}}</agm-info-window>\r\n        </agm-overlay>\r\n    </agm-map> -->\r\n    <agm-map [(zoom)]=\"zoom\" [latitude]=\"lat\" (mapReady)=\"doSomething($event)\" (boundsChange)=\"doSomething2($event)\"\r\n        [longitude]=\"lng\">\r\n        <agm-marker *ngFor=\"let almacen of almacenes\"\r\n            (markerClick)=\"openWindow(almacen.idInstalacion)\"\r\n            [latitude]=\"almacen.latitudInstalacion\" [longitude]=\"almacen.longitudInstalacion\">\r\n            <div class=\"block\">\r\n                <strong style=\"color:white;\">{{almacen.idInstalacion}}</strong>\r\n            </div>\r\n            <agm-info-window style=\"max-width: 600px\" class=\"infoWindow\" [maxWidth]=\"300\"\r\n                [isOpen]=\"isInfoWindowOpen(almacen.idInstalacion)\" [disableAutoPan]=\"true\"\r\n                [zIndex]=\"almacen.idInstalacion\" [latitude]=\"almacen.latitudInstalacion\"\r\n                [longitude]=\"almacen.longitudInstalacion\">\r\n                <div class=\"card infoWindow\">\r\n                    <img src=\"https://source.unsplash.com/1600x900/?storage\" class=\"card-img-top\" alt=\"...\">\r\n                    <div class=\"card-body text-center\">\r\n                        <h3 class=\"card-title\">{{almacen.nombreInstalacion}}</h3>\r\n                        <div>\r\n                            <h5>\r\n                                <i class=\"fa fa-map-marker\"></i> {{almacen.direccionInstalacion}}\r\n                            </h5>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </agm-info-window>\r\n        </agm-marker>\r\n    </agm-map>\r\n    <button mat-raised-button (click)=\"enable()\" [(color)]=\"color\" id=\"scrollEnabling\" [ngClass]=\"{'enabled': search}\"\r\n        title=\"Enable or disable scrolling on map\">Buscar mientras navega</button>\r\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/properties/properties.component.html":
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/properties/properties.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"mapa\" [ngClass]=\"{'show': showable}\">\r\n    <button mat-raised-button (click)=\"mapa()\" color=\"accent\" id=\"regresar\" [ngClass]=\"{'block': showable}\"\r\n        title=\"regresar\">Regresar</button>\r\n    <app-map></app-map>\r\n</div>\r\n<app-header-image [backgroundImage]=\"'assets/images/carousel/slide-3.jpg'\" [bgImageAnimate]=\"false\"\r\n    [contentOffsetToTop]=\"false\" [desc]=\"'“Home is where one starts from...” –T.S. Eliot'\" [contentMinHeight]=\"200\">\r\n</app-header-image>\r\n\r\n<div class=\"px-3\">\r\n    <div class=\"theme-container\">\r\n        <mat-sidenav-container class=\"all-properties mt-3\">\r\n            <mat-sidenav #sidenav [autoFocus]=\"false\" [opened]=\"sidenavOpen\" [mode]=\"sidenavOpen ? 'side' : 'over'\"\r\n                class=\"search-sidenav\">\r\n                <button mat-raised-button color=\"primary\" (click)='mapa()'>Ver mapa</button>\r\n                <mat-card [perfectScrollbar]=\"psConfig\">\r\n                    <button fxHide=\"false\" fxHide.gt-xs mat-icon-button (click)=\"sidenav.toggle()\">\r\n                        <mat-icon color=\"accent\">close</mat-icon>\r\n                    </button>\r\n                    <app-properties-search [variant]=\"settings.searchPanelVariant\" [vertical]=\"true\"\r\n                        [searchOnBtnClick]=\"settings.searchOnBtnClick\" [removedSearchField]=\"removedSearchField\"\r\n                        (onSearchChange)=\"searchChanged($event)\" (onSearchClick)=\"searchClicked()\">\r\n                    </app-properties-search>\r\n                </mat-card>\r\n            </mat-sidenav>\r\n\r\n            <mat-sidenav-content ngClass.gt-sm=\"distance\">\r\n\r\n                <div fxLayout=\"row wrap\" class=\"properties-wrapper mt-0\">\r\n\r\n                    <div fxFlex=\"100\" class=\"px-2 pb-2 pt-0\">\r\n                        <app-properties-toolbar [showSidenavToggle]=\"!sidenavOpen\" (onSidenavToggle)=\"sidenav.toggle()\"\r\n                            (onChangeCount)=\"changeCount($event)\" (onChangeSorting)=\"changeSorting($event)\"\r\n                            (onChangeViewType)=\"changeViewType($event)\">\r\n                        </app-properties-toolbar>\r\n                    </div>\r\n\r\n                    <div fxFlex=\"100\" fxLayoutAlign=\"start start\" class=\"p-2\">\r\n                        <mat-chip-list [ngClass]=\"(settings.rtl) ? 'ml-2' : 'mr-2'\">\r\n                            <mat-chip selected disableRipple=\"true\" color=\"warn\" class=\"uppercase ws-nowrap\">\r\n                                {{ pagination?.total }} found\r\n                            </mat-chip>\r\n                        </mat-chip-list>\r\n                        <app-properties-search-results-filters [searchFields]=\"searchFields\"\r\n                            (onRemoveSearchField)=\"removeSearchField($event)\">\r\n                        </app-properties-search-results-filters>\r\n                    </div>\r\n\r\n                    <!-- <div *ngFor=\"let property of properties\" [fxFlex]=\"(viewType=='grid') ? viewCol : 100\" class=\"item\">\r\n                        <app-property-item [property]=\"property\" [viewType]=\"viewType\" [viewColChanged]=\"viewCol\"\r\n                            [fullWidthPage]=\"false\"></app-property-item>\r\n                    </div> -->\r\n                    <div *ngFor=\"let almacen of almacenes\" [fxFlex]=\"(viewType=='grid') ? viewCol : 100\" class=\"item\">\r\n                        <app-almacen-item [almacen]=\"almacen\" [viewType]=\"viewType\" [viewColChanged]=\"viewCol\"\r\n                            [fullWidthPage]=\"false\"></app-almacen-item>\r\n                    </div>\r\n\r\n                    <div *ngIf=\"properties?.length == 0\" fxFlex=\"100\" fxLayoutAlign=\"center center\"\r\n                        [style.min-height.px]=\"200\">\r\n                        <mat-spinner *ngIf=\"!message\"></mat-spinner>\r\n                        <mat-chip-list *ngIf=\"message\">\r\n                            <mat-chip selected disableRipple=\"true\" color=\"warn\" class=\"uppercase ws-nowrap\">\r\n                                {{message}}\r\n                            </mat-chip>\r\n                        </mat-chip-list>\r\n                    </div>\r\n\r\n                    <div *ngIf=\"properties?.length > 0\" fxFlex=\"100\" fxLayoutAlign=\"center center\" class=\"p-2\">\r\n                        <mat-paginator [length]=\"pagination?.total\" [pageSize]=\"pagination?.perPage\"\r\n                            (page)=\"onPageChange($event)\" class=\"w-100 mat-elevation-z1\">\r\n                        </mat-paginator>\r\n                    </div>\r\n\r\n                </div>\r\n\r\n\r\n\r\n            </mat-sidenav-content>\r\n        </mat-sidenav-container>\r\n\r\n    </div>\r\n\r\n</div>\r\n\r\n\r\n\r\n<app-clients></app-clients>\r\n\r\n<app-get-in-touch></app-get-in-touch>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/properties/property/property.component.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/properties/property/property.component.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"px-3\">     \r\n    <div class=\"theme-container\"> \r\n    \r\n        <mat-sidenav-container class=\"single-property mt-3\">\r\n            <mat-sidenav #sidenav [opened]=\"sidenavOpen\" [mode]=\"sidenavOpen ? 'side' : 'over'\" position=\"end\" autoFocus=\"false\" (openedChange)=\"onOpenedChange()\">\r\n                <button fxHide=\"false\" fxHide.gt-sm=\"true\" mat-mini-fab color=\"warn\" class=\"close\" (click)=\"sidenav.close()\">\r\n                    <mat-icon>close</mat-icon>\r\n                </button>\r\n                <mat-card [perfectScrollbar]=\"psConfig\"> \r\n\r\n                    <div class=\"widget\"> \r\n                        <mat-card *ngIf=\"agent\">\r\n                            <img mat-card-image [src]=\"agent.image\" [alt]=\"agent.fullName\"> \r\n                            <mat-card-content>\r\n                                <h2 class=\"fw-600\">Agent {{agent.fullName}}</h2>\r\n                                <app-rating [ratingsCount]=\"agent.ratingsCount\" [ratingsValue]=\"agent.ratingsValue\"></app-rating>\r\n                                <p class=\"mt-3\">{{agent.desc}}</p>                                    \r\n                                <p fxLayoutAlign=\"start center\"><mat-icon color=\"primary\" matTooltip=\"Organization\" matTooltipPosition=\"above\">business</mat-icon><span class=\"mx-2\">{{agent.organization}}</span></p>\r\n                                <p fxLayoutAlign=\"start center\"><mat-icon color=\"primary\">email</mat-icon><span class=\"mx-2\">{{agent.email}}</span></p>\r\n                                <p fxLayoutAlign=\"start center\"><mat-icon color=\"primary\">call</mat-icon><span class=\"mx-2\">{{agent.phone}}</span></p>\r\n                            </mat-card-content>\r\n                            <mat-divider></mat-divider>\r\n                            <mat-card-actions fxLayoutAlign=\"space-between center\">\r\n                                <div fxLayout=\"row\" fxLayoutAlign=\"start center\" class=\"text-muted\">\r\n                                    <a [href]=\"'https://www.facebook.com/'+agent.social.facebook\" target=\"blank\" class=\"social-icon\">\r\n                                        <svg class=\"mat-icon\" viewBox=\"0 0 24 24\">\r\n                                        <path d=\"M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M18,5H15.5A3.5,3.5 0 0,0 12,8.5V11H10V14H12V21H15V14H18V11H15V9A1,1 0 0,1 16,8H18V5Z\" />\r\n                                        </svg>\r\n                                    </a>\r\n                                    <a [href]=\"'https://twitter.com/'+agent.social.twitter\" target=\"blank\" class=\"social-icon\">\r\n                                        <svg class=\"mat-icon\" viewBox=\"0 0 24 24\">\r\n                                            <path d=\"M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M17.71,9.33C18.19,8.93 18.75,8.45 19,7.92C18.59,8.13 18.1,8.26 17.56,8.33C18.06,7.97 18.47,7.5 18.68,6.86C18.16,7.14 17.63,7.38 16.97,7.5C15.42,5.63 11.71,7.15 12.37,9.95C9.76,9.79 8.17,8.61 6.85,7.16C6.1,8.38 6.75,10.23 7.64,10.74C7.18,10.71 6.83,10.57 6.5,10.41C6.54,11.95 7.39,12.69 8.58,13.09C8.22,13.16 7.82,13.18 7.44,13.12C7.81,14.19 8.58,14.86 9.9,15C9,15.76 7.34,16.29 6,16.08C7.15,16.81 8.46,17.39 10.28,17.31C14.69,17.11 17.64,13.95 17.71,9.33Z\" />\r\n                                        </svg> \r\n                                    </a>\r\n                                    <a [href]=\"'https://www.linkedin.com/'+agent.social.linkedin\" target=\"blank\" class=\"social-icon\"> \r\n                                        <svg class=\"mat-icon\" viewBox=\"0 0 24 24\">\r\n                                        <path d=\"M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.46 12.92,11.24V10.13H10.13V18.5H12.92V13.57C12.92,12.8 13.54,12.17 14.31,12.17A1.4,1.4 0 0,1 15.71,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,5.95 7.81,5.19 6.88,5.19A1.69,1.69 0 0,0 5.19,6.88C5.19,7.81 5.95,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z\" />\r\n                                        </svg>\r\n                                    </a>\r\n                                    <a [href]=\"'https://instagram.com/'+agent.social.instagram\" target=\"blank\" class=\"social-icon\"> \r\n                                        <svg class=\"mat-icon\" viewBox=\"0 0 24 24\">\r\n                                            <path d=\"M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z\" />\r\n                                        </svg>\r\n                                    </a> \r\n                                    <a [href]=\"agent.social.website\" target=\"blank\" class=\"social-icon\"> \r\n                                        <svg class=\"mat-icon\" viewBox=\"0 0 24 24\">\r\n                                            <path d=\"M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z\" />\r\n                                        </svg>\r\n                                    </a>  \r\n                                </div>\r\n                                <div>\r\n                                    <a [routerLink]=\"['/agents', agent.id]\" mat-button color=\"primary\" class=\"uppercase\">View Profile</a>\r\n                                </div> \r\n                            </mat-card-actions>                              \r\n                        </mat-card>\r\n                    </div> \r\n                    \r\n                    <div class=\"widget\">\r\n                        <h3 class=\"widget-title bg-primary\">Reply to the listing</h3>\r\n                        <form [formGroup]=\"contactForm\" (ngSubmit)=\"onContactFormSubmit(contactForm.value)\">\r\n                            <p>Interested in renting or buying this property? Then send us an email.</p>\r\n                            <mat-form-field appearance=\"outline\" class=\"w-100\">\r\n                                <mat-label>Name</mat-label>\r\n                                <input matInput placeholder=\"Your Name\" autocomplete=\"off\" formControlName=\"name\">\r\n                                <mat-error *ngIf=\"contactForm.controls.name.errors?.required\">Name is required</mat-error>                   \r\n                            </mat-form-field>\r\n\r\n                            <mat-form-field appearance=\"outline\" class=\"w-100\">\r\n                                <mat-label>E-mail</mat-label> \r\n                                <input matInput placeholder=\"Your Email\" autocomplete=\"off\" formControlName=\"email\">\r\n                                <mat-error *ngIf=\"contactForm.controls.email.errors?.required\">Email is required</mat-error>\r\n                                <mat-error *ngIf=\"contactForm.controls.email.hasError('invalidEmail')\">Invalid email address</mat-error>\r\n                            </mat-form-field>\r\n\r\n                            <mat-form-field appearance=\"outline\" class=\"w-100\">\r\n                                <mat-label>Phone</mat-label>\r\n                                <input matInput placeholder=\"Your Phone\" autocomplete=\"off\" formControlName=\"phone\" type=\"number\"> \r\n                                <mat-error *ngIf=\"contactForm.controls.phone.errors?.required\">Phone is required</mat-error>                 \r\n                            </mat-form-field>\r\n\r\n                            <mat-form-field appearance=\"outline\" class=\"w-100\">\r\n                                <mat-label>Message</mat-label> \r\n                                <textarea matInput placeholder=\"Your Message\" formControlName=\"message\" rows=\"6\"></textarea> \r\n                                <mat-error *ngIf=\"contactForm.controls.message.errors?.required\">Message is required</mat-error>\r\n                            </mat-form-field>  \r\n                            <div class=\"text-center\">\r\n                                <button mat-raised-button color=\"accent\" type=\"submit\">Send Email</button>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n                   \r\n                    <div class=\"widget\">\r\n                        <h3 class=\"widget-title bg-primary\">Mortgage Calculator</h3>\r\n                        <form [formGroup]=\"mortgageForm\" (ngSubmit)=\"onMortgageFormSubmit(mortgageForm.value)\">\r\n                            <mat-form-field appearance=\"outline\" class=\"w-100\">\r\n                                <mat-label>Principal Amount</mat-label>\r\n                                <input matInput placeholder=\"$\" autocomplete=\"off\" formControlName=\"principalAmount\" type=\"number\">                  \r\n                            </mat-form-field>\r\n                            <mat-form-field appearance=\"outline\" class=\"w-100\">\r\n                                <mat-label>Down Payment</mat-label>\r\n                                <input matInput placeholder=\"$\" autocomplete=\"off\" formControlName=\"downPayment\" type=\"number\">                  \r\n                            </mat-form-field>\r\n                            <mat-form-field appearance=\"outline\" class=\"w-100\">\r\n                                <mat-label>Interest Rate</mat-label>\r\n                                <input matInput placeholder=\"%\" autocomplete=\"off\" formControlName=\"interestRate\" type=\"number\">                  \r\n                            </mat-form-field>\r\n                            <mat-form-field appearance=\"outline\" class=\"w-100\">\r\n                                <mat-label>Period</mat-label>\r\n                                <input matInput placeholder=\"Number of Years\" autocomplete=\"off\" formControlName=\"period\" type=\"number\">                  \r\n                            </mat-form-field>\r\n                            <p *ngIf=\"monthlyPayment\">Monthly Payment: <span class=\"mx-2 fw-500\">${{monthlyPayment}}</span></p>\r\n                            <div class=\"text-center\">\r\n                                <button mat-raised-button color=\"accent\" type=\"submit\">Calculate Mortgage</button>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n\r\n                    <div fxLayout=\"column\" class=\"widget\">\r\n                        <h3 class=\"widget-title bg-primary\">Featured Properties</h3>\r\n                        <div *ngFor=\"let prop of featuredProperties\" class=\"mb-3\">\r\n                            <app-property-item [property]=\"prop\" [viewType]=\"'grid'\"></app-property-item> \r\n                        </div> \r\n                    </div>\r\n                   \r\n                </mat-card>\r\n            </mat-sidenav>\r\n            <mat-sidenav-content ngClass.gt-sm=\"distance\">\r\n                <mat-card fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"space-between center\">             \r\n                    <div>\r\n                        <h2 class=\"uppercase\" ngClass.xs=\"text-center\">{{property?.title}}</h2>\r\n                        <p fxLayout=\"row\" fxLayoutAlign.xs=\"center\" class=\"address mb-0\">\r\n                            <mat-icon class=\"text-muted\">location_on</mat-icon>\r\n                            <span>{{property?.formattedAddress}}</span>\r\n                        </p>\r\n                    </div>\r\n                    <div fxLayout=\"column\" fxLayoutAlign.xs=\"center center\" class=\"mx-3\">                      \r\n                        <h2 *ngIf=\"settings.currency == 'USD'\" class=\"primary-color price\">\r\n                            <span *ngIf=\"property?.priceDollar.sale\">{{property?.priceDollar.sale | currency : 'USD' : 'symbol' : '1.0'}}</span>\r\n                            <span *ngIf=\"property?.priceDollar.rent\">{{property?.priceDollar.rent | currency : 'USD' : 'symbol' : '1.0'}} /month</span>\r\n                        </h2>\r\n                        <h2 *ngIf=\"settings.currency == 'EUR'\" class=\"primary-color price\">\r\n                            <span *ngIf=\"property?.priceEuro.sale\">{{property?.priceEuro.sale | currency : 'EUR' : 'symbol' : '1.0'}}</span>\r\n                            <span *ngIf=\"property?.priceEuro.rent\">{{property?.priceEuro.rent | currency : 'EUR' : 'symbol' : '1.0'}} /month</span>\r\n                        </h2>\r\n                        <app-rating [ratingsCount]=\"property?.ratingsCount\" [ratingsValue]=\"property?.ratingsValue\"></app-rating> \r\n                    </div>\r\n                    <button *ngIf=\"!sidenavOpen\" mat-icon-button (click)=\"sidenav.toggle()\">\r\n                        <mat-icon>more_vert</mat-icon>\r\n                    </button>                                  \r\n                </mat-card>\r\n\r\n                <mat-card class=\"mt-3\">\r\n                    <div class=\"main-carousel mb-3\"> \r\n                        <div *ngIf=\"property\" class=\"control-icons\">\r\n                            <button mat-button [disabled]=\"onFavorites()\" (click)=\"addToFavorites()\" matTooltip=\"Add To Favorite\">\r\n                                <mat-icon class=\"\">favorite_border</mat-icon>\r\n                            </button>\r\n                            <button mat-button [disabled]=\"onCompare()\" (click)=\"addToCompare()\" matTooltip=\"Add To Compare\">\r\n                                <mat-icon class=\"\">compare_arrows</mat-icon>\r\n                            </button>  \r\n                        </div>   \r\n                        <div id=\"main-carousel\" class=\"swiper-container\" [swiper]=\"config\" (indexChange)=\"onIndexChange($event)\"> \r\n                            <div class=\"swiper-wrapper\">      \r\n                                <div *ngFor=\"let image of property?.gallery\" class=\"swiper-slide\">\r\n                                    <img [attr.data-src]=\"image.big\" class=\"swiper-lazy\">\r\n                                    <div class=\"swiper-lazy-preloader\"></div>          \r\n                                </div>\r\n                            </div>                      \r\n                            <button mat-mini-fab color=\"primary\" class=\"swiper-button-prev swipe-arrow\"><mat-icon>keyboard_arrow_left</mat-icon></button>\r\n                            <button mat-mini-fab color=\"primary\" class=\"swiper-button-next swipe-arrow\"><mat-icon>keyboard_arrow_right</mat-icon></button> \r\n                        </div>\r\n                    </div>\r\n                    <div class=\"small-carousel\">   \r\n                        <div id=\"small-carousel\" class=\"swiper-container\" [swiper]=\"config2\"> \r\n                            <div class=\"swiper-wrapper\">      \r\n                                <div *ngFor=\"let image of property?.gallery; let i=index;\" class=\"swiper-slide\" [ngClass]=\"'thumb-'+i\" [class.active-thumb]=\"i == 0\">\r\n                                    <img [attr.data-src]=\"image.small\" class=\"swiper-lazy mw-100\" (click)=\"selectImage(i)\">\r\n                                    <div class=\"swiper-lazy-preloader\"></div>          \r\n                                </div>\r\n                            </div>  \r\n                        </div>\r\n                    </div>\r\n                </mat-card> \r\n                \r\n                \r\n                <mat-card *ngIf=\"property\" class=\"mt-3\">\r\n                    <mat-card-header fxLayoutAlign=\"center center\"> \r\n                        <mat-card-title class=\"uppercase\">Details</mat-card-title> \r\n                    </mat-card-header>\r\n                    <div fxLayout=\"row wrap\" class=\"details\">\r\n                        <div fxFlex=\"100\" fxFlex.gt-xs=\"50\" fxLayout=\"row\" class=\"item\">\r\n                            <span>Property Type:</span>\r\n                            <span>{{property.propertyType}}</span>\r\n                        </div> \r\n                        <div fxFlex=\"100\" fxFlex.gt-xs=\"50\" fxLayout=\"row\" class=\"item\">\r\n                            <span>Property Status:</span>\r\n                            <div fxLayout=\"row wrap\" class=\"list\">\r\n                                <span *ngFor=\"let status of property.propertyStatus; let last=last\" [class.list-item]=\"property.propertyStatus.length > 1\" [class.last]=\"last\">{{status}}</span>\r\n                            </div>\r\n                        </div> \r\n                        <div fxFlex=\"100\" fxFlex.gt-xs=\"50\" fxLayout=\"row\" class=\"item\">\r\n                            <span>City:</span>\r\n                            <span>{{property.city}}</span>\r\n                        </div>\r\n                        <div fxFlex=\"100\" fxFlex.gt-xs=\"50\" fxLayout=\"row\" class=\"item\">\r\n                            <span>Zip Code:</span>\r\n                            <span>{{property.zipCode}}</span>\r\n                        </div> \r\n                        <div fxFlex=\"100\" fxFlex.gt-xs=\"50\" fxLayout=\"row\" class=\"item\">\r\n                            <span>Neighborhood:</span>\r\n                            <div fxLayout=\"row wrap\" class=\"list\">\r\n                                <span *ngFor=\"let neighborhood of property.neighborhood; let last=last\" [class.list-item]=\"property.neighborhood.length > 1\" [class.last]=\"last\">{{neighborhood}}</span>\r\n                            </div>\r\n                        </div>\r\n                        <div fxFlex=\"100\" fxFlex.gt-xs=\"50\" fxLayout=\"row\" class=\"item\">\r\n                            <span>Street:</span>\r\n                            <div fxLayout=\"row wrap\" class=\"list\">\r\n                                <span *ngFor=\"let street of property.street; let last=last\" [class.list-item]=\"property.street.length > 1\" [class.last]=\"last\">{{street}}</span>\r\n                            </div>\r\n                        </div>\r\n                        <div fxFlex=\"100\" fxFlex.gt-xs=\"50\" fxLayout=\"row\" class=\"item\">\r\n                            <span>Bedrooms:</span>\r\n                            <span>{{property.bedrooms}}</span>\r\n                        </div>\r\n                        <div fxFlex=\"100\" fxFlex.gt-xs=\"50\" fxLayout=\"row\" class=\"item\">\r\n                            <span>Bathrooms:</span>\r\n                            <span>{{property.bathrooms}}</span>\r\n                        </div>\r\n                        <div fxFlex=\"100\" fxFlex.gt-xs=\"50\" fxLayout=\"row\" class=\"item\">\r\n                            <span>Garages:</span>\r\n                            <span>{{property.garages}}</span>\r\n                        </div>\r\n                        <div fxFlex=\"100\" fxFlex.gt-xs=\"50\" fxLayout=\"row\" class=\"item\">\r\n                            <span>Property size:</span>\r\n                            <span>{{property.area.value}} {{property.area.unit}}</span>\r\n                        </div>\r\n                        <div fxFlex=\"100\" fxFlex.gt-xs=\"50\" fxLayout=\"row\" class=\"item\">\r\n                            <span>Year Built:</span>\r\n                            <span>{{property.yearBuilt}}</span>\r\n                        </div>\r\n                    </div>   \r\n                </mat-card>\r\n\r\n                <mat-card class=\"mt-3\"> \r\n                    <mat-card-header fxLayoutAlign=\"center center\"> \r\n                        <mat-card-title class=\"uppercase\">Features</mat-card-title> \r\n                    </mat-card-header>\r\n                    <mat-card-content>\r\n                        <div fxLayout=\"row wrap\">\r\n                            <div *ngFor=\"let feature of property?.features\" fxFlex=\"100\" fxFlex.gt-xs=\"33.3\">\r\n                                <mat-icon class=\"mat-icon-sm\" color=\"primary\">check</mat-icon>\r\n                                <span class=\"mx-2\">{{feature}}</span>\r\n                            </div>\r\n                        </div>\r\n                    </mat-card-content>\r\n                </mat-card>\r\n\r\n                <mat-card class=\"mt-3\"> \r\n                    <mat-card-header fxLayoutAlign=\"center center\"> \r\n                        <mat-card-title class=\"uppercase\">Additional features</mat-card-title> \r\n                    </mat-card-header>\r\n                    <mat-card-content>\r\n                        <div fxLayout=\"row wrap\" class=\"details\">\r\n                            <div *ngFor=\"let feature of property?.additionalFeatures\" fxFlex=\"100\" fxFlex.gt-xs=\"50\" class=\"item\">\r\n                                <span>{{feature.name}}:</span>\r\n                                <span>{{feature.value}}</span>\r\n                            </div>\r\n                        </div>\r\n                    </mat-card-content>\r\n                </mat-card>\r\n\r\n                <mat-card class=\"mt-3\"> \r\n                    <mat-card-header fxLayoutAlign=\"center center\"> \r\n                        <mat-card-title class=\"uppercase\">Description</mat-card-title> \r\n                    </mat-card-header>\r\n                    <mat-card-content>\r\n                        <p>{{property?.desc}}</p>\r\n                        <p>{{property?.desc}}</p>\r\n                        <p>{{property?.desc}}</p>\r\n                    </mat-card-content>\r\n                </mat-card> \r\n\r\n                <mat-card class=\"mt-3\"> \r\n                    <mat-card-header fxLayoutAlign=\"center center\"> \r\n                        <mat-card-title class=\"uppercase\">Location</mat-card-title> \r\n                    </mat-card-header>\r\n                    <mat-card-content>\r\n                        <agm-map [latitude]=\"property?.location.lat\" [longitude]=\"property?.location.lng\" [mapTypeControl]=\"true\" [fullscreenControl]=\"true\">\r\n                            <agm-marker [latitude]=\"property?.location.lat\" [longitude]=\"property?.location.lng\" [markerDraggable]=\"false\"></agm-marker>\r\n                        </agm-map>\r\n                    </mat-card-content>                   \r\n                </mat-card>\r\n\r\n                <mat-card class=\"mt-3\"> \r\n                    <mat-card-header fxLayoutAlign=\"center center\"> \r\n                        <mat-card-title class=\"uppercase\">Plans</mat-card-title> \r\n                    </mat-card-header>\r\n                    <mat-card-content>\r\n                        <mat-accordion>\r\n                            <mat-expansion-panel *ngFor=\"let plan of property?.plans; let i = index;\" [expanded]=\"i === 0\">\r\n                                <mat-expansion-panel-header>  \r\n                                    <mat-panel-title fxLayout=\"row\" fxLayoutAlign=\"space-between\">\r\n                                        <div class=\"fw-500\">{{plan.name}}</div>\r\n                                        <div fxShow=\"false\" fxShow.gt-xs=\"true\" class=\"text-muted\">\r\n                                            <span>Area: <span class=\"fw-500\">{{plan.area.value}} {{plan.area.unit}}</span></span>\r\n                                            <span class=\"mx-3\">Rooms: <span class=\"fw-500\">{{plan.rooms}}</span></span>\r\n                                            <span>Baths: <span class=\"fw-500\">{{plan.baths}}</span></span>   \r\n                                        </div>\r\n                                    </mat-panel-title> \r\n                                </mat-expansion-panel-header>                                  \r\n                                <img [src]=\"plan.image\" [alt]=\"plan.name\" class=\"mw-100\">\r\n                                <p>{{plan.desc}}</p>\r\n                            </mat-expansion-panel> \r\n                        </mat-accordion>                         \r\n                    </mat-card-content>\r\n                </mat-card> \r\n\r\n                <mat-card *ngIf=\"property\" class=\"mt-3\"> \r\n                    <mat-card-header fxLayoutAlign=\"center center\"> \r\n                        <mat-card-title class=\"uppercase\">Videos</mat-card-title> \r\n                    </mat-card-header>\r\n                    <mat-card-content>\r\n                        <mat-video [src]=\"property.videos[0].link\" [title]=\"property.videos[0].name\" [download]=\"true\" [keyboard]=\"false\"></mat-video>\r\n                        <div class=\"mt-5\">\r\n                            <h3 class=\"text-center fw-500\">{{property.videos[1].name}}</h3>\r\n                            <div [innerHtml]=\"embedVideo\" class=\"videoWrapper\"></div>                                    \r\n                        </div>                             \r\n                    </mat-card-content>\r\n                </mat-card>                \r\n\r\n                <mat-card class=\"mt-3\" fxLayout=\"row wrap\" fxLayoutAlign=\"space-between center\"> \r\n                    <span>ID:<span class=\"fw-500 mx-2\">{{property?.id}}</span></span>\r\n                    <span>Published:<span class=\"fw-500 mx-2\">{{property?.published | date:\"dd MMMM, yyyy\"}}</span></span>\r\n                    <span>Last Update:<span class=\"fw-500 mx-2\">{{property?.lastUpdate | date:\"dd MMMM, yyyy\"}}</span></span>\r\n                    <span>Views:<span class=\"fw-500 mx-2\">{{property?.views}}</span></span> \r\n                </mat-card>\r\n\r\n                <app-comments *ngIf=\"property\" [propertyId]=\"property.id\"></app-comments>  \r\n\r\n            </mat-sidenav-content>\r\n        </mat-sidenav-container>\r\n\r\n    </div>\r\n</div>\r\n \r\n<div class=\"section mt-3\">\r\n    <div class=\"px-3\">\r\n        <div class=\"theme-container\"> \r\n            <h1 class=\"section-title\">Related properties</h1>            \r\n            <app-properties-carousel [properties]=\"relatedProperties\"></app-properties-carousel>                        \r\n        </div>\r\n    </div>   \r\n</div> \r\n\r\n<app-get-in-touch></app-get-in-touch>"

/***/ }),

/***/ "./src/app/pages/properties/map/map.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/pages/properties/map/map.component.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "agm-map {\n  height: 100vh;\n  width: 100%;\n}\n\n.block {\n  justify-content: center;\n  align-items: center;\n  display: flex;\n  width: 50px;\n  height: 50px;\n  background-color: blue;\n}\n\n#scrollEnabling {\n  position: absolute;\n  top: 20px;\n  right: 20px;\n  z-index: 999;\n  font-size: 13px;\n  line-height: 36px;\n}\n\n.fixed {\n  position: fixed;\n  height: 100%;\n  width: 100%;\n  z-index: 9999;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvcHJvcGVydGllcy9tYXAvQzpcXFVzZXJzXFx1c2VyXFxEb2N1bWVudHNcXGdpdGh1YlxcYWxtYWNlbmVzLWFuZ3VsYXIvc3JjXFxhcHBcXHBhZ2VzXFxwcm9wZXJ0aWVzXFxtYXBcXG1hcC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvcGFnZXMvcHJvcGVydGllcy9tYXAvbWFwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtFQUNBLFdBQUE7QUNDSjs7QURDQTtFQUNJLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxzQkFBQTtBQ0VKOztBREFBO0VBQ0ksa0JBQUE7RUFDQSxTQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUNHSjs7QUREQTtFQUNJLGVBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGFBQUE7QUNJSiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3Byb3BlcnRpZXMvbWFwL21hcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImFnbS1tYXAge1xyXG4gICAgaGVpZ2h0OiAxMDB2aDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcbi5ibG9jayB7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6Y2VudGVyO1xyXG4gICAgZGlzcGxheTpmbGV4O1xyXG4gICAgd2lkdGg6NTBweDtcclxuICAgIGhlaWdodDo1MHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjpibHVlO1xyXG59XHJcbiNzY3JvbGxFbmFibGluZ3tcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMjBweDtcclxuICAgIHJpZ2h0OiAyMHB4O1xyXG4gICAgei1pbmRleDogOTk5O1xyXG4gICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgbGluZS1oZWlnaHQ6IDM2cHg7XHJcbn1cclxuLmZpeGVke1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgd2lkdGg6MTAwJTtcclxuICAgIHotaW5kZXg6IDk5OTk7XHJcbn0iLCJhZ20tbWFwIHtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5ibG9jayB7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBkaXNwbGF5OiBmbGV4O1xuICB3aWR0aDogNTBweDtcbiAgaGVpZ2h0OiA1MHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xufVxuXG4jc2Nyb2xsRW5hYmxpbmcge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMjBweDtcbiAgcmlnaHQ6IDIwcHg7XG4gIHotaW5kZXg6IDk5OTtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBsaW5lLWhlaWdodDogMzZweDtcbn1cblxuLmZpeGVkIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICB6LWluZGV4OiA5OTk5O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/pages/properties/map/map.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/pages/properties/map/map.component.ts ***!
  \*******************************************************/
/*! exports provided: MapComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapComponent", function() { return MapComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_mapa_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/mapa.service */ "./src/app/mapa.service.ts");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../global */ "./src/global.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let MapComponent = class MapComponent {
    constructor(mapaService) {
        this.mapaService = mapaService;
        this.zoom = 13;
        this.search = false;
        this.conexion = _global__WEBPACK_IMPORTED_MODULE_2__["conexion"];
        this.distance = 2.5;
        this.i = 0;
        this.almacenes = [];
        this.openedWindow = 0;
        this.color = 'secondary';
        var location = this.mapaService.getUnaVez();
        this.recenterMap(location.lat, location.lng);
        this.mapaService.getLatLng().subscribe(respuesta => {
            this.lat = respuesta.lat;
            this.lng = respuesta.lng;
        });
    }
    doSomething(e) {
        console.log(e);
    }
    doSomething2(e) {
        if (this.zoom >= 13) {
            this.resta = 0.015;
        }
        else {
            this.resta = 0;
        }
        if (this.i == 0) {
            this.busqueda(e);
            this.i++;
        }
        if (this.search) {
            this.busqueda(e);
        }
    }
    busqueda(e) {
        this.minLng = e.ka.g + this.resta;
        this.maxLng = e.ka.h - this.resta;
        this.minLat = e.oa.g + this.resta;
        this.maxLat = e.oa.h - this.resta;
        // console.log('maxLat=> ' + this.maxLat)
        // console.log('minLat=> ' + this.minLat)
        // console.log('maxLng=> ' + this.maxLng)
        // console.log('minLng=> ' + this.minLng)
        fetch(`${this.conexion}/api/instalaciones/bounds/${this.maxLng}/${this.minLng}/${this.maxLat}/${this.minLat}`)
            .then(response => {
            return response.json();
        }).then(respuesta => {
            console.log(respuesta);
            this.almacenes = [];
            this.almacenes = respuesta.content;
            this.mapaService.setProperties(respuesta.content);
        });
    }
    openWindow(id) {
        let l = this.almacenes.find(almacen => almacen.idInstalacion == id);
        // console.log(l)
        this.lat = +l.latitudInstalacion + 0.038;
        this.lng = +l.longitudInstalacion;
        this.openedWindow = id;
    }
    isInfoWindowOpen(id) {
        return this.openedWindow == id;
    }
    ngOnInit() {
    }
    recenterMap(lat, lng) {
        this.lat = lat;
        this.lng = lng;
        // console.log(lat, lng)
    }
    updateMapCenter() {
        this.lat = this.map.center.lat(),
            this.lng = this.map.center.lng();
        this.mapaService.setLatLng(this.map.center.lat(), this.map.center.lng());
        if (this.search == true) {
            fetch(`${this.conexion}/api/instalaciones/${this.lat}/${this.lng}/${this.distance}`).then(response => {
                return response.json();
            }).then(almacenes => { });
        }
    }
    enable() {
        if (this.search == false) {
            this.search = true;
            this.color = 'primary';
        }
        else {
            this.search = false;
            this.color = 'secondary';
        }
        console.log(this.search);
    }
};
MapComponent.ctorParameters = () => [
    { type: src_app_mapa_service__WEBPACK_IMPORTED_MODULE_1__["MapaService"] }
];
MapComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-map',
        template: __webpack_require__(/*! raw-loader!./map.component.html */ "./node_modules/raw-loader/index.js!./src/app/pages/properties/map/map.component.html"),
        styles: [__webpack_require__(/*! ./map.component.scss */ "./src/app/pages/properties/map/map.component.scss")]
    }),
    __metadata("design:paramtypes", [src_app_mapa_service__WEBPACK_IMPORTED_MODULE_1__["MapaService"]])
], MapComponent);



/***/ }),

/***/ "./src/app/pages/properties/properties.component.scss":
/*!************************************************************!*\
  !*** ./src/app/pages/properties/properties.component.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#mapa {\n  position: fixed;\n  height: 100%;\n  width: 100%;\n  z-index: 9999;\n  top: 100%;\n}\n\n#mapa.show {\n  top: 0%;\n}\n\n#regresar {\n  display: none;\n  position: fixed;\n  top: 20px;\n  left: 20px;\n  z-index: 99999;\n  font-size: 13px;\n  line-height: 36px;\n}\n\n#regresar.block {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvcHJvcGVydGllcy9DOlxcVXNlcnNcXHVzZXJcXERvY3VtZW50c1xcZ2l0aHViXFxhbG1hY2VuZXMtYW5ndWxhci9zcmNcXGFwcFxccGFnZXNcXHByb3BlcnRpZXNcXHByb3BlcnRpZXMuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3BhZ2VzL3Byb3BlcnRpZXMvcHJvcGVydGllcy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGVBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGFBQUE7RUFDQSxTQUFBO0FDQ0o7O0FER0E7RUFDSSxPQUFBO0FDQUo7O0FERUE7RUFDSSxhQUFBO0VBQ0EsZUFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtBQ0NKOztBRENBO0VBQ0ksY0FBQTtBQ0VKIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvcHJvcGVydGllcy9wcm9wZXJ0aWVzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI21hcGF7XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICB3aWR0aDoxMDAlO1xyXG4gICAgei1pbmRleDogOTk5OTtcclxuICAgIHRvcDogMTAwJVxyXG4gICAgLy8gdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEwMCUpO1xyXG4gICAgLy8gdHJhbnNpdGlvbjogMnM7XHJcbn1cclxuI21hcGEuc2hvd3tcclxuICAgIHRvcDowJVxyXG59XHJcbiNyZWdyZXNhcntcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICB0b3A6IDIwcHg7XHJcbiAgICBsZWZ0OiAyMHB4O1xyXG4gICAgei1pbmRleDogOTk5OTk7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICBsaW5lLWhlaWdodDogMzZweDtcclxufVxyXG4jcmVncmVzYXIuYmxvY2t7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxufSIsIiNtYXBhIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICB6LWluZGV4OiA5OTk5O1xuICB0b3A6IDEwMCU7XG59XG5cbiNtYXBhLnNob3cge1xuICB0b3A6IDAlO1xufVxuXG4jcmVncmVzYXIge1xuICBkaXNwbGF5OiBub25lO1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMjBweDtcbiAgbGVmdDogMjBweDtcbiAgei1pbmRleDogOTk5OTk7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgbGluZS1oZWlnaHQ6IDM2cHg7XG59XG5cbiNyZWdyZXNhci5ibG9jayB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/pages/properties/properties.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/pages/properties/properties.component.ts ***!
  \**********************************************************/
/*! exports provided: PropertiesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertiesComponent", function() { return PropertiesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm2015/flex-layout.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _app_settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../app.settings */ "./src/app/app.settings.ts");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../app.service */ "./src/app/app.service.ts");
/* harmony import */ var _app_models__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../app.models */ "./src/app/app.models.ts");
/* harmony import */ var src_app_mapa_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/mapa.service */ "./src/app/mapa.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








let PropertiesComponent = class PropertiesComponent {
    constructor(appSettings, appService, mediaObserver, mapaService) {
        this.appSettings = appSettings;
        this.appService = appService;
        this.mediaObserver = mediaObserver;
        this.mapaService = mapaService;
        this.showable = false;
        this.sidenavOpen = true;
        this.psConfig = {
            wheelPropagation: true
        };
        this.viewType = 'grid';
        this.viewCol = 33.3;
        this.count = 12;
        this.pagination = new _app_models__WEBPACK_IMPORTED_MODULE_6__["Pagination"](1, this.count, null, 2, 0, 0);
        this.settings = this.appSettings.settings;
        this.watcher = mediaObserver.media$.subscribe((change) => {
            if (change.mqAlias == 'xs') {
                this.sidenavOpen = false;
                this.viewCol = 100;
            }
            else if (change.mqAlias == 'sm') {
                this.sidenavOpen = false;
                this.viewCol = 50;
            }
            else if (change.mqAlias == 'md') {
                this.viewCol = 50;
                this.sidenavOpen = true;
            }
            else {
                this.viewCol = 33.3;
                this.sidenavOpen = true;
            }
        });
    }
    mapa() {
        if (this.showable == false) {
            this.showable = true;
        }
        else {
            this.showable = false;
        }
    }
    ngOnInit() {
        this.getProperties();
    }
    ngOnDestroy() {
        this.watcher.unsubscribe();
    }
    getProperties() {
        // this.appService.getProperties().subscribe(data => {
        //   let result = this.filterData(data);
        //   if (result.data.length == 0) {
        //     this.properties.length = 0;
        //     this.pagination = new Pagination(1, this.count, null, 2, 0, 0);
        //     this.message = 'No Results Found';
        //     return false;
        //   }
        //   this.properties = result.data;
        //   this.pagination = result.pagination;
        //   this.message = null;
        //   // console.log(this.properties)
        // })
        this.mapaService.getPropeties().subscribe(data => {
            let result = this.filterData(data);
            console.log(result);
            if (result.data.length == 0) {
                this.almacenes.length = 0;
                this.pagination = new _app_models__WEBPACK_IMPORTED_MODULE_6__["Pagination"](1, this.count, null, 2, 0, 0);
                this.message = 'No Results Found';
                return false;
            }
            // console.log(result.data)
            this.almacenes = [];
            this.almacenes = result.data;
            this.pagination = result.pagination;
            this.message = null;
            console.log(this.almacenes);
        });
    }
    resetPagination() {
        if (this.paginator) {
            this.paginator.pageIndex = 0;
        }
        this.pagination = new _app_models__WEBPACK_IMPORTED_MODULE_6__["Pagination"](1, this.count, null, null, this.pagination.total, this.pagination.totalPages);
    }
    filterData(data) {
        return this.appService.filterData(data, this.searchFields, this.sort, this.pagination.page, this.pagination.perPage);
    }
    searchClicked() {
        this.properties.length = 0;
        this.getProperties();
        window.scrollTo(0, 0);
    }
    searchChanged(event) {
        event.valueChanges.subscribe(() => {
            this.resetPagination();
            this.searchFields = event.value;
            setTimeout(() => {
                this.removedSearchField = null;
            });
            if (!this.settings.searchOnBtnClick) {
                this.properties.length = 0;
            }
        });
        event.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounceTime"])(500), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])()).subscribe(() => {
            if (!this.settings.searchOnBtnClick) {
                this.getProperties();
            }
        });
    }
    removeSearchField(field) {
        this.message = null;
        this.removedSearchField = field;
    }
    changeCount(count) {
        this.count = count;
        this.properties.length = 0;
        this.resetPagination();
        this.getProperties();
    }
    changeSorting(sort) {
        this.sort = sort;
        this.properties.length = 0;
        this.getProperties();
    }
    changeViewType(obj) {
        this.viewType = obj.viewType;
        this.viewCol = obj.viewCol;
    }
    onPageChange(e) {
        this.pagination.page = e.pageIndex + 1;
        this.getProperties();
        window.scrollTo(0, 0);
    }
};
PropertiesComponent.ctorParameters = () => [
    { type: _app_settings__WEBPACK_IMPORTED_MODULE_4__["AppSettings"] },
    { type: _app_service__WEBPACK_IMPORTED_MODULE_5__["AppService"] },
    { type: _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__["MediaObserver"] },
    { type: src_app_mapa_service__WEBPACK_IMPORTED_MODULE_7__["MapaService"] }
];
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('sidenav', { static: true }),
    __metadata("design:type", Object)
], PropertiesComponent.prototype, "sidenav", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"], { static: true }),
    __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
], PropertiesComponent.prototype, "paginator", void 0);
PropertiesComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-properties',
        template: __webpack_require__(/*! raw-loader!./properties.component.html */ "./node_modules/raw-loader/index.js!./src/app/pages/properties/properties.component.html"),
        styles: [__webpack_require__(/*! ./properties.component.scss */ "./src/app/pages/properties/properties.component.scss")]
    }),
    __metadata("design:paramtypes", [_app_settings__WEBPACK_IMPORTED_MODULE_4__["AppSettings"], _app_service__WEBPACK_IMPORTED_MODULE_5__["AppService"], _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__["MediaObserver"],
        src_app_mapa_service__WEBPACK_IMPORTED_MODULE_7__["MapaService"]])
], PropertiesComponent);



/***/ }),

/***/ "./src/app/pages/properties/properties.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/pages/properties/properties.module.ts ***!
  \*******************************************************/
/*! exports provided: routes, PropertiesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertiesModule", function() { return PropertiesModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var mat_video__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mat-video */ "./node_modules/mat-video/fesm2015/mat-video.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _properties_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./properties.component */ "./src/app/pages/properties/properties.component.ts");
/* harmony import */ var _property_property_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./property/property.component */ "./src/app/pages/properties/property/property.component.ts");
/* harmony import */ var _map_map_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./map/map.component */ "./src/app/pages/properties/map/map.component.ts");
/* harmony import */ var agm_overlays__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! agm-overlays */ "./node_modules/agm-overlays/index.js");
/* harmony import */ var agm_overlays__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(agm_overlays__WEBPACK_IMPORTED_MODULE_9__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










const routes = [
    { path: '', component: _properties_component__WEBPACK_IMPORTED_MODULE_6__["PropertiesComponent"], pathMatch: 'full' },
    { path: 'map', component: _map_map_component__WEBPACK_IMPORTED_MODULE_8__["MapComponent"] },
    { path: ':id', component: _property_property_component__WEBPACK_IMPORTED_MODULE_7__["PropertyComponent"] }
];
let PropertiesModule = class PropertiesModule {
};
PropertiesModule = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
        declarations: [
            _properties_component__WEBPACK_IMPORTED_MODULE_6__["PropertiesComponent"],
            _property_property_component__WEBPACK_IMPORTED_MODULE_7__["PropertyComponent"],
            _map_map_component__WEBPACK_IMPORTED_MODULE_8__["MapComponent"]
        ],
        exports: [
            _properties_component__WEBPACK_IMPORTED_MODULE_6__["PropertiesComponent"],
            _map_map_component__WEBPACK_IMPORTED_MODULE_8__["MapComponent"]
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
            _agm_core__WEBPACK_IMPORTED_MODULE_3__["AgmCoreModule"],
            mat_video__WEBPACK_IMPORTED_MODULE_4__["MatVideoModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"],
            agm_overlays__WEBPACK_IMPORTED_MODULE_9__["AgmOverlays"],
            _agm_core__WEBPACK_IMPORTED_MODULE_3__["AgmCoreModule"].forRoot({
                apiKey: 'AIzaSyBfl5JsPWncvaMJd0icji5e0huUNWh2aEo',
                libraries: ["places"]
            }),
        ]
    })
], PropertiesModule);



/***/ }),

/***/ "./src/app/pages/properties/property/property.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/pages/properties/property/property.component.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-carousel .swiper-slide {\n  text-align: center;\n  padding-bottom: 66.25%;\n  position: relative;\n  overflow: hidden;\n  background: rgba(0, 0, 0, 0.04);\n}\n.main-carousel img {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: auto;\n  max-width: 100%;\n}\n.main-carousel .control-icons {\n  position: absolute;\n  z-index: 2;\n  top: 24px;\n  right: 20px;\n}\n.main-carousel .control-icons button.mat-button {\n  min-width: 36px;\n  width: 36px;\n  padding: 0;\n  margin: 0 4px;\n  background: rgba(255, 252, 252, 0.6);\n  transition: 0.2s;\n  color: rgba(0, 0, 0, 0.87);\n}\n.main-carousel .control-icons button.mat-button:disabled {\n  color: rgba(0, 0, 0, 0.26);\n}\n.main-carousel .control-icons button.mat-button:hover:enabled {\n  background: #fffcfc;\n}\n.small-carousel .swiper-slide img {\n  display: block;\n  opacity: 0.3;\n}\n.small-carousel .swiper-slide.active-thumb img {\n  border-width: 3px;\n  border-style: solid;\n  box-sizing: border-box;\n  opacity: 1;\n}\n.small-carousel .swiper-slide .swiper-lazy-preloader {\n  margin-top: 10px;\n}\n.widget {\n  margin-bottom: 40px;\n}\n.widget .widget-title {\n  margin: 0 -16px 16px;\n  padding: 8px 16px;\n  text-transform: uppercase;\n  font-weight: 500;\n}\n.widget:first-child .widget-title {\n  margin: -16px -16px 16px;\n  padding: 8px 16px;\n  text-transform: uppercase;\n  font-weight: 500;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvcHJvcGVydGllcy9wcm9wZXJ0eS9DOlxcVXNlcnNcXHVzZXJcXERvY3VtZW50c1xcZ2l0aHViXFxhbG1hY2VuZXMtYW5ndWxhci9zcmNcXGFwcFxccGFnZXNcXHByb3BlcnRpZXNcXHByb3BlcnR5XFxwcm9wZXJ0eS5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvcGFnZXMvcHJvcGVydGllcy9wcm9wZXJ0eS9wcm9wZXJ0eS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDSTtFQUNJLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsK0JBQUE7QUNBUjtBREVJO0VBQ0ksa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtBQ0FSO0FERUk7RUFDSSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxTQUFBO0VBQ0EsV0FBQTtBQ0FSO0FEQ1E7RUFDSSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFVBQUE7RUFDQSxhQUFBO0VBQ0Esb0NBQUE7RUFDQSxnQkFBQTtFQUNBLDBCQUFBO0FDQ1o7QURBWTtFQUNJLDBCQUFBO0FDRWhCO0FEQVk7RUFDSSxtQkFBQTtBQ0VoQjtBREtRO0VBQ0ksY0FBQTtFQUNBLFlBQUE7QUNGWjtBREtZO0VBQ0ksaUJBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsVUFBQTtBQ0hoQjtBRE1RO0VBQ0ksZ0JBQUE7QUNKWjtBRFNBO0VBQ0ksbUJBQUE7QUNOSjtBRE9JO0VBQ0ksb0JBQUE7RUFDQSxpQkFBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7QUNMUjtBRFFRO0VBQ0ksd0JBQUE7RUFDQSxpQkFBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7QUNOWiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3Byb3BlcnRpZXMvcHJvcGVydHkvcHJvcGVydHkuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWFpbi1jYXJvdXNlbHsgXHJcbiAgICAuc3dpcGVyLXNsaWRleyAgICAgICAgICAgICAgXHJcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgIHBhZGRpbmctYm90dG9tOiA2Ni4yNSU7XHJcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47ICBcclxuICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMDQpOyAgICAgICAgIFxyXG4gICAgfVxyXG4gICAgaW1ne1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICB0b3A6IDA7XHJcbiAgICAgICAgbGVmdDogMDtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICBoZWlnaHQ6IGF1dG87XHJcbiAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gICAgfSBcclxuICAgIC5jb250cm9sLWljb25zeyBcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgei1pbmRleDogMjsgXHJcbiAgICAgICAgdG9wOiAyNHB4O1xyXG4gICAgICAgIHJpZ2h0OiAyMHB4O1xyXG4gICAgICAgIGJ1dHRvbi5tYXQtYnV0dG9ue1xyXG4gICAgICAgICAgICBtaW4td2lkdGg6IDM2cHg7XHJcbiAgICAgICAgICAgIHdpZHRoOiAzNnB4O1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAwO1xyXG4gICAgICAgICAgICBtYXJnaW46IDAgNHB4O1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjUyLCAyNTIsIDAuNik7XHJcbiAgICAgICAgICAgIHRyYW5zaXRpb246IDAuMnM7IFxyXG4gICAgICAgICAgICBjb2xvcjpyZ2JhKDAsIDAsIDAsIDAuODcpO1xyXG4gICAgICAgICAgICAmOmRpc2FibGVke1xyXG4gICAgICAgICAgICAgICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNik7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICY6aG92ZXI6ZW5hYmxlZHtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTIsIDI1MiwgMSk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbi5zbWFsbC1jYXJvdXNlbHsgXHJcbiAgICAuc3dpcGVyLXNsaWRleyAgXHJcbiAgICAgICAgaW1ne1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICAgICAgb3BhY2l0eTogMC4zO1xyXG4gICAgICAgIH1cclxuICAgICAgICAmLmFjdGl2ZS10aHVtYntcclxuICAgICAgICAgICAgaW1neyBcclxuICAgICAgICAgICAgICAgIGJvcmRlci13aWR0aDogM3B4O1xyXG4gICAgICAgICAgICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcclxuICAgICAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICBcclxuICAgICAgICB9IFxyXG4gICAgICAgIC5zd2lwZXItbGF6eS1wcmVsb2FkZXJ7XHJcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9IFxyXG59XHJcbiBcclxuLndpZGdldHsgXHJcbiAgICBtYXJnaW4tYm90dG9tOiA0MHB4O1xyXG4gICAgLndpZGdldC10aXRsZXtcclxuICAgICAgICBtYXJnaW46IDAgLTE2cHggMTZweDtcclxuICAgICAgICBwYWRkaW5nOiA4cHggMTZweDtcclxuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICB9XHJcbiAgICAmOmZpcnN0LWNoaWxkeyAgXHJcbiAgICAgICAgLndpZGdldC10aXRsZXtcclxuICAgICAgICAgICAgbWFyZ2luOiAtMTZweCAtMTZweCAxNnB4O1xyXG4gICAgICAgICAgICBwYWRkaW5nOiA4cHggMTZweDtcclxuICAgICAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgICAgICB9XHJcbiAgICB9IFxyXG59ICIsIi5tYWluLWNhcm91c2VsIC5zd2lwZXItc2xpZGUge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmctYm90dG9tOiA2Ni4yNSU7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjA0KTtcbn1cbi5tYWluLWNhcm91c2VsIGltZyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiBhdXRvO1xuICBtYXgtd2lkdGg6IDEwMCU7XG59XG4ubWFpbi1jYXJvdXNlbCAuY29udHJvbC1pY29ucyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgei1pbmRleDogMjtcbiAgdG9wOiAyNHB4O1xuICByaWdodDogMjBweDtcbn1cbi5tYWluLWNhcm91c2VsIC5jb250cm9sLWljb25zIGJ1dHRvbi5tYXQtYnV0dG9uIHtcbiAgbWluLXdpZHRoOiAzNnB4O1xuICB3aWR0aDogMzZweDtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwIDRweDtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1MiwgMjUyLCAwLjYpO1xuICB0cmFuc2l0aW9uOiAwLjJzO1xuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjg3KTtcbn1cbi5tYWluLWNhcm91c2VsIC5jb250cm9sLWljb25zIGJ1dHRvbi5tYXQtYnV0dG9uOmRpc2FibGVkIHtcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNik7XG59XG4ubWFpbi1jYXJvdXNlbCAuY29udHJvbC1pY29ucyBidXR0b24ubWF0LWJ1dHRvbjpob3ZlcjplbmFibGVkIHtcbiAgYmFja2dyb3VuZDogI2ZmZmNmYztcbn1cblxuLnNtYWxsLWNhcm91c2VsIC5zd2lwZXItc2xpZGUgaW1nIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG9wYWNpdHk6IDAuMztcbn1cbi5zbWFsbC1jYXJvdXNlbCAuc3dpcGVyLXNsaWRlLmFjdGl2ZS10aHVtYiBpbWcge1xuICBib3JkZXItd2lkdGg6IDNweDtcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgb3BhY2l0eTogMTtcbn1cbi5zbWFsbC1jYXJvdXNlbCAuc3dpcGVyLXNsaWRlIC5zd2lwZXItbGF6eS1wcmVsb2FkZXIge1xuICBtYXJnaW4tdG9wOiAxMHB4O1xufVxuXG4ud2lkZ2V0IHtcbiAgbWFyZ2luLWJvdHRvbTogNDBweDtcbn1cbi53aWRnZXQgLndpZGdldC10aXRsZSB7XG4gIG1hcmdpbjogMCAtMTZweCAxNnB4O1xuICBwYWRkaW5nOiA4cHggMTZweDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cbi53aWRnZXQ6Zmlyc3QtY2hpbGQgLndpZGdldC10aXRsZSB7XG4gIG1hcmdpbjogLTE2cHggLTE2cHggMTZweDtcbiAgcGFkZGluZzogOHB4IDE2cHg7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59Il19 */"

/***/ }),

/***/ "./src/app/pages/properties/property/property.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/pages/properties/property/property.component.ts ***!
  \*****************************************************************/
/*! exports provided: PropertyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyComponent", function() { return PropertyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var src_app_app_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/app.service */ "./src/app/app.service.ts");
/* harmony import */ var ngx_swiper_wrapper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-swiper-wrapper */ "./node_modules/ngx-swiper-wrapper/dist/ngx-swiper-wrapper.es5.js");
/* harmony import */ var src_app_app_settings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app.settings */ "./src/app/app.settings.ts");
/* harmony import */ var src_app_shared_compare_overview_compare_overview_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/compare-overview/compare-overview.component */ "./src/app/shared/compare-overview/compare-overview.component.ts");
/* harmony import */ var ngx_embed_video__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-embed-video */ "./node_modules/ngx-embed-video/dist/index.js");
/* harmony import */ var ngx_embed_video__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(ngx_embed_video__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var src_app_theme_utils_app_validators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/theme/utils/app-validators */ "./src/app/theme/utils/app-validators.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









let PropertyComponent = class PropertyComponent {
    constructor(appSettings, appService, activatedRoute, embedService, fb) {
        this.appSettings = appSettings;
        this.appService = appService;
        this.activatedRoute = activatedRoute;
        this.embedService = embedService;
        this.fb = fb;
        this.psConfig = {
            wheelPropagation: true
        };
        this.sidenavOpen = true;
        this.config = {};
        this.config2 = {};
        this.settings = this.appSettings.settings;
    }
    ngOnInit() {
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.getPropertyById(params['id']);
        });
        this.getRelatedProperties();
        this.getFeaturedProperties();
        this.getAgent(1);
        if (window.innerWidth < 960) {
            this.sidenavOpen = false;
            this.sidenav.close();
        }
        ;
        this.mortgageForm = this.fb.group({
            principalAmount: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            downPayment: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            interestRate: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            period: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
        this.contactForm = this.fb.group({
            name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, src_app_theme_utils_app_validators__WEBPACK_IMPORTED_MODULE_8__["emailValidator"]])],
            phone: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            message: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    onWindowResize() {
        (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
    }
    getPropertyById(id) {
        this.appService.getPropertyById(id).subscribe(data => {
            this.property = data;
            this.embedVideo = this.embedService.embed(this.property.videos[1].link);
            setTimeout(() => {
                this.config.observer = true;
                this.config2.observer = true;
                this.swipers.forEach(swiper => {
                    if (swiper) {
                        swiper.setIndex(0);
                    }
                });
            });
        });
    }
    ngAfterViewInit() {
        this.config = {
            observer: false,
            slidesPerView: 1,
            spaceBetween: 0,
            keyboard: true,
            navigation: true,
            pagination: false,
            grabCursor: true,
            loop: false,
            preloadImages: false,
            lazy: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            }
        };
        this.config2 = {
            observer: false,
            slidesPerView: 4,
            spaceBetween: 16,
            keyboard: true,
            navigation: false,
            pagination: false,
            grabCursor: true,
            loop: false,
            preloadImages: false,
            lazy: true,
            breakpoints: {
                480: {
                    slidesPerView: 2
                },
                600: {
                    slidesPerView: 3,
                }
            }
        };
    }
    onOpenedChange() {
        this.swipers.forEach(swiper => {
            if (swiper) {
                swiper.update();
            }
        });
    }
    selectImage(index) {
        this.swipers.forEach(swiper => {
            if (swiper['elementRef'].nativeElement.id == 'main-carousel') {
                swiper.setIndex(index);
            }
        });
    }
    onIndexChange(index) {
        this.swipers.forEach(swiper => {
            let elem = swiper['elementRef'].nativeElement;
            if (elem.id == 'small-carousel') {
                swiper.setIndex(index);
                for (let i = 0; i < elem.children[0].children.length; i++) {
                    const element = elem.children[0].children[i];
                    if (element.classList.contains('thumb-' + index)) {
                        element.classList.add('active-thumb');
                    }
                    else {
                        element.classList.remove('active-thumb');
                    }
                }
            }
        });
    }
    addToCompare() {
        this.appService.addToCompare(this.property, src_app_shared_compare_overview_compare_overview_component__WEBPACK_IMPORTED_MODULE_6__["CompareOverviewComponent"], (this.settings.rtl) ? 'rtl' : 'ltr');
    }
    onCompare() {
        return this.appService.Data.compareList.filter(item => item.id == this.property.id)[0];
    }
    addToFavorites() {
        this.appService.addToFavorites(this.property, (this.settings.rtl) ? 'rtl' : 'ltr');
    }
    onFavorites() {
        return this.appService.Data.favorites.filter(item => item.id == this.property.id)[0];
    }
    getRelatedProperties() {
        this.appService.getRelatedProperties().subscribe(properties => {
            this.relatedProperties = properties;
        });
    }
    getFeaturedProperties() {
        this.appService.getFeaturedProperties().subscribe(properties => {
            this.featuredProperties = properties.slice(0, 3);
        });
    }
    getAgent(agentId = 1) {
        var ids = [1, 2, 3, 4, 5]; //agent ids 
        agentId = ids[Math.floor(Math.random() * ids.length)]; //random agent id
        this.agent = this.appService.getAgents().filter(agent => agent.id == agentId)[0];
    }
    onContactFormSubmit(values) {
        if (this.contactForm.valid) {
            console.log(values);
        }
    }
    onMortgageFormSubmit(values) {
        if (this.mortgageForm.valid) {
            var principalAmount = values['principalAmount'];
            var down = values['downPayment'];
            var interest = values['interestRate'];
            var term = values['period'];
            this.monthlyPayment = this.calculateMortgage(principalAmount, down, interest / 100 / 12, term * 12).toFixed(2);
        }
    }
    calculateMortgage(principalAmount, downPayment, interestRate, period) {
        return ((principalAmount - downPayment) * interestRate) / (1 - Math.pow(1 + interestRate, -period));
    }
};
PropertyComponent.ctorParameters = () => [
    { type: src_app_app_settings__WEBPACK_IMPORTED_MODULE_5__["AppSettings"] },
    { type: src_app_app_service__WEBPACK_IMPORTED_MODULE_3__["AppService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: ngx_embed_video__WEBPACK_IMPORTED_MODULE_7__["EmbedVideoService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] }
];
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('sidenav', { static: true }),
    __metadata("design:type", Object)
], PropertyComponent.prototype, "sidenav", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"])(ngx_swiper_wrapper__WEBPACK_IMPORTED_MODULE_4__["SwiperDirective"]),
    __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["QueryList"])
], PropertyComponent.prototype, "swipers", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('window:resize'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PropertyComponent.prototype, "onWindowResize", null);
PropertyComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-property',
        template: __webpack_require__(/*! raw-loader!./property.component.html */ "./node_modules/raw-loader/index.js!./src/app/pages/properties/property/property.component.html"),
        styles: [__webpack_require__(/*! ./property.component.scss */ "./src/app/pages/properties/property/property.component.scss")]
    }),
    __metadata("design:paramtypes", [src_app_app_settings__WEBPACK_IMPORTED_MODULE_5__["AppSettings"],
        src_app_app_service__WEBPACK_IMPORTED_MODULE_3__["AppService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
        ngx_embed_video__WEBPACK_IMPORTED_MODULE_7__["EmbedVideoService"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]])
], PropertyComponent);



/***/ }),

/***/ "./src/global.ts":
/*!***********************!*\
  !*** ./src/global.ts ***!
  \***********************/
/*! exports provided: conexion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conexion", function() { return conexion; });
// export const conexion:string = 'http://localhost:3700'
const conexion = 'https://almacenes-back.herokuapp.com';


/***/ })

}]);
//# sourceMappingURL=pages-properties-properties-module-es2015.js.map