var PromotionEdit = {};

PromotionEdit.Messages = {
    FieldIsRequired: 'Field is required'
};

PromotionEdit.Selectors = {
    BtnSave: '[data-selector="Save"]',
    Text3: '[data-selector="Text3"]',
    Text2: '[data-selector="Text2"]',
    Text1: '[data-selector="Text1"]',
    Text1Error: '[data-selector="Text1Error"]',
    Text2Error: '[data-selector="Text2Error"]',
    Text3Error: '[data-selector="Text3Error"]',
    Save: '[data-selector="Save"]',
    FileUploadValue: '[data-selector="fileUploadValue"]',
    ImageFiledError: '[data-selector="imageFiledError"]',
    BtnUploadImage: '[data-selector="BtnUploadImage"]',
    ImageContainer: '[data-selector="ImageContainer"]',
    ProductUrl: '[data-selector="ProductUrl"]',
    ProductUrlError: '[data-selector="ProductUrlError"]',
    PromotionName: '[data-selector="PromotionName"]',
    PromotionNameError: '[data-selector="PromotionNameError"]'
};

PromotionEdit.ImagePath = null;
PromotionEdit.ProductId = null;

PromotionEdit.Init = function (productId, imageUrl) {

    PromotionEdit.ImagePath = imageUrl;
    PromotionEdit.ProductId = productId;

    $(PromotionEdit.Selectors.Text1).focusout(function () {
        Validator.ValidateTextFiled(PromotionEdit.Selectors.Text1, PromotionEdit.Selectors.Text1Error, PromotionEdit.Messages.FieldIsRequired);
    });

    $(PromotionEdit.Selectors.Text2).focusout(function () {
        Validator.ValidateTextFiled(PromotionEdit.Selectors.Text2, PromotionEdit.Selectors.Text2Error, PromotionEdit.Messages.FieldIsRequired);
    });

    $(PromotionEdit.Selectors.Text3).focusout(function () {
        Validator.ValidateTextFiled(PromotionEdit.Selectors.Text3, PromotionEdit.Selectors.Text3Error, PromotionEdit.Messages.FieldIsRequired);
    });

    $(PromotionEdit.Selectors.ProductUrl).focusout(function () {
        Validator.ValidateTextFiled(PromotionEdit.Selectors.ProductUrl, PromotionEdit.Selectors.ProductUrlError, PromotionEdit.Messages.FieldIsRequired);
    });

    $(PromotionEdit.Selectors.PromotionName).focusout(function () {
        Validator.ValidateTextFiled(PromotionEdit.Selectors.PromotionName, PromotionEdit.Selectors.PromotionNameError, PromotionEdit.Messages.FieldIsRequired);
    });

    $(PromotionEdit.Selectors.BtnUploadImage).on('click', function () {
        if ($(PromotionEdit.Selectors.FileUploadValue).val().length > 0) {
            PromotionEdit.UploadImage();
        }
    });

    $(PromotionEdit.Selectors.Save).on('click', function () {
        if (PromotionEdit.ValidateForm()) {
            PromotionEdit.Save();
        }
    });
};

PromotionEdit.UploadImage = function () {
    var data = new FormData();
    data.append('file', $(PromotionEdit.Selectors.FileUploadValue)[0].files[0]);

    $.ajax({
        url: '/Promotions/UploadFile',
        data: data,
        type: 'POST',
        processData: false,
        contentType: false,
        success: function (data) {
            $("[data-selector='imageFiledError']").html('');
            $(PromotionEdit.Selectors.FileUploadValue).val('');

            if (data.Status) {
                $(PromotionEdit.Selectors.ImageContainer).html('');
                $(PromotionEdit.Selectors.ImageContainer).html('<img src="' + data.ImagePath + '"/>');
                PromotionEdit.ImagePath = data.ImagePath;
            }
            else {
                if (data.Message && data.Message.length > 0) {
                    $("[data-selector='imageFiledError']").html(data.Message);
                }
            }
        }
    });
};

PromotionEdit.ValidateForm = function () {
    var isValid = true;
    isValid = Validator.ValidateTextFiled(PromotionEdit.Selectors.Text3, PromotionEdit.Selectors.Text3Error, PromotionEdit.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(PromotionEdit.Selectors.Text2, PromotionEdit.Selectors.Text2Error, PromotionEdit.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(PromotionEdit.Selectors.Text1, PromotionEdit.Selectors.Text1Error, PromotionEdit.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(PromotionEdit.Selectors.ProductUrl, PromotionEdit.Selectors.ProductUrlError, PromotionEdit.Messages.FieldIsRequired) && isValid;

    isValid = Validator.ValidateTextFiled(PromotionEdit.Selectors.PromotionName, PromotionEdit.Selectors.PromotionNameError, PromotionEdit.Messages.FieldIsRequired) && isValid;

    return isValid;
};

PromotionEdit.Save = function () {
    var config = new RequestConfigNameSpace.AjaxConfig('/Promotions/EditPromotion', {
        id:  PromotionEdit.ProductId,
        Name: $(PromotionEdit.Selectors.PromotionName).val(),
        ProductName: $(PromotionEdit.Selectors.Text1).val(),
        text2: $(PromotionEdit.Selectors.Text2).val(),
        Price: $(PromotionEdit.Selectors.Text3).val(),
        ProductUrl: $(PromotionEdit.Selectors.ProductUrl).val(),
        promotionName: $(PromotionEdit.Selectors.PromotionNam).val(),
        ProductImage: PromotionEdit.ImagePath
    }, null, null, null, null, function (data) {
        if (data.Status) {
            window.location = '/Administration/Promotions/Index';
        }
    }, null, null, null);

    RequestWorker.Request.AjaxRequest(config);
};