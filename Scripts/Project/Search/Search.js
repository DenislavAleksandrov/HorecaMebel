var Search = {};

Search.Selectors = 
    {
        Search:'[data-selector="Search"]',
        BtnSearch:'[data-selector="BtnSearch"]'
    };


Search.Init = function () {
    $(Search.Selectors.BtnSearch).on('click', function () {
        Search.Post('/Search/Search', { searchPattern: $(Search.Selectors.Search).val() }, null, null);
    });
};

Search.Post = function (url, data, successCallback, errorCallback) {
    var form = $('<form></form>');

    form.attr("method", "post");
    form.attr("action", url);

    if (data) {
        $.each(data, function (key, value) {
            var field = $('<input></input>');

            field.attr("type", "hidden");
            field.attr("name", key);
            field.attr("value", value);

            form.append(field);
        });
    }
    $(document.body).append(form);
    form.submit();
}