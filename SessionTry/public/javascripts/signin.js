$(function() {
  var pass = {
    "username" : false,
    "password" : false
  };
  var validator = {
    "username" : Checkusername,
    "password" : Checkpassword
  };
  $('.user-control').focus(function() {
    $(this).siblings('.Error').text("");
  });
  $('.user-control').blur(function() {
    var me = $(this).attr('name');
    console.log(me);
    validator[me]($(this).val(), $(this), pass);
  });
  $('.signin-btn').click(function(){
    var user = {
      "username" : $('.user-control').eq(0).val(),
      "password" : $('.user-control').eq(1).val()
    };

    $('.user-control').each(function() {
      if ($(this).val() == "") {
        if ($(this).siblings('.Error').text() == "")
          $(this).siblings('.Error').text("Empty!");
      }
    })
    console.log(pass);
    for (var i in pass) {
      if (!pass[i])
        return;
    }
    $.post('/signin', user, function(data, sta) {
      if (data["success"] != undefined)
        window.location.href="/detail";
      else {
        var Err = data;
        $('.user-control').eq(0).siblings('.Error').text(Err["username"]);
        $('.user-control').eq(1).siblings('.Error').text(Err["password"]);
      }
    });
  });
});

function Checkpassword(password, self, pass) {
    if (!/^[a-zA-Z0-9_\-]{6,12}$/.test(password)) {
        self.siblings('.Error').text("Wrong password");
        pass[self.attr('name')] = false;
        return;
    } else {
      pass[self.attr('name')] = true;
    }
}

function Checkusername(name, self, pass) {
    if (!/^[a-zA-Z][a-zA-Z_0-9]{5,17}$/.test(name)) {
        self.siblings('.Error').text("Wrong name");
        pass[self.attr('name')] = false;
        return;
    } else {
      pass[self.attr('name')] = true;
    }
}