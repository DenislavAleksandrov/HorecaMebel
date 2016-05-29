var ReferencesList = {};

ReferencesList.Selectors =
    {
        AllReferencesContainer: '[data-selector="AllReferencesContainer"]'
    }

ReferencesList.ReferenceList = null;
ReferencesList.Init = function (references) {

    ReferencesList.ReferenceList = references;

    ReferencesList.CreateElements(ReferencesList.ReferenceList);   
};

ReferencesList.CreateElements = function (references) {
    $(ReferencesList.Selectors.AllReferencesContainer).html('');

    var html = '';

    for (var i = 0; i < references.length; i = i + 3) {
        var currentGroup = ReferencesList.SkipTake(i, 3, references);

        for (var j = 0; j < currentGroup.length; j++) {
            if (j == 0) {
                html += ReferencesList.CreateFirstElement(currentGroup[j]);
            }
            else if (j == 1) {
                html += ReferencesList.CreateSecondElement(currentGroup[j]);
            }
            else if (j == 2) {
                html += ReferencesList.CreateThirdElement(currentGroup[j]);
            }
        }
    }

    $(ReferencesList.Selectors.AllReferencesContainer).html(html);
};

ReferencesList.CreateFirstElement = function (reference) {
    var html = '';
    if (reference != null) {
        html += '<article class="grid_8 alpha"><div class="inner-block"><div class="page4-box1">';
        html += '<a class="page4-img1">';
        html += '<img class="page4-img1" src="' + reference.ImagePath + '" alt=""/><span></span>';
        html += '</a><div class="clear"></div>';
        html += '</div></div></article>';
    }
    return html;
};

ReferencesList.CreateSecondElement = function (reference) {
    var html = '';
    if (reference != null) {
        html += '<article class="grid_8"><div class="inner-block"><div class="page4-box1">';
        html += '<a class="page4-img1">';
        html += '<img class="page4-img1" src="' + reference.ImagePath + '" alt=""/><span></span>';
        html += '</a><div class="clear"></div>';
        html += '</div></div></article>';
    }
    return html;
};

ReferencesList.CreateThirdElement = function (reference) {
    var html = '';
    if (reference != null) {
        html += '<article class="grid_8 omega"><div class="inner-block"><div class="page4-box1">';
        html += '<a class="page4-img1">';
        html += '<img class="page4-img1" src="' + reference.ImagePath + '" alt=""/><span></span>';
        html += '</a><div class="clear"></div>';
        html += '</div></div></article>';
    }
    return html;
};

ReferencesList.SkipTake = function (skip, take, references) {
    var arrayResult = new Array;
    for (var i = skip; i < skip + take; i++) {
        arrayResult.push(references[i]);
    }    
    return arrayResult;
};