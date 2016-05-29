using HorecaMebel.Models.Administration;
using HorecaMebel.Models.EF;
using HorecaMebel.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Models.Basket
{
    public class Basket : BaseModel
    {
        public double DDS
        {
            get
            {
                return this.config.DDSInGermany;
            }
        }

        public List<ArmchairInBasket> ArmchairsInBasket { get; set; }

        public List<ChairInBasket> ChairsInBasket { get; set; }

        public List<CubeSeatInBasket> CubeSeatsInBasket { get; set; }

        public List<SofaInBasket> SofasInBasket { get; set; }

        public int BasketCount
        {
            get
            {
                return this.ArmchairsInBasket.Count() + this.ChairsInBasket.Count() + this.CubeSeatsInBasket.Count() + this.SofasInBasket.Count();
            }
        }

        public double BasketPriceOnlyFirnutures
        {
            get
            {
                double price = 0;

                if (this.ArmchairsInBasket != null && this.ArmchairsInBasket.Count() > 0)
                {
                    foreach (ArmchairInBasket armchair in ArmchairsInBasket)
                    {
                        double singlePrice = armchair.Armchair.NewPrice.HasValue ? armchair.Armchair.NewPrice.Value : armchair.Armchair.Price;
                        price += singlePrice * armchair.Count;
                    }
                }

                if (this.ChairsInBasket != null && this.ChairsInBasket.Count() > 0)
                {
                    foreach (ChairInBasket chair in ChairsInBasket)
                    {
                        double singlePrice = chair.Chair.NewPrice.HasValue ? chair.Chair.NewPrice.Value : chair.Chair.Price;
                        price += singlePrice * chair.Count;
                    }
                }

                if (this.CubeSeatsInBasket != null && this.CubeSeatsInBasket.Count() > 0)
                {
                    foreach (CubeSeatInBasket cubeSeat in CubeSeatsInBasket)
                    {
                        double singlePrice = cubeSeat.CubeSeat.NewPrice.HasValue ? cubeSeat.CubeSeat.NewPrice.Value : cubeSeat.CubeSeat.Price.Value;
                        price += singlePrice * cubeSeat.Count;
                    }
                }

                if (this.SofasInBasket != null && this.SofasInBasket.Count() > 0)
                {
                    foreach (SofaInBasket sofa in SofasInBasket)
                    {
                        double singlePrice = sofa.Sofa.NewPrice.HasValue ? sofa.Sofa.NewPrice.Value : sofa.Sofa.Price.Value;
                        price += singlePrice * sofa.Count;
                    }
                }
                return Math.Round(price,2);
            }
        }

        public double BasketPriceOnlyTransport
        {
            get
            {
                double result = 0;

                if (this.ArmchairsInBasket != null && this.ArmchairsInBasket.Sum(x => x.Count) > 0)
                {
                    result += this.minValueArmchairsTransport;

                    if (this.ArmchairsInBasket.Sum(x => x.Count) > this.minAmountForArmchairsToOrder)
                    {
                        int differenceArmchairs = this.ArmchairsInBasket.Sum(x => x.Count) - this.minAmountForArmchairsToOrder;

                        result += this.eachArmchairsMore * differenceArmchairs;
                    }                    
                }

                if (this.ChairsInBasket != null && this.ChairsInBasket.Sum(x => x.Count) > 0)
                {
                    result += this.minValueChairTransport;

                    if (this.ChairsInBasket.Sum(x => x.Count) > this.minAmountForChairsToOrder)
                    {
                        int differenceChairs = this.ChairsInBasket.Sum(x => x.Count) - this.minAmountForChairsToOrder;

                        result += this.eachChairMore * differenceChairs;
                    }
                }

                if (this.SofasInBasket != null && this.SofasInBasket.Sum(x => x.Count) > 0)
                {
                    result += this.minValueSofaTransport;

                    if (this.SofasInBasket.Sum(x => x.Count) > this.minAmountForSofasToOrder)
                    {
                        int differenceSofa = this.SofasInBasket.Sum(x => x.Count) - this.minAmountForSofasToOrder;

                        result += this.eachSofaMore * differenceSofa;
                    }
                }

                if (this.CubeSeatsInBasket != null && this.CubeSeatsInBasket.Sum(x => x.Count) > 0)
                {
                    result += this.minValueCubeSeatTransport;

                    if (this.CubeSeatsInBasket.Sum(x => x.Count) > this.minAmountForCubeSeatToOrder)
                    {
                        int differenceCubeSeat = this.CubeSeatsInBasket.Sum(x => x.Count) - this.minAmountForCubeSeatToOrder;

                        result += this.eachCubeSeatMore * differenceCubeSeat;
                    }
                }

                return Math.Round(result,2);
            }
        }

        public double BasketPriceDDS
        {
            get
            {
                double result = 0;

                double priceTransportPlusFirnutures = this.BasketPriceOnlyFirnutures + this.BasketPriceOnlyTransport;

                result = (this.DDS / 100) * priceTransportPlusFirnutures;

                return Math.Round(result,2);
            }
        }

        public double BasketPriceFullPrice
        {
            get
            {
                double result = 0;

                result = this.BasketPriceOnlyTransport + BasketPriceOnlyFirnutures + BasketPriceDDS;

                return Math.Round(result, 2);
            }
        }

        public void UpdateElementCount(Guid element, int newCount)
        {
            if (this.ArmchairsInBasket != null && this.ArmchairsInBasket.Count > 0)
            {
                var target = this.ArmchairsInBasket.Where(x => x.Id == element).FirstOrDefault();

                if (target != null)
                {
                    target.Count = newCount;
                }
            }

            if (this.ChairsInBasket != null && this.ChairsInBasket.Count > 0)
            {
                var target = this.ChairsInBasket.Where(x => x.Id == element).FirstOrDefault();

                if (target != null)
                {
                    target.Count = newCount;
                }
            }

            if (this.CubeSeatsInBasket != null && this.CubeSeatsInBasket.Count > 0)
            {
                var target = this.CubeSeatsInBasket.Where(x => x.Id == element).FirstOrDefault();

                if (target != null)
                {
                    target.Count = newCount;
                }
            }

            if (this.SofasInBasket != null && this.SofasInBasket.Count > 0)
            {
                var target = this.SofasInBasket.Where(x => x.Id == element).FirstOrDefault();

                if (target != null)
                {
                    target.Count = newCount;
                }
            }
        }

        public void DeleteElementFromBasket(Guid element)
        {
            if (this.ArmchairsInBasket != null && this.ArmchairsInBasket.Count > 0)
            {
                var target = this.ArmchairsInBasket.Where(x => x.Id == element).FirstOrDefault();

                if (target != null)
                {
                    this.ArmchairsInBasket.Remove(target);
                }
            }

            if (this.ChairsInBasket != null && this.ChairsInBasket.Count > 0)
            {
                var target = this.ChairsInBasket.Where(x => x.Id == element).FirstOrDefault();

                if (target != null)
                {
                    this.ChairsInBasket.Remove(target);
                }
            }

            if (this.CubeSeatsInBasket != null && this.CubeSeatsInBasket.Count > 0)
            {
                var target = this.CubeSeatsInBasket.Where(x => x.Id == element).FirstOrDefault();

                if (target != null)
                {
                    this.CubeSeatsInBasket.Remove(target);
                }
            }

            if (this.SofasInBasket != null && this.SofasInBasket.Count > 0)
            {
                var target = this.SofasInBasket.Where(x => x.Id == element).FirstOrDefault();

                if (target != null)
                {
                    this.SofasInBasket.Remove(target);
                }
            }
        }

        public double SingleElementPrice(Guid element)
        {
            if (this.ArmchairsInBasket != null && this.ArmchairsInBasket.Count > 0)
            {
                var target = this.ArmchairsInBasket.Where(x => x.Id == element).FirstOrDefault();

                if (target != null)
                {
                    return target.SinglePrice;
                }
            }

            if (this.ChairsInBasket != null && this.ChairsInBasket.Count > 0)
            {
                var target = this.ChairsInBasket.Where(x => x.Id == element).FirstOrDefault();

                if (target != null)
                {
                    return target.SinglePrice;
                }
            }

            if (this.CubeSeatsInBasket != null && this.CubeSeatsInBasket.Count > 0)
            {
                var target = this.CubeSeatsInBasket.Where(x => x.Id == element).FirstOrDefault();

                if (target != null)
                {
                    return target.SinglePrice;
                }
            }

            if (this.SofasInBasket != null && this.SofasInBasket.Count > 0)
            {
                var target = this.SofasInBasket.Where(x => x.Id == element).FirstOrDefault();

                if (target != null)
                {
                    return target.SinglePrice;
                }
            }

            return 0;
        }

        private IConfiguration config;
        public Basket(int basketCount, double DDS, IConfiguration config)
            : base(ControllersEnum.Home, basketCount)
        {
            this.config = config;

            this.ArmchairsInBasket = new List<ArmchairInBasket>();

            this.ChairsInBasket = new List<ChairInBasket>();

            this.CubeSeatsInBasket = new List<CubeSeatInBasket>();

            this.SofasInBasket = new List<SofaInBasket>();

            this.minAmountForChairsToOrder = config.MinAmountForChairsToOrder;
            this.minValueChairTransport = config.MinValueChairTransport;
            this.eachChairMore = config.EachChairMore;

            this.minAmountForSofasToOrder = config.MinAmountForSofasToOrder;
            this.minValueSofaTransport = config.MinValueSofaTransport;
            this.eachSofaMore = config.EachSofaMore;

            this.minAmountForArmchairsToOrder = config.MinAmountForArmchairsToOrder;
            this.minValueArmchairsTransport = config.MinValueArmchairsTransport;
            this.eachArmchairsMore = config.EachArmchairsMore;

            this.minAmountForCubeSeatToOrder = config.MinAmountForCubeSeatToOrder;
            this.minValueCubeSeatTransport = config.MinValueCubeSeatTransport;
            this.eachCubeSeatMore = config.EachCubeSeatMore;
        }

        public int minAmountForChairsToOrder = 0;
        private int minValueChairTransport = 0;
        private int eachChairMore = 0;

        public int minAmountForSofasToOrder = 0;
        private int minValueSofaTransport = 0;
        private int eachSofaMore = 0;

        public int minAmountForArmchairsToOrder = 0;
        private int minValueArmchairsTransport = 0;
        private int eachArmchairsMore = 0;

        public int minAmountForCubeSeatToOrder = 0;
        private int minValueCubeSeatTransport = 0;
        private int eachCubeSeatMore = 0;



        public Basket(Basket basket, int basketCount, double DDS, IConfiguration config)
            : this(basketCount, DDS, config)
        {
            if (basket != null)
            {               
                this.ArmchairsInBasket = basket.ArmchairsInBasket;

                this.ChairsInBasket = basket.ChairsInBasket;

                this.CubeSeatsInBasket = basket.CubeSeatsInBasket;

                this.SofasInBasket = basket.SofasInBasket;
            }
        }
    }

    public class ArmchairInBasket
    {
        public Armchair Armchair { get; set; }

        public string Skin { get; set; }

        public Guid Id { get; set; }

        public int Count { get; set; }

        public double SinglePrice
        {
            get
            {
                double realPrice = this.Armchair.NewPrice.HasValue ? this.Armchair.NewPrice.Value : this.Armchair.Price;
                return this.Count * realPrice;
            }
        }
    }

    public class ChairInBasket
    {
        public Chair Chair { get; set; }

        public string WoodColour { get; set; }

        public Guid Id { get; set; }

        public string Colour { get; set; }

        public int Count { get; set; }

        public double SinglePrice
        {
            get
            {
                double realPrice = this.Chair.NewPrice.HasValue ? this.Chair.NewPrice.Value : this.Chair.Price;
                return this.Count * realPrice;
            }
        }
    }

    public class CubeSeatInBasket
    {
        public CubeSeat CubeSeat { get; set; }

        public string WoodenFrame { get; set; }

        public string Seat { get; set; }

        public string Skin { get; set; }

        public string Legs { get; set; }

        public Guid Id { get; set; }

        public int Count { get; set; }

        public double SinglePrice
        {
            get
            {
                double realPrice = this.CubeSeat.NewPrice.HasValue ? this.CubeSeat.NewPrice.Value : this.CubeSeat.Price.Value;
                return this.Count * realPrice;
            }
        }
    }

    public class SofaInBasket
    {
        public Sofa Sofa { get; set; }

        public string Skin { get; set; }        

        public Guid Id { get; set; }

        public int Count { get; set; }

        public double SinglePrice
        {
            get
            {
                double realPrice = this.Sofa.NewPrice.HasValue ? this.Sofa.NewPrice.Value : this.Sofa.Price.Value;
                return this.Count * realPrice;
            }
        }
    }
}