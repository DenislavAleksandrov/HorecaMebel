using HorecaBL.Administration;
using HorecaBL.DB.Administration;
using HorecaMebel.Models.Administration;
using HorecaMebel.Models.Basket;
using HorecaMebel.Models.EF;
using HorecaMebel.Models.Enum;
using HorecaMebel.Models.Sofas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HorecaMebel.Controllers
{
    public class SofasAppController : BaseController
    {
        private IConfiguration config;
        private IUtilities utilities;
        private IUserDbContext userDb;
        private ISofaDbContext sofaDb;

        public SofasAppController(IConfiguration config, IUtilities utilities, IUserDbContext userDb, ISofaDbContext sofaDb)
            : base(config, utilities, userDb)
        {
            this.config = config;
            this.utilities = utilities;
            this.userDb = userDb;
            this.sofaDb = sofaDb;
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

            var model = new ListOfSofas(this.sofaDb, base.BasketCount);
            return View(model);
        }

        public ActionResult Edit(int id)
        {
            var model = new EditSofaViewModel(this.sofaDb, id, base.BasketCount, this.config.MinAmountForSofasToOrder);
            return View(model);
        }

        public JsonResult Order(PriceSortBy order)
        {
            List<Sofa> sofas = new List<Sofa>();
            if (order == PriceSortBy.ASC)
            {
                sofas = this.sofaDb.AllSofas().OrderBy(x => x.NewPrice != null ? x.NewPrice : x.Price).ToList();
            }
            else
            {
                sofas = this.sofaDb.AllSofas().OrderByDescending(x => x.NewPrice != null ? x.NewPrice : x.Price).ToList();
            }
            return Json(new { sofas = sofas }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddSofaInBasket(int id, string skin, int count)
        {
            try
            {
                Basket basket = Session[this.config.BasketIdNameCookie] as Basket;

                if (basket == null) basket = new Basket(0, 0, this.config);

                var sofa = this.sofaDb.LoadSofaById(id);

                basket.SofasInBasket.Add(new SofaInBasket()
                {
                    Sofa = sofa,
                    Id = Guid.NewGuid(),
                    Skin = skin,
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
