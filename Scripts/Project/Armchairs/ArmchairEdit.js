var ArmchairEdit = {};

ArmchairEdit.Selectors =
    {
        BtnAddInBasket: '[data-selector="BtnAddInBasket"]',
        ItemsInBasketCount: '[data-selector="ItemCounts"]',
        AddElementInBasket: '[data-selector="AddElementInBasket"]',

        CountError: '[data-selector="countError"]',
        CountElement: '[data-selector="countElement"]',

        SkinOptionsError: '[data-selector="skinOptionsError"]',
        SkinOptionsElement: '[data-selector="skinOptionsElement"]'
    };

ArmchairEdit.Id = null;

ArmchairEdit.Messages =
    {
        PleaseProvideValue: 'Please, provide a valid value'
    };

ArmchairEdit.Init = function (id, message) {

    ArmchairEdit.Id = id;

    ArmchairEdit.Messages.PleaseProvideValue = message;

    $(ArmchairEdit.Selectors.BtnAddInBasket).on('click', function () {

        if (ArmchairEdit.FormIsValid()) {
            var config = new RequestConfigNameSpace.AjaxConfig('/ArmchairsApp/AddArmchairInBasket',
                                                               {
                                                                   id: ArmchairEdit.Id,
                                                                   frameOption: $(ArmchairEdit.Selectors.FrameOptionsElement).val(),
                                                                   seatOption: $(ArmchairEdit.Selectors.SeatOptionsElement).val(),
                                                                   backOption: $(ArmchairEdit.Selectors.BackOptionsElement).val(),
                                                                   skinOption: $(ArmchairEdit.Selectors.SkinOptionsElement).val(),
                                                                   legOption: $(ArmchairEdit.Selectors.LegsOptionElement).val(),
                                                                   count: $(ArmchairEdit.Selectors.CountElement).val(),
                                                               }, null, null, null, null, function (data) {
                if (data.Status) {
                    $(ArmchairEdit.Selectors.ItemsInBasketCount).text(data.BasketCount);

                    ArmchairEdit.ResetForm();
                }

                $(ArmchairEdit.Selectors.AddElementInBasket).text(data.Message);

                setTimeout(function () { $(ArmchairEdit.Selectors.AddElementInBasket).text('') }, 4000);

            }, null, null, null);

            RequestWorker.Request.AjaxRequest(config);
        }
    });

    $(ArmchairEdit.Selectors.CountElement).on('change', function () {
        Validator.CheckSelecor(ArmchairEdit.Selectors.CountElement, ArmchairEdit.Selectors.CountError, ArmchairEdit.Messages.PleaseProvideValue);
    });  

    $(ArmchairEdit.Selectors.SkinOptionsElement).on('change', function () {
        Validator.CheckSelecor(ArmchairEdit.Selectors.SkinOptionsElement, ArmchairEdit.Selectors.SkinOptionsError, ArmchairEdit.Messages.PleaseProvideValue);
    });
};

ArmchairEdit.ResetForm = function ResetForm() {
    $(ArmchairEdit.Selectors.CountElement).val('-1');            

    $(ArmchairEdit.Selectors.SkinOptionsElement).val('-1');    
};

ArmchairEdit.FormIsValid = function FormIsValid() {
    var isValid = true;

    isValid = Validator.CheckSelecor(ArmchairEdit.Selectors.CountElement, ArmchairEdit.Selectors.CountError, ArmchairEdit.Messages.PleaseProvideValue) && isValid;           

    isValid = Validator.CheckSelecor(ArmchairEdit.Selectors.SkinOptionsElement, ArmchairEdit.Selectors.SkinOptionsError, ArmchairEdit.Messages.PleaseProvideValue) && isValid;
    
    return isValid;
};