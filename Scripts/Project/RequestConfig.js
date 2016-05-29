var RequestConfigNameSpace = {};

RequestConfigNameSpace.RequestConfigFirstStep = function (url, onSuccessCallBack) {

    var result = {
        Url: url,
        OnSuccessCallBack: onSuccessCallBack,
    };
    return result;
};
/// <summary>
/// This is base class. It is only for inheritance.
/// </summary>
RequestConfigNameSpace.RequestConfigSecondStep = function (url, data, onSuccessCallBack, onErrorCallBack, type, stringify) {

    var that = RequestConfigNameSpace.RequestConfigFirstStep(url, onSuccessCallBack);

    that.OnErrorCallBack = onErrorCallBack;
    that.Type = type;
    if (data === null) {
        that.Data = null;
    }
    if (data !== null && (stringify || stringify == null)) {
        that.Data = JSON.stringify(data);
    }
    else if (data !== null && !stringify) {
        that.Data = data;
    }
    return that;
};

/// <summary>
/// AjaxConfig class. The parent class is RequestConfigSecondStep
/// </summary>
RequestConfigNameSpace.AjaxConfig = function (url, data, type, contentType, async, cache, onSuccessCallBack, onErrorCallBack, beforeSendCallBack, stringify) {
    var that = RequestConfigNameSpace.RequestConfigSecondStep(url, data, onSuccessCallBack, onErrorCallBack, type == null ? 'post' : type, stringify);

    that.BeforeSendCallBack = beforeSendCallBack;
    contentType == null ? that.ContentType = 'application/json; charset=utf-8' : that.ContentType = contentType;
    async === null ? that.Async = false : that.Async = async;
    cache === null ? that.Cache = false : that.Cache = cache;
    return that;
};

/// <summary>
/// PostConfig class. The parent class is RequestConfigSecondStep.
/// </summary>
RequestConfigNameSpace.PostConfig = function (url, data, onSuccessCallBack) {

    var that = RequestConfigNameSpace.RequestConfigFirstStep(url, onSuccessCallBack);
    that.Data = data;

    return that;
};

/// <summary>
/// 
/// </summary>
RequestConfigNameSpace.GetConfig = function (url, onSuccessCallBack) {
    return RequestConfigNameSpace.RequestConfigFirstStep(url, onSuccessCallBack);
};

RequestConfigNameSpace.GetConfigWithParams = function (url, parameters, onSuccessCallBack) {
    var that = RequestConfigNameSpace.RequestConfigFirstStep(url, onSuccessCallBack);
    that.Data = parameters;

    return that;
};



var RequestWorker = {};

RequestWorker.Request = {
    AjaxRequest: function (AjaxRequestConfiguration) {
        $.ajax({
            url: AjaxRequestConfiguration.Url,
            data: AjaxRequestConfiguration.Data,
            contentType: AjaxRequestConfiguration.ContentType,
            type: AjaxRequestConfiguration.Type,
            async: AjaxRequestConfiguration.Async,
            cache: AjaxRequestConfiguration.Cache,
            beforeSend: function () {
                if (AjaxRequestConfiguration.BeforeSendCallBack != null) {
                    AjaxRequestConfiguration.BeforeSendCallBack();
                }
            },
            success: function (data) {
                if (AjaxRequestConfiguration.OnSuccessCallBack != null) {
                    AjaxRequestConfiguration.OnSuccessCallBack(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (AjaxRequestConfiguration.OnErrorCallBack != null) {
                    AjaxRequestConfiguration.OnErrorCallBack(jqXHR, textStatus, errorThrown);
                }
            }
        });
    },

    GetRequest: function (GetRequestConfiguration) {
        $.get(GetRequestConfiguration.Url, function (data) {
            GetRequestConfiguration.OnSuccessCallBack(data);
        });
    },

    GetRequestWithParams: function (GetRequestConfiguration) {
        $.get(GetRequestConfiguration.Url, GetRequestConfiguration.Data, function (data) {
            GetRequestConfiguration.OnSuccessCallBack(data);
        });
    },

    PostRequest: function (PostConfig) {
        $.post(PostConfig.Url, PostConfig.Data, function (data) {
            if (PostConfig.OnSuccessCallBack != null) {
                PostConfig.OnSuccessCallBack(data);
            }
        });
    }
};

