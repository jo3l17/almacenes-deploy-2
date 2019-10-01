(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-pricing-pricing-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/pricing/monthly/monthly.component.html":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/pricing/monthly/monthly.component.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row wrap\">\r\n    <div *ngFor=\"let item of items\" fxFlex=\"100\" fxFlex.gt-sm=\"25\" fxFlex.sm=\"50\" class=\"p-2\">\r\n        <mat-card class=\"pricing-card text-center border-accent p-0 h-100\">\r\n            <h2 class=\"pricing-title my-3\">{{item.name}}</h2>\r\n            <div class=\"bg-accent pricing-header p-3\" fxLayout=\"column\" fxLayoutAlign=\"center center\">   \r\n                <h1>$ {{item.price}}<small> /mo</small></h1>\r\n                <p class=\"desc mb-2\">{{item.desc}}</p>\r\n            </div>\r\n            <div class=\"p-3\">\r\n                <p class=\"py-2\"><span class=\"mx-2 fw-500\">{{item.properties}}</span>Properties</p>\r\n                <p class=\"py-2\"><span class=\"mx-2 fw-500\">{{item.agentProfiles}}</span>Agent Profile<span *ngIf=\"item.agentProfiles != '1'\">s</span></p>\r\n                <p class=\"py-2\" [class.del]=\"item.agencyProfiles == '0'\" [class.text-muted]=\"item.agencyProfiles == '0'\">\r\n                  <span *ngIf=\"item.agencyProfiles != '0'\" class=\"mx-2 fw-500\">{{item.agencyProfiles}}</span>Agency Profile<span *ngIf=\"item.agencyProfiles != '1'\">s</span>\r\n                </p>\r\n                <p class=\"py-2\" [class.del]=\"item.featuredProperties == '0'\" [class.text-muted]=\"item.featuredProperties == '0'\">\r\n                  <span *ngIf=\"item.featuredProperties != '0'\" class=\"mx-2 fw-500\">{{item.featuredProperties}}</span>Featured Properties\r\n                </p> \r\n                <button mat-raised-button color=\"primary\" class=\"mt-3 uppercase\">Buy now</button>\r\n            </div>\r\n        </mat-card>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/pricing/pricing.component.html":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/pricing/pricing.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"p-3\">\r\n  <div class=\"theme-container\">\r\n\r\n      <div class=\"my-3\">\r\n        <div fxLayout=\"column\" fxLayoutAlign=\"center center\" class=\"text-center\">  \r\n          <h1 class=\"uppercase\">Pricing packages</h1>             \r\n          <p>Choose a package that's best for your business.</p>\r\n        </div>\r\n        <mat-tab-group mat-align-tabs=\"center\" class=\"pricing-tabs\">\r\n          <mat-tab label=\"MONTHLY\"><app-monthly></app-monthly></mat-tab>\r\n          <mat-tab label=\"YEARLY\"><app-yearly></app-yearly></mat-tab>\r\n        </mat-tab-group>\r\n      </div> \r\n\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/pricing/yearly/yearly.component.html":
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/pricing/yearly/yearly.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row wrap\">\r\n    <div *ngFor=\"let item of items\" fxFlex=\"100\" fxFlex.gt-sm=\"25\" fxFlex.sm=\"50\" class=\"p-2\">\r\n        <mat-card class=\"pricing-card text-center border-accent p-0 h-100\">\r\n            <h2 class=\"pricing-title my-3\">{{item.name}}</h2>\r\n            <div class=\"bg-accent pricing-header p-3\" fxLayout=\"column\" fxLayoutAlign=\"center center\">   \r\n                <h1>$ {{item.price}}<small> /yr</small></h1>\r\n                <p class=\"desc mb-2\">{{item.desc}}</p>\r\n            </div>\r\n            <div class=\"p-3\">\r\n                <p class=\"py-2\"><span class=\"mx-2 fw-500\">{{item.properties}}</span>Properties</p>\r\n                <p class=\"py-2\"><span class=\"mx-2 fw-500\">{{item.agentProfiles}}</span>Agent Profile<span *ngIf=\"item.agentProfiles != '1'\">s</span></p>\r\n                <p class=\"py-2\" [class.del]=\"item.agencyProfiles == '0'\" [class.text-muted]=\"item.agencyProfiles == '0'\">\r\n                  <span *ngIf=\"item.agencyProfiles != '0'\" class=\"mx-2 fw-500\">{{item.agencyProfiles}}</span>Agency Profile<span *ngIf=\"item.agencyProfiles != '1'\">s</span>\r\n                </p>\r\n                <p class=\"py-2\" [class.del]=\"item.featuredProperties == '0'\" [class.text-muted]=\"item.featuredProperties == '0'\">\r\n                  <span *ngIf=\"item.featuredProperties != '0'\" class=\"mx-2 fw-500\">{{item.featuredProperties}}</span>Featured Properties\r\n                </p> \r\n                <button mat-raised-button color=\"primary\" class=\"mt-3 uppercase\">Buy now</button>\r\n            </div>\r\n        </mat-card>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/pricing/monthly/monthly.component.ts":
/*!************************************************************!*\
  !*** ./src/app/pages/pricing/monthly/monthly.component.ts ***!
  \************************************************************/
/*! exports provided: MonthlyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MonthlyComponent", function() { return MonthlyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MonthlyComponent = /** @class */ (function () {
    function MonthlyComponent() {
        this.items = [
            { name: 'free', price: 0, desc: 'Simplest package to get you started', properties: '10', agentProfiles: '1', agencyProfiles: '0', featuredProperties: '0' },
            { name: 'basic', price: 49, desc: 'The most popular package we offer', properties: '100', agentProfiles: '3', agencyProfiles: '1', featuredProperties: '0' },
            { name: 'premium', price: 79, desc: 'The perfect package for your small business', properties: '250', agentProfiles: '10', agencyProfiles: '5', featuredProperties: '50' },
            { name: 'professional', price: 159, desc: 'Our most advanced & complete package', properties: 'Unlimited', agentProfiles: 'Unlimited', agencyProfiles: 'Unlimited', featuredProperties: 'Unlimited' }
        ];
    }
    MonthlyComponent.prototype.ngOnInit = function () {
    };
    MonthlyComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-monthly',
            template: __webpack_require__(/*! raw-loader!./monthly.component.html */ "./node_modules/raw-loader/index.js!./src/app/pages/pricing/monthly/monthly.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], MonthlyComponent);
    return MonthlyComponent;
}());



/***/ }),

/***/ "./src/app/pages/pricing/pricing.component.scss":
/*!******************************************************!*\
  !*** ./src/app/pages/pricing/pricing.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3ByaWNpbmcvcHJpY2luZy5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/pages/pricing/pricing.component.ts":
/*!****************************************************!*\
  !*** ./src/app/pages/pricing/pricing.component.ts ***!
  \****************************************************/
/*! exports provided: PricingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PricingComponent", function() { return PricingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PricingComponent = /** @class */ (function () {
    function PricingComponent() {
    }
    PricingComponent.prototype.ngOnInit = function () {
    };
    PricingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-pricing',
            template: __webpack_require__(/*! raw-loader!./pricing.component.html */ "./node_modules/raw-loader/index.js!./src/app/pages/pricing/pricing.component.html"),
            styles: [__webpack_require__(/*! ./pricing.component.scss */ "./src/app/pages/pricing/pricing.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], PricingComponent);
    return PricingComponent;
}());



/***/ }),

/***/ "./src/app/pages/pricing/pricing.module.ts":
/*!*************************************************!*\
  !*** ./src/app/pages/pricing/pricing.module.ts ***!
  \*************************************************/
/*! exports provided: routes, PricingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PricingModule", function() { return PricingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _pricing_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pricing.component */ "./src/app/pages/pricing/pricing.component.ts");
/* harmony import */ var _yearly_yearly_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./yearly/yearly.component */ "./src/app/pages/pricing/yearly/yearly.component.ts");
/* harmony import */ var _monthly_monthly_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./monthly/monthly.component */ "./src/app/pages/pricing/monthly/monthly.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    { path: '', component: _pricing_component__WEBPACK_IMPORTED_MODULE_4__["PricingComponent"], pathMatch: 'full' }
];
var PricingModule = /** @class */ (function () {
    function PricingModule() {
    }
    PricingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _pricing_component__WEBPACK_IMPORTED_MODULE_4__["PricingComponent"],
                _yearly_yearly_component__WEBPACK_IMPORTED_MODULE_5__["YearlyComponent"],
                _monthly_monthly_component__WEBPACK_IMPORTED_MODULE_6__["MonthlyComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__["SharedModule"]
            ]
        })
    ], PricingModule);
    return PricingModule;
}());



/***/ }),

/***/ "./src/app/pages/pricing/yearly/yearly.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/pages/pricing/yearly/yearly.component.ts ***!
  \**********************************************************/
/*! exports provided: YearlyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YearlyComponent", function() { return YearlyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var YearlyComponent = /** @class */ (function () {
    function YearlyComponent() {
        this.items = [
            { name: 'free', price: 0, desc: 'Simplest package to get you started', properties: '10', agentProfiles: '1', agencyProfiles: '0', featuredProperties: '0' },
            { name: 'basic', price: 569, desc: 'The most popular package we offer', properties: '100', agentProfiles: '3', agencyProfiles: '1', featuredProperties: '0' },
            { name: 'premium', price: 929, desc: 'The perfect package for your small business', properties: '250', agentProfiles: '10', agencyProfiles: '5', featuredProperties: '50' },
            { name: 'professional', price: 1899, desc: 'Our most advanced & complete package', properties: 'Unlimited', agentProfiles: 'Unlimited', agencyProfiles: 'Unlimited', featuredProperties: 'Unlimited' }
        ];
    }
    YearlyComponent.prototype.ngOnInit = function () {
    };
    YearlyComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-yearly',
            template: __webpack_require__(/*! raw-loader!./yearly.component.html */ "./node_modules/raw-loader/index.js!./src/app/pages/pricing/yearly/yearly.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], YearlyComponent);
    return YearlyComponent;
}());



/***/ })

}]);
//# sourceMappingURL=pages-pricing-pricing-module-es5.js.map