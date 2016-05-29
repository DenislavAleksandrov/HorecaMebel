using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Areas.Administration.Models
{
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