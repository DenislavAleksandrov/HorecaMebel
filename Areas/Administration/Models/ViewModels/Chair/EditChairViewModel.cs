using HorecaBL.DB.Administration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Areas.Administration.Models.ViewModels.Chair
{
    public class EditChairViewModel : BaseModel
    {
        public HorecaMebel.Models.EF.Chair Chair { get; set; }

        public List<string> AdditionalImages { get; set; }

        public EditChairViewModel(ControllersEnum controller, int id, IChairDbContext chairDb)
            : base(controller)
        {
            this.Chair = chairDb.Edit(id);

            this.AdditionalImages = chairDb.AllAdditionalImagesByChairId(id);
        }
    }
}