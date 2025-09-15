namespace ApiMedGestionAlert.Model
{
    public class AuthModel
    {
        public int Id { get; set; }
        public string Email { get; set; } = "";
        public string Rol { get; set; } = "";
        public string Message { get; set; } = "";
        public string Token { get; set; } = "";
        public string UserName { get; set; } = "";
    }
}
