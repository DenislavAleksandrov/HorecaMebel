using HorecaBL.Administration;
using HorecaBL.DB.Administration;
using HorecaMebel.Models.Administration;
using HorecaMebel.Models.Armchairs;
using HorecaMebel.Models.Basket;
using HorecaMebel.Models.EF;
using HorecaMebel.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HorecaMebel.Controllers
{
    public class ArmchairsAppController : BaseController
    {
        private IConfiguration config;
        private IUtilities utilities;
        private IUserDbContext userDb;
        private IArmchairDbContext armchairDb;

        public ArmchairsAppController(IConfiguration config, IUtilities utilities, IUserDbContext userDb, IArmchairDbContext armchairDb)
            : base(config, utilities, userDb)
        {
            this.config = config;
            this.utilities = utilities;
            this.userDb = userDb;
            this.armchairDb = armchairDb;
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
            var model = new ListOfArmchairs(this.armchairDb, base.BasketCount);
            return View(model);
        }

        public ActionResult Edit(int id)
        {
            var model = new EditArmchair(this.armchairDb, id, base.BasketCount, this.config.MinAmountForArmchairsToOrder);
            return View(model);
        }

        public JsonResult AddArmchairInBasket(int id, string frameOption, string seatOption, string backOption, string skinOption, string legOption, int count)
        {
            try
            {
                Basket basket = Session[this.config.BasketIdNameCookie] as Basket;

                if (basket == null) basket = new Basket(0,0, this.config);

                var armchair = this.armchairDb.LoadArmchairById(id);

                basket.ArmchairsInBasket.Add(new ArmchairInBasket() { Armchair = armchair, 
                                                                      Id = Guid.NewGuid(),
                                                                      Skin = skinOption,                                                                      
                                                                      Count = count
                });

                Session[this.config.BasketIdNameCookie] = basket;

                return Json(new { Status = true, Message = Resources.Resources.ElementAddedInTheBasket, BasketCount = basket.BasketCount }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = Resources.Resources.ElementErrorInController}, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult Order(PriceSortBy order)
        {
            List<Armchair> armchairs = new List<Armchair>();
            if (order == PriceSortBy.ASC)
            {
                armchairs = this.armchairDb.AllArmchairs().OrderBy(x => x.NewPrice != null ? x.NewPrice : x.Price).ToList();
            }
            else {
                armchairs = this.armchairDb.AllArmchairs().OrderByDescending(x => x.NewPrice != null ? x.NewPrice : x.Price).ToList();
            }
            return Json(new { armchairs = armchairs}, JsonRequestBehavior.AllowGet);
        }
    }
}
