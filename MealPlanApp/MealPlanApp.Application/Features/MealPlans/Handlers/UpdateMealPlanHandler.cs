using AutoMapper;
using MediatR;
using MealPlanApp.Application.Features.MealPlans.Commands;
using MealPlanApp.Domain.Dtos;
using MealPlanApp.Domain.Models;
using MealPlanApp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace MealPlanApp.Application.Features.MealPlans.Handlers
{
    public class UpdateMealPlanHandler : IRequestHandler<UpdateMealPlanCommand, MealPlanDto>
    {
        private readonly MealPlanContext _context;
        private readonly IMapper _mapper;

        public UpdateMealPlanHandler(MealPlanContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<MealPlanDto> Handle(UpdateMealPlanCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.MealPlans.Include(x => x.Meals)
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (entity == null)
                throw new KeyNotFoundException("MealPlan not found");

            entity.PatientName = request.MealPlan.PatientName;
            entity.StartDate = request.MealPlan.StartDate;
            entity.EndDate = request.MealPlan.EndDate;
            entity.TotalCalories = request.MealPlan.TotalCalories;
            entity.Notes = request.MealPlan.Notes;

            _context.Meals.RemoveRange(entity.Meals);
            entity.Meals = request.MealPlan.Meals.Select(m => new Meal
            {
                Id = m.Id == Guid.Empty ? Guid.NewGuid() : m.Id,
                MealPlanId = entity.Id,
                Name = m.Name,
                Time = m.Time,
                Description = m.Description
            }).ToList();

            await _context.SaveChangesAsync(cancellationToken);
            return _mapper.Map<MealPlanDto>(entity);
        }
    }
}
