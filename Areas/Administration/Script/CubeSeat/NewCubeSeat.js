var NewCubeSeat = {};

NewCubeSeat.Selectors = 
    {
        ImageContainer:'[data-selector="ImageContainer"]',
        FileUploadValue:'[data-selector="fileUploadValue" ]',
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

NewCubeSeat.Messages =
    {
        FieldIsRequired: 'Field is required',
        PleaseProvideIntValue: 'Please, provide a number'
    };

NewCubeSeat.ImagePath = null;

NewCubeSeat.Init = function () {
    $(NewCubeSeat.Selectors.Name).focusout(function () {
        Validator.ValidateTextFiled(NewCubeSeat.Selectors.Name, NewCubeSeat.Selectors.NameError, NewCubeSeat.Messages.FieldIsRequired);
    });

    $(NewCubeSeat.Selectors.BtnUploadImage).on('click', function () {
        if ($(NewCubeSeat.Selectors.FileUploadValue).val().length > 0) {
            NewCubeSeat.UploadImage();
        }
    });

    $(NewCubeSeat.Selectors.Price).focusout(function () {
        if (Validator.ValidateTextFiled(NewCubeSeat.Selectors.Price, NewCubeSeat.Selectors.PriceError, NewCubeSeat.Messages.FieldIsRequired)) {
            var result = Validator.TryParseDouble($(NewCubeSeat.Selectors.Price).val(), null);

            if (result == null) {
                Validator.Mark(NewCubeSeat.Selectors.PriceError, NewCubeSeat.Messages.PleaseProvideIntValue);
            }
            else {
                Validator.Mark(NewCubeSeat.Selectors.PriceError, '');
            }
        }
    });

    $(NewCubeSeat.Selectors.ReducedPrice).focusout(function () {
        NewCubeSeat.ValidateReducePrice();
    });

    $(NewCubeSeat.Selectors.WoodenFrame).focusout(function () {
        Validator.ValidateTextFiled(NewCubeSeat.Selectors.WoodenFrame, NewCubeSeat.Selectors.WoodenFrameError, NewCubeSeat.Messages.FieldIsRequired);
    });

    $(NewCubeSeat.Selectors.Seat).focusout(function () {
        Validator.ValidateTextFiled(NewCubeSeat.Selectors.Seat, NewCubeSeat.Selectors.SeatError, NewCubeSeat.Messages.FieldIsRequired);
    });

    $(NewCubeSeat.Selectors.Width).focusout(function () {
        Validator.ValidateTextFiled(NewCubeSeat.Selectors.Width, NewCubeSeat.Selectors.WidthError, NewCubeSeat.Messages.FieldIsRequired);
    });

    $(NewCubeSeat.Selectors.Height).focusout(function () {
        Validator.ValidateTextFiled(NewCubeSeat.Selectors.Height, NewCubeSeat.Selectors.HeightError, NewCubeSeat.Messages.FieldIsRequired);
    });

    $(NewCubeSeat.Selectors.SkinColour).focusout(function () {
        Validator.ValidateTextFiled(NewCubeSeat.Selectors.SkinColour, NewCubeSeat.Selectors.SkinColourError, NewCubeSeat.Messages.FieldIsRequired);
    });

    $(NewCubeSeat.Selectors.Depth).focusout(function () {
        Validator.ValidateTextFiled(NewCubeSeat.Selectors.Depth, NewCubeSeat.Selectors.DepthError, NewCubeSeat.Messages.FieldIsRequired);
    });

    $(NewCubeSeat.Selectors.Skin).focusout(function () {
        Validator.ValidateTextFiled(NewCubeSeat.Selectors.Skin, NewCubeSeat.Selectors.SkinError, NewCubeSeat.Messages.FieldIsRequired);
    });

    $(NewCubeSeat.Selectors.Legs).focusout(function () {
        Validator.ValidateTextFiled(NewCubeSeat.Selectors.Legs, NewCubeSeat.Selectors.LegsError, NewCubeSeat.Messages.FieldIsRequired);
    });

    $(NewCubeSeat.Selectors.ProductionTime).focusout(function () {
        Validator.ValidateTextFiled(NewCubeSeat.Selectors.ProductionTime, NewCubeSeat.Selectors.ProductionTimeError, NewCubeSeat.Messages.FieldIsRequired);
    });

    $(NewCubeSeat.Selectors.Save).on('click', function () {
        if (NewCubeSeat.FormIsValid()) {
            NewCubeSeat.Save();
        }
    });
};

NewCubeSeat.Save = function () {
    var config = new RequestConfigNameSpace.AjaxConfig('/CubeSeat/AddCubeSeat', {
        Name: $(NewCubeSeat.Selectors.Name).val(),
        Description: $(NewCubeSeat.Selectors.Description).val(),
        ImagePath: NewCubeSeat.ImagePath,
        Price: $(NewCubeSeat.Selectors.Price).val(),
        NewPrice: $(NewCubeSeat.Selectors.ReducedPrice).val(),
        WoodenFrame: $(NewCubeSeat.Selectors.WoodenFrame).val(),    
        Width: $(NewCubeSeat.Selectors.Width).val(),
        Height: $(NewCubeSeat.Selectors.Height).val(),
        Depth: $(NewCubeSeat.Selectors.Depth).val(),
        Skin: $(NewCubeSeat.Selectors.Skin).val(),
        Legs: $(NewCubeSeat.Selectors.Legs).val(),
        Seat: $(NewCubeSeat.Selectors.Seat).val(),
        ProductionTime: $(NewCubeSeat.Selectors.ProductionTime).val(),
        SkinColour: $(NewCubeSeat.Selectors.SkinColour).val()
    }, null, null, null, null, function (data) {
        if (data.Status) {
            window.location = '/Administration/CubeSeat/Index';
        }
    }, null, null, null);

    RequestWorker.Request.AjaxRequest(config);
};

NewCubeSeat.FormIsValid = function () {
    var isValid = true;

    if (NewCubeSeat.ImagePath == null || NewCubeSeat.ImagePath.length == 0) {
        isValid = false && isValid;

        $(NewCubeSeat.Selectors.ImageFiledError).text('Image is required');
    }
    else {
        isValid = NewCubeSeat.ImagePath.length > 0 && isValid;

    }
    isValid = Validator.ValidateTextFiled(NewCubeSeat.Selectors.SkinColour, NewCubeSeat.Selectors.SkinColourError, NewCubeSeat.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewCubeSeat.Selectors.ProductionTime, NewCubeSeat.Selectors.ProductionTimeError, NewCubeSeat.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewCubeSeat.Selectors.Width, NewCubeSeat.Selectors.WidthError, NewCubeSeat.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewCubeSeat.Selectors.Height, NewCubeSeat.Selectors.HeightError, NewCubeSeat.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewCubeSeat.Selectors.Height, NewCubeSeat.Selectors.DepthError, NewCubeSeat.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewCubeSeat.Selectors.Skin, NewCubeSeat.Selectors.SkinError, NewCubeSeat.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewCubeSeat.Selectors.Legs, NewCubeSeat.Selectors.LegsError, NewCubeSeat.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewCubeSeat.Selectors.Seat, NewCubeSeat.Selectors.SeatError, NewCubeSeat.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewCubeSeat.Selectors.WoodenFrame, NewCubeSeat.Selectors.WoodenFrameError, NewCubeSeat.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewCubeSeat.Selectors.Name, NewCubeSeat.Selectors.NameError, NewCubeSeat.Messages.FieldIsRequired) && isValid;

    isValid = NewCubeSeat.ValidateReducePrice() && isValid;

    isValid = NewCubeSeat.ValidatePrice() && isValid;

    return isValid;
};

NewCubeSeat.ValidateReducePrice = function () {
    if ($(NewCubeSeat.Selectors.ReducedPrice).val() != '') {

        var result = Validator.TryParseDouble($(NewCubeSeat.Selectors.ReducedPrice).val(), null);

        if (result == null) {
            Validator.Mark(NewCubeSeat.Selectors.ReducedPriceError, NewCubeSeat.Messages.PleaseProvideIntValue);

            return false;
        }
        else {
            Validator.Mark(NewCubeSeat.Selectors.ReducedPriceError, '');

            return true;
        }
    }

    return true;
};

NewCubeSeat.ValidatePrice = function () {
    if ($(NewCubeSeat.Selectors.Price).val() != '') {

        var result = Validator.TryParseDouble($(NewCubeSeat.Selectors.Price).val(), null);

        if (result == null) {
            Validator.Mark(NewCubeSeat.Selectors.Price, NewCubeSeat.Messages.PleaseProvideIntValue);

            return false;
        }
        else {
            Validator.Mark(NewCubeSeat.Selectors.Price, '');

            return true;
        }
    }
    else {

        Validator.Mark(NewCubeSeat.Selectors.PriceError, NewCubeSeat.Messages.PleaseProvideIntValue);

        return false;
    }
};

NewCubeSeat.ValidateReducePrice = function () {
    if ($(NewCubeSeat.Selectors.ReducedPrice).val() != '') {

        var result = Validator.TryParseDouble($(NewCubeSeat.Selectors.ReducedPrice).val(), null);

        if (result == null) {
            Validator.Mark(NewCubeSeat.Selectors.ReducedPriceError, NewCubeSeat.Messages.PleaseProvideIntValue);

            return false;
        }
        else {
            Validator.Mark(NewCubeSeat.Selectors.ReducedPriceError, '');

            return true;
        }
    }

    return true;
};

NewCubeSeat.UploadImage = function () {
    var data = new FormData();
    data.append('file', $(NewCubeSeat.Selectors.FileUploadValue)[0].files[0]);

    $.ajax({
        url: '/CubeSeat/UploadFile',
        data: data,
        type: 'POST',
        processData: false,
        contentType: false,
        success: function (data) {
            $("[data-selector='imageFiledError']").html('');
            $(NewCubeSeat.Selectors.FileUploadValue).val('');

            if (data.Status) {
                $(NewCubeSeat.Selectors.ImageContainer).html('');
                $(NewCubeSeat.Selectors.ImageContainer).html('<img src="' + data.ImagePath + '"/>');
                NewCubeSeat.ImagePath = data.ImagePath;
            }
            else {
                if (data.Message && data.Message.length > 0) {
                    $("[data-selector='imageFiledError']").html(data.Message);
                }
            }
        }
    });
};