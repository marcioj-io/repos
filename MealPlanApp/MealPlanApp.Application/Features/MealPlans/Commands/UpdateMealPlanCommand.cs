using MediatR;
using MealPlanApp.Domain.Dtos;

namespace MealPlanApp.Application.Features.MealPlans.Commands
{
    public class UpdateMealPlanCommand : IRequest<MealPlanDto>
    {
        public Guid Id { get; set; }
        public MealPlanDto MealPlan { get; set; } = null!;
    }
}
