using HorecaBL.DB.Administration;
using HorecaMebel.Models.EF;
using HorecaMebel.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Models.CubeSeats
{
    public class EditCubeSeatViewModel : BaseModel
    {
        public CubeSeat CubeSeat { get; set; }

        public int MinAmountToOrderCubeSeat { get; set; }

        public List<string> CubeSeatImages { get; set; }

        public EditCubeSeatViewModel(ICubeSeatDbContext cubeSeatDb, int id, int basketCounts, int minAmountToOrderCubeSeat)
            : base(ControllersEnum.CubeSeats, basketCounts)
        {
            this.CubeSeat = cubeSeatDb.LoadCubeSeatById(id);

            this.MinAmountToOrderCubeSeat = minAmountToOrderCubeSeat;

            this.CubeSeatImages = cubeSeatDb.AllAdditionalImagesByCubeSeatId(id);
        }
    }
}