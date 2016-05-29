using HorecaBL.Administration;
using HorecaBL.DB.Administration;
using HorecaMebel.Models.Administration;
using HorecaMebel.Models.Contacts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace HorecaMebel.Controllers
{
    public class ContactsController : BaseController
    {
        public ContactsController(IConfiguration config, IUtilities utilities, IUserDbContext userDb)
            : base(config, utilities, userDb)
        {
        
        }

        public ActionResult Index()
        {
            var model = new IndexViewModel(base.BasketCount);
            return View(model);
        }

        [HttpPost]
        public JsonResult SendEmail(string email, string phone, string name, string message)
        {
            try
            {
                string body = message + "\n" + phone + "\n" + name + "\n" + email;
                MailMessage mail = new MailMessage(email, "info@horecamoebel.de", "Anfrage", body);

                SmtpClient smtp = new SmtpClient();

                smtp.Host = "horecamoebel.de";

                smtp.Port = 25;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new System.Net.NetworkCredential
                ("info@horecamoebel.de", "Alqska8904");
                smtp.EnableSsl = false;
                smtp.Send(mail);

                return Json(new { Status = true});
            }
            catch (Exception ex)
            {
                return Json(new { Status = false });
            }            
        }
    }
}
