using HorecaMebel.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Models.About
{
    public class AboutIndexViewModel : BaseModel
    {
        public AboutIndexViewModel(int basketCount)
            : base(ControllersEnum.About, basketCount)
        { 
        
        }
    }
}