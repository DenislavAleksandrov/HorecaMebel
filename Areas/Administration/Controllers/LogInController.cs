using HorecaBL.Administration;
using HorecaBL.DB.Administration;
using HorecaMebel.Areas.Administration.Attr;
using HorecaMebel.Areas.Administration.Models;
using HorecaMebel.Controllers;
using HorecaMebel.Models.Administration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HorecaMebel.Areas.Administration.Controllers
{
    public class LogInController : AdminBaseController
    {
        private IUserDbContext userDb;
        private IUtilities utilities;
        private IConfiguration config;
        public LogInController(IUserDbContext userDb, IUtilities utilities, IConfiguration config)
            : base(config, utilities, userDb)
        {
            this.userDb = userDb;
            this.utilities = utilities;
            this.config = config;
        }

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public JsonResult LogIn(UserDetails input)
        {
            if (ModelState.IsValid)
            {               
                IUser user =  this.userDb.LogIn(input.username, this.utilities.HashPassword(input.password));

                HttpCookie userCookie = null;
                if (user != null)
                {
                    userCookie = new HttpCookie(this.config.BackendAccountCookie, this.utilities.ConvertToBase64(user.Id));
                    if (user.IsActive)
                    {
                        userCookie.Expires = DateTime.Now.AddMinutes(this.config.CookieExpirationMinutes);
                    }
                    else
                    {
                        userCookie.Expires = userCookie.Expires.AddMinutes(-1);
                    }
                }

                if (userCookie != null)
                    System.Web.HttpContext.Current.Response.Cookies.Add(userCookie);

                return Json(new { IsRealUser = user != null ? user.IsActive : false }, JsonRequestBehavior.AllowGet);
            }

            return Json(String.Empty);
        }

        [HorecaAuthorisation()]
        public ActionResult LogOut()
        {
            if (this.IsLoggedIn)
            {
                HttpCookie user = new HttpCookie(this.config.BackendAccountCookie);
                user.Expires = DateTime.Now.AddDays(-1d);
                Response.Cookies.Add(user);

                return RedirectToAction("Index", "LogIn", new { area = "Administration" });
            }

            return View("Error");
        }
    }
}
