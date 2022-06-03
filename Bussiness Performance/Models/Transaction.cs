using System.ComponentModel.DataAnnotations.Schema;

namespace Bussiness_Performance.Models
{
    public class Transaction
    {
        public int ID { get; set; }
        public string Source { get; set; }

        public string Trading_Date { get; set; }
        public double? Open_Price { get; set; }
        public double? Close_Price { get; set; }
        public double? Highest { get; set; }
        public double? Lowest { get; set; }
        public double? Price_Revised { get; set; }
        public double? Diff_Price { get; set; }
        public double? Diff_Percent_Price { get; set; }
        public double? Matching_Volume { get; set; }
        public double? Matching_Value { get; set; }
        public double? Put_Through_All_Volume { get; set; }
        public double? Put_Through_All_Value { get; set; }

        [ForeignKey("Company")]
        public string CompanyID { get; set; }
        public virtual Company Company { get; set; }
    }
}
