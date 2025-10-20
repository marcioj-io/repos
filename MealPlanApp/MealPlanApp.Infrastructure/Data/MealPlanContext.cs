using MealPlanApp.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace MealPlanApp.Infrastructure.Data
{
    public class MealPlanContext : DbContext
    {
        public MealPlanContext(DbContextOptions<MealPlanContext> options) : base(options) { }

        public DbSet<MealPlan> MealPlans => Set<MealPlan>();
        public DbSet<Meal> Meals => Set<Meal>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MealPlan>(b =>
            {
                b.HasKey(x => x.Id);
                b.Property(x => x.PatientName).IsRequired().HasMaxLength(200);
                b.HasMany(x => x.Meals)
                    .WithOne(m => m.MealPlan!)
                    .HasForeignKey(m => m.MealPlanId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Meal>(b =>
            {
                b.HasKey(x => x.Id);
                b.Property(x => x.Name).IsRequired().HasMaxLength(150);
            });
        }
    }
}
