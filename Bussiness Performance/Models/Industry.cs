using System.ComponentModel.DataAnnotations.Schema;

namespace Bussiness_Performance.Models
{
    public class Industry
    {
        public int IndustryID { get; set; }

        public string Source { get; set; }

        [ForeignKey("Company")]
        public string CompanyID { get; set; }

        public string Level_1_Industry { get; set; }
        public string Level_2_Industry { get; set; }
        public string Level_3_Industry { get; set; }

        public virtual Company Company { get; set; }
    }
}
