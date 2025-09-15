using System.ComponentModel.DataAnnotations;

namespace ApiMedGestionAlert.Model
{
    public class AuthRequestModel
    {
        [Required(ErrorMessage = "Email requerido")]
        public string Email { get; set; } = "";

        [Required(ErrorMessage = "Contraseña requerida!")]
        public string Password { get; set; } = "";
    }
}
