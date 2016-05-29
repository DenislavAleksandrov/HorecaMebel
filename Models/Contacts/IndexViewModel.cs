using HorecaMebel.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Models.Contacts
{
    public class IndexViewModel : BaseModel
    {
        public IndexViewModel(int basketCount)
            : base(ControllersEnum.Contacts, basketCount)
        { 
        
        }
    }
}