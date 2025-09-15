using Microsoft.AspNetCore.Mvc;

namespace ApiMedGestionAlert.Controllers
{
    public class AlertController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
