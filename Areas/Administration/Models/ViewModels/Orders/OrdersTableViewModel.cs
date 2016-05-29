using HorecaBL.DB.Administration;
using HorecaMebel.Models.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Areas.Administration.Models.ViewModels
{
    public class OrdersTableViewModel : BaseModel
    {
        public List<Order> Orders { get; set; }
        public OrdersTableViewModel(IOrderInterface orderDb, bool active)
            : base(active ? ControllersEnum.OrdersActive : ControllersEnum.OrdersInActive)
        {
            if (active)
            {
                this.Orders = orderDb.GetAllActiveOrders();
            }
            else
            {
                this.Orders = orderDb.GetAllInActiveOrders();
            }
        }
    }
}