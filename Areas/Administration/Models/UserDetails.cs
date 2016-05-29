﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HorecaMebel.Areas.Administration.Models
{
    public class UserDetails
    {
        [Required]
        public string username { get; set; }

        [Required]
        public string password { get; set; }
    }
}