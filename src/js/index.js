var app = angular.module('music',['ionic','globalApp']);
	app.controller('music_con',function($scope,$http,mousic_operate,$ionicSideMenuDelegate,$ionicSlideBoxDelegate){
		$scope.cur_image = "";//记录当前歌曲头像
		$scope.curSong = '';//记录当前歌曲url
		$scope.cur_name = '';//记录当前播放歌曲名
		$scope.pause = $("#ado")[0].paused//记录当前歌曲播放状态
		$scope.index = 0;//记录当前歌曲下标
		$scope.mask = true;//这罩层
		$scope.music_chonnel = true;//控制音乐播放器
		mousic_operate.requestMusic($http,$scope);

		$scope.playCur = function(index,x){//点歌
			mousic_operate.broadcast($scope,index);
		} 
		$scope.operate = function(event){//播放操作
			switch (event.target.id){
				// case "progress":mousic_operate.progress($scope); break;
				 case "back":mousic_operate.back($scope); break;
				 case "pause":mousic_operate.pause($scope); break;
				 case "forward":mousic_operate.forward($scope); break;
				 case "volumn":mousic_operate.volumn($scope); break; 
				 default:break;
			}
		}
		$scope.toggleLeft = function() {//侧边栏
		    $ionicSideMenuDelegate.toggleLeft();
		 };

		 $(".baseSide").hide().eq(0).show() //频道转换
		 $scope.changeCurChannel = function(event){
		 	if($(event.target).index()==0){
		 		$scope.music_chonnel = true;
		 	}else{
		 		$scope.music_chonnel = false;
		 	}
		 	$('.bar .button-bar .button').removeClass('active');
		 	$(event.target).addClass('active');
		 	$(".baseSide").hide().eq($(event.target).index()).show()
		 }

		 $scope.search = false; //搜索显示
		 $scope.mysearch = function(){
		 	$scope.search = !$scope.search;
		 }
	})

	//播放操作
	app.factory("mousic_operate",function(httprequest){//操作音乐播放
		var obj = {};
			obj.requestMusic = function($http,$scope){//请求音乐
				$scope.data = '';
				$scope.page = 1;
				httprequest.request($scope,$http,31,$scope.page);
				$(".baseSide").eq(0).scroll(function(){
					var win = $(window).height();
					var allHeight = $(this).children('.myscroll').height();
					var scrollTop = $(this).scrollTop();
					if(win+scrollTop == allHeight+2){
						$scope.page = $scope.page + 1;
						console.log($scope.page)
						httprequest.request($scope,$http,31,$scope.page);
					}
					//console.log("win"+win + "allHeight"+allHeight+"scrollTop"+scrollTop) 
				})
				
			}
			obj.pause = function(scope){//暂停播放
				if($("#ado")[0].paused){
					$("#ado")[0].play();
				}else{
					$("#ado")[0].pause();
				};
				scope.pause = !scope.pause;
			}
			obj.forward = function(scope){//后退
				var index = parseInt(scope.index) + 1;
				obj.broadcast(scope,index)
			}
			obj.back = function(scope){//前进
				if(parseInt(scope.index)==0){
					var index = scope.data.length -1;
				}else{
					var index = parseInt(scope.index) - 1;
				}
				obj.broadcast(scope,index)
			}
			obj.volumn = function(){
				if ($("#volumn input[type='range']").is(':hidden')) {
					$("#volumn input[type='range']").show(500);
				}else{
					$("#volumn input[type='range']").hide(500);
				}
				
				$("#volumn input[type='range']").change(function(){
					$("#ado")[0].volume = $(this).val()/100;
				});
			}
			obj.broadcast = function($scope,n){
				$.each($scope.data,function(index,element){
					element.play = false;
				})
				$scope.data[n].play = true;//x播放改变列表样式
				$scope.cur_image = $scope.data[n].image3?$scope.data[n].image3:$scope.data[n].image0;//图片
				$scope.curSong = $scope.data[n].voiceuri?$scope.data[n].voiceuri:$scope.data[n].voice_uri;
				$("#ado")[0].src = $scope.curSong;
				$("#ado")[0].play();//当前音乐播放
				$scope.cur_name = $scope.data[n].name;//音乐name
				$scope.index = n;
			}
			return obj;
	});
	
	app.controller('programme',function($scope,$http,httprequest){//段子控制器
		$scope.data = '';
		$scope.page = 1;
		httprequest.request($scope,$http,29,$scope.page);
		$(".baseSide").eq(1).scroll(function(){
			var win = $(window).height();
			var allHeight = $(this).children('.myscroll').height();
			var scrollTop = $(this).scrollTop();
			if(win+scrollTop >= allHeight+46){
				$scope.page = $scope.page + 1;
				console.log($scope.page)
				httprequest.request($scope,$http,29,$scope.page);
			}
			//console.log("win"+win + "allHeight"+allHeight+"scrollTop"+scrollTop) 
		})
		$scope.showProgramDetail = function(x){
			window.location.href = 'detail.html?page='+$scope.page+'&type='+x.type+'&id='+x.id;
		}
	});
	app.controller('image',function($scope,$http,httprequest){//图片
		$scope.data = '';
		$scope.page = 1;
		httprequest.request($scope,$http,10,1);
		$(".baseSide").eq(2).scroll(function(){
			var win = $(window).height();
			var allHeight = $(this).children('.myscroll').height();
			var scrollTop = $(this).scrollTop();
			if(win+scrollTop >= allHeight+20){
				$scope.page = $scope.page + 1;
				console.log($scope.page)
				httprequest.request($scope,$http,10,$scope.page);
			}
			//console.log("win"+win + "allHeight"+allHeight+"scrollTop"+scrollTop) 
		})
		$scope.showImgDetail = function(x){
			window.location.href = 'detail.html?page='+$scope.page+'&type='+x.type+'&id='+x.id;
		}
	});
	app.controller('video',function($scope,$http,httprequest){//视频
		$scope.data = '';
		$scope.page = 1;
		httprequest.request($scope,$http,41,1);
		$(".baseSide").eq(3).scroll(function(){
			var win = $(window).height();
			var allHeight = $(this).children('.myscroll').height();
			var scrollTop = $(this).scrollTop();
			if(win+scrollTop == allHeight-1){
				$scope.page = $scope.page + 1;
				console.log($scope.page)
				httprequest.request($scope,$http,41,$scope.page);
			}
			//console.log("win"+win + "allHeight"+allHeight+"scrollTop"+scrollTop) 
		})
		$scope.showVerdioDetail = function(x){
			window.location.href = 'detail.html?page='+$scope.page+'&type='+x.type+'&id='+x.id;
		}
	});


	$(function(){
		$("#ado")[0].ontimeupdate = function(){//播放时间发生变化时执行的函数
			$("#progress input[type='range']").attr('max',$("#ado")[0].duration)
			$("#progress input[type='range']").val($("#ado")[0].currentTime )
		};
		$("#progress input[type='range']").change(function(){
			$("#ado")[0].currentTime = $(this).val()
			console.log($(this).val())
		});
	})
