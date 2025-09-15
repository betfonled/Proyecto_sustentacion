namespace ApiMedGestionAlert.Model
{
    public class UserModel
    {
        public int Id {  get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public int IdRol {  get; set; }
        public string Token { get; set; }
        public string PasswordApp { get; set; } 
        public string StateSession { get; set; }

    }
}
