using HorecaBL.DB.Administration;
using HorecaMebel.Models.EF;
using HorecaMebel.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Models.Armchairs
{
    public class EditArmchair : BaseModel
    {
        public Armchair Armchair { get; set; }
        public int MinAmountForOrderArmchair { get; set; }
        public List<string> ArmchairAdditionImagesPaths { get; set; }

        public EditArmchair(IArmchairDbContext armchairDb, int id, int basketCount, int minAmout)
            : base(ControllersEnum.Armchairs, basketCount)
        {
            this.Armchair = armchairDb.LoadArmchairById(id);
            this.MinAmountForOrderArmchair = minAmout;
            this.ArmchairAdditionImagesPaths = armchairDb.AllAdditionalImagesByArmchairId(id);
        }
    }
}