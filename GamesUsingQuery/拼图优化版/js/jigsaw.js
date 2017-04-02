(function() {
    $(function() {new Pane();});

    function Pane() {
        this.CreatePics();
        this.addPicsClickEven();
        this.addButtonsClickEvent();
    }

    var p = Pane.prototype;

    p.addButtonsClickEvent = function() {
        p.addStartButtonClickEvent();
        p.addHelpButtonClickEvent();
        p.addCheatButtonClickEvent();
    }; // 添加各类按钮事件

    p.area = $('#jigsaw_area');

    p.steps = []; // 步骤记录，用于复原

    p.start = false;

    p.Makemap = false;

    p.CreatePics = function () {
        var count = 1;
        for (var i = 1; i < 5; i++)
            for (var j = 1; j < 5; j++) {
                p.area.append('<div class='+'\"pic '+'PosX_'+j+' PosY_'+i
                    +'\" '+'id=\"pic_'+(count)+ '"\>'+(count == 16 ? '':count++)+'</div>');
            }
    };  // 生成初始地图

    p.cheat = false;

    p.addPicsClickEven = function() {
      p.area.click(function(event){
        var pic = event.target;
        if (p.Makemap || p.start)
            if (p.canMove(pic)) {
                p.Move(pic);
                p.Checkwin();
            }
      });
    };   // 图片点击事件

    p.validstep = 1;

    p.pushStep = function(pic) {
        if (p.start)
            $('#step_dis').text(parseInt($('#step_dis').text())+1);
        if (p.steps[p.steps.length-1] == pic) {
            p.validstep++;
            p.steps.push(pic);
        }
        else
            p.StepsHandle(pic);
    };  // 加入步骤记录

    p.StepsHandle = function(pic) {
        if (p.validstep % 2 == 0)
            while (p.validstep--) p.steps.pop();
        else
            while (--p.validstep) p.steps.pop();
        if (p.steps[p.steps.length-1] == pic)
            p.steps = p.steps.slice(0,p.steps.length-1);
        else
            p.steps.push(pic);
        p.validstep = 1;
    };   // 对于加入记录器里的步骤进行优化


    p.GetPos = function(pic) {
        return {X:parseInt(pic.className[pic.className.indexOf('PosX_') + 5]),
            Y:parseInt(pic.className[pic.className.indexOf('PosY_') + 5])};
    };   // 获取图片位置


    p.Move = function(pic) {
        var temp = pic.className;
        pic.setAttribute('class', $('#pic_16').attr('class'));
        $('#pic_16').attr('class',temp);
        if (!p.cheat) {
            p.pushStep(pic);
        }
    };  // 图片移动

    p.canMove = function(pic) {
        var ppos = this.GetPos(pic);
        var bpos = this.GetPos($('#pic_16')[0]);
        if ((ppos.X == bpos.X && (ppos.Y - 1 == bpos.Y || ppos.Y + 1 == bpos.Y)) ||
            (ppos.Y == bpos.Y && (ppos.X - 1 == bpos.X || ppos.X + 1 == bpos.X)))
            return true;
        return false;
    }; // 是否可以移动

    p.Checkwin = function() {
        if (p.start == false) return false;
        var win = true;
        $('.pic').each(function(index,element) {
            var pos = p.GetPos(this);
            if ((pos.Y-1)*4+pos.X != (index+1))
                win = false;
        });
        if (win) p.win();
    };  // 是否胜利

    p.victor = false; // 记录胜利与否

    p.win = function() {
        $('.pic').removeClass('pic_num');
        p.victor = true;
        $('#chear,#help').attr('class','gone');
        $('#reminder').attr('class','hide');
        setTimeout(function() {
            alert("You win\nTime: "+$('#time_dis').text()+'\nSteps: '+$('#step_dis').text());
            $('#reset_btn').click();
        },300);
    };  // 胜利之后的操作


    p.addStartButtonClickEvent = function() {
        $('#reset_btn').click(function(){
            clearInterval(p.cheatTimer);
            if (p.start)
                p.Stop();
            else
                p.Start();
        });
    };  // 开始按钮

    p.Start = function() {
        p.StartGame();
        p.start = true;
        p.victor = false;
        $('#reminder').attr('class','come');
        $('.pic').removeClass('pic_num');
        $('#reset_btn').text('Stop');
    }; // 开始游戏

    p.Stop = function() {
        $('#help, #cheat').attr('class','gone');
        $('#reminder').attr('class','hide');
        clearInterval(p.timer);
        p.cheat = false;
        p.BacktoPos();
        p.start = false;
        $('#time_dis,#step_dis').text('0');
        $('#reset_btn').text('Start');
    }; // 停止游戏

    p.BacktoPos = function() {
        $('.pic').each(function() {
            this.className = 'pic PosY_'+Math.ceil(parseInt(this.id.slice(4))/4)+
            ' PosX_' + (parseInt(this.id.slice(4))%4 == 0?4:parseInt(this.id.slice(4))%4);
        });
    }; // 强行恢复地图

    p.timer = undefined;

    p.StartGame = function() {
        clearInterval(p.timer);
        p.timer = setInterval(function(){
            $('#time_dis').text(parseInt($('#time_dis').text())+1);
            } ,1000);
        $('#help').attr('class','back');
        $('#cheat').attr('class','gone');
        p.randomPos();
    };  // 开始游戏操作

    p.addHelpButtonClickEvent = function() {
        $('#help').click(function(){
            $('.pic').addClass('pic_num');
            $('#cheat').attr('class','back');
            $('#help').attr('class','gone'); 
        });
    };  // 帮助按钮

    p.randomPos = function() {
        p.Makemap = true;
        p.steps = [];
        for (var i = 0; i < 1000; i++) {
            var index = Math.round(Math.random() * 14);
            $('.pic')[index].click();
        }
        p.Makemap = false;
    }; // 生成随机位置

    p.addCheatButtonClickEvent = function() {
        $('#cheat').click(function() {
            if (p.cheat) return;
            p.cheat = true;
            p.Cheat();
        });
    };  // 作弊按钮

    p.cheatTimer = undefined;
    
    p.Cheat = function() {
        p.cheatTimer = setInterval(function() {
            if (p.victor || p.steps.length == 0) {
                clearInterval(p.cheatTimer);
                p.cheat = false;
            }
            if (p.steps[0] != undefined)
                p.steps.pop().click();
        },100);
    }; // 自动复原
})();