using ApiMedGestionAlert.DataBase;
using ApiMedGestionAlert.Model;
using Microsoft.VisualBasic;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security;

namespace ApiMedGestionAlert.Util
{

    public class Utilities
    {
        private readonly Context _context;

        public Utilities(Context context) {  
            _context = context; 
        }

        public String ObtenerToken(String token)
        {
            var jwtHandler = new JwtSecurityTokenHandler();
            var jwtToken = jwtHandler.ReadJwtToken(token);

            // Obtener información del payload (por ejemplo, el ID del usuario)
            var userIdClaim = jwtToken.Payload.Claims.FirstOrDefault();
            var userId = userIdClaim.Value;

            return userId.ToString();

        }

        public void LogErrores(String mensaje, string userName)
        {
            StreamWriter escribirLog;
            try
            {

                string fecha = Strings.Format(DateTime.Now, "yyyy-MM-dd");
                string hora = Strings.Format(DateTime.Now, "hh:mm:tt");
                //String rutaCompleta = System.IO.Path.GetTempPath();
                String rutaCompleta = "C:\\inetpub\\wwwroot\\AplicacionMedica\\";
                if (!Directory.Exists(rutaCompleta + "Log"))
                {
                    Directory.CreateDirectory(rutaCompleta + "\\Log");
                    rutaCompleta += "Log\\";
                }
                else
                {
                    rutaCompleta += "Log\\";
                }

                escribirLog = new StreamWriter(rutaCompleta + "Log_" + fecha + ".txt", true, System.Text.Encoding.Default);
                String texto = hora + ":: Usuario:: -->" + userName + "-->" + mensaje;

                escribirLog.WriteLine(texto);
                escribirLog.Close();
                escribirLog.Dispose();

            }
            catch (DirectoryNotFoundException e)
            {
                Trace.WriteLine(" Error al Generar Log:" + e.Message);
                throw;
            }
            catch (IOException e)
            {
                Trace.WriteLine(" Error al Generar Log:" + e.Message);
                throw;
            }
            catch (UnauthorizedAccessException e)
            {
                Trace.WriteLine(" Error al Generar Log:" + e.Message);
                throw;
            }
            catch (SecurityException e)
            {
                Trace.WriteLine(" Error al Generar Log:" + e.Message);
                throw;
            }
            catch (Exception e)
            {
                Trace.WriteLine(" Error al Generar Log:" + e.Message);
                throw;
            }
        }


        public void LogProcess(LogProcessModel logProcess)
        {
            try
            {
                LogProcessModel logProcessModel = new()
                {
                    DateProcess = logProcess.DateProcess,
                    UserProcess = logProcess.UserProcess,
                    Class = logProcess.Class,
                    Method = logProcess.Method,
                    DescriptionProcess = logProcess.DescriptionProcess
                };

                _context.LogProcess.Add(logProcessModel);
                _context.SaveChanges();
            }
            catch (Exception e)
            {
                LogErrores("Error al generar el log de processos " + e.Message.ToString(), logProcess.UserProcess);
                throw;
            }



           
        }

    }
}
