using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Bussiness_Performance.Data;
using Bussiness_Performance.Models;

namespace Bussiness_Performance.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FinancialIndicatorsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FinancialIndicatorsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/FinancialIndicators/byID
        [HttpGet("{id}"), ActionName("byID")]
        public IEnumerable<FinancialIndicator> GetIndicatorByCompany(string id)
        {
            List<FinancialIndicator> list = new List<FinancialIndicator>();
            foreach (var result in _context.FinancialIndicator)
            {
                if (result.CompanyID == id && (result.Time != null && result.MarginGrossProfitMargin != null))
                {
                    result.Time = result.Time.Insert(2, " ");
                    list.Add(result);
                }
            }
            return list;
        }

        // GET: api/FinancialIndicators/AvGP
        [HttpGet("{id}"), ActionName("AvgGP")]
        public IEnumerable<FinancialIndicator> GetAvgGrossProfit()
        {
            List<FinancialIndicator> list = new List<FinancialIndicator>();
            foreach (var result in _context.FinancialIndicator)
            {
                if (result.Time != null && result.MarginGrossProfitMargin != null)
                {
                    result.Time = result.Time.Insert(2, " ");
                    list.Add(result);
                }
            }
            return list;
        }

        // GET: api/FinancialIndicators
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FinancialIndicator>>> GetFinancialIndicator()
        {
            return await _context.FinancialIndicator.AsNoTracking().ToListAsync();
        }

        // GET: api/FinancialIndicators/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FinancialIndicator>> GetFinancialIndicator(int id)
        {
            var financialIndicator = await _context.FinancialIndicator.FindAsync(id);

            if (financialIndicator == null)
            {
                return NotFound();
            }

            return financialIndicator;
        }

        // PUT: api/FinancialIndicators/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFinancialIndicator(int id, FinancialIndicator financialIndicator)
        {
            if (id != financialIndicator.ID)
            {
                return BadRequest();
            }

            _context.Entry(financialIndicator).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FinancialIndicatorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/FinancialIndicators
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FinancialIndicator>> PostFinancialIndicator(FinancialIndicator financialIndicator)
        {
            _context.FinancialIndicator.Add(financialIndicator);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFinancialIndicator", new { id = financialIndicator.ID }, financialIndicator);
        }

        // DELETE: api/FinancialIndicators/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFinancialIndicator(int id)
        {
            var financialIndicator = await _context.FinancialIndicator.FindAsync(id);
            if (financialIndicator == null)
            {
                return NotFound();
            }

            _context.FinancialIndicator.Remove(financialIndicator);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FinancialIndicatorExists(int id)
        {
            return _context.FinancialIndicator.Any(e => e.ID == id);
        }
    }
}
