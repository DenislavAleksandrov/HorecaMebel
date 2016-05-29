using HorecaBL.DB.Administration;
using HorecaMebel.Models.EF;
using HorecaMebel.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Models.Armchairs
{
    public class ListOfArmchairs: BaseModel
    {
        public List<Armchair> AllArmchairs { get; set; }
        public ListOfArmchairs(IArmchairDbContext armchairDb, int basketCount)
            : base(ControllersEnum.Armchairs, basketCount)
        {
            List<Armchair> notSortedList = armchairDb.AllArmchairs();
            this.AllArmchairs = notSortedList.OrderBy(x => x.NewPrice != null ? x.NewPrice : x.Price).ToList();
        }
    }
}