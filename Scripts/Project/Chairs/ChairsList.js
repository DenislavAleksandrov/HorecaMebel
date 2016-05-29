var ChairsList = {};

ChairsList.Chairs = {};

ChairsList.Selectors =
    {
        OrderElements: '[data-selector="OrderElements"]',

        AllChairsContainer: '[data-selector="AllChairContainer"]'
    };

ChairsList.Init = function (chairs) {
    ChairsList.Chairs = chairs;
    ChairsList.CreateElements(ChairsList.Chairs);

    $(ChairsList.Selectors.OrderElements).on('change', function () {
        if (parseInt($(this).val()) == parseInt(Enums.PriceSortBy.ASC)) {
            ChairsList.Order($(this).val());
        }
        else if (parseInt($(this).val()) == parseInt(Enums.PriceSortBy.DESC)) {
            ChairsList.Order($(this).val());
        }
        else if (parseInt($(this).val()) == parseInt(Enums.DefaultElementValue)) {
            ChairsList.CreateElements(ChairsList.Chairs);
        }
    });
};

ChairsList.Order = function (order) {
    var chair = new RequestConfigNameSpace.AjaxConfig('/ChairsApp/Order', { order: order }, null, null, null, null, function (data) {
        ChairsList.CreateElements(data.chairs);
    }, null, null, null);

    RequestWorker.Request.AjaxRequest(chair);
};

ChairsList.CreateElements = function (chairs) {
    $(ChairsList.Selectors.AllArmchairContainer).html('');

    var html = '';

    for (var i = 0; i < chairs.length; i = i + 3) {
        var currentGroup = ChairsList.SkipTake(i, 3, chairs);

        for (var j = 0; j < currentGroup.length; j++) {
            if (j == 0) {
                html += ChairsList.CreateFirstElement(currentGroup[j]);
            }
            else if (j == 1) {
                html += ChairsList.CreateSecondElement(currentGroup[j]);
            }
            else if (j == 2) {
                html += ChairsList.CreateThirdElement(currentGroup[j]);
            }
        }
    }

    $(ChairsList.Selectors.AllChairsContainer).html(html);
};

ChairsList.CreateFirstElement = function (chair) {
    var html = '';
    if (chair != null) {
        html += '<article class="grid_8 alpha"><div class="inner-block"><div class="page4-box1">';
        html += '<a class="page4-img1" href="/ChairsApp/Edit/' + chair.id + '">';
        html += '<img src="' + chair.ImagePath + '" alt="' + chair.Name + '" title="' + chair.Name + '" class="imgSmall" /><span></span>';
        html += '</a><div class="clear"></div><div><div style="float:left">';
        html += '<a class="textSize20" style="color:#6c6c6c" href="/ChairsApp/Edit/' + chair.id + '">' + chair.Name + '</a>';
        html += '</div><div style="float:right">';
        if (chair.NewPrice == null) {
            html += '<span class="textSize20 link4">€ ' + chair.Price + '</span>';
        }
        else {
            html += '<span class="textSize20 link4">€ ' + chair.NewPrice + '</span>';
        }
        html += '</div></div></div></div></article>';
    }
    return html;
};

ChairsList.CreateSecondElement = function (chair) {
    var html = '';
    if (chair != null) {
        html += '<article class="grid_8"><div class="inner-block"><div class="page4-box1">';
        html += '<a class="page4-img1" href="/ChairsApp/Edit/' + chair.id + '"><img src="' + chair.ImagePath + '" class="imgSmall" alt="' + chair.Name + '" title="' + chair.Name + '"><span></span></a>';
        html += '<div class="clear"></div><div><div style="float:left;margin-left:5px;">';
        html += '<a class="textSize20" style="color:#6c6c6c" href="/ChairsApp/Edit/' + chair.id + '">' + chair.Name + '</a></div><div style="float:right">';
        if (chair.NewPrice == null) {
            html += '<span class="textSize20 link4">€ ' + chair.Price + '</span>';
        }
        else {
            html += '<span class="textSize20 link4">€ ' + chair.NewPrice + '</span>';
        }
        html += '</div></div></div></div></article>';
    }
    return html;
};

ChairsList.CreateThirdElement = function (chair) {
    var html = '';
    if (chair != null) {
        html += '<article class="grid_8 omega"><div class="inner-block"><div class="page4-box1">';
        html += '<a class="page4-img1" href="/ChairsApp/Edit/' + chair.id + '"><img src="' + chair.ImagePath + '" class="imgSmall" alt="' + chair.Name + '" title="' + chair.Name + '"><span></span></a>'
        html += '<div class="clear"></div><div><div style="float:left">';
        html += '<a class="textSize20" style="color:#6c6c6c" href="/ChairsApp/Edit/' + chair.id + '">' + chair.Name + '</a>';
        html += '</div>';
        html += '<div style="float:right">';
        if (chair.NewPrice == null) {
            html += '<span class="textSize20 link4">€ ' + chair.Price + '</span>';
        }
        else {
            html += '<span class="textSize20 link4">€ ' + chair.NewPrice + '</span>';
        }
        html += '</div>';
        html += '</div>';

        html += '</div></div></article>';
    }
    return html;
};

ChairsList.SkipTake = function (skip, take, chairs) {
    var arrayResult = new Array;
    for (var i = skip; i < skip + take; i++) {
        arrayResult.push(chairs[i]);
    }

    return arrayResult;
};