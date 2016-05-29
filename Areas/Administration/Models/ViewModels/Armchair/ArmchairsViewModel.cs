using HorecaBL.DB.Administration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Areas.Administration.Models.ViewModels.Armchair
{
    public class ArmchairsViewModel : BaseModel
    {

        public List<HorecaMebel.Models.EF.Armchair> Armchairs { get; set; }
        public ArmchairsViewModel(ControllersEnum controller, IArmchairDbContext armchairDb)
            : base(controller)
        {
            this.Armchairs = armchairDb.AllArmchairs();
        }
    }
}