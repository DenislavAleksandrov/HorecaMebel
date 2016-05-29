using HorecaBL.DB.Administration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Areas.Administration.Models.ViewModels.Armchair
{
    public class EditArmchairViewModel : BaseModel
    {
        public HorecaMebel.Models.EF.Armchair Armchair { get; set; }

        public EditArmchairViewModel(ControllersEnum controllerEnum, int id, IArmchairDbContext armchairDb)
            : base(controllerEnum)
        {
            this.Armchair = armchairDb.LoadArmchairById(id);
        }
    }
}