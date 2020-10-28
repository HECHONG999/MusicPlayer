( function (root) {
    function listControl(data, wrap) {
       
        var list = document.createElement("div"),
            dl = document.createElement("dl"),
            dt = document.createElement("dt"),
            close = document.createElement("div"),
            musicList = []; // 存储所有歌曲的dom，用于进行歌曲的切换

            list.className = "list";
            dt.innerHTML = "播放列表";
            close.className = "close";
            close.innerHTML = "关闭";

            dl.appendChild(dt);

            data.forEach( function (item, index) {
                var dd = document.createElement('dd');
                    dd.innerHTML = item.name;
                    dd.addEventListener('touchend', function () {
                        changeSelect(index);
                    })
                    dl.appendChild(dd); // 把dd添加到dl中

                    musicList.push(dd);
            });

            function slideUp () {
                list.style.transition = "0.2s";
                list.style.transform = 'translateY(0)'
            }
            function slideDown () {
                list.style.transition = "0.2s";
                list.style.transform = 'translateY(300px)'
            }
            close.addEventListener('touchend', function () {
                slideDown()
            })
            // 为选中的歌曲添加特定的样式
            function changeSelect(index)  {
                // for循环清楚所有的class类名
                for(var i = 0; i < musicList.length; i ++ ) {
                    musicList[i].className = ''
                }
                musicList[index].className = "active";
            }
            list.appendChild(dl);
            list.appendChild(close);
            wrap.appendChild(list);
            return {
                slideUp: slideUp,
                slideDown: slideDown,
                changeSelect: changeSelect,
                musicList: musicList,
                dom: list
            }
    }

    root.listControl = listControl; // 对window暴露listControl的接口;
})( window.player || ( window.player = {}))