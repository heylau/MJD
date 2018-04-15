/**
 * Created by heylau on 2018/4/12.
 */

window.onload = function () {
    headerOpacity();
    bannerScroll();
    secKill();
    document.getElementsByClassName('categoryBtn')[0].onclick=function () {
        window.onscroll = null;
        document.getElementById('jd_box').removeChild(document.getElementById('jd_header'));
        document.getElementById('jd_box').removeChild(document.getElementById('main'));
    };

   
    

};

function headerOpacity() {
    var header = document.getElementById('jd_header');
    var bannerH = document.getElementsByClassName('jd_banner')[0].offsetHeight;
    var scrollT = 0;

    var value = 0;
    window.onscroll = function () {
       scrollT = document.documentElement.scrollTop ||  document.body.scrollTop;
        if(scrollT < bannerH){
            value = scrollT/ bannerH * 0.85;
        }else{
            value = 0.85
        }
        header.style.background = 'rgba(201, 21, 35, '+ value +')';

    };

}

function bannerScroll() {
    var timer=0,index=1;

    var banner = document.getElementsByClassName('jd_banner_list')[0];
    var bannerPW =banner.clientWidth * .1;
    var pointList = document.getElementsByClassName('pointBox')[0].getElementsByTagName('li');
    var selectedIndex = 0;

    function addTransition() {
        banner.style.transition = 'all 0.5s linear';
        banner.style.webkitTransition = 'all 0.5s linear';
    }

    function changeTranslateX(x) {
        banner.style.transform = 'translate('+x+')';
        banner.style.webkitTransform = 'translate('+x+')';

    }

    function removeTranstion() {
        banner.style.transition = 'none';
        banner.style.webkitTransition = 'none';
    }

    timer = setInterval(scrollFn,2000);

    function scrollFn() {
        index++;
        if(index >8){index=0}
        addTransition();
        changeTranslateX(-index*10 +'%');

    }

    banner.addEventListener('transitionend',function () {
        pointList[selectedIndex].className = '';
        pointList[index-1].className = 'current';
        selectedIndex = index-1;
        if(index==8){
            index=0;
            removeTranstion();
            changeTranslateX(0);
        }

    });

    var startX=0 ,clientX=-bannerPW ,distance,endX;

    banner.addEventListener('touchstart',function (e) {
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });

    banner.addEventListener('touchmove',function (e) {
        removeTranstion();
        endX = e.touches[0].clientX;
        distance = -index * bannerPW - (startX - endX) ;
        changeTranslateX( distance  + 'px');
    });

    banner.addEventListener('touchend',function () {
        clientX =  distance;

        if(Math.abs(distance % bannerPW) > bannerPW * .5){
            if(startX - endX < 0){

                index--;
                if(index<=0){
                    index=8;
                }
            }else{

                index++;
                if(index>8){
                    index=1
                }
            }

        }

        addTransition();
        changeTranslateX(-index * 10 + '%');
        clientX = -index * bannerPW;


        timer = setInterval(scrollFn,2000);
        startX = 0;

    });



}

function secKill() {
    var timeSpan = document.getElementsByClassName('jd_seckill_time')[0].getElementsByTagName('span');
    var secKillT = 6*60*60;
    var h,m,s;
    var timer = setInterval(function () {
        secKillT--;
        if (secKillT<=0){
            clearInterval(timer);
        }
        h = Math.floor(secKillT / 60/60);
        m = Math.floor(secKillT % 3600/60 );
        s = Math.floor(secKillT % 60);
        timeSpan[0].innerHTML = h > 10 ? Math.floor(h/10):0 ;
        timeSpan[1].innerHTML = h %10;
        timeSpan[3].innerHTML = m >= 10 ?Math.floor(m/10):0;
        timeSpan[4].innerHTML = m %10;
        timeSpan[6].innerHTML = s >= 10 ? Math.floor(s/10):0;
        timeSpan[7].innerHTML = s%10;


    },1000)
}
