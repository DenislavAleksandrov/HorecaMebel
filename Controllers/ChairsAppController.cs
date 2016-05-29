using HorecaBL.Administration;
using HorecaBL.DB.Administration;
using HorecaMebel.Models.Administration;
using HorecaMebel.Models.Basket;
using HorecaMebel.Models.Chairs;
using HorecaMebel.Models.EF;
using HorecaMebel.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HorecaMebel.Controllers
{
    public class ChairsAppController : BaseController
    {
        private IConfiguration config;
        private IUtilities utilities;
        private IUserDbContext userDb;
        private IChairDbContext chairDb;

        public ChairsAppController(IConfiguration config, IUtilities utilities, IUserDbContext userDb, IChairDbContext chairDb)
            : base(config, utilities, userDb)
        {
            this.config = config;
            this.utilities = utilities;
            this.userDb = userDb;
            this.chairDb = chairDb;
        }

        private List<SelectListItem> OrderBy()
        {
            List<SelectListItem> result = new List<SelectListItem>();
            
            result.Add(new SelectListItem() { Text = Resources.Resources.AscendingOrder, Value = Convert.ToString(Convert.ToInt32(PriceSortBy.ASC)), Selected = true });
            result.Add(new SelectListItem() { Text = Resources.Resources.DescendingOrder, Value = Convert.ToString(Convert.ToInt32(PriceSortBy.DESC)), Selected = false });
            return result;
        }

        public ActionResult List()
        {
            ViewBag.OrderBy = this.OrderBy();

            var model = new ListOfChairsViewModel(this.chairDb, base.BasketCount);
            return View(model);
        }

        public JsonResult Order(PriceSortBy order)
        {
            List<Chair> chairs = new List<Chair>();
            if (order == PriceSortBy.ASC)
            {
                chairs = this.chairDb.AllChairs().OrderBy(x => x.NewPrice != null ? x.NewPrice : x.Price).ToList();
            }
            else
            {
                chairs = this.chairDb.AllChairs().OrderByDescending(x => x.NewPrice != null ? x.NewPrice : x.Price).ToList();
            }
            return Json(new { chairs = chairs }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Edit(int id)
        {
            //this is just a git test
            var model = new EditChairViewModel(this.chairDb, id, base.BasketCount, this.config.MinAmountForChairsToOrder);
            return View(model);
        }

        public JsonResult AddChairInBasket(int id, string woodColour, int count, string skinOption)
        {
            try
            {
                Basket basket = Session[this.config.BasketIdNameCookie] as Basket;

                if (basket == null) basket = new Basket(0, 0, this.config);

                var chair = this.chairDb.Edit(id);

                basket.ChairsInBasket.Add(new ChairInBasket()
                {
                    Chair = chair,
                    Id = Guid.NewGuid(),
                    WoodColour = woodColour,
                    Colour = skinOption,
                    Count = count
                });

                Session[this.config.BasketIdNameCookie] = basket;

                return Json(new { Status = true, Message = Resources.Resources.ElementAddedInTheBasket, BasketCount = basket.BasketCount }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = Resources.Resources.ElementErrorInController }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
