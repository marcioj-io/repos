namespace MealPlanApp.Domain.Dtos
{
    public class MealDto
    {
        public Guid Id { get; set; }
        public Guid MealPlanId { get; set; }
        public string Name { get; set; } = null!;
        public DateTime Time { get; set; }
        public string? Description { get; set; }
    }
}
