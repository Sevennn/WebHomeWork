    (function() {
        var tas = document.getElementsByTagName('table');
        var arr = Array.prototype.slice.call(tas);
        addEven(arr);

        function addEven(arr) {
            arr.forEach(function(ele) {
                var ths = GetTh(ele);
                var order = 0;
                ths.forEach(function(element, index) {
                    element.addEventListener('click', function() {
                        order = trigger(element,index,order);
                    });
                });
            });
        }
        function GetTh(table) {
            var arr =  Array.prototype.slice.call(table.getElementsByTagName('tr')[0].childNodes);
            arr = RemoveText(arr);
            return arr;
        }

        function RemoveText(arr) {
            var result = [];
            for (var i = 0; i < arr.length; i++) {
                if (!(arr[i].nodeName == '#text'))
                    result.push(arr[i]);
            }
            return result;
        }

        function trigger(obj, pos, order) {
            var parent = GetParent(obj);
            var rows = GetRows(parent, pos);
            sort(rows, pos, order++);
            return order;
        }

        function GetParent(dom) {
            while (dom.parentNode.tagName != 'TABLE') dom = dom.parentNode;
            return dom.parentNode;
        }

        function GetRows(parent, pos) {
            return Array.prototype.slice.call(parent.getElementsByTagName('tr'),1);
        }

        function sort(rows, pos, order) {
            for (var i = rows.length; i > 0; i--)
                for (var j = 0; j < i - 1; j++)
                    if (order % 2 == 0)
                        Ascend(rows[j],rows[j+1],pos);
                    else
                        Descend(rows[j],rows[j+1],pos);
        }

        function Ascend(r1, r2, pos) {
            var text1 = r1.getElementsByTagName('td')[pos].textContent;
            var text2 = r2.getElementsByTagName('td')[pos].textContent;
            if (!(NumberJudge(text1) && NumberJudge(text2))) {
                StringCompByAsc(text1,text2,r1,r2,pos);
            } else {
                NumberCompByAsc(parseFloat(text1),parseFloat(text2), r1, r2, pos);
            }
        }


        function Descend(r1, r2, pos) {
            var text1 = r1.getElementsByTagName('td')[pos].textContent;
            var text2 = r2.getElementsByTagName('td')[pos].textContent;
            if (!(NumberJudge(text1) && NumberJudge(text2))) {
                StringCompByDes(text1,text2,r1,r2,pos);
            } else {
                NumberCompByDes(parseInt(text1),parseInt(text2), r1, r2, pos);
            }
        }

        function StringCompByAsc(text1, text2, r1, r2, pos) {
            if (text1 > text2)
                SwichRows(r1,r2,pos);
        }
        function NumberCompByAsc(num1, num2, r1, r2, pos) {
            if (num1 > num2)
                SwichRows(r1,r2,pos);
        }
        function StringCompByDes(text1, text2, r1, r2, pos) {
            if (text1 < text2)
                SwichRows(r1,r2,pos);
        }
        function NumberCompByDes(num1, num2, r1, r2, pos) {
            if (num1 < num2)
                SwichRows(r1,r2,pos);
        }
        function SwichRows(r1, r2, pos) {
                var t = r1.innerHTML;
                r1.innerHTML = r2.innerHTML;
                r2.innerHTML = t;
        }
        function NumberJudge(str) {
            for (var i = 0; i < str.length; i++)
                if (!(/[0-9.]/.test(str[i]))) {
                    return false;
                }
            return true;
        }
    })();  // 假如把函数扔出去定义，这个闭包是低于十行的