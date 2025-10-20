using AutoMapper;
using MealPlanApp.Domain.Dtos;
using MealPlanApp.Domain.Models;

namespace MealPlanApp.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<MealPlan, MealPlanDto>().ReverseMap();
            CreateMap<Meal, MealDto>().ReverseMap();
        }
    }
}
