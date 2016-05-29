using HorecaBL.DB.Administration;
using HorecaMebel.Models.EF;
using HorecaMebel.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Models.Sofas
{
    public class EditSofaViewModel : BaseModel
    {
        public Sofa Sofa { get; set; }
        public int MinAmountForSofaToOrder { get; set; }

        public List<string> AdditionalImage { get; set; }

        public EditSofaViewModel(ISofaDbContext sofaDb, int id, int basketCount, int minAmountForSofaToOrder)
            : base(ControllersEnum.Sofas, basketCount)
        {
            this.Sofa = sofaDb.LoadSofaById(id);

            this.MinAmountForSofaToOrder = minAmountForSofaToOrder;

            this.AdditionalImage = sofaDb.AllAdditionalImagesBySofaId(id);
        }
    }
}