using HorecaBL.Administration;
using HorecaBL.DB.Administration;
using HorecaMebel.Areas.Administration.Attr;
using HorecaMebel.Areas.Administration.Models;
using HorecaMebel.Areas.Administration.Models.ViewModels;
using HorecaMebel.Models.Administration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HorecaMebel.Areas.Administration.Controllers
{
    public class AdminHomeController : AdminBaseController
    {
        private IConfiguration config;
        private IUtilities utilities;
        private IUserDbContext userDb;

        public AdminHomeController(IConfiguration config, IUtilities utilities, IUserDbContext userDb)
            : base(config, utilities, userDb)
        {
            this.config = config;
            this.utilities = utilities;
            this.userDb = userDb;
        }

        [HorecaAuthorisation]
        public ActionResult Index()
        {
            var model = new HomeIndexViewModel(ControllersEnum.Home);
            return View(model);
        }
    }
}
