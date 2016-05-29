using HorecaBL.Administration;
using HorecaBL.DB.Administration;
using HorecaMebel.Areas.Administration.Models.ViewModels;
using HorecaMebel.Areas.Administration.Models.ViewModels.Orders;
using HorecaMebel.Models.Administration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HorecaMebel.Areas.Administration.Controllers
{
    public class OrderController : AdminBaseController
    {
        private IOrderInterface orderDb;
        public OrderController(IConfiguration config, IUtilities utilities, IUserDbContext userDb, IOrderInterface orderDb)
            : base(config, utilities, userDb)
        {
            this.orderDb = orderDb;
        }

        public ActionResult Index()
        {
            var viewModel = new OrdersTableViewModel(this.orderDb, true); 
            return View(viewModel);
        }

        public ActionResult AllInActiveOrders()
        {
            var viewModel = new OrdersTableViewModel(this.orderDb, false);
            return View(viewModel);
        }

        public ActionResult Edit(int id)
        {
            var model = new OrderViewModel(this.orderDb, id);
                
            return View(model);
        }

        public ActionResult Deactivate(int id)
        {
            this.orderDb.DeactiveOrder(id);

            return RedirectToAction("AllInActiveOrders");
        }

        public ActionResult Activate(int id)
        {
            this.orderDb.ActivateOrder(id);

            return RedirectToAction("Index");
        }
    }
}
