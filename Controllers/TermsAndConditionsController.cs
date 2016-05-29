using HorecaBL.Administration;
using HorecaBL.DB.Administration;
using HorecaMebel.Models.Administration;
using HorecaMebel.Models.TearmsAndConditions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HorecaMebel.Controllers
{
    public class TermsAndConditionsController : BaseController
    {
        public TermsAndConditionsController(IConfiguration config, IUtilities utilities, IUserDbContext userDb)
            : base(config, utilities, userDb)
        { 
        
        }

        public ActionResult Index()
        {
            var model = new TearmsAndConditions(base.BasketCount);

            return View(model);
        }

        public ActionResult StockReturn()
        {
            var model = new StockReturn(base.BasketCount);
            return View(model);
        }

        public ActionResult OrderProcess()
        {
            var model = new OrderProcessModel(base.BasketCount);
            return View(model);
        }

        public ActionResult Delivery()
        {
            var model = new Delivery(base.BasketCount);

            return View(model);
        }

        public ActionResult PaymentProcess()
        {
            var model = new PaymentProcess(base.BasketCount);
            return View(model);
        }

        public ActionResult PersonalDetails()
        {
            var model = new PersonalDetails(base.BasketCount);
            return View(model);
        }

        public ActionResult CompanyInfo()
        {
            var model = new CompanyInfo(base.BasketCount);
            return View(model);
        }
    }
}
