(function (root) {
    function indexManeger (len) {
        this.index = 0; // 当前得索引值
        this.len = len; // 数据的长度 , 用于判断
    }
    
    indexManeger.prototype = {
        prev () {
           return this.get(-1);
        },
        next () {
           return this.get(1)
        },
        get (val) {
           this.index = (this.index + val + this.len) % this.len;
           return this.index;
       }
   }
    root.indexControl = indexManeger; // 导出一个构造函数，需要对外暴露传参接口，所以不能暴露实例对象
})(window.player || (window.player = {}))

// 解放碑 11 13  春秋航空