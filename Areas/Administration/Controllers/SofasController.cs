using HorecaBL.Administration;
using HorecaBL.DB.Administration;
using HorecaMebel.Areas.Administration.Attr;
using HorecaMebel.Areas.Administration.Models;
using HorecaMebel.Areas.Administration.Models.ViewModels.Sofa;
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
    public class SofasController : AdminBaseController
    {
        private IConfiguration config;
        private IUtilities utilities;
        private IUserDbContext userDb;
        private ISofaDbContext sofaDb;

        public SofasController(IConfiguration config, IUtilities utilities, IUserDbContext userDb, ISofaDbContext sofaDb)
            : base(config, utilities, userDb)
        {
            this.config = config;
            this.utilities = utilities;
            this.userDb = userDb;
            this.sofaDb = sofaDb;
        }

        [HorecaAuthorisation]
        public ActionResult Index()
        {
            var model = new SofasViewModel(ControllersEnum.Sofas, this.sofaDb);
            return View(model);
        }

        [HorecaAuthorisation]
        public ActionResult New()
        {
            var model = new NewSofaViewModel(ControllersEnum.Sofas);
            return View(model);
        }

        [HorecaAuthorisation]
        public ActionResult UploadFile(HttpPostedFileBase file)
        {
            try
            {
                string path = "";
                string fileName = "";
                if (file.ContentLength > 0)
                {
                    fileName = Path.GetFileName(file.FileName);
                    path = Path.Combine(Server.MapPath("~/images/Sofas"), fileName);

                    file.SaveAs(path);
                }

                return Json(new { Status = true, ImagePath = this.config.ImageSofas + "\\" + fileName }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HorecaAuthorisation]
        public JsonResult AddSofa(Sofa sofa)
        {
            try
            {
                if (sofa == null) throw new Exception();
                this.sofaDb.SaveSofa(sofa);
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
            var model = new EditSofaViewModel(this.sofaDb,id);
            return View(model);
        }

        [HorecaAuthorisation]
        public JsonResult EditSofa(Sofa sofa)
        {
            try
            {
                if (sofa == null) throw new Exception();
                this.sofaDb.UpdateSofa(sofa);

                return Json(new { Status = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HorecaAuthorisation]
        public ActionResult Delete(int id)
        {
            this.sofaDb.DeleteSofa(id);
            return RedirectToAction("Index", "Sofas", new { area = "Administration" });
        }

        [HorecaAuthorisation]
        public ActionResult AddAditionalImagePage(int id)
        {
            var model = new AdditionalImagesSofaViewModel(this.sofaDb, id);
            return View(model);
        }

        [HorecaAuthorisation]
        public JsonResult AddAdditionalImage(HttpPostedFileBase file, int sofaid)
        {
            try
            {
                string path = "";
                string fileName = "";
                if (file.ContentLength > 0)
                {
                    fileName = Path.GetFileName(file.FileName);
                    path = Path.Combine(Server.MapPath("~/images/SofaAdditionalImages"), fileName);

                    file.SaveAs(path);
                }

                string urlPath = this.config.SofaAdditionalImages + "//" + fileName;

                this.sofaDb.AddSofaAdditionImage(sofaid, urlPath);

                return Json(new { Status = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false }, JsonRequestBehavior.AllowGet);
            }
        }

        [HorecaAuthorisation]
        public JsonResult DeleteAdditionalImage(int id, int sofaId)
        {
            try
            {
                this.sofaDb.DeleteAdditionalImageFromSofa(id);

                return Json(new { Status = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
