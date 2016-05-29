using HorecaBL.Administration;
using HorecaBL.DB.Administration;
using HorecaMebel.Models.Administration;
using HorecaMebel.Models.Enum;
using HorecaMebel.Models.Search;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HorecaMebel.Controllers
{
    public class SearchController : BaseController
    {
        private IConfiguration config;
        private IUtilities utilities;
        private IUserDbContext userDb;
        private IArmchairDbContext armchairDb;
        private IChairDbContext chairDb;
        private ISofaDbContext sofaDb;
        private ICubeSeatDbContext cubeSeatDb;

        public SearchController(IConfiguration config, IUtilities utilities, IUserDbContext userDb, IArmchairDbContext armchairDb,
                                IChairDbContext chairDb, ICubeSeatDbContext cubeSeatDb, ISofaDbContext sofaDb)
            : base(config,utilities,userDb)
        {
            this.config = config;
            this.utilities = utilities;
            this.userDb = userDb;
            this.armchairDb = armchairDb;
            this.chairDb = chairDb;
            this.cubeSeatDb = cubeSeatDb;
            this.sofaDb = sofaDb;
        }

        private List<SelectListItem> OrderBy()
        {
            List<SelectListItem> result = new List<SelectListItem>();

            result.Add(this.utilities.DefaultOption);
            result.Add(new SelectListItem() { Text = Resources.Resources.AscendingOrder, Value = Convert.ToString(Convert.ToInt32(PriceSortBy.ASC)), Selected = false });
            result.Add(new SelectListItem() { Text = Resources.Resources.DescendingOrder, Value = Convert.ToString(Convert.ToInt32(PriceSortBy.DESC)), Selected = false });
            return result;
        }

        public ActionResult Search(string searchPattern)
        {
            ViewBag.OrderBy = this.OrderBy();
            ViewBag.SearchPattern = searchPattern;
            var model = new SearchViewModel(this.armchairDb, this.chairDb, this.cubeSeatDb, this.sofaDb, searchPattern, base.BasketCount, null);
            return View(model);
        }


        public JsonResult Order(PriceSortBy? order, string pattern)
        {
            var model = new SearchViewModel(this.armchairDb, this.chairDb, this.cubeSeatDb, this.sofaDb, pattern, base.BasketCount, order);

            return Json(new { armchairs = model.Armchairs, sofas = model.Sofas, chairs = model.Chairs, cubeSeats = model.CubeSeat }, JsonRequestBehavior.AllowGet);
        }
    }
}
