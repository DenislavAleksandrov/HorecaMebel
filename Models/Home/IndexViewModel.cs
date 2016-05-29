using HorecaBL.DB.Administration;
using HorecaMebel.Models.EF;
using HorecaMebel.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Models.Home
{
    public class IndexViewModel : BaseModel
    {
        public List<Promotion> Promotions { get; set; }
        public IndexViewModel(int basketCount, IPromotionsDbContext promotionDb)
            : base(ControllersEnum.Home, basketCount)
        {
            this.Promotions = promotionDb.All();
        }       
    }
}