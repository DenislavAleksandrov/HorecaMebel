using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Models.Enum
{
    public enum PriceSortBy
    { 
        ASC = 1,
        DESC = 2
    }

    public enum ControllersEnum
    { 
        About = 1,
        Armchairs = 2,
        Chairs = 4,
        Contacts = 8,
        CubeSeats = 16,
        Sofas = 32,
        Home = 64,
        Search = 0,
        References = 128
    }
}