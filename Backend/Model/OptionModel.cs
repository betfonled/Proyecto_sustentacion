namespace ApiMedGestionAlert.Model
{
    public class OptionModel
    {
        public int Id { get; set; }
        public string OptionName { get; set; } = "";
        public int? IdFather { get; set; }  
        public string OrderOption { get; set; } = "";
        public  int? Children { get; set; }
    }
}
