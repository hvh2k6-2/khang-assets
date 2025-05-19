function reloadCaptcha() {
    $.ajax({
        url: '/reload-captcha',
        method: 'GET',
        dataType: 'json',
        beforeSend: function(){
            $('.reload-captcha').removeClass("paused");
            $(".capchaImage").empty();
            $('input[name="captcha"]').val('');
        },
        success: function (response) {
            $('.capchaImage').html(response.captcha);
        },
        error: function (error) {
            console.error(error);
        },
        complete: function () {
            $('.reload-captcha').addClass("paused");
        }
    });
}
$(document).ready(function () {
    function setDelayedFunction() {
        if(window.location.pathname == '/nap-the'){
            setTimeout(function () {
                reloadCaptcha();
                setDelayedFunction();
            }, 60 * 60 * 1000);
        }
    }
    reloadCaptcha();
    setDelayedFunction();
});
