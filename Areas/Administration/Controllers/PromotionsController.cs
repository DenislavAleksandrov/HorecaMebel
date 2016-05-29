using HorecaBL.Administration;
using HorecaBL.DB.Administration;
using HorecaMebel.Areas.Administration.Attr;
using HorecaMebel.Areas.Administration.Models;
using HorecaMebel.Areas.Administration.Models.ViewModels;
using HorecaMebel.Models.Administration;
using HorecaMebel.Models.EF;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HorecaMebel.Areas.Administration.Controllers
{
    public class PromotionsController : AdminBaseController
    {
        private IConfiguration config;
        private IUtilities utilities;
        private IUserDbContext userDb;
        private IPromotionsDbContext promotionsDb;

        public PromotionsController(IConfiguration config, IUtilities utilities, IUserDbContext userDb, IPromotionsDbContext promotions)
            : base(config, utilities, userDb)
        {
            this.config = config;
            this.utilities = utilities;
            this.userDb = userDb;
            this.promotionsDb = promotions;
        }

        [HorecaAuthorisation]
        public ActionResult Index()
        {
            var model = new PromotionsViewModel(ControllersEnum.Home, promotionsDb);
            return View(model);
        }

        [HorecaAuthorisation]
        public ActionResult New()
        {
            var model = new NewPromotionViewModel(ControllersEnum.Home);
            return View(model);
        }

        [HorecaAuthorisation]
        public ActionResult Edit(int id)
        {
            var model = new EditPromotionViewModel(ControllersEnum.Home, id, this.promotionsDb);
            return View(model);
        }
               
        [HorecaAuthorisation]
        [HttpPost]
        public JsonResult EditPromotion(Promotion promotion)
        {
            try
            {                 
                 if (promotion == null) throw new Exception();
                 this.promotionsDb.Update(promotion);

                 return Json(new { Status = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                 return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HorecaAuthorisation]
        [HttpPost]
        public JsonResult AddPromotion(Promotion promotion)
        {
            try
            {
                if (promotion == null) throw new Exception();
                this.promotionsDb.Save(promotion);
                return Json(new { Status = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HorecaAuthorisation]
        [HttpPost]
        public JsonResult UploadFile(HttpPostedFileBase file)
        {
            try
            {
                string path = "";
                string fileName = "";
                if (file.ContentLength > 0)
                {
                    fileName = Path.GetFileName(file.FileName);
                    path = Path.Combine(Server.MapPath("~/images/Promotions"), fileName);

                    file.SaveAs(path);
                }

                return Json(new { Status = true, ImagePath = this.config.PromotionImageDomain + "\\" + fileName }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HorecaAuthorisation]
        public ActionResult Delete(int id)
        {
            this.promotionsDb.Delete(id);
            return RedirectToAction("Index", "Promotions", new { area = "Administration" });
        }
    }
}
