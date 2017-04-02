$(function(){
    var click = true;
    var auto = false;
    var next = {
        "#A":"#B",
        "#B":"#C",
        "#C":"#D",
        "#D":"#E"
    }; 
    $('.apb').click(function() {
        if (auto) return;
        auto = true;
        $('.letter').click();
    });
    $('.letter').click(function() {
        if (auto) {
            if (click && $(this).find('span').attr('value') == '1') {
                $(this).find('span').removeClass('fadeout');
                $(this).find('span').addClass('fadein');
                $(this).find('span').text('...');
                var me = $(this);
                $.ajax({
                    url:"/",
                    type:"GET",
                    async: true,
                    success: function(data,status) {
                        if (!auto) return;
                        me.find('span').text(data);
                        me.removeClass('active');
                        me.addClass('unread');
                        me.find('span').attr('value','0');
                        return CanweSum();
                    }
                });
            }
        } else {
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
                    if (BigValid())
                        $('#info-bar').addClass('click');
                    me.find('span').attr('value','0');
                });
            }
        }
        $.ajaxSetup({
            cache: false
        });      // 发送并发请求的重要操作= =
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
            auto = false;
        }
    });
    function CanweSum() {
        if (BigValid())
            $('#info-bar').click();
    }
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
        auto = false;
        click = true;
        $('.letter').find('span').addClass('fadeout');
        $('.letter').find('span').removeClass('fadein');
        $('.R').text("");
        $('#info-bar').removeClass('click');
    }
});