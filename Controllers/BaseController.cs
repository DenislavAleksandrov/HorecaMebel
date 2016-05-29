using HorecaBL.Administration;
using HorecaBL.DB.Administration;
using HorecaMebel.Models.Administration;
using HorecaMebel.Models.Basket;
using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace HorecaMebel.Controllers
{
    public class BaseController : Controller
    {

        public Basket Basket
        {
            get
            {
                return this.Session[config.BasketIdNameCookie] as Basket;
            }
        }

        public int BasketCount
        {
            get
            {
                if (Basket != null)
                {
                    return this.Basket.BasketCount;
                }
                else
                {
                    return 0;
                }
            }
        }

        private IConfiguration config;
        public BaseController(IConfiguration config, IUtilities utilities, IUserDbContext userDb)
        {
            this.config = config;
        }
    }
}