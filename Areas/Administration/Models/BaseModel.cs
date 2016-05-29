using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Areas.Administration.Models
{
    public class BaseModel
    {
        public List<MenuItem> Menu { get; set; }
        public BaseModel(ControllersEnum controller)
        {
            this.Menu = this.CreateMenu(controller);

        }

        public List<MenuItem> CreateMenu(ControllersEnum active)
        {
            try
            {
                List<MenuItem> result = new List<MenuItem>();

                MenuItem home = new MenuItem("Promotions", "/Administration/Promotions/Index", active == ControllersEnum.Home ? true : false);
                MenuItem chairs = new MenuItem("Chairs", "/Administration/Chairs/Index", active == ControllersEnum.Chairs ? true : false);
                MenuItem armchairs = new MenuItem("Armchairs", "/Administration/Armchairs/Index", active == ControllersEnum.Armchairs ? true : false);
                MenuItem sofas = new MenuItem("Sofas", "/Administration/Sofas/Index", active == ControllersEnum.Sofas ? true : false);
                MenuItem cubeSeat = new MenuItem("Cube Seat", "/Administration/CubeSeat/Index", active == ControllersEnum.CubeSeat ? true : false);  
                MenuItem activeOrders = new MenuItem("Active Orders", "/Administration/Order/Index", active == ControllersEnum.OrdersActive ? true : false);
                MenuItem inActiveOrder = new MenuItem("InActive Orders", "/Administration/Order/AllInActiveOrders", active == ControllersEnum.OrdersInActive ? true : false);

                MenuItem references = new MenuItem("Refrences", "/Administration/References/Index", active == ControllersEnum.References ? true : false);

                result.Add(home);
                result.Add(chairs);
                result.Add(armchairs);
                result.Add(sofas);
                result.Add(cubeSeat);
                result.Add(activeOrders);
                result.Add(inActiveOrder);
                result.Add(references);

                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}