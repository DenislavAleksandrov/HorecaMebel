using HorecaBL.DB.Administration;
using HorecaMebel.Models.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Areas.Administration.Models.ViewModels
{
    public class EditPromotionViewModel : BaseModel
    {
        public Promotion Promotion { get; set; }
        public EditPromotionViewModel(ControllersEnum activeController, int id, IPromotionsDbContext promotionDb)
            : base(activeController)
        {
            this.Promotion = promotionDb.LoadById(id);
        }
    }
}