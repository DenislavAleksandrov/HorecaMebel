using HorecaBL.DB.Administration;
using HorecaMebel.Models.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Areas.Administration.Models.ViewModels.Chair
{
    public class AdditionalImagesChairViewModel : BaseModel
    {
        public List<ChairsAdditionalPhoto> ChairsImages { get; set; }
        public int ChairId { get; set; }

        public AdditionalImagesChairViewModel(int id, IChairDbContext chairDb)
            : base(ControllersEnum.Chairs)
        {
            this.ChairId = id;
            this.ChairsImages = chairDb.LoadAllAdditionalImagesChair(id);
        }
    }
}