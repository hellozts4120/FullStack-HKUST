(function (){
    var picList = document.getElementsByTagName("li");
    var docList = document.getElementsByTagName("span");
    var curPic = 0;
    var timer = null;
    var timerAuto = null;
    var wid = $("#slider").style.width;
    console.log(wid);
    
    window.onload = function() {
        docList[0].className = "active";
        for(var i = 0; i < docList.length; i++){
            docList[i].index = i;
            docList[i].onclick = function(){
                if(this.index == curPic) return;
                if(this.index < curPic){
                    curPic = this.index;
                    slide(picList[curPic], 1280);
                }
                else{
                    curPic = this.index;
                    slide(picList[curPic], -1280);
                }
                clearInterval(timerAuto);
                timerAuto = setInterval(autoSlide,3000);
            };
        }
        clearInterval(timerAuto);
        timerAuto = setInterval(autoSlide,3000);
    };
    
    function autoSlide() {
        curPic = (curPic + 1) % picList.length;
        slide(picList[curPic], -1280);
    }
    
    function slide(element, start) {
        for(var i = 0; i < docList.length; i++){
            picList[i].style.zIndex = 0;
        }
        element.style.zIndex = 3;
        element.style.left = start + 'px';
        for (var i = 0; i < docList.length; i++) {
            docList[i].removeAttribute("class", "active")
        }
        docList[curPic].setAttribute("class", "active");
        clearInterval(timer);
        timer = setInterval(function (){
            if (start < 0) {
                if(element.offsetLeft >= 0){
                    element.style.left = 0;
                    clearInterval(timer);
                }
                else{
                    element.style.left = element.offsetLeft + 12.8 + "px";
                }
            }
            else {
                if(element.offsetLeft <= 0){
                    element.style.left = 0;
                    clearInterval(timer);
                }
                else{
                    element.style.left = element.offsetLeft - 25.6 + "px";
                }
            }
        }, 1);
        clearInterval(timerAuto);
        timerAuto = setInterval(autoSlide,3000);
    }
})();