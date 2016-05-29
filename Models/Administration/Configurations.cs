using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace HorecaMebel.Models.Administration
{
    public interface IConfiguration
    {
         string BackendAccountCookie { get; }

         int CookieExpirationMinutes { get; }

         string BasketIdNameCookie { get; }

         string PromotionImageDomain { get; }

         string ChairsImageDomain { get; }

         string ReferencesImageDomain { get; }

         string ImageArmchairs { get; }

         string ImageSofas { get; }

         string CubeSeats { get; }

         double DDSInGermany { get; }

         int MinAmountForChairsToOrder { get; }

         int MinAmountForSofasToOrder { get; }

         int MinAmountForArmchairsToOrder { get; }

         int MinAmountForCubeSeatToOrder { get; }

         int MinValueChairTransport { get; }

         int EachChairMore { get; }

         int MinValueSofaTransport { get; }

         int EachSofaMore { get; }

         int MinValueArmchairsTransport { get; }

         int EachArmchairsMore { get; }

         int MinValueCubeSeatTransport { get; }

         int EachCubeSeatMore { get; }

         string ArmchairsAdditionImagePath { get; }

        string ChairsAdditionalImages { get; }
        string CubeSeatAdditionalImages { get; }
        string SofaAdditionalImages { get; }  
    }

    public class Configurations : IConfiguration
    {
        public string ReferencesImageDomain
        {
            get
            {
                return Convert.ToString(ConfigurationManager.AppSettings["RefrencesImages"]); 
            }
        }

        public string ChairsAdditionalImages
        {
            get
            {
                return Convert.ToString(ConfigurationManager.AppSettings["ImageChairsAdditionalImage"]); 
            }
        }

        public string CubeSeatAdditionalImages
        {
            get
            {
                return Convert.ToString(ConfigurationManager.AppSettings["ImageCubeSeatAdditionalImage"]); 
            }
        }

        public string SofaAdditionalImages
        {
            get
            {
                return Convert.ToString(ConfigurationManager.AppSettings["ImageSofaAdditionalImage"]); 
            }
        }

        public string ArmchairsAdditionImagePath
        {
            get
            {
                return Convert.ToString(ConfigurationManager.AppSettings["ImageArmchairsAdditionalImage"]); 
            }
        }
        
        public int CookieExpirationMinutes
        {
            get
            {
                return Convert.ToInt32(ConfigurationManager.AppSettings["CookieExpirationMinutes"]);
            }
        }

        public string BackendAccountCookie
        {
            get
            {
                return ConfigurationManager.AppSettings["BackendAccountCookie"];
            }
        }

        public string BasketIdNameCookie
        {
            get
            {
                return ConfigurationManager.AppSettings["BasketIdNameCookie"];
            }
        }

        public string PromotionImageDomain
        {
            get 
            {
                return ConfigurationManager.AppSettings["ImagePromotion"]; 
            }
        }

        public string ImageSofas
        {
            get
            {
                return ConfigurationManager.AppSettings["ImageSofas"]; 
            }
        }

        public string ChairsImageDomain
        {

            get { return ConfigurationManager.AppSettings["ImageChairs"]; }
        }

        public string ImageArmchairs
        {

            get { return ConfigurationManager.AppSettings["ImageArmchairs"]; }
        }

        public string CubeSeats
        {
            get { return ConfigurationManager.AppSettings["ImageCubeSeats"]; }            
        }

        public double DDSInGermany
        {
            get { return Convert.ToDouble(ConfigurationManager.AppSettings["DDSInGermany"]); }  
        }

        public int MinAmountForChairsToOrder
        {
            get
            {
                return Convert.ToInt32(ConfigurationManager.AppSettings["minAmountForChairsToOrder"]);
            }
        }

        public int MinAmountForSofasToOrder
        {
            get
            {
                return Convert.ToInt32(ConfigurationManager.AppSettings["minAmountForSofasToOrder"]);
            }            
        }
    
        public int MinAmountForArmchairsToOrder
        {
            get
            {
                return Convert.ToInt32(ConfigurationManager.AppSettings["minAmountForArmchairsToOrder"]);
            }            
        }

        public int MinAmountForCubeSeatToOrder
        {
            get
            {
                return Convert.ToInt32(ConfigurationManager.AppSettings["minAmountForCubeSeatToOrder"]);
            }            
        }

        public int MinValueChairTransport
        {
            get
            {
                return Convert.ToInt32(ConfigurationManager.AppSettings["minValueChairTransport"]); 
            }
        }

        public int EachChairMore
        {
            get
            {
                return Convert.ToInt32(ConfigurationManager.AppSettings["eachChairMore"]); 
            }
        }
    
        public int MinValueSofaTransport
        {
            get
            {
                return Convert.ToInt32(ConfigurationManager.AppSettings["minValueSofaTransport"]); 
            }
        }

        public int EachSofaMore
        {
            get
            {
                return Convert.ToInt32(ConfigurationManager.AppSettings["eachSofaMore"]); 
            }
        }

        public int MinValueArmchairsTransport
        {
            get
            {
                return Convert.ToInt32(ConfigurationManager.AppSettings["minValueArmchairsTransport"]); 
            }
        }

        public int EachArmchairsMore
        {
            get
            {
                return Convert.ToInt32(ConfigurationManager.AppSettings["eachArmchairsMore"]); 
            }
        }

        public int MinValueCubeSeatTransport
        {
            get
            {
                return Convert.ToInt32(ConfigurationManager.AppSettings["minValueCubeSeatTransport"]); 
            }
        }
    
        public int EachCubeSeatMore
        {
            get
            {
                return Convert.ToInt32(ConfigurationManager.AppSettings["eachCubeSeatMore"]); 
            }
        }    
    }
}