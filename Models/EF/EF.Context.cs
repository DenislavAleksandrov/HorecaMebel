﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class HorecaMebelEntities : DbContext
    {
        public HorecaMebelEntities()
            : base("name=HorecaMebelEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public DbSet<UserTable> UserTables { get; set; }
        public DbSet<Promotion> Promotions { get; set; }
        public DbSet<Chair> Chairs { get; set; }
        public DbSet<Armchair> Armchairs { get; set; }
        public DbSet<CubeSeat> CubeSeats { get; set; }
        public DbSet<Sofa> Sofas { get; set; }
        public DbSet<ArmchairsAdditionalPhoto> ArmchairsAdditionalPhotoes { get; set; }
        public DbSet<ChairsAdditionalPhoto> ChairsAdditionalPhotoes { get; set; }
        public DbSet<SofaAdditionalPhoto> SofaAdditionalPhotoes { get; set; }
        public DbSet<CubeSeatAdditionalPhoto> CubeSeatAdditionalPhotoes { get; set; }
        public DbSet<ArmchairsInOrder> ArmchairsInOrders { get; set; }
        public DbSet<ChairsInOrder> ChairsInOrders { get; set; }
        public DbSet<CubeSeatInOrder> CubeSeatInOrders { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<SofasInOrder> SofasInOrders { get; set; }
        public DbSet<Reference> References { get; set; }
    }
}