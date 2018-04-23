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
var core_1 = require("@angular/core");
var movie_service_1 = require("./movie.service");
var main_content_component_1 = require("../../layout/main-content.component");
var file_1 = require("./model/file");
var forms_1 = require("@angular/forms");
var MovieMainComponent = (function () {
    function MovieMainComponent(mainComponent, movieService, fb) {
        this.mainComponent = mainComponent;
        this.movieService = movieService;
        this.fb = fb;
        this.registMode = "D";
        this.fileIdup = 0;
        this.cmsContId = "";
        this.fileName = "";
        mainComponent.menu = {
            category: "UTILITY",
            menu: "동영상관리"
        };
    }
    MovieMainComponent.prototype.ngOnInit = function () {
        this.getFileList();
    };
    MovieMainComponent.prototype.initModalData = function () {
        this.registMode = "D";
        this.fileIdup = 0;
        this.cmsContId = "";
        this.fileName = "";
    };
    MovieMainComponent.prototype.getFileList = function () {
        var _this = this;
        var formData = {};
        this.movieService.getFileList(formData)
            .subscribe(function (res) {
            console.log(res.result);
            var fileLength = res.result.list.length;
            if (fileLength > 0) {
                _this.fileList = new Array();
            }
            for (var i = 0; i < fileLength; i++) {
                _this.fileList[i] = new file_1.File(res.result.list[i]);
            }
        }, function (err) {
            if (err) {
                console.log('에러');
            }
        });
    };
    MovieMainComponent.prototype.changeRegistMode = function (mode) {
        this.registMode = mode;
    };
    MovieMainComponent.prototype.doRegist = function () {
        var formData = {};
        formData.fileType = this.registMode;
        formData.fileIdup = this.fileIdup;
        if ('D' === this.registMode) {
            formData.fileName = this.fileName;
        }
        else if ('D' === this.registMode) {
            formData.cmsContId = this.cmsContId;
        }
        var observable = this.movieService.registFile(formData);
        observable.subscribe(function (response) {
            alert("등록되었습니다.");
        }, function (error) {
            console.log("Error happened" + error);
            alert('등록에 실패하였습니다. ');
        }, function () { console.log("the subscription is completed"); });
    };
    return MovieMainComponent;
}());
MovieMainComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'movie-main.component.html',
        styleUrls: ['movie-main.component.css',]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof main_content_component_1.MainContentComponent !== "undefined" && main_content_component_1.MainContentComponent) === "function" && _a || Object, typeof (_b = typeof movie_service_1.MovieService !== "undefined" && movie_service_1.MovieService) === "function" && _b || Object, forms_1.FormBuilder])
], MovieMainComponent);
exports.MovieMainComponent = MovieMainComponent;
var _a, _b;
//# sourceMappingURL=movie-main.component.js.map