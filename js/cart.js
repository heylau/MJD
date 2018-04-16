/**
 * Created by heylau on 2018/4/15.
 */
window.onload = function () {
    var mask = document.getElementById('maskBox');
    var trashBtn = document.getElementsByClassName('product_trash');
    var confirmBtn = mask.getElementsByClassName('confirm');
    var products = document.getElementsByClassName('product');
    var checkBtn = document.getElementsByClassName('j_check');

    var trashT,currentDrop,startX,currentX,distance;
    var mainCheck = document.getElementsByClassName('mainCheck');

    addTrashEvent();
    function addTrashEvent() {
      for(var i=0;i<trashBtn.length;i++){
          (function (index) {
              tool.addTapEvent(trashBtn[index],function (e) {
                  mask.style.display = 'block';
                  currentDrop = products[index];
                  mask.firstElementChild.className = 'panel jump';
                  trashT = e.target.parentNode.firstElementChild;
                  trashT.style.transition = 'all 0.2s linear';
                  trashT.style.wekitTransition = 'all 0.2s linear';
                  trashT.style.transformOrigin = '0 5px';
                  trashT.style.webkitTransformOrigin = '0 5px';
                  trashT.style.transform = 'rotate(-45deg)';
                  trashT.style.webkitTransform = 'rotate(-45deg)';
              });
          })(i)
      }
  }
    tool.addTapEvent(mask,function (e) {
        mask.style.display = 'none';
        trashT.style.transform = 'rotate(0)';
        trashT.style.webkitTransform = 'rotate(0)';
    });
    for(var i=0;i<checkBtn.length;i++){
        if(checkBtn[i].className.indexOf('mainCheck')==-1){
            tool.addTapEvent(checkBtn[i],function (e) {
                    e.target.hasAttribute('selected')?e.target.removeAttribute('selected'):e.target.setAttribute('selected','');
                })
            }

    }
    for(var i=0;i<confirmBtn.length;i++){
            tool.addTapEvent(confirmBtn[i],function () {
               checkDelete(currentDrop);

            })
    }
    for (var i=0;i<products.length;i++){
        products[i].addEventListener('touchstart',function (e) {
            for(var i=0;i<products.length;i++){

                products[i].style.transition = 'all 0.2s linear';
                products[i].style.transform = 'translate(0)';
                products[i].style.webkitTransition = 'all 0.2s linear';
                products[i].style.webkitTransform = 'translate(0)';
            }


            startX = e.touches[0].clientX;
        });
        products[i].addEventListener('touchmove',function (e) {
            distance =   e.touches[0].clientX - startX;
            if(distance<=-100)distance=-100;
            if(distance<0){
                this.style.transform = 'translate('+distance+'px)';
                this.style.webkitTransform = 'translate('+distance+'px)'
            }
        });
        products[i].addEventListener('touchend',function (e) {
            if(distance<0){
                console.log(this);
                this.style.transform = 'translate(-100px)';
                this.style.webkitTransform = 'translate(-100px)'
            }
            distance=0;
            startX=0;
        });


        tool.addTapEvent(products[i].getElementsByTagName('p')[0],function (e) {
        });
        tool.addTapEvent(products[i].getElementsByClassName('deleteBtn')[0],function (e) {
            checkDelete(e.target.parentNode);
        })
    }

    function checkDelete(dropProduct) {
        if(dropProduct.parentNode.getElementsByClassName('product').length <=1){
            dropProduct.parentNode.parentNode.removeChild(dropProduct.parentNode);
        }else{
            dropProduct.parentNode.removeChild(dropProduct);
        }
        addTrashEvent();
    }


    for(var i=0;i<mainCheck.length;i++){
        mainCheck[i].index = i;
        tool.addTapEvent(mainCheck[i],function (e) {
            var isChecked = e.target.hasAttribute('selected');
            console.log(isChecked);
            var checks = document.getElementsByClassName('item')[e.target['index']].getElementsByClassName('j_check');
            for(var i=0;i<checks.length;i++){
                isChecked?checks[i].removeAttribute('selected'):checks[i].setAttribute('selected','')
            }
        })
    }
    };
