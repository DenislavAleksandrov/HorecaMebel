using HorecaBL.Administration;
using HorecaBL.DB.Administration;
using HorecaMebel.Models.Administration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HorecaMebel.Areas.Administration.Controllers
{
    public class AdminBaseController : Controller
    {
        public IUser LoggedUser { get; private set; }

        public bool IsLoggedIn
        {
            get
            {
                return this.LoggedUser != null && this.LoggedUser.IsActive;
            }
        }

        public AdminBaseController(IConfiguration config, IUtilities utilities, IUserDbContext userDb)
        {
            HttpCookie cookie = System.Web.HttpContext.Current.Request.Cookies[config.BackendAccountCookie];

            if (cookie != null)
            {
                string id = utilities.DecodeFromBase64(cookie.Value);

                this.LoggedUser = userDb.LoadUserById(Convert.ToInt32(id));
            }
        }
    }
}
