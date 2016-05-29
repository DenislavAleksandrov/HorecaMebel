using HorecaBL.DB.Administration;
using HorecaMebel.Models.EF;
using HorecaMebel.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Models.Chairs
{
    public class EditChairViewModel : BaseModel
    {
        public Chair Chair { get; set; }
        public int MinAmoutToOrderChair { get; set; }

        public List<string> AdditionalChairImages { get; set; }

        public EditChairViewModel(IChairDbContext chairDbContext, int id, int basketElementCount, int minAmoutToOrderChair)
            : base(ControllersEnum.Chairs, basketElementCount)
        {
            this.Chair = chairDbContext.Edit(id);

            this.MinAmoutToOrderChair = minAmoutToOrderChair;

            this.AdditionalChairImages = chairDbContext.AllAdditionalImagesByChairId(id);
        }
    }
}