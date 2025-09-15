using ApiMedGestionAlert.DataBase;
using ApiMedGestionAlert.Model;
using ApiMedGestionAlert.Util;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiMedGestionAlert.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    [Authorize]
    public class OptionController : Controller
    {
        private readonly Context _context;
        private readonly Utilities util;
        private string userAcces;
       
        public OptionController(Context context) { 
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OptionModel>>> ListOption()
        {
            return await _context.Options.OrderBy(c => c.OrderOption).ThenBy(d => d.IdFather).ThenBy(e => e.OptionName).ToListAsync();
        }
    }
}
