var globalApp = angular.module('globalApp',[])
	globalApp.controller("globalCon",function($scope,$http){
       
    })
    globalApp.service('httprequest',function(){//http请求
        if ($('.mask')[0] && $('.mask').is(':hidden')) {
            $('.mask').show();
        } else {
            $('<div class="mask"></div>').appendTo('body');
        }
        this.response = '';
        this.request = function($scope,$http,type,page,fn){
            $http({
                url:'http://route.showapi.com/255-1',
                method:'post',
                dataType: "jsonp",
                params:{
                    'showapi_appid':'26944',
                    'showapi_sign':'77f913d39ded445896315a1fc6426c76',
                    //title:'小蓝',
                    page:page,
                    type:type,
                    maxResult: 20
                }
            }).success(function(data){
                $('.mask').hide();
                this.response = data.showapi_res_body.pagebean.contentlist;
                if(page == 1){
                    $scope.data = this.response;
                }else{
                    for(var i=0;i<this.response.length;i++){
                        $scope.data.push(this.response[i])
                    }
                }
                    
                if(type==31){//音乐初始化
                    $scope.cur_image = $scope.data[0].image3?$scope.data[0].image3:$scope.data[0].image0;
                    $scope.cur_name = $scope.data[0].name;
                    $("#ado")[0].src = $scope.data[0].voiceuri?$scope.data[0].voiceuri:$scope.data[0].voice_uri;
                    $scope.data[0].play = true;
                }
                if(fn){
                    fn()
                }
                //console.log( $scope.data)
            })
        }
        return this.response;
    })

    globalApp.directive('dick',function(){
        return{
            link:function(scope,element,attrs){
                scope.name = 'global_dir'
                console.log(scope)
            }
        }
    })
 
 