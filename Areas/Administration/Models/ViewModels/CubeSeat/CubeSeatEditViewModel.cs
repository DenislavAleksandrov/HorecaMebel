using HorecaBL.DB.Administration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Areas.Administration.Models.ViewModels.CubeSeat
{
    public class CubeSeatEditViewModel:BaseModel
    {
        public HorecaMebel.Models.EF.CubeSeat CubeSeat { get; set; }
        public CubeSeatEditViewModel(ICubeSeatDbContext db ,int id) : base(ControllersEnum.CubeSeat)
        {
            this.CubeSeat = db.LoadCubeSeatById(id);
        }
    }
}