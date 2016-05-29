var ArmchairList = {};

ArmchairList.Armchairs = {};

ArmchairList.Selectors = 
    {
        OrderElements:'[data-selector="OrderElements"]',

        AllArmchairContainer:'[data-selector="AllArmchairContainer"]'
    };


ArmchairList.Init = function (armchairs) {
    ArmchairList.Armchairs = armchairs;

    ArmchairList.CreateElements(ArmchairList.Armchairs);
    
    $(ArmchairList.Selectors.OrderElements).on('change', function () {
        if (parseInt($(this).val()) == parseInt(Enums.PriceSortBy.ASC)) {
            ArmchairList.Order($(this).val());
        }
        else if (parseInt($(this).val()) == parseInt(Enums.PriceSortBy.DESC)) {
            ArmchairList.Order($(this).val());
        }
        else if (parseInt($(this).val()) == parseInt(Enums.DefaultElementValue)) {
            ArmchairList.CreateElements(ArmchairList.Armchairs);
        }
    });
};

ArmchairList.Order = function (order) {
    var armchair = new RequestConfigNameSpace.AjaxConfig('/ArmchairsApp/Order', { order: order }, null, null, null, null, function (data)
    {
        ArmchairList.CreateElements(data.armchairs);
    },null, null, null);

    RequestWorker.Request.AjaxRequest(armchair);
};

ArmchairList.CreateElements = function (armchairs) {
    $(ArmchairList.Selectors.AllArmchairContainer).html('');

    var html = '';

    for (var i = 0; i < armchairs.length; i = i + 3) {
        var currentGroup = ArmchairList.SkipTake(i, 3, armchairs);

        for (var j = 0; j < currentGroup.length; j++) {
            if(j == 0)
            {
                html += ArmchairList.CreateFirstElement(currentGroup[j]);
            }
            else if(j == 1)
            {
                html += ArmchairList.CreateSecondElement(currentGroup[j]);
            }
            else if(j == 2)
            {
                html += ArmchairList.CreateThirdElement(currentGroup[j]);
            }
        }
    }

    $(ArmchairList.Selectors.AllArmchairContainer).html(html);
};

ArmchairList.CreateFirstElement = function(armchair)
{
    var html = '';
    if (armchair != null) {
        html += '<article class="grid_8 alpha"><div class="inner-block"><div class="page4-box1">';
        html += '<a class="page4-img1" href="/ArmchairsApp/Edit/' + armchair.id + '" >';
        html += '<img src="' + armchair.ImagePath + '" alt="' + armchair.Name + '" title="' + armchair.Name + '" class="imgSmall" /><span></span>';
        html += '</a><div class="clear"></div><div><div style="float:left">';
        html += '<a class="textSize20" style="color:#6c6c6c" href="/ArmchairsApp/Edit/' + armchair.id + '">' + armchair.Name + '</a>';
        html += '</div><div style="float:right">';
        if (armchair.NewPrice == null) {
            html += '<span class="textSize20 link4">€ ' + armchair.Price + '</span>';
        }
        else {
            html += '<span class="textSize20 link4">€ ' + armchair.NewPrice + '</span>';
        }
        html += '</div></div></div></div></article>';
    }
    return html;
};

ArmchairList.CreateSecondElement = function(armchair)
{
    var html = '';
    if (armchair != null) {
        html += '<article class="grid_8"><div class="inner-block"><div class="page4-box1">';
        html += '<a class="page4-img1" href="/ArmchairsApp/Edit/' + armchair.id + '"><img src="' + armchair.ImagePath + '" class="imgSmall" alt="' + armchair.Name + '" title="' + armchair.Name + '"><span></span></a>';
        html += '<div class="clear"></div><div><div style="float:left;margin-left:5px;">';
        html += '<a class="textSize20" style="color:#6c6c6c" href="/ArmchairsApp/Edit/' + armchair.id + '">' + armchair.Name + '</a></div><div style="float:right">';
        if (armchair.NewPrice == null) {
            html += '<span class="textSize20 link4">€ ' + armchair.Price + '</span>';
        }
        else {
            html += '<span class="textSize20 link4">€ ' + armchair.NewPrice + '</span>';
        }
        html += '</div></div></div></div></article>';
    }
    return html;
};

ArmchairList.CreateThirdElement = function(armchair)
{
    var html = '';
    if (armchair != null) {
        html += '<article class="grid_8 omega"><div class="inner-block"><div class="page4-box1">';
        html += '<a class="page4-img1" href="/ArmchairsApp/Edit/' + armchair.id + '"><img src="' + armchair.ImagePath + '" class="imgSmall" alt="' + armchair.Name + '" title="' + armchair.Name + '"><span></span></a>'
        html += '<div class="clear"></div><div><div style="float:left">';
        html += '<a class="textSize20" style="color:#6c6c6c" href="/ArmchairsApp/Edit/' + armchair.id + '">' + armchair.Name + '</a>';
        html += '</div>';
        html += '<div style="float:right">';
        if (armchair.NewPrice == null) {
            html += '<span class="textSize20 link4">€ ' + armchair.Price + '</span>';
        }
        else {
            html += '<span class="textSize20 link4">€ ' + armchair.NewPrice + '</span>';
        }
        html += '</div>';
        html += '</div>';

        html += '</div></div></article>';
    }
    return html;
};

ArmchairList.SkipTake = function (skip, take, armchairs) {
    var arrayResult = new Array;
    for (var i = skip; i < skip + take; i++) {
        arrayResult.push(armchairs[i]);
    }

    return arrayResult;
};