using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DylanLo.SuperAdmin.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SuperSiteConfigController : ControllerBase
    {

        private readonly Services.SuperSiteConfigService _service;
        public SuperSiteConfigController(
            Services.SuperSiteConfigService service)
        {
            _service = service ?? throw new ArgumentNullException(nameof(service));
        }


        [HttpPost("upload-theme-statics/{siteId?}")]
        [Consumes("multipart/form-data")]
        [Authorize(Policy = Piranha.Manager.Permission.Sites)]
        public async Task<IActionResult> UploadThemeStatics(Guid? siteId)
        {
            try
            {
                await _service.SaveStaticFiles(siteId?.ToString() ?? string.Empty, Request.Form.Files);
                return Ok(new { message = "Files uploaded successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
