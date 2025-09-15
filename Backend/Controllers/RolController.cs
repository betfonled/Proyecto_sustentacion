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
    [EnableCors()]
    //[Authorize]
    public class RolController : Controller
    {
        private readonly Context _context;
        private readonly Utilities util;
        private string userAcces;
        public RolController(Context context) {
            _context = context;
            util = new Utilities(_context);
        }

        [HttpPost]
        public async Task<ActionResult<ResponseModel>> CreateRol(RolModel rol)
        {
            var response = new ResponseModel();
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            userAcces = util.ObtenerToken(token);
            try
            {
                _context.Rol.Add(rol);
                await _context.SaveChangesAsync();

                response.Status = "Ok";
                response.StatusCode = 200;
                response.Message = "Usuario Guardado";
                response.Data = new List<RolModel>() { rol };

                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userAcces,
                    Class = "RolController",
                    Method = "POST CreateRol",
                    DescriptionProcess = "Se creo correctamente el rol: " + rol.NameRol                };
                util.LogProcess(logProcess);

                return Ok(response);
            }
            catch (Exception e)
            {
                util.LogErrores("Error al crear rol Error:. " + e.Message.ToString(), userAcces);
                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userAcces,
                    Class = "RolController",
                    Method = "POST CreateRol",
                    DescriptionProcess = "Error al crear rol  Error:. " + e.Message.ToString()
                };
                util.LogProcess(logProcess);

                response.Status = "Ok";
                response.StatusCode = 500;
                response.Message = e.Message.ToString() ;
                return BadRequest(response);

                throw;
            }
            
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRol(int id, [FromBody] RolModel rol)
        {
            var response = new ResponseModel();
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            userAcces = util.ObtenerToken(token);
            try
            {           
                if (id != rol.Id)
                {
                    return BadRequest();
                }

                var rolUpdate = await _context.Rol.FindAsync(id);
                if (rolUpdate == null)
                {
                    return NotFound();
                }
                rolUpdate.NameRol = rol.NameRol;
                _context.Entry(rolUpdate).State = EntityState.Modified;

                await _context.SaveChangesAsync();

                response.Status = "Ok";
                response.StatusCode = 200;
                response.Message = "Rol actualizado correctamente!";

                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userAcces,
                    Class = "RolController",
                    Method = "PUT UpdateRol",
                    DescriptionProcess = "Se actualizo correctamente el rol: " + rol.NameRol
                };
                util.LogProcess(logProcess);

                return Ok(response);

            }
            catch (Exception e)
            {
                util.LogErrores("Error al actualizar rol Error:. " + e.Message.ToString(), userAcces);
                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userAcces,
                    Class = "RolController",
                    Method = "PUT UpdateRol",
                    DescriptionProcess = "Error al actualizar rol Error:. " + e.Message.ToString()
                };
                util.LogProcess(logProcess);

                response.Status = "Ok";
                response.StatusCode = 500;
                response.Message = e.Message.ToString();
                return BadRequest(response);
                throw;
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRol(int id)
        {
            var response = new ResponseModel();
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            userAcces = util.ObtenerToken(token);
            try
            {
                var rol = await _context.Rol.FindAsync(id);

                if (rol == null)
                {
                    return NotFound();
                }

                _context.Rol.Remove(rol);

                await _context.SaveChangesAsync();

                response.Status = "Ok";
                response.StatusCode = 200;
                response.Message = "Rol eliminado correctamente!";

                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userAcces,
                    Class = "RolController",
                    Method = "DELETE DeleteRol",
                    DescriptionProcess = "Se elimino correctamente el rol: " + rol.Id.ToString()
                };
                util.LogProcess(logProcess);

                return Ok(response);
            }
            catch (Exception e)
            {
                util.LogErrores("Error al eliminar rol Error:. " + e.Message.ToString(), userAcces);
                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userAcces,
                    Class = "RolController",
                    Method = "DELETE DeleteRol",
                    DescriptionProcess = "Error al eliminar rol Error:. " + e.Message.ToString()
                };
                util.LogProcess(logProcess);

                response.Status = "Ok";
                response.StatusCode = 500;
                response.Message = e.Message.ToString();
                return BadRequest(response);
                throw;
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RolModel>>> LisRols()
        {
            var response = new ResponseModel();
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            userAcces = util.ObtenerToken(token);
            try
            {
                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userAcces,
                    Class = "RolController",
                    Method = "GET LisRols",
                    DescriptionProcess = "Se listo los roles correctamente"
                };
                util.LogProcess(logProcess);
                return await _context.Rol.ToListAsync();
            }
            catch (Exception e)
            {
                util.LogErrores("Error al listar roles Error:. " + e.Message.ToString(), userAcces);
                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userAcces,
                    Class = "RolController",
                    Method = "DELETE DeleteRol",
                    DescriptionProcess = "Error al listar roles Error:. " + e.Message.ToString()
                };
                util.LogProcess(logProcess);

                response.Status = "Ok";
                response.StatusCode = 500;
                response.Message = e.Message.ToString();
                return BadRequest(response);
                throw;
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RolModel>> ListRolId(int id)
        {
            var response = new ResponseModel();
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            userAcces = util.ObtenerToken(token);

            try
            {
                var rol = await _context.Rol.FindAsync(id);

                if (rol == null)
                {
                    return NotFound();
                }

                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userAcces,
                    Class = "RolController",
                    Method = "GET ListRolId",
                    DescriptionProcess = "Se listo el rol por id  correctamente Id: " + id.ToString()
                };
                util.LogProcess(logProcess);

                return rol;
            }
            catch (Exception e)
            {
                util.LogErrores("Error al listar rol id "+id.ToString() +" Error:. " + e.Message.ToString(), userAcces);
                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userAcces,
                    Class = "RolController",
                    Method = "DELETE ListRolId",
                    DescriptionProcess = "Error al listar rol id " + id.ToString() + " Error:. " + e.Message.ToString()
                };
                util.LogProcess(logProcess);

                response.Status = "Ok";
                response.StatusCode = 500;
                response.Message = e.Message.ToString();
                return BadRequest(response);
                throw;
            }

        }



        [HttpGet("search/{nameRol}")]
        public async Task<ActionResult<RolModel>> ListRolName(string nameRol)
        {
            var response = new ResponseModel();
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            userAcces = util.ObtenerToken(token);

            try
            {
                var rol = await _context.Rol.FirstOrDefaultAsync(x => x.NameRol == nameRol);

                if (rol == null)
                {
                    return NotFound();
                }

                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userAcces,
                    Class = "RolController",
                    Method = "GET ListRolName",
                    DescriptionProcess = "Se listo el rol por nombre  correctamente Id: " + nameRol
                };
                util.LogProcess(logProcess);

                return rol;

            }
            catch (Exception e)
            {
                util.LogErrores("Error al listar rol " + nameRol + " Error:. " + e.Message.ToString(), userAcces);
                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userAcces,
                    Class = "RolController",
                    Method = "DELETE ListRolId",
                    DescriptionProcess = "Error al listar rol " + nameRol + " Error:. " + e.Message.ToString()
                };
                util.LogProcess(logProcess);


                response.Status = "Ok";
                response.StatusCode = 500;
                response.Message = e.Message.ToString();
                return BadRequest(response);
                throw;
            }
        }
    }
}
