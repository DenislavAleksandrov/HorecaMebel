//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace HorecaMebel.Models.EF
{
    using System;
    using System.Collections.Generic;
    
    public partial class Chair
    {
        public int id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public string ImagePath { get; set; }
        public Nullable<double> NewPrice { get; set; }
        public string WoodenFrame { get; set; }
        public string Seat { get; set; }
        public string Back { get; set; }
        public string WoodColor { get; set; }
        public Nullable<double> Width { get; set; }
        public Nullable<double> Height { get; set; }
        public Nullable<double> Depth { get; set; }
        public string Skin { get; set; }
        public string ProductionTime { get; set; }
        public string SkinColour { get; set; }
    }
}
