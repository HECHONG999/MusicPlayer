(function ( $, root) {
    var duration,
        frameId,
        startTime, lastPerTime = 0;
    function renderAllTime (time) {
        duration = time;
        time = formatTime(time);
        $('.totalTime').html(time)
    }

    function formatTime(time) {
        time = Math.round(time);
        var minute = Math.floor(time / 60);
        var second = time - minute * 60;
            minute = minute < 10 ? "0" + minute : minute;
            second = second < 10 ? "0" + second : second;
        return minute + ':' + second;
    }
    function start(p) {
        lastPerTime = p == undefined ? lastPerTime : p;
        cancelAnimationFrame(frameId)
        startTime = new Date().getTime();
        function frame() {
            var curTime = new Date().getTime();
            var per  = lastPerTime + (curTime  - startTime) / (duration * 1000);
            // console.log(per);
            if( per <= 1) {
                update(per);
            } else {
                cancelAnimationFrame(frameId);
            }
            frameId = requestAnimationFrame(frame)
        }
        frame()
    }

    function update(per) {
        var time = formatTime(per * duration);
        $(".curTime").html(time);
        var perX = 100 + (per - 1 ) * 100  + "%";
        $('.frontBg')
        .css({
            width: perX
        })

        var pero = (100 + (per - 1 ) * 100 ) - 4 + "%";
        $('.circle').css({
            left: pero
        })
    }

    function stop() {
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        lastTime = lastPerTime + (stopTime - startTime) /(duration * 1000);

    }
    root.pro = {
        renderAllTime: renderAllTime,
        start: start,
        stop: stop,
        update: update
    }
})( window.Zepto,window.player || (window.player = {}))