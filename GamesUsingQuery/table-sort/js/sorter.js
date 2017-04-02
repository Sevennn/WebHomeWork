// 这些是课堂作业需求的
function Trigger(dec) {
    $('th').on('click', function () {
        RemoveClass(this);
        sort(this, dec, $(this).index(), $(this).attr('class'));
        var newClass = $(this).attr('class') == 'ascend' ? 'descend' : 'ascend';
        $(this).removeClass($(this).attr('class'));
        $(this).addClass(newClass);
    });
}

function RemoveClass(obj) {
    $(obj).siblings().removeClass('ascend');
    $(obj).siblings().removeClass('descend');
}
function sort(obj, dec, index, className) {
    var parent = GetParent(obj);
    var rows = $(parent).find('tr');
    if (className == undefined || className.indexOf('ascend') == -1)
        Ascend(rows.slice(1), index);
    else
        Descend(rows.slice(1),index);
}

function Descend(rows, index) {
    for (var i = rows.length; i > 0; i--)
        for (var j = 0; j < i - 1; j++)
            ChangerowByDes(rows[j],rows[j+1], index);
}

function Ascend(rows, index) {
    for (var i = rows.length; i > 0; i--)
        for (var j = 0; j < i - 1; j++)
            ChangerowByAsc(rows[j],rows[j+1], index);
}
function GetParent(obj) {
    while ($(obj).parent()[0].tagName != 'TABLE') obj = $(obj).parent();
    return $(obj).parent()[0];
}

function ChangerowByDes(row1, row2, index) {
    if ($(row1).find('td')[index].textContent < $(row2).find('td')[index].textContent) {
        var t = row1.innerHTML;
        row1.innerHTML = row2.innerHTML;
        row2.innerHTML = t;
    }
}

function ChangerowByAsc(row1, row2, index) {
    if ($(row1).find('td')[index].textContent > $(row2).find('td')[index].textContent) {
        var t = row1.innerHTML;
        row1.innerHTML = row2.innerHTML;
        row2.innerHTML = t;
    }
}

$(function () {
    Trigger();
});
