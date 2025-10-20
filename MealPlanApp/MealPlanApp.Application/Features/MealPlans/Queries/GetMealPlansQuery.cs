using MediatR;
using MealPlanApp.Domain.Dtos;

namespace MealPlanApp.Application.Features.MealPlans.Queries
{
    public class GetMealPlansQuery : IRequest<List<MealPlanDto>>
    {
        public string? PatientNameFilter { get; set; }
    }
}
