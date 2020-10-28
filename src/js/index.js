(function ($, player) {
	function MusicPlayer(dom) {
		this.wrap = dom; // 播放的容器（用于加载ListControl）
		this.dataList = []; // 存储请求的数据
		this.curIndex =  0;   // curIndex在每一次列表切歌后改变
		this.rotateTimer  = null; // 旋转定时器
		this.indexObj = null;
	}

	MusicPlayer.prototype  = {
		init () {
			this.getDom(); // 获取dom元素
			this.getData('../mock/data.json');
			this.bindTouch()
		},
		// 获取dom元素
		getDom () {
			this.record = document.querySelector('.songImg img'); // 获取到旋转的图片
			this.controlBtns = document.querySelectorAll('.control li'); // 获取底部导航栏的按钮
		},
		/**
		 * 发送网络请求获取数据
		 * @param {*} url 
		 */
		getData (url) {
			var self = this;
			$.ajax({
				url: url,
				method: 'get',
				success: function (data) {
					self.dataList = data;
					self.listPlay();

					self.loadMusic(self.curIndex);      		// 调用加载音乐模块
					player.pro.renderAllTime(self.dataList[self.curIndex].duration)
					self.indexObj = new player.indexControl(data.length);  
					self.musicControl();
				},
				error: function () {
					console.log("数据请求去失败")
				}
			})
		},
		loadMusic (index) {  									// 加载音乐
			player.render(this.dataList[index]);   				// 渲染当前歌曲的信息
			player.music.load(this.dataList[index].audioSrc);  // 根据当前歌曲索引 加载当前播放的歌曲
			
			if( player.music.status == "play" ) {			 //判断当前音乐为播放状态时才进行音乐播放
				player.music.play();
				this.imgRotote(0);
				this.controlBtns[2].className = "playing";   //设置class值 改变播放按钮的状态
			}
			this.list.changeSelect(index)
			this.curIndex = index;
		},
		/**
		 * 控制播放的音乐
		 */
		musicControl () {
			var self = this;
			// 上一首
			this.controlBtns[1].addEventListener("touchend", function () {
				player.music.status = "play";
				self.loadMusic(	self.indexObj.get(-1) );
				player.pro.start(0)
			})
			// 暂停 / 播放音乐
			this.controlBtns[2].addEventListener("touchend", function () {
				if(player.music.status == "play") {  				 // 当前歌曲为播放状态，点击之后暂停
					player.music.pause(); 	
					
					self.imgStop();						// 暂停播放当前音乐
					player.music.status = "pause";
					this.className = ''
				}else {
					player.music.play(); 
					var deg = self.record.dataset.rotate || 0;
					self.imgRotote(deg)
					player.music.status = "play";
					this.className = 'playing';
				}
			})
			// 下一首
			this.controlBtns[3].addEventListener("touchend", function () {
				player.music.status = 'play';
				
				self.loadMusic(self.indexObj.get(1));				
			})
		},
		imgRotote (deg) {
			var self = this;
			clearInterval(this.rotateTimer)
			this.rotateTimer = setInterval(function () {
				deg = +deg + 0.2;  // +显示转为为数字
				self.record.style.transform = 'rotate(' + deg +'deg)';
				self.record.dataset.rotate = deg;  // 保存当前已经旋转了的角度
			}, 1000/60)
		},
		imgStop () {
			clearInterval(this.rotateTimer)
		},
		/**
		 * 列表切歌
		 */
		listPlay () {
			var self = this;
			this.list = player.listControl(this.dataList, this.wrap, this.cur);  // 列表切歌模块接口
			this.controlBtns[4].addEventListener("touchend", function () {      // 歌曲列表事件监听
				self.list.slideUp();
			})
			this.list.musicList.forEach(function (item, index) {
				item.addEventListener("touchend", function () {
					if(index == self.curIndex)  return;
					player.music.status = "play"; 				// 设置音乐播放状态
					self.loadMusic(index);						// 根据歌曲索引加载要播放的音乐
					self.list.slideDown()
				})
			})
		},
		/**
		 * 绑定点击事件
		 */
		bindTouch () {
			var self = this;
			var backBgDom = document.getElementsByClassName("backBg")[0]
			var offsetWidth = backBgDom.offsetWidth;  // 获取到元素的宽度
			var offsetLeft = backBgDom.offsetLeft; 	 // 获取到元素的距离父级的偏移距离
			// this.loadMusic(this.curIndex)
			var circleDom = document.getElementsByClassName("circle")[0];
				circleDom.addEventListener('touchstart', function (e) {
					var clientStart = e.changedTouches[0].clientX;

					console.log(offsetLeft, offsetWidth,clientStart, " ________")

					player.pro.stop();
					circleDom.addEventListener('touchmove', function (e) {
						var clientMove = e.changedTouches[0].clientX;
						console.log(clientMove, "+++++++")
						var per =	( clientMove - offsetLeft - clientStart ) / offsetWidth;
						
						if(per > 0 && per < 1) {
							player.pro.update(per);
						}
						circleDom.addEventListener('touchend', function (e) {
							var clientEnd = e.changedTouches[0].clientX;	
							
							var per = ( clientEnd - offsetLeft - clientStart ) / offsetWidth;
							if(per > 0 && per < 1) {
								var cutTime = per * self.dataList[self.curIndex].duration;
									self.controlBtns[2].className = "playing";
									player.music.playTo(cutTime);
									player.music.status = "play";
									player.music.play();
									player.pro.start(per);
							}
							// clientStart = clientEnd 
						})
					})
				})
		}
	}
	
	var musicPlayer = new MusicPlayer(document.getElementById('wrap'));
		musicPlayer.init();
})(window.Zepto, window.player)