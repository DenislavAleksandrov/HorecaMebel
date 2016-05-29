var CubeSeatList = {};

CubeSeatList.CubeSeats = {};

CubeSeatList.Selectors =
    {
        OrderElements: '[data-selector="OrderElements"]',

        AllCubeSeatsContainer: '[data-selector="AllCubeSeatsContainer"]'
    };

CubeSeatList.Init = function (cubeSeats) {
    CubeSeatList.CubeSeats = cubeSeats;
    CubeSeatList.CreateElements(CubeSeatList.CubeSeats);

    $(CubeSeatList.Selectors.OrderElements).on('change', function () {
        if (parseInt($(this).val()) == parseInt(Enums.PriceSortBy.ASC)) {
            CubeSeatList.Order($(this).val());
        }
        else if (parseInt($(this).val()) == parseInt(Enums.PriceSortBy.DESC)) {
            CubeSeatList.Order($(this).val());
        }
        else if (parseInt($(this).val()) == parseInt(Enums.DefaultElementValue)) {
            CubeSeatList.CreateElements(CubeSeatList.CubeSeats);
        }
    });
};

CubeSeatList.Order = function (order) {
    var chair = new RequestConfigNameSpace.AjaxConfig('/CubeSeatsApp/Order', { order: order }, null, null, null, null, function (data) {
        CubeSeatList.CreateElements(data.cubeSeats);
    }, null, null, null);

    RequestWorker.Request.AjaxRequest(chair);
};

CubeSeatList.CreateElements = function (cubeSeats) {
    $(CubeSeatList.Selectors.AllCubeSeatsContainer).html('');

    var html = '';

    for (var i = 0; i < cubeSeats.length; i = i + 3) {
        var currentGroup = CubeSeatList.SkipTake(i, 3, cubeSeats);

        for (var j = 0; j < currentGroup.length; j++) {
            if (j == 0) {
                html += CubeSeatList.CreateFirstElement(currentGroup[j]);
            }
            else if (j == 1) {
                html += CubeSeatList.CreateSecondElement(currentGroup[j]);
            }
            else if (j == 2) {
                html += CubeSeatList.CreateThirdElement(currentGroup[j]);
            }
        }
    }

    $(CubeSeatList.Selectors.AllCubeSeatsContainer).html(html);
};

CubeSeatList.CreateFirstElement = function (cubeSeat) {
    var html = '';
    if (cubeSeat != null) {
        html += '<article class="grid_8 alpha"><div class="inner-block"><div class="page4-box1">';
        html += '<a class="page4-img1" href="/CubeSeatsApp/Edit/' + cubeSeat.id + '">';
        html += '<img src="' + cubeSeat.ImagePath + '" alt="' + cubeSeat.Name + '" title="' + cubeSeat.Name + '" class="imgSmall" /><span></span>';
        html += '</a><div class="clear"></div><div><div style="float:left">';
        html += '<a class="textSize20" style="color:#6c6c6c" href="/CubeSeatsApp/Edit/' + cubeSeat.id + '">' + cubeSeat.Name + '</a>';
        html += '</div><div style="float:right">';
        if (cubeSeat.NewPrice == null) {
            html += '<span class="textSize20 link4">€ ' + cubeSeat.Price + '</span>';
        }
        else {
            html += '<span class="textSize20 link4">€ ' + cubeSeat.NewPrice + '</span>';
        }
        html += '</div></div></div></div></article>';
    }
    return html;
};

CubeSeatList.CreateSecondElement = function (cubeSeat) {
    var html = '';
    if (cubeSeat != null) {
        html += '<article class="grid_8"><div class="inner-block"><div class="page4-box1">';
        html += '<a class="page4-img1" href="/CubeSeatsApp/Edit/' + cubeSeat.id + '"><img src="' + cubeSeat.ImagePath + '" class="imgSmall" alt="' + cubeSeat.Name + '" title="' + cubeSeat.Name + '"><span></span></a>';
        html += '<div class="clear"></div><div><div style="float:left;margin-left:5px;">';
        html += '<a class="textSize20" style="color:#6c6c6c"  href="/CubeSeatsApp/Edit/' + cubeSeat.id + '">' + cubeSeat.Name + '</a></div><div style="float:right">';
        if (cubeSeat.NewPrice == null) {
            html += '<span class="textSize20 link4">€ ' + cubeSeat.Price + '</span>';
        }
        else {
            html += '<span class="textSize20 link4">€ ' + cubeSeat.NewPrice + '</span>';
        }
        html += '</div></div></div></div></article>';
    }
    return html;
};

CubeSeatList.CreateThirdElement = function (cubeSeat) {
    var html = '';
    if (cubeSeat != null) {
        html += '<article class="grid_8 omega"><div class="inner-block"><div class="page4-box1">';
        html += '<a class="page4-img1" href="/CubeSeatsApp/Edit/' + cubeSeat.id + '"><img src="' + cubeSeat.ImagePath + '" class="imgSmall" alt="' + cubeSeat.Name + '" title="' + cubeSeat.Name + '"><span></span></a>'
        html += '<div class="clear"></div><div><div style="float:left">';
        html += '<a class="textSize20" style="color:#6c6c6c" href="/CubeSeatsApp/Edit/' + cubeSeat.id + '">' + cubeSeat.Name + '</a>';
        html += '</div>';
        html += '<div style="float:right">';
        if (cubeSeat.NewPrice == null) {
            html += '<span class="textSize20 link4">€ ' + cubeSeat.Price + '</span>';
        }
        else {
            html += '<span class="textSize20 link4">€ ' + cubeSeat.NewPrice + '</span>';
        }
        html += '</div>';
        html += '</div>';

        html += '</div></div></article>';
    }
    return html;
};

CubeSeatList.SkipTake = function (skip, take, cubeSeats) {
    var arrayResult = new Array;
    for (var i = skip; i < skip + take; i++) {
        arrayResult.push(cubeSeats[i]);
    }

    return arrayResult;
};