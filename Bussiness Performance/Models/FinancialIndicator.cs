using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bussiness_Performance.Models
{
    public class FinancialIndicator
    {
        [Key]
        public int ID { get; set; }

        [ForeignKey("Company")]
        public string CompanyID { get; set; }

        public string Source { get; set; }
        public string Time { get; set; }
        public double? EPS { get; set; }
        public double? BVPS { get; set; }
        public double? MarketPriceToEarningsIndex { get; set; }
        public double? MarketPriceIndexOnBookValue { get; set; }
        public double? MarginGrossProfitMargin { get; set; }
        public double? ProfitMarginOnNetRevenue { get; set; }
        public double? ROEA { get; set; }
        public double? ROAA { get; set; }
        public double? CurrentShortTermPayoutRatio { get; set; }
        public double? InterestSolvency { get; set; }
        public double? RatioOfDebtToTotalAssets { get; set; }
        public double? RatioOfDebtToEquity { get; set; }

        public virtual Company Company { get; set; } 
    }
}
