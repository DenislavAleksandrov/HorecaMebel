using HorecaBL.Administration;
using HorecaMebel.Models;
using HorecaMebel.Models.Administration;
using HorecaMebel.Models.Basket;
using HorecaMebel.Models.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HorecaBL.DB.Administration
{
    #region INTERFACES
    public interface IReferencesDbContext
    {
        List<Reference> AllReferences();

        bool AddNewReference(string imagePath);

        bool DeleteReference(int id);
    }

    public interface IUserDbContext
    {
        IUser LogIn(string email, string password);

        IUser LoadUserById(int id);
    }

    public interface IPromotionsDbContext
    {
        bool Save(Promotion promotion);

        List<Promotion> All();

        Promotion LoadById(int id);

        bool Update(Promotion promotion);

        bool Delete(int promotionId);        
    }

    public interface IChairDbContext
    {
        List<Chair> AllChairs();
        bool SaveChair(Chair chair);
        bool DeleteChair(int chairId);
        Chair Edit(int id);
        bool Update(Chair chair);

        List<ChairsAdditionalPhoto> LoadAllAdditionalImagesChair(int chairId);

        void AddChairAdditionImage(int chairId, string imagePath);

        void DeleteAdditionalImageFromChair(int id);

        List<string> AllAdditionalImagesByChairId(int chairId);
    }

    public interface IArmchairDbContext
    {
        List<Armchair> AllArmchairs();

        bool DeleteArmchair(int id);

        bool SaveArmchair(Armchair armchair);

        Armchair LoadArmchairById(int id);

        bool UpdateArmchair(Armchair armchair);

        List<ArmchairsAdditionalPhoto> LoadAllAdditionalImages(int id);

        void AddArmchairAdditionImage(int armchairId, string imagePath);

        void DeleteAdditionalImageFromArmchair(int id);

        List<string> AllAdditionalImagesByArmchairId(int armchairId);
    }

    public interface ISofaDbContext
    {
        List<Sofa> AllSofas();

        bool DeleteSofa(int id);

        bool SaveSofa(Sofa armchair);

        Sofa LoadSofaById(int id);

        bool UpdateSofa(Sofa armchair);

        List<SofaAdditionalPhoto> LoadAllAdditionalImagesSofa(int sofaId);

        void AddSofaAdditionImage(int sofaId, string imagePath);

        void DeleteAdditionalImageFromSofa(int id);

        List<string> AllAdditionalImagesBySofaId(int sofaId);
    }

    public interface ICubeSeatDbContext
    {
        List<CubeSeat> AllCubeSeat();

        bool DeleteCubeSeat(int id);

        bool SaveCubeSeat(CubeSeat cubeSeat);

        CubeSeat LoadCubeSeatById(int id);

        bool UpdateCubeSeat(CubeSeat cubeSeat);

        List<CubeSeatAdditionalPhoto> LoadAllAdditionalImagesCubeSeat(int cubeSeatId);

        void AddCubeSeatAdditionImage(int cubeSeatId, string imagePath);

        void DeleteAdditionalImageFromCubeSeat(int id);

        List<string> AllAdditionalImagesByCubeSeatId(int cubeSeatId);
    }

    public interface IOrderInterface
    {
        Guid? SaveOrderDetails(string title, string firstName, string lastName, string address, string city, string postCode, string country, string company,
                               string vat, string phone, string email, string freeText, double furniture, double transport, double dds, double fullPrice);

        bool SaveFurnituresFrombasket(Guid order, Basket basket);

        List<Order> GetAllActiveOrders();

        List<Order> GetAllInActiveOrders();

        OrderFullDetail OrderFullDetail(int id);

        bool DeactiveOrder(int id);

        bool ActivateOrder(int id);
    }
    #endregion INTERFACES

    #region Wrapper
    public class EFWrapper : IUserDbContext, IPromotionsDbContext, IChairDbContext, 
                             IArmchairDbContext, ISofaDbContext, ICubeSeatDbContext,
                             IOrderInterface, IReferencesDbContext
    {
        #region HELPERS
        private IUser MapUserTableToIUser(UserTable dbResult)
        {
            IUser user = new IUser();
            user.Id = dbResult.id;
            user.Name = dbResult.Name;
            user.Password = dbResult.Password;
            user.IsActive = dbResult.IsActive;
            user.Email = dbResult.Email;
            user.DateCreated = dbResult.DateCreated;

            return user;
        }

        public IUser LogIn(string email, string password)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    UserTable dbResult = db.UserTables.Where(x => x.Email == email && x.Password == password && x.IsActive == true).FirstOrDefault();
                    if (dbResult == null) throw new Exception();


                    return MapUserTableToIUser(dbResult);
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public IUser LoadUserById(int id)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    UserTable dbResult = db.UserTables.Where(x => x.id == id && x.IsActive == true).FirstOrDefault();
                    if (dbResult == null) throw new Exception();

                    return MapUserTableToIUser(dbResult); ;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        private IPromotions MapPromotionToIPromotion(Promotion p)
        {
            return null;
        }

        private Promotion MapIPromotionToPromotion(IPromotions p)
        {
            Promotion prObject = new Promotion();
            prObject.Name = p.Name;
            prObject.Price = p.Price;
            prObject.ProductName = p.ProductName;
            prObject.Text2 = p.Text2;
            prObject.ProductURL = p.ProductURL;

            return prObject;
        }
        #endregion HELPERS

        #region IPromotionsDbContext
        public bool Save(Promotion promotion)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    db.Promotions.Add(promotion);
                    db.SaveChanges();
                }

                return true;
            }
            catch (Exception ex)
            {
                return false; ;
            }

        }

        public List<Promotion> All()
        {
            try
            {
                List<Promotion> result = new List<Promotion>();
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    result.AddRange(db.Promotions.ToList());
                }

                return result;

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public Promotion LoadById(int id)
        {
            try
            {
                Promotion result = new Promotion();
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    return db.Promotions.Where(x => x.id == id).FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public bool Update(Promotion promotion)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    var promotionFromDb = db.Promotions.FirstOrDefault(x => x.id == promotion.id);

                    promotionFromDb.Name = promotion.Name;
                    promotionFromDb.ProductImage = promotion.ProductImage;
                    promotionFromDb.ProductName = promotion.ProductName;
                    promotionFromDb.Price = promotion.Price;
                    promotionFromDb.ProductURL = promotion.ProductURL;
                    promotionFromDb.Text2 = promotion.Text2;

                    db.SaveChanges();
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool Delete(int promotionId)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    var promotion = db.Promotions.FirstOrDefault(x => x.id == promotionId);

                    db.Promotions.Remove(promotion);

                    db.SaveChanges();

                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        #endregion IPromotionsDbContext

        #region IChairDbContext
        public List<Chair> AllChairs()
        {
            try
            {
                List<Chair> result = new List<Chair>();

                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    result.AddRange(db.Chairs.ToList());
                }

                return result;
            }
            catch (Exception)
            {
                return new List<Chair>();
            }
        }

        public bool SaveChair(Chair chair)
        {
            try
            {

                if (String.IsNullOrEmpty(chair.Description)) chair.Description = string.Empty;

                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    db.Chairs.Add(chair);

                    db.SaveChanges();
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool DeleteChair(int chairId)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    var chair = db.Chairs.FirstOrDefault(x => x.id == chairId);

                    db.Chairs.Remove(chair);

                    db.SaveChanges();

                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public Chair Edit(int id)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    var chair = db.Chairs.FirstOrDefault(x => x.id == id);

                    return chair;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public bool Update(Chair chair)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    var chairFromDB = db.Chairs.FirstOrDefault(x => x.id == chair.id);

                    chairFromDB.Name = chair.Name;

                    chairFromDB.ImagePath = chair.ImagePath;
                    chairFromDB.Price = chair.Price;

                    chairFromDB.NewPrice = chair.NewPrice;
                    chairFromDB.Description = String.IsNullOrEmpty(chair.Description) ? string.Empty : chair.Description;

                    chairFromDB.WoodenFrame = chair.WoodenFrame;
                    chairFromDB.Seat = chair.Seat;
                    chairFromDB.Back = chair.Back;
                    chairFromDB.WoodColor = chair.WoodColor;

                    chairFromDB.Width = chair.Width;

                    chairFromDB.Height = chair.Height;

                    chairFromDB.Skin = chair.Skin;

                    chairFromDB.Depth = chair.Depth;

                    chairFromDB.ProductionTime = chair.ProductionTime;

                    db.SaveChanges();
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public List<ChairsAdditionalPhoto> LoadAllAdditionalImagesChair(int chairId)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    return db.ChairsAdditionalPhotoes.Where(x => x.ChairId == chairId).ToList();
                }
            }
            catch (Exception ex)
            {
                return new List<ChairsAdditionalPhoto>();
            }
        }

        public void DeleteAdditionalImageFromChair(int id)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    var chairAddImage = db.ChairsAdditionalPhotoes.FirstOrDefault(x => x.id == id);

                    db.ChairsAdditionalPhotoes.Remove(chairAddImage);

                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            { }
        }

        public void AddChairAdditionImage(int chairId, string imagePath)
        {
            var model = new ChairsAdditionalPhoto();

            model.ChairId = chairId;
            model.ImagePath = imagePath;
            using (HorecaMebelEntities db = new HorecaMebelEntities())
            {
                db.ChairsAdditionalPhotoes.Add(model);

                db.SaveChanges();
            }
        }

        public List<string> AllAdditionalImagesByChairId(int chairId)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    return db.ChairsAdditionalPhotoes.Where(x => x.ChairId == chairId).Select(x => x.ImagePath).ToList();
                }
            }
            catch (Exception)
            {
                return new List<string>();
            }

        }
        #endregion IChairDbContext

        #region IArmchairDbContext
        public List<Armchair> AllArmchairs()
        {
            try
            {
                List<Armchair> result = new List<Armchair>();
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    result.AddRange(db.Armchairs.ToList());
                }

                return result;
            }
            catch (Exception ex)
            {
                return new List<Armchair>();
            }
        }

        public bool DeleteArmchair(int id)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    var armchair = db.Armchairs.FirstOrDefault(x => x.id == id);

                    db.Armchairs.Remove(armchair);

                    db.SaveChanges();

                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool SaveArmchair(Armchair chair)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    db.Armchairs.Add(chair);

                    db.SaveChanges();
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public Armchair LoadArmchairById(int id)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    var armchair = db.Armchairs.FirstOrDefault(x => x.id == id);

                    return armchair;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public bool UpdateArmchair(Armchair armchair)
        {
            using (HorecaMebelEntities db = new HorecaMebelEntities())
            {
                var armchairFromDB = db.Armchairs.FirstOrDefault(x => x.id == armchair.id);

                armchairFromDB.Name = armchair.Name;

                armchairFromDB.ImagePath = armchair.ImagePath;
                armchairFromDB.Price = armchair.Price;

                armchairFromDB.NewPrice = armchair.NewPrice;
                armchairFromDB.Descrption = armchair.Descrption;

                armchairFromDB.WoodenFrame = armchair.WoodenFrame;
                armchairFromDB.Seat = armchair.Seat;
                armchairFromDB.Back = armchair.Back;

                armchairFromDB.Width = armchair.Width;

                armchairFromDB.Height = armchair.Height;

                armchairFromDB.Depth = armchair.Depth;

                armchairFromDB.Legs = armchair.Legs;
                armchairFromDB.Skin = armchair.Skin;
                armchairFromDB.ProductionTime = armchair.ProductionTime;

                armchairFromDB.SkinColour = armchair.SkinColour;

                db.SaveChanges();
                return true;
            }
        }

        public List<ArmchairsAdditionalPhoto> LoadAllAdditionalImages(int id)
        {
            try
            {
                List<ArmchairsAdditionalPhoto> result = new List<ArmchairsAdditionalPhoto>();
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    result.AddRange(db.ArmchairsAdditionalPhotoes.Where(x => x.ArmchairId == id).ToList());
                }
                return result;
            }
            catch (Exception)
            {
                return new List<ArmchairsAdditionalPhoto>();
            }
        }

        public void AddArmchairAdditionImage(int armchairId, string imagePath)
        {
            var model = new ArmchairsAdditionalPhoto();

            model.ArmchairId = armchairId;
            model.Imagepath = imagePath;
            using (HorecaMebelEntities db = new HorecaMebelEntities())
            {
                db.ArmchairsAdditionalPhotoes.Add(model);

                db.SaveChanges();
            }
        }

        public void DeleteAdditionalImageFromArmchair(int id)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    var armchairAdditionalImage = db.ArmchairsAdditionalPhotoes.FirstOrDefault(x => x.id == id);

                    db.ArmchairsAdditionalPhotoes.Remove(armchairAdditionalImage);

                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            { }
        }

        public List<string> AllAdditionalImagesByArmchairId(int armchairId)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    return db.ArmchairsAdditionalPhotoes.Where(x => x.ArmchairId == armchairId).Select(x => x.Imagepath).ToList();
                }
            }
            catch (Exception)
            {
                return new List<string>();
            }
        }
        #endregion IArmchairDbContext

        #region ISofaDbContext
        public List<Sofa> AllSofas()
        {
            try
            {
                List<Sofa> result = new List<Sofa>();
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    result.AddRange(db.Sofas.ToList());
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public bool SaveSofa(Sofa sofa)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    db.Sofas.Add(sofa);

                    db.SaveChanges();
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public Sofa LoadSofaById(int id)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    var sofa = db.Sofas.FirstOrDefault(x => x.id == id);

                    return sofa;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public bool UpdateSofa(Sofa sofa)
        {
            using (HorecaMebelEntities db = new HorecaMebelEntities())
            {
                var sofaFromDB = db.Sofas.FirstOrDefault(x => x.id == sofa.id);

                sofaFromDB.Name = sofa.Name;

                sofaFromDB.ImagePath = sofa.ImagePath;
                sofaFromDB.Price = sofa.Price;

                sofaFromDB.NewPrice = sofa.NewPrice;
                sofaFromDB.Description = sofa.Description;

                sofaFromDB.WoodenFrame = sofa.WoodenFrame;
                sofaFromDB.Seat = sofa.Seat;
                sofaFromDB.Back = sofa.Back;

                sofaFromDB.Width = sofa.Width;

                sofaFromDB.Height = sofa.Height;

                sofaFromDB.Depth = sofa.Depth;

                sofaFromDB.Legs = sofa.Legs;
                sofaFromDB.Skin = sofa.Skin;

                sofaFromDB.ProductionTime = sofa.ProductionTime;

                sofaFromDB.SkinColour = sofa.SkinColour;

                db.SaveChanges();
                return true;
            }
        }

        public bool DeleteSofa(int id)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    var sofa = db.Sofas.FirstOrDefault(x => x.id == id);

                    db.Sofas.Remove(sofa);

                    db.SaveChanges();

                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public List<SofaAdditionalPhoto> LoadAllAdditionalImagesSofa(int sofaId)
        {
            try
            {
                List<SofaAdditionalPhoto> result = new List<SofaAdditionalPhoto>();
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    result.AddRange(db.SofaAdditionalPhotoes.Where(x => x.SofaId == sofaId).ToList());
                }
                return result;
            }
            catch (Exception)
            {
                return new List<SofaAdditionalPhoto>();
            }
        }

        public void AddSofaAdditionImage(int sofaId, string imagePath)
        {
            var model = new SofaAdditionalPhoto();

            model.SofaId = sofaId;
            model.ImagePath = imagePath;
            using (HorecaMebelEntities db = new HorecaMebelEntities())
            {
                db.SofaAdditionalPhotoes.Add(model);

                db.SaveChanges();
            }
        }

        public void DeleteAdditionalImageFromSofa(int id)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    var sofaAdditionalImage = db.SofaAdditionalPhotoes.FirstOrDefault(x => x.id == id);

                    db.SofaAdditionalPhotoes.Remove(sofaAdditionalImage);

                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            { }
        }

        public List<string> AllAdditionalImagesBySofaId(int sofaId)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    return db.SofaAdditionalPhotoes.Where(x => x.SofaId == sofaId).Select(x => x.ImagePath).ToList();
                }
            }
            catch (Exception)
            {
                return new List<string>();
            }
        }
        #endregion ISofaDbContext

        #region ICubeSeatDbContext
        public List<CubeSeat> AllCubeSeat()
        {
            try
            {
                List<CubeSeat> result = new List<CubeSeat>();
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    result.AddRange(db.CubeSeats.ToList());
                }

                return result;

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public bool DeleteCubeSeat(int id)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    var cubeSeat = db.CubeSeats.FirstOrDefault(x => x.id == id);

                    db.CubeSeats.Remove(cubeSeat);

                    db.SaveChanges();

                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool SaveCubeSeat(CubeSeat cubeSeat)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    db.CubeSeats.Add(cubeSeat);

                    db.SaveChanges();
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public CubeSeat LoadCubeSeatById(int id)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    var cubeSeat = db.CubeSeats.FirstOrDefault(x => x.id == id);

                    return cubeSeat;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public bool UpdateCubeSeat(CubeSeat cubeSeat)
        {
            using (HorecaMebelEntities db = new HorecaMebelEntities())
            {
                var cubeSeatFromDB = db.CubeSeats.FirstOrDefault(x => x.id == cubeSeat.id);

                cubeSeatFromDB.Name = cubeSeat.Name;

                cubeSeatFromDB.ImagePath = cubeSeat.ImagePath;
                cubeSeatFromDB.Price = cubeSeat.Price;

                cubeSeatFromDB.NewPrice = cubeSeat.NewPrice;
                cubeSeatFromDB.Description = cubeSeat.Description;

                cubeSeatFromDB.WoodenFrame = cubeSeat.WoodenFrame;
                cubeSeatFromDB.Seat = cubeSeat.Seat;

                cubeSeatFromDB.Width = cubeSeat.Width;

                cubeSeatFromDB.Height = cubeSeat.Height;

                cubeSeatFromDB.Depth = cubeSeat.Depth;

                cubeSeatFromDB.Legs = cubeSeat.Legs;
                cubeSeatFromDB.Skin = cubeSeat.Skin;

                cubeSeatFromDB.ProductionTime = cubeSeat.ProductionTime;

                cubeSeatFromDB.SkinColour = cubeSeat.SkinColour;
                db.SaveChanges();
                return true;
            }
        }

        public List<CubeSeatAdditionalPhoto> LoadAllAdditionalImagesCubeSeat(int cubeSeatId)
        {
            try
            {
                List<CubeSeatAdditionalPhoto> result = new List<CubeSeatAdditionalPhoto>();
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    result.AddRange(db.CubeSeatAdditionalPhotoes.Where(x => x.CubeSeatId == cubeSeatId).ToList());
                }
                return result;
            }
            catch (Exception)
            {
                return new List<CubeSeatAdditionalPhoto>();
            }
        }

        public void AddCubeSeatAdditionImage(int cubeSeatId, string imagePath)
        {
            var model = new CubeSeatAdditionalPhoto();

            model.CubeSeatId = cubeSeatId;
            model.ImagePath = imagePath;
            using (HorecaMebelEntities db = new HorecaMebelEntities())
            {
                db.CubeSeatAdditionalPhotoes.Add(model);

                db.SaveChanges();
            }
        }

        public void DeleteAdditionalImageFromCubeSeat(int id)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    var cbAdditionalImage = db.CubeSeatAdditionalPhotoes.FirstOrDefault(x => x.id == id);

                    db.CubeSeatAdditionalPhotoes.Remove(cbAdditionalImage);

                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            { }
        }

        public List<string> AllAdditionalImagesByCubeSeatId(int cubeSeatId)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    return db.CubeSeatAdditionalPhotoes.Where(x => x.CubeSeatId == cubeSeatId).Select(x => x.ImagePath).ToList();
                }
            }
            catch (Exception)
            {
                return new List<string>();
            }

        }
        #endregion ICubeSeatDbContext

        #region IOrderInterface
        public Guid? SaveOrderDetails(string title, string firstName, string lastName, string address, string city, string postCode,
                                      string country, string company, string vat, string phone, string email, string freeText,
                                      double furniture, double transport, double dds, double fullPrice)
        {
            try
            {
                Order order = new Order();

                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    order.order_Guid = Guid.NewGuid().ToString();
                    order.Title = title;
                    order.FirstName = firstName;
                    order.LastName = lastName;
                    order.Address = address;
                    order.PostCode = postCode;
                    order.City = city;
                    order.Country = country;
                    order.Company = company;
                    order.VAT = vat;
                    order.Phone = phone;
                    order.Email = email;
                    order.Comment = freeText;
                    order.IsActive = true;
                    order.OrderDateTime = DateTime.Now;

                    order.FurniturePrice = furniture;
                    order.TransportPrice = transport;
                    order.DDSPrice = dds;
                    order.FullPrice = fullPrice;

                    db.Orders.Add(order);
                    db.SaveChanges();
                }

                return new Guid(order.order_Guid);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public bool SaveFurnituresFrombasket(Guid order, Basket basket)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    string GuidToString = order.ToString();

                    var orderDetails = db.Orders.Where(x => x.order_Guid == GuidToString).FirstOrDefault();

                    if (orderDetails != null && basket != null)
                    {
                        if (basket.ArmchairsInBasket != null && basket.ArmchairsInBasket.Count > 0)
                        {
                            foreach (var armchairsInBasket in basket.ArmchairsInBasket)
                            {
                                ArmchairsInOrder armInOrder = new ArmchairsInOrder();
                                armInOrder.orderId = orderDetails.id;
                                armInOrder.armcharId = armchairsInBasket.Armchair.id;
                                armInOrder.skin = armchairsInBasket.Skin;
                                armInOrder.price = armchairsInBasket.SinglePrice;
                                armInOrder.count = armchairsInBasket.Count;

                                db.ArmchairsInOrders.Add(armInOrder);
                            }
                        }

                        if (basket.SofasInBasket != null && basket.SofasInBasket.Count > 0)
                        {
                            foreach (var sofaInBasket in basket.SofasInBasket)
                            {
                                SofasInOrder sofaInOrder = new SofasInOrder();
                                sofaInOrder.orderId = orderDetails.id;
                                sofaInOrder.sofaId = sofaInBasket.Sofa.id;
                                sofaInOrder.skin = sofaInBasket.Skin;
                                sofaInOrder.price = sofaInBasket.SinglePrice;
                                sofaInOrder.count = sofaInBasket.Count;

                                db.SofasInOrders.Add(sofaInOrder);
                            }
                        }

                        if (basket.CubeSeatsInBasket != null && basket.CubeSeatsInBasket.Count > 0)
                        {
                            foreach (var cubeSeatInBasket in basket.CubeSeatsInBasket)
                            {
                                CubeSeatInOrder cubeSeatInOrder = new CubeSeatInOrder();
                                cubeSeatInOrder.orderId = orderDetails.id;
                                cubeSeatInOrder.cubeSeatId = cubeSeatInBasket.CubeSeat.id;
                                cubeSeatInOrder.skin = cubeSeatInBasket.Skin;
                                cubeSeatInOrder.price = cubeSeatInBasket.SinglePrice;
                                cubeSeatInOrder.count = cubeSeatInBasket.Count;

                                db.CubeSeatInOrders.Add(cubeSeatInOrder);
                            }
                        }

                        if (basket.ChairsInBasket != null && basket.ChairsInBasket.Count > 0)
                        {
                            foreach (var chairsInBasket in basket.ChairsInBasket)
                            {
                                ChairsInOrder chairsInOrder = new ChairsInOrder();
                                chairsInOrder.orderId = orderDetails.id;
                                chairsInOrder.chairId = chairsInBasket.Chair.id;
                                chairsInOrder.skin = chairsInBasket.Colour;
                                if (!String.IsNullOrEmpty(chairsInBasket.WoodColour))
                                {
                                    chairsInOrder.woodColour = chairsInBasket.WoodColour;
                                }
                                else
                                {
                                    chairsInOrder.woodColour = string.Empty;
                                }
                                chairsInOrder.price = chairsInBasket.SinglePrice;
                                chairsInOrder.count = chairsInBasket.Count;

                                db.ChairsInOrders.Add(chairsInOrder);
                            }
                        }

                        db.SaveChanges();
                    }
                }

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }

        public List<Order> GetAllActiveOrders()
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    return db.Orders.Where(x => x.IsActive == true).ToList();                    
                }
            }
            catch (Exception ex)
            {
                return new List<Order>();
            }
        }

        public List<Order> GetAllInActiveOrders()
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    return db.Orders.Where(x => x.IsActive == false).ToList();
                }
            }
            catch (Exception ex)
            {
                return new List<Order>();
            }
        }

        public OrderFullDetail OrderFullDetail(int id)
        {
            try
            {
                OrderFullDetail details = null;
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    var order = db.Orders.Where(x => x.id == id).FirstOrDefault();

                    var armchairsInOrder = db.ArmchairsInOrders.Where(x => x.orderId == id).ToList();
                    var cubeSeatInOrder = db.CubeSeatInOrders.Where(x => x.orderId == id).ToList();
                    var chairInOrder = db.ChairsInOrders.Where(x => x.orderId == id).ToList();
                    var sofaInOrder = db.SofasInOrders.Where(x => x.orderId == id).ToList();

                    List<ArmchairInBasket> armcsInBasketList = new List<ArmchairInBasket>();
                    List<SofaInBasket> sofasInBasket = new List<SofaInBasket>();
                    List<CubeSeatInBasket> cubeSeatsInBasket = new List<CubeSeatInBasket>();

                    List<ChairInBasket> chairsInBasket = new List<ChairInBasket>();
                   
                    foreach (ArmchairsInOrder armchairFullDetails in armchairsInOrder)
	                {
                        ArmchairInBasket armInBasket = new ArmchairInBasket();

		                armInBasket.Armchair = db.Armchairs.Where(x=>x.id == armchairFullDetails.armcharId).FirstOrDefault();

                        armInBasket.Skin = armchairFullDetails.skin;

                        armInBasket.Count = armchairFullDetails.count;

                        armcsInBasketList.Add(armInBasket);
	                }                    

                    foreach (SofasInOrder sofasFullDetails in sofaInOrder)
                    {
                        SofaInBasket sofaInBasket = new SofaInBasket();

                        sofaInBasket.Sofa = db.Sofas.Where(x => x.id == sofasFullDetails.id).FirstOrDefault();

                        sofaInBasket.Skin = sofasFullDetails.skin;

                        sofaInBasket.Count = sofasFullDetails.count;

                        sofasInBasket.Add(sofaInBasket);
                    }
               
                    foreach (CubeSeatInOrder cubeSeatFullDetails in cubeSeatInOrder)
                    {
                        CubeSeatInBasket cubeSeatInBasket = new CubeSeatInBasket();

                        cubeSeatInBasket.CubeSeat = db.CubeSeats.Where(x => x.id == cubeSeatFullDetails.id).FirstOrDefault();

                        cubeSeatInBasket.Skin = cubeSeatInBasket.Skin;

                        cubeSeatInBasket.Count = cubeSeatFullDetails.count;

                        cubeSeatsInBasket.Add(cubeSeatInBasket);
                    }

                    foreach (ChairsInOrder chairFullDetails in chairInOrder)
                    {
                        ChairInBasket chairInBasket = new ChairInBasket();

                        chairInBasket.Chair = db.Chairs.Where(x => x.id == chairFullDetails.chairId).FirstOrDefault();

                        chairInBasket.Count = chairFullDetails.count;
                        chairInBasket.WoodColour = chairFullDetails.woodColour;

                        if (!string.IsNullOrEmpty(chairFullDetails.skin))
                        {
                            chairInBasket.Colour = chairFullDetails.skin;
                        }

                        chairsInBasket.Add(chairInBasket);
                    }


                    details = new OrderFullDetail(order.Title, order.FirstName, order.LastName, order.Address, order.City, order.PostCode, order.Country, order.Company, order.VAT,
                                                  order.Phone, order.Email, order.Comment, new Guid(order.order_Guid), 
                                                  order.FurniturePrice.HasValue ? order.FurniturePrice.Value : 0,
                                                  order.TransportPrice.HasValue ? order.TransportPrice.Value : 0,
                                                  order.DDSPrice.HasValue ? order.DDSPrice.Value: 0,
                                                  order.FullPrice.HasValue ? order.FullPrice.Value : 0,
                                                  armcsInBasketList, chairsInBasket, cubeSeatsInBasket, sofasInBasket, order.OrderDateTime.HasValue ? order.OrderDateTime.Value : DateTime.Now);
                }

                return details;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public bool DeactiveOrder(int id)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    var order = db.Orders.Where(x => x.id == id).FirstOrDefault();

                    order.IsActive = false;

                    db.SaveChanges();
                }

                return true;
            }
            catch (Exception ex)
            {

                return false;
            }            
        }

        public bool ActivateOrder(int id)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    var order = db.Orders.Where(x => x.id == id).FirstOrDefault();

                    order.IsActive = true;

                    db.SaveChanges();
                }

                return true;
            }
            catch (Exception ex)
            {

                return false;
            }            
        }

        #endregion IOrderInterface                                           
    
        #region IReferencesDbContext
        public List<Reference> AllReferences()
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    return db.References.ToList();
                }
            }
            catch (Exception ex)
            {
                return new List<Reference>();
            }
        }

        public bool AddNewReference(string imagePath)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    Reference reference = new Reference();

                    reference.ImagePath = imagePath;

                    db.References.Add(reference);

                    db.SaveChanges();
                }

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

            
        }

        public bool DeleteReference(int id)
        {
            try
            {
                using (HorecaMebelEntities db = new HorecaMebelEntities())
                {
                    var reference = db.References.FirstOrDefault(x => x.id == id);

                    if (reference != null)
                    {
                        db.References.Remove(reference);

                        db.SaveChanges();
                    }

                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        #endregion IReferencesDbContext         
        
    }
    #endregion Wrapper
}
