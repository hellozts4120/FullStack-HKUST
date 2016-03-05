(function (){
   var draggingObj = null; 
   var dragObjId; 
   var diffX = 0, diffY = 0;
   var left = ["bar1", "bar2", "bar3", "bar4", "bar5", "void", "void", "void"];
   var right = ["bar6", "bar7", "bar8", "void", "void", "void", "void", "void"];
   
   function down(e) {
       e = e ? e : window.event;
       var target = e.srcElement ? e.srcElement : e.target;
       dragObjId = target.id;
       if (target.className.indexOf('bar') != -1) {
           draggingObj = target;
           diffX = e.clientX - target.offsetLeft;
           diffY = e.clientY - target.offsetTop;
       }
   }
   
   function move(e) {
       e = e ? e : window.event;
       if (draggingObj) {
           var cur = document.getElementById(dragObjId);
           cur.style.top = (e.clientY - diffY).toString() + 'px';
           cur.style.left = (e.clientX - diffX).toString() + 'px';
       }
   }
   
   function up(e){
        console.log(draggingObj.offsetLeft);
        draggingObj = e.target;
        if(draggingObj.offsetLeft < 200 && draggingObj.offsetLeft > 50 && right.indexOf(draggingObj.id) != -1){
            if(draggingObj.offsetTop < 50 && left[0] == "space"){
                left[0] = draggingObj.id;
                draggingObj.style = "";
            }
            for(var i = 1; i < 8;i++){
                if(draggingObj.offsetTop > 100 * i - 50 && draggingObj.offsetTop < 100 * i + 50 && left[i] == "space"){
                    left[i] = draggingObj.id;
                    draggingObj.style = "";
                }
            }
            $("#box-left").innerHTML = $("#box-left").innerHTML + draggingObj.outerHTML;
            right[right.indexOf(draggingObj.id)] = "space";
            try{
                draggingObj.remove();
            }catch(exception){
                removeElement(draggingObj);
            }
        }
        
        else if(draggingObj.offsetLeft > 350 && draggingObj.offsetLeft < 500 && left.indexOf(draggingObj.id) != -1){
            console.log("fuck");
            if(draggingObj.offsetTop < 50 && right[0] == "space"){
                right[0] = draggingObj.id;
                draggingObj.style = "";
            }
            for(var i = 1; i < 8; i++){
                if(draggingObj.offsetTop > 100 * i - 50 && draggingObj.offsetTop < 100 * i + 50 && right[i] == "space"){
                    right[i] = draggingObj.id;
                    draggingObj.style = "";
                }
            }
            $("#box-right").innerHTML = $("#box-right").innerHTML + draggingObj.outerHTML;
            left[left.indexOf(draggingObj.id)] = "space";
            try{
                draggingObj.remove();
            }catch(exception){
                removeElement(draggingObj);
            }
        }
        
        else {
            draggingObj.style = "";
        }
        draggingObj = null;
        diffX = 0;
        diffY = 0;
        console.log(left);
        console.log(right);
    }

    function removeElement(ele){
        var parentElement  =  ele.parentNode;
        if (parentElement){
            parentElement.removeChild(ele);
        }
    }
   
   var drag = {
       down : down,
       up : up,
       move : move
   }
   window.drag = drag;
})()

addEvent(document, 'mousedown', drag.down);
addEvent(document, 'mouseup', drag.up);
addEvent(document, 'mousemove', drag.move);