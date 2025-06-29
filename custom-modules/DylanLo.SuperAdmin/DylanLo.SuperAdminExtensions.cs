using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Piranha;
using Piranha.AspNetCore;
using DylanLo.SuperAdmin;

public static class DylanLo.SuperAdminExtensions
{
    /// <summary>
    /// Adds the DylanLo.SuperAdmin module.
    /// </summary>
    /// <param name="serviceBuilder"></param>
    /// <returns></returns>
    public static PiranhaServiceBuilder UseDylanLo.SuperAdmin(this PiranhaServiceBuilder serviceBuilder)
    {
        serviceBuilder.Services.AddDylanLo.SuperAdmin();

        return serviceBuilder;
    }

    /// <summary>
    /// Uses the DylanLo.SuperAdmin module.
    /// </summary>
    /// <param name="applicationBuilder">The current application builder</param>
    /// <returns>The builder</returns>
    public static PiranhaApplicationBuilder UseDylanLo.SuperAdmin(this PiranhaApplicationBuilder applicationBuilder)
    {
        applicationBuilder.Builder.UseDylanLo.SuperAdmin();

        return applicationBuilder;
    }

    /// <summary>
    /// Adds the DylanLo.SuperAdmin module.
    /// </summary>
    /// <param name="services">The current service collection</param>
    /// <returns>The services</returns>
    public static IServiceCollection AddDylanLo.SuperAdmin(this IServiceCollection services)
    {
        // Add the DylanLo.SuperAdmin module
        Piranha.App.Modules.Register<Module>();

        // Setup authorization policies
        services.AddAuthorization(o =>
        {
            // DylanLo.SuperAdmin policies
            o.AddPolicy(Permissions.DylanLo.SuperAdmin, policy =>
            {
                policy.RequireClaim(Permissions.DylanLo.SuperAdmin, Permissions.DylanLo.SuperAdmin);
            });

            // DylanLo.SuperAdmin add policy
            o.AddPolicy(Permissions.DylanLo.SuperAdminAdd, policy =>
            {
                policy.RequireClaim(Permissions.DylanLo.SuperAdmin, Permissions.DylanLo.SuperAdmin);
                policy.RequireClaim(Permissions.DylanLo.SuperAdminAdd, Permissions.DylanLo.SuperAdminAdd);
            });

            // DylanLo.SuperAdmin edit policy
            o.AddPolicy(Permissions.DylanLo.SuperAdminEdit, policy =>
            {
                policy.RequireClaim(Permissions.DylanLo.SuperAdmin, Permissions.DylanLo.SuperAdmin);
                policy.RequireClaim(Permissions.DylanLo.SuperAdminEdit, Permissions.DylanLo.SuperAdminEdit);
            });

            // DylanLo.SuperAdmin delete policy
            o.AddPolicy(Permissions.DylanLo.SuperAdminDelete, policy =>
            {
                policy.RequireClaim(Permissions.DylanLo.SuperAdmin, Permissions.DylanLo.SuperAdmin);
                policy.RequireClaim(Permissions.DylanLo.SuperAdminDelete, Permissions.DylanLo.SuperAdminDelete);
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
    public static IApplicationBuilder UseDylanLo.SuperAdmin(this IApplicationBuilder builder)
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
    public static Module DylanLo.SuperAdmin(this Piranha.Runtime.AppModuleList modules)
    {
        return modules.Get<Module>();
    }
}
