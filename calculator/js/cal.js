window.onload = function() {
    var obj = document.getElementsByClassName("number");
    for (var i = 0; i < obj.length; i++) {
        obj[i].onmousedown = function() {
            btn_down(this);
        }
        obj[i].onmouseup = function() {
            btn_up(this);
        }
    }
}

var num = "";
var equal = false;
function btn_down(obj) {
    obj.style.background = "black";
    var ele = document.getElementById("ans");
    var str = obj.innerHTML + "";

    switch (str) {
        case "*":
        case "/":
        case "-":
        case "+": if (equal == true) equal = false;
        case "(":
        case ")":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
        case ".":
            if (ele.innerHTML != '0')
            if (str != '*' && str != '/' && str != '+' && str != '-' && str != '(' && str != ')') {
                num += str;
                try {
                    if (num.indexOf('0') == 0 && num.indexOf('.') == -1 && num.length > 1) {
                        throw num + " is not a decimal number";
                    }
                }
                catch(exp) {
                    num = "";
                    ele.innerHTML = "0";
                    document.getElementById("exp").innerHTML = "";
                    btn_up(obj);
                    alert(exp);
                    break;
                }
            } else {
                num = "";
            }
            if (ele.innerHTML == "0" && obj.innerHTML == ".") {
                ele.innerHTML += ".";
                num += "0.";
            } else {
                if (ele.innerHTML == "0" || equal == true) {
                    if (str == '*' || str == '/' || str == '+' || str == '-')
                        ele.innerHTML += str;
                    else
                        ele.innerHTML = obj.innerHTML;
                    document.getElementById("exp").innerHTML = "";
                    equal = false;
                } else {
                    ele.innerHTML += obj.innerHTML;
                }
            }
            break;
        case "CE":
            ele.innerHTML = "0";
            num = "";
            document.getElementById("exp").innerHTML = "";
            break;
        case "←":
            var str = ele.innerHTML;
            if (equal == true)
                break;
            if (str === "0" || str.length == 1) {
                ele.innerHTML = "0";
            } else {
                ele.innerHTML = str.slice(0, str.length - 1);
            }
            break;
        case "=":
            num = "";
            document.getElementById("exp").innerHTML = ele.innerHTML;
            try {
                var res = eval(ele.innerHTML);
                if (res == "Infinity")
                    throw res;
                ele.innerHTML = res;
            }
            catch(exp) {
                alert(exp);
                ele.innerHTML = "0";
                document.getElementById("exp").innerHTML = "";
                btn_up(obj);
            }
            equal = true;
            break;
    }
}

function btn_up(obj) {
    obj.style.background = "#333";
}
