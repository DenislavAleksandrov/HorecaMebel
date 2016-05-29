var CubeSeat = {};

CubeSeat.Id = null;

CubeSeat.Messages =
    {
        PleaseProvideCorrectValue: 'Please, provide a value'
    };


CubeSeat.Selectors =
    {
        BtnAddInBasket: '[data-selector="BtnAddInBasket"]',
        ItemsInBasketCount: '[data-selector="ItemCounts"]',
        AddElementInBasket: '[data-selector="AddElementInBasket"]',

        CountError: '[data-selector="countError"]',
        CountElement: '[data-selector="Count"]',

        SkinOptionsError: '[data-selector="skinOptionsError"]',
        SkinOptionsElement: '[data-selector="SkinElement"]'
    };

CubeSeat.Init = function Init(Id, message) {
    CubeSeat.Id = Id;

    CubeSeat.Messages.PleaseProvideCorrectValue = message;

    $(CubeSeat.Selectors.CountElement).on('change', function () {
        Validator.CheckSelecor(CubeSeat.Selectors.CountElement, CubeSeat.Selectors.CountError, CubeSeat.Messages.PleaseProvideValue);
    });

    $(CubeSeat.Selectors.WoodColorOption).on('change', function () {
        Validator.CheckSelecor(CubeSeat.Selectors.SkinOptionsElement, CubeSeat.Selectors.SkinOptionsError, CubeSeat.Messages.PleaseProvideValue);
    });

    $(CubeSeat.Selectors.BtnAddInBasket).on('click', function () {
        if (CubeSeat.FormIsValid())
        {
            var config = new RequestConfigNameSpace.AjaxConfig('/CubeSeatsApp/AddCubeSeatInBasket',
                                                             {
                                                                 id: CubeSeat.Id,
                                                                 skin: $(CubeSeat.Selectors.SkinOptionsElement).val(),
                                                                 count: $(CubeSeat.Selectors.CountElement).val(),
                                                             }, null, null, null, null, function (data) {
                                                                 if (data.Status) {
                                                                     $(CubeSeat.Selectors.ItemsInBasketCount).text(data.BasketCount);

                                                                     CubeSeat.ResetForm();
                                                                 }

                                                                 $(CubeSeat.Selectors.AddElementInBasket).text(data.Message);

                                                                 setTimeout(function () { $(CubeSeat.Selectors.AddElementInBasket).text('') }, 4000);

                                                             }, null, null, null);

            RequestWorker.Request.AjaxRequest(config);
        }
    });
};

CubeSeat.FormIsValid = function () {
    var isValid = true;

    isValid = Validator.CheckSelecor(CubeSeat.Selectors.CountElement, CubeSeat.Selectors.CountError, CubeSeat.Messages.PleaseProvideValue) && isValid;

    isValid = Validator.CheckSelecor(CubeSeat.Selectors.SkinOptionsElement, CubeSeat.Selectors.SkinOptionsError, CubeSeat.Messages.PleaseProvideValue) && isValid;
    return isValid;
};

CubeSeat.ResetForm = function () {
    $(CubeSeat.Selectors.CountElement).val('-1');

    $(CubeSeat.Selectors.SkinOptionsElement).val('-1');
};
