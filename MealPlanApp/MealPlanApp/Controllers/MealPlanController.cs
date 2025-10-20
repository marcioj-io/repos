using MediatR;
using Microsoft.AspNetCore.Mvc;
using MealPlanApp.Application.Features.MealPlans.Commands;
using MealPlanApp.Application.Features.MealPlans.Queries;
using MealPlanApp.Domain.Dtos;

namespace MealPlanApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MealPlanController : ControllerBase
    {
        private readonly IMediator _mediator;
        public MealPlanController(IMediator mediator) => _mediator = mediator;

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string? patientName)
            => Ok(await _mediator.Send(new GetMealPlansQuery { PatientNameFilter = patientName }));

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _mediator.Send(new GetMealPlanByIdQuery { Id = id });
            return result == null ? NotFound() : Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] MealPlanDto dto)
        {
            var result = await _mediator.Send(new CreateMealPlanCommand { MealPlan = dto });
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] MealPlanDto dto)
            => Ok(await _mediator.Send(new UpdateMealPlanCommand { Id = id, MealPlan = dto }));

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _mediator.Send(new DeleteMealPlanCommand { Id = id });
            return NoContent();
        }
    }
}
