using AutoMapper;
using MediatR;
using MealPlanApp.Application.Features.MealPlans.Queries;
using MealPlanApp.Domain.Dtos;
using MealPlanApp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace MealPlanApp.Application.Features.MealPlans.Handlers
{
    public class GetMealPlanByIdHandler : IRequestHandler<GetMealPlanByIdQuery, MealPlanDto?>
    {
        private readonly MealPlanContext _context;
        private readonly IMapper _mapper;

        public GetMealPlanByIdHandler(MealPlanContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<MealPlanDto?> Handle(GetMealPlanByIdQuery request, CancellationToken cancellationToken)
        {
            var entity = await _context.MealPlans.Include(x => x.Meals)
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            return entity == null ? null : _mapper.Map<MealPlanDto>(entity);
        }
    }
}
