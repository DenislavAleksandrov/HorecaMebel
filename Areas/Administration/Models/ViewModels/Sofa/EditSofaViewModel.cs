using HorecaBL.DB.Administration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Areas.Administration.Models.ViewModels.Sofa
{
    public class EditSofaViewModel : BaseModel
    {
        public HorecaMebel.Models.EF.Sofa Sofa { get; set; }
        public EditSofaViewModel(ISofaDbContext sofaDb, int id)
            : base(ControllersEnum.Sofas)
        {
            this.Sofa = sofaDb.LoadSofaById(id);
        }
    }
}