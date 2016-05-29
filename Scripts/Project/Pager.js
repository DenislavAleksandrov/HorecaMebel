function Pager(currentPage, pagesCount, itemsOnPage) {
    this.CurrentPage = currentPage;
    this.PagesCount = pagesCount;
    this.ItemsOnPage = itemsOnPage;
};

Pager.prototype.NextPagerButtonClicked = function () {
    if (this.CurrentPage != this.PagesCount) {
        this.CurrentPage++;
    }
};

Pager.prototype.PrevPagerButtonClicked = function () {
    if (this.CurrentPage != 1) {
        this.CurrentPage--;
    }
};

Pager.prototype.Selectors =
    {
        PagerContainer: '[data-selector="Pager"]',
        NextPage: '[data-selector="NextPage"]',
        PrevPage: '[data-selector="PrevPage"]',
        NextPageButtonWithPage: '[data-selector="nextPage"]'
    };

Pager.prototype.BuildPager = function (pagesCount, page) {

    var htmlPager = [];

    htmlPager.push('<nav><ul class="pagination">');

    if (page != 1) {
        htmlPager.push('<li><a data-selector="PrevPage" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>');
    }

    if (pagesCount > 1) {
        for (var i = 1; i <= 3; i++) {
            if (pagesCount >= i) {
                htmlPager.push('<li class="' + (page == i ? 'active' : '') + '"><a data-selector="nextPage" data-page="' + i + '">' + i + '</a></li>');
            }
        }

        if (page > 5 && pagesCount != 6) {
            htmlPager.push('<li class="disabled"><a class="no-hover">...</a></li>');
        }

        for (var i = page - 1; i <= page + 1; i++) {
            if (pagesCount - 2 > i && i > 3) {
                htmlPager.push('<li class="' + (page == i ? 'active' : '') + '"><a data-selector="nextPage" data-page="' + i + '">' + i + '</a></li>');
            }
        }

        if (page < pagesCount - 4 && pagesCount != 6) {
            htmlPager.push('<li class="disabled"><a class="step no-hover">...</a></li>');
        }

        for (var i = pagesCount - 2; i <= pagesCount; i++) {
            if (i > 3) {
                htmlPager.push('<li class="' + (page == i ? 'active' : '') + '"><a data-selector="nextPage" data-page="' + i + '" class="step ' + (page == i ? 'active' : '') + '">' + i + '</a></li>');
            }
        }
    }

    if (page != pagesCount && pagesCount > 1) {
        htmlPager.push('<li><a data-selector="NextPage" aria-label="Next"><span aria-hidden="true">&raquo</span></a></li>');
    }

    htmlPager.push('</ul></nav>');
    return htmlPager.join('');
};