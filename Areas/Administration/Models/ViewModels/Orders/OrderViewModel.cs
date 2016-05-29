using HorecaBL.DB.Administration;
using HorecaMebel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Areas.Administration.Models.ViewModels.Orders
{
    public class OrderViewModel : BaseModel
    {
        public OrderFullDetail Order { get; set; }
        public OrderViewModel(IOrderInterface orderDb, int id)
            : base(ControllersEnum.OrdersActive)
        {
            this.Order = orderDb.OrderFullDetail(id);
        }
    }
}