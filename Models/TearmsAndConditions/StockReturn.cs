using HorecaMebel.Areas.Administration.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Models.TearmsAndConditions
{
    public class StockReturn : BaseModel
    {
        public StockReturn(int basketCount)
            : base(Enum.ControllersEnum.Home, basketCount)
        { 
        
        }
    }
}