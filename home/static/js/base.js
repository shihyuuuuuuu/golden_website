$(document).ready(function() {
    $('#hamburger .ui.dropdown').dropdown({
        action: 'hide',
    });

    $('#main-wrap').waypoint(function(){
        $('#main-wrap').toggleClass('fade');
    },{offset:-1});

    $('.ui.fluid.card .image').dimmer({
        on: 'hover'
    });

    $('.hamburger').click(function(e){
        $menu = $(this).parent();
        if(!$(this).hasClass('active')) {
            $(this).addClass('active');
            $menu.addClass('open');
        } else {
            $(this).removeClass('active');
            $menu.removeClass('open');
        }
        e.preventDefault();
    });
    
    /******************************
     * Menu-Button Clicked Events *
     *****************************/
    // Retister Button
    $("#register_form").modal({
        onShow: function(){
            // Reset the form when the modal show
            $('#register_form form').trigger('reset');
            $('#register_form input').css("border", "1px solid rgba(34,36,38,.15)").attr("disabled", false);
            hint_msg('username_err');
            hint_msg('password_err');
            hint_msg('password2_err');
            $('#register_btn1').css("display", "inline").attr("disabled", true);
            $('#register_btn2').css("display", "none");
            username_ok = password_ok = password2_ok = false;
        },
    }).modal('attach events', '#menu_reg_btn .button, #push_me_register', 'show');

    // Login Button
    $("#login_form").modal({
        onShow: function(){
            // Reset the form when the modal show
            $('#login_form form').trigger('reset');
            $('#login_form input').css("border", "1px solid rgba(34,36,38,.15)").attr("disabled", false);
            hint_msg('login_failed');
            hint_msg('login_success');
            hint_msg('login_user_err');
            hint_msg('login_pwd_err');
        },
    }).modal('attach events', '#menu_login_btn .button, #register_btn2', 'show');

    // Logout Button
    $('#menu_logout_btn').click(function(){
        $.post({
            url: 'logout_request',
            data: {
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
            },
            success: function (message){
                if(message == 'You are logged out.'){
                    // Refresh the page
                    location.reload()
                }
            },
        });
    });

    /*****************
     * Register Form *
     *****************/
    var username_ok = false;
    var password_ok = false;
    var password2_ok = false;
    /* Validate username entered by sending ajax request */
    $('#id_reg_user').on('input', function() {
        $.post({
            url: 'registration',
            data: {
                username: $('#id_reg_user').val(),
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
            },
            success: function(json){
                hint_msg('username_err')
                if(json.username_err !== ''){
                    $('#id_reg_user').css("border", "1px solid red")
                    hint_msg('username_err', "#register_form .field:first-of-type", json.username_err)
                    username_ok = false
                }else{
                    $('#id_reg_user').css("border", "1px solid #00c300")
                    username_ok = true
                }

                $('#register_btn1').attr("disabled", (username_ok && password_ok && password2_ok) ? false : true)
            },
        });
    });

    /* Check the length and the equality of password entered */
    $('#id_reg_pwd, #id_reg_pwd2').on('input', function(){
        var pwd1 = $('#id_reg_pwd').val()
        var pwd2 = $('#id_reg_pwd2').val()
        hint_msg('password_err')
        hint_msg('password2_err')

        // Check password1
        if(pwd1.length < 8 || pwd1.length > 30){
            $('#id_reg_pwd').css("border", "1px solid red")
            if(pwd1.length < 8){
                hint_msg('password_err', "#register_form  .field:nth-of-type(2)", '請至少輸入八個字元')
            }else{
                hint_msg('password_err', "#register_form  .field:nth-of-type(2)", '太長了啦')
            }
            password_ok = false
        }else{
            $('#id_reg_pwd').css("border", "1px solid rgba(34,36,38,.15)")
            password_ok = true
        }
        
        // Check password2
        if(pwd2 !== pwd1 && pwd2.length != 0){
            $('#id_reg_pwd2').css("border", "1px solid red")
            hint_msg('password2_err', "#register_form  .field:nth-of-type(3)", "您輸入的密碼不匹配")
            password2_ok = false
        }else{
            $('#id_reg_pwd2').css("border", "1px solid rgba(34,36,38,.15)")
            password2_ok = false
            if(pwd2.length != 0 && password_ok && pwd1 === pwd2){
                password2_ok = true
            }
        }

        // Make the border green iff the two passwords are ok
        if(password_ok && password2_ok){
            $('#id_reg_pwd').css("border", "1px solid #00c300")
            $('#id_reg_pwd2').css("border", "1px solid #00c300")
        }

        $('#register_btn1').attr("disabled", (username_ok && password_ok && password2_ok) ? false : true)
    });

    // If the register button clicked, post a request with the data.
    $('#register_btn1').click(function(){
        $.post({
            url: 'registration',
            data: {
                username: $('#id_reg_user').val(),
                password: $('#id_reg_pwd').val(),
                password2: $('#id_reg_pwd2').val(),
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
            },
            success: function(json){
                // If the registration is successful, replace the button with the login button.
                $('#register_btn1').css("display","none");
                $('#register_btn2').css("display", "inline");
                $('#register_form input').attr("disabled", true);
            },
        });
    });

    /**************
     * Login Form *
     **************/
    $('#id_log_user, #id_log_pwd').on('input', function(){
        hint_msg('login_failed')
        if($('#id_log_user').val()){
            $('#id_log_user').css("border", "1px solid rgba(34,36,38,.15)")
            hint_msg('login_user_err')
        }
        if($('#id_log_pwd').val()){
            $('#id_log_pwd').css("border", "1px solid rgba(34,36,38,.15)")
            hint_msg('login_pwd_err')
        }
    });
    // If the login button clicked, post a request with the data.
    $('#login_btn').click(function(){
        if($('#id_log_user').val() && $('#id_log_pwd').val()){
            $.post({
                url: 'login_request',
                data: {
                    username: $('#id_log_user').val(),
                    password: $('#id_log_pwd').val(),
                    csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
                },
                success: function(message){
                    if(message == 'Login Success!'){
                        $('#login_form .field:nth-of-type(2)').append('<div id="login_success" style="color:#00c300; text-align:center">登入成功</div>')
                        location.reload() // Refresh the page
                    }else if(message == 'Login Failed.'){
                        $('#login_form .field:nth-of-type(2)').append('<div id="login_failed" style="color:red; text-align:center">帳號或密碼錯誤，請再試一次😢</div>')
                    }
                },
            });
        }else{
            hint_msg('login_user_err')
            hint_msg('login_pwd_err')
            if(!$('#id_log_user').val()){
                $('#id_log_user').css("border", "1px solid red")
                hint_msg('login_user_err', '#login_form .field:first-of-type', '此欄不可為空')
            }
            if(!$('#id_log_pwd').val()){
                $('#id_log_pwd').css("border", "1px solid red")
                hint_msg('login_pwd_err', '#login_form .field:nth-of-type(2)', '此欄不可為空')
            }
        }
    });
});

// Add or remove the hint message of the form
function hint_msg(hint_id, ...[appendto, content]){
    if(appendto){
        $(appendto).append('<div id="'+hint_id+'" style="color:red; text-align:right">'+content+'</div>')
    }else{
        $('#'+hint_id).remove()
    }
}