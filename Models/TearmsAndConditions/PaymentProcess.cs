using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Models.TearmsAndConditions
{
    public class PaymentProcess : BaseModel
    {
        public PaymentProcess(int baseketCount) : base(Enum.ControllersEnum.Home, baseketCount)
        {

        }
    }
}