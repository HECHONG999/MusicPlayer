(function (root) {
    function AudioManage () {
        this.audio = new Audio();
        this.status = "pause";
        this.load()
    }
    AudioManage.prototype = {
        load (src) {
            this.audio.src = src;  // 设置音乐播放路径
            this.audio.load();  // 真正加载音乐播放的方法
        },
        play () {
            this.audio.play();
            this.status = "play"
        },
        pause () {
            this.audio.pause();
            this.status = "pause";
        },
        // 音乐播放完毕事件
        end (fn) {
            this.audio.ended = fn;
        },
        // 设置音乐跳转到指定播放时间
        playTo (time) {
            this.audio.currentTime = time; // 单位为秒
        }
    }
    root.music = new AudioManage();
})( window.player || (window.player = {}) )