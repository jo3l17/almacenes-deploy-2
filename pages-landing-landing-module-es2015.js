(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-landing-landing-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/landing/landing.component.html":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/landing/landing.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-drawer-container class=\"landing-page\">\r\n       \r\n    <div class=\"p-3 header-section\" id=\"top\">\r\n        <div class=\"theme-container\">\r\n            <div fxLayout=\"row wrap\" class=\"content\">\r\n                <div fxFlex=\"100\" class=\"mb-5 py-3\"> \r\n                    <app-logo></app-logo>\r\n                </div>\r\n                <div fxFlex=\"100\" class=\"py-5\"> \r\n                    <h1>Angular Material Design Real Estate Template</h1>\r\n                    <h4 class=\"mt-3\">Housekey implements the official Angular Material Design components and built with Angular CLI. No Bootstrap!, No jQuery! and Only TypeScript! Start creating your app with Housekey template, 8 layouts, 8 color styles, 20+ pages</h4>\r\n                    <div class=\"py-5\">\r\n                        <button mat-raised-button color=\"primary\" class=\"uppercase mx-2\" (click)=\"scrollToDemos()\">View demos</button>\r\n                        <a mat-raised-button color=\"accent\" href=\"http://themeseason.com/\" target=\"_blank\" class=\"uppercase mx-2\">Purchase now</a> \r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div> \r\n\r\n    <div class=\"p-3\">\r\n        <div class=\"theme-container\">\r\n\r\n            <div fxLayout=\"row wrap\" fxLayoutAlign=\"center\" id=\"demos\">\r\n                <div fxFlex=\"100\" class=\"text-center py-4\"> \r\n                    <h1 class=\"fw-500\">Check out our demo styles</h1>\r\n                    <p>Fully responsive, organized folder structure, clean & customizable code, easy to use and much more...</p>\r\n                </div>\r\n                <div fxFlex=\"100\" class=\"main-wrapper\">\r\n\r\n                    <div fxLayout=\"row wrap\">\r\n                        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" fxFlex.sm=\"50\" class=\"box\">\r\n                            <mat-card [style.background-image]=\"'url(assets/images/demos/header-default.jpg)'\"></mat-card>\r\n                            <h2>Header default</h2>\r\n                            <button mat-raised-button color=\"primary\" type=\"submit\" class=\"uppercase\" (click)=\"getDemo(1)\">View demo</button>\r\n                        </div>\r\n                        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" fxFlex.sm=\"50\" class=\"box\">\r\n                            <mat-card [style.background-image]=\"'url(assets/images/demos/header-image.jpg)'\"></mat-card>\r\n                            <h2>Header image</h2>\r\n                            <button mat-raised-button color=\"primary\" type=\"submit\" class=\"uppercase\" (click)=\"getDemo(2)\">View demo</button>\r\n                        </div>\r\n                        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" fxFlex.sm=\"50\" class=\"box\">\r\n                            <mat-card [style.background-image]=\"'url(assets/images/demos/header-carousel.jpg)'\"></mat-card>\r\n                            <h2>Header carousel</h2>\r\n                            <button mat-raised-button color=\"primary\" type=\"submit\" class=\"uppercase\" (click)=\"getDemo(3)\">View demo</button>\r\n                        </div>\r\n                        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" fxFlex.sm=\"50\" class=\"box\">\r\n                            <mat-card [style.background-image]=\"'url(assets/images/demos/toolbar-2.jpg)'\"></mat-card>\r\n                            <h2>Toolbar version 2</h2>\r\n                            <button mat-raised-button color=\"primary\" type=\"submit\" class=\"uppercase\" (click)=\"getDemo(4)\">View demo</button>\r\n                        </div>\r\n                        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" fxFlex.sm=\"50\" class=\"box\">\r\n                            <mat-card [style.background-image]=\"'url(assets/images/demos/dark.jpg)'\"></mat-card>\r\n                            <h2>Dark version</h2>\r\n                            <button mat-raised-button color=\"primary\" type=\"submit\" class=\"uppercase\" (click)=\"getDemo(5)\">View demo</button>\r\n                        </div>\r\n                        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" fxFlex.sm=\"50\" class=\"box\">\r\n                            <mat-card [style.background-image]=\"'url(assets/images/demos/rtl.jpg)'\"></mat-card>\r\n                            <h2>RTL</h2>\r\n                            <button mat-raised-button color=\"primary\" type=\"submit\" class=\"uppercase\" (click)=\"getDemo(6)\">View demo</button>\r\n                        </div>\r\n\r\n                        <div fxFlex=\"100\" class=\"mt-5\">                               \r\n                            <h1 class=\"text-center\">Skins</h1> \r\n                        </div>\r\n\r\n                        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" fxFlex.sm=\"50\" class=\"box\">\r\n                            <mat-card [style.background-image]=\"'url(assets/images/demos/blue.jpg)'\"></mat-card>\r\n                            <h2>Blue</h2>\r\n                            <button mat-raised-button color=\"primary\" type=\"submit\" class=\"uppercase\" (click)=\"getSkin(1)\">View demo</button>\r\n                        </div>\r\n                        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" fxFlex.sm=\"50\" class=\"box\">\r\n                            <mat-card [style.background-image]=\"'url(assets/images/demos/green.jpg)'\"></mat-card>\r\n                            <h2>Green</h2>\r\n                            <button mat-raised-button color=\"primary\" type=\"submit\" class=\"uppercase\" (click)=\"getSkin(2)\">View demo</button>\r\n                        </div>\r\n                        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" fxFlex.sm=\"50\" class=\"box\">\r\n                            <mat-card [style.background-image]=\"'url(assets/images/demos/red.jpg)'\"></mat-card>\r\n                            <h2>Red</h2>\r\n                            <button mat-raised-button color=\"primary\" type=\"submit\" class=\"uppercase\" (click)=\"getSkin(3)\">View demo</button>\r\n                        </div>\r\n                        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" fxFlex.sm=\"50\" class=\"box\">\r\n                            <mat-card [style.background-image]=\"'url(assets/images/demos/pink.jpg)'\"></mat-card>\r\n                            <h2>Pink</h2>\r\n                            <button mat-raised-button color=\"primary\" type=\"submit\" class=\"uppercase\" (click)=\"getSkin(4)\">View demo</button>\r\n                        </div>\r\n                        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" fxFlex.sm=\"50\" class=\"box\">\r\n                            <mat-card [style.background-image]=\"'url(assets/images/demos/purple.jpg)'\"></mat-card>\r\n                            <h2>Purple</h2>\r\n                            <button mat-raised-button color=\"primary\" type=\"submit\" class=\"uppercase\" (click)=\"getSkin(5)\">View demo</button>\r\n                        </div>\r\n                        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" fxFlex.sm=\"50\" class=\"box\">\r\n                            <mat-card [style.background-image]=\"'url(assets/images/demos/grey.jpg)'\"></mat-card>\r\n                            <h2>Grey</h2>\r\n                            <button mat-raised-button color=\"primary\" type=\"submit\" class=\"uppercase\" (click)=\"getSkin(6)\">View demo</button>\r\n                        </div>\r\n\r\n                        <div fxFlex=\"100\" class=\"py-4 px-3 text-right\">\r\n                            <button mat-mini-fab (click)=\"goToTop()\">\r\n                                <mat-icon>keyboard_arrow_up</mat-icon>\r\n                            </button>\r\n                        </div>\r\n\r\n                    </div>\r\n\r\n                </div> \r\n            </div> \r\n\r\n        </div>\r\n    </div>\r\n\r\n    <mat-toolbar class=\"copyright\">\r\n        <div class=\"theme-container\"> \r\n            <div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"space-between center\">\r\n                <p ngClass.xs=\"mt-1\">Copyright © 2019 All Rights Reserved</p>\r\n                <p>Designed & Developed by <a mat-button href=\"http://themeseason.com/\" target=\"_blank\">ThemeSeason</a></p>\r\n            </div>\r\n        </div>\r\n    </mat-toolbar> \r\n\r\n</mat-drawer-container>"

/***/ }),

/***/ "./src/app/pages/landing/landing.component.scss":
/*!******************************************************!*\
  !*** ./src/app/pages/landing/landing.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".landing-page .header-section {\n  position: relative;\n  overflow: hidden;\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-position: center;\n  background-image: url('1-big.jpg');\n}\n.landing-page .header-section:before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 1;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.81);\n}\n.landing-page .header-section .content {\n  position: relative;\n  z-index: 9;\n  color: #fff;\n  text-align: center;\n}\n.landing-page .header-section .content h1 {\n  font-size: 36px;\n  font-weight: 400;\n}\n.landing-page .header-section .content h4 {\n  font-size: 16px;\n  font-weight: 300;\n  max-width: 700px;\n  margin: 0 auto;\n}\n.landing-page .main-wrapper {\n  margin: -16px;\n}\n.landing-page .main-wrapper .box {\n  text-align: center;\n  padding: 16px;\n  margin-bottom: 24px;\n}\n.landing-page .main-wrapper .box h2 {\n  padding: 16px 0;\n  font-weight: 500;\n}\n.landing-page .main-wrapper .box .mat-card {\n  background-size: cover;\n  height: 300px;\n  background-position: top;\n  transition: 5s;\n  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);\n}\n.landing-page .main-wrapper .box:hover .mat-card {\n  background-position: bottom;\n}\n.landing-page p {\n  font-size: 16px;\n}\n.landing-page .copyright {\n  margin-top: 36px;\n  height: 64px;\n}\n.landing-page .copyright p {\n  font-size: 13px;\n  font-weight: 400;\n  margin-bottom: 0;\n  line-height: 1.2;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvbGFuZGluZy9DOlxcVXNlcnNcXHVzZXJcXERvY3VtZW50c1xcZ2l0aHViXFxhbG1hY2VuZXMtYW5ndWxhci9zcmNcXGFwcFxccGFnZXNcXGxhbmRpbmdcXGxhbmRpbmcuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3BhZ2VzL2xhbmRpbmcvbGFuZGluZy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDSTtFQUNJLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtFQUNBLHNCQUFBO0VBQ0EsMkJBQUE7RUFDQSxrQ0FBQTtBQ0FSO0FEQ1E7RUFDSSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSwrQkFBQTtBQ0NaO0FEQ1E7RUFDSSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7QUNDWjtBREFZO0VBQ0ksZUFBQTtFQUNBLGdCQUFBO0FDRWhCO0FEQVk7RUFDSSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUNFaEI7QURFSTtFQUNJLGFBQUE7QUNBUjtBRENRO0VBQ0ksa0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7QUNDWjtBREFZO0VBQ0ksZUFBQTtFQUNBLGdCQUFBO0FDRWhCO0FEQVk7RUFDSSxzQkFBQTtFQUNBLGFBQUE7RUFDQSx3QkFBQTtFQUNBLGNBQUE7RUFDQSx5SEFBQTtBQ0VoQjtBREdnQjtFQUNJLDJCQUFBO0FDRHBCO0FET0k7RUFDSSxlQUFBO0FDTFI7QURPSTtFQUNJLGdCQUFBO0VBQ0EsWUFBQTtBQ0xSO0FETVE7RUFDSSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FDSloiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9sYW5kaW5nL2xhbmRpbmcuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubGFuZGluZy1wYWdleyBcclxuICAgIC5oZWFkZXItc2VjdGlvbnsgXHJcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjsgXHJcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL3Byb3BzL29mZmljZS0yLzEtYmlnLmpwZycpOyAgICAgICBcclxuICAgICAgICAmOmJlZm9yZXsgICAgICAgIFxyXG4gICAgICAgICAgICBjb250ZW50OiAnJzsgICAgICAgIFxyXG4gICAgICAgICAgICBwb3NpdGlvbjphYnNvbHV0ZTtcclxuICAgICAgICAgICAgdG9wOiAwO1xyXG4gICAgICAgICAgICBsZWZ0OiAwO1xyXG4gICAgICAgICAgICByaWdodDogMDtcclxuICAgICAgICAgICAgei1pbmRleDogMTtcclxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTsgXHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMCwwLDAsIDAuODEpOyAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5jb250ZW50e1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgICAgIHotaW5kZXg6IDk7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjZmZmOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgICAgIGgxe1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAzNnB4O1xyXG4gICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBoNHtcclxuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiAzMDA7XHJcbiAgICAgICAgICAgICAgICBtYXgtd2lkdGg6IDcwMHB4O1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luOiAwIGF1dG87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICBcclxuICAgIH1cclxuICAgIC5tYWluLXdyYXBwZXJ7XHJcbiAgICAgICAgbWFyZ2luOiAtMTZweDtcclxuICAgICAgICAuYm94e1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDE2cHg7ICBcclxuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMjRweDsgICAgICAgICBcclxuICAgICAgICAgICAgaDJ7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAxNnB4IDA7XHJcbiAgICAgICAgICAgICAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC5tYXQtY2FyZHsgXHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAzMDBweDtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IHRvcDtcclxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IDVzOyBcclxuICAgICAgICAgICAgICAgIGJveC1zaGFkb3c6IDBweCAzcHggM3B4IC0ycHggcmdiYSgwLCAwLCAwLCAwLjIpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDBweCAzcHggNHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTQpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDBweCAxcHggOHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICY6aG92ZXJ7XHJcbiAgICAgICAgICAgICAgICAubWF0LWNhcmR7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogYm90dG9tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgfVxyXG4gICAgLmNvcHlyaWdodHtcclxuICAgICAgICBtYXJnaW4tdG9wOiAzNnB4O1xyXG4gICAgICAgIGhlaWdodDogNjRweDtcclxuICAgICAgICBwe1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDA7XHJcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLmxhbmRpbmctcGFnZSAuaGVhZGVyLXNlY3Rpb24ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9wcm9wcy9vZmZpY2UtMi8xLWJpZy5qcGdcIik7XG59XG4ubGFuZGluZy1wYWdlIC5oZWFkZXItc2VjdGlvbjpiZWZvcmUge1xuICBjb250ZW50OiBcIlwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIHotaW5kZXg6IDE7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC44MSk7XG59XG4ubGFuZGluZy1wYWdlIC5oZWFkZXItc2VjdGlvbiAuY29udGVudCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgei1pbmRleDogOTtcbiAgY29sb3I6ICNmZmY7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5sYW5kaW5nLXBhZ2UgLmhlYWRlci1zZWN0aW9uIC5jb250ZW50IGgxIHtcbiAgZm9udC1zaXplOiAzNnB4O1xuICBmb250LXdlaWdodDogNDAwO1xufVxuLmxhbmRpbmctcGFnZSAuaGVhZGVyLXNlY3Rpb24gLmNvbnRlbnQgaDQge1xuICBmb250LXNpemU6IDE2cHg7XG4gIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIG1heC13aWR0aDogNzAwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuLmxhbmRpbmctcGFnZSAubWFpbi13cmFwcGVyIHtcbiAgbWFyZ2luOiAtMTZweDtcbn1cbi5sYW5kaW5nLXBhZ2UgLm1haW4td3JhcHBlciAuYm94IHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiAxNnB4O1xuICBtYXJnaW4tYm90dG9tOiAyNHB4O1xufVxuLmxhbmRpbmctcGFnZSAubWFpbi13cmFwcGVyIC5ib3ggaDIge1xuICBwYWRkaW5nOiAxNnB4IDA7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG4ubGFuZGluZy1wYWdlIC5tYWluLXdyYXBwZXIgLmJveCAubWF0LWNhcmQge1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICBoZWlnaHQ6IDMwMHB4O1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiB0b3A7XG4gIHRyYW5zaXRpb246IDVzO1xuICBib3gtc2hhZG93OiAwcHggM3B4IDNweCAtMnB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMHB4IDNweCA0cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xNCksIDBweCAxcHggOHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xufVxuLmxhbmRpbmctcGFnZSAubWFpbi13cmFwcGVyIC5ib3g6aG92ZXIgLm1hdC1jYXJkIHtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogYm90dG9tO1xufVxuLmxhbmRpbmctcGFnZSBwIHtcbiAgZm9udC1zaXplOiAxNnB4O1xufVxuLmxhbmRpbmctcGFnZSAuY29weXJpZ2h0IHtcbiAgbWFyZ2luLXRvcDogMzZweDtcbiAgaGVpZ2h0OiA2NHB4O1xufVxuLmxhbmRpbmctcGFnZSAuY29weXJpZ2h0IHAge1xuICBmb250LXNpemU6IDEzcHg7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIG1hcmdpbi1ib3R0b206IDA7XG4gIGxpbmUtaGVpZ2h0OiAxLjI7XG59Il19 */"

/***/ }),

/***/ "./src/app/pages/landing/landing.component.ts":
/*!****************************************************!*\
  !*** ./src/app/pages/landing/landing.component.ts ***!
  \****************************************************/
/*! exports provided: LandingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LandingComponent", function() { return LandingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var src_app_app_settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/app.settings */ "./src/app/app.settings.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let LandingComponent = class LandingComponent {
    constructor(appSettings, router) {
        this.appSettings = appSettings;
        this.router = router;
        this.settings = this.appSettings.settings;
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        document.getElementById('preloader').classList.add('hide');
    }
    getDemo(number) {
        if (number == 1) {
            this.settings.toolbar = 1;
            this.settings.header = 'default';
            this.settings.theme = 'blue';
            this.settings.rtl = false;
        }
        if (number == 2) {
            this.settings.toolbar = 1;
            this.settings.header = 'image';
            this.settings.theme = 'blue';
            this.settings.rtl = false;
        }
        if (number == 3) {
            this.settings.toolbar = 1;
            this.settings.header = 'carousel';
            this.settings.theme = 'blue';
            this.settings.rtl = false;
        }
        if (number == 4) {
            this.settings.toolbar = 2;
            this.settings.header = 'image';
            this.settings.theme = 'blue';
            this.settings.rtl = false;
        }
        if (number == 5) {
            this.settings.toolbar = 2;
            this.settings.header = 'image';
            this.settings.theme = 'orange-dark';
            this.settings.rtl = false;
        }
        if (number == 6) {
            this.settings.toolbar = 1;
            this.settings.header = 'image';
            this.settings.theme = 'blue';
            this.settings.rtl = true;
        }
        this.router.navigate(['/']);
    }
    getSkin(num) {
        if (num == 1) {
            this.settings.theme = 'blue';
            this.settings.header = "carousel";
        }
        if (num == 2) {
            this.settings.theme = 'green';
            this.settings.header = "carousel";
        }
        if (num == 3) {
            this.settings.theme = 'red';
            this.settings.header = "carousel";
        }
        if (num == 4) {
            this.settings.theme = 'pink';
            this.settings.header = "carousel";
        }
        if (num == 5) {
            this.settings.theme = 'purple';
            this.settings.header = "carousel";
        }
        if (num == 6) {
            this.settings.theme = 'grey';
            this.settings.header = "carousel";
        }
        this.settings.toolbar = 1;
        this.settings.rtl = false;
        this.router.navigate(['/']);
    }
    scrollToDemos() {
        var elmnt = document.getElementById("demos");
        elmnt.scrollIntoView({ behavior: "smooth" });
    }
    goToTop() {
        var elmnt = document.getElementById("top");
        elmnt.scrollIntoView({ behavior: "smooth" });
    }
};
LandingComponent.ctorParameters = () => [
    { type: src_app_app_settings__WEBPACK_IMPORTED_MODULE_2__["AppSettings"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }
];
LandingComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-landing',
        template: __webpack_require__(/*! raw-loader!./landing.component.html */ "./node_modules/raw-loader/index.js!./src/app/pages/landing/landing.component.html"),
        styles: [__webpack_require__(/*! ./landing.component.scss */ "./src/app/pages/landing/landing.component.scss")]
    }),
    __metadata("design:paramtypes", [src_app_app_settings__WEBPACK_IMPORTED_MODULE_2__["AppSettings"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
], LandingComponent);



/***/ }),

/***/ "./src/app/pages/landing/landing.module.ts":
/*!*************************************************!*\
  !*** ./src/app/pages/landing/landing.module.ts ***!
  \*************************************************/
/*! exports provided: routes, LandingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LandingModule", function() { return LandingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _landing_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./landing.component */ "./src/app/pages/landing/landing.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





const routes = [
    { path: '', component: _landing_component__WEBPACK_IMPORTED_MODULE_4__["LandingComponent"], pathMatch: 'full' }
];
let LandingModule = class LandingModule {
};
LandingModule = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
        declarations: [_landing_component__WEBPACK_IMPORTED_MODULE_4__["LandingComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__["SharedModule"],
        ]
    })
], LandingModule);



/***/ })

}]);
//# sourceMappingURL=pages-landing-landing-module-es2015.js.map