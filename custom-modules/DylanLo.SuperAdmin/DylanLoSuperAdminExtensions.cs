using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Piranha;
using Piranha.AspNetCore;
using DylanLo.SuperAdmin;

public static class DylanLoSuperAdminExtensions
{
    /// <summary>
    /// Adds the DylanLo.SuperAdmin module.
    /// </summary>
    /// <param name="serviceBuilder"></param>
    /// <returns></returns>
    public static PiranhaServiceBuilder UseDylanLoSuperAdmin(this PiranhaServiceBuilder serviceBuilder)
    {
        serviceBuilder.Services.AddDylanLoSuperAdmin();

        return serviceBuilder;
    }

    /// <summary>
    /// Uses the DylanLo.SuperAdmin module.
    /// </summary>
    /// <param name="applicationBuilder">The current application builder</param>
    /// <returns>The builder</returns>
    public static PiranhaApplicationBuilder UseDylanLoSuperAdmin(this PiranhaApplicationBuilder applicationBuilder)
    {
        applicationBuilder.Builder.UseDylanLoSuperAdmin();

        return applicationBuilder;
    }

    /// <summary>
    /// Adds the DylanLo.SuperAdmin module.
    /// </summary>
    /// <param name="services">The current service collection</param>
    /// <returns>The services</returns>
    public static IServiceCollection AddDylanLoSuperAdmin(this IServiceCollection services)
    {
        // Add the DylanLo.SuperAdmin module
        Piranha.App.Modules.Register<Module>();

        // Setup authorization policies
        services.AddAuthorization(o =>
        {
            // DylanLo.SuperAdmin policies
            o.AddPolicy(Permissions.DylanLoSuperAdmin, policy =>
            {
                policy.RequireClaim(Permissions.DylanLoSuperAdmin, Permissions.DylanLoSuperAdmin);
            });
        });

        // Return the service collection
        return services;
    }

    /// <summary>
    /// Uses the DylanLo.SuperAdmin.
    /// </summary>
    /// <param name="builder">The application builder</param>
    /// <returns>The builder</returns>
    public static IApplicationBuilder UseDylanLoSuperAdmin(this IApplicationBuilder builder)
    {
        return builder.UseStaticFiles(new StaticFileOptions
        {
            FileProvider = new EmbeddedFileProvider(typeof(Module).Assembly, "DylanLo.SuperAdmin.assets.dist"),
            RequestPath = "/manager/DylanLo.SuperAdmin"
        });
    }

    /// <summary>
    /// Static accessor to DylanLo.SuperAdmin module if it is registered in the Piranha application.
    /// </summary>
    /// <param name="modules">The available modules</param>
    /// <returns>The DylanLo.SuperAdmin module</returns>
    public static Module DylanLoSuperAdmin(this Piranha.Runtime.AppModuleList modules)
    {
        return modules.Get<Module>();
    }
}
