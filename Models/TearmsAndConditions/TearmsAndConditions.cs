using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Models.TearmsAndConditions
{
    public class TearmsAndConditions : BaseModel
    {
        public TearmsAndConditions(int basketCount)
            : base(Enum.ControllersEnum.Home, basketCount)
        { 
        
        }
    }
}