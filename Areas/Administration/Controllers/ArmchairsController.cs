using HorecaBL.Administration;
using HorecaBL.DB.Administration;
using HorecaMebel.Areas.Administration.Attr;
using HorecaMebel.Areas.Administration.Models;
using HorecaMebel.Areas.Administration.Models.ViewModels.Armchair;
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
    public class ArmchairsController : AdminBaseController
    {
        private IConfiguration config;
        private IUtilities utilities;
        private IUserDbContext userDb;
        private IArmchairDbContext armchairDb;

        public ArmchairsController(IConfiguration config, IUtilities utilities, IUserDbContext userDb, IArmchairDbContext armchairDb)
            : base(config, utilities, userDb)
        {
            this.config = config;
            this.utilities = utilities;
            this.userDb = userDb;
            this.armchairDb = armchairDb;
        }

        [HorecaAuthorisation]
        public ActionResult Index()
        {
            var model = new ArmchairsViewModel(ControllersEnum.Armchairs, this.armchairDb);
            return View(model);
        }

        [HorecaAuthorisation]
        public ActionResult New()
        {
            var model = new NewArmchairViewModel(ControllersEnum.Armchairs);
            return View(model);
        }

        [HorecaAuthorisation]
        public ActionResult Delete(int id)
        {
            this.armchairDb.DeleteArmchair(id);
            return RedirectToAction("Index", "Armchairs", new { area = "Administration" });
        }

        [HorecaAuthorisation]
        public ActionResult Edit(int id)
        {
            var model = new EditArmchairViewModel(ControllersEnum.Armchairs, id,this.armchairDb);
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
                    path = Path.Combine(Server.MapPath("~/images/Armchairs"), fileName);

                    file.SaveAs(path);
                }

                return Json(new { Status = true, ImagePath = this.config.ImageArmchairs + "\\" + fileName }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HorecaAuthorisation]
        public JsonResult AddArmchair(Armchair armchair)
        {
            try
            {
                if (armchair == null) throw new Exception();
                this.armchairDb.SaveArmchair(armchair);
                return Json(new { Status = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HorecaAuthorisation]
        public JsonResult EditArmchair(Armchair armchair)
        {
            try
            {
                if (armchairDb == null) throw new Exception();
                this.armchairDb.UpdateArmchair(armchair);

                return Json(new { Status = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HorecaAuthorisation]
        public ActionResult AddAditionalImage(int id)
        {
            var model = new AdditionalImagesArmchairViewModel(ControllersEnum.Armchairs,armchairDb,id);
            return View(model);
        }

        [HorecaAuthorisation]
        public JsonResult DeleteAdditionalImage(int id, int armchairId)
        {
            try
            {
                this.armchairDb.DeleteAdditionalImageFromArmchair(id);

                return Json(new { Status = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false }, JsonRequestBehavior.AllowGet);                                
            }           
        }
         
        [HorecaAuthorisation]
        public JsonResult AddAdditionalImage(HttpPostedFileBase file, int armchairId)
        {
            try
            {
                string path = "";
                string fileName = "";
                if (file.ContentLength > 0)
                {
                    fileName = Path.GetFileName(file.FileName);
                    path = Path.Combine(Server.MapPath("~/images/ArmchairAdditionalImages"), fileName);

                    file.SaveAs(path);
                }

                string urlPath = this.config.ArmchairsAdditionImagePath + "//" + fileName;

                this.armchairDb.AddArmchairAdditionImage(armchairId, urlPath);

                return Json(new { Status = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
