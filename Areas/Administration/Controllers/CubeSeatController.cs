using HorecaBL.Administration;
using HorecaBL.DB.Administration;
using HorecaMebel.Areas.Administration.Attr;
using HorecaMebel.Areas.Administration.Models.ViewModels.CubeSeat;
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
    public class CubeSeatController : AdminBaseController
    {
        private IConfiguration config;
        private IUtilities utilities;
        private IUserDbContext userDb;
        private ICubeSeatDbContext cubeSeatDb;

        public CubeSeatController(IConfiguration config, IUtilities utilities, IUserDbContext userDb, ICubeSeatDbContext cubeSeatDb)
            : base(config, utilities, userDb)
        {
            this.config = config;
            this.utilities = utilities;
            this.userDb = userDb;
            this.cubeSeatDb = cubeSeatDb;
        }

        [HorecaAuthorisation]
        public JsonResult AddCubeSeat(CubeSeat cubeSeatToSave)
        {
            try
            {
                if (cubeSeatToSave == null) throw new Exception();
                this.cubeSeatDb.SaveCubeSeat(cubeSeatToSave);
                return Json(new { Status = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HorecaAuthorisation]
        public ActionResult New()
        {
            var model = new CubeSeatsViewModel(this.cubeSeatDb);
            return View(model);
        }

        [HorecaAuthorisation]
        public ActionResult Index()
        {
            var model = new CubeSeatsViewModel(this.cubeSeatDb);
            return View(model);
        }

        [HorecaAuthorisation]
        public ActionResult Edit(int id)
        {
            var model = new CubeSeatEditViewModel(this.cubeSeatDb, id);
            return View(model);
        }

        [HorecaAuthorisation]
        public ActionResult Delete(int id)
        {
            this.cubeSeatDb.DeleteCubeSeat(id);
            return RedirectToAction("Index", "CubeSeat", new { area = "Administration" });
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
                    path = Path.Combine(Server.MapPath("~/images/CubeSeat"), fileName);

                    file.SaveAs(path);
                }

                return Json(new { Status = true, ImagePath = this.config.CubeSeats + "\\" + fileName }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HorecaAuthorisation]
        [HttpPost]
        public JsonResult EditCubeSeat(CubeSeat cubeSeat)
        {
            try
            {
                if (cubeSeat == null) throw new Exception();
                this.cubeSeatDb.UpdateCubeSeat(cubeSeat);

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
            var model = new AdditionalImagesCubeSeatViewModel(this.cubeSeatDb, id);
            return View(model);
        }

        [HorecaAuthorisation]
        public JsonResult DeleteAdditionalImage(int id, int cubeSeatId)
        {
            try
            {
                this.cubeSeatDb.DeleteAdditionalImageFromCubeSeat(id);

                return Json(new { Status = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false }, JsonRequestBehavior.AllowGet);
            }
        }

        [HorecaAuthorisation]
        public JsonResult AddAdditionalImage(HttpPostedFileBase file, int cubeSeatId)
        {
            try
            {
                string path = "";
                string fileName = "";
                if (file.ContentLength > 0)
                {
                    fileName = Path.GetFileName(file.FileName);
                    path = Path.Combine(Server.MapPath("~/images/CubeSeatAdditionalImages"), fileName);

                    file.SaveAs(path);
                }

                string urlPath = this.config.CubeSeatAdditionalImages + "//" + fileName;

                this.cubeSeatDb.AddCubeSeatAdditionImage(cubeSeatId, urlPath);

                return Json(new { Status = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
