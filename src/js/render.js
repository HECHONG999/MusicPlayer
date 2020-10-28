/**
 * 渲染功能，渲染图片，音乐信息，是否喜欢
 */
(function (root) {
    // 渲染歌曲封面
    function renderImg (src) {
        root.blurImg(src);  // 给rsc地址高斯模糊后给body添加背景图片
        var img = document.querySelector('.songImg img');
            img.src = src;  //添加封面图片
    }
    // 渲染歌曲信息
    function renderInfo (data) {
        var songInfoChild = document.querySelector('.songInfo').children
            songInfoChild[0].innerHTML = data.name;
            songInfoChild[1].innerHTML = data.singer;
            songInfoChild[2].innerHTML = data.album
    }
    /**
     * 渲染是否喜欢
     */
    function renderIsLike (isLike) {
        var lis = document.querySelectorAll('.control li')
            lis[0].className = isLike ? 'liking' : '';
    }

    root.render = function (data) {  // data为请求过来的数据，必须给
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);
    }

})( window.player || (window.player = {}) )