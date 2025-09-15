using System.Collections;

namespace ApiMedGestionAlert.Model
{
    public class ResponseModel
    {
        public int? StatusCode { get; set; }
        public string? Status { get; set; }
        public string? Message { get; set; }
        public IList? Data { get; set; }
    }
}
