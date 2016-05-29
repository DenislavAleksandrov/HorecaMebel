using HorecaBL.Administration;
using HorecaBL.DB.Administration;
using HorecaMebel.Models.Administration;
using HorecaMebel.Models.Basket;
using HorecaMebel.Models.CubeSeats;
using HorecaMebel.Models.EF;
using HorecaMebel.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HorecaMebel.Controllers
{
    public class CubeSeatsAppController : BaseController
    {
        private IConfiguration config;
        private IUtilities utilities;
        private IUserDbContext userDb;
        private ICubeSeatDbContext cubeSeatDb;

        public CubeSeatsAppController(IConfiguration config, IUtilities utilities, IUserDbContext userDb, ICubeSeatDbContext cubeSeatDb)
            : base(config, utilities, userDb)
        {
            this.config = config;
            this.utilities = utilities;
            this.userDb = userDb;
            this.cubeSeatDb = cubeSeatDb;
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

            var model = new ListOfCubeSeats(this.cubeSeatDb, base.BasketCount);
            return View(model);
        }

        public ActionResult Edit(int id)
        {
            var model = new EditCubeSeatViewModel(this.cubeSeatDb, id, base.BasketCount, this.config.MinAmountForCubeSeatToOrder);
            return View(model);
        }

        public JsonResult Order(PriceSortBy order)
        {
            List<CubeSeat> cubeSeats = new List<CubeSeat>();
            if (order == PriceSortBy.ASC)
            {
                cubeSeats = this.cubeSeatDb.AllCubeSeat().OrderBy(x => x.NewPrice != null ? x.NewPrice : x.Price).ToList();
            }
            else
            {
                cubeSeats = this.cubeSeatDb.AllCubeSeat().OrderByDescending(x => x.NewPrice != null ? x.NewPrice : x.Price).ToList();
            }
            return Json(new { cubeSeats = cubeSeats }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddCubeSeatInBasket(int id, string skin, int count)
        {
            try
            {
                Basket basket = Session[this.config.BasketIdNameCookie] as Basket;

                if (basket == null) basket = new Basket(0, 0, this.config);

                var cubeSeat = this.cubeSeatDb.LoadCubeSeatById(id);

                basket.CubeSeatsInBasket.Add(new CubeSeatInBasket()
                {
                    CubeSeat = cubeSeat,
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
