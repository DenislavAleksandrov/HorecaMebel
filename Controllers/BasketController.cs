using HorecaBL.Administration;
using HorecaBL.DB.Administration;
using HorecaMebel.Models.Administration;
using HorecaMebel.Models.Basket;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace HorecaMebel.Controllers
{
    public class BasketController : BaseController
    {
        private IConfiguration config { get; set; }

        private IUtilities utilities { get; set; }

        private IOrderInterface orderInterface { get; set; }

        public BasketController(IConfiguration config, IUtilities utilities, IUserDbContext userDb, IOrderInterface orderInterface)
            : base(config, utilities, userDb)
        {
            this.config = config;

            this.utilities = utilities;

            this.orderInterface = orderInterface;
        }

        public ActionResult Index()
        {
            var viewModel = new Basket(base.Basket, base.BasketCount, this.config.DDSInGermany, this.config);
            return View(viewModel);
        }

        [HttpPost]
        public JsonResult ChangeElementCount(Guid elementId, int newCount)
        {
            try
            {
                this.Basket.UpdateElementCount(elementId, newCount);

                double singlePrice = this.Basket.SingleElementPrice(elementId);

                double furniturePrice = this.Basket.BasketPriceOnlyFirnutures;
                double transportPrice = this.Basket.BasketPriceOnlyTransport;
                double dds = this.Basket.BasketPriceDDS;
                double fullPrice = this.Basket.BasketPriceFullPrice;

                return Json(new { Status = true, 
                                  SingleElementPrice = singlePrice,
                                  FurniturePrice = furniturePrice,
                                  TransportPrice = transportPrice,
                                  DDSPrice = dds,
                                  FullPrice = fullPrice
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(new { Status = false }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult DeleteElement(Guid elementId)
        {
            try
            {
                this.Basket.DeleteElementFromBasket(elementId);

                double furniturePrice = this.Basket.BasketPriceOnlyFirnutures;
                double transportPrice = this.Basket.BasketPriceOnlyTransport;
                double dds = this.Basket.BasketPriceDDS;
                double fullPrice = this.Basket.BasketPriceFullPrice;

                return Json(new { Status = true,                                  
                                  FurniturePrice = furniturePrice,
                                  TransportPrice = transportPrice,
                                  DDSPrice = dds,
                                  FullPrice = fullPrice
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(new { Status = false }, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public JsonResult Order(string title, string firstName, string lastName, 
                                string address, string city, string postCode, string country, string company, 
                                string vat, string phone,string email, string freeText)
        {
            try
            {
                Guid? orderId = this.orderInterface.SaveOrderDetails(title, firstName, lastName, address, city, postCode,
                                                                     country, company, vat, phone, email, freeText, 
                                                                     this.Basket.BasketPriceOnlyFirnutures,
                                                                     this.Basket.BasketPriceOnlyTransport,
                                                                     this.Basket.BasketPriceDDS,
                                                                     this.Basket.BasketPriceFullPrice);

                if (orderId != null)
                {
                    bool result = this.orderInterface.SaveFurnituresFrombasket(orderId.Value, this.Basket);

                    string body = this.utilities.FormBodyEmailPart(title, firstName, lastName, address, city, postCode, country, company, vat, phone, email, this.Basket, freeText);

                    MailMessage mailToCustomer = new MailMessage("info@horecamoebel.de", email, "Vielen Dank für Ihre Bestellung!", body);

                    MailMessage mail = new MailMessage(email, "info@horecamoebel.de", "Vielen Dank für Ihre Bestellung!", body);
                    mail.IsBodyHtml = true;

                    mailToCustomer.IsBodyHtml = true;

                    SmtpClient smtp = new SmtpClient();
                    smtp.Host = "horecamoebel.de";

                    smtp.Port = 25;
                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = new System.Net.NetworkCredential
                    ("info@horecamoebel.de", "Alqska8904");
                    smtp.EnableSsl = false;

                    smtp.Send(mail);
                    smtp.Send(mailToCustomer);

                    Session.Clear();

                    if (result == false) throw new Exception();
                }
                return Json(new { Status = true, OrderId = orderId.Value }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult ConfirmationPage(Guid Id)
        {
            var model = new ConfirmationPageViewModel();
            return View(model);
        }
    }
}
