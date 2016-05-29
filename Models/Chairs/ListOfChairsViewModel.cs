using HorecaBL.DB.Administration;
using HorecaMebel.Models.EF;
using HorecaMebel.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Models.Chairs
{
    public class ListOfChairsViewModel : BaseModel
    {
        public List<Chair> Chairs { get; set; }

        public ListOfChairsViewModel(IChairDbContext chairDb, int basketCount)
            : base(ControllersEnum.Chairs, basketCount)
        {
            List<Chair> chairsNotOrder = chairDb.AllChairs();

            this.Chairs = chairsNotOrder.OrderBy(x => x.NewPrice != null ? x.NewPrice : x.Price).ToList();
                                   
        }
    }
}