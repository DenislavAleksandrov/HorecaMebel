using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Areas.Administration.Models.ViewModels
{
    public class HomeIndexViewModel : BaseModel
    {
        public HomeIndexViewModel(ControllersEnum activeController)
            : base(activeController)
        { }
    }
}