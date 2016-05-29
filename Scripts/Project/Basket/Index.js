var BasketIndex = {};

BasketIndex.Selectors = 
    {
        Country: '[data-selector="Country"]',
        CountryError:'[data-selector="CountryError"]',

        VATNumber:'[data-selector="VATNumber"]',
        VATNumberError:'[data-selector="VATNumberError"]',

        PostCode:'[data-selector="PostCode"]',
        PostCodeError:'[data-selector="PostCodeError"]',

        Address:'[data-selector="Address"]',
        AddressError: '[data-selector="AddressError"]',

        City:'[data-selector="City"]',
        CityError:'[data-selector="CityError"]',

        BtnClear: '[data-selector="BtnClear"]',
        CountElement: '[data-selector="countElement"]',
        ElementSum: '[data-selector="elementsum"]',
        AllFurnuturePrice: '[data-selector="allfurnitureprice"]',
        DDSPrice: '[data-selector="ddsprice"]',
        FullBasketPrice: '[data-selector="fullbasketprice"]',
        TransportPrice: '[data-selector="transportprice"]',

        CompanyName:'[data-selector="CompanyName"]',

        Title: '[data-selector="Title"]',
        TitleError: '[data-selector="TitleError"]',

        FirstName: '[data-selector="FirstName"]',
        FirstNameError: '[data-selector="FirstNameError"]',

        LastName: '[data-selector="LastName"]',
        LastNameError: '[data-selector="LastNameError"]',

        Phone: '[data-selector="Phone"]',
        Email: '[data-selector="Email"]',
        FreeText: '[data-selector="FreeText"]',
        
        PhoneError: '[data-selector="PhoneError"]',
        EmailError: '[data-selector="EmailError"]',
        BtnOrder: '[data-selector="BtnOrder"]',
        BtnBack: '[data-selector="BtnBack"]',

        TermsAndConditions: '[data-selector="TermsAndConditions"]',
        TermsAndConditionsError: '[data-selector="TermsAndConditionsError"]'
    }

BasketIndex.DeleteConfirmationWindow = null;

BasketIndex.FieldIsReq = null;

BasketIndex.PleaseProvideAValidEmail = null;

BasketIndex.Init = function (deleteConfirmationWindow, FiledIsReqMessage, PleaseProvideAValidEmail) {

    BasketIndex.FieldIsReq = FiledIsReqMessage;
    BasketIndex.PleaseProvideAValidEmail = PleaseProvideAValidEmail;
    BasketIndex.DeleteConfirmationWindow = deleteConfirmationWindow;

    $(BasketIndex.Selectors.VATNumber).on('focusout', function () {
        Validator.ValidateTextFiled(BasketIndex.Selectors.VATNumber, BasketIndex.Selectors.VATNumberError, BasketIndex.FieldIsReq);
    });

    $(BasketIndex.Selectors.Address).on('focusout', function () {
        Validator.ValidateTextFiled(BasketIndex.Selectors.Address, BasketIndex.Selectors.AddressError, BasketIndex.FieldIsReq);
    });

    $(BasketIndex.Selectors.CountElement).on('change', function () {
        var element = $(this).attr('data-id');

        var config = new RequestConfigNameSpace.AjaxConfig('/Basket/ChangeElementCount',
                                                           {
                                                               elementId: element,
                                                               newCount: $(this).val()
                                                           },null,null,null,null, 
        function(data){
            if (data.Status)
            {
                $(BasketIndex.Selectors.ElementSum).filter('[data-id=' + element + ']').text(data.SingleElementPrice);

                $(BasketIndex.Selectors.AllFurnuturePrice).text(data.FurniturePrice + ' €');
                $(BasketIndex.Selectors.TransportPrice).text(data.TransportPrice + ' €');
                $(BasketIndex.Selectors.DDSPrice).text(data.DDSPrice + ' €');
                $(BasketIndex.Selectors.FullBasketPrice).text(data.FullPrice + ' €');
            }
        }, null,null,null);

        RequestWorker.Request.AjaxRequest(config);
    });
   
    $(BasketIndex.Selectors.BtnClear).on('click', function () {

        if (window.confirm(BasketIndex.DeleteConfirmationWindow)) {      
            var element = $(this).attr('data-id');

            var config = new RequestConfigNameSpace.AjaxConfig('/Basket/DeleteElement',
                                                               {
                                                                   elementId: element
                                                               }, null, null, null, null,
            function (data) {
                if (data.Status) {                

                    $('[data-rowtoremove=' + element + ']').remove();

                    $(BasketIndex.Selectors.AllFurnuturePrice).text(data.FurniturePrice + ' €');
                    $(BasketIndex.Selectors.TransportPrice).text(data.TransportPrice + ' €');
                    $(BasketIndex.Selectors.DDSPrice).text(data.DDSPrice + ' €');
                    $(BasketIndex.Selectors.FullBasketPrice).text(data.FullPrice + ' €');
                }
            }, null, null, null);

            RequestWorker.Request.AjaxRequest(config);
        }
    });

    $(BasketIndex.Selectors.Title).on('change', function () {
        Validator.CheckSelecor(BasketIndex.Selectors.Title, BasketIndex.Selectors.TitleError, BasketIndex.FieldIsReq);
    });

    $(BasketIndex.Selectors.Country).on('change', function () {
        Validator.CheckSelecor(BasketIndex.Selectors.Country, BasketIndex.Selectors.CountryError, BasketIndex.FieldIsReq);
    });

    $(BasketIndex.Selectors.FirstName).on('focusout', function () {


        Validator.ValidateTextFiled(BasketIndex.Selectors.FirstName, BasketIndex.Selectors.FirstNameError, BasketIndex.FieldIsReq);
    });

    $(BasketIndex.Selectors.PostCode).on('focusout', function () {
        Validator.ValidateTextFiled(BasketIndex.Selectors.PostCode, BasketIndex.Selectors.PostCodeError, BasketIndex.FieldIsReq);
    });

    $(BasketIndex.Selectors.City).on('focusout', function () {
        Validator.ValidateTextFiled(BasketIndex.Selectors.City, BasketIndex.Selectors.CityError, BasketIndex.FieldIsReq);
    });

    $(BasketIndex.Selectors.LastName).on('focusout', function () {
        Validator.ValidateTextFiled(BasketIndex.Selectors.LastName, BasketIndex.Selectors.LastNameError, BasketIndex.FieldIsReq);
    });

    $(BasketIndex.Selectors.Phone).on('focusout', function () {
        Validator.ValidateTextFiled(BasketIndex.Selectors.Phone, BasketIndex.Selectors.PhoneError, BasketIndex.FieldIsReq);
    });

    $(BasketIndex.Selectors.Email).on('focusout', function () {
        Validator.ValidateEmail(BasketIndex.Selectors.Email, BasketIndex.Selectors.EmailError, BasketIndex.PleaseProvideAValidEmail);
    });

    $(BasketIndex.Selectors.BtnOrder).on('click', function () {
        if (BasketIndex.IsValidForm()){
            var config = new RequestConfigNameSpace.AjaxConfig('/Basket/Order',
                                                               {
                                                                   title:$(BasketIndex.Selectors.Title).val(),
                                                                   firstName: $(BasketIndex.Selectors.FirstName).val(),
                                                                   lastName: $(BasketIndex.Selectors.LastName).val(),
                                                                   address: $(BasketIndex.Selectors.Address).val(),
                                                                   city: $(BasketIndex.Selectors.City).val(),
                                                                   postCode: $(BasketIndex.Selectors.PostCode).val(),
                                                                   country: $(BasketIndex.Selectors.Country).val(),
                                                                   company: $(BasketIndex.Selectors.CompanyName).val(),
                                                                   VAT: $(BasketIndex.Selectors.VATNumber).val(),
                                                                   phone: $(BasketIndex.Selectors.Phone).val(),
                                                                   email: $(BasketIndex.Selectors.Email).val(),
                                                                   freeText:$(BasketIndex.Selectors.FreeText).val()
                                                               }, null, null, null, null,
            function (data) {
                if (data.Status) {
                    window.location = '/Basket/ConfirmationPage/' + data.OrderId + '';
                }
            }, null, null, null);

            RequestWorker.Request.AjaxRequest(config);
        }
    });

    $(BasketIndex.Selectors.TermsAndConditions).on('click', function () {
        Validator.ValidateCheckBox(BasketIndex.Selectors.TermsAndConditions, BasketIndex.Selectors.TermsAndConditionsError, BasketIndex.FieldIsReq);
    });

};

BasketIndex.IsValidForm = function () {
    var isValid = true;
    
    isValid = Validator.ValidateCheckBox(BasketIndex.Selectors.TermsAndConditions, BasketIndex.Selectors.TermsAndConditionsError, BasketIndex.FieldIsReq) && isValid;

    isValid = Validator.CheckSelecor(BasketIndex.Selectors.Title, BasketIndex.Selectors.TitleError, BasketIndex.FieldIsReq) && isValid;

    isValid = Validator.CheckSelecor(BasketIndex.Selectors.Country, BasketIndex.Selectors.CountryError, BasketIndex.FieldIsReq) && isValid;

    isValid = Validator.ValidateTextFiled(BasketIndex.Selectors.VATNumber, BasketIndex.Selectors.VATNumberError, BasketIndex.FieldIsReq) && isValid;

    isValid = Validator.ValidateTextFiled(BasketIndex.Selectors.PostCode, BasketIndex.Selectors.PostCodeError, BasketIndex.FieldIsReq) && isValid;

    isValid = Validator.ValidateTextFiled(BasketIndex.Selectors.City, BasketIndex.Selectors.CityError, BasketIndex.FieldIsReq) && isValid;
    isValid = Validator.ValidateTextFiled(BasketIndex.Selectors.Address, BasketIndex.Selectors.AddressError, BasketIndex.FieldIsReq) && isValid;

    isValid = Validator.ValidateTextFiled(BasketIndex.Selectors.FirstName, BasketIndex.Selectors.FirstNameError, BasketIndex.FieldIsReq) && isValid;
    isValid = Validator.ValidateTextFiled(BasketIndex.Selectors.LastName, BasketIndex.Selectors.LastNameError, BasketIndex.FieldIsReq) && isValid;

    isValid = Validator.ValidateTextFiled(BasketIndex.Selectors.Phone, BasketIndex.Selectors.PhoneError, BasketIndex.FieldIsReq) && isValid;

    isValid = Validator.ValidateEmail(BasketIndex.Selectors.Email, BasketIndex.Selectors.EmailError, BasketIndex.PleaseProvideAValidEmail) && isValid;
    return isValid;
};

BasketIndex.SaveForm = function () {
    var config = new RequestConfigNameSpace.PostConfig('/Basket/DeleteElement',
                                                              {
                                                                  elementId: element
                                                              }, null, null, null, null,
           function (data) {
               if (data.Status) {

                   $('[data-rowtoremove=' + element + ']').remove();

                   $(BasketIndex.Selectors.AllFurnuturePrice).text(data.FurniturePrice + ' €');
                   $(BasketIndex.Selectors.TransportPrice).text(data.TransportPrice + ' €');
                   $(BasketIndex.Selectors.DDSPrice).text(data.DDSPrice + ' €');
                   $(BasketIndex.Selectors.FullBasketPrice).text(data.FullPrice + ' €');
               }
           }, null, null, null);

    RequestWorker.Request.PostRequest(config);
};