using AutoMapper;
using MediatR;
using MealPlanApp.Application.Features.MealPlans.Queries;
using MealPlanApp.Domain.Dtos;
using MealPlanApp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace MealPlanApp.Application.Features.MealPlans.Handlers
{
    public class GetMealPlansHandler : IRequestHandler<GetMealPlansQuery, List<MealPlanDto>>
    {
        private readonly MealPlanContext _context;
        private readonly IMapper _mapper;

        public GetMealPlansHandler(MealPlanContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<MealPlanDto>> Handle(GetMealPlansQuery request, CancellationToken cancellationToken)
        {
            var query = _context.MealPlans.Include(x => x.Meals).AsQueryable();
            if (!string.IsNullOrWhiteSpace(request.PatientNameFilter))
                query = query.Where(x => x.PatientName.Contains(request.PatientNameFilter));

            var list = await query.ToListAsync(cancellationToken);
            return _mapper.Map<List<MealPlanDto>>(list);
        }
    }
}
