var ChairNew = {};

ChairNew.Selectors = {
    Name:'[data-selector="Name"]',
    NameError:'[data-selector="NameError"]',
    Price:'[data-selector="Price"]',
    PriceError:'[data-selector="PriceError"]',
    ReducedPrice:'[data-selector="ReducedPrice"]',
    ReducedPriceError:'[data-selector="ReducedPriceError"]',
    Description:'[data-selector="Description"]',
    DescriptionError:'[data-selector="DescriptionError"]',
    Save: '[data-selector="Save"]',
    FileUploadValue: '[data-selector="fileUploadValue"]',
    BtnUploadImage: '[data-selector="BtnUploadImage"]',
    ImageContainer: '[data-selector="ImageContainer"]',
    ImageFiledError: '[data-selector="imageFiledError"]',

    WoodenFrame:'[data-selector="WoodenFrame"]',
    WoodenFrameError: '[data-selector="WoodenFrameError"]',

    Seat:'[data-selector="Seat"]',
    SeatError:'[data-selector="SeatError"]',

    Back:'[data-selector="Back"]',
    BackError:'[data-selector="BackError"]',

    WoodColor:'[data-selector="WoodColor"]',
    WoodColorError:'[data-selector="WoodColorError"]',

    Width:'[data-selector="Width"]',
    WidthError:'[data-selector="WidthError"]',

    Height:'[data-selector="Height"]',
    HeightError:'[data-selector="HeightError"]',

    Depth: '[data-selector="Depth"]',
    DepthError: '[data-selector="DepthError"]',

    Skin:'[data-selector="Skin"]',
    SkinError: '[data-selector="SkinError"]',

    ProductionTime: '[data-selector="ProductionTime"]',
    ProductionTimeError: '[data-selector="ProductionTimeError"]'
};

ChairNew.Messages = {
    FieldIsRequired: 'Field is required',
    PleaseProvideIntValue: 'Please, provide a number'
};

ChairNew.ImagePath = null;

ChairNew.Init = function () {
    $(ChairNew.Selectors.Name).focusout(function () {
        Validator.ValidateTextFiled(ChairNew.Selectors.Name, ChairNew.Selectors.NameError, ChairNew.Messages.FieldIsRequired);
    });

    $(ChairNew.Selectors.WoodenFrame).focusout(function () {
        Validator.ValidateTextFiled(ChairNew.Selectors.WoodenFrame, ChairNew.Selectors.WoodenFrameError, ChairNew.Messages.FieldIsRequired);
    });

    $(ChairNew.Selectors.Seat).focusout(function () {
        Validator.ValidateTextFiled(ChairNew.Selectors.Seat, ChairNew.Selectors.SeatError, ChairNew.Messages.FieldIsRequired);
    });

    $(ChairNew.Selectors.Back).focusout(function () {
        Validator.ValidateTextFiled(ChairNew.Selectors.Back, ChairNew.Selectors.BackError, ChairNew.Messages.FieldIsRequired);
    });

    $(ChairNew.Selectors.Width).focusout(function () {
        Validator.ValidateTextFiled(ChairNew.Selectors.Width, ChairNew.Selectors.WidthError, ChairNew.Messages.FieldIsRequired);
    });

    $(ChairNew.Selectors.Height).focusout(function () {
        Validator.ValidateTextFiled(ChairNew.Selectors.Height, ChairNew.Selectors.HeightError, ChairNew.Messages.FieldIsRequired);
    });

    $(ChairNew.Selectors.Depth).focusout(function () {
        Validator.ValidateTextFiled(ChairNew.Selectors.Depth, ChairNew.Selectors.DepthError, ChairNew.Messages.FieldIsRequired);
    });

    //$(ChairNew.Selectors.WoodColor).focusout(function () {
    //    Validator.ValidateTextFiled(ChairNew.Selectors.WoodColor, ChairNew.Selectors.WoodColorError, ChairNew.Messages.FieldIsRequired);
    //});

    $(ChairNew.Selectors.ProductionTime).focusout(function () {
        Validator.ValidateTextFiled(ChairNew.Selectors.ProductionTime, ChairNew.Selectors.ProductionTime, ChairNew.Messages.FieldIsRequired);
    });

    $(ChairNew.Selectors.Price).focusout(function () {
        if (Validator.ValidateTextFiled(ChairNew.Selectors.Price, ChairNew.Selectors.PriceError, ChairNew.Messages.FieldIsRequired))
        {
            var result = Validator.TryParseDouble($(ChairNew.Selectors.Price).val(), null);

            if (result == null) {
                Validator.Mark(ChairNew.Selectors.PriceError, ChairNew.Messages.PleaseProvideIntValue);
            }
            else {
                Validator.Mark(ChairNew.Selectors.PriceError, '');
            }
        }
    });

    $(ChairNew.Selectors.ReducedPrice).focusout(function () {
        ChairNew.ValidateReducePrice();
    });

    $(ChairNew.Selectors.BtnUploadImage).on('click', function () {
        if ($(ChairNew.Selectors.FileUploadValue).val().length > 0) {
            ChairNew.UploadImage();
        }
    });

    $(ChairNew.Selectors.Save).on('click', function () {
        if (ChairNew.FormIsValid())
        {
            ChairNew.Save();
        }
    });
};

ChairNew.ValidateReducePrice = function () {
    if ($(ChairNew.Selectors.ReducedPrice).val() != '') {

        var result = Validator.TryParseDouble($(ChairNew.Selectors.ReducedPrice).val(), null);

        if (result == null) {
            Validator.Mark(ChairNew.Selectors.ReducedPriceError, ChairNew.Messages.PleaseProvideIntValue);

            return false;
        }
        else {
            Validator.Mark(ChairNew.Selectors.ReducedPriceError, '');

            return true;
        }
    }

    return true;
};

ChairNew.ValidatePrice = function ()
{
    if ($(ChairNew.Selectors.Price).val() != '') {

        var result = Validator.TryParseDouble($(ChairNew.Selectors.Price).val(), null);

        if (result == null) {
            Validator.Mark(ChairNew.Selectors.Price, ChairNew.Messages.PleaseProvideIntValue);

            return false;
        }
        else {
            Validator.Mark(ChairNew.Selectors.Price, '');

            return true;
        }
    }
    else {

        Validator.Mark(ChairNew.Selectors.PriceError, ChairNew.Messages.PleaseProvideIntValue);

        return false;
    }
}

ChairNew.UploadImage = function () {
    var data = new FormData();
    data.append('file', $(ChairNew.Selectors.FileUploadValue)[0].files[0]);

    $.ajax({
        url: '/Chairs/UploadFile',
        data: data,
        type: 'POST',
        processData: false,
        contentType: false,
        success: function (data) {
            $("[data-selector='imageFiledError']").html('');
            $(ChairNew.Selectors.FileUploadValue).val('');

            if (data.Status) {
                $(ChairNew.Selectors.ImageContainer).html('');
                $(ChairNew.Selectors.ImageContainer).html('<img src="' + data.ImagePath + '"/>');
                ChairNew.ImagePath = data.ImagePath;
            }
            else {
                if (data.Message && data.Message.length > 0) {
                    $("[data-selector='imageFiledError']").html(data.Message);
                }
            }
        }
    });
};

ChairNew.FormIsValid = function()
{
    var isValid = true;

    if (ChairNew.ImagePath == null || ChairNew.ImagePath.length == 0) {
        isValid = false && isValid;

        $(ChairNew.Selectors.ImageFiledError).text('Image is required');
    }
    else {
        isValid = ChairNew.ImagePath.length > 0 && isValid;
    }

    isValid = Validator.ValidateTextFiled(ChairNew.Selectors.Name, ChairNew.Selectors.NameError, ChairNew.Messages.FieldIsRequired) && isValid;

    isValid = ChairNew.ValidateReducePrice() && isValid;

    isValid = ChairNew.ValidatePrice() && isValid;

    isValid = Validator.ValidateTextFiled(ChairNew.Selectors.WoodenFrame, ChairNew.Selectors.WoodenFrameError, ChairNew.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(ChairNew.Selectors.Seat, ChairNew.Selectors.SeatError, ChairNew.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(ChairNew.Selectors.Back, ChairNew.Selectors.BackError, ChairNew.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(ChairNew.Selectors.Width, ChairNew.Selectors.WidthError, ChairNew.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(ChairNew.Selectors.Height, ChairNew.Selectors.HeightError, ChairNew.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(ChairNew.Selectors.Depth, ChairNew.Selectors.DepthError, ChairNew.Messages.FieldIsRequired) && isValid;

    //isValid = Validator.ValidateTextFiled(ChairNew.Selectors.WoodColor, ChairNew.Selectors.WoodColorError, ChairNew.Messages.FieldIsRequired) && isValid;    

    isValid = Validator.ValidateTextFiled(ChairNew.Selectors.ProductionTime, ChairNew.Selectors.ProductionTime, ChairNew.Messages.FieldIsRequired) && isValid;

    return isValid;
};

ChairNew.Save = function () {
    var config = new RequestConfigNameSpace.AjaxConfig('/Chairs/AddChair', {
        Name: $(ChairNew.Selectors.Name).val(),
        Description: $(ChairNew.Selectors.Description).val(),
        ImagePath: ChairNew.ImagePath,
        Price: $(ChairNew.Selectors.Price).val(),
        NewPrice: $(ChairNew.Selectors.ReducedPrice).val(),
        WoodenFrame: $(ChairNew.Selectors.WoodenFrame).val(),
        Seat: $(ChairNew.Selectors.Seat).val(),
        Back: $(ChairNew.Selectors.Back).val(),
        WoodColor: $(ChairNew.Selectors.WoodColor).val(),
        Width: $(ChairNew.Selectors.Width).val(),
        Height: $(ChairNew.Selectors.Height).val(),
        Skin: $(ChairNew.Selectors.Skin).val(),
        Depth: $(ChairNew.Selectors.Depth).val(),
        ProductionTime: $(ChairNew.Selectors.ProductionTime).val()
    }, null, null, null, null, function (data) {
        if (data.Status) {
            window.location = '/Administration/Chairs/Index';
        }
    }, null, null, null);

    RequestWorker.Request.AjaxRequest(config);
};