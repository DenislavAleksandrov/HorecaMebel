var EditCubeSeat = {};

EditCubeSeat.Selectors =
    {
        ImageContainer: '[data-selector="ImageContainer"]',
        FileUploadValue: '[data-selector="fileUploadValue" ]',
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
        Seat: '[data-selector="Seat"]',
        SeatError: '[data-selector="SeatError"]',
        Width: '[data-selector="Width"]',
        WidthError: '[data-selector="WidthError"]',
        Height: '[data-selector="Height"]',
        HeightError: '[data-selector="HeightError"]',
        Depth: '[data-selector="Depth"]',
        DepthError: '[data-selector="DepthError"]',
        Skin: '[data-selector="Skin"]',
        SkinError: '[data-selector="SkinError"]',
        Legs: '[data-selector="Legs"]',
        LegsError: '[data-selector="LegsError"]',
        Save: '[data-selector="Save"]',
        ProductionTime:'[data-selector="ProductionTime"]',
        ProductionTimeError: '[data-selector="ProductionTimeError"]',

        SkinColour:'[data-selector="SkinColour"]',
        SkinColourError:'[data-selector="SkinColourError"]'
    };

EditCubeSeat.Messages =
    {
        FieldIsRequired: 'Field is required',
        PleaseProvideIntValue: 'Please, provide a number'
    };

EditCubeSeat.Id = null;
EditCubeSeat.ImagePath = null;

EditCubeSeat.Init = function (id, imagePath) {

    EditCubeSeat.Id = id;
    EditCubeSeat.ImagePath = imagePath;

    $(EditCubeSeat.Selectors.Name).focusout(function () {
        Validator.ValidateTextFiled(EditCubeSeat.Selectors.Name, EditCubeSeat.Selectors.NameError, EditCubeSeat.Messages.FieldIsRequired);
    });

    $(EditCubeSeat.Selectors.BtnUploadImage).on('click', function () {
        if ($(EditCubeSeat.Selectors.FileUploadValue).val().length > 0) {
            EditCubeSeat.UploadImage();
        }
    });

    $(EditCubeSeat.Selectors.Price).focusout(function () {
        if (Validator.ValidateTextFiled(EditCubeSeat.Selectors.Price, EditCubeSeat.Selectors.PriceError, EditCubeSeat.Messages.FieldIsRequired)) {
            var result = Validator.TryParseDouble($(EditCubeSeat.Selectors.Price).val(), null);

            if (result == null) {
                Validator.Mark(EditCubeSeat.Selectors.PriceError, EditCubeSeat.Messages.PleaseProvideIntValue);
            }
            else {
                Validator.Mark(EditCubeSeat.Selectors.PriceError, '');
            }
        }
    });

    $(EditCubeSeat.Selectors.ReducedPrice).focusout(function () {
        EditCubeSeat.ValidateReducePrice();
    });

    $(EditCubeSeat.Selectors.SkinColour).focusout(function () {
        Validator.ValidateTextFiled(EditCubeSeat.Selectors.SkinColour, EditCubeSeat.Selectors.SkinColourError, EditCubeSeat.Messages.FieldIsRequired);
    });

    $(EditCubeSeat.Selectors.ProductionTime).focusout(function () {
        Validator.ValidateTextFiled(EditCubeSeat.Selectors.ProductionTime, EditCubeSeat.Selectors.ProductionTimeError, EditCubeSeat.Messages.FieldIsRequired);
    });

    $(EditCubeSeat.Selectors.WoodenFrame).focusout(function () {
        Validator.ValidateTextFiled(EditCubeSeat.Selectors.WoodenFrame, EditCubeSeat.Selectors.WoodenFrameError, EditCubeSeat.Messages.FieldIsRequired);
    });

    $(EditCubeSeat.Selectors.Seat).focusout(function () {
        Validator.ValidateTextFiled(EditCubeSeat.Selectors.Seat, EditCubeSeat.Selectors.SeatError, EditCubeSeat.Messages.FieldIsRequired);
    });

    $(EditCubeSeat.Selectors.Width).focusout(function () {
        Validator.ValidateTextFiled(EditCubeSeat.Selectors.Width, EditCubeSeat.Selectors.WidthError, EditCubeSeat.Messages.FieldIsRequired);
    });

    $(EditCubeSeat.Selectors.Height).focusout(function () {
        Validator.ValidateTextFiled(EditCubeSeat.Selectors.Height, EditCubeSeat.Selectors.HeightError, EditCubeSeat.Messages.FieldIsRequired);
    });

    $(EditCubeSeat.Selectors.Depth).focusout(function () {
        Validator.ValidateTextFiled(EditCubeSeat.Selectors.Depth, EditCubeSeat.Selectors.DepthError, EditCubeSeat.Messages.FieldIsRequired);
    });

    $(EditCubeSeat.Selectors.Skin).focusout(function () {
        Validator.ValidateTextFiled(EditCubeSeat.Selectors.Skin, EditCubeSeat.Selectors.SkinError, EditCubeSeat.Messages.FieldIsRequired);
    });

    $(EditCubeSeat.Selectors.Legs).focusout(function () {
        Validator.ValidateTextFiled(EditCubeSeat.Selectors.Legs, EditCubeSeat.Selectors.LegsError, EditCubeSeat.Messages.FieldIsRequired);
    });

    $(EditCubeSeat.Selectors.Save).on('click', function () {
        if (EditCubeSeat.FormIsValid()) {
            EditCubeSeat.Save();
        }
    });
};

EditCubeSeat.Save = function () {
    var config = new RequestConfigNameSpace.AjaxConfig('/CubeSeat/EditCubeSeat', {
        Id:EditCubeSeat.Id,
        Name: $(EditCubeSeat.Selectors.Name).val(),
        Description: $(EditCubeSeat.Selectors.Description).val(),
        ImagePath: EditCubeSeat.ImagePath,
        Price: $(EditCubeSeat.Selectors.Price).val(),
        NewPrice: $(EditCubeSeat.Selectors.ReducedPrice).val(),
        WoodenFrame: $(EditCubeSeat.Selectors.WoodenFrame).val(),
        Width: $(EditCubeSeat.Selectors.Width).val(),
        Height: $(EditCubeSeat.Selectors.Height).val(),
        Depth: $(EditCubeSeat.Selectors.Depth).val(),
        Skin: $(EditCubeSeat.Selectors.Skin).val(),
        Legs: $(EditCubeSeat.Selectors.Legs).val(),
        Seat: $(EditCubeSeat.Selectors.Seat).val(),
        ProductionTime: $(EditCubeSeat.Selectors.ProductionTime).val(),
        SkinColour: $(EditCubeSeat.Selectors.SkinColour).val()
    }, null, null, null, null, function (data) {
        if (data.Status) {
            window.location = '/Administration/CubeSeat/Index';
        }
    }, null, null, null);

    RequestWorker.Request.AjaxRequest(config);
};

EditCubeSeat.FormIsValid = function () {
    var isValid = true;

    if (EditCubeSeat.ImagePath == null || EditCubeSeat.ImagePath.length == 0) {
        isValid = false && isValid;

        $(EditCubeSeat.Selectors.ImageFiledError).text('Image is required');
    }
    else {
        isValid = EditCubeSeat.ImagePath.length > 0 && isValid;

    }

    isValid = Validator.ValidateTextFiled(EditCubeSeat.Selectors.SkinColour, EditCubeSeat.Selectors.SkinColourError, EditCubeSeat.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(EditCubeSeat.Selectors.ProductionTime, EditCubeSeat.Selectors.ProductionTimeError, EditCubeSeat.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(EditCubeSeat.Selectors.Width, EditCubeSeat.Selectors.WidthError, EditCubeSeat.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(EditCubeSeat.Selectors.Height, EditCubeSeat.Selectors.HeightError, EditCubeSeat.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(EditCubeSeat.Selectors.Height, EditCubeSeat.Selectors.DepthError, EditCubeSeat.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(EditCubeSeat.Selectors.Skin, EditCubeSeat.Selectors.SkinError, EditCubeSeat.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(EditCubeSeat.Selectors.Legs, EditCubeSeat.Selectors.LegsError, EditCubeSeat.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(EditCubeSeat.Selectors.Seat, EditCubeSeat.Selectors.SeatError, EditCubeSeat.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(EditCubeSeat.Selectors.WoodenFrame, EditCubeSeat.Selectors.WoodenFrameError, EditCubeSeat.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(EditCubeSeat.Selectors.Name, EditCubeSeat.Selectors.NameError, EditCubeSeat.Messages.FieldIsRequired) && isValid;

    isValid = EditCubeSeat.ValidateReducePrice() && isValid;

    isValid = EditCubeSeat.ValidatePrice() && isValid;

    return isValid;
};

EditCubeSeat.UploadImage = function () {
    var data = new FormData();
    data.append('file', $(EditCubeSeat.Selectors.FileUploadValue)[0].files[0]);

    $.ajax({
        url: '/CubeSeat/UploadFile',
        data: data,
        type: 'POST',
        processData: false,
        contentType: false,
        success: function (data) {
            $("[data-selector='imageFiledError']").html('');
            $(EditCubeSeat.Selectors.FileUploadValue).val('');

            if (data.Status) {
                $(EditCubeSeat.Selectors.ImageContainer).html('');
                $(EditCubeSeat.Selectors.ImageContainer).html('<img src="' + data.ImagePath + '"/>');
                EditCubeSeat.ImagePath = data.ImagePath;
            }
            else {
                if (data.Message && data.Message.length > 0) {
                    $("[data-selector='imageFiledError']").html(data.Message);
                }
            }
        }
    });
};

EditCubeSeat.ValidateReducePrice = function () {
    if ($(EditCubeSeat.Selectors.ReducedPrice).val() != '') {

        var result = Validator.TryParseDouble($(EditCubeSeat.Selectors.ReducedPrice).val(), null);

        if (result == null) {
            Validator.Mark(EditCubeSeat.Selectors.ReducedPriceError, EditCubeSeat.Messages.PleaseProvideIntValue);

            return false;
        }
        else {
            Validator.Mark(EditCubeSeat.Selectors.ReducedPriceError, '');

            return true;
        }
    }

    return true;
};

EditCubeSeat.ValidatePrice = function () {
    if ($(EditCubeSeat.Selectors.Price).val() != '') {

        var result = Validator.TryParseDouble($(EditCubeSeat.Selectors.Price).val(), null);

        if (result == null) {
            Validator.Mark(EditCubeSeat.Selectors.Price, EditCubeSeat.Messages.PleaseProvideIntValue);

            return false;
        }
        else {
            Validator.Mark(EditCubeSeat.Selectors.Price, '');

            return true;
        }
    }
    else {

        Validator.Mark(EditCubeSeat.Selectors.PriceError, EditCubeSeat.Messages.PleaseProvideIntValue);

        return false;
    }
};