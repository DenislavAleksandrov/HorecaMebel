var ChairEdit = {};

ChairEdit.Selectors =
    {
        BtnAddInBasket: '[data-selector="BtnAddInBasket"]',
        AddElementInBasket: '[data-selector="AddElementInBasket"]',
        WoodColorOptionError:'[data-selector="woodColorOptionError"]',
        CountError: '[data-selector="countError"]',
        WoodColorOption:'[data-selector="WoodColorOption"]',
        CountElement: '[data-selector="CountElement"]',
        ItemsInBasketCount: '[data-selector="ItemCounts"]',
        SkinColorOption:'[data-selector="skinColorOption"]',
        SkinColorOptionError:'[data-selector="skinColorOptionError"]'
    };

ChairEdit.Messages =
    {
        PleaseProvideValue:'Please, provide a value'
    };

ChairEdit.Id = null;
ChairEdit.SkinColourOptions = null;

ChairEdit.Init = function (message, chairId, skinColourOptions) {

    ChairEdit.SkinColourOptions = skinColourOptions

    ChairEdit.Messages.PleaseProvideValue = message;

    ChairEdit.Id = chairId;

    $(ChairEdit.Selectors.CountElement).on('change', function () {
        Validator.CheckSelecor(ChairEdit.Selectors.CountElement, ChairEdit.Selectors.CountError, ChairEdit.Messages.PleaseProvideValue);
    });

    if (ChairEdit.SkinColourOptions > 0) {
        $(ChairEdit.Selectors.SkinColorOption).on('change', function () {
            Validator.CheckSelecor(ChairEdit.Selectors.SkinColorOption, ChairEdit.Selectors.SkinColorOptionError, ChairEdit.Messages.PleaseProvideValue);
        });
    }

    $(ChairEdit.Selectors.WoodColorOption).on('change', function () {
        Validator.CheckSelecor(ChairEdit.Selectors.WoodColorOption, ChairEdit.Selectors.WoodColorOptionError, ChairEdit.Messages.PleaseProvideValue);
    });

    $(ChairEdit.Selectors.BtnAddInBasket).on('click', function () {
        
        if (ChairEdit.FormIsValid())
        {
            var config = new RequestConfigNameSpace.AjaxConfig('/ChairsApp/AddChairInBasket',
                                                               {
                                                                   id: ChairEdit.Id,
                                                                   woodColour: $(ChairEdit.Selectors.WoodColorOption).val(),                                                                
                                                                   count: $(ChairEdit.Selectors.CountElement).val(),
                                                                   skinOption: $(ChairEdit.Selectors.SkinColorOption).val(),
                                                               }, null, null, null, null, function (data) {
                                                                   if (data.Status) {
                                                                       $(ChairEdit.Selectors.ItemsInBasketCount).text(data.BasketCount);

                                                                       ChairEdit.ResetForm();
                                                                   }

                                                                   $(ChairEdit.Selectors.AddElementInBasket).text(data.Message);

                                                                   setTimeout(function () { $(ChairEdit.Selectors.AddElementInBasket).text('') }, 4000);

                                                               }, null, null, null);

            RequestWorker.Request.AjaxRequest(config);
        }
    });
};

ChairEdit.FormIsValid = function(){
    var isValid = true;

    //isValid = Validator.CheckSelecor(ChairEdit.Selectors.WoodColorOption, ChairEdit.Selectors.WoodColorOptionError, ChairEdit.Messages.PleaseProvideValue) && isValid;

    isValid = Validator.CheckSelecor(ChairEdit.Selectors.CountElement, ChairEdit.Selectors.CountError, ChairEdit.Messages.PleaseProvideValue) && isValid;

    if (ChairEdit.SkinColourOptions > 0) {
        isValid = Validator.CheckSelecor(ChairEdit.Selectors.SkinColorOption, ChairEdit.Selectors.SkinColorOptionError, ChairEdit.Messages.PleaseProvideValue) && isValid;
    }
    return isValid;
};

ChairEdit.ResetForm = function () {
    $(ChairEdit.Selectors.CountElement).val('-1');

    $(ChairEdit.Selectors.WoodColorOption).val('-1');

    $(ChairEdit.Selectors.SkinColorOption).val('-1');
};