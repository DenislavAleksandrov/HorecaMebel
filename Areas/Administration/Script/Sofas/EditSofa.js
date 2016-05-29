var EditSofa = {};

EditSofa.Selectors = {
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
    Skin: '[data-selector="Skin" ]',
    SkinError: '[data-selector="SkinError"]',
    Legs: '[data-selector="Legs"]',
    LegsError: '[data-selector="LegsError"]',
    ProductionTime: '[data-selector="ProductionTime"]',
    ProductionTimeError: '[data-selector="ProductionTimeError"]',
    SkinColour:'[data-selector="SkinColour"]',
    SkinColourError:'[data-selector="SkinColourError"]'
};

EditSofa.Messages =
{
    FieldIsRequired: 'Field is required',
    PleaseProvideIntValue: 'Please, provide a number'
};

EditSofa.ImagePath = null;
EditSofa.Id = null;

EditSofa.Init = function (id, imagePath) {

    EditSofa.ImagePath = imagePath;
    EditSofa.Id = id;

    $(EditSofa.Selectors.Name).focusout(function () {
        Validator.ValidateTextFiled(EditSofa.Selectors.Name, EditSofa.Selectors.NameError, EditSofa.Messages.FieldIsRequired);
    });

    $(EditSofa.Selectors.Width).focusout(function () {
        Validator.ValidateTextFiled(EditSofa.Selectors.Width, EditSofa.Selectors.WidthError, EditSofa.Messages.FieldIsRequired);
    });

    $(EditSofa.Selectors.Height).focusout(function () {
        Validator.ValidateTextFiled(EditSofa.Selectors.Height, EditSofa.Selectors.HeightError, EditSofa.Messages.FieldIsRequired);
    });

    $(EditSofa.Selectors.Depth).focusout(function () {
        Validator.ValidateTextFiled(EditSofa.Selectors.Depth, EditSofa.Selectors.DepthError, EditSofa.Messages.FieldIsRequired);
    });

    $(EditSofa.Selectors.Seat).focusout(function () {
        Validator.ValidateTextFiled(EditSofa.Selectors.Seat, EditSofa.Selectors.SeatError, EditSofa.Messages.FieldIsRequired);
    });

    $(EditSofa.Selectors.Back).focusout(function () {
        Validator.ValidateTextFiled(EditSofa.Selectors.Back, EditSofa.Selectors.BackError, EditSofa.Messages.FieldIsRequired);
    });

    $(EditSofa.Selectors.WoodenFrame).focusout(function () {
        Validator.ValidateTextFiled(EditSofa.Selectors.WoodenFrame, EditSofa.Selectors.WoodenFrameError, EditSofa.Messages.FieldIsRequired);
    });

    $(EditSofa.Selectors.Price).focusout(function () {
        if (Validator.ValidateTextFiled(EditSofa.Selectors.Price, EditSofa.Selectors.PriceError, EditSofa.Messages.FieldIsRequired)) {
            var result = Validator.TryParseDouble($(EditSofa.Selectors.Price).val(), null);

            if (result == null) {
                Validator.Mark(EditSofa.Selectors.PriceError, EditSofa.Messages.PleaseProvideIntValue);
            }
            else {
                Validator.Mark(EditSofa.Selectors.PriceError, '');
            }
        }
    });

    $(EditSofa.Selectors.BtnUploadImage).on('click', function () {
        if ($(EditSofa.Selectors.FileUploadValue).val().length > 0) {
            EditSofa.UploadImage();
        }
    });

    $(EditSofa.Selectors.Skin).focusout(function () {
        Validator.ValidateTextFiled(EditSofa.Selectors.Skin, EditSofa.Selectors.SkinError, EditSofa.Messages.FieldIsRequired);
    });

    $(EditSofa.Selectors.SkinColour).focusout(function () {
        Validator.ValidateTextFiled(EditSofa.Selectors.SkinColour, EditSofa.Selectors.SkinColourError, EditSofa.Messages.FieldIsRequired);
    });

    $(EditSofa.Selectors.Legs).focusout(function () {
        Validator.ValidateTextFiled(EditSofa.Selectors.Legs, EditSofa.Selectors.LegsError, EditSofa.Messages.FieldIsRequired);
    });

    $(EditSofa.Selectors.ProductionTime).focusout(function () {
        Validator.ValidateTextFiled(EditSofa.Selectors.ProductionTime, EditSofa.Selectors.ProductionTimeError, EditSofa.Messages.FieldIsRequired);
    });

    $(EditSofa.Selectors.Save).on('click', function () {
        if (EditSofa.FormIsValid()) {
            EditSofa.Save();
        }
    });
};

EditSofa.FormIsValid = function () {
    var isValid = true;

    if (EditSofa.ImagePath == null || EditSofa.ImagePath.length == 0) {
        isValid = false && isValid;

        $(EditSofa.Selectors.ImageFiledError).text('Image is required');
    }
    else {
        isValid = EditSofa.ImagePath.length > 0 && isValid;
    }

    isValid = Validator.ValidateTextFiled(EditSofa.Selectors.SkinColour, EditSofa.Selectors.SkinColourError, EditSofa.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(EditSofa.Selectors.Name, EditSofa.Selectors.NameError, EditSofa.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(EditSofa.Selectors.WoodenFrame, EditSofa.Selectors.WoodenFrameError, EditSofa.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(EditSofa.Selectors.Width, EditSofa.Selectors.WidthError, EditSofa.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(EditSofa.Selectors.Height, EditSofa.Selectors.HeightError, EditSofa.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(EditSofa.Selectors.Height, EditSofa.Selectors.DepthError, EditSofa.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(EditSofa.Selectors.Depth, EditSofa.Selectors.DepthError, EditSofa.Messages.FieldIsRequired) && isValid;

    isValid = EditSofa.ValidateReducePrice() && isValid;

    isValid = EditSofa.ValidatePrice() && isValid;

    isValid = Validator.ValidateTextFiled(EditSofa.Selectors.Seat, EditSofa.Selectors.SeatError, EditSofa.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(EditSofa.Selectors.Back, EditSofa.Selectors.BackError, EditSofa.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(EditSofa.Selectors.Skin, EditSofa.Selectors.SkinError, EditSofa.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(EditSofa.Selectors.Legs, EditSofa.Selectors.LegsError, EditSofa.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(EditSofa.Selectors.ProductionTime, EditSofa.Selectors.ProductionTimeError, EditSofa.Messages.FieldIsRequired) && isValid;

    return isValid;
};

EditSofa.ValidateReducePrice = function () {
    if ($(EditSofa.Selectors.ReducedPrice).val() != '') {

        var result = Validator.TryParseDouble($(EditSofa.Selectors.ReducedPrice).val(), null);

        if (result == null) {
            Validator.Mark(EditSofa.Selectors.ReducedPriceError, EditSofa.Messages.PleaseProvideIntValue);

            return false;
        }
        else {
            Validator.Mark(EditSofa.Selectors.ReducedPriceError, '');

            return true;
        }
    }

    return true;
};

EditSofa.ValidatePrice = function () {
    if ($(EditSofa.Selectors.Price).val() != '') {

        var result = Validator.TryParseDouble($(EditSofa.Selectors.Price).val(), null);

        if (result == null) {
            Validator.Mark(EditSofa.Selectors.Price, EditSofa.Messages.PleaseProvideIntValue);

            return false;
        }
        else {
            Validator.Mark(EditSofa.Selectors.Price, '');

            return true;
        }
    }
    else {

        Validator.Mark(EditSofa.Selectors.PriceError, EditSofa.Messages.PleaseProvideIntValue);

        return false;
    }
};

EditSofa.Save = function () {    

    var config = new RequestConfigNameSpace.AjaxConfig('/Sofas/EditSofa', {
        id:EditSofa.Id,
        Name: $(EditSofa.Selectors.Name).val(),
        Description: $(EditSofa.Selectors.Description).val(),
        ImagePath: EditSofa.ImagePath,
        Price: $(EditSofa.Selectors.Price).val(),
        NewPrice: $(EditSofa.Selectors.ReducedPrice).val(),
        WoodenFrame: $(EditSofa.Selectors.WoodenFrame).val(),
        Seat: $(EditSofa.Selectors.Seat).val(),
        Back: $(EditSofa.Selectors.Back).val(),
        Width: $(EditSofa.Selectors.Width).val(),
        Height: $(EditSofa.Selectors.Height).val(),
        Depth: $(EditSofa.Selectors.Depth).val(),
        Skin: $(EditSofa.Selectors.Skin).val(),
        Legs: $(EditSofa.Selectors.Legs).val(),
        ProductionTime: $(EditSofa.Selectors.ProductionTime).val(),
        SkinColour: $(EditSofa.Selectors.SkinColour).val()
    }, null, null, null, null, function (data) {
        if (data.Status) {
            window.location = '/Administration/Sofas/Index';
        }
    }, null, null, null);

    RequestWorker.Request.AjaxRequest(config);
};

EditSofa.UploadImage = function () {
    var data = new FormData();
    data.append('file', $(EditSofa.Selectors.FileUploadValue)[0].files[0]);

    $.ajax({
        url: '/Sofas/UploadFile',
        data: data,
        type: 'POST',
        processData: false,
        contentType: false,
        success: function (data) {
            $("[data-selector='imageFiledError']").html('');
            $(EditSofa.Selectors.FileUploadValue).val('');

            EditSofa.ImagePath = data.ImagePath;

            if (data.Status) {
                $(EditSofa.Selectors.ImageContainer).html('');
                $(EditSofa.Selectors.ImageContainer).html('<img src="' + data.ImagePath + '"/>');
                EditSofa.ImagePath = data.ImagePath;
            }
            else {
                if (data.Message && data.Message.length > 0) {
                    $("[data-selector='imageFiledError']").html(data.Message);
                }
            }
        }
    });
};