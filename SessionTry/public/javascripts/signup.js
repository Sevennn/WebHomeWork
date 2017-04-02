var httpRequest;
(function() {
    var Data = {};
    var pass = {
        "username" : false,
        "email" : false,
        "phone" : false,
        "id" : false,
        "password" : false
    };
    var validator = {
        "username" : Checkname,
        "email" : Checkemail,
        "phone" : Checkphone,
        "id" : Checkid,
        "password" : CheckPassword,
        "confirmpassword" : CheckRepeat
    };

    $('.info').focus(function() {
        $(this).siblings('.Error_dis').text("");
    })

    $('.info').blur(function() {
        var me = $(this).attr('name');
        validator[me]($(this).val(), $(this), pass);
    });

    $('#submit').click(function() {
        console.log(pass);
        var user = {};
        var empty = false;
        $('.info').each(function() {
            if ($(this).val() == "") {
                $(this).siblings('.Error_dis').text("empty!!!");
                empty = true;
            } else {
                if ($(this).attr('name') != "confirmpassword")
                    user[$(this).attr('name')] = $(this).val();
            }
        });
        if (empty) return;
        for (i in pass) {
            if (pass[i] == false)
                return;
        }

        $.post('/regist', user, function(data, sta) {
           window.location.href = "/detail";
        });

    });

    $('#reset').click(function() {
        var error = document.getElementsByClassName('Error_dis');
        for (var i = 0; i < error.length; i++) error[i].textContent = "";
        for (i in pass) pass[i] = false;
    });
})();


function Checkid(id, self, pass) {
    if (!/^[1-9]\d{7}$/.test(id)) {
        self.siblings('.Error_dis').text("Please input your id as required.");
        pass[self.attr('name')] = false;
        return;
    }
    $.post('/checkid', {"id":id} ,function(data, status) {
        if (data == "Have") {
            self.siblings('.Error_dis').text("This id has been used.");
            pass[self.attr('name')] = false;
        }
        else {
            self.siblings('.Error_dis').text("");
            pass[self.attr('name')] = true;
        }
    });
}

function Checkphone(phone, self, pass) {
    if (!/^[1-9]\d{10}$/.test(phone)) {
        self.siblings('.Error_dis').text("Please input your phone as required.");
        pass[self.attr('name')] = false;
        return;
    }
    $.post('/checkphone', {"phone":phone} ,function(data, status) {
        if (data == "Have") {
            self.siblings('.Error_dis').text("This phone has been used.");
            pass[self.attr('name')] = false;
        }
        else {
            self.siblings('.Error_dis').text("");
            pass[self.attr('name')] = true;
        }
    });
}

function Checkemail(email, self, pass) {
    if (!/^[a-zA-Z_\-0-9]+@(([a-zA-Z_\-0-9])+\.)+[a-zA-Z]{2,4}$/.test(email)) {
        self.siblings('.Error_dis').text("Please input your email as required.");
        pass[self.attr('name')] = false;
        return;
    }
    $.post('/checkemail', {"email":email} ,function(data, status) {
        if (data == "Have") {
            self.siblings('.Error_dis').text("This email has been used.");
            pass[self.attr('name')] = false;
        }
        else {
            self.siblings('.Error_dis').text("");
            pass[self.attr('name')] = true;
        }
    });
}

function Checkname(name, self, pass) {
    if (!/^[a-zA-Z][a-zA-Z_0-9]{5,17}$/.test(name)) {
        self.siblings('.Error_dis').text("Please input your name as required.");
        pass[self.attr('name')] = false;
        return;
    }
    $.post('/checkname', {"name":name} ,function(data, status) {
        if (data == "Have") {
            self.siblings('.Error_dis').text("This name has been used.");
            pass[self.attr('name')] = false;
        }
        else {
            self.siblings('.Error_dis').text("");
            pass[self.attr('name')] = true;
        }
    });
}

function CheckPassword(password, self, pass) {
    if (!/^[a-zA-Z0-9_\-]{6,12}$/.test(password)) {
        self.siblings('.Error_dis').text("Please input your password as required.");
        pass[self.attr('name')] = false;
        return;
    }
}

function CheckRepeat(password, self, pass) {
    if (password != $('#password').find('input').val()) {
        pass["password"] = false;
        self.siblings('.Error_dis').text("Not Same as what you input");
    } else {
        pass["password"] = true;
    }
}