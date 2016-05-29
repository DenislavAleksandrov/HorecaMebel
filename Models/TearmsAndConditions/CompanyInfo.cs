using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Models.TearmsAndConditions
{
    public class CompanyInfo : BaseModel
    {
        public CompanyInfo(int basketCount)
            : base(Enum.ControllersEnum.Home,basketCount)
        { 
        
        }
    }
}