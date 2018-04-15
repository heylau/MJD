/**
 * Created by heylau on 2018/4/15.
 */
window.onload = function () {
    var mask = document.getElementById('maskBox');
    var trashBtn = document.getElementsByClassName('product_trash');
    var checkBtn = document.getElementsByClassName('j_check');
    var confirmBtn = mask.getElementsByClassName('confirm');
    var products = document.getElementsByClassName('product');
    var trashT,currentDrop;
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
            tool.addTapEvent(checkBtn[i],function (e) {
                e.target.hasAttribute('selected')?e.target.removeAttribute('selected'):e.target.setAttribute('selected','');
            })

    }

    for(var i=0;i<confirmBtn.length;i++){
            tool.addTapEvent(confirmBtn[i],function () {
                console.log(currentDrop);
                console.log(products);
                if(currentDrop.parentNode.getElementsByClassName('product').length <=1){
                    currentDrop.parentNode.parentNode.removeChild(currentDrop.parentNode);
                }else{
                    currentDrop.parentNode.removeChild(currentDrop);
                }
                addTrashEvent();

            })
    }

};