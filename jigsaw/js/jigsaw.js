(function() {
    // 生成拼图初始界面
    var area = document.getElementById('jigsaw_area');
    var oF = document.createDocumentFragment();
    var count = 1;
    var temp;
    var i, j;
    for (i = 1; i <= 4; i++) {
        for (j = 1; j <= 4; j++) {
            if (i * j == 16) {
                temp = document.createElement('div');
                temp.setAttribute('id', 'blank');
                temp.setAttribute('class', 'PosX_' + (j) + ' PosY_' + (i));
                oF.appendChild(temp);
                break;
            }
            temp = document.createElement('div');
            temp.setAttribute('class', 'pic PosX_' + (j) + ' PosY_' + (i));
            temp.textContent = count;
            temp.setAttribute('id', 'pic_' + (count++));
            oF.appendChild(temp);
        }
    }
    area.appendChild(oF);


    var start = false;
    var clear;
    var pics = document.getElementsByClassName('pic');
    var all = [];
    for (i = 0; i < pics.length; i++)
        all.push(pics[i]);
    all.push(blank);

    // 定义开始按钮的onclick事件
    document.getElementById('reset_btn').onclick = function() {
        document.getElementById('tips').setAttribute('class', 'gone');
        if (start) {
            count = 0;
            for (var X = 1; X <= 4; X++)
                for (var Y = 1; Y <= 4; Y++) {
                    all[count++].setAttribute('class', 'pic PosX_' + Y + ' PosY_' + X);
                }
            start = false;
            document.getElementById('reminder').setAttribute('class', 'hide');
            this.textContent = 'Start';
            document.getElementById('submit_pic').setAttribute('class', 'back');
            document.getElementById('help').setAttribute('class', 'gone');
            document.getElementById('step_dis').textContent = 0;
            StopTime(clear);
            return;
        }
        document.getElementById('submit_pic').setAttribute('class', 'gone');
        var blank = document.getElementById('blank');
        document.getElementById('reminder').setAttribute('class', 'come');
        document.getElementById('help').setAttribute('class', 'back');
        start = true;
        this.textContent = 'Stop';
        clear = StartTime();
        Random_pos(all);
    };
    var step;
    // 对每张图的onclick行为进行可移动判断
    for (i = 0; i < pics.length; i++) {
        pics[i].onclick =  function() {
            if (start) {
                var className = this.getAttribute('class');
                var PosX = parseInt(className[className.indexOf('PosX_') + 5]);
                var PosY = parseInt(className[className.indexOf('PosY_') + 5]);
                var blank = document.getElementById('blank');
                var blankclass = blank.getAttribute('class');
                var BlankX = parseInt(blankclass[blankclass.indexOf('PosX_') + 5]);
                var BlankY = parseInt(blankclass[blankclass.indexOf('PosY_') + 5]);
                if (((PosX == BlankX) && (PosY + 1 == BlankY || PosY - 1 == BlankY)) || ((PosY == BlankY) && (PosX + 1 == BlankX || PosX - 1 == BlankX))) {
                    if (className.indexOf('pic_num') == -1)
                        this.setAttribute('class', 'pic ' + 'PosX_' + BlankX + ' PosY_' + BlankY);
                    else
                        this.setAttribute('class', 'pic ' + 'PosX_' + BlankX + ' PosY_' + BlankY + ' pic_num');
                    blank.setAttribute('class', 'PosX_' + PosX + ' PosY_' + PosY);
                    step = document.getElementById('step_dis');
                    step.textContent = parseInt(step.textContent) + 1;
                }
                if (YouWin(pics)) {
                    var times = document.getElementById('time_dis').textContent;
                    step = document.getElementById('step_dis').textContent;
                    count = 0;
                    document.getElementById('tips').setAttribute('class', 'gone');
                    for (var X = 1; X <= 4; X++)
                        for (var Y = 1; Y <= 4; Y++) {
                            all[count++].setAttribute('class', 'pic PosX_' + Y + ' PosY_' + X);
                        }
                    start = false;
                    document.getElementById('reminder').setAttribute('class', 'hide');
                    document.getElementById('reset_btn').textContent = 'Start';
                    document.getElementById('submit_pic').setAttribute('class', 'back');
                    document.getElementById('help').setAttribute('class', 'gone');
                    StopTime(clear);
                    document.getElementById('step_dis').textContent = 0;
                    setTimeout(function() {
                        alert("You Pass !!! Amazing!!!\nThe time you have spend is " + times + '\nThe step you have taken is ' + step);
                    }, 300);
                    return;
                }
            }
        };
    }

    // 对提交图片url的处理
    document.getElementById('sub_btn').onclick = function() {
        if (start)
            return;
        var url = document.getElementById('pic_url').value;
        document.getElementById('reminder').style.background = 'url(' + url + ') no-repeat';
        document.getElementById('reminder').style.backgroundSize = '200px 200px';
        var count = 0;
        for (var i = 0; i < 4; i++)
            for (var j = 0; j < 4; j++) {
                if (i * j == 9)
                    break;
                pics[count].style.backgroundImage = 'url(' + url + ')';
                pics[count++].style.backgroundSize = '400px 400px';
            }
    };

    // 对于数字帮助的处理
    document.getElementById('help').onclick = function() {
        Helps(pics);
        document.getElementById('tips').setAttribute('class', 'back');
        this.setAttribute('class', 'gone');
    };
})();

// 控制时间的开始与结束
function StartTime() {
    var t = setInterval(function() {
        var time = document.getElementById('time_dis').textContent;
        document.getElementById('time_dis').textContent = parseInt(time) + 1;
    }, 1000);
    return t;
}

function StopTime(clear) {
    clearInterval(clear);
    document.getElementById('time_dis').textContent = 0;
}
//提示数字的出现
function Helps(pics) {
    for (var i = 0; i < pics.length; i++) {
        var temp = pics[i].getAttribute('class');
        pics[i].setAttribute('class', temp + ' pic_num');
    }
}
//判断是否完成
function YouWin(pics) {
    for (var i = 0; i < pics.length; i++) {
        var className = pics[i].getAttribute('class');
        var PosX = parseInt(className[className.indexOf('PosX_') + 5]);
        var PosY = parseInt(className[className.indexOf('PosY_') + 5]);
        var num = parseInt(pics[i].getAttribute('id')[pics[i].getAttribute('id').indexOf('pic_') + 4] +
            pics[i].getAttribute('id')[pics[i].getAttribute('id').indexOf('pic_') + 5]);
        if (num !== ((PosX) + (PosY - 1) * 4))
            return false;
    }
    return true;
}
//随机生成位置
function Random_pos(pics) {
    var pos = [
        [],
        [],
        [],
        [],
        []
    ];
    var X, Y;
    while (!canPass(pos, pics.length, pics)) {
        var cur = [];
        for (X = 1; X <= 4; X++) {
            for (Y = 1; Y <= 4; Y++) {
                if (X == 4 && Y == 4) {
                    pos[X][Y] = 15;
                    break;
                }
                var pic = Math.round(Math.random() * 14);
                while (cur.indexOf(pic) != -1) {
                    pic = Math.round(Math.random() * 14);
                }
                cur.push(pic);
                if (pics[pic].getAttribute('id') == 'blank')
                    blankpos = '' + X + ' ' + Y;
                pos[X][Y] = pic;
            }
        }
    }
    for (Y = 1; Y <= 4; Y++)
        for (X = 1; X <= 4; X++) {
            if (pics[pos[X][Y]].getAttribute('id').indexOf('blank') == -1)
                pics[pos[X][Y]].setAttribute('class', ' pic PosX_' + X + ' PosY_' + Y);
            else
                pics[pos[X][Y]].setAttribute('class', 'PosX_' + X + ' PosY_' + Y);
        }
}

//逆序数奇偶性以及空白距离判断可行性
function canPass(pos, len, pics) {
    if (pos[1][1] === undefined)
        return false;
    var count = 0;
    var order = [];
    var i, j;
    for (i = 1; i <= 4; i++)
        for (j = 1; j <= 4; j++) {
            if (pics[pos[j][i]].getAttribute('id') != 'blank')
                order.push(pos[j][i] + 1);
        }
    for (i = 15; i >= 0; i--) {
        for (j = i; j >= 0; j--) {
            if (order[i] !== 0)
                if (order[i] < order[j])
                    count++;
        }
    }
    if (count % 2 === 0) return true;
    return false;
}