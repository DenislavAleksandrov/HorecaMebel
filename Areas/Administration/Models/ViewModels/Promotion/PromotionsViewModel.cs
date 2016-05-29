using HorecaBL.DB.Administration;
using HorecaMebel.Models.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Areas.Administration.Models
{
    public class PromotionsViewModel : BaseModel
    {
        public List<Promotion> Promotions { get; set; }

        public PromotionsViewModel(ControllersEnum activeController, IPromotionsDbContext promotionsDb)
            : base(activeController)
        {
            this.Promotions = new List<Promotion>();

            this.Promotions = promotionsDb.All();
        }
    }
}