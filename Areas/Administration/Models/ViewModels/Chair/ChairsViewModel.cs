using HorecaBL.DB.Administration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Areas.Administration.Models.ViewModels.Chair
{
    public class ChairsViewModel : BaseModel
    {
        public List<HorecaMebel.Models.EF.Chair> Chairs { get; set; }
        public ChairsViewModel(IChairDbContext chairDb, ControllersEnum controllerEnum)
            : base(controllerEnum)
        {
            this.Chairs = chairDb.AllChairs();
        }
    }
}