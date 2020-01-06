$(document).ready(function() {
	$('.ui.dropdown').dropdown({
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

	$("#register_form").modal('attach events', '#register_btn .button', 'show');
	$("#login_form").modal('attach events', '#login_btn .button', 'show');

	/*****************
	 * Register Form *
	 *****************/
	var username_ok = false;
	var password_ok = false;
	var password2_ok = false;
	/* Validate username entered by sending ajax request */
	$('#id_username').on('input', function() {
		$.post({
			url: 'registration',
			data: {
				username: $('#id_username').val(),
				csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
			},
			success: function(json){
				hint_msg('username_err')
				if(json.username_err !== ''){
					$('#id_username').css("border", "1px solid red")
					hint_msg('username_err', "#register_form .field:first-of-type", json.username_err)
					username_ok = false
				}else{
					$('#id_username').css("border", "1px solid #00c300")
					username_ok = true
				}

				if(username_ok && password_ok && password2_ok){
					$('#register_form button').attr("disabled", false)
				}else{
					$('#register_form button').attr("disabled", true)
				}
			},
		});
	});

	/* Check the length and the equality of password entered */
	$('#id_password, #id_password2').on('input', function(){
		var pwd1 = $('#id_password').val()
		var pwd2 = $('#id_password2').val()
		hint_msg('password_err')
		hint_msg('password2_err')

		// Check password1
		if(pwd1.length < 8 || pwd1.length > 30){
			$('#id_password').css("border", "1px solid red")
			if(pwd1.length < 8){
				hint_msg('password_err', "#register_form  .field:nth-of-type(2)", '請至少輸入八個字元')
			}else{
				hint_msg('password_err', "#register_form  .field:nth-of-type(2)", '密碼長度太長囉')
			}
			password_ok = false
		}else{
			$('#id_password').css("border", "1px solid rgba(34,36,38,.15)")
			password_ok = true
		}
		
		// Check password2
		if(pwd2 !== pwd1 && pwd2.length != 0){
			$('#id_password2').css("border", "1px solid red")
			hint_msg('password2_err', "#register_form  .field:nth-of-type(3)", "您輸入的密碼不匹配")
			password2_ok = false
		}else{
			$('#id_password2').css("border", "1px solid rgba(34,36,38,.15)")
			password2_ok = false
			if(pwd2.length != 0 && password_ok && pwd1 === pwd2){
				password2_ok = true
			}
		}

		// Make the border green iff the two passwords are ok
		if(password_ok && password2_ok){
			$('#id_password').css("border", "1px solid #00c300")
			$('#id_password2').css("border", "1px solid #00c300")
		}

		if(username_ok && password_ok && password2_ok){
			$('#register_form button').attr("disabled", false)
		}else{
			$('#register_form button').attr("disabled", true)
		}
	});

	/* If the register button clicked, post a request with the data. */
	$('#register_form button').click(function(){
		$.post({
			url: 'registration',
			data: {
				username: $('#id_username').val(),
				password: $('#id_password').val(),
				password2: $('#id_password2').val(),
				csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
			},
			success: function(json){
				console.log('register success!')
			},
		});
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