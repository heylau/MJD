/**
 * Created by heylau on 2018/4/13.
 */
    var tool = {
        addTapEvent : function(obj,callback) {
            if (typeof obj == 'object'){
                var time=0,isMove=false;
                obj.addEventListener('touchstart',function () {
                    time = new Date();
                } );

                obj.addEventListener('touchmove',function () {
                    isMove = true;
                } );

                obj.addEventListener('touchend',function (e) {
                    isMove=false;
                    if(new Date()-time < 200 && !isMove){
                        callback&&callback(e);
                    }
                } )
            }
        }
    };


