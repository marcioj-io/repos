using MediatR;
using MealPlanApp.Application.Features.MealPlans.Commands;
using MealPlanApp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace MealPlanApp.Application.Features.MealPlans.Handlers
{
    public class DeleteMealPlanHandler : IRequestHandler<DeleteMealPlanCommand>
    {
        private readonly MealPlanContext _context;

        public DeleteMealPlanHandler(MealPlanContext context) => _context = context;

        public async Task<Unit> Handle(DeleteMealPlanCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.MealPlans.Include(x => x.Meals)
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (entity == null)
                throw new KeyNotFoundException("MealPlan not found");

            _context.MealPlans.Remove(entity);
            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
