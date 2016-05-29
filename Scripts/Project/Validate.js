Validator = {};

Validator.Regexes = {
    EmailRegex: /^([\d\w]([\w-.]*[\d\w])*@([\d\w][\w-]*[\d\w]\.)+[\w]{2,9})$/,
    DomainRegex: /^(([\d\w][\w-]*[\d\w]\.)+[\w]{2,9})$/
};

Validator.TryParseInt = function (str, defaultValue) {
    var retValue = defaultValue;
    if (str !== null) {
        if (str.length > 0) {
            if (!isNaN(str)) {
                retValue = parseInt(str);
            }
        }
    }
    return retValue;
};

Validator.TryParseDouble = function (str, defaultValue) {
    var retValue = defaultValue;
    if (str !== null) {
        if (str.length > 0) {
            if (!isNaN(str)) {
                retValue = parseFloat(str);
            }
        }
    }
    return retValue;
};

Validator.ValidateEmail = function (selector, errorSelector, message) {
    return Validator.ValidateByRegex(selector, errorSelector, message, Validator.Regexes.EmailRegex);
};

Validator.ValidateByRegex = function (selector, errorSeolector, message, regex) {
    var self = this;

    var isValid = true;

    isValid = regex.test($(selector).val());

    if (!isValid) {
        Validator.Mark(errorSeolector, message);
    }
    else {
        Validator.Mark(errorSeolector, null);
    }

    return isValid;
};

Validator.Mark = function (errorSelector, errorMessage) {
    if (errorMessage == null) {
        $(errorSelector).empty();
    } else if (errorSelector != null) {
        $(errorSelector).text(errorMessage);
    }
};

Validator.ValidateTextFiled = function (selector, errorSelector, errorMessage) {
    var value = $(selector).val();

    if (value && value.trim().length > 0) {
        Validator.Mark(errorSelector, null);
        return true;
    }
    else {
        Validator.Mark(errorSelector, errorMessage);
        return false;
    }
};

Validator.CheckSelecor = function (selector, errorSelector, errorMassage) {
    var value = $(selector).val();
    if (value == null || value == -1) {
        Validator.Mark(errorSelector, errorMassage);
        return false;
    }
    else {
        Validator.Mark(errorSelector, null);

        return true;
    }
};

Validator.ValidateMultipleSelector = function (selector, errorSelector, errorMessage) {
    var selectedArray = [];

    $(selector + ' :selected').each(function (i, selected) {
        selectedArray[i] = $(selected).text();
    });

    if (parseInt(selectedArray.length) === 0) {
        Validator.Mark(errorSelector, errorMessage);

        return false;
    }
    else {
        Validator.Mark(errorSelector, null);

        return true;
    }
};

Validator.CheckDateHoursPickerValues = function (startHour, endHour, startDate, endDate) {
    var startD = Validator.StringToDate(startDate);
    var endD = Validator.StringToDate(endDate);

    //This will start to check hours values only if the dates are equals
    if (Validator.ComapareDates(startD, endD) == 0) {
        var start = Validator.HourWorker(startHour);
        var end = Validator.HourWorker(endHour);

        if (end.hours > start.hours) { return true; }
        if (end.hours === start.hours && end.minutes > start.minutes) { return true; }
        if (end.hours === start.hours && end.minutes === start.minutes && end.seconds > start.seconds) { return true; }

        return false;
    }

    return true;
};

Validator.ComapareDates = function (firstDate, secondDate) {
    // Compare two dates (could be of any type supported by the convert
    // function above) and returns:
    //  -1 : if a < b
    //   0 : if a = b
    //   1 : if a > b
    // NaN : if a or b is an illegal date
    // NOTE: The code inside isFinite does an assignment (=).    
    return (firstDate > secondDate) - (firstDate < secondDate);
};

Validator.StringToDate = function (value) {
    return (
            value.constructor === Date ? value :
            value.constructor === Array ? new Date(value[0], value[1], value[2]) :
            value.constructor === Number ? new Date(value) :
            value.constructor === String ? new Date(value) :
            typeof value === "object" ? new Date(value.year, value.month, value.date) :
            NaN
        );
};

Validator.HourWorker = function (value) {
    var result = value.split(':');

    return {
        hours: parseInt(result[0]),
        minutes: parseInt(result[1]),
        seconds: parseInt(result[2])
    };
};

Validator.ValidateCheckBox = function (selector, errorSelector, message) {
    var isChecked = $(selector).is(':checked');

    if (isChecked) {
        Validator.Mark(errorSelector, null);
        return true;
    }
    else {
        Validator.Mark(errorSelector, message);

        return false;
    }
};


var Enums = {};

Enums.DefaultElementValue = "-1";

Enums.PriceSortBy =
    {
        ASC: 1,
        DESC: 2
    };
