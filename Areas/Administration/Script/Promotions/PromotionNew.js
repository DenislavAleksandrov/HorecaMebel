var NewPromotion = {};

NewPromotion.Messages = {
    FieldIsRequired:'Field is required'
};

NewPromotion.Selectors = {
    BtnSave: '[data-selector="Save"]',
    Text3: '[data-selector="Text3"]',
    Text2: '[data-selector="Text2"]',
    Text1:'[data-selector="Text1"]',
    Text1Error:'[data-selector="Text1Error"]',
    Text2Error:'[data-selector="Text2Error"]',
    Text3Error: '[data-selector="Text3Error"]',
    Save: '[data-selector="Save"]',
    FileUploadValue: '[data-selector="fileUploadValue"]',
    ImageFiledError:'[data-selector="imageFiledError"]',
    BtnUploadImage: '[data-selector="BtnUploadImage"]',
    ImageContainer: '[data-selector="ImageContainer"]',
    ProductUrl:'[data-selector="ProductUrl"]',
    ProductUrlError: '[data-selector="ProductUrlError"]',
    PromotionName:'[data-selector="PromotionName"]',
    PromotionNameError:'[data-selector="PromotionNameError"]'
};

NewPromotion.ImagePath = null;

NewPromotion.Init = function () {
    $(NewPromotion.Selectors.Text1).focusout(function () {
        Validator.ValidateTextFiled(NewPromotion.Selectors.Text1, NewPromotion.Selectors.Text1Error, NewPromotion.Messages.FieldIsRequired);
    });

    $(NewPromotion.Selectors.Text2).focusout(function () {
        Validator.ValidateTextFiled(NewPromotion.Selectors.Text2, NewPromotion.Selectors.Text2Error, NewPromotion.Messages.FieldIsRequired);
    });

    $(NewPromotion.Selectors.Text3).focusout(function () {
        Validator.ValidateTextFiled(NewPromotion.Selectors.Text3, NewPromotion.Selectors.Text3Error, NewPromotion.Messages.FieldIsRequired);
    });

    $(NewPromotion.Selectors.ProductUrl).focusout(function () {
        Validator.ValidateTextFiled(NewPromotion.Selectors.ProductUrl, NewPromotion.Selectors.ProductUrlError, NewPromotion.Messages.FieldIsRequired);
    });

    $(NewPromotion.Selectors.PromotionName).focusout(function () {
        Validator.ValidateTextFiled(NewPromotion.Selectors.PromotionName, NewPromotion.Selectors.PromotionNameError, NewPromotion.Messages.FieldIsRequired);
    });

    $(NewPromotion.Selectors.BtnUploadImage).on('click', function () {
        if ($(NewPromotion.Selectors.FileUploadValue).val().length > 0) {
            NewPromotion.UploadImage();
        }
    });

    $(NewPromotion.Selectors.Save).on('click', function () {
        if (NewPromotion.ValidateForm()) {
            NewPromotion.Save();
        }
    });
};


NewPromotion.UploadImage = function () {
    var data = new FormData();
    data.append('file', $(NewPromotion.Selectors.FileUploadValue)[0].files[0]);

    $.ajax({
        url: '/Promotions/UploadFile',
        data: data,
        type: 'POST',
        processData: false,
        contentType: false,
        success: function (data) {
            $("[data-selector='imageFiledError']").html('');
            $(NewPromotion.Selectors.FileUploadValue).val('');

            if (data.Status) {
                $(NewPromotion.Selectors.ImageContainer).html('');
                $(NewPromotion.Selectors.ImageContainer).html('<img src="' + data.ImagePath + '"/>');
                NewPromotion.ImagePath = data.ImagePath;
            }
            else {
                if (data.Message && data.Message.length > 0) {
                    $("[data-selector='imageFiledError']").html(data.Message);
                }
            }
        }
    });
};

NewPromotion.ValidateForm = function () {
    var isValid = true;
    isValid = Validator.ValidateTextFiled(NewPromotion.Selectors.Text3, NewPromotion.Selectors.Text3Error, NewPromotion.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewPromotion.Selectors.Text2, NewPromotion.Selectors.Text2Error, NewPromotion.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewPromotion.Selectors.Text1, NewPromotion.Selectors.Text1Error, NewPromotion.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewPromotion.Selectors.ProductUrl, NewPromotion.Selectors.ProductUrlError, NewPromotion.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(NewPromotion.Selectors.PromotionName, NewPromotion.Selectors.PromotionNameError, NewPromotion.Messages.FieldIsRequired) && isValid;

    if (NewPromotion.ImagePath == null || NewPromotion.ImagePath.length == 0) {
        isValid = false && isValid;

        $(NewPromotion.Selectors.ImageFiledError).text('Image is required');
    }
    else {
        isValid = NewPromotion.ImagePath.length > 0 && isValid;
    }

    return isValid;
};

NewPromotion.Save = function () {
    var config = new RequestConfigNameSpace.AjaxConfig('/Promotions/AddPromotion', { Name: $(NewPromotion.Selectors.PromotionName).val(),
                                                                                     ProductName: $(NewPromotion.Selectors.Text1).val(),
                                                                                     text2: $(NewPromotion.Selectors.Text2).val(), 
                                                                                     Price: $(NewPromotion.Selectors.Text3).val(),
                                                                                     ProductUrl: $(NewPromotion.Selectors.ProductUrl).val(),
                                                                                     promotionName:$(NewPromotion.Selectors.PromotionNam).val(),
                                                                                     ProductImage: NewPromotion.ImagePath
    }, null, null, null, null, function (data) {
        if (data.Status)
        {
            window.location = '/Administration/Promotions/Index';
        }
    },null,null,null);

    RequestWorker.Request.AjaxRequest(config);
};