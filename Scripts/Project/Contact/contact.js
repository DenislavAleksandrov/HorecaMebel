var Contact = {};

Contact.Selectors = {
    Email:'[data-selector="Email"]',
    EmailError:'[data-selector="EmailError"]',
    SuccessMessageArea: '[data-selector="success"]',
    Name:'[data-selector="Name"]',
    NameError:'[data-selector="NameError]',
    Phone:'[data-selector="Phone"]',
    PhoneError:'[data-selector="PhoneError"]',
    Message:'[data-selector="Message"]',
    BtnClear:'[data-selector="BtnClear"]',
    BtnSend:'[data-selector="BtnSend"]'
};

Contact.Messages =
    {
        Name: 'Name',
        Phone: 'Phone',
        Email: 'E-mail',
        Message: 'Message',
        RequiredSymbol: '*',
        FieldIsRequired: 'Field is required'
    };

Contact.Init = function () {

    $(Contact.Selectors.BtnSend).on('click', function () {
        if (Contact.FormIsValid())
        {
            var config = new RequestConfigNameSpace.AjaxConfig('/Contacts/SendEmail',
                                                              {
                                                                  email: $(Contact.Selectors.Email).val(),
                                                                  phone: $(Contact.Selectors.Phone).val(),
                                                                  name: $(Contact.Selectors.Name).val(),
                                                                  message: $(Contact.Selectors.Message).val()
                                                              }, null, null, null, null, function (data)
                                                              {
                                                                  if (data.Status)
                                                                  {
                                                                      window.location = '/Home/Index';
                                                                  }
                                                              },null,null,null);

            RequestWorker.Request.AjaxRequest(config);

        }
    });

    $(Contact.Selectors.BtnClear).on('click', function () {
        $(Contact.Selectors.Name).val('');
        $(Contact.Selectors.Name).val(Contact.Messages.Name + ' ' + Contact.Messages.RequiredSymbol);
        $(Contact.Selectors.Phone).val('');
        $(Contact.Selectors.Phone).val(Contact.Messages.Phone + ' ' + Contact.Messages.RequiredSymbol);
        $(Contact.Selectors.Email).val('');
        $(Contact.Selectors.Email).val(Contact.Messages.Email + ' ' + Contact.Messages.RequiredSymbol);
        $(Contact.Selectors.Message).val('');
        $(Contact.Selectors.Message).val(Contact.Messages.Message + ' ' + Contact.Messages.RequiredSymbol);
    });

    $(Contact.Selectors.Phone).on('focusin', function () {
        $(Contact.Selectors.Phone).val('');
    });

    $(Contact.Selectors.Email).on('focusin', function () {
        $(Contact.Selectors.Email).val('');
    });

    $(Contact.Selectors.Name).on('focusin', function () {
        $(Contact.Selectors.Name).val('');
    });

    $(Contact.Selectors.Message).on('focusin', function () {
        $(Contact.Selectors.Message).val('');
    });

    $(Contact.Selectors.Name).on('focusout', function () {
        if ($(Contact.Selectors.Name).val() == '') {
            
            $(Contact.Selectors.Name).val(Contact.Messages.Name +' *       '+ Contact.Messages.FieldIsRequired);
        }
    });

    $(Contact.Selectors.Email).on('focusout', function () {
        if (!Validator.ValidateEmail(Contact.Selectors.Email, Contact.Selectors.EmailError, Contact.Messages.FieldIsRequired)) {

            $(Contact.Selectors.Email).val(Contact.Messages.Email + ' *       ' + Contact.Messages.FieldIsRequired);
        }
    });

    $(Contact.Selectors.Phone).on('focusout', function () {
        if ($(Contact.Selectors.Phone).val() == '') {

            $(Contact.Selectors.Phone).val(Contact.Messages.Phone + ' *       ' + Contact.Messages.FieldIsRequired);
        }
    });

    $(Contact.Selectors.Message).on('focusout', function () {
        if ($(Contact.Selectors.Message).val() == '') {

            $(Contact.Selectors.Message).val(Contact.Messages.Message + ' *       ' + Contact.Messages.FieldIsRequired);
        }
    });
};

Contact.FormIsValid = function () {
    var isValid = true;

    isValid = Validator.ValidateEmail(Contact.Selectors.Email, Contact.Selectors.EmailError, Contact.Messages.FieldIsRequired) && isValid;

    isValid = $(Contact.Selectors.Name).val() != "" && isValid;

    isValid = $(Contact.Selectors.Message).val() != "" && isValid;

    isValid = $(Contact.Selectors.Phone).val() != "" && isValid;
    return isValid;
};