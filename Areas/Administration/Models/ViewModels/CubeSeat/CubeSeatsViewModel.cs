using HorecaBL.DB.Administration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Areas.Administration.Models.ViewModels.CubeSeat
{
    public class CubeSeatsViewModel : BaseModel
    {
        public List<HorecaMebel.Models.EF.CubeSeat> CubeSeat { get; set; }
        public CubeSeatsViewModel(ICubeSeatDbContext db): base(ControllersEnum.CubeSeat)
        {
            this.CubeSeat = db.AllCubeSeat();
        }
    }
}