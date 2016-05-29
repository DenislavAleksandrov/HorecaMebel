using HorecaBL.Administration;
using HorecaBL.DB.Administration;
using HorecaMebel.Areas.Administration.Attr;
using HorecaMebel.Areas.Administration.Models;
using HorecaMebel.Areas.Administration.Models.ViewModels.Chair;
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
    public class ChairsController : AdminBaseController
    {
        private IConfiguration config;
        private IUtilities utilities;
        private IUserDbContext userDb;
        private IChairDbContext chairDb;

        public ChairsController(IConfiguration config, IUtilities utilities, IUserDbContext userDb, IChairDbContext chairDb) : base(config, utilities, userDb)
        {
            this.config = config;
            this.utilities = utilities;
            this.userDb = userDb;
            this.chairDb = chairDb;
        }

        [HorecaAuthorisation]
        public ActionResult New()
        {
            var model = new NewChairViewModel(ControllersEnum.Chairs);
            return View(model);
        }

        [HorecaAuthorisation]
        public ActionResult Index()
        {
            var model = new ChairsViewModel(this.chairDb, ControllersEnum.Chairs);
            return View(model);
        }

        [HorecaAuthorisation]
        public JsonResult AddChair(Chair chairToSave)
        {
            try
            {
                if (chairToSave == null) throw new Exception();
                this.chairDb.SaveChair(chairToSave);
                return Json(new { Status = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HorecaAuthorisation]
        public ActionResult Edit(int id)
        {
            var model = new EditChairViewModel(ControllersEnum.Chairs, id, chairDb);
            return View(model);
        }

        [HorecaAuthorisation]
        public ActionResult Delete(int id)
        {
            this.chairDb.DeleteChair(id);
            return RedirectToAction("Index", "Chairs", new { area = "Administration" });
        }

        [HorecaAuthorisation]
        public JsonResult UploadFile(HttpPostedFileBase file)
        {
            try
            {
                string path = "";
                string fileName = "";
                if (file.ContentLength > 0)
                {
                    fileName = Path.GetFileName(file.FileName);
                    path = Path.Combine(Server.MapPath("~/images/Chairs"), fileName);

                    file.SaveAs(path);
                }

                return Json(new { Status = true, ImagePath = this.config.ChairsImageDomain + "//" + fileName }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HorecaAuthorisation]
        [HttpPost]
        public JsonResult EditChair(Chair chair)
        {
            try
            {
                if (chair == null) throw new Exception();
                this.chairDb.Update(chair);

                return Json(new { Status = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HorecaAuthorisation]
        public ActionResult AddAditionalImagePage(int id)
        {
            var model = new AdditionalImagesChairViewModel(id, this.chairDb);
            return View(model);
        }

        [HorecaAuthorisation]
        public JsonResult DeleteAdditionalImage(int id, int chairId)
        {
            try
            {
                this.chairDb.DeleteAdditionalImageFromChair(id);

                return Json(new { Status = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false }, JsonRequestBehavior.AllowGet);
            }
        }

        [HorecaAuthorisation]
        public JsonResult AddAdditionalImage(HttpPostedFileBase file, int chairid)
        {
            try
            {
                string path = "";
                string fileName = "";
                if (file.ContentLength > 0)
                {
                    fileName = Path.GetFileName(file.FileName);
                    path = Path.Combine(Server.MapPath("~/images/ChairsAdditionalImages"), fileName);

                    file.SaveAs(path);
                }

                string urlPath = this.config.ChairsAdditionalImages + "\\" + fileName;

                this.chairDb.AddChairAdditionImage(chairid, urlPath);

                return Json(new { Status = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
