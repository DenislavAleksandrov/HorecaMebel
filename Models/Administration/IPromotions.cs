using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HorecaMebel.Models.Administration
{
    public interface IPromotions
    {
         int id { get; set; }
         string ProductName { get; set; }
         string Text2 { get; set; }
         string Price { get; set; }
         string ProductURL { get; set; }
         string Name { get; set; }
    }
}
