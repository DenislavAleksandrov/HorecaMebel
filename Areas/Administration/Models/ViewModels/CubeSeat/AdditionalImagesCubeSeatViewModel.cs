using HorecaBL.DB.Administration;
using HorecaMebel.Models.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Areas.Administration.Models.ViewModels.CubeSeat
{
    public class AdditionalImagesCubeSeatViewModel : BaseModel
    {
        public List<CubeSeatAdditionalPhoto> CubeSeatAdditionalPhoto { get; set; }

        public int CubeSeatId { get; set; }
        public AdditionalImagesCubeSeatViewModel(ICubeSeatDbContext db, int id)
            : base(ControllersEnum.CubeSeat)
        {
            this.CubeSeatAdditionalPhoto = db.LoadAllAdditionalImagesCubeSeat(id);

            this.CubeSeatId = id;
        }
    }
}