using MediatR;
using MealPlanApp.Domain.Dtos;

namespace MealPlanApp.Application.Features.MealPlans.Queries
{
    public class GetMealPlanByIdQuery : IRequest<MealPlanDto?>
    {
        public Guid Id { get; set; }
    }
}
