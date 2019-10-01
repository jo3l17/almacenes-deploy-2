(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-compare-compare-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/compare/compare.component.html":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/compare/compare.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"px-3\">\r\n  <div class=\"theme-container\">\r\n\r\n    <div *ngIf=\"appService.Data.compareList.length == 0\" class=\"py-5\">  \r\n      <mat-chip-list>\r\n          <mat-chip color=\"warn\" selected=\"true\" class=\"uppercase\">You have no properties to compare.</mat-chip>\r\n      </mat-chip-list>\r\n    </div>\r\n  \r\n    <div *ngIf=\"appService.Data.compareList.length > 0\" class=\"compare-carousel py-3\"> \r\n      \r\n      <mat-card fxLayout=\"row\" fxLayoutAlign=\"space-between center\" class=\"compare-toolbar\">      \r\n        <h3 class=\"uppercase\">Compare: {{appService.Data.compareList.length}}</h3>      \r\n        <div fxLayout=\"row\" fxLayoutAlign=\"center center\" *ngIf=\"config.simulateTouch\">\r\n            <button mat-mini-fab color=\"primary\" class=\"carousel-prev swiper-button-prev swipe-arrow mx-2\"><mat-icon>keyboard_arrow_left</mat-icon></button>\r\n            <button mat-mini-fab color=\"primary\" class=\"carousel-next swiper-button-next swipe-arrow mx-2\"><mat-icon>keyboard_arrow_right</mat-icon></button> \r\n        </div> \r\n        <button mat-mini-fab color=\"warn\" fxHide=\"false\" fxHide.gt-xs (click)=\"clear()\"><mat-icon>cancel</mat-icon></button>\r\n        <button mat-raised-button color=\"warn\" class=\"uppercase\" fxShow=\"false\" fxShow.gt-xs (click)=\"clear()\">Clear All</button>\r\n      </mat-card>\r\n      \r\n      <div class=\"swiper-container h-100 carousel-outer mt-3\" [swiper]=\"config\"> \r\n        <div class=\"swiper-wrapper h-100\">      \r\n          <div *ngFor=\"let property of appService.Data.compareList\" class=\"swiper-slide\">\r\n\r\n            <mat-card class=\"compare-item\">                 \r\n                <img mat-card-image [src]=\"property.gallery[0].medium\" alt=\"image\"> \r\n                <button mat-icon-button class=\"remove\" (click)=\"remove(property)\">\r\n                  <mat-icon color=\"warn\" class=\"mat-icon-lg\">highlight_off</mat-icon>\r\n                </button>              \r\n                <mat-card-content>\r\n                    <h2 class=\"title\"><a [routerLink]=\"['/properties', property.id]\">{{property.title}}</a></h2>\r\n                    <p fxLayout=\"row\" fxLayoutAlign=\"center center\" class=\"address\">\r\n                        <mat-icon class=\"text-muted\">location_on</mat-icon>\r\n                        <span>{{property.formattedAddress}}</span>\r\n                    </p>\r\n                    <mat-chip-list>\r\n                        <mat-chip color=\"primary\" selected=\"true\" class=\"w-100\">\r\n                            <h3 *ngIf=\"settings.currency == 'USD'\" class=\"w-100 text-center\">\r\n                                <span *ngIf=\"property.priceDollar.sale\">{{property.priceDollar.sale | currency : 'USD' : 'symbol' : '1.0'}}</span>\r\n                                <span *ngIf=\"property.priceDollar.rent\">{{property.priceDollar.rent | currency : 'USD' : 'symbol' : '1.0'}} /month</span>\r\n                            </h3>\r\n                            <h3 *ngIf=\"settings.currency == 'EUR'\" class=\"w-100 text-center\">\r\n                                <span *ngIf=\"property.priceEuro.sale\">{{property.priceEuro.sale | currency : 'EUR' : 'symbol' : '1.0'}}</span>\r\n                                <span *ngIf=\"property.priceEuro.rent\">{{property.priceEuro.rent | currency : 'EUR' : 'symbol' : '1.0'}} /month</span>\r\n                            </h3>\r\n                        </mat-chip>\r\n                    </mat-chip-list>\r\n                    <div class=\"details py-3\">\r\n                        <div fxLayout=\"row\" class=\"item\">\r\n                          <span>Property Type:</span>\r\n                          <span>{{property.propertyType}}</span>\r\n                        </div> \r\n                        <div fxLayout=\"row\" class=\"item\">\r\n                          <span>Property Status:</span>\r\n                          <div fxLayout=\"row wrap\" class=\"list\">\r\n                            <span *ngFor=\"let status of property.propertyStatus; let last=last\" [class.list-item]=\"property.propertyStatus.length > 1\" [class.last]=\"last\">{{status}}</span>\r\n                          </div>\r\n                        </div> \r\n                        <div fxLayout=\"row\" class=\"item\">\r\n                          <span>City:</span>\r\n                          <span>{{property.city}}</span>\r\n                        </div>\r\n                        <div fxLayout=\"row\" class=\"item\">\r\n                          <span>Zip Code:</span>\r\n                          <span>{{property.zipCode}}</span>\r\n                        </div>\r\n                        <div fxLayout=\"row\" class=\"item\">\r\n                            <span>Neighborhood:</span>\r\n                            <div fxLayout=\"row wrap\" class=\"list\">\r\n                              <span *ngFor=\"let neighborhood of property.neighborhood; let last=last\" [class.list-item]=\"property.neighborhood.length > 1\" [class.last]=\"last\">{{neighborhood}}</span>\r\n                            </div>\r\n                        </div>\r\n                        <div fxLayout=\"row\" class=\"item\">\r\n                            <span>Street:</span>\r\n                            <div fxLayout=\"row wrap\" class=\"list\">\r\n                                <span *ngFor=\"let street of property.street; let last=last\" [class.list-item]=\"property.street.length > 1\" [class.last]=\"last\">{{street}}</span>\r\n                            </div>\r\n                        </div>\r\n                        <div fxLayout=\"row\" class=\"item\">\r\n                          <span>Bedrooms:</span>\r\n                          <span>{{property.bedrooms}}</span>\r\n                        </div>\r\n                        <div fxLayout=\"row\" class=\"item\">\r\n                          <span>Bathrooms:</span>\r\n                          <span>{{property.bathrooms}}</span>\r\n                        </div>\r\n                        <div fxLayout=\"row\" class=\"item\">\r\n                          <span>Garages:</span>\r\n                          <span>{{property.garages}}</span>\r\n                        </div>\r\n                        <div fxLayout=\"row\" class=\"item\">\r\n                          <span>Property size:</span>\r\n                          <span>{{property.area.value}} {{property.area.unit}}</span>\r\n                        </div>\r\n                        <div fxLayout=\"row\" class=\"item\">\r\n                          <span>Year Built:</span>\r\n                          <span>{{property.yearBuilt}}</span>\r\n                        </div>\r\n                        <div fxLayout=\"row\" class=\"item\">\r\n                          <span>Features:</span>\r\n                          <div fxLayout=\"row wrap\" class=\"list\">\r\n                            <span *ngFor=\"let feature of property.features; let last=last\" [class.list-item]=\"property.features.length > 1\" [class.last]=\"last\">{{feature}}</span>\r\n                          </div>\r\n                        </div> \r\n                        <div fxLayout=\"row\" class=\"item\">\r\n                          <span>Published:</span>\r\n                          <span>{{property.published | date:\"dd MMMM, yyyy\" }}</span>\r\n                        </div>                         \r\n                    </div>\r\n                    <p class=\"uppercase text-center fw-500 mb-2\">description</p>\r\n                    <p>{{property.desc}}</p>                     \r\n                </mat-card-content> \r\n                <mat-card-actions class=\"text-center\">  \r\n                    <a [routerLink]=\"['/properties', property.id]\" mat-raised-button color=\"primary\" class=\"uppercase mb-3\">More info</a>                     \r\n                </mat-card-actions>             \r\n            </mat-card> \r\n\r\n          </div>\r\n        </div>   \r\n      </div>\r\n\r\n    </div>\r\n\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/compare/compare.component.scss":
/*!******************************************************!*\
  !*** ./src/app/pages/compare/compare.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".compare-carousel .compare-toolbar {\n  min-height: 72px;\n}\n.compare-carousel .compare-toolbar button.swipe-arrow {\n  position: relative;\n  margin-top: 0;\n  right: 0;\n  left: 0;\n  z-index: 2;\n}\n.compare-item .remove {\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n.compare-item .title {\n  text-align: center;\n}\n.compare-item .title a {\n  transition: 0.2s;\n  text-decoration: none;\n}\n.compare-item .address {\n  font-size: 12px;\n}\n.compare-item .details .item {\n  padding: 8px 0;\n}\n.compare-item .details .item span:first-child {\n  margin-right: 8px;\n  font-weight: 500;\n  min-width: 114px;\n}\n.compare-item .details .item .list span {\n  font-weight: normal;\n  min-width: auto;\n}\n.compare-item .details .item .list span:not(.last):after {\n  content: \",\";\n}\n.compare-item .details .item .list span.last:after {\n  content: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvY29tcGFyZS9DOlxcVXNlcnNcXHVzZXJcXERvY3VtZW50c1xcZ2l0aHViXFxhbG1hY2VuZXMtYW5ndWxhci9zcmNcXGFwcFxccGFnZXNcXGNvbXBhcmVcXGNvbXBhcmUuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3BhZ2VzL2NvbXBhcmUvY29tcGFyZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDSTtFQUNJLGdCQUFBO0FDQVI7QURDUTtFQUNJLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLFFBQUE7RUFDQSxPQUFBO0VBQ0EsVUFBQTtBQ0NaO0FESUk7RUFDSSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxNQUFBO0FDRFI7QURHSTtFQUNJLGtCQUFBO0FDRFI7QURFUTtFQUNJLGdCQUFBO0VBQ0EscUJBQUE7QUNBWjtBREdJO0VBQ0ksZUFBQTtBQ0RSO0FESVE7RUFDSSxjQUFBO0FDRlo7QURHWTtFQUNJLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtBQ0RoQjtBRElnQjtFQUNJLG1CQUFBO0VBQ0EsZUFBQTtBQ0ZwQjtBREdvQjtFQUNJLFlBQUE7QUNEeEI7QURHb0I7RUFDSSxhQUFBO0FDRHhCIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvY29tcGFyZS9jb21wYXJlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbXBhcmUtY2Fyb3VzZWx7ICAgIFxyXG4gICAgLmNvbXBhcmUtdG9vbGJhcntcclxuICAgICAgICBtaW4taGVpZ2h0OiA3MnB4O1xyXG4gICAgICAgIGJ1dHRvbi5zd2lwZS1hcnJvd3tcclxuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAwO1xyXG4gICAgICAgICAgICByaWdodDogMDtcclxuICAgICAgICAgICAgbGVmdDogMDtcclxuICAgICAgICAgICAgei1pbmRleDogMjsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbi5jb21wYXJlLWl0ZW17XHJcbiAgICAucmVtb3Zle1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICByaWdodDogMDtcclxuICAgICAgICB0b3A6IDA7XHJcbiAgICB9XHJcbiAgICAudGl0bGV7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgIGF7XHJcbiAgICAgICAgICAgIHRyYW5zaXRpb246IDAuMnM7XHJcbiAgICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAuYWRkcmVzc3tcclxuICAgICAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICB9XHJcbiAgICAuZGV0YWlsc3tcclxuICAgICAgICAuaXRlbXtcclxuICAgICAgICAgICAgcGFkZGluZzogOHB4IDA7IFxyXG4gICAgICAgICAgICBzcGFuOmZpcnN0LWNoaWxke1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiA4cHg7XHJcbiAgICAgICAgICAgICAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgICAgICAgICAgICAgbWluLXdpZHRoOiAxMTRweDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAubGlzdHtcclxuICAgICAgICAgICAgICAgIHNwYW57XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcclxuICAgICAgICAgICAgICAgICAgICBtaW4td2lkdGg6IGF1dG87XHJcbiAgICAgICAgICAgICAgICAgICAgJjpub3QoLmxhc3QpOmFmdGVye1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcIixcIjsgXHJcbiAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICAgICAmLmxhc3Q6YWZ0ZXJ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IG5vbmU7IFxyXG4gICAgICAgICAgICAgICAgICAgIH0gICAgXHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxufSIsIi5jb21wYXJlLWNhcm91c2VsIC5jb21wYXJlLXRvb2xiYXIge1xuICBtaW4taGVpZ2h0OiA3MnB4O1xufVxuLmNvbXBhcmUtY2Fyb3VzZWwgLmNvbXBhcmUtdG9vbGJhciBidXR0b24uc3dpcGUtYXJyb3cge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG1hcmdpbi10b3A6IDA7XG4gIHJpZ2h0OiAwO1xuICBsZWZ0OiAwO1xuICB6LWluZGV4OiAyO1xufVxuXG4uY29tcGFyZS1pdGVtIC5yZW1vdmUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAwO1xuICB0b3A6IDA7XG59XG4uY29tcGFyZS1pdGVtIC50aXRsZSB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5jb21wYXJlLWl0ZW0gLnRpdGxlIGEge1xuICB0cmFuc2l0aW9uOiAwLjJzO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG4uY29tcGFyZS1pdGVtIC5hZGRyZXNzIHtcbiAgZm9udC1zaXplOiAxMnB4O1xufVxuLmNvbXBhcmUtaXRlbSAuZGV0YWlscyAuaXRlbSB7XG4gIHBhZGRpbmc6IDhweCAwO1xufVxuLmNvbXBhcmUtaXRlbSAuZGV0YWlscyAuaXRlbSBzcGFuOmZpcnN0LWNoaWxkIHtcbiAgbWFyZ2luLXJpZ2h0OiA4cHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIG1pbi13aWR0aDogMTE0cHg7XG59XG4uY29tcGFyZS1pdGVtIC5kZXRhaWxzIC5pdGVtIC5saXN0IHNwYW4ge1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBtaW4td2lkdGg6IGF1dG87XG59XG4uY29tcGFyZS1pdGVtIC5kZXRhaWxzIC5pdGVtIC5saXN0IHNwYW46bm90KC5sYXN0KTphZnRlciB7XG4gIGNvbnRlbnQ6IFwiLFwiO1xufVxuLmNvbXBhcmUtaXRlbSAuZGV0YWlscyAuaXRlbSAubGlzdCBzcGFuLmxhc3Q6YWZ0ZXIge1xuICBjb250ZW50OiBub25lO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/pages/compare/compare.component.ts":
/*!****************************************************!*\
  !*** ./src/app/pages/compare/compare.component.ts ***!
  \****************************************************/
/*! exports provided: CompareComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompareComponent", function() { return CompareComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app.service */ "./src/app/app.service.ts");
/* harmony import */ var ngx_swiper_wrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-swiper-wrapper */ "./node_modules/ngx-swiper-wrapper/dist/ngx-swiper-wrapper.es5.js");
/* harmony import */ var _app_settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../app.settings */ "./src/app/app.settings.ts");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CompareComponent = /** @class */ (function () {
    function CompareComponent(appSettings, appService, mediaObserver) {
        this.appSettings = appSettings;
        this.appService = appService;
        this.mediaObserver = mediaObserver;
        this.config = {};
        this.settings = this.appSettings.settings;
    }
    CompareComponent.prototype.ngOnInit = function () {
        this.config = {
            observer: true,
            slidesPerView: 4,
            spaceBetween: 16,
            keyboard: false,
            navigation: false,
            pagination: false,
            simulateTouch: false,
            grabCursor: true,
            loop: false,
            preloadImages: true,
            lazy: false,
            breakpoints: {
                600: {
                    slidesPerView: 1
                },
                960: {
                    slidesPerView: 2,
                },
                1280: {
                    slidesPerView: 3,
                }
            }
        };
        this.watchForChanges();
    };
    CompareComponent.prototype.ngOnDestroy = function () {
        this.watcher.unsubscribe();
    };
    CompareComponent.prototype.disableSwiper = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.directiveRef) {
                _this.config.keyboard = false;
                _this.config.navigation = false;
                _this.config.simulateTouch = false;
                _this.directiveRef.update();
            }
        });
    };
    CompareComponent.prototype.enableSwiper = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.directiveRef) {
                _this.config.keyboard = true;
                _this.config.navigation = { nextEl: '.carousel-next', prevEl: '.carousel-prev' };
                _this.config.simulateTouch = true;
                _this.directiveRef.update();
            }
        });
    };
    CompareComponent.prototype.clear = function () {
        this.appService.Data.compareList.length = 0;
    };
    CompareComponent.prototype.remove = function (property) {
        var index = this.appService.Data.compareList.indexOf(property);
        if (index !== -1) {
            this.appService.Data.compareList.splice(index, 1);
        }
        this.watchForChanges();
    };
    CompareComponent.prototype.watchForChanges = function () {
        var _this = this;
        this.watcher = this.mediaObserver.media$.subscribe(function (change) {
            if (change.mqAlias == 'xs' && _this.appService.Data.compareList.length > 1) {
                _this.enableSwiper();
            }
            else if (change.mqAlias == 'sm' && _this.appService.Data.compareList.length > 2) {
                _this.enableSwiper();
            }
            else if (change.mqAlias == 'md' && _this.appService.Data.compareList.length > 3) {
                _this.enableSwiper();
            }
            else if (change.mqAlias == 'lg' && _this.appService.Data.compareList.length > 4) {
                _this.enableSwiper();
            }
            else if (change.mqAlias == 'xl' && _this.appService.Data.compareList.length > 4) {
                _this.enableSwiper();
            }
            else {
                _this.disableSwiper();
            }
        });
    };
    CompareComponent.ctorParameters = function () { return [
        { type: _app_settings__WEBPACK_IMPORTED_MODULE_3__["AppSettings"] },
        { type: _app_service__WEBPACK_IMPORTED_MODULE_1__["AppService"] },
        { type: _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__["MediaObserver"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(ngx_swiper_wrapper__WEBPACK_IMPORTED_MODULE_2__["SwiperDirective"], { static: false }),
        __metadata("design:type", ngx_swiper_wrapper__WEBPACK_IMPORTED_MODULE_2__["SwiperDirective"])
    ], CompareComponent.prototype, "directiveRef", void 0);
    CompareComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-compare',
            template: __webpack_require__(/*! raw-loader!./compare.component.html */ "./node_modules/raw-loader/index.js!./src/app/pages/compare/compare.component.html"),
            styles: [__webpack_require__(/*! ./compare.component.scss */ "./src/app/pages/compare/compare.component.scss")]
        }),
        __metadata("design:paramtypes", [_app_settings__WEBPACK_IMPORTED_MODULE_3__["AppSettings"], _app_service__WEBPACK_IMPORTED_MODULE_1__["AppService"], _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__["MediaObserver"]])
    ], CompareComponent);
    return CompareComponent;
}());



/***/ }),

/***/ "./src/app/pages/compare/compare.module.ts":
/*!*************************************************!*\
  !*** ./src/app/pages/compare/compare.module.ts ***!
  \*************************************************/
/*! exports provided: routes, CompareModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompareModule", function() { return CompareModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _compare_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./compare.component */ "./src/app/pages/compare/compare.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [
    { path: '', component: _compare_component__WEBPACK_IMPORTED_MODULE_4__["CompareComponent"], pathMatch: 'full' }
];
var CompareModule = /** @class */ (function () {
    function CompareModule() {
    }
    CompareModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_compare_component__WEBPACK_IMPORTED_MODULE_4__["CompareComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__["SharedModule"]
            ]
        })
    ], CompareModule);
    return CompareModule;
}());



/***/ })

}]);
//# sourceMappingURL=pages-compare-compare-module-es5.js.map