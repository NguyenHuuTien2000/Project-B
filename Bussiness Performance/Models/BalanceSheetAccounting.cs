using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Bussiness_Performance.Models
{
    public class BalanceSheetAccounting
    {
        [Key]
        public int ID { get; set; }

        [ForeignKey("Company")]
        public string CompanyID { get; set; }

        public string Source { get; set; } 
        public string Time { get; set; }

        public double? Short_Term_Assets { get; set; }
        public double? Money_And_Cash_Equivalents { get; set; }
        public double? Short_Term_Financial_Investments { get; set; }
        public double? Inventory { get; set; }
        public double? Other_Short_Term_Assets { get; set; }
        public double? Long_Term_Assets { get; set; }
        public double? Fixed_Assets { get; set; }
        public double? Investment_Real_Estate { get; set; }
        public double? Long_Term_Financial_Investments { get; set; }
        public double? Total_Assets { get; set; }
        public double? Liabilities { get; set; }
        public double? Short_Term_Debt { get; set; }
        public double? Long_Term_Debt { get; set; }
        public double? Equity { get; set; }
        public double? Investment_Capital_Of_Owner { get; set; }
        public double? Equity_Surplus { get; set; }
        public double? Undistributed_After_Tax_Profit { get; set; }
        public double? Benefits_Of_Minority_Shareholders { get; set; }
        public double? Total_Capital { get; set; }
    }
}
