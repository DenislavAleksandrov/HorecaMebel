using HorecaMebel.Models.Basket;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Models
{
    public class OrderFullDetail
    {
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string PostCode { get; set; }
        public string Country { get; set; }
        public string Company { get; set; }
        public string Vat { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string FreeText { get; set; }

        public Guid OrderId { get; set; }
        public DateTime OrderDate { get; set; }

        public double FurniturePrice { get; set; }
        public double TransportPrice { get; set; }
        public double DDSPrice { get; set; }
        public double FullPrice { get; set; }

        public bool IsActive { get; set; }

        public List<ArmchairInBasket> ArmchairsInBasket  { get; set; }
        public List<ChairInBasket> ChairsInBasket  { get; set; }
        public List<CubeSeatInBasket> CubeSeatInBasket  { get; set; }
        public List<SofaInBasket> SofasInBasket { get; set; }

        public OrderFullDetail(string title, string firstName, string lastName,
                               string address, string city, string postCode, string country, string company,
                               string vat, string phone, string email, string freeText, Guid orderId,
                               double furniturePrice, double transportPrice, double DDSPrice, double fullPrice, 
                               List<ArmchairInBasket> armchairsInBasket, List<ChairInBasket> chairsInBasket,
                               List<CubeSeatInBasket> cubeSeatInBasket, List<SofaInBasket> sofasInBasket, DateTime OrderDate)
        {
            this.Title = title;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Address = address;
            this.City = city;
            this.PostCode = postCode;
            this.Country = country;
            this.Company = company;
            this.Vat = vat;
            this.Phone = phone;
            this.Email = email;
            this.FreeText = freeText;

            this.OrderId = orderId;
            this.FurniturePrice = furniturePrice;
            this.TransportPrice = transportPrice;
            this.DDSPrice = DDSPrice;
            this.FullPrice = fullPrice;

            this.ArmchairsInBasket = armchairsInBasket;
            this.ChairsInBasket = chairsInBasket;
            this.CubeSeatInBasket = cubeSeatInBasket;
            this.SofasInBasket = sofasInBasket;

            this.OrderDate = OrderDate;
        }
    }
}