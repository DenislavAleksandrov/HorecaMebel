var SofasList = {};

SofasList.Sofas = {};

SofasList.Selectors =
    {
        OrderElements: '[data-selector="OrderElements"]',

        AllSofasContainer: '[data-selector="AllSofasContainer"]'
    };


SofasList.Init = function (sofas) {
    SofasList.Sofas = sofas;

    SofasList.CreateElements(SofasList.Sofas);

    $(SofasList.Selectors.OrderElements).on('change', function () {
        if (parseInt($(this).val()) == parseInt(Enums.PriceSortBy.ASC)) {
            SofasList.Order($(this).val());
        }
        else if (parseInt($(this).val()) == parseInt(Enums.PriceSortBy.DESC)) {
            SofasList.Order($(this).val());
        }
        else if (parseInt($(this).val()) == parseInt(Enums.DefaultElementValue)) {
            SofasList.CreateElements(SofasList.Sofas);
        }
    });
};

SofasList.Order = function (order) {
    var sofa = new RequestConfigNameSpace.AjaxConfig('/SofasApp/Order', { order: order }, null, null, null, null, function (data) {
        SofasList.CreateElements(data.sofas);
    }, null, null, null);

    RequestWorker.Request.AjaxRequest(sofa);
};

SofasList.CreateElements = function (sofas) {
    $(SofasList.Selectors.AllSofasContainer).html('');

    var html = '';

    for (var i = 0; i < sofas.length; i = i + 3) {
        var currentGroup = SofasList.SkipTake(i, 3, sofas);

        for (var j = 0; j < currentGroup.length; j++) {
            if (j == 0) {
                html += SofasList.CreateFirstElement(currentGroup[j]);
            }
            else if (j == 1) {
                html += SofasList.CreateSecondElement(currentGroup[j]);
            }
            else if (j == 2) {
                html += SofasList.CreateThirdElement(currentGroup[j]);
            }
        }
    }

    $(SofasList.Selectors.AllSofasContainer).html(html);
};

SofasList.CreateFirstElement = function (sofa) {
    var html = '';
    if (sofa != null) {
        html += '<article class="grid_8 alpha"><div class="inner-block"><div class="page4-box1">';
        html += '<a class="page4-img1" href="/SofasApp/Edit/' + sofa.id + '">';
        html += '<img src="' + sofa.ImagePath + '" alt="' + sofa.Name + '" title="' + sofa.Name + '" class="imgSmall" /><span></span>';
        html += '</a><div class="clear"></div><div><div style="float:left">';
        html += '<a class="textSize20" style="color:#6c6c6c" href="/SofasApp/Edit/' + sofa.id + '">' + sofa.Name + '</a>';
        html += '</div><div style="float:right">';
        if (sofa.NewPrice == null) {
            html += '<span class="textSize20 link4">€ ' + sofa.Price + '</span>';
        }
        else {
            html += '<span class="textSize20 link4">€ ' + sofa.NewPrice + '</span>';
        }
        html += '</div></div></div></div></article>';
    }
    return html;
};

SofasList.CreateSecondElement = function (sofa) {
    var html = '';
    if (sofa != null) {
        html += '<article class="grid_8"><div class="inner-block"><div class="page4-box1">';
        html += '<a class="page4-img1" href="/SofasApp/Edit/' + sofa.id + '"><img src="' + sofa.ImagePath + '" class="imgSmall" alt="' + sofa.Name + '" title="' + sofa.Name + '"><span></span></a>';
        html += '<div class="clear"></div><div><div style="float:left;margin-left:5px;">';
        html += '<a class="textSize20" style="color:#6c6c6c" href="/SofasApp/Edit/' + sofa.id + '">' + sofa.Name + '</a></div><div style="float:right">';
        if (sofa.NewPrice == null) {
            html += '<span class="textSize20 link4">€ ' + sofa.Price + '</span>';
        }
        else {
            html += '<span class="textSize20 link4">€ ' + sofa.NewPrice + '</span>';
        }
        html += '</div></div></div></div></article>';
    }
    return html;
};

SofasList.CreateThirdElement = function (sofa) {
    var html = '';
    if (sofa != null) {
        html += '<article class="grid_8 omega"><div class="inner-block"><div class="page4-box1">';
        html += '<a class="page4-img1" href="/SofasApp/Edit/' + sofa.id + '"><img src="' + sofa.ImagePath + '" class="imgSmall" alt="' + sofa.Name + '" title="' + sofa.Name + '"><span></span></a>'
        html += '<div class="clear"></div><div><div style="float:left">';
        html += '<a class="textSize20" style="color:#6c6c6c" href="/SofasApp/Edit/' + sofa.id + '">' + sofa.Name + '</a>';
        html += '</div>';
        html += '<div style="float:right">';
        if (sofa.NewPrice == null) {
            html += '<span class="textSize20 link4">€ ' + sofa.Price + '</span>';
        }
        else {
            html += '<span class="textSize20 link4">€ ' + sofa.NewPrice + '</span>';
        }
        html += '</div>';
        html += '</div>';

        html += '</div></div></article>';
    }
    return html;
};

SofasList.SkipTake = function (skip, take, sofas) {
    var arrayResult = new Array;
    for (var i = skip; i < skip + take; i++) {
        arrayResult.push(sofas[i]);
    }

    return arrayResult;
};