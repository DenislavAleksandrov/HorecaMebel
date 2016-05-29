using HorecaBL.Administration;
using HorecaBL.DB.Administration;
using HorecaMebel.Models.About;
using HorecaMebel.Models.Administration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HorecaMebel.Controllers
{
    public class AboutController : BaseController
    {
        private IConfiguration config;
        private IUtilities utilities;
        private IUserDbContext userDb;        

        public AboutController(IConfiguration config, IUtilities utilities, IUserDbContext userDb)
            : base(config, utilities, userDb)
        {
            this.config = config;
            this.utilities = utilities;
            this.userDb = userDb;            
        }

        public ActionResult Index()
        {
            var model = new AboutIndexViewModel(base.BasketCount);
            return View(model);
        }

    }
}
