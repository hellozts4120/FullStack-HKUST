function getTime() {
    var inputTime = $("#inputbox").value.split("-");
    each(inputTime, function(item, index) {
        inputTime[index] = parseInt(item);
    });
    var targetDate = new Date();
    targetDate.setFullYear(inputTime[0]);
    targetDate.setMonth(inputTime[1] - 1);
    targetDate.setDate(inputTime[2]);
    targetDate.setHours(0);
    targetDate.setMinutes(0);
    targetDate.setSeconds(0);
    targetDate.setMilliseconds(0);
    if (Date.parse(targetDate) - Date.parse(new Date()) > 0) {
        if (window.timer) {
            clearInterval(window.timer);
        }
        else {
            window.timer = setInterval(function() {
                countTime(targetDate);
            });
        }
    }
    else {
        alert("input time has past!")
    }
}

function countTime(targetDate) {
    var curTime = new Date();
    var interval = (Date.parse(targetDate) - Date.parse(curTime)) / 1000;
    var result = [];
    result[0] = Math.floor(interval / 86400);
    interval = interval % 86400;
    result[1] = Math.floor(interval / 3600);
    interval = interval % 3600;
    result[2] = Math.floor(interval / 60);
    result[3] = interval % 60;
    $("#showTime").innerHTML = "距离" + targetDate.getFullYear() + "年" + targetDate.getMonth() + "月" + targetDate.getDate() 
    + "日还有" + result[0] + "天" + result[1] + "小时" + result[2] + "分" + result[3] + "秒";
}

addEvent($("#button1"), "click", function() {
    getTime();
});