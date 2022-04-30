const urlParams = new URLSearchParams(window.location.search);
const input = JSON.parse(urlParams.get("input"));
if (urlParams.get("error")) {
    $('#error_msg').text(urlParams.get("error"));
    fill(input)
}

$('form').on('submit', function () {
    let errorMessage = null
    $.each($('input,textarea'), function () {
        if (!$(this).val()) {
            errorMessage = `${$(this).parent().find('label').text()} cannot be empty`;
            return false
        }
    });
    if (errorMessage !== null) {
        $('#error_msg').text(errorMessage);
        return false;
    }
});

function fill(user) {
    $('#email').val(user.username)
    $('#password').val(user.password)
    $('#confirm').val(user.confirm)
    $('#fullname').val(user.fullname)
    $('#profile').val(user.profile)
}