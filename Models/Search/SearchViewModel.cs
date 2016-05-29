using HorecaBL.DB.Administration;
using HorecaMebel.Models.EF;
using HorecaMebel.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Models.Search
{
    public class SearchViewModel : BaseModel
    {
        public List<Armchair> Armchairs { get; set; }

        public List<CubeSeat> CubeSeat { get; set; }

        public List<Sofa> Sofas { get; set; }

        public List<Chair> Chairs { get; set; }

        public SearchViewModel(IArmchairDbContext armchairDb, IChairDbContext chairDb, ICubeSeatDbContext cubeSeatDb, ISofaDbContext sofaDb, string searchPattern, int basketCount, PriceSortBy? orderBy)
            : base(ControllersEnum.Search, basketCount)
        {
            if (!orderBy.HasValue)
            {
                this.Armchairs = armchairDb.AllArmchairs().Where(x => x.Name.ToUpper().Contains(searchPattern.ToUpper())).ToList();

                this.CubeSeat = cubeSeatDb.AllCubeSeat().Where(x => x.Name.ToUpper().Contains(searchPattern.ToUpper())).ToList();

                this.Sofas = sofaDb.AllSofas().Where(x => x.Name.ToUpper().Contains(searchPattern.ToUpper())).ToList();

                this.Chairs = chairDb.AllChairs().Where(x => x.Name.ToUpper().Contains(searchPattern.ToUpper())).ToList();
            }
            else
            {
                if (orderBy.Value == PriceSortBy.ASC)
                {
                    this.Armchairs = armchairDb.AllArmchairs().Where(x => x.Name.ToUpper().Contains(searchPattern.ToUpper())).OrderBy(x => x.NewPrice != null ? x.NewPrice : x.Price).ToList();

                    this.CubeSeat = cubeSeatDb.AllCubeSeat().Where(x => x.Name.ToUpper().Contains(searchPattern.ToUpper())).OrderBy(x => x.NewPrice != null ? x.NewPrice : x.Price).ToList();

                    this.Sofas = sofaDb.AllSofas().Where(x => x.Name.ToUpper().Contains(searchPattern.ToUpper())).OrderBy(x => x.NewPrice != null ? x.NewPrice : x.Price).ToList();

                    this.Chairs = chairDb.AllChairs().Where(x => x.Name.ToUpper().Contains(searchPattern.ToUpper())).OrderBy(x => x.NewPrice != null ? x.NewPrice : x.Price).ToList();
                }
                else if (orderBy.Value == PriceSortBy.DESC)
                {
                    this.Armchairs = armchairDb.AllArmchairs().Where(x => x.Name.ToUpper().Contains(searchPattern.ToUpper())).OrderByDescending(x => x.NewPrice != null ? x.NewPrice : x.Price).ToList();

                    this.CubeSeat = cubeSeatDb.AllCubeSeat().Where(x => x.Name.ToUpper().Contains(searchPattern.ToUpper())).OrderByDescending(x => x.NewPrice != null ? x.NewPrice : x.Price).ToList();

                    this.Sofas = sofaDb.AllSofas().Where(x => x.Name.ToUpper().Contains(searchPattern.ToUpper())).OrderByDescending(x => x.NewPrice != null ? x.NewPrice : x.Price).ToList();

                    this.Chairs = chairDb.AllChairs().Where(x => x.Name.ToUpper().Contains(searchPattern.ToUpper())).OrderByDescending(x => x.NewPrice != null ? x.NewPrice : x.Price).ToList();
                }
            }
        }
    }
}