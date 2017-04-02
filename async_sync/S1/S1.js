$(function(){
    var click = true;
    $('.letter').click(function() {
            $(this).find('span').removeClass('fadeout');
            $(this).find('span').addClass('fadein');
        if (click && $(this).find('span').attr('value') == '1') {
            $(this).find('span').text('...');
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
            $('#info-bar').removeClass('click');
            $('.R').text(sum);
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
        click = true;
        $('.R').text("");
        $('.letter').find('span').removeClass('fadein');
        $('.letter').find('span').addClass('fadeout');
        $('#info-bar').removeClass('click');
    }

});


