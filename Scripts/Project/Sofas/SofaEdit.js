var SofaEdit = {};

SofaEdit.Selectors =
    {
        BtnAddInBasket:'[data-selector="BtnAddInBasket"]',
        AddElementInBasket: '[data-selector="AddElementInBasket"]',
        SkinElement:'[data-selector="SkinElement"]',
        SkinError:'[data-selector="SkinError"]',
        CountElement: '[data-selector="Count"]',
        CountError: '[data-selector="CountError"]',
        ItemsInBasketCount: '[data-selector="ItemCounts"]'
    };

SofaEdit.Messages = function () {
    PleaseProvideValue = 'Please provide a valid value'
};

SofaEdit.Id = null;

SofaEdit.Init = function (id, errorMessage) {

    SofaEdit.Id = id;
    SofaEdit.Messages.PleaseProvideValue = errorMessage;

    $(SofaEdit.Selectors.CountElement).on('change', function () {
        Validator.CheckSelecor(SofaEdit.Selectors.CountElement, SofaEdit.Selectors.CountError, SofaEdit.Messages.PleaseProvideValue);
    });

    $(SofaEdit.Selectors.SkinElement).on('change', function () {
        Validator.CheckSelecor(SofaEdit.Selectors.SkinElement, SofaEdit.Selectors.SkinError, SofaEdit.Messages.PleaseProvideValue);
    });

    $(SofaEdit.Selectors.BtnAddInBasket).on('click', function () {
        if (SofaEdit.FormIsValid())
        {
            var config = new RequestConfigNameSpace.AjaxConfig('/SofasApp/AddSofaInBasket',
                                                              {
                                                                  id: SofaEdit.Id,
                                                                  skin: $(SofaEdit.Selectors.SkinElement).val(),
                                                                  count: $(SofaEdit.Selectors.CountElement).val(),
                                                              }, null, null, null, null, function (data) {
                                                                  if (data.Status) {
                                                                      $(SofaEdit.Selectors.ItemsInBasketCount).text(data.BasketCount);

                                                                      SofaEdit.ResetForm();
                                                                  }

                                                                  $(SofaEdit.Selectors.AddElementInBasket).text(data.Message);

                                                                  setTimeout(function () { $(SofaEdit.Selectors.AddElementInBasket).text('') }, 4000);

                                                              }, null, null, null);

            RequestWorker.Request.AjaxRequest(config);
        }
    });
};

SofaEdit.FormIsValid = function () {
    var isValid = true;

    isValid = Validator.CheckSelecor(SofaEdit.Selectors.SkinElement, SofaEdit.Selectors.SkinError, SofaEdit.Messages.PleaseProvideValue) && isValid;

    isValid = Validator.CheckSelecor(SofaEdit.Selectors.CountElement, SofaEdit.Selectors.CountError, SofaEdit.Messages.PleaseProvideValue) && isValid;

    return isValid;
};

SofaEdit.ResetForm = function () {
    $(SofaEdit.Selectors.SkinElement).val("-1");

    $(SofaEdit.Selectors.CountElement).val("-1");
};