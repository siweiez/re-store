using api.DTOs;
using api.Entities;
using AutoMapper;

namespace api.RequestHelpers
{
  public class MappingProfiles : Profile
  {
    public MappingProfiles()
    {
      CreateMap<CreateProductDTO, Product>();
      CreateMap<UpdateProductDTO, Product>();
    }
  }
}