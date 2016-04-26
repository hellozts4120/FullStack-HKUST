var http = require("http");
var url = require("url");
var name = ["Text1", "Text234", "Text132432", "Texthahaha", "Textkkkkeee", "Textfuckfuck", "fuckfuck", "fickfick", "cccdddsss", "fffkkkeee"];
var server = http.createServer(function(req,res) {
    	var arg = url.parse(req.url, true).query;
    	res.writeHead(200, {"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"});
    	if (arg.name) {
    		var reg = new RegExp("^"+arg.name);
            res.write("hello!!");
    	    for(var i = 0 ; i < name.length ; i++) {
    	    	if(reg.test(name[i])){
    	    		res.write(name[i]+",");
    	    	}
    	    }
    	}
        res.end();
});
server.listen(6666, "localhost", function() {
    console.log("开始监听...");
});