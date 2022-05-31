using Bussiness_Performance.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Data.Entity.ModelConfiguration.Conventions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bussiness_Performance.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {

        }

        public DbSet<Company> Company { get; set; }
        public DbSet<Industry> Industry { get; set; }
        public DbSet<BussinessResult> BussinessResult { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Company>()
                .HasOne(c => c.Industry)
                .WithOne(i => i.Company)
                .HasForeignKey<Industry>(i => i.CompanyID);
            builder.Entity<Company>()
                .HasMany(c => c.BussinessResult)
                .WithOne(r => r.Company);
        }

        
    }
}
