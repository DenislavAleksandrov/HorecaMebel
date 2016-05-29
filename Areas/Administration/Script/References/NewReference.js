var NewReference = {};

NewReference.Selectors =
    {
        ImageContainer:'[data-selector="ImageContainer"]',
        FileUploadValue: '[data-selector="fileUploadValue"]',
        ImageFiledError:'[data-selector="imageFiledError"]',
        BtnUploadImage:'[data-selector="BtnUploadImage"]',
        Save:'[data-selector="Save"]'
    };

NewReference.ImagePath = null;

NewReference.Init = function () {
    $(NewReference.Selectors.BtnUploadImage).on('click', function () {
        if ($(NewReference.Selectors.FileUploadValue).val().length > 0) {
            NewReference.UploadImage();
        }
    });

    $(NewReference.Selectors.Save).on('click', function () {
        NewReference.Save();
    });
};

NewReference.UploadImage = function () {
    var data = new FormData();
    data.append('file', $(NewReference.Selectors.FileUploadValue)[0].files[0]);

    $.ajax({
        url: '/References/UploadFile',
        data: data,
        type: 'POST',
        processData: false,
        contentType: false,
        success: function (data) {
            $("[data-selector='imageFiledError']").html('');
            $(NewReference.Selectors.FileUploadValue).val('');

            if (data.Status) {
                $(NewReference.Selectors.ImageContainer).html('');
                $(NewReference.Selectors.ImageContainer).html('<img src="' + data.ImagePath + '"/>');
                NewReference.ImagePath = data.ImagePath;
            }
            else {
                if (data.Message && data.Message.length > 0) {
                    $("[data-selector='imageFiledError']").html(data.Message);
                }
            }
        }
    });
};

NewReference.Save = function () {
    var config = new RequestConfigNameSpace.AjaxConfig('/References/AddReference', {

        ImagePath: NewReference.ImagePath,

    }, null, null, null, null, function (data) {
        if (data.Status) {
            window.location = '/Administration/References/Index';
        }
    }, null, null, null);

    RequestWorker.Request.AjaxRequest(config);
};