var NewArmchair = {};

NewArmchair.Selectors = 
    {
        Name:'[data-selector="Name"]',
        NameError:'[data-selector="NameError"]',
        Price:'[data-selector="Price"]',
        PriceError:'[data-selector="PriceError"]',
        ReducedPrice: '[data-selector="ReducedPrice"]',
        ReducedPriceError: '[data-selector="ReducedPriceError"]',
        DescriptionError: '[data-selector="DescriptionError"]',
        Description: '[data-selector="Description"]',
        WoodenFrame: '[data-selector="WoodenFrame"]',
        WoodenFrameError: '[data-selector="WoodenFrameError"]',
        Width: '[data-selector="Width"]',
        WidthError: '[data-selector="WidthError"]',
        Height: '[data-selector="Height"]',
        HeightError: '[data-selector="HeightError"]',
        Depth: '[data-selector="Depth"]',
        DepthError: '[data-selector="DepthError"]',
        Seat: '[data-selector="Seat"]',
        SeatError: '[data-selector="SeatError"]',
        Back: '[data-selector="Back"]',
        BackError: '[data-selector="BackError"]',
        Skin: '[data-selector="Skin"]',
        SkinError: '[data-selector="SkinError"]',
        Legs: '[data-selector="Legs"]',
        LegsError: '[data-selector="LegsError"]',
        Save: '[data-selector="Save"]',
        BtnUploadImage: '[data-selector="BtnUploadImage"]',
        FileUploadValue: '[data-selector="fileUploadValue"]',
        ImageContainer: '[data-selector="ImageContainer"]',
        ImageFiledError: '[data-selector="imageFiledError"]',

        ProductionTime:'[data-selector="ProductionTime"]',
        ProductionTimeError: '[data-selector="ProductionTimeError"]',

        SkinColour:'[data-selector="SkinColour"]',
        SkinColourError:'[data-selector="SkinColourError"]'
    };

NewArmchair.Messages =
{
    FieldIsRequired: 'Field is required',
    PleaseProvideIntValue: 'Please, provide a number'
};

NewArmchair.ImagePath = null;

NewArmchair.Init = function () {
    $(NewArmchair.Selectors.Name).focusout(function () {
        Validator.ValidateTextFiled(NewArmchair.Selectors.Name, NewArmchair.Selectors.NameError, NewArmchair.Messages.FieldIsRequired);
    });

    $(NewArmchair.Selectors.Price).focusout(function () {
        if (Validator.ValidateTextFiled(NewArmchair.Selectors.Price, NewArmchair.Selectors.PriceError, NewArmchair.Messages.FieldIsRequired)) {
            var result = Validator.TryParseDouble($(NewArmchair.Selectors.Price).val(), null);

            if (result == null) {
                Validator.Mark(NewArmchair.Selectors.PriceError, NewArmchair.Messages.PleaseProvideIntValue);
            }
            else {
                Validator.Mark(NewArmchair.Selectors.PriceError, '');
            }
        }
    });

    $(NewArmchair.Selectors.WoodenFrame).focusout(function () {
        Validator.ValidateTextFiled(NewArmchair.Selectors.WoodenFrame, NewArmchair.Selectors.WoodenFrameError, NewArmchair.Messages.FieldIsRequired);
    });

    $(NewArmchair.Selectors.Width).focusout(function () {
        Validator.ValidateTextFiled(NewArmchair.Selectors.Width, NewArmchair.Selectors.WidthError, NewArmchair.Messages.FieldIsRequired);
    });

    $(NewArmchair.Selectors.Height).focusout(function () {
        Validator.ValidateTextFiled(NewArmchair.Selectors.Height, NewArmchair.Selectors.HeightError, NewArmchair.Messages.FieldIsRequired);
    });

    $(NewArmchair.Selectors.Depth).focusout(function () {
        Validator.ValidateTextFiled(NewArmchair.Selectors.Depth, NewArmchair.Selectors.DepthError, NewArmchair.Messages.FieldIsRequired);
    });

    $(NewArmchair.Selectors.Seat).focusout(function () {
        Validator.ValidateTextFiled(NewArmchair.Selectors.Seat, NewArmchair.Selectors.SeatError, NewArmchair.Messages.FieldIsRequired);
    });

    $(NewArmchair.Selectors.Back).focusout(function () {
        Validator.ValidateTextFiled(NewArmchair.Selectors.Back, NewArmchair.Selectors.BackError, NewArmchair.Messages.FieldIsRequired);
    });

    $(NewArmchair.Selectors.Skin).focusout(function () {
        Validator.ValidateTextFiled(NewArmchair.Selectors.Skin, NewArmchair.Selectors.SkinError, NewArmchair.Messages.FieldIsRequired);
    });

    $(NewArmchair.Selectors.SkinColour).focusout(function () {
        Validator.ValidateTextFiled(NewArmchair.Selectors.SkinColour, NewArmchair.Selectors.SkinColourError, NewArmchair.Messages.FieldIsRequired);
    });

    $(NewArmchair.Selectors.Legs).focusout(function () {
        Validator.ValidateTextFiled(NewArmchair.Selectors.Legs, NewArmchair.Selectors.LegsError, NewArmchair.Messages.FieldIsRequired);
    });

    $(NewArmchair.Selectors.ProductionTime).focusout(function () {
        Validator.ValidateTextFiled(NewArmchair.Selectors.ProductionTime, NewArmchair.Selectors.ProductionTimeError, NewArmchair.Messages.FieldIsRequired);
    });

    $(NewArmchair.Selectors.BtnUploadImage).on('click', function () {
        if ($(NewArmchair.Selectors.FileUploadValue).val().length > 0) {
            NewArmchair.UploadImage();
        }
    });

    $(NewArmchair.Selectors.Save).on('click', function () {
        if (NewArmchair.FormIsValid()) {
            NewArmchair.Save();
        }
    });
};

NewArmchair.FormIsValid = function () {
    var isValid = true;

    if (NewArmchair.ImagePath == null || NewArmchair.ImagePath.length == 0) {
        isValid = false && isValid;

        $(NewArmchair.Selectors.ImageFiledError).text('Image is required');
    }
    else {
        isValid = NewArmchair.ImagePath.length > 0 && isValid;
    }

    isValid = Validator.ValidateTextFiled(NewArmchair.Selectors.Name, NewArmchair.Selectors.NameError, NewArmchair.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewArmchair.Selectors.WoodenFrame, NewArmchair.Selectors.WoodenFrameError, NewArmchair.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewArmchair.Selectors.Width, NewArmchair.Selectors.WidthError, NewArmchair.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewArmchair.Selectors.Height, NewArmchair.Selectors.HeightError, NewArmchair.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewArmchair.Selectors.Depth, NewArmchair.Selectors.DepthError, NewArmchair.Messages.FieldIsRequired) && isValid;

    isValid = NewArmchair.ValidateReducePrice() && isValid;

    isValid = NewArmchair.ValidatePrice() && isValid;

    isValid = Validator.ValidateTextFiled(NewArmchair.Selectors.Seat, NewArmchair.Selectors.SeatError, NewArmchair.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewArmchair.Selectors.Back, NewArmchair.Selectors.BackError, NewArmchair.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewArmchair.Selectors.Skin, NewArmchair.Selectors.SkinError, NewArmchair.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewArmchair.Selectors.Legs, NewArmchair.Selectors.LegsError, NewArmchair.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewArmchair.Selectors.ProductionTime, NewArmchair.Selectors.ProductionTimeError, NewArmchair.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewArmchair.Selectors.SkinColour, NewArmchair.Selectors.SkinColourError, NewArmchair.Messages.FieldIsRequired) && isValid;

    return isValid;
};

NewArmchair.ValidateReducePrice = function () {
    if ($(NewArmchair.Selectors.ReducedPrice).val() != '') {

        var result = Validator.TryParseDouble($(NewArmchair.Selectors.ReducedPrice).val(), null);

        if (result == null) {
            Validator.Mark(NewArmchair.Selectors.ReducedPriceError, NewArmchair.Messages.PleaseProvideIntValue);

            return false;
        }
        else {
            Validator.Mark(NewArmchair.Selectors.ReducedPriceError, '');

            return true;
        }
    }

    return true;
};

NewArmchair.ValidatePrice = function () {
    if ($(NewArmchair.Selectors.Price).val() != '') {

        var result = Validator.TryParseDouble($(NewArmchair.Selectors.Price).val(), null);

        if (result == null) {
            Validator.Mark(NewArmchair.Selectors.Price, NewArmchair.Messages.PleaseProvideIntValue);

            return false;
        }
        else {
            Validator.Mark(NewArmchair.Selectors.Price, '');

            return true;
        }
    }
    else {

        Validator.Mark(NewArmchair.Selectors.PriceError, NewArmchair.Messages.PleaseProvideIntValue);

        return false;
    }
}

NewArmchair.UploadImage = function () {
    var data = new FormData();
    data.append('file', $(NewArmchair.Selectors.FileUploadValue)[0].files[0]);

    $.ajax({
        url: '/Armchairs/UploadFile',
        data: data,
        type: 'POST',
        processData: false,
        contentType: false,
        success: function (data) {
            $("[data-selector='imageFiledError']").html('');
            $(NewArmchair.Selectors.FileUploadValue).val('');

            if (data.Status) {
                $(NewArmchair.Selectors.ImageContainer).html('');
                $(NewArmchair.Selectors.ImageContainer).html('<img src="' + data.ImagePath + '"/>');
                NewArmchair.ImagePath = data.ImagePath;
            }
            else {
                if (data.Message && data.Message.length > 0) {
                    $("[data-selector='imageFiledError']").html(data.Message);
                }
            }
        }
    });
};

NewArmchair.Save = function () {
    var config = new RequestConfigNameSpace.AjaxConfig('/Armchairs/AddArmchair', {
        Name: $(NewArmchair.Selectors.Name).val(),
        Descrption: $(NewArmchair.Selectors.Description).val(),
        ImagePath: NewArmchair.ImagePath,
        Price: $(NewArmchair.Selectors.Price).val(),
        NewPrice: $(NewArmchair.Selectors.ReducedPrice).val(),
        WoodenFrame: $(NewArmchair.Selectors.WoodenFrame).val(),
        Seat: $(NewArmchair.Selectors.Seat).val(),
        Back: $(NewArmchair.Selectors.Back).val(),
        Width: $(NewArmchair.Selectors.Width).val(),
        Height: $(NewArmchair.Selectors.Height).val(),
        Depth: $(NewArmchair.Selectors.Depth).val(),
        Skin:$(NewArmchair.Selectors.Skin).val(),
        Legs: $(NewArmchair.Selectors.Legs).val(),
        ProductionTime: $(NewArmchair.Selectors.ProductionTime).val(),
        SkinColour: $(NewArmchair.Selectors.SkinColour).val()
    }, null, null, null, null, function (data) {
        if (data.Status) {
            window.location = '/Administration/Armchairs/Index';
        }
    }, null, null, null);

    RequestWorker.Request.AjaxRequest(config);
};