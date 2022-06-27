
namespace Bussiness_Performance.Models
{
    public class StatisticList
    {
        public string CompanyID { set; get; }
        public string CompanyName { get; set; }
        public string Sector { get; set; }
        public string Industry { get; set; }
        public double? TotalRevenue { get; set; }
        public double? TotalExpense { get; set; }
        public double? EPS { get; set; }
        public double? WorkingCapital { get; set; }
    }
}
