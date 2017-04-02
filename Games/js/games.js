window.onload = function() {
    Makemap();
    var paths = document.getElementsByClassName('path');
    var onway = false;
    var start = false;
    var end = false;
    var redone = undefined;
    var warn = document.getElementById("warnings");
    // 控制开始事件
    document.getElementById('start').onmouseover = function() {
        start = true;
        onway = false;
        end = false;
        pointerNow(paths);
        if (redone != undefined) {
            redone.style.backgroundColor = "rgb(238,238,238)";
            redone = undefined;
        }
        warn.innerHTML = "Gaming";
    }
    for (var i = 0; i < paths.length; i++) {
        paths[i].onmouseover = function() {
            if (start)
                onway = true;
        }
    }
    // 控制结束事件
    document.getElementById('end').onmouseover = function() {
        if (end) return;
        if (!start && !end) {
            warn.innerHTML = "Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!";
        }
        else if (start && onway && !end) {
            warn.innerHTML = "you win";
        }
        else if (start && !onway) {
            warn.innerHTML = "Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!";
        }
        pointerGo(paths);
        end = true;
    }

    // 控制撞墙事件
    var walls = document.getElementsByClassName('wall');
    for (var i = 0; i < walls.length; i++) {
        walls[i].onmouseover = function() {
            if (!end && start) {
                this.style.backgroundColor = "red";
                this.style.zIndex = "10000";
                warn.innerHTML = "You Lose";
                end = true;
                redone = this;
                pointerGo(paths);
            }
        }
    }


    // for mole
    var sco = document.getElementById('score_dis');
    pause_stop = true;   // 控制暂停停止事件
    // 定义地图老鼠洞的click事件
    var holes = document.getElementsByClassName('mousehole');
    for (var i = 0; i < holes.length; i++) {
            var before;
            holes[i].onmousedown = function() {
                before = this.checked;
            }
            holes[i].onclick = function() {
                if (!pause_stop) {
                    if (before == true) {
                            sco.innerHTML = parseInt(sco.innerHTML)+1;
                        } else {
                            sco.innerHTML = parseInt(sco.innerHTML)-1;
                        }
                        this.checked = false;
                        if (before)
                            Randomhole();
                } else {
                    this.checked = before;
                }
            }
        }


    // 控制游戏开始按钮
    document.getElementById('btn').onmouseup = function() {
        this.style.backgroundColor = "#fff";
    }
    document.getElementById('btn').onmousedown = function() {
        this.style.backgroundColor = "#666";
        switch (this.innerHTML) {
            case "Start":
                StartGame();
                break;
            default:
                Gameover();
                pause_stop = true;
                break;
        }
        if (this.innerHTML == "Start") {
            this.innerHTML = "Stop";
        } else {
            this.innerHTML = "Start";
        }
    }

    // 控制切换按钮
    document.getElementById('slider').onclick = function() {
        var a1 = document.getElementById('area1');
        var a2 = document.getElementById('area2');
        if (a1.style.display == "none") {
            a1.style.display = "block";
            a1.style.opacity = "1";
            a1.style.animation = "comeout 5s 1";
            a2.style.display = "none";
            a2.style.opacity = 0;
        } else {
            a2.style.display = "block";
            a2.style.opacity = "1";
            a2.style.animation = "comeout 5s 1";
            a1.style.display = "none";
            a1.style.opacity = 0;
        }
    }
}


// 控制指针形状
function pointerNow(arr) {
    for (var j = 0; j < arr.length; j++)
        arr[j].style.cursor = "pointer";
}

function pointerGo(arr) {
    for (var j = 0; j < arr.length; j++)
        arr[j].style.cursor = "";
}


// for mole
// 生成地图
function Makemap() {
    var map = document.getElementById('map')
    for (var i = 0; i < 49; i++)
        map.innerHTML += "<input type=\"radio\" class=\"mousehole\" />";
}
// 游戏界面初始化
function ClearMap() {
    var holes = document.getElementsByClassName('mousehole');
    for (var i = 0; i < holes.length; i++) {
        holes[i].checked = false;
    }
    document.getElementById('times_dis').innerHTML = "30";
    document.getElementById('score_dis').innerHTML = "0";
}
// 生成随机选中的radio
function Randomhole() {
    var holes = document.getElementsByClassName('mousehole');
    var ran = Math.round(Math.random()*29);
    holes[ran].checked = true;
}
// 游戏的开始与停止
var on_game;
function StartGame() {
    pause_stop = false;
    document.getElementById('action').innerHTML = "Playing";
    on_game = setInterval(function(){
        var t = document.getElementById('times_dis');
        t.innerHTML = (parseInt(t.innerHTML)-1);
        if (t.innerHTML == "0") {
            document.getElementById('btn').innerHTML = "Start";
            Gameover();
        }
    }, 1000);
    Randomhole();
}
function PauseGame() {
    clearInterval(on_game);
    document.getElementById('action').innerHTML = "Pause";
    var m = document.getElementsByClassName('mousehole');
    for (var i = 0; i < m.length; i++)
        m[i].checked = false;
    pause_stop = true;
}

function Gameover() {
    clearInterval(on_game);
    var sco = document.getElementById('score_dis').innerHTML;
    ClearMap();
    pause_stop = true;
    document.getElementById('btn').style.backgroundColor = "#fff";
    document.getElementById('action').innerHTML = "Over";
    alert("GameOver!\nYour score : " + sco);
}