using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DylanLo.SuperAdmin.Services
{
    /// <summary>
    /// Manages static files for a site, such as CSS and JavaScript files.
    /// </summary>
    public class SiteStaticFileService
    {

        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IWebHostEnvironment _env;

        public SiteStaticFileService(
            IHttpContextAccessor httpContextAccessor,
            IWebHostEnvironment env)
        {
            _httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
            _env = env ?? throw new ArgumentNullException(nameof(env));
        }

        /// <summary>
        /// Saves files for a specific site.
        /// </summary>
        /// <param name="siteId"></param>
        /// <param name="files"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public Task SaveFiles(string siteId, IEnumerable<IFormFile> files)
        {

            if (string.IsNullOrEmpty(siteId)) throw new ArgumentException("Site ID cannot be null or empty.", nameof(siteId));
            var wwwrootPath = _env.WebRootPath;
            var sitePath = System.IO.Path.Combine(wwwrootPath, "sites", siteId);
            if (!Directory.Exists(sitePath))
            {
                Directory.CreateDirectory(sitePath);
            }
            try
            {
                if (files == null || !files.Any())
                {
                    throw new ArgumentException("No files provided to save.", nameof(files));
                }
                // accept all file is css or js
                foreach (var file in files)
                {
                    if (file.Length == 0)
                    {
                        throw new ArgumentException($"File {file.FileName} is empty.", nameof(files));
                    }
                    var extension = System.IO.Path.GetExtension(file.FileName).ToLowerInvariant();
                    if (extension != ".css" && extension != ".js")
                    {
                        throw new ArgumentException($"File {file.FileName} is not a valid CSS or JavaScript file.", nameof(files));
                    }
                }
                foreach (var file in files)
                {
                    if (file.Length > 0)
                    {
                        var filePath = System.IO.Path.Combine(sitePath, file.FileName);
                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions such as file write errors
                throw new Exception("An error occurred while saving files.", ex);
            }
            return Task.CompletedTask;
        }
        /// <summary>
        /// Get files for a specific site.
        /// </summary>
        /// <param name="siteId"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public Task<IEnumerable<string>> GetFiles(string siteId)
        {
            // Implement logic to retrieve files for the specified site
            // This could involve querying a database or file system
            throw new NotImplementedException("GetFiles method is not implemented yet.");
        }
    }
}
