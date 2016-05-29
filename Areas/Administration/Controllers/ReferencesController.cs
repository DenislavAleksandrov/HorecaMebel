using HorecaBL.Administration;
using HorecaBL.DB.Administration;
using HorecaMebel.Areas.Administration.Attr;
using HorecaMebel.Areas.Administration.Models.ViewModels;
using HorecaMebel.Areas.Administration.Models.ViewModels.References;
using HorecaMebel.Models.Administration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HorecaMebel.Areas.Administration.Controllers
{
    public class ReferencesController : AdminBaseController
    {
        private IReferencesDbContext references;
        private IConfiguration config;

        public ReferencesController(IConfiguration config, IUtilities utilities, IUserDbContext userDb, IReferencesDbContext references)
            : base(config, utilities, userDb)
        {
            this.config = config;
            this.references = references;
        }
        [HorecaAuthorisation]
        public ActionResult Index()
        {
            var model = new ReferencesViewModel(this.references);
            return View(model);
        }
        [HorecaAuthorisation]
        public ActionResult New()
        {
            var model = new NewReferenceViewModel();
            return View(model);
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
                    path = Path.Combine(Server.MapPath("~/images/References"), fileName);

                    file.SaveAs(path);
                }

                return Json(new { Status = true, ImagePath = this.config.ReferencesImageDomain + "\\" + fileName }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HorecaAuthorisation]
        public JsonResult AddReference(string Imagepath)
        {
            try
            {
                this.references.AddNewReference(Imagepath);
                return Json(new { Status = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(new { Status = false }, JsonRequestBehavior.AllowGet);
            }
        }

        [HorecaAuthorisation]
        public ActionResult Delete(int id)
        {
            this.references.DeleteReference(id);

            return RedirectToAction("Index");
        }
    }
}
