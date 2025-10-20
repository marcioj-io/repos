namespace MealPlanApp.Domain.Dtos
{
    public class MealPlanDto
    {
        public Guid Id { get; set; }
        public string PatientName { get; set; } = null!;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int TotalCalories { get; set; }
        public string? Notes { get; set; }
        public List<MealDto> Meals { get; set; } = new();
    }
}
