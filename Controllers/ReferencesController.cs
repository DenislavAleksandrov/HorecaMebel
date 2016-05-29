using HorecaBL.Administration;
using HorecaBL.DB.Administration;
using HorecaMebel.Models.Administration;
using HorecaMebel.Models.References;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HorecaMebel.Controllers
{
    public class ReferencesAppController : BaseController
    {
        private IConfiguration config;
        private IUtilities utilities;
        private IUserDbContext userDb;
        private IReferencesDbContext referencesDb;

        public ReferencesAppController(IConfiguration config, IUtilities utilities, IUserDbContext userDb, IReferencesDbContext referencesDb)
            : base(config, utilities, userDb)
        {
            this.config = config;
            this.utilities = utilities;
            this.userDb = userDb;
            this.referencesDb = referencesDb;
        }

        public ActionResult Index()
        {
            var viewModel = new ReferencesViewModel(base.BasketCount, referencesDb);
            return View(viewModel);
        }

    }
}
