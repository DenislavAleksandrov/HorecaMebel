var ChairEdit = {};

ChairEdit.Messages =
    {
        FieldIsRequired: 'Field is required',
        PleaseProvideIntValue: 'Please, provide a number'
    };

ChairEdit.Selectors = {
    Name: '[data-selector="Name"]',
    NameError: '[data-selector="NameError"]',
    Price: '[data-selector="Price"]',
    PriceError: '[data-selector="PriceError"]',
    ReducedPrice: '[data-selector="ReducedPrice"]',
    ReducedPriceError: '[data-selector="ReducedPriceError"]',
    Description: '[data-selector="Description"]',
    DescriptionError: '[data-selector="DescriptionError"]',
    Save: '[data-selector="Save"]',
    FileUploadValue: '[data-selector="fileUploadValue"]',
    BtnUploadImage: '[data-selector="BtnUploadImage"]',
    ImageContainer: '[data-selector="ImageContainer"]',
    ImageFiledError: '[data-selector="imageFiledError"]',

    WoodenFrame: '[data-selector="WoodenFrame"]',
    WoodenFrameError: '[data-selector="WoodenFrameError"]',

    Seat: '[data-selector="Seat"]',
    SeatError: '[data-selector="SeatError"]',

    Back: '[data-selector="Back"]',
    BackError: '[data-selector="BackError"]',

    WoodColor: '[data-selector="WoodColor"]',
    WoodColorError: '[data-selector="WoodColorError"]',

    Width: '[data-selector="Width"]',
    WidthError: '[data-selector="WidthError"]',

    Height: '[data-selector="Height"]',
    HeightError: '[data-selector="HeightError"]',

    Depth: '[data-selector="Depth"]',
    DepthError: '[data-selector="DepthError"]',

    Skin:'[data-selector="Skin"]',
    SkinError: '[data-selector="SkinError"]',
    ProductionTime:'[data-selector="ProductionTime"]',
    ProductionTimeError:'[data-selector="ProductionTimeError"]'
};

ChairEdit.ChairId = null;
ChairEdit.ImagePath = null;

ChairEdit.Init = function (chairId, image) {
    ChairEdit.ChairId = chairId;
    ChairEdit.ImagePath = image;

    $(ChairEdit.Selectors.Name).focusout(function () {
        Validator.ValidateTextFiled(ChairEdit.Selectors.Name, ChairEdit.Selectors.NameError, ChairEdit.Messages.FieldIsRequired);
    });

    $(ChairEdit.Selectors.WoodenFrame).focusout(function () {
        Validator.ValidateTextFiled(ChairEdit.Selectors.WoodenFrame, ChairEdit.Selectors.WoodenFrameError, ChairEdit.Messages.FieldIsRequired);
    });

    $(ChairEdit.Selectors.Seat).focusout(function () {
        Validator.ValidateTextFiled(ChairEdit.Selectors.Seat, ChairEdit.Selectors.SeatError, ChairEdit.Messages.FieldIsRequired);
    });

    $(ChairEdit.Selectors.Back).focusout(function () {
        Validator.ValidateTextFiled(ChairEdit.Selectors.Back, ChairEdit.Selectors.BackError, ChairEdit.Messages.FieldIsRequired);
    });

    $(ChairEdit.Selectors.Width).focusout(function () {
        Validator.ValidateTextFiled(ChairEdit.Selectors.Width, ChairEdit.Selectors.WidthError, ChairEdit.Messages.FieldIsRequired);
    });

    $(ChairEdit.Selectors.Height).focusout(function () {
        Validator.ValidateTextFiled(ChairEdit.Selectors.Height, ChairEdit.Selectors.HeightError, ChairEdit.Messages.FieldIsRequired);
    });

    $(ChairEdit.Selectors.Depth).focusout(function () {
        Validator.ValidateTextFiled(ChairEdit.Selectors.Depth, ChairEdit.Selectors.DepthError, ChairEdit.Messages.FieldIsRequired);
    });

    //$(ChairEdit.Selectors.WoodColor).focusout(function () {
    //    Validator.ValidateTextFiled(ChairEdit.Selectors.WoodColor, ChairEdit.Selectors.WoodColorError, ChairEdit.Messages.FieldIsRequired);
    //});

    $(ChairEdit.Selectors.Price).focusout(function () {
        if (Validator.ValidateTextFiled(ChairEdit.Selectors.Price, ChairEdit.Selectors.PriceError, ChairEdit.Messages.FieldIsRequired)) {
            var result = Validator.TryParseDouble($(ChairEdit.Selectors.Price).val(), null);

            if (result == null) {
                Validator.Mark(ChairEdit.Selectors.PriceError, ChairEdit.Messages.PleaseProvideIntValue);
            }
            else {
                Validator.Mark(ChairEdit.Selectors.PriceError, '');
            }
        }
    });

    $(ChairEdit.Selectors.ReducedPrice).focusout(function () {
        ChairEdit.ValidateReducePrice();
    });

    $(ChairEdit.Selectors.ProductionTime).focusout(function () {
        Validator.ValidateTextFiled(ChairEdit.Selectors.ProductionTime, ChairEdit.Selectors.ProductionTime, ChairEdit.Messages.FieldIsRequired);
    });

    $(ChairEdit.Selectors.Save).on('click', function () {
        if (ChairEdit.FormIsValid()) {
            ChairEdit.Save();
        }
    });

    $(ChairEdit.Selectors.BtnUploadImage).on('click', function () {
        if ($(ChairEdit.Selectors.FileUploadValue).val().length > 0) {
            ChairEdit.UploadImage();
        }
    });
};

ChairEdit.UploadImage = function () {
    var data = new FormData();
    data.append('file', $(ChairEdit.Selectors.FileUploadValue)[0].files[0]);

    $.ajax({
        url: '/Chairs/UploadFile',
        data: data,
        type: 'POST',
        processData: false,
        contentType: false,
        success: function (data) {
            $("[data-selector='imageFiledError']").html('');
            $(ChairEdit.Selectors.FileUploadValue).val('');

            if (data.Status) {
                $(ChairEdit.Selectors.ImageContainer).html('');
                $(ChairEdit.Selectors.ImageContainer).html('<img src="' + data.ImagePath + '"/>');
                ChairEdit.ImagePath = data.ImagePath;
            }
            else {
                if (data.Message && data.Message.length > 0) {
                    $("[data-selector='imageFiledError']").html(data.Message);
                }
            }
        }
    });
};

ChairEdit.FormIsValid = function () {
    var isValid = true;

    if (ChairEdit.ImagePath == null || ChairEdit.ImagePath.length == 0) {
        isValid = false && isValid;

        $(ChairEdit.Selectors.ImageFiledError).text('Image is required');
    }
    else {
        isValid = ChairEdit.ImagePath.length > 0 && isValid;
    }

    isValid = Validator.ValidateTextFiled(ChairEdit.Selectors.Name, ChairEdit.Selectors.NameError, ChairEdit.Messages.FieldIsRequired) && isValid;

    isValid = ChairEdit.ValidateReducePrice() && isValid;

    isValid = ChairEdit.ValidatePrice() && isValid;    

    isValid = Validator.ValidateTextFiled(ChairEdit.Selectors.WoodenFrame, ChairEdit.Selectors.WoodenFrameError, ChairEdit.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(ChairEdit.Selectors.Seat, ChairEdit.Selectors.SeatError, ChairEdit.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(ChairEdit.Selectors.Back, ChairEdit.Selectors.BackError, ChairEdit.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(ChairEdit.Selectors.Width, ChairEdit.Selectors.WidthError, ChairEdit.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(ChairEdit.Selectors.Height, ChairEdit.Selectors.HeightError, ChairEdit.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(ChairEdit.Selectors.Height, ChairEdit.Selectors.DepthError, ChairEdit.Messages.FieldIsRequired) && isValid;

    //isValid = Validator.ValidateTextFiled(ChairEdit.Selectors.WoodColor, ChairEdit.Selectors.WoodColorError, ChairEdit.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(ChairEdit.Selectors.ProductionTime, ChairEdit.Selectors.ProductionTime, ChairEdit.Messages.FieldIsRequired) && isValid;

    return isValid;
};

ChairEdit.Save = function () {
    var config = new RequestConfigNameSpace.AjaxConfig('/Chairs/EditChair', {
        id: ChairEdit.ChairId,
        Name: $(ChairEdit.Selectors.Name).val(),
        Description: $(ChairEdit.Selectors.Description).val(),
        ImagePath: ChairEdit.ImagePath,
        Price: $(ChairEdit.Selectors.Price).val(),
        NewPrice: $(ChairEdit.Selectors.ReducedPrice).val(),
        WoodenFrame: $(ChairEdit.Selectors.WoodenFrame).val(),
        Seat: $(ChairEdit.Selectors.Seat).val(),
        Back: $(ChairEdit.Selectors.Back).val(),
        WoodColor: $(ChairEdit.Selectors.WoodColor).val(),
        Skin: $(ChairEdit.Selectors.Skin).val(),
        Width: $(ChairEdit.Selectors.Width).val(),
        Height: $(ChairEdit.Selectors.Height).val(),
        Depth: $(ChairEdit.Selectors.Depth).val(),
        ProductionTime: $(ChairEdit.Selectors.ProductionTime).val()
    }, null, null, null, null, function (data) {
        if (data.Status) {
            window.location = '/Administration/Chairs/Index';
        }
    }, null, null, null);

    RequestWorker.Request.AjaxRequest(config);
};

ChairEdit.ValidateReducePrice = function () {
    if ($(ChairEdit.Selectors.ReducedPrice).val() != '') {

        var result = Validator.TryParseDouble($(ChairEdit.Selectors.ReducedPrice).val(), null);

        if (result == null) {
            Validator.Mark(ChairEdit.Selectors.ReducedPriceError, ChairEdit.Messages.PleaseProvideIntValue);

            return false;
        }
        else {
            Validator.Mark(ChairEdit.Selectors.ReducedPriceError, '');

            return true;
        }
    }

    return true;
};

ChairEdit.ValidatePrice = function () {
    if ($(ChairEdit.Selectors.Price).val() != '') {

        var result = Validator.TryParseDouble($(ChairEdit.Selectors.Price).val(), null);

        if (result == null) {
            Validator.Mark(ChairEdit.Selectors.Price, ChairEdit.Messages.PleaseProvideIntValue);

            return false;
        }
        else {
            Validator.Mark(ChairEdit.Selectors.Price, '');

            return true;
        }
    }
    else {

        Validator.Mark(ChairEdit.Selectors.PriceError, ChairEdit.Messages.PleaseProvideIntValue);

        return false;
    }
}