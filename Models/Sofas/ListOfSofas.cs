using HorecaBL.DB.Administration;
using HorecaMebel.Models.EF;
using HorecaMebel.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Models.Sofas
{
    public class ListOfSofas : BaseModel
    {
        public List<Sofa> Sofas { get; set; }
        public ListOfSofas(ISofaDbContext sofasDb, int basketCount)
            : base(ControllersEnum.Sofas, basketCount)
        {
            List<Sofa> SofasNotOrder = sofasDb.AllSofas();

            if (SofasNotOrder != null)
            {
                this.Sofas = SofasNotOrder.OrderBy(x => x.NewPrice != null ? x.NewPrice : x.Price).ToList();
            }
            else
            {
                this.Sofas = new List<Sofa>();
            }
        }
    }
}