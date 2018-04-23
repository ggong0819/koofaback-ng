import { Component, Input, ViewChild, ElementRef, Output } from '@angular/core';

declare var $:any;

interface Options {
    miniview?: boolean,
    repeat?: boolean,
    width?: number,
    height?: number,
    top?: number,
    left?: number,
    startTime?: number,
    endTime?: number,
    currentTime?: number
}

@Component({
    moduleId: module.id,
    selector: 'player',
    templateUrl: 'player.component.html',
    styleUrls: ['player.component.css']
})

export class PlayerComponent {
    
    @Input() source: string;    // 영상 소스
    @Input() subtitles: string; // 자막
    @Input() settings: any;     // 옵션
    /*
    settings = {
        miniview: true,
        width: 300,
        height: 150,
        top: 0,
        left: 0,
        startTime: 30,
        endTime: 45,
        currentTime: 5,
    }
    */
    @Input() movePage: any;  // 페이지 이동
    @Input() movieInfo: any; // 강의데이타

    // selector
    @ViewChild('customVideo') container: any;
    @ViewChild('myVideo') video: any;
    @ViewChild('btnRepeat') repeatbutton: any;
    @ViewChild('btnPlaypause') playbutton: any;
    @ViewChild('btnFullscreen') fullscreenbutton: any;
    @ViewChild('btnRewind') rewindbutton: any;
    @ViewChild('btnForward') forwardbutton: any;
    @ViewChild('btnSlower') slowerbutton: any;
    @ViewChild('btnFaster') fasterbutton: any;
    @ViewChild('btnMini') minibutton: any;
    @ViewChild('btnCapture') capturebutton: any;
    @ViewChild('btnLock') lockbutton: any;
    @ViewChild('seekbar') seek: any;
    @ViewChild('seekLabel') seeklabel: any;
    @ViewChild('seekRepeatA') seekrepeata: any;
    @ViewChild('seekRepeatB') seekrepeatb: any;
    @ViewChild('currentTime') currenttime: any;
    @ViewChild('totalTime') totaltime: any;
    @ViewChild('canvas') canvas: any;
    @ViewChild('canvasImage') downloadcapture: any;
    @ViewChild('txtSpeed') textspeed: any;
    @ViewChild('volumeCtrl') volumecontrol: any;
    @ViewChild('txtVolume') textvolume: any;
    @ViewChild('rangeVolume') rangevolume: any;

    // player status
    private isFullscreen: boolean = false;
    private isMiniview: boolean = false;
    private isLock: boolean = false;
    private isRepeat: boolean = false;
    private isNav: boolean = false;
    private repeata: any = null;
    private repeatb: any = null;
    
    constructor() {}

    /**
     * 메타데이타 로드
     */
    private loadmetadata = () => {
        this.init();
        this.setOptions(this.settings);
    }

    /**
     * 초기화
     */
    private init = () => {
        // 자동 재생
        if(this.video.nativeElement.autoplay){}
        
        this.dragResize(); // 미니뷰 사이즈 조절/이동(jQuery-ui)
    }

    /**
     * 사용자 설정 변경
     */
    public setOptions = (options: Options) => {
        // 사용자 설정 값 세팅
        this.settings = options;

        // 시작, 종료시간이 지정되었을 때
        if(this.settings.startTime !== undefined && this.settings.endTime !== undefined) {
            this.video.nativeElement.pause();
            this.video.nativeElement.currentTime = this.settings.startTime;
            this.setStartEnd();
        } else {
            this.video.nativeElement.currentTime = 0;
            this.video.nativeElement.pause();
            this.setStartEnd();
        }

        // 미니뷰로 지정했을 때
        if(this.settings.miniview) {
            this.isMiniview = false;
            this.miniview();
        }

        // 현 재생시간을 지정했을 때
        if(this.settings.currentTime != undefined) {
            // 시작, 종료시간이 지정되었을 때
            if(this.settings.startTime !== undefined && this.settings.endTime !== undefined) {
                this.video.nativeElement.currentTime = this.settings.startTime + this.settings.currentTime;
            } else {
                this.video.nativeElement.currentTime = this.settings.currentTime;
            }
        }
        
        // 배속을 지정했을 때
        if(this.settings.speed != undefined) {
            if(this.settings.speed < 1.4 && this.settings.speed > 0.8) {
                this.video.nativeElement.playbackRate = this.settings.speed;
            }
        } else {
            this.textspeed.nativeElement.innerHTML = this.video.nativeElement.playbackRate.toFixed(1);
        }

        // 볼륨을 지정했을 때
        if(this.settings.volume != undefined) {
            this.rangevolume.nativeElement.value = this.settings.volume;
            this.textvolume.nativeElement.innerHTML = (this.video.settings.volume * 100) + '%';
        } else {
            this.rangevolume.nativeElement.value = this.video.nativeElement.volume;
            this.textvolume.nativeElement.innerHTML = (this.video.nativeElement.volume * 100) + '%';
        }
    }
    
    /**
     * 시작/종료 시간 설정
     */
    private setStartEnd = () => {
        // 시작시간이 지정되었을 때
        if(this.settings.startTime !== undefined){
            let currentTime = this.video.nativeElement.currentTime - this.settings.startTime;
            this.currenttime.nativeElement.innerHTML = this.secondsToHms( Math.floor(currentTime) ); // 현 재생시간
        } else {
            this.currenttime.nativeElement.innerHTML = this.secondsToHms( Math.floor(this.video.nativeElement.currentTime) );
        }
        
        // 종료시간이 지정되었을 때
        if(this.settings.endTime !== undefined) {
            let endTime = this.settings.endTime - this.settings.startTime;
            this.totaltime.nativeElement.innerHTML = this.secondsToHms( Math.floor(endTime) ); // 총 재생시간
        } else {
            this.totaltime.nativeElement.innerHTML = this.secondsToHms( Math.floor(this.video.nativeElement.duration) );
        }
    }
    
    /**
     * 시분초 변환
     */
    private secondsToHms(s: number) {
        let hours: any   = Math.floor(s / 3600);
        let minutes: any = Math.floor((s - (hours * 3600)) / 60);
        let seconds: any = s - (hours * 3600) - (minutes * 60);
        let hms: string;

        if(hours   < 10) { hours   = "0" + hours; }
        if(minutes < 10) { minutes = "0" + minutes; }
        if(seconds < 10) { seconds = "0" + seconds; }

        if(hours === '00') hms = minutes + ':' + seconds;
        else hms = hours + ':' + minutes + ':' + seconds;
        
        return hms;
    }
    private HmsToSeconds(hms: string) {
        var a = hms.split(':');
        var s = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 

        return s;
    }

    /**
     * 재생중
     */
    private playing = () => {}

    /**
     * 볼륨 조정
     */
    private alterVolume = (dir: string) => {
        if(dir && !this.isMiniview && !this.isLock) {
            var currentVolume = Math.floor(this.video.nativeElement.volume * 10) / 10;
            if(dir === '+') {
                if(currentVolume < 1) this.video.nativeElement.volume += 0.1;
            } else if(dir === '-') {
                if(currentVolume > 0) this.video.nativeElement.volume -= 0.1;
            }
        }
        this.showVolume('show');
        this.rangevolume.nativeElement.value = this.video.nativeElement.volume;
        this.textvolume.nativeElement.innerHTML = Math.floor(this.video.nativeElement.volume * 100) + '%';
    }
    private showVolume = (dir: string) => {
        if(dir) {
            if(dir === 'show') {
                this.volumecontrol.nativeElement.classList.add('active');
            } else if(dir === 'hide') {
                this.volumecontrol.nativeElement.classList.remove('active');
            }
        }
    }

    /**
     * 재생 일시정지
     */
    private playpause = () => {
        if(this.video.nativeElement.paused){
            if( Math.floor(this.settings.endTime) !== Math.floor(this.video.nativeElement.currentTime) ) {
                this.video.nativeElement.play();
            }
        }
        else{
            this.video.nativeElement.pause();
        }
    }

    /**
     * 풀스크린
     */
    private fullscreen = () => {
        this.isFullscreen = !this.isFullscreen;
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
    }

    /**
     * seek bar
     */
    private changeSeek = () => {
        let time: number;
        // 시작시간, 종료시간이 지정되었을 때
        if(this.settings.startTime !== undefined && this.settings.endTime !== undefined) {
            time = this.settings.startTime + (this.settings.endTime - this.settings.startTime) * (Number(this.seek.nativeElement.value) / 100);
        }else{
            time = this.video.nativeElement.duration * (Number(this.seek.nativeElement.value) / 100);
        }

        // 구간반복 상태일때
        if(this.isRepeat) {
            if(!this.repeata) {
                this.repeata = time;
                this.seekrepeata.nativeElement.style.marginLeft = this.seek.nativeElement.value + '%';
                this.seekrepeata.nativeElement.style.left = ((this.seek.nativeElement.value / 100) - 13) + 'px';
            }else if(!this.repeatb) {
                this.repeatb = time;
                this.seekrepeatb.nativeElement.style.marginLeft = this.seek.nativeElement.value + '%';
                this.seekrepeatb.nativeElement.style.left = ((this.seek.nativeElement.value / 100) - 13) + 'px';
            }
            this.isRepeat = false;
        }

        this.video.nativeElement.currentTime = time;
        //this.video.nativeElement.pause();
    }
    private timeUpdate = () => {
        let value: number;
        // 시작시간, 종료시간이 지정되었을 때
        if(this.settings.startTime !== undefined && this.settings.endTime !== undefined) {
            // 지정된 종료시간에 도달하면 
            if( Math.floor(this.settings.endTime) === Math.floor(this.video.nativeElement.currentTime) ) {
                this.video.nativeElement.pause();
                //this.video.nativeElement.currentTime = this.settings.startTime;
            }
            value = 100 - (this.settings.endTime - this.video.nativeElement.currentTime ) * (100 / (this.settings.endTime - this.settings.startTime ));
            this.seek.nativeElement.value = String(value);
        }else{
            value = ( 100 / (this.settings.endTime || this.video.nativeElement.duration) ) * this.video.nativeElement.currentTime;
            this.seek.nativeElement.value = String(value);
        }
        
        // 시작시간이 지정되었을 때
        if(this.settings.startTime !== undefined){
            let currentTime = this.video.nativeElement.currentTime - this.settings.startTime;
            this.currenttime.nativeElement.innerHTML = this.secondsToHms( Math.floor(currentTime) ); // 현 재생시간
        } else {
            this.currenttime.nativeElement.innerHTML = this.secondsToHms( Math.floor(this.video.nativeElement.currentTime) );
        }

        // 반복구간이 설정되었을 때
        if(this.repeata && this.repeatb) {
            if( Math.floor(this.video.nativeElement.currentTime) == Math.floor(this.repeatb) ) {
                this.video.nativeElement.pause();
                this.video.nativeElement.currentTime = this.repeata;
                this.video.nativeElement.play();
            }
        }
    }
    private inputSeek = () => {
        let time: number;

        //시작시간, 종료시간이 지정되었을 때
        if(this.settings.startTime !== undefined && this.settings.endTime !== undefined) {
            time = this.settings.startTime + (this.settings.endTime - this.settings.startTime) * (Number(this.seek.nativeElement.value) / 100);
        }else{
            time = this.video.nativeElement.duration * (Number(this.seek.nativeElement.value) / 100);
        }

        this.video.nativeElement.currentTime = time;

        // 라벨
        if(this.settings.startTime !== undefined && this.settings.endTime !== undefined) {
            let currentTime = this.video.nativeElement.currentTime - this.settings.startTime;
            this.seeklabel.nativeElement.innerHTML = this.secondsToHms(Math.floor(currentTime));
        } else {
            this.seeklabel.nativeElement.innerHTML = this.secondsToHms(Math.floor(time));
        }

        this.seeklabel.nativeElement.classList.add('active');
        
    }
    private mousedownSeek = () => {
        this.video.nativeElement.pause();
    }
    private mouseupSeek = () => {
        this.video.nativeElement.play();
        this.seeklabel.nativeElement.classList.remove('active');
    }

    /**
     * 구간 반복
     */
    private repeat = () => {
        if(this.repeata && this.repeatb) {
            this.repeata = null, this.repeatb = null;
            this.isRepeat = false;
            return false;
        }

        if(!this.isRepeat) {
            if(this.repeata && this.repeatb) {
                this.video.nativeElement.currentTime = this.repeata;
            }
            this.isRepeat = true;
        }
    }

    /**
     * 영상 종료
     */
    private ended = () => {
        this.video.nativeElement.pause();
    }

    /**
     * 되감기/빨리감기
     */
    private rewindForward = (dir: string) =>  {
        if(dir && !this.isMiniview && !this.isLock) {
            if(dir === '+') {
                // 종료시간이 지정되었을 때
                if(this.settings.endTime !== undefined) {
                    if(this.video.nativeElement.currentTime > this.settings.endTime - 2) {
                        this.video.nativeElement.currentTime = this.settings.endTime;
                    }else{
                        this.video.nativeElement.currentTime += 2;
                    }
                }else{
                    this.video.nativeElement.currentTime += 2;
                }
            }else if(dir === '-') {
                // 시작시간이 지정되었을 때
                if(this.settings.startTime !== undefined) {
                    if(this.video.nativeElement.currentTime < this.settings.startTime + 2) {
                        this.video.nativeElement.currentTime = this.settings.startTime;
                    }else{
                        this.video.nativeElement.currentTime -= 2;
                    }
                }else{
                    this.video.nativeElement.currentTime -= 2;
                }
            }
        }
    }

    /**
     * 미니뷰 사이즈 조절/이동(jQuery-ui)
     */
    private dragResize = () => {
        $(this.container.nativeElement).draggable({
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
    }

    /**
     * 미니뷰
     */
    private miniview = () => {
        // 잠금상태일때 동작 불가
        if(this.isLock) return false;
        if(!this.isMiniview){
            $(this.container.nativeElement).draggable("enable"); // 사이즈 조절/이동 가능(jQuery-ui)
            $(this.container.nativeElement).resizable("enable");
            this.isMiniview = true;
        }else{
            $(this.container.nativeElement).draggable("disable"); // 사이즈 조절/이동 불가(jQuery-ui)
            $(this.container.nativeElement).resizable("disable");
            this.isMiniview = false;
        }
    }

    /**
     * 잠금
     */
    private lock = () => {
        if(!this.isLock){
            this.isLock = true;
        }
        else{
            this.isLock = false;
        }
    }

    /**
     * 네비게이터
     */
    private nav = () => {
        this.isNav = !this.isNav;
    }

    /**
     * 배속
     */
    private alterPlayBackRate = (dir: string) => {
        if(dir) {
            let currentPlayBackRate = this.video.nativeElement.playbackRate;
            if(dir === '+') {
                if(currentPlayBackRate < 1.4) this.video.nativeElement.playbackRate += 0.2;
            }else if(dir === '-') {
                if(currentPlayBackRate > 0.8) this.video.nativeElement.playbackRate -= 0.2;
            }
            this.textspeed.nativeElement.innerHTML = this.video.nativeElement.playbackRate.toFixed(1);
        }
    }

    /**
     * 캡처
     */
    private capture = () => {
        var ratio = this.video.nativeElement.videoWidth / this.video.nativeElement.videoHeight;
        var w = this.video.nativeElement.videoWidth; // 동영상 원본 사이즈
        var h = this.video.nativeElement.videoHeight; // 동영상 원본 사이즈
        var context = this.canvas.nativeElement.getContext("2d");

        this.canvas.nativeElement.width = w;
        this.canvas.nativeElement.height = h;

        context.fillRect(0, 0, w, h);
        context.drawImage(this.video.nativeElement, 0, 0, w, h);

        this.downloadcapture.nativeElement.click();
    }

    /**
     * 캡처 다운로드
     */
    private downloadCanvas = () => {
        this.downloadcapture.nativeElement.href = this.canvas.nativeElement.toDataURL();
        this.downloadcapture.nativeElement.download = "capture.png"; // 다운로드 이미지명
    }

    /**
     * 비디오 정보
     */
    private getVideoInfo = () => {
        
    }
}