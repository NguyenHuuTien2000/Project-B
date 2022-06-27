using Bussiness_Performance.Data;
using Bussiness_Performance.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bussiness_Performance.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HomeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}"), ActionName("Statistic")]
        public StatisticList GetTotalExpense(string id)
        {
            var compDetail = _context.Industry.SingleOrDefault(c => c.CompanyID == id);
            if (compDetail == null)
            {
                return null;
            }
            var revenue = _context.Transaction.Where(c => c.CompanyID == id).Sum(c => c.TotalValue / 1_000_000);
            var expense = _context.BussinessResult.Where(c => c.CompanyID == id).Sum(c => c.Financial_Expenses);
            var eps = _context.FinancialIndicator.Where(c => c.CompanyID == id).Sum(c => c.EPS);
            

            StatisticList statistic = new StatisticList
            {
                CompanyID = id,
                CompanyName = _context.Company.Single(c => c.CompanyID == id).CompanyName,
                Sector = compDetail.Level_1_Industry,
                Industry = compDetail.Level_2_Industry,
                TotalRevenue = revenue,
                TotalExpense = expense,
                EPS = eps,
                WorkingCapital = 0
            };
            return statistic;
        }
    }
}
