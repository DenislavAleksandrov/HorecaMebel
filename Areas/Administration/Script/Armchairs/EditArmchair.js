var EditArmchair = {};

EditArmchair.Selectors = 
    {
        ImageContainer:'[data-selector="ImageContainer"]',
        ImageFiledError: '[data-selector="imageFiledError"]',
        BtnUploadImage: '[data-selector="BtnUploadImage"]',
        Name: '[data-selector="Name"]',
        NameError: '[data-selector="NameError"]',
        Price: '[data-selector="Price"]',
        PriceError: '[data-selector="PriceError"]',
        ReducedPrice: '[data-selector="ReducedPrice"]',
        ReducedPriceError: '[data-selector="ReducedPriceError"]',
        Description: '[data-selector="Description"]',
        DescriptionError: '[data-selector="DescriptionError"]',
        WoodenFrame: '[data-selector="WoodenFrame"]',
        WoodenFrameError: '[data-selector="WoodenFrameError"]',
        Width: '[data-selector="Width" ]',
        WidthError: '[data-selector="WidthError"]',
        Height: '[data-selector="Height"]',
        HeightError: '[data-selector="HeightError"]',
        Depth: '[data-selector="Depth"]',
        DepthError: '[data-selector="DepthError"]',
        Seat: '[data-selector="Seat"]',
        SeatError: '[data-selector="SeatError"]',
        Back: '[data-selector="Back" ]',
        BackError: '[data-selector="BackError"]',
        Skin: '[data-selector="Skin"]',
        SkinError: '[data-selector="SkinError"]',
        Legs: '[data-selector="Legs"]',
        LegsError: '[data-selector="LegsError"]',
        Save: '[data-selector="Save"]',
        FileUploadValue: '[data-selector="fileUploadValue"]',
        ProductionTime:'[data-selector="ProductionTime"]',
        ProductionTimeError: '[data-selector="ProductionTimeError"]',

        SkinColour:'[data-selector="SkinColour"]',
        SkinColourError:'[data-selector="SkinColourError"]'
    };

EditArmchair.Messages =
{
    FieldIsRequired: 'Field is required',
    PleaseProvideIntValue: 'Please, provide a number'
};

EditArmchair.ArmchairId = null;
EditArmchair.ImagePath = null;

EditArmchair.Init = function (armchairId, imagePath) {

    EditArmchair.ArmchairId = armchairId;
    EditArmchair.ImagePath = imagePath;

    $(EditArmchair.Selectors.Name).focusout(function () {
        Validator.ValidateTextFiled(EditArmchair.Selectors.Name, EditArmchair.Selectors.NameError, EditArmchair.Messages.FieldIsRequired);
    });

    $(EditArmchair.Selectors.Price).focusout(function () {
        if (Validator.ValidateTextFiled(EditArmchair.Selectors.Price, EditArmchair.Selectors.PriceError, EditArmchair.Messages.FieldIsRequired)) {
            var result = Validator.TryParseDouble($(EditArmchair.Selectors.Price).val(), null);

            if (result == null) {
                Validator.Mark(EditArmchair.Selectors.PriceError, EditArmchair.Messages.PleaseProvideIntValue);
            }
            else {
                Validator.Mark(EditArmchair.Selectors.PriceError, '');
            }
        }
    });

    $(EditArmchair.Selectors.WoodenFrame).focusout(function () {
        Validator.ValidateTextFiled(EditArmchair.Selectors.WoodenFrame, EditArmchair.Selectors.WoodenFrameError, EditArmchair.Messages.FieldIsRequired);
    });

    $(EditArmchair.Selectors.Width).focusout(function () {
        Validator.ValidateTextFiled(EditArmchair.Selectors.Width, EditArmchair.Selectors.WidthError, EditArmchair.Messages.FieldIsRequired);
    });

    $(EditArmchair.Selectors.SkinColour).focusout(function () {
        Validator.ValidateTextFiled(EditArmchair.Selectors.SkinColour, EditArmchair.Selectors.SkinColourError, EditArmchair.Messages.FieldIsRequired);
    });

    $(EditArmchair.Selectors.Height).focusout(function () {
        Validator.ValidateTextFiled(EditArmchair.Selectors.Height, EditArmchair.Selectors.HeightError, EditArmchair.Messages.FieldIsRequired);
    });

    $(EditArmchair.Selectors.Depth).focusout(function () {
        Validator.ValidateTextFiled(EditArmchair.Selectors.Depth, EditArmchair.Selectors.DepthError, EditArmchair.Messages.FieldIsRequired);
    });

    $(EditArmchair.Selectors.Seat).focusout(function () {
        Validator.ValidateTextFiled(EditArmchair.Selectors.Seat, EditArmchair.Selectors.SeatError, EditArmchair.Messages.FieldIsRequired);
    });

    $(EditArmchair.Selectors.Back).focusout(function () {
        Validator.ValidateTextFiled(EditArmchair.Selectors.Back, EditArmchair.Selectors.BackError, EditArmchair.Messages.FieldIsRequired);
    });

    $(EditArmchair.Selectors.Skin).focusout(function () {
        Validator.ValidateTextFiled(EditArmchair.Selectors.Skin, EditArmchair.Selectors.SkinError, EditArmchair.Messages.FieldIsRequired);
    });

    $(EditArmchair.Selectors.Legs).focusout(function () {
        Validator.ValidateTextFiled(EditArmchair.Selectors.Legs, EditArmchair.Selectors.LegsError, EditArmchair.Messages.FieldIsRequired);
    });

    $(EditArmchair.Selectors.ProductionTime).focusout(function () {
        Validator.ValidateTextFiled(EditArmchair.Selectors.ProductionTime, EditArmchair.Selectors.ProductionTimeError, EditArmchair.Messages.FieldIsRequired);
    });

    $(EditArmchair.Selectors.BtnUploadImage).on('click', function () {
        if ($(EditArmchair.Selectors.FileUploadValue).val().length > 0) {
            EditArmchair.UploadImage();
        }
    });

    $(EditArmchair.Selectors.Save).on('click', function () {
        if (EditArmchair.FormIsValid()) {
            EditArmchair.Save();
        }
    });
};

EditArmchair.FormIsValid = function () {
    var isValid = true;

    if (EditArmchair.ImagePath == null || EditArmchair.ImagePath.length == 0) {
        isValid = false && isValid;

        $(EditArmchair.Selectors.ImageFiledError).text('Image is required');
    }
    else {
        isValid = EditArmchair.ImagePath.length > 0 && isValid;
    }

    isValid = Validator.ValidateTextFiled(EditArmchair.Selectors.Name, EditArmchair.Selectors.NameError, EditArmchair.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(EditArmchair.Selectors.WoodenFrame, EditArmchair.Selectors.WoodenFrameError, EditArmchair.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(EditArmchair.Selectors.Width, EditArmchair.Selectors.WidthError, EditArmchair.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(EditArmchair.Selectors.Height, EditArmchair.Selectors.HeightError, EditArmchair.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(EditArmchair.Selectors.Height, EditArmchair.Selectors.DepthError, EditArmchair.Messages.FieldIsRequired) && isValid;

    isValid = EditArmchair.ValidateReducePrice() && isValid;

    isValid = EditArmchair.ValidatePrice() && isValid;

    isValid = Validator.ValidateTextFiled(EditArmchair.Selectors.Seat, EditArmchair.Selectors.SeatError, EditArmchair.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(EditArmchair.Selectors.Back, EditArmchair.Selectors.BackError, EditArmchair.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(EditArmchair.Selectors.Skin, EditArmchair.Selectors.SkinError, EditArmchair.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(EditArmchair.Selectors.Legs, EditArmchair.Selectors.LegsError, EditArmchair.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(EditArmchair.Selectors.ProductionTime, EditArmchair.Selectors.ProductionTimeError, EditArmchair.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(EditArmchair.Selectors.SkinColour, EditArmchair.Selectors.SkinColourError, EditArmchair.Messages.FieldIsRequired) && isValid;

    return isValid;
};

EditArmchair.ValidateReducePrice = function () {
    if ($(EditArmchair.Selectors.ReducedPrice).val() != '') {

        var result = Validator.TryParseDouble($(EditArmchair.Selectors.ReducedPrice).val(), null);

        if (result == null) {
            Validator.Mark(EditArmchair.Selectors.ReducedPriceError, EditArmchair.Messages.PleaseProvideIntValue);

            return false;
        }
        else {
            Validator.Mark(EditArmchair.Selectors.ReducedPriceError, '');

            return true;
        }
    }

    return true;
};

EditArmchair.ValidatePrice = function () {
    if ($(EditArmchair.Selectors.Price).val() != '') {

        var result = Validator.TryParseDouble($(EditArmchair.Selectors.Price).val(), null);

        if (result == null) {
            Validator.Mark(EditArmchair.Selectors.Price, EditArmchair.Messages.PleaseProvideIntValue);

            return false;
        }
        else {
            Validator.Mark(EditArmchair.Selectors.Price, '');

            return true;
        }
    }
    else {

        Validator.Mark(EditArmchair.Selectors.PriceError, EditArmchair.Messages.PleaseProvideIntValue);

        return false;
    }
}

EditArmchair.Save = function () {
    var config = new RequestConfigNameSpace.AjaxConfig('/Armchairs/EditArmchair', {
        id: EditArmchair.ArmchairId,
        Name: $(EditArmchair.Selectors.Name).val(),
        Descrption: $(EditArmchair.Selectors.Description).val(),
        ImagePath: EditArmchair.ImagePath,
        Price: $(EditArmchair.Selectors.Price).val(),
        NewPrice: $(EditArmchair.Selectors.ReducedPrice).val(),
        WoodenFrame: $(EditArmchair.Selectors.WoodenFrame).val(),
        Seat: $(EditArmchair.Selectors.Seat).val(),
        Back: $(EditArmchair.Selectors.Back).val(),
        Width: $(EditArmchair.Selectors.Width).val(),
        Height: $(EditArmchair.Selectors.Height).val(),
        Depth: $(EditArmchair.Selectors.Depth).val(),
        Skin: $(EditArmchair.Selectors.Skin).val(),
        Legs: $(EditArmchair.Selectors.Legs).val(),
        ProductionTime: $(EditArmchair.Selectors.ProductionTime).val(),
        SkinColour: $(EditArmchair.Selectors.SkinColour).val()
    }, null, null, null, null, function (data) {
        if (data.Status) {
            window.location = '/Administration/Armchairs/Index';
        }
    }, null, null, null);

    RequestWorker.Request.AjaxRequest(config);
};

EditArmchair.UploadImage = function () {
    var data = new FormData();
    data.append('file', $(EditArmchair.Selectors.FileUploadValue)[0].files[0]);

    $.ajax({
        url: '/Armchairs/UploadFile',
        data: data,
        type: 'POST',
        processData: false,
        contentType: false,
        success: function (data) {
            $("[data-selector='imageFiledError']").html('');
            $(EditArmchair.Selectors.FileUploadValue).val('');

            if (data.Status) {
                $(EditArmchair.Selectors.ImageContainer).html('');
                $(EditArmchair.Selectors.ImageContainer).html('<img src="' + data.ImagePath + '"/>');
                EditArmchair.ImagePath = data.ImagePath;
            }
            else {
                if (data.Message && data.Message.length > 0) {
                    $("[data-selector='imageFiledError']").html(data.Message);
                }
            }
        }
    });
};

