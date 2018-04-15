/**
 * Created by heylau on 2018/4/13.
 */
(function () {
    var list = document.getElementsByClassName('c_list')[0];
    var maxY = 0;
    var minY = - (list.clientHeight - document.getElementsByClassName('c_left')[0].clientHeight);
    var buffer = 150;
    var item = list.getElementsByTagName('li');
    var selectedIndex = 0;
    for(var i=0;i<item.length;i++){
        item[i].index = i;

    }

    tool.addTapEvent(list,function (e) {
        var index = e.target.index;
        var scrollV = -index * e.target.clientHeight;
        item[selectedIndex].className = '';
        item[index].className = 'current';
        selectedIndex =index;
        if(scrollV > minY){
            addTransition();
            changeTranslateY(scrollV + 'px');
            currentY = scrollV;
        }else{
            changeTranslateY(minY+'px');
            currentY = minY;
        }

        document.getElementsByClassName('c_right')[0].style.opacity = 0;
        setTimeout(function () {
            document.getElementsByClassName('c_right')[0].style.opacity = 1;

        },200);
    });
    function addTransition() {
        list.style.transition = 'all 0.25s linear';
        list.style.webkitTransition = 'all 0.25s linear';
    }

    function changeTranslateY(y) {
        list.style.transform = 'translateY('+y+') ';
        list.style.webkitTransform = 'translateY('+y+') ';
    }

    function removeTranstion() {
        list.style.transition = 'none';
        list.style.webkitTransition = 'none';
    }

    var startY=0,distance=0,currentY=0;
    list.addEventListener('touchstart',function (e) {
        startY = e.touches[0].clientY;

    });

    list.addEventListener('touchmove',function (e) {
        distance = startY -  e.touches[0].clientY ;
        if((currentY - distance)<(maxY + buffer) &&(currentY-distance) > (minY - buffer)){
            removeTranstion();
            changeTranslateY(currentY - distance + 'px');
        }

    });

    list.addEventListener('touchend',function () {
        if(currentY - distance > maxY){
            addTransition();
            changeTranslateY(maxY);
            currentY = maxY;
        }else if(currentY - distance < minY){
            addTransition();
            changeTranslateY(minY+'px');
            currentY = minY;
        }else{
            currentY = currentY - distance;

        }
        startY=0;
        distance=0;


    });

   
})();