using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DylanLo.SuperAdmin.Abtractions.Services
{
    public interface ISuperSiteStaticFileService
    {
        Task UploadFileAsync(Guid siteId, IEnumerable<Microsoft.AspNetCore.IFormFile>);
    }
}
