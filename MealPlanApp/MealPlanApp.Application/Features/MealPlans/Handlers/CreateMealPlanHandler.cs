using AutoMapper;
using MediatR;
using MealPlanApp.Application.Features.MealPlans.Commands;
using MealPlanApp.Domain.Dtos;
using MealPlanApp.Domain.Models;
using MealPlanApp.Infrastructure.Data;

namespace MealPlanApp.Application.Features.MealPlans.Handlers
{
    public class CreateMealPlanHandler : IRequestHandler<CreateMealPlanCommand, MealPlanDto>
    {
        private readonly MealPlanContext _context;
        private readonly IMapper _mapper;

        public CreateMealPlanHandler(MealPlanContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<MealPlanDto> Handle(CreateMealPlanCommand request, CancellationToken cancellationToken)
        {
            var entity = _mapper.Map<MealPlan>(request.MealPlan);
            entity.Id = Guid.NewGuid();
            foreach (var meal in entity.Meals)
            {
                meal.Id = Guid.NewGuid();
                meal.MealPlanId = entity.Id;
            }

            _context.MealPlans.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return _mapper.Map<MealPlanDto>(entity);
        }
    }
}
