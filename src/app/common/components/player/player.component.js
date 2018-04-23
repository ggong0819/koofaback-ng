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
var PlayerComponent = (function () {
    function PlayerComponent() {
        var _this = this;
        // player status
        this.isFullscreen = false;
        this.isMiniview = false;
        this.isLock = false;
        this.isRepeat = false;
        this.isNav = false;
        this.repeata = null;
        this.repeatb = null;
        /**
         * 메타데이타 로드
         */
        this.loadmetadata = function () {
            _this.init();
            _this.setOptions(_this.settings);
        };
        /**
         * 초기화
         */
        this.init = function () {
            // 자동 재생
            if (_this.video.nativeElement.autoplay) { }
            _this.dragResize(); // 미니뷰 사이즈 조절/이동(jQuery-ui)
        };
        /**
         * 사용자 설정 변경
         */
        this.setOptions = function (options) {
            // 사용자 설정 값 세팅
            _this.settings = options;
            // 시작, 종료시간이 지정되었을 때
            if (_this.settings.startTime !== undefined && _this.settings.endTime !== undefined) {
                _this.video.nativeElement.pause();
                _this.video.nativeElement.currentTime = _this.settings.startTime;
                _this.setStartEnd();
            }
            else {
                _this.video.nativeElement.currentTime = 0;
                _this.video.nativeElement.pause();
                _this.setStartEnd();
            }
            // 미니뷰로 지정했을 때
            if (_this.settings.miniview) {
                _this.isMiniview = false;
                _this.miniview();
            }
            // 현 재생시간을 지정했을 때
            if (_this.settings.currentTime != undefined) {
                // 시작, 종료시간이 지정되었을 때
                if (_this.settings.startTime !== undefined && _this.settings.endTime !== undefined) {
                    _this.video.nativeElement.currentTime = _this.settings.startTime + _this.settings.currentTime;
                }
                else {
                    _this.video.nativeElement.currentTime = _this.settings.currentTime;
                }
            }
            // 배속을 지정했을 때
            if (_this.settings.speed != undefined) {
                if (_this.settings.speed < 1.4 && _this.settings.speed > 0.8) {
                    _this.video.nativeElement.playbackRate = _this.settings.speed;
                }
            }
            else {
                _this.textspeed.nativeElement.innerHTML = _this.video.nativeElement.playbackRate.toFixed(1);
            }
            // 볼륨을 지정했을 때
            if (_this.settings.volume != undefined) {
                _this.rangevolume.nativeElement.value = _this.settings.volume;
                _this.textvolume.nativeElement.innerHTML = (_this.video.settings.volume * 100) + '%';
            }
            else {
                _this.rangevolume.nativeElement.value = _this.video.nativeElement.volume;
                _this.textvolume.nativeElement.innerHTML = (_this.video.nativeElement.volume * 100) + '%';
            }
        };
        /**
         * 시작/종료 시간 설정
         */
        this.setStartEnd = function () {
            // 시작시간이 지정되었을 때
            if (_this.settings.startTime !== undefined) {
                var currentTime = _this.video.nativeElement.currentTime - _this.settings.startTime;
                _this.currenttime.nativeElement.innerHTML = _this.secondsToHms(Math.floor(currentTime)); // 현 재생시간
            }
            else {
                _this.currenttime.nativeElement.innerHTML = _this.secondsToHms(Math.floor(_this.video.nativeElement.currentTime));
            }
            // 종료시간이 지정되었을 때
            if (_this.settings.endTime !== undefined) {
                var endTime = _this.settings.endTime - _this.settings.startTime;
                _this.totaltime.nativeElement.innerHTML = _this.secondsToHms(Math.floor(endTime)); // 총 재생시간
            }
            else {
                _this.totaltime.nativeElement.innerHTML = _this.secondsToHms(Math.floor(_this.video.nativeElement.duration));
            }
        };
        /**
         * 재생중
         */
        this.playing = function () { };
        /**
         * 볼륨 조정
         */
        this.alterVolume = function (dir) {
            if (dir && !_this.isMiniview && !_this.isLock) {
                var currentVolume = Math.floor(_this.video.nativeElement.volume * 10) / 10;
                if (dir === '+') {
                    if (currentVolume < 1)
                        _this.video.nativeElement.volume += 0.1;
                }
                else if (dir === '-') {
                    if (currentVolume > 0)
                        _this.video.nativeElement.volume -= 0.1;
                }
            }
            _this.showVolume('show');
            _this.rangevolume.nativeElement.value = _this.video.nativeElement.volume;
            _this.textvolume.nativeElement.innerHTML = Math.floor(_this.video.nativeElement.volume * 100) + '%';
        };
        this.showVolume = function (dir) {
            if (dir) {
                if (dir === 'show') {
                    _this.volumecontrol.nativeElement.classList.add('active');
                }
                else if (dir === 'hide') {
                    _this.volumecontrol.nativeElement.classList.remove('active');
                }
            }
        };
        /**
         * 재생 일시정지
         */
        this.playpause = function () {
            if (_this.video.nativeElement.paused) {
                if (Math.floor(_this.settings.endTime) !== Math.floor(_this.video.nativeElement.currentTime)) {
                    _this.video.nativeElement.play();
                }
            }
            else {
                _this.video.nativeElement.pause();
            }
        };
        /**
         * 풀스크린
         */
        this.fullscreen = function () {
            _this.isFullscreen = !_this.isFullscreen;
            /*
            if(!this.isFullscreen){
                if (this.video.nativeElement.requestFullscreen) {
                    this.video.nativeElement.requestFullscreen();
                }
                else if (this.video.nativeElement['mozRequestFullScreen']) {
                    this.video.nativeElement['mozRequestFullScreen'](); // Firefox
                }
                else if (this.video.nativeElement.webkitRequestFullscreen) {
                    this.video.nativeElement.webkitRequestFullscreen(); // Chrome and Safari
                }
                this.isFullscreen = true;
            } else {
                if(document['cancelFullScreen']) {
                    document['cancelFullScreen']();
                }
                else if(document['mozCancelFullScreen']) {
                    document['mozCancelFullScreen']();
                }
                else if(document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
                this.isFullscreen = false;
            }
            */
        };
        /**
         * seek bar
         */
        this.changeSeek = function () {
            var time;
            // 시작시간, 종료시간이 지정되었을 때
            if (_this.settings.startTime !== undefined && _this.settings.endTime !== undefined) {
                time = _this.settings.startTime + (_this.settings.endTime - _this.settings.startTime) * (Number(_this.seek.nativeElement.value) / 100);
            }
            else {
                time = _this.video.nativeElement.duration * (Number(_this.seek.nativeElement.value) / 100);
            }
            // 구간반복 상태일때
            if (_this.isRepeat) {
                if (!_this.repeata) {
                    _this.repeata = time;
                    _this.seekrepeata.nativeElement.style.marginLeft = _this.seek.nativeElement.value + '%';
                    _this.seekrepeata.nativeElement.style.left = ((_this.seek.nativeElement.value / 100) - 13) + 'px';
                }
                else if (!_this.repeatb) {
                    _this.repeatb = time;
                    _this.seekrepeatb.nativeElement.style.marginLeft = _this.seek.nativeElement.value + '%';
                    _this.seekrepeatb.nativeElement.style.left = ((_this.seek.nativeElement.value / 100) - 13) + 'px';
                }
                _this.isRepeat = false;
            }
            _this.video.nativeElement.currentTime = time;
            //this.video.nativeElement.pause();
        };
        this.timeUpdate = function () {
            var value;
            // 시작시간, 종료시간이 지정되었을 때
            if (_this.settings.startTime !== undefined && _this.settings.endTime !== undefined) {
                // 지정된 종료시간에 도달하면 
                if (Math.floor(_this.settings.endTime) === Math.floor(_this.video.nativeElement.currentTime)) {
                    _this.video.nativeElement.pause();
                    //this.video.nativeElement.currentTime = this.settings.startTime;
                }
                value = 100 - (_this.settings.endTime - _this.video.nativeElement.currentTime) * (100 / (_this.settings.endTime - _this.settings.startTime));
                _this.seek.nativeElement.value = String(value);
            }
            else {
                value = (100 / (_this.settings.endTime || _this.video.nativeElement.duration)) * _this.video.nativeElement.currentTime;
                _this.seek.nativeElement.value = String(value);
            }
            // 시작시간이 지정되었을 때
            if (_this.settings.startTime !== undefined) {
                var currentTime = _this.video.nativeElement.currentTime - _this.settings.startTime;
                _this.currenttime.nativeElement.innerHTML = _this.secondsToHms(Math.floor(currentTime)); // 현 재생시간
            }
            else {
                _this.currenttime.nativeElement.innerHTML = _this.secondsToHms(Math.floor(_this.video.nativeElement.currentTime));
            }
            // 반복구간이 설정되었을 때
            if (_this.repeata && _this.repeatb) {
                if (Math.floor(_this.video.nativeElement.currentTime) == Math.floor(_this.repeatb)) {
                    _this.video.nativeElement.pause();
                    _this.video.nativeElement.currentTime = _this.repeata;
                    _this.video.nativeElement.play();
                }
            }
        };
        this.inputSeek = function () {
            var time;
            //시작시간, 종료시간이 지정되었을 때
            if (_this.settings.startTime !== undefined && _this.settings.endTime !== undefined) {
                time = _this.settings.startTime + (_this.settings.endTime - _this.settings.startTime) * (Number(_this.seek.nativeElement.value) / 100);
            }
            else {
                time = _this.video.nativeElement.duration * (Number(_this.seek.nativeElement.value) / 100);
            }
            _this.video.nativeElement.currentTime = time;
            // 라벨
            if (_this.settings.startTime !== undefined && _this.settings.endTime !== undefined) {
                var currentTime = _this.video.nativeElement.currentTime - _this.settings.startTime;
                _this.seeklabel.nativeElement.innerHTML = _this.secondsToHms(Math.floor(currentTime));
            }
            else {
                _this.seeklabel.nativeElement.innerHTML = _this.secondsToHms(Math.floor(time));
            }
            _this.seeklabel.nativeElement.classList.add('active');
        };
        this.mousedownSeek = function () {
            _this.video.nativeElement.pause();
        };
        this.mouseupSeek = function () {
            _this.video.nativeElement.play();
            _this.seeklabel.nativeElement.classList.remove('active');
        };
        /**
         * 구간 반복
         */
        this.repeat = function () {
            if (_this.repeata && _this.repeatb) {
                _this.repeata = null, _this.repeatb = null;
                _this.isRepeat = false;
                return false;
            }
            if (!_this.isRepeat) {
                if (_this.repeata && _this.repeatb) {
                    _this.video.nativeElement.currentTime = _this.repeata;
                }
                _this.isRepeat = true;
            }
        };
        /**
         * 영상 종료
         */
        this.ended = function () {
            _this.video.nativeElement.pause();
        };
        /**
         * 되감기/빨리감기
         */
        this.rewindForward = function (dir) {
            if (dir && !_this.isMiniview && !_this.isLock) {
                if (dir === '+') {
                    // 종료시간이 지정되었을 때
                    if (_this.settings.endTime !== undefined) {
                        if (_this.video.nativeElement.currentTime > _this.settings.endTime - 2) {
                            _this.video.nativeElement.currentTime = _this.settings.endTime;
                        }
                        else {
                            _this.video.nativeElement.currentTime += 2;
                        }
                    }
                    else {
                        _this.video.nativeElement.currentTime += 2;
                    }
                }
                else if (dir === '-') {
                    // 시작시간이 지정되었을 때
                    if (_this.settings.startTime !== undefined) {
                        if (_this.video.nativeElement.currentTime < _this.settings.startTime + 2) {
                            _this.video.nativeElement.currentTime = _this.settings.startTime;
                        }
                        else {
                            _this.video.nativeElement.currentTime -= 2;
                        }
                    }
                    else {
                        _this.video.nativeElement.currentTime -= 2;
                    }
                }
            }
        };
        /**
         * 미니뷰 사이즈 조절/이동(jQuery-ui)
         */
        this.dragResize = function () {
            $(_this.container.nativeElement).draggable({
                containment: "#main",
                disabled: true,
                scroll: false,
                snap: "#main",
                handle: ".myvideo"
            }).resizable({
                containment: "#main",
                aspectRatio: true,
                handles: "ne, se, sw, nw",
                minWidth: 150,
                disabled: true
            });
        };
        /**
         * 미니뷰
         */
        this.miniview = function () {
            // 잠금상태일때 동작 불가
            if (_this.isLock)
                return false;
            if (!_this.isMiniview) {
                $(_this.container.nativeElement).draggable("enable"); // 사이즈 조절/이동 가능(jQuery-ui)
                $(_this.container.nativeElement).resizable("enable");
                _this.isMiniview = true;
            }
            else {
                $(_this.container.nativeElement).draggable("disable"); // 사이즈 조절/이동 불가(jQuery-ui)
                $(_this.container.nativeElement).resizable("disable");
                _this.isMiniview = false;
            }
        };
        /**
         * 잠금
         */
        this.lock = function () {
            if (!_this.isLock) {
                _this.isLock = true;
            }
            else {
                _this.isLock = false;
            }
        };
        /**
         * 네비게이터
         */
        this.nav = function () {
            _this.isNav = !_this.isNav;
        };
        /**
         * 배속
         */
        this.alterPlayBackRate = function (dir) {
            if (dir) {
                var currentPlayBackRate = _this.video.nativeElement.playbackRate;
                if (dir === '+') {
                    if (currentPlayBackRate < 1.4)
                        _this.video.nativeElement.playbackRate += 0.2;
                }
                else if (dir === '-') {
                    if (currentPlayBackRate > 0.8)
                        _this.video.nativeElement.playbackRate -= 0.2;
                }
                _this.textspeed.nativeElement.innerHTML = _this.video.nativeElement.playbackRate.toFixed(1);
            }
        };
        /**
         * 캡처
         */
        this.capture = function () {
            var ratio = _this.video.nativeElement.videoWidth / _this.video.nativeElement.videoHeight;
            var w = _this.video.nativeElement.videoWidth; // 동영상 원본 사이즈
            var h = _this.video.nativeElement.videoHeight; // 동영상 원본 사이즈
            var context = _this.canvas.nativeElement.getContext("2d");
            _this.canvas.nativeElement.width = w;
            _this.canvas.nativeElement.height = h;
            context.fillRect(0, 0, w, h);
            context.drawImage(_this.video.nativeElement, 0, 0, w, h);
            _this.downloadcapture.nativeElement.click();
        };
        /**
         * 캡처 다운로드
         */
        this.downloadCanvas = function () {
            _this.downloadcapture.nativeElement.href = _this.canvas.nativeElement.toDataURL();
            _this.downloadcapture.nativeElement.download = "capture.png"; // 다운로드 이미지명
        };
        /**
         * 비디오 정보
         */
        this.getVideoInfo = function () {
        };
    }
    /**
     * 시분초 변환
     */
    PlayerComponent.prototype.secondsToHms = function (s) {
        var hours = Math.floor(s / 3600);
        var minutes = Math.floor((s - (hours * 3600)) / 60);
        var seconds = s - (hours * 3600) - (minutes * 60);
        var hms;
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (hours === '00')
            hms = minutes + ':' + seconds;
        else
            hms = hours + ':' + minutes + ':' + seconds;
        return hms;
    };
    PlayerComponent.prototype.HmsToSeconds = function (hms) {
        var a = hms.split(':');
        var s = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
        return s;
    };
    return PlayerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], PlayerComponent.prototype, "source", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], PlayerComponent.prototype, "subtitles", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PlayerComponent.prototype, "settings", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PlayerComponent.prototype, "movePage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PlayerComponent.prototype, "movieInfo", void 0);
__decorate([
    core_1.ViewChild('customVideo'),
    __metadata("design:type", Object)
], PlayerComponent.prototype, "container", void 0);
__decorate([
    core_1.ViewChild('myVideo'),
    __metadata("design:type", Object)
], PlayerComponent.prototype, "video", void 0);
__decorate([
    core_1.ViewChild('btnRepeat'),
    __metadata("design:type", Object)
], PlayerComponent.prototype, "repeatbutton", void 0);
__decorate([
    core_1.ViewChild('btnPlaypause'),
    __metadata("design:type", Object)
], PlayerComponent.prototype, "playbutton", void 0);
__decorate([
    core_1.ViewChild('btnFullscreen'),
    __metadata("design:type", Object)
], PlayerComponent.prototype, "fullscreenbutton", void 0);
__decorate([
    core_1.ViewChild('btnRewind'),
    __metadata("design:type", Object)
], PlayerComponent.prototype, "rewindbutton", void 0);
__decorate([
    core_1.ViewChild('btnForward'),
    __metadata("design:type", Object)
], PlayerComponent.prototype, "forwardbutton", void 0);
__decorate([
    core_1.ViewChild('btnSlower'),
    __metadata("design:type", Object)
], PlayerComponent.prototype, "slowerbutton", void 0);
__decorate([
    core_1.ViewChild('btnFaster'),
    __metadata("design:type", Object)
], PlayerComponent.prototype, "fasterbutton", void 0);
__decorate([
    core_1.ViewChild('btnMini'),
    __metadata("design:type", Object)
], PlayerComponent.prototype, "minibutton", void 0);
__decorate([
    core_1.ViewChild('btnCapture'),
    __metadata("design:type", Object)
], PlayerComponent.prototype, "capturebutton", void 0);
__decorate([
    core_1.ViewChild('btnLock'),
    __metadata("design:type", Object)
], PlayerComponent.prototype, "lockbutton", void 0);
__decorate([
    core_1.ViewChild('seekbar'),
    __metadata("design:type", Object)
], PlayerComponent.prototype, "seek", void 0);
__decorate([
    core_1.ViewChild('seekLabel'),
    __metadata("design:type", Object)
], PlayerComponent.prototype, "seeklabel", void 0);
__decorate([
    core_1.ViewChild('seekRepeatA'),
    __metadata("design:type", Object)
], PlayerComponent.prototype, "seekrepeata", void 0);
__decorate([
    core_1.ViewChild('seekRepeatB'),
    __metadata("design:type", Object)
], PlayerComponent.prototype, "seekrepeatb", void 0);
__decorate([
    core_1.ViewChild('currentTime'),
    __metadata("design:type", Object)
], PlayerComponent.prototype, "currenttime", void 0);
__decorate([
    core_1.ViewChild('totalTime'),
    __metadata("design:type", Object)
], PlayerComponent.prototype, "totaltime", void 0);
__decorate([
    core_1.ViewChild('canvas'),
    __metadata("design:type", Object)
], PlayerComponent.prototype, "canvas", void 0);
__decorate([
    core_1.ViewChild('canvasImage'),
    __metadata("design:type", Object)
], PlayerComponent.prototype, "downloadcapture", void 0);
__decorate([
    core_1.ViewChild('txtSpeed'),
    __metadata("design:type", Object)
], PlayerComponent.prototype, "textspeed", void 0);
__decorate([
    core_1.ViewChild('volumeCtrl'),
    __metadata("design:type", Object)
], PlayerComponent.prototype, "volumecontrol", void 0);
__decorate([
    core_1.ViewChild('txtVolume'),
    __metadata("design:type", Object)
], PlayerComponent.prototype, "textvolume", void 0);
__decorate([
    core_1.ViewChild('rangeVolume'),
    __metadata("design:type", Object)
], PlayerComponent.prototype, "rangevolume", void 0);
PlayerComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'player',
        templateUrl: 'player.component.html',
        styleUrls: ['player.component.css']
    }),
    __metadata("design:paramtypes", [])
], PlayerComponent);
exports.PlayerComponent = PlayerComponent;
//# sourceMappingURL=player.component.js.map