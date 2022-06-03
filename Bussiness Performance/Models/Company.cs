using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Bussiness_Performance.Models
{
    public class Company
    {
        [Key]
        [StringLength(20)]
        public string CompanyID { set; get; }

        public string CompanyName { set; get; }

        public string Source { set; get; }
        public string Exchange { set; get; }

        [DataType(DataType.Url)]
        public string Link { set; get; }

        public virtual Industry Industry { get; set; }

        public virtual IEnumerable<BussinessResult> BussinessResult { get; set; }
    }
}
