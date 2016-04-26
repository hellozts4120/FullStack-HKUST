var inputArray = [];
$("#errorMes").style.display = "none";
$("#button1").setAttribute("disabled", true);

function spiltInput(text) {
    inputArray = (text.value).split(/[,，;；、\s\n]+/);
}

function outputArray(checkbox) {
    $("#check").innerHTML = "";
    inputArray = uniqArray(inputArray);
    var targetValue = "";
    each(inputArray, function(item, index){
        if (item != "") {
            targetValue += '<input type="checkbox" value="" />' + item;
        }
    });
    $("#check").innerHTML = targetValue;
}

function checkInput(text) {
    $("#button1").setAttribute("disabled", false);
    spiltInput(text);
    if (inputArray.length > 10) {
        $("#errorMes").style.color = 'red';
        $("#errorMes").style.display = "inline";
        $("#button1").setAttribute("disabled", true);
    }
    else {
        $("#errorMes").style.display = "none";
        $("#button1").removeAttribute("disabled");
    }
}

addEvent($("#button1"),"click",function(){
    outputArray($("#check"));
});

addEvent($("#inputbox"),"keyup",function(){
    checkInput($("#inputbox"));
});