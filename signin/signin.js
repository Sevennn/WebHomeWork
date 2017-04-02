var http = require('http');    // 导入模块
var url = require('url');
var fs = require('fs');
var queryStr = require('querystring');
var users = [];  // 导入本地数据，便于服务端访问





function ReadLocaldata() {
    fs.readFile('./data/data.js', 'utf-8', function(err, data) {
        var user = data.toString().split('\r\n');
        for (var i = 0; i < user.length;i++) {
            users.push(JSON.parse(user[i]));
        }
    });
}

function WriteToData(Param) {
    users.push(Param);
    var Newone = "\r\n";
    Newone += JSON.stringify(Param);
    fs.appendFile("./data/data.js", Newone, function(err, data) {});
}

function CheckParamStandard(Param) {
    var Error = {};
    Error.pass = true;
    if (!/^[1-9]\d{10}$/.test(Param["phone"])) {
        Error.phone = "Please input your phone number as required.";
        Error.pass = false;
    }
    if (!/^[1-9]\d{7}$/.test(Param["id"])) {
        Error.id = "Please input your id as required.";
        Error.pass = false;
    }
    if (!/^[a-zA-Z][a-zA-Z_]{5,17}$/.test(Param["name"])) {
        Error.name = "Please input your name as required.";
        Error.pass = false;
    }
    if (!/^[a-zA-Z_\-0-9]+@(([a-zA-Z_\-0-9])+\.)+[a-zA-Z]{2,4}$/.test(Param["email"])) {
        Error.email = "Please input your email as required.";
        Error.pass = false;
    }
    return Error;
}

function CheckParamRepeat(Param) {
    var Error = {};
    Error.pass = true;
    for (var i = 0; i < users.length; i++) {
        if (users[i]['name'] == Param['name']) {
            Error.name = "Your name have been signned up by others";
            Error.pass = false;
        } 
        if (users[i]['phone'] == Param['phone']) {
            Error.phone =  "Your phone have been signned up by others";
            Error.pass = false;
        }
        if (users[i]['id'] == Param['id']) {
            Error.id =  "Your id have been signned up by others";
            Error.pass = false;
        }
        if (users[i]['email'] == Param['email']) {
            Error.email =  "Your email have been signned up by others";
            Error.pass = false;
        }
    }
    return Error;
}

function ErrorHandle(response, Error) {
        response.writeHead(200,{"Content-Type":"text/html"});
        response.write(JSON.stringify(Error));
        response.end();
}

function Resister(request, response, PostData) {
    if (PostData == "") {
        response.write("<p>Error_operation</p><a href=\"http://127.0.0.1:8000\">Back to Home Page</a>");
        response.end();
        return;
    }
    var Param = JSON.parse(PostData);
    var Error = CheckParamStandard(Param);
    if (Error.pass == true) {
        Error = CheckParamRepeat(Param);
        if (Error.pass == true) {
            WriteToData(Param);
            ResisSuccess(response, Param);
        } else {
            ErrorHandle(response, Error);
        }
    } else {
        ErrorHandle(response, Error);
    }
    
}

function ResisSuccess(response, user) {
        response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
        response.write("Success");
        response.end();
}

function Have_a_Look(response, user) {
    fs.readFile('./regisister.html',function(err, data) {
        var html = data.toString();
        var index = html.indexOf("Name");
        html = InsertText(html,index+14, user.name);
        index = html.indexOf("Id");
        html = InsertText(html,index+12, user.id);
        index = html.indexOf("Phone");
        html = InsertText(html,index+15, user.phone);
        index = html.indexOf("Email");
        html = InsertText(html,index+15, user.email);
        response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
        response.write(html);
        response.end();
    });

}

function InsertText(html, start, text) {
    var htmlfront = html.substr(0, start);
    var htmlback = html.substr(start);
    html = htmlfront + text + htmlback;
    return html;
}

function CheckUserExist(username) {
    for (var i = 0; i < users.length; i++) {
        if (users[i]["name"] == username)
            return users[i];
    }
    return {};
}

function StartSev() {


    ReadLocaldata();

    http
        .createServer(function(request, response) {
            var PathName = url.parse(request.url).pathname;

            var searchName = url.parse(request.url).search;
            console.log(PathName);
            var queryName = queryStr.parse(url.parse(request.url).query);

            var PostData = "";
            request.on('data', function(data){
                PostData += data;
            });

            request.on('end', function(){
                if (PathName == "/Signup" && searchName == null) Resister(request,response,PostData);
            });

            if (searchName == null && PathName != "/Signup") {
                if (PathName.indexOf('background') != -1) {
                    fs.readFile('.'+PathName,'binary', function(err,data) {
                        response.writeHead(200,{'Content-Type':'image/jpeg'});
                        response.write(data,'binary');
                        response.end();
                    });
                } else if (PathName.indexOf('favicon') != -1) {
                    fs.readFile('.'+PathName, 'binary', function(err,data) {
                        response.writeHead(200,{'Content-Type':'ico'});
                        response.end(data);                        
                    });
                } else {
                    fs.readFile((PathName == "/"? "./signup.html" : '.'+PathName),'utf-8', function(err,data) {
                        if (err) {
                            response.writeHead(200, {"Content-Type":"html"});
                            response.write("<p>No such a Page</p><a href=\"http://127.0.0.1:8000\">Back to Home Page</a>");
                            response.end();
                            return;
                        }
                        response.writeHead(200, {"Content-Type":"text/" +(PathName == "/"?"html" : "css")});
                        response.write(data.toString());
                        response.end();
                    });
                }
            }
            else if (searchName != null) {
                var user = CheckUserExist(queryName["username"])
                if (user.name != undefined) {
                    Have_a_Look(response, user)
                } else {
                    response.writeHead(200, {"Content-Type":"html"});
                    response.write("<p>No such a User</p><a href=\"http://127.0.0.1:8000\">Back to Home Page</a>");  
                    // response.write("<script>window.location.href="http://127.0.0.1:8000</script>")比较神奇的返回index方法= =才疏学浅啊
                    response.end();
                }
            }
    }).listen(8000);
    console.log("Start Server at 8000");
}

StartSev();

        
