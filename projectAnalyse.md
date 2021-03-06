# Muisc Player
## 模块化开发
- 把项目的功能拆分成模块，每个模块提供对外访问的接口，并且要暴露给window对象，window是一个全局的对象
- 好处：独立，适合多人开发协作
- 思想：主要使用面向对象的思想进行开发

## 项目的功能
1. 封面图片展示，通过发送ajax网络请求获取来的，并且图片会根据当前歌曲的进度进行旋转，切换歌曲的时候图片改变
2. 图片的背景图片，采用了高斯模糊插件进行了处理
3. 歌曲信息的可视化
4. 进度条功能
5. 是否喜欢当前歌曲--根据用户数据决定
6. 歌曲控制
7. 播放列表的展示 

### 模块化开发
- 渲染模块
- 高斯模糊模块
- 音乐模块  -- 加载音乐，播放音乐，暂停模块
- 索引模块 -- 控制当前音乐的播放
- 列表切歌模块 -- 列表展开和收缩
- 进度条模块 -- 
- 整体控制模块


## 优化用户体验


### 渲染模块
- 写法：
     1. 立即执行函数，产生一个独立的作用域，函数内的变量和方法仅在该作用域内生效
     2. 对外暴露接口  
        1. 通过return返回
        2. 通过window作为window对象的一个属性进行挂载，使在外面能够访问到   ---- jquery整体的架构


### Audio模块 -- 项目的核心功能
- 写法: 面向对象的方式

### 开发的问题
- 问题: 
    1. this指向问题
    2. 切换歌曲的时候歌曲改变，但对应的歌曲封面没改变,控制歌曲播放，相应图片旋转的问题
        解决办法: 最后通过index索引模块的封装，对歌曲和封面切换一起进行改变

### 项目中遇到的难点
- 进度条模块的编写: 渲染时间和进度条渲染进度不一样
    1. 进度根据当前歌曲播放的时间不断的增加，但由于时间处理的不够精确，导致歌曲播放完后，进度条还没走到最后
        解决办法：```
                lastPerTime + (curTime  - startTime) / (duration * 1000)
                // 最后暂停播放的时间 + （ 每次animation帧开始的时间 - 开始的时间）/ 一个小的时间
                ````

### 开发项目的收获
- 更加深层次的理解了模块化开发的思想，并加以实践 
- 使用了面向对象的编程思想，更加深刻了理解了面向对象中的this指向问题
    1. this默认执行window，在严格模式下function 里this指向为undefined
    2. 









