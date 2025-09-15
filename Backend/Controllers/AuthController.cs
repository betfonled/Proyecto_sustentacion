using ApiMedGestionAlert.DataBase;
using ApiMedGestionAlert.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCryptNet = BCrypt.Net.BCrypt;
using ApiMedGestionAlert.Util;


namespace ApiMedGestionAlert.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class AuthController : Controller
    {
        private readonly Context _context;
        private readonly IConfiguration _configuration;
        private readonly Utilities util;
        

        public AuthController(Context context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
            util = new Utilities(_context);
        }


        [HttpPost]
        [Route("login")]
        public ActionResult<AuthModel> Login([FromBody] AuthRequestModel dataLogin)
        {
            try
            {
                var user = _context.Users.SingleOrDefault(x=> x.Email == dataLogin.Email);

                if ( user== null || !BCryptNet.Verify(dataLogin.Password, user.PasswordApp))
                {
                    LogProcessModel logProcess1 = new()
                    {
                        DateProcess = DateTime.Now,
                        UserProcess = dataLogin.Email,
                        Class = "AuthController",
                        Method = "POST Login",
                        DescriptionProcess = "Credenciales incorrectas"
                    };
                    util.LogProcess(logProcess1);
                    return NotFound("Credenciales incorrectas");
                }

                var secretKey = _configuration.GetValue<string>("secretKey");
                var key = Encoding.UTF8.GetBytes(secretKey);
                var claims = new ClaimsIdentity();
                claims.AddClaim(new Claim(ClaimTypes.NameIdentifier, dataLogin.Email));

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = claims,
                    Expires = DateTime.UtcNow.AddHours(4),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var createdToken = tokenHandler.CreateToken(tokenDescriptor);
                String bearerToken = tokenHandler.WriteToken(createdToken);

                var id = user.Id;
                var rol = _context.Rol.FindAsync(user.IdRol).Result;
                var userApp = _context.Users.FindAsync(id).Result;

                userApp.Token = bearerToken;
                _context.Entry(userApp).State = EntityState.Modified;
                _context.SaveChanges();

                AuthModel response = new();
                response.Id = id;
                response.Token = bearerToken;
                response.Rol = rol.NameRol;
                response.Email = dataLogin.Email;
                response.Message = "OK";
                response.UserName = userApp.UserName;


                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess = userApp.UserName,
                    Class = "AuthController",
                    Method = "POST Login",
                    DescriptionProcess = "Se accedio correctamente a la aplicación" 
                };
                util.LogProcess(logProcess);


                return response;
            }
            catch (Exception e)
            {
                util.LogErrores("Error al acceder en la aplicacion: " + e.Message.ToString(), dataLogin.Email);
                LogProcessModel logProcess = new()
                {
                    DateProcess = DateTime.Now,
                    UserProcess= dataLogin.Email,
                    Class= "AuthController",
                    Method= "POST Login",
                    DescriptionProcess= "Error al acceder en la aplicacion Error:. " + e.Message.ToString()
                };
                util.LogProcess(logProcess);
                throw;
            }

        }
    }
}
