namespace MealPlanApp.Domain.Models
{
    public class MealPlan
    {
        public Guid Id { get; set; }
        public string PatientName { get; set; } = null!;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int TotalCalories { get; set; }
        public string? Notes { get; set; }
        public ICollection<Meal> Meals { get; set; } = new List<Meal>();
    }
}
