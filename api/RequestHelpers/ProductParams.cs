namespace api.RequestHelpers
{
  public class ProductParams : PaginationParams
  {
    public string SortBy { get; set; }
    public string SearchTerm { get; set; }
    public string Types { get; set; }
    public string Brands { get; set; }
  }
}