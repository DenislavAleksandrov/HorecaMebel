var SearchOnPage = {};

SearchOnPage.Selectors =
    {
        Container: '[data-selector="Container"]',

        AllChairsContainer:'[data-selector="AllChairsContainer"]',
        AllArmchairsContainer:'[data-selector="AllArmchairsContainer"]',
        AllSofasContainer:'[data-selector="AllSofasContainer"]',
        AllCubeSeatContainer: '[data-selector="AllCubeSeatContainer"]',
        Search: '[data-selector="Search"]',
        BtnSearch: '[data-selector="BtnSeatSearchPage"]',
        OrderElements:'[data-selector="OrderElements"]'
    };

SearchOnPage.Armchairs = null;
SearchOnPage.Sofas = null;
SearchOnPage.CubeSeats = null;
SearchOnPage.Chairs = null;

SearchOnPage.Messages =
    {
        ChairsContainerHtml: '<div data-selector="AllChairsContainer"></div>',
        ArmchairsContainerHtml: '<div data-selector="AllArmchairsContainer"></div>',
        SofasContainerHtml: '<div data-selector="AllSofasContainer"></div>',
        CubeSeatsContainerHtml: '<div data-selector="AllCubeSeatContainer"></div>',
        ArmchairString: 'ARMCHAIRS',
        sofaString:'SOFAS',
        cubeSeatString:'CUBESEATS',
        chairString:'CHAIRS'
    };

SearchOnPage.ArmchairEditUrl = '/ArmchairsApp/Edit';
SearchOnPage.SofaEditUrl = '/SofasApp/Edit';
SearchOnPage.ChairEditUrl = '/ChairsApp/Edit';
SearchOnPage.CubeSeatsUrl = '/CubeSeatsApp/Edit';


SearchOnPage.Init = function (armchairs, sofas, cubeSeats, chairs, searchPattern, armchairString, sofaString, cubeSeatString, chairString) {
    SearchOnPage.Armchairs = armchairs;
    SearchOnPage.Sofas = sofas;
    SearchOnPage.CubeSeats = cubeSeats;
    SearchOnPage.Chairs = chairs;

    $(SearchOnPage.Selectors.Search).val(searchPattern);


    $(SearchOnPage.Selectors.BtnSearch).on('click', function (event) {
        event.preventDefault();
        $(SearchOnPage.Selectors.Container).html('');
        SearchOnPage.OrderAndFilter($(SearchOnPage.Selectors.OrderElements).val() != "-1" ? $(SearchOnPage.Selectors.OrderElements).val() : null, $(SearchOnPage.Selectors.Search).val());
    });

    $(SearchOnPage.Selectors.OrderElements).on('change', function () {
        if (parseInt($(this).val()) == parseInt(Enums.PriceSortBy.ASC)) {
            SearchOnPage.OrderAndFilter($(this).val(), $(SearchOnPage.Selectors.Search).val());
        }
        else if (parseInt($(this).val()) == parseInt(Enums.PriceSortBy.DESC)) {
            SearchOnPage.OrderAndFilter($(this).val(), $(SearchOnPage.Selectors.Search).val());
        }
        else if (parseInt($(this).val()) == parseInt(Enums.DefaultElementValue)) {
            $(SearchOnPage.Selectors.Container).html('');
            SearchOnPage.CreateSections(SearchOnPage.Armchairs, SearchOnPage.Sofas, SearchOnPage.CubeSeats, SearchOnPage.Chairs);
        }
    });

    SearchOnPage.CreateSections(SearchOnPage.Armchairs, SearchOnPage.Sofas, SearchOnPage.CubeSeats, SearchOnPage.Chairs);
};

SearchOnPage.OrderAndFilter = function (order, pattern) {
    var sofa = new RequestConfigNameSpace.AjaxConfig('/Search/Order', { order: order, pattern: pattern }, null, null, null, null, function (data) {
        
        $(SearchOnPage.Selectors.Container).html('');

        SearchOnPage.CreateSections(data.armchairs, data.sofas, data.cubeSeats,data.chairs);

    }, null, null, null);

    RequestWorker.Request.AjaxRequest(sofa);
};

SearchOnPage.CreateSections = function (armchairs, sofas, cubeSeats, chairs) {
    var html = '';
    if (armchairs != null && armchairs.length > 0) {

        var htmlHeader = SearchOnPage.Header().replace('{0}', SearchOnPage.Messages.ArmchairString).replace('{1}', SearchOnPage.Messages.ArmchairsContainerHtml);

        $(SearchOnPage.Selectors.Container).append(htmlHeader);

        var elementsHtml = SearchOnPage.CreateElements(armchairs, SearchOnPage.ArmchairEditUrl);

        $(SearchOnPage.Selectors.AllArmchairsContainer).html(elementsHtml);
    }

    if (sofas != null && sofas.length > 0) {
        $(SearchOnPage.Selectors.Container).append(SearchOnPage.Header().replace('{0}', SearchOnPage.Messages.sofaString).replace('{1}', SearchOnPage.Messages.SofasContainerHtml));

        $(SearchOnPage.Selectors.AllSofasContainer).append(SearchOnPage.CreateElements(sofas, SearchOnPage.SofaEditUrl));
    }

    if (cubeSeats != null && cubeSeats.length > 0) {

        $(SearchOnPage.Selectors.Container).append(SearchOnPage.Header().replace('{0}', SearchOnPage.Messages.cubeSeatString).replace('{1}', SearchOnPage.Messages.CubeSeatsContainerHtml));
        
        $(SearchOnPage.Selectors.AllCubeSeatContainer).append(SearchOnPage.CreateElements(cubeSeats, SearchOnPage.CubeSeatsUrl));
    }

    if (chairs != null && chairs.length > 0) {

        $(SearchOnPage.Selectors.Container).append(SearchOnPage.Header().replace('{0}', SearchOnPage.Messages.chairString).replace('{1}', SearchOnPage.Messages.ChairsContainerHtml));
        
        $(SearchOnPage.Selectors.AllChairsContainer).append(SearchOnPage.CreateElements(chairs, SearchOnPage.ChairEditUrl));
    }
};

SearchOnPage.CreateElements = function(elements, url){
    var html = '';
    if (elements != null && elements.length > 0) {

        var html = '';

        for (var i = 0; i < elements.length; i = i + 3) {
            var currentGroup = SearchOnPage.SkipTake(i, 3, elements);

            for (var j = 0; j < currentGroup.length; j++) {
                if (j == 0) {
                    html += SearchOnPage.CreateFirstElement(currentGroup[j], url);
                }
                else if (j == 1) {
                    html += SearchOnPage.CreateSecondElement(currentGroup[j], url);
                }
                else if (j == 2) {
                    html += SearchOnPage.CreateThirdElement(currentGroup[j], url);
                }
            }
        }
    }
    return html;
};

SearchOnPage.Header = function()
{
    var html = '';

    html += '<article class="grid_24"><div class="inner-block"><div style="float:left;width:72%"><h3>{0}</h3></div>';                
    html += '</div><div class="clearfix"></div>{1}<div class="clear"></div><div class="divHeight5Px"></div>';
    html += '<div class="divHeight5Px"></div></article><div class="clear"></div>';

    return html;
   
};

SearchOnPage.SkipTake = function (skip, take, array) {
    var arrayResult = new Array;
    for (var i = skip; i < skip + take; i++) {
        arrayResult.push(array[i]);
    }

    return arrayResult;
};

SearchOnPage.CreateFirstElement = function (element, url) {
    var html = '';
    if (element != null) {
        html += '<article class="grid_8 alpha"><div class="inner-block"><div class="page4-box1">';
        html += '<a class="page4-img1" href="' + element.ImagePath + '">';
        html += '<img src="' + element.ImagePath + '" alt="" class="imgSmall" /><span></span>';
        html += '</a><div class="clear"></div><div><div style="float:left">';
        html += '<a class="link4" href="' + url + '/ ' + element.id+ '">' + element.Name + '</a>';
        html += '</div><div style="float:right">';
        if (element.NewPrice == null) {
            html += '<span class="textSize20">€ ' + element.Price + '</span>';
        }
        else {
            html += '<span class="textSize20">€ ' + element.NewPrice + '</span>';
        }
        html += '</div></div></div></div></article>';
    }
    return html;
};

SearchOnPage.CreateSecondElement = function (element, url) {
    var html = '';
    if (element != null) {
        html += '<article class="grid_8"><div class="inner-block"><div class="page4-box1">';
        html += '<a class="page4-img1"><img src="' + element.ImagePath + '" class="imgSmall" alt=""><span></span></a>';
        html += '<div class="clear"></div><div><div style="float:left;margin-left:5px;">';
        html += '<a class="link4" href="' + url + '/ ' + element.id + '">' + element.Name + '</a></div><div style="float:right">';
        if (element.NewPrice == null) {
            html += '<span class="textSize20">€ ' + element.Price + '</span>';
        }
        else {
            html += '<span class="textSize20">€ ' + element.NewPrice + '</span>';
        }
        html += '</div></div></div></div></article>';
    }
    return html;
};

SearchOnPage.CreateThirdElement = function (element, url) {
    var html = '';
    if (element != null) {
        html += '<article class="grid_8 omega"><div class="inner-block"><div class="page4-box1">';
        html += '<a class="page4-img1"><img src="' + element.ImagePath + '" class="imgSmall" alt=""><span></span></a>'
        html += '<div class="clear"></div><div><div style="float:left">';
        html += '<a class="link4" href="' + url + '/ ' + element.id + '">' + element.Name + '</a>';
        html += '</div>';
        html += '<div style="float:right">';
        if (element.NewPrice == null) {
            html += '<span class="textSize20">€ ' + element.Price + '</span>';
        }
        else {
            html += '<span class="textSize20">€ ' + element.NewPrice + '</span>';
        }
        html += '</div>';
        html += '</div>';

        html += '</div></div></article>';
    }
    return html;
};
