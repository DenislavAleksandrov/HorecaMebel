using HorecaBL.Administration;
using HorecaBL.DB.Administration;
using HorecaMebel.Models.Administration;
using HorecaMebel.Models.Home;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HorecaMebel.Controllers
{
    public class HomeController : BaseController
    {
        private IConfiguration config;
        private IUtilities utilities;
        private IUserDbContext userDb;
        private IPromotionsDbContext promotionDb;

        public HomeController(IConfiguration config, IUtilities utilities, IUserDbContext userDb, IPromotionsDbContext promotionDb)
            : base(config, utilities, userDb)
        {
            this.config = config;
            this.utilities = utilities;
            this.userDb = userDb;
            this.promotionDb = promotionDb;
        }

        public ActionResult Index()
        {
            var model = new IndexViewModel(base.BasketCount, this.promotionDb);
            return View(model);
        }
    }
}
