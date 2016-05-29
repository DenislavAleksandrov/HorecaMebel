using HorecaBL.DB.Administration;
using HorecaMebel.Models.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Areas.Administration.Models.ViewModels.Sofa
{   
    public class AdditionalImagesSofaViewModel : BaseModel
    {
        public List<SofaAdditionalPhoto> ChairsImages { get; set; }
        public int SofaId { get; set; }

        public AdditionalImagesSofaViewModel(ISofaDbContext sofaDb, int Id)
            : base(ControllersEnum.Sofas)
        {
            this.ChairsImages = sofaDb.LoadAllAdditionalImagesSofa(Id);
            this.SofaId = Id;
        }
    }
}