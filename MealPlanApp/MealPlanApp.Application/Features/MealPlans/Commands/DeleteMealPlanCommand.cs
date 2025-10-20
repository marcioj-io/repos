using MediatR;

namespace MealPlanApp.Application.Features.MealPlans.Commands
{
    public class DeleteMealPlanCommand : IRequest
    {
        public Guid Id { get; set; }
    }
}
