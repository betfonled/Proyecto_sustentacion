using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using ApiMedGestionAlert.DataBase;
using ApiMedGestionAlert.Model;
using Microsoft.EntityFrameworkCore;
using ApiMedGestionAlert.Util;

namespace ApiMedGestionAlert.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    //[Authorize]
    public class UserController : Controller
    {
        private readonly Context _context;
        private readonly Utilities util;
        private string userAcces;
        public UserController(Context context)
        {
            _context = context;
            util = new Utilities(_context);
        }

        [HttpPost]
        public async Task<ActionResult<ResponseModel>> CreateUser(UserResponseModel user)
        {
            var response = new ResponseModel();
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            userAcces = util.ObtenerToken(token);
            try
            {
                //Se comenta mientras se prueba en backend
                //if(ModelState.IsValid)
                //{
                //    Response.Status = "OK";
                //    Response.StatusCode = 500;
                //    Response.Message = "La contraseña no es segura";
                //    return Ok(Response);
                //}
                //else
                //{
                    var rol = await _context.Rol.FirstOrDefaultAsync(x => x.NameRol == user.Rol);
                    if(rol == null)
                    {
                        return NotFound();
                    }

                    var idRol = rol.Id;
                    String passwordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordApp);
                UserModel userModel = new();
                    
                    userModel.UserName = user.UserName;
                    userModel.PasswordApp = passwordHash;
                    userModel.IdRol = idRol;
                    userModel.Email = user.Email;
                    userModel.Token = "";
                    userModel.StateSession = user.StateSession;
                    

                _context.Users.Add(userModel);

                    await _context.SaveChangesAsync();

                    response.Status = "Ok";
                    response.StatusCode = 200;
                    response.Message = "Usuario Guardado";
                    response.Data = new List<UserModel>() { userModel };
                //}

                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userAcces,
                    Class = "UserController",
                    Method = "POST CreateUser",
                    DescriptionProcess = "Se creo correctamente el usuario: " + user.UserName + " correo: " + user.Email
                };
                util.LogProcess(logProcess);

                return Ok(response);
            }
            catch (Exception e)
            {

                util.LogErrores("Error al crear usuario Error:. " + e.Message.ToString(), userAcces);
                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userAcces,
                    Class = "UserController",
                    Method = "POST CreateUser",
                    DescriptionProcess = "Error al crear usuario Error:. " +  e.Message.ToString()
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
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserResponseModel user)
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            userAcces = util.ObtenerToken(token);
            var response = new ResponseModel();
            try
            {
                var responseUpdate = new ResponseModel
                {
                    StatusCode = 200,
                    Status = "Ok"
                };

                String passwordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordApp);
                var rol = await _context.Rol.FirstOrDefaultAsync(x => x.NameRol == user.Rol);
                if (rol == null)
                {
                    return NotFound();
                }

                var idRol = rol.Id;
                var userSave = await _context.Users.FindAsync(id);
                if (userSave.PasswordApp == user.PasswordApp)
                {
                    userSave.UserName = user.UserName;
                    userSave.StateSession = user.StateSession;
                    userSave.Email = user.Email;
                    userSave.PasswordApp = user.PasswordApp;
                    userSave.IdRol = idRol;

                }
                else
                {
                    userSave.UserName = user.UserName;
                    userSave.StateSession = user.StateSession;
                    userSave.Email = user.Email;
                    userSave.PasswordApp = passwordHash;
                    userSave.IdRol = idRol;
                }

                _context.Entry(userSave).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!UserExists(id))
                    {
                        return NotFound("No existe el usuario");
                    }
                    else
                    {
                        throw;
                    }
                }

                responseUpdate.Status = "Ok";
                responseUpdate.StatusCode = 200;
                responseUpdate.Message = "Usuario actualizado correctamente!";

                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userAcces,
                    Class = "UserController",
                    Method = "PUT UpdateUser",
                    DescriptionProcess = "Se actualizo correctamente el usuario: " + user.UserName
                };
                util.LogProcess(logProcess);

                return Ok(responseUpdate);
            }
            catch (Exception e)
            {
                util.LogErrores("Error al actualizar usuario Error:. " + e.Message.ToString(), userAcces);
                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userAcces,
                    Class = "UserController",
                    Method = "PUT UpdateUser",
                    DescriptionProcess = "Error al actualizar usuario Error:. " + e.Message.ToString()
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

        public async Task<IActionResult> DeleteUsuario(int id)
        {
            var response = new ResponseModel();
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            userAcces = util.ObtenerToken(token);
            try
            {
                var user = await _context.Users.FindAsync(id);
                if (user == null)
                {
                    return NotFound();
                }

                _context.Users.Remove(user);
                await _context.SaveChangesAsync();


                response.Status = "Ok";
                response.StatusCode = 200;
                response.Message = "Usuario eliminado correctamente!";

                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userAcces,
                    Class = "UserController",
                    Method = "DELETE DeleteUsuario",
                    DescriptionProcess = "Se elimino correctamente el usuario: " + user.UserName
                };
                util.LogProcess(logProcess);

                return Ok(response);
            }
            catch (Exception e)
            {

                util.LogErrores("Error al eliminar usuario Error:. " + e.Message.ToString(), userAcces);
                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userAcces,
                    Class = "UserController",
                    Method = "DELETE DeleteUsuario",
                    DescriptionProcess = "Error al eliminar usuario Error:. " + e.Message.ToString()
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
        public ActionResult ListUsers()
        {
            var response = new ResponseModel();
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            userAcces = util.ObtenerToken(token);
            try
            {
                var user = _context.Users.ToListAsync().Result;
                List<UserResponseModel> userList = new(); 
                for (int i = 0; i < user.Count; i++)
                {
                    UserResponseModel userFor = new();
                    var id = user[i].Id;
                    var username = user[i].UserName;
                    var rolId = user[i].IdRol;
                    var status = user[i].StateSession;
                    var password = user[i].PasswordApp;
                    var email = user[i].Email;

                    RolModel rol = _context.Rol.FindAsync(rolId).Result;

                    userFor.Id = id;
                    userFor.UserName= username;
                    userFor.Email= email;
                    userFor.Rol = rol.NameRol;
                    userFor.StateSession = status;
                    userFor.PasswordApp = password;

                    userList.Add(userFor);

                }

                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userAcces,
                    Class = "UserController",
                    Method = "GET ListUsers",
                    DescriptionProcess = "Se listo los usuarios correctamente " 
                };
                util.LogProcess(logProcess);

                return Ok(userList);
            }
            catch (Exception e)
            {
                util.LogErrores("Error al listar los usuarios Error:. " + e.Message.ToString(), userAcces);
                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userAcces,
                    Class = "UserController",
                    Method = "GET ListUsers",
                    DescriptionProcess = "Error al listar los usuarios Error:. " + e.Message.ToString()
                };
                util.LogProcess(logProcess);

                response.Status = "Ok";
                response.StatusCode = 500;
                response.Message = e.Message.ToString();
                return BadRequest(response);

                throw;
            }
        }

        [HttpGet("UserId/{id}")]
        public async Task<ActionResult<UserResponseModel>> ListUserId(int id)
        {
            var response = new ResponseModel();
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            userAcces = util.ObtenerToken(token);
            try
            {           
                var user = await _context.Users.FindAsync(id);

                if (user == null)
                {
                    return NotFound();
                }
                UserResponseModel userResponse = new(); // aqui new clsViewUserIdResponse()

                var rol = await _context.Rol.FindAsync(user.IdRol);

                userResponse.Id = user.Id;
                userResponse.UserName = user.UserName;
                userResponse.Email = user.Email;
                userResponse.Rol = rol.NameRol;
                userResponse.Token = user.Token;
                userResponse.PasswordApp = user.PasswordApp;
                userResponse.PasswordApp2 = user.PasswordApp;
                userResponse.StateSession = user.StateSession;


                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userAcces,
                    Class = "UserController",
                    Method = "GET ListUserId",
                    DescriptionProcess = "Se listo el usuario con id: " + id.ToString() + " usuario: " + userResponse.UserName
                };
                util.LogProcess(logProcess);


                return Ok(userResponse);
            }
            catch (Exception e)
            {
                util.LogErrores("Error al listar el usuario Id: "+ id.ToString() + " Error:. " + e.Message.ToString(), userAcces);
                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userAcces,
                    Class = "UserController",
                    Method = "GET ListUserId",
                    DescriptionProcess = "Error al listar el usuario Id: " + id.ToString() + " Error:. " + e.Message.ToString()
                };
                util.LogProcess(logProcess);
                response.Status = "Ok";
                response.StatusCode = 500;
                response.Message = e.Message.ToString();
                return BadRequest(response);

                throw;
            }
        }


        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
