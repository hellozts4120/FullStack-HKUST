(function (){
    var choice = -1;
    function suggestAjax() {
        choice = -1;
        $("#suggest").innerHTML = "";
        var str = $("#search").value;
        ajax('xxxxx', {
            type: "GET",
            data: {
                name = str;
            },
            onsuccess: function(responseText, xhr) {
                //need to implement
            }
        })
    }
    
    function choose() {
        $("#search").value = document.getElementById(choice.toString()).innerHTML;
    }
    
    function chooseUp() {
        choice--;
        document.getElementById(choice.toString()).style.background = '#A9A9A9';
        document.getElementById((choice + 1).toString()).style.background = '#FFFFFF';
    }
    
    function chooseDown() {
        choice++;
        document.getElementById(choice.toString()).style.background = '#A9A9A9';
        document.getElementById((choice - 1).toString()).style.background = '#FFFFFF';
    }
    
    suggest = {
        ajax: suggestAjax,
        up: chooseUp,
        down: chooseDown,
        choose: choose;
    }
    window.suggest = suggest;
})()£»

addEvent($("#search"), 'keyup', function() {
    e = event || window.event;
        
    if(e.keyCode == 40){
        suggest.chooseDown();            
    }

    if(e.keyCode == 38){
        suggest.chooseUp();            
    }

    if(e.keyCode == 13){
        suggest.choose();
        $("#suggestbox").innerHTML = "";
    }
});

addEvent($("#search"), 'click', function() {
    suggest.ajax();
});
