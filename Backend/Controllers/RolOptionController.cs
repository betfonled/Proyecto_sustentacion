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
    //[Authorize]
    public class RolOptionController : Controller
    {
        private readonly Context _context;
        private readonly Utilities util;
        private string userAcces;

        public RolOptionController(Context context)
        {
            _context = context;
            util = new Utilities(_context);
        }

        [HttpPost]
        public async Task<ActionResult<RolOptionRequestModel>> CreateOptionRol(RolOptionRequestModel rolOption)
        {
            var response = new ResponseModel();
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            userAcces = util.ObtenerToken(token);

            try
            {

                foreach (var e in rolOption.Option)
                {

                    RolOptionModel rolOptionIds = new();
                    rolOptionIds.IdRol = rolOption.Rol.Id;
                    rolOptionIds.IdOption = e.Id;

                    _context.RolOption.Add(rolOptionIds);
                    await _context.SaveChangesAsync();

                }

                response.Status = "Ok";
                response.StatusCode = 200;
                response.Message = "Rol Opcion Guardado";

                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userAcces,
                    Class = "RolOptionController",
                    Method = "POST CreateOptionRol",
                    DescriptionProcess = "Se creo correctamente los permisos : " + rolOption.Option.ToString() + "para el rol " + rolOption.Rol
                };
                util.LogProcess(logProcess);

                return Ok(response);
            }
            catch (Exception e)
            {
                util.LogErrores("Error al crear los permisos del rol Error:. " + e.Message.ToString(), userAcces);
                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userAcces,
                    Class = "RolOptionController",
                    Method = "POST CreateOptionRol",
                    DescriptionProcess = "Error al crear los permisos del rol Error:. " + e.Message.ToString()
                };
                util.LogProcess(logProcess);

                response.Status = "Ok";
                response.StatusCode = 500;
                response.Message = e.Message.ToString();
                return BadRequest(response);
                throw;
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRolOption(int id, [FromBody] RolOptionRequestModel rolOption)
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            userAcces = util.ObtenerToken(token);
            var response = new ResponseModel();

            try
            {
                var rolOptionList = await _context.RolOption.ToListAsync();
                foreach (var e in rolOptionList)
                {
                    if (e.IdRol == id)
                    {
                        _context.RolOption.Remove(e);
                    }
                }


                foreach (var e in rolOption.Option)
                {

                    RolOptionModel rolOptionIds = new();
                    rolOptionIds.IdRol = id;
                    rolOptionIds.IdOption = e.Id;

                    _context.RolOption.Add(rolOptionIds);
                }

                await _context.SaveChangesAsync();

                response.Status = "Ok";
                response.StatusCode = 200;
                response.Message = "Rol Opcion actualizado";

                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userAcces,
                    Class = "RolOptionController",
                    Method = "PUT UpdateRolOption",
                    DescriptionProcess = "Se actualizo correctamente los permisos : " + rolOption.Option.ToString() + "para el rol " + rolOption.Rol
                };
                util.LogProcess(logProcess);


                return Ok(response);
            }
            catch (Exception e)
            {
                util.LogErrores("Error al actualizar los permisos del rol Error:. " + e.Message.ToString(), userAcces);
                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userAcces,
                    Class = "RolOptionController",
                    Method = "PUT UpdateRolOption",
                    DescriptionProcess = "Error al actualizar los permisos del rol Error:. " + e.Message.ToString()
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
        public async Task<IActionResult> DeleteRolOption(int id)
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            userAcces = util.ObtenerToken(token);
            var response = new ResponseModel();
            try
            {
                var rolOptions = await _context.RolOption.ToListAsync();
                var idRol = 0;

                foreach (var e in rolOptions)
                {
                    if (e.IdRol == id)
                    {
                        _context.RolOption.Remove(e);
                        var rol = await _context.Rol.FindAsync(e.IdRol);
                        if (rol != null)
                        {
                            idRol = rol.Id;
                        }
                        await _context.SaveChangesAsync();
                    }
                }
            
                response.Status = "Ok";
                response.StatusCode = 200;
                response.Message = "Rol Opcion eliminada";

                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userAcces,
                    Class = "RolOptionController",
                    Method = "DELETE DeleteRolOption",
                    DescriptionProcess = "Opciones del rol eliminadas id: " + id
                };
                util.LogProcess(logProcess);


                return Ok(response);

            } catch (Exception e) {

                util.LogErrores("Error al eliminar los permisos del rol id" + id + " Error:. " + e.Message.ToString(), userAcces);
                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userAcces,
                    Class = "RolOptionController",
                    Method = "DELETE DeleteRolOption",
                    DescriptionProcess = "Error al eliminar los permisos del rol  id" + id + " Error:. " + e.Message.ToString()
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
        public List<RolOptionResponseModel> ListRolOption()
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            userAcces = util.ObtenerToken(token);
            var response = new ResponseModel();

            try
            {
                var rolOpt = _context.RolOption.ToListAsync().Result;
                List<RolOptionResponseModel> listRolOption = new();

                for (int i = 0; i < rolOpt.Count; i++)
                {
                    RolOptionResponseModel rolOption = new();
                    var rolId = rolOpt[i].IdRol;
                    var optionId = rolOpt[i].IdOption;

                    var nameRol = _context.Rol.FindAsync(rolId).Result;
                    var nameOption = _context.Options.FindAsync(optionId).Result;

                    rolOption.Rol = nameRol.NameRol;
                    rolOption.Option = nameOption.OptionName;

                    listRolOption.Add(rolOption);
                }

                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userAcces,
                    Class = "RolOptionController",
                    Method = "GET ListRolOption",
                    DescriptionProcess = "Lista de roles opciones "
                };
                util.LogProcess(logProcess);


                return listRolOption.ToList();
            }
            catch (Exception e)
            {
                util.LogErrores("Error al listar los permisos del rol  Error:. " + e.Message.ToString(), userAcces);
                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userAcces,
                    Class = "RolOptionController",
                    Method = "DELETE DeleteRolOption",
                    DescriptionProcess = "Error al listar los permisos del rol Error:. " + e.Message.ToString()
                };
                util.LogProcess(logProcess);

                throw;
            }

        }

        [HttpGet("SearchGroupOptions")]
        public async Task<RolOptionRequestModel> ListGroupRolOpt(int idRol)
        {
            List<RolModel> Roles = await _context.Rol.ToListAsync();
            List<RolOptionModel> rolOptions = await _context.RolOption.ToListAsync();

            var query = from RolOpt in _context.RolOption
                        join rol in _context.Rol on RolOpt.IdRol equals rol.Id
                        join opt in _context.Options on RolOpt.IdOption equals opt.Id
                        where RolOpt.IdRol == idRol
                        select new
                        {
                            rol,
                            options = opt

                        };

            List<OptionModel> option = new();
            RolModel rolOption = new();

            foreach (var obj in query)
            {
                option.Add(obj.options);
                rolOption = obj.rol;
            }

            RolOptionRequestModel result = new();
            result.Rol = rolOption;
            result.Option = option;


            return result;

        }

    }

}
