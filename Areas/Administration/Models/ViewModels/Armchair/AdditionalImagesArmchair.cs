using HorecaBL.DB.Administration;
using HorecaMebel.Models.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Areas.Administration.Models.ViewModels.Armchair
{
    public class AdditionalImagesArmchairViewModel : BaseModel
    {
        public List<ArmchairsAdditionalPhoto> ArmchairsAdditionImages { get; set; }

        public int ArmchairId {get;set;}

        public AdditionalImagesArmchairViewModel(ControllersEnum controller, IArmchairDbContext armchairDb, int armchairId)
            : base(controller)
        {
            this.ArmchairId = armchairId;

            this.ArmchairsAdditionImages = armchairDb.LoadAllAdditionalImages(armchairId);
        }

    }
}