using HorecaBL.DB.Administration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Areas.Administration.Models.ViewModels.Sofa
{
    public class SofasViewModel : BaseModel
    {
        public List<HorecaMebel.Models.EF.Sofa> AllSofas { get; set; }
        public SofasViewModel(ControllersEnum controllerEnum, ISofaDbContext sofaDb)
            : base(controllerEnum)
        {
            this.AllSofas = sofaDb.AllSofas();
        }
    }
}