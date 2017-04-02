$(function(){
    var oneclick = false;    // 防止点了一个按钮再开启功能
    var click = true;
    var auto = false;
    var next = {
        "#A":"#B",
        "#B":"#C",
        "#C":"#D",
        "#D":"#E",
        "#E":"#info-bar"
    };
    $('.icon').click(function() {
        if (oneclick || auto)
            return;
        auto = true;
       $('#A').click();
    });
    $('.letter').click(function() {
        if (click && $(this).find('span').attr('value') == '1') {
                $(this).find('span').text('...');
                $(this).find('span').removeClass('fadeout');
                $(this).find('span').addClass('fadein');
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
                    click = true;
                    me.find('span').text(data);
                    ables.forEach( function(element, index) {
                        $(element).removeClass('unread');
                        $(element).addClass('active');
                    });
                    me.removeClass('active');
                    me.addClass('unread');
                    me.find('span').attr('value','0');
                    if (BigValid())
                        $('#info-bar').addClass('click');
                    if (auto)
                        setTimeout(function() {$(next['#'+me.attr('id')]).click();}, 0);    // 强行异步一波 
                    else
                        oneclick = true;
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
            $('#info-bar').removeClass('click');
        }
    });
    function BigValid() {
        var flag = true;
        $('.letter').each(function() {
            if ($(this).find('span').attr('value') != '0')
                flag = false;
        });
        if ($('.R').text() != "")
            flag = false;
        return flag;
    }

    function ResetAll() {
        $('.letter').each(function() {
            $(this).find('span').attr('value','1');
            $(this).find('span').text("");
            $(this).removeClass('unread');
            $(this).addClass('active');
        });
        $('.letter').find('span').removeClass('fadein');
        $('.letter').find('span').addClass('fadeout');
        auto = false;
        oneclick = false;
        click = true;
        $('.R').text("");
    }
});