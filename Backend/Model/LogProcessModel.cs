namespace ApiMedGestionAlert.Model
{
    public class LogProcessModel
    {
        public int Id { get; set; }
        public DateTime DateProcess{ get; set; }
        public string UserProcess { get; set; } = "";
        public string Class { get; set; } = "";
        public string Method { get; set; } = "";
        public string DescriptionProcess { get; set; } = "";
    }
}
