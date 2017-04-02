$(function(){
    var auto = false;
    var Arr = ['#A','#B','#C','#D','#E'];
    var Func = {
        '#A': Ahandler,
        '#B': Bhandler,
        '#C': Chandler,
        '#D': Dhandler,
        '#E': Ehandler
    };
    var next;
    $('.icon').click(function() {
        if (auto) return;
        auto = true;
        Arr = Arr.sort(function(){ return 0.5 - Math.random();});
        next = CreateNext(Arr, Func);
        $('.order').text(Arr.toString());
        console.log(next);
        Start();
    });
    $('#button').mouseleave(function() {
        ResetAll();
        auto = false;
    });
    function Start(Cs, n, e, caller) {
        if (!isEmptyObject(e)) {
            $('.R').text(e.message);
        }
        next["first"](0, next, {}, Start);
    };
    function ResetAll() {
        window.clearTimeout();
        $('.letter').each(function() {
            $(this).find('span').attr('value','1');
            $(this).find('span').text("");
            $(this).removeClass('unread');
            $(this).addClass('active');
        });
        $('.letter').find('span').removeClass('fadein');
        $('.letter').find('span').addClass('fadeout');
        $('.R').text("");
        $('.order').text("");
        $('#info-bar').removeClass('click');
    }

});

function CreateNext(Arr, Func) {
    console.log(Arr);
    var next = {};
    next[Arr[0]] = Func[Arr[1]];
    next[Arr[1]] = Func[Arr[2]];
    next[Arr[2]] = Func[Arr[3]];
    next[Arr[3]] = Func[Arr[4]];
    next[Arr[4]] = Bubblehandler;
    next["first"] = Func[Arr[0]];
    return next;
}

function Ahandler(CurrentSum, next, error, caller) {
    if (!isEmptyObject(error)) {
        $('.R').text("");
        setTimeout(function(){
            $('.R').text(error.message);
            next['#A'](CurrentSum, next, {}, Ahandler);
        }, 1000);
    } else {
        var me = "#A";
        $(me).find('span').text('...');
        $(me).find('span').addClass('fadein');
        $(me).find('span').removeClass('fadeout')
        $.get('/', function(data,status) {
            if ($(me).find('span').text() == "") return;
            var fail = Math.round(Math.random());
            var message = fail == true ? "这不是秘密":"这是个天大的秘密";
            if (fail)
                setTimeout(function(){caller(CurrentSum, next, {"message":message, "CurrentSum":CurrentSum}, Ahandler);},0);
            else {
                $('.R').text(message);
                $(me).find('span').text(data);
                $(me).removeClass('active');
                $(me).addClass('unread');
                CurrentSum += parseInt(data);
                setTimeout(function(){next['#A'](CurrentSum, next, {}, Ahandler);},0);
            }
        });
    }
}
function Bhandler(CurrentSum, next, error, caller) {
    if (!isEmptyObject(error)) {
        $('.R').text("");
        setTimeout(function(){
            $('.R').text(error.message);
            next["#B"](error.CurrentSum, next, {},Bhandler);
        }, 1000);
    } else {
        var me = "#B";
        $(me).find('span').text('...');
        $(me).find('span').addClass('fadein');
        $(me).find('span').removeClass('fadeout');
        $.get('/', function(data,status) {
            if ($(me).find('span').text() == "") return;
            var fail = Math.round(Math.random());
            var message = fail == false ? "我不知道" : "我知道";
            if (fail)
               setTimeout(function() {caller(CurrentSum, next, {"message":message, "CurrentSum":CurrentSum}, Bhandler);}, 0) 
            else {
                $('.R').text(message);
                $(me).find('span').text(data);
                $(me).removeClass('active');
                $(me).addClass('unread');
                CurrentSum += parseInt(data);
                setTimeout(function(){next['#B'](CurrentSum, next, {}, Bhandler);},0);
            }
        });
    }
}
function Chandler(CurrentSum, next, error, caller) {
    if (!isEmptyObject(error)) {
        $('.R').text("");
        setTimeout(function(){
            $('.R').text(error.message);
            next["#C"](error.CurrentSum, next, {},Chandler);
        }, 1000);
    } else {
        var me = "#C";
        $(me).find('span').text('...');
        $(me).find('span').addClass('fadein');
        $(me).find('span').removeClass('fadeout');
        $.get('/', function(data,status) {
            if ($(me).find('span').text() == "") return;
            var fail = Math.round(Math.random());
            var message = fail == true ? "你知道":"你不知道";
            if (fail)
                setTimeout(function(){ caller(CurrentSum, next, {"message":message, "CurrentSum":CurrentSum}, Chandler);},0);
            else {
                $('.R').text(message);
                $(me).find('span').text(data);
                $(me).removeClass('active');
                $(me).addClass('unread');
                CurrentSum += parseInt(data);
                setTimeout(function() {next['#C'](CurrentSum, next, {}, Chandler);},0);
            }
        });
    }
}
function Dhandler(CurrentSum, next, error, caller) {
    if (!isEmptyObject(error)) {
        $('.R').text("");
        setTimeout(function(){
            $('.R').text(error.message);
            next["#D"](error.CurrentSum, next, {}, Dhandler);
        }, 1000);
    } else {
        var me="#D";
        $(me).find('span').text('...');
        $(me).find('span').addClass('fadein');
        $(me).find('span').removeClass('fadeout');
        $.get('/', function(data,status) {
            if ($(me).find('span').text() == "") return;
            var fail = Math.round(Math.random());
            var message = fail == true ? "他知道" : "他不知道";
            if (fail)
                setTimeout(function(){caller(CurrentSum, next, {"message":message, "CurrentSum":CurrentSum}, Dhandler);}, 0);
            else {
                $(me).find('span').text(data);
                $('.R').text(message);
                $(me).removeClass('active');
                $(me).addClass('unread');
                CurrentSum += parseInt(data);
                setTimeout(function() {next['#D'](CurrentSum, next, {}, Dhandler);},0);
            }
        });
    }
}
function Ehandler(CurrentSum, next, error, caller) {
    if (!isEmptyObject(error)) {
        $('.R').text("");
        setTimeout(function(){
            $('.R').text(error.message);
            next["#E"](error.CurrentSum, next, {},Ehandler);
        }, 1000);
    } else {
        var me = '#E';
        $(me).find('span').text('...');
        $(me).find('span').addClass('fadein');
        $(me).find('span').removeClass('fadeout');
        $.get('/', function(data,status) {
            if ($(me).find('span').text() == "") return;
            var fail = Math.round(Math.random());
            var message = fail == true ? "就是" : "才怪";
            if (fail)
                setTimeout(function(){caller(CurrentSum, next, {"message":message, "CurrentSum":CurrentSum}, Ehandler);}, 0); 
            else {
                $('.R').text(message);
                $(me).find('span').text(data);
                $(me).removeClass('active');
                $(me).addClass('unread');
                CurrentSum += parseInt(data);
                setTimeout(function() {next['#E'](CurrentSum, next, {}, Ehandler);}, 0);
            }
        });
    }
}

function Bubblehandler(CurrentSum, next, error, caller) {
    var fail = Math.round(Math.random());
    var message = fail == false ? ("楼主异步调用战斗力感人，目测不超过"+CurrentSum) : ("楼主异步调用战斗力太强，目测超过"+CurrentSum);
    if (fail)
        setTimeout(function(){caller(CurrentSum, next, {"message":message, "CurrentSum":CurrentSum}, Bubblehandler);}, 2000);
    else
        setTimeout(function(){$('.R').text(message);}, 2000);
}

function isEmptyObject(obj) {
    for (var key in obj) 
        return false;
    return true;
}