using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace HorecaMebel.Areas.Administration.Attr
{
    public class HorecaAuthorisation : AuthorizeAttribute
    {
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            if (!((HorecaMebel.Areas.Administration.Controllers.AdminBaseController)(filterContext.Controller)).IsLoggedIn)
                filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new { controller = "LogIn", action = "Index" }));
        }
    }
}