using MediatR;
using MealPlanApp.Domain.Dtos;

namespace MealPlanApp.Application.Features.MealPlans.Commands
{
    public class CreateMealPlanCommand : IRequest<MealPlanDto>
    {
        public MealPlanDto MealPlan { get; set; } = null!;
    }
}
