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
    public class BussinessResultsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BussinessResultsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/BussinessResults
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BussinessResult>>> GetBussinessResult()
        {
            return await _context.BussinessResult.ToListAsync();
        }

        // GET: api/BussinessResults/CompID
        [HttpGet("{id}"), ActionName("CompID")]
        public ActionResult<IEnumerable<BussinessResult>> GetResultByCompany(string id)
        {
            List<BussinessResult> list = new List<BussinessResult>();
            foreach (var result in _context.BussinessResult)
            {
                if (result.CompanyID == id)
                {
                    list.Add(result);
                }
            }

            return list;
        }

        [HttpGet("{id}"), ActionName("Time")]
        public ActionResult<IEnumerable<string>> GetResultByTime(string id)
        {
            List<string> list = new List<string>();
            foreach (var result in _context.BussinessResult)
            {
                if (result.CompanyID == id)
                {
                    list.Add(result.Time);
                }
            }

            return list;
        }

        // GET: api/BussinessResults/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BussinessResult>> GetBussinessResult(int id)
        {
            var bussinessResult = await _context.BussinessResult.FindAsync(id);

            if (bussinessResult == null)
            {
                return NotFound();
            }

            return bussinessResult;
        }

        // PUT: api/BussinessResults/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBussinessResult(int id, BussinessResult bussinessResult)
        {
            if (id != bussinessResult.ID)
            {
                return BadRequest();
            }

            _context.Entry(bussinessResult).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BussinessResultExists(id))
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

        // POST: api/BussinessResults
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BussinessResult>> PostBussinessResult(BussinessResult bussinessResult)
        {
            _context.BussinessResult.Add(bussinessResult);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBussinessResult", new { id = bussinessResult.ID }, bussinessResult);
        }

        // DELETE: api/BussinessResults/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBussinessResult(int id)
        {
            var bussinessResult = await _context.BussinessResult.FindAsync(id);
            if (bussinessResult == null)
            {
                return NotFound();
            }

            _context.BussinessResult.Remove(bussinessResult);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BussinessResultExists(int id)
        {
            return _context.BussinessResult.Any(e => e.ID == id);
        }
    }
}
