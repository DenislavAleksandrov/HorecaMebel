using HorecaBL.DB.Administration;
using HorecaMebel.Models.EF;
using HorecaMebel.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Models.CubeSeats
{
    public class ListOfCubeSeats : BaseModel
    {
        public List<CubeSeat> CubeSeats { get; set; }
        public ListOfCubeSeats(ICubeSeatDbContext cubeSeatDb, int basketCount)
            : base(ControllersEnum.CubeSeats, basketCount)
        {
            List<CubeSeat> cubeSeatNotOrder = cubeSeatDb.AllCubeSeat();

            if (cubeSeatNotOrder != null)
            {
                this.CubeSeats = cubeSeatNotOrder.OrderBy(x => x.NewPrice != null ? x.NewPrice : x.Price).ToList();
            }
            else
            {
                this.CubeSeats = new List<CubeSeat>();
            }
        }
    }
}