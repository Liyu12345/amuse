	//截取参数
	function getQueryString(name) { 
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
		var r = window.location.search.substr(1).match(reg); 
		if (r != null) return unescape(r[2]); return null; 
	} 
	var page = getQueryString("page");//页码
	var type = getQueryString("type");//类型
	var id = getQueryString("id");//id
	var url = '';
	switch(type){
		case "10":
			url = 'img.html';
			break;
		case "29":
			url = 'parames.html';
			break;
		case "41":
			url = 'video.html';
			break;
		default:break;
	}
	var detailApp = angular.module('detailApp',['ionic','globalApp']);
	detailApp.controller('detailCon',function($scope,$http,httprequest){
		$scope.back = function(){
			window.history.go(-1)
		}
		$scope.name = 'controller'
	})

	detailApp.directive("detail",function($http,httprequest){
		return {
			restrict:'E',
			replace:true,
			link:function(scope, element, attrs){
				scope.data = [];
				httprequest.request(scope,$http,type,page,function(){
					for(var i=0;i<scope.data.length;i++){
						if(scope.data[i].id==id){
							scope.cur = scope.data[i];
							console.log(scope.cur)
							if(type==41){
								$("#myVideo")[0].src = scope.cur.video_uri;
							}
						}
					}
				})
			},
			templateUrl:url
		}
	});