var Utilities = {};

Utilities.PostAndRedirect = function (url, data) {
    var form = $('<form></form>');

    form.attr("method", "post");
    form.attr("action", url);

    if (data) {
        $.each(data, function (key, value) {
            var field = $('<input></input>');

            field.attr("type", "hidden");
            field.attr("name", key);
            field.attr("value", value);

            form.append(field);
        });
    }
    $(document.body).append(form);
    form.submit();
};

Utilities.ExtractDataFromString = function (dataAsString, timeAsString) {
    var array = dataAsString.split('-');
    var timeArray = timeAsString.split(':');

    return {
        Year: array[0],
        Month: array[1],
        Day: array[2],
        Hour: timeArray[0],
        Minutes: timeArray[1]
    };
};

Utilities.EnableElement = function (selector) {
    try {
        if (selector == undefined) throw "Utilities.General.EnableElement \'selector\' parameter is undefined.";

        $(selector).removeAttr('disabled');

    } catch (ex) {
        console.log(ex);
    }
};

Utilities.DisableElement = function (selector) {
    try {
        if (selector == undefined) throw "Utilities.General.DisableElement \'selector\' parameter is undefined.";

        $(selector).attr('disabled', 'disabled');

    } catch (ex) {
        console.log(ex);
    }
};