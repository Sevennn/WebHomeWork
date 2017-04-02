var httpRequest;
(function() {
    var Data = {};
    document.getElementById('submit').onclick = function() {
        var error = document.getElementsByClassName('Error_dis');
        for (var i = 0; i < error.length; i++) error[i].textContent = "";
        httpRequest = new XMLHttpRequest();
        var form = document.getElementById("table");
        var infos = document.getElementsByClassName("info");
        

        for (var i = 0; i < infos.length; i++) {
            Data[infos[i].name] = infos[i].value;
        }
        httpRequest.onreadystatechange = function() {
            handleResponse(Data);
        };
        httpRequest.open('POST', form.action);
        httpRequest.send(JSON.stringify(Data));
    };

    document.getElementById('reset').onclick = function() {
        var error = document.getElementsByClassName('Error_dis');
        for (var i = 0; i < error.length; i++) error[i].textContent = "";
    };
})();


function handleResponse(Data) {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
        if (httpRequest.responseText != "Success" ) {
            var Error = JSON.parse(httpRequest.responseText);
            if (Error.name != undefined) {
                document.getElementById('name').getElementsByClassName('Error_dis')[0].textContent = Error.name;
            }
            if (Error.id != undefined) {
                document.getElementById('id').getElementsByClassName('Error_dis')[0].textContent = Error.id;
            }
            if (Error.phone != undefined) {
                document.getElementById('phone').getElementsByClassName('Error_dis')[0].textContent = Error.phone;
            }
            if (Error.email != undefined) {
                document.getElementById('email').getElementsByClassName('Error_dis')[0].textContent = Error.email;
            }
        }
        else
            window.location.href = "http://127.0.0.1:8000/Signup?username="+Data.name;
    }
}

