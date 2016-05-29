using HorecaMebel.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Models
{
    public class BaseModel
    {
        public List<MenuItem> Menu { get; set; }

        public List<MenuItem> SecondMenu { get; set; }

        public string BtnSearch { get; set; }

        public int BasketCount { get; set; }

        public BaseModel(ControllersEnum active, int basketCount)
        {
            this.BasketCount = basketCount;
            if (active == ControllersEnum.Search)
            {
                this.BtnSearch = "BtnSeatSearchPage";
            }
            else
            {
                this.BtnSearch = "BtnSearch";
            }

            this.Menu = new List<MenuItem>();
            this.SecondMenu = new List<MenuItem>();

            MenuItem home = new MenuItem(Resources.Resources.Home, "/Home/Index", active == ControllersEnum.Home || active == ControllersEnum.Search ? true : false);
            this.Menu.Add(home);

            MenuItem armchairs = new MenuItem(Resources.Resources.Armchairs, "/ArmchairsApp/List", active == ControllersEnum.Armchairs ? true : false);
            this.Menu.Add(armchairs);
            this.SecondMenu.Add(armchairs);
            
            MenuItem sofas = new MenuItem(Resources.Resources.Sofas, "/SofasApp/List", active == ControllersEnum.Sofas ? true : false);
            this.Menu.Add(sofas);
            this.SecondMenu.Add(sofas);

            MenuItem cubeSeat = new MenuItem(Resources.Resources.CubeSeats, "/CubeSeatsApp/List", active == ControllersEnum.CubeSeats ? true : false);
            this.Menu.Add(cubeSeat);
            this.SecondMenu.Add(cubeSeat);

            MenuItem chairs = new MenuItem(Resources.Resources.Chairs, "/ChairsApp/List", active == ControllersEnum.Chairs ? true : false);
            this.Menu.Add(chairs);
            this.SecondMenu.Add(chairs);
            
            MenuItem about = new MenuItem(Resources.Resources.About, "/About/Index", active == ControllersEnum.About ? true : false);
            this.Menu.Add(about);

            MenuItem references = new MenuItem(Resources.Resources.References, "/ReferencesApp/Index", active == ControllersEnum.References ? true : false);
            this.Menu.Add(references);

            MenuItem contacts = new MenuItem(Resources.Resources.Contacts, "/Contacts/Index", active == ControllersEnum.Contacts ? true : false);
            this.Menu.Add(contacts);
        }        
    }

    public class MenuItem
    {
        public string Text { get; set; }

        public string Url { get; set; }

        public bool IsActive { get; set; }

        public MenuItem(string text, string url, bool isActive)
        {
            this.Text = text;
            this.Url = url;
            this.IsActive = isActive;
        }
    }
}