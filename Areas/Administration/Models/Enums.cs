using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Areas.Administration.Models
{
    public enum ControllersEnum
    {
        Home = 1,
        Chairs = 2,
        Armchairs = 4,
        Sofas = 8,
        CubeSeat = 16,
        OrdersActive = 32,
        OrdersInActive = 64,
        References = 128
    }
}