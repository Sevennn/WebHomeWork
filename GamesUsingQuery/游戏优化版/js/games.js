(function() {
    $(function() {
        sliderControl();
        new Maze();
        new Mole();
    });

    function Maze() {
        this.Set_S_Event();
        this.Set_E_Event();
        this.SetPathEvent();
        this.SetBlockEvent();
    }
    
    var p = Maze.prototype;
    p.onway = p.start = p.end = false;
    p.redone = undefined;
    p.SetPathEvent = function() {
        $('.path').mouseover(function() {
            p.onway = true;
        });
    };  // 设置路径事件

    p.pointerGo = function(obj) {
        obj.removeClass('pointer');
    };  // 改变指针样式

    p.pointerBack = function(obj) {
        obj.addClass('pointer');
    };

    p.SetBlockEvent = function() {
        $('.wall').mouseover(function() {
            if (!p.end && p.start) {
                $(this).addClass('redone');
                $('#warnings').text("You Lose");
                p.end = true; p.redone = this;
                p.pointerGo($('.path'));
            }
        });
    }; // 设置障碍事件

    p.Set_S_Event = function() {
        $('#start').mouseover(function() {
            p.start = true;
            p.onway = p.end = false;
            p.pointerBack($('.path'));
            if (p.redone !== undefined)
                p.RemoveRedone();
            $('#warnings').text("Gaming");
        });
    };  // 设置S块事件

    p.RemoveRedone = function() {
        $(p.redone).removeClass('redone');
        p.redone = undefined;
    }; // 移除红块

    p.Set_E_Event = function() {
        $('#end').mouseover(function() {
            if (p.end) return;
            if (!p.start && !p.end || (p.start && !p.onway))
                $('#warnings').text("Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!");
            else if (p.start && p.onway && !p.end)
                $('#warnings').text("you win");
            p.pointerGo($('.path'));
            p.end = true;
        });
    }; // 设置E块事件

    /*For Mole*/
    function Mole() {
        this.Makemap();
        this.setStartBtnEvent();
        this.mouseholeClick(); 
    }
    var p1 = Mole.prototype;
    p1.start = false;
    p1.setStartBtnEvent = function() {
        $('#btn').click(function() {
            if (!p1.start) p1.StartGame();
            else p1.Gameover();
        });
    }; // 设置开始按钮事件

    p1.Makemap = function() {
        for (var i = 0; i < 49; i++)
            $('#map').append("<input type=\"radio\" class=\"mousehole\" />");
    };  // 生成地图

    p1.ClearMap = function() {
        $('.mousehole').each(function() {
            this.checked = false;
        });
        $('#times_dis').text("30");
        $('#score_dis').text("0");
    }; // 地图清除并重置

    p1.timer = undefined;
    p1.StartGame = function() {
        p1.start = true;
        $('#btn').text('Stop');
        $('#action').text("Playing");
        p1.Timing();
        p1.Randomhole();
    }; // 开始游戏

    p1.Timing = function() {
        p1.timer = setInterval(function(){
            $('#times_dis').text((parseInt($('#times_dis').text())-1));
            if ($('#times_dis').text() == "0") {
                $('#btn').click();
            }
        }, 1000);
    }; // 开始计时

    p1.Gameover = function() {
        if (!p1.start) return;
        clearInterval(p1.timer);
        p1.start = false;
        $('#btn').text('Start');
        $('#action').text("Over");
        var s = $('#score_dis').text();
        p1.ClearMap();
        alert("GameOver!\nYour score : " + s);
    };  // 游戏结束
    
    p1.checkedbefore = undefined;

    p1.mouseholeClick = function() {
        p1.HolesCheckedvalue();
        p1.HolesEvent();
    }; // 老鼠洞点击事件

    p1.HolesCheckedvalue = function() {
        $('.mousehole').mousedown(function(){
            p1.checkedbefore = this.checked;
        });
    }; // 获取点击前的checked值

    p1.HolesEvent = function() {
        $('.mousehole').click(function() {
            if (p1.start)
                if (p1.checkedbefore == true) $('#score_dis').text(parseInt($('#score_dis').text())+1);
                else $('#score_dis').text(parseInt($('#score_dis').text())-1);
            this.checked = false;
            if (p1.checkedbefore) p1.Randomhole();
            else this.checked = p1.checkedbefore;
        });
    };  // 设置老鼠洞点击后的事件

    p1.Randomhole = function() {
        $('.mousehole')[Math.round(Math.random()*29)].checked = true;
    }; // 生成随机洞

    function sliderControl() {
        $('#slider').click(function(){
            if ($('#area1').css('display') == "none") {
                Area1_active();
            } else {
                Area2_active();
            }
        });
    } // 界面切换按钮控制

    function Area1_active() {
        $('#area1').attr('class','comeout game_area');
        $('#area2').attr('class','Hidein game_area');
        p1.Gameover();
    }
    function Area2_active() {
        $('#area2').attr('class','comeout game_area');
        $('#area1').attr('class','Hidein game_area');
    }
})();