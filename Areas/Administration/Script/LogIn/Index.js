var LogIn = {};

LogIn.selectors = {};
LogIn.selectors.userName = "#username";
LogIn.selectors.password = "#password";
LogIn.selectors.logInButton = "#LogInButton";
LogIn.selectors.errorUserName = "#userNameError";
LogIn.selectors.errorPassword = "#passwordError";
LogIn.selectors.notValidUser = "#notValidUser";

LogIn.Init = function () {

    $(LogIn.selectors.logInButton).on('click', function () {
        LogIn.LogIn();
    });

    var AllTextForCheck = LogIn.selectors.userName + ', ' + LogIn.selectors.password;

    //$(document).on('focusout', '' + LogIn.selectors.password + '', function () {
    //    Validate.ValidateText(this);
    //});

    //$(document).on('focusout', '' + LogIn.selectors.userName + '', function () {
    //    Validate.ValidateEmail(this);
    //});
}

LogIn.LogIn = function () {

    var isValid = true;
    //isValid = Validate.ValidateEmail(LogIn.selectors.userName) && isValid;
    //isValid = Validate.ValidateText(LogIn.selectors.password) && isValid;

    if (isValid) {

        var sendData = { username: '' + $(LogIn.selectors.userName).val() + '', password: '' + $(LogIn.selectors.password).val() + '' };

        $.ajax({
            type: "POST",
            url: '/LogIn/LogIn',
            content: "application/json; charset=utf-8",
            dataType: "json",
            data: sendData,
            success: function (data) {
                if (data.IsRealUser) {

                    $(LogIn.selectors.notValidUser).html('');
                    window.location = '/Administration/AdminHome/Index';
                }
                else {
                    $(LogIn.selectors.notValidUser).html("The email you entered does not belong to any account.");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                // TODO: Show error
            }
        });
    }
}
