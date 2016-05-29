var NewSofa = {};

NewSofa.Selectors = {
    ImageContainer: '[data-selector="ImageContainer"]',
    FileUploadValue: '[data-selector="fileUploadValue"]',
    imageFiledError: '[data-selector="imageFiledError"]',
    BtnUploadImage: '[data-selector="BtnUploadImage"]',
    Name: '[data-selector="Name" ]',
    NameError: '[data-selector="NameError"]',
    Price: '[data-selector="Price"]',
    PriceError: '[data-selector="PriceError"]',
    ReducedPrice: '[data-selector="ReducedPrice"]',
    ReducedPriceError: '[data-selector="ReducedPriceError"]',
    Description: '[data-selector="Description"]',
    DescriptionError: '[data-selector="DescriptionError"]',
    WoodenFrame: '[data-selector="WoodenFrame"]',
    WoodenFrameError: '[data-selector="WoodenFrameError"]',
    Seat: '[data-selector="Seat"]',
    SeatError: '[data-selector="SeatError"]',
    Back: '[data-selector="Back"]',
    BackError: '[data-selector="BackError"]',
    Width: '[data-selector="Width" ]',
    WidthError: '[data-selector="WidthError"]',
    Height: '[data-selector="Height"]',
    HeightError: '[data-selector="HeightError"]',
    Depth: '[data-selector="Depth"]',
    DepthError: '[data-selector="DepthError"]',
    Save: '[data-selector="Save"]',
    ImageFiledError: '[data-selector="imageFiledError"]',
    Skin:'[data-selector="Skin" ]',
    SkinError:'[data-selector="SkinError"]',
    Legs:'[data-selector="Legs"]',
    LegsError: '[data-selector="LegsError"]',
    ProductionTime:'[data-selector="ProductionTime"]',
    ProductionTimeError: '[data-selector="ProductionTimeError"]',

    SkinColour:'[data-selector="SkinColour"]',
    SkinColourError:'[data-selector="SkinColourError"]'
};

NewSofa.Messages =
{
    FieldIsRequired: 'Field is required',
    PleaseProvideIntValue: 'Please, provide a number'
};

NewSofa.ImagePath = null;

NewSofa.Init = function () {
    $(NewSofa.Selectors.Name).focusout(function () {
        Validator.ValidateTextFiled(NewSofa.Selectors.Name, NewSofa.Selectors.NameError, NewSofa.Messages.FieldIsRequired);
    });

    $(NewSofa.Selectors.Width).focusout(function () {
        Validator.ValidateTextFiled(NewSofa.Selectors.Width, NewSofa.Selectors.WidthError, NewSofa.Messages.FieldIsRequired);
    });

    $(NewSofa.Selectors.Height).focusout(function () {
        Validator.ValidateTextFiled(NewSofa.Selectors.Height, NewSofa.Selectors.HeightError, NewSofa.Messages.FieldIsRequired);
    });

    $(NewSofa.Selectors.Depth).focusout(function () {
        Validator.ValidateTextFiled(NewSofa.Selectors.Depth, NewSofa.Selectors.DepthError, NewSofa.Messages.FieldIsRequired);
    });

    $(NewSofa.Selectors.Seat).focusout(function () {
        Validator.ValidateTextFiled(NewSofa.Selectors.Seat, NewSofa.Selectors.SeatError, NewSofa.Messages.FieldIsRequired);
    });

    $(NewSofa.Selectors.Back).focusout(function () {
        Validator.ValidateTextFiled(NewSofa.Selectors.Back, NewSofa.Selectors.BackError, NewSofa.Messages.FieldIsRequired);
    });

    $(NewSofa.Selectors.WoodenFrame).focusout(function () {
        Validator.ValidateTextFiled(NewSofa.Selectors.WoodenFrame, NewSofa.Selectors.WoodenFrameError, NewSofa.Messages.FieldIsRequired);
    });

    $(NewSofa.Selectors.Price).focusout(function () {
        if (Validator.ValidateTextFiled(NewSofa.Selectors.Price, NewSofa.Selectors.PriceError, NewSofa.Messages.FieldIsRequired)) {
            var result = Validator.TryParseDouble($(NewSofa.Selectors.Price).val(), null);

            if (result == null) {
                Validator.Mark(NewSofa.Selectors.PriceError, NewSofa.Messages.PleaseProvideIntValue);
            }
            else {
                Validator.Mark(NewSofa.Selectors.PriceError, '');
            }
        }
    });

    $(NewSofa.Selectors.BtnUploadImage).on('click', function () {
        if ($(NewSofa.Selectors.FileUploadValue).val().length > 0) {
            NewSofa.UploadImage();
        }
    });

    $(NewSofa.Selectors.Skin).focusout(function () {
        Validator.ValidateTextFiled(NewSofa.Selectors.Skin, NewSofa.Selectors.SkinError, NewSofa.Messages.FieldIsRequired);
    });

    $(NewSofa.Selectors.Legs).focusout(function () {
        Validator.ValidateTextFiled(NewSofa.Selectors.Legs, NewSofa.Selectors.LegsError, NewSofa.Messages.FieldIsRequired);
    });

    $(NewSofa.Selectors.ProductionTime).focusout(function () {
        Validator.ValidateTextFiled(NewSofa.Selectors.ProductionTime, NewSofa.Selectors.ProductionTimeError, NewSofa.Messages.FieldIsRequired);
    });

    $(NewSofa.Selectors.Save).on('click', function () {
        if (NewSofa.FormIsValid()) {
            NewSofa.Save();
        }
    });

    $(NewSofa.Selectors.SkinColour).focusout(function () {
        Validator.ValidateTextFiled(NewSofa.Selectors.SkinColour, NewSofa.Selectors.SkinColourError, NewSofa.Messages.FieldIsRequired);
    });
};

NewSofa.FormIsValid = function () {
    var isValid = true;

    if (NewSofa.ImagePath == null || NewSofa.ImagePath.length == 0) {
        isValid = false && isValid;

        $(NewSofa.Selectors.ImageFiledError).text('Image is required');
    }
    else {
        isValid = NewSofa.ImagePath.length > 0 && isValid;
    }

    isValid = Validator.ValidateTextFiled(NewSofa.Selectors.Name, NewSofa.Selectors.NameError, NewSofa.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewSofa.Selectors.WoodenFrame, NewSofa.Selectors.WoodenFrameError, NewSofa.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewSofa.Selectors.Width, NewSofa.Selectors.WidthError, NewSofa.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewSofa.Selectors.Height, NewSofa.Selectors.HeightError, NewSofa.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewSofa.Selectors.Depth, NewSofa.Selectors.DepthError, NewSofa.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewSofa.Selectors.SkinColour, NewSofa.Selectors.SkinColourError, NewSofa.Messages.FieldIsRequired) && isValid;

    isValid = NewSofa.ValidateReducePrice() && isValid;

    isValid = NewSofa.ValidatePrice() && isValid;

    isValid = Validator.ValidateTextFiled(NewSofa.Selectors.Seat, NewSofa.Selectors.SeatError, NewSofa.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewSofa.Selectors.Back, NewSofa.Selectors.BackError, NewSofa.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewSofa.Selectors.Skin, NewSofa.Selectors.SkinError, NewSofa.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewSofa.Selectors.Legs, NewSofa.Selectors.LegsError, NewSofa.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewSofa.Selectors.ProductionTime, NewSofa.Selectors.ProductionTimeError, NewSofa.Messages.FieldIsRequired) && isValid;

    return isValid;
};

NewSofa.Save = function () {
    var config = new RequestConfigNameSpace.AjaxConfig('/Sofas/AddSofa', {
        Name: $(NewSofa.Selectors.Name).val(),
        Descrption: $(NewSofa.Selectors.Description).val(),
        ImagePath: NewSofa.ImagePath,
        Price: $(NewSofa.Selectors.Price).val(),
        NewPrice: $(NewSofa.Selectors.ReducedPrice).val(),
        WoodenFrame: $(NewSofa.Selectors.WoodenFrame).val(),
        Seat: $(NewSofa.Selectors.Seat).val(),
        Back: $(NewSofa.Selectors.Back).val(),
        Width: $(NewSofa.Selectors.Width).val(),
        Height: $(NewSofa.Selectors.Height).val(),
        Depth: $(NewSofa.Selectors.Depth).val(),
        Skin: $(NewSofa.Selectors.Skin).val(),
        Legs: $(NewSofa.Selectors.Legs).val(),
        ProductionTime: $(NewSofa.Selectors.ProductionTime).val(),
        SkinColour: $(NewSofa.Selectors.SkinColour)
    }, null, null, null, null, function (data) {
        if (data.Status) {
            window.location = '/Administration/Sofas/Index';
        }
    }, null, null, null);

    RequestWorker.Request.AjaxRequest(config);
};

NewSofa.ValidateReducePrice = function () {
    if ($(NewSofa.Selectors.ReducedPrice).val() != '') {

        var result = Validator.TryParseDouble($(NewSofa.Selectors.ReducedPrice).val(), null);

        if (result == null) {
            Validator.Mark(NewSofa.Selectors.ReducedPriceError, NewSofa.Messages.PleaseProvideIntValue);

            return false;
        }
        else {
            Validator.Mark(NewSofa.Selectors.ReducedPriceError, '');

            return true;
        }
    }

    return true;
};

NewSofa.ValidatePrice = function () {
    if ($(NewSofa.Selectors.Price).val() != '') {

        var result = Validator.TryParseDouble($(NewSofa.Selectors.Price).val(), null);

        if (result == null) {
            Validator.Mark(NewSofa.Selectors.Price, NewSofa.Messages.PleaseProvideIntValue);

            return false;
        }
        else {
            Validator.Mark(NewSofa.Selectors.Price, '');

            return true;
        }
    }
    else {

        Validator.Mark(NewSofa.Selectors.PriceError, NewSofa.Messages.PleaseProvideIntValue);

        return false;
    }
}

NewSofa.UploadImage = function () {
    var data = new FormData();
    data.append('file', $(NewSofa.Selectors.FileUploadValue)[0].files[0]);

    $.ajax({
        url: '/Sofas/UploadFile',
        data: data,
        type: 'POST',
        processData: false,
        contentType: false,
        success: function (data) {
            $("[data-selector='imageFiledError']").html('');
            $(NewSofa.Selectors.FileUploadValue).val('');

            NewSofa.ImagePath = data.ImagePath;

            if (data.Status) {
                $(NewSofa.Selectors.ImageContainer).html('');
                $(NewSofa.Selectors.ImageContainer).html('<img src="' + data.ImagePath + '"/>');
                NewSofa.ImagePath = data.ImagePath;
            }
            else {
                if (data.Message && data.Message.length > 0) {
                    $("[data-selector='imageFiledError']").html(data.Message);
                }
            }
        }
    });
};
