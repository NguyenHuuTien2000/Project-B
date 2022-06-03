using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bussiness_Performance.Models
{
    public class BussinessResult
    {
        [Key]
        public int ID { get; set; }

        [ForeignKey("Company")]
        public string CompanyID { get; set; }


        public string Time { get; set; }

        public double? Net_Sales_And_Service_Provision { get; set; }
        public double? Cost_Of_Goods_Sold { set; get; }
        public double? Gross_Profit_On_Sales_And_Service_Delivery { get; set; }
        public double? Financial_Operating_Revenue { get; set; }
        public double? Financial_Expenses { get; set; }
        public double? Cost_Of_Sales { get; set; }
        public double? Business_Management_Expenses { get; set; }
        public double? Net_Profit_From_Business_Activities { get; set; }
        public double? Other_Profits { get; set; }
        public double? Profit_Or_Loss_Portion_From_The_Joint_Venture_Affiliate { get; set; }
        public double? Total_Accounting_Profit_Before_Tax { get; set; }
        public double? Profit_After_Corporate_Income_Tax { get; set; }
        public double? After_Tax_Profit_Of_Shareholders_Of_The_Parent_Company { get; set; }
        public double? Underlying_Earnings_Per_Share { get; set; }

        public virtual Company Company { get; set; }
    }
}
