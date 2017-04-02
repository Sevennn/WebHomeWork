$(function(){
    var click = true;
    var clickone = false;
    var auto = false;
    var Arr = ['#A','#B','#C','#D','#E'];
    var next;
    $('.icon').click(function() {
        if (auto || !click || clickone)
            return;
        Arr = Arr.sort(function(){ return 0.5 - Math.random();});
        var order = Arr[0]+" "+Arr[1]+" "+Arr[2] + " " + Arr[3] + " " + Arr[4];
        $('.R').text(order);
        next = CreateNext(Arr);
        auto = true;
       $(Arr[0]).click();
    });
    $('.letter').click(function() {
        if (click && $(this).find('span').attr('value') == '1') {
            $(this).find('span').text('...');
            $(this).find('span').addClass('fadein');
            $(this).find('span').removeClass('fadeout');
            click = false;
            var ables = [];
            $(this).siblings().each(function() {
                if ($(this).find('span').attr('value') == '1') {
                    $(this).removeClass('active');
                    $(this).addClass('unread');
                    ables.push(this);
                }
            });
            var me = $(this);
            $.get("/", function(data,status) {
                if (click) return;
                click = true;
                me.find('span').text(data);
                ables.forEach( function(element, index) {
                    $(element).removeClass('unread');
                    $(element).addClass('active');
                });
                me.removeClass('active');
                me.addClass('unread');
                me.find('span').attr('value','0');
                if (auto)
                    setTimeout(function() {$(next['#'+me.attr('id')]).click();}, 0);   // 强行异步一波
                else
                    clickone = true;
            });
        }
    });
    $('#button').mouseleave(function() {
        ResetAll();
    });
    $('#info-bar').click(function() {
        if (BigValid()) {
            var sum = 0;
            $('.letter').each(function() {
                sum += parseInt($(this).find('span').text());
            });
            $('.R').text(sum);
        }
    });
    function BigValid() {
        var flag = true;
        $('.letter').each(function() {
            if ($(this).find('span').attr('value') != '0')
                flag = false;
        });
        return flag;
    }

    function ResetAll() {
        $('.letter').each(function() {
            $(this).find('span').attr('value','1');
            $(this).find('span').text("");
            $(this).removeClass('unread');
            $(this).addClass('active');
        });
        auto = false;
        click = true;
        $('.letter').find('span').removeClass('fadein');
        $('.letter').find('span').addClass('fadeout');
        $('.R').text("");
        $('#info-bar').removeClass('click');
    }

});

function CreateNext(Arr) {
    console.log(Arr);
    var next = {};
    next[Arr[0]] = Arr[1];
    next[Arr[1]] = Arr[2];
    next[Arr[2]] = Arr[3];
    next[Arr[3]] = Arr[4];
    next[Arr[4]] = "#info-bar";
    return next;
}