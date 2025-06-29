using Piranha;
using Piranha.Extend;
using Piranha.Manager;
using Piranha.Security;

namespace DylanLo.SuperAdmin;

public class Module : IModule
{
    private readonly List<PermissionItem> _permissions = new List<PermissionItem>
    {
        new PermissionItem { Name = Permissions.DylanLo.SuperAdmin, Title = "List DylanLo.SuperAdmin content", Category = "DylanLo.SuperAdmin", IsInternal = true },
        new PermissionItem { Name = Permissions.DylanLo.SuperAdminAdd, Title = "Add DylanLo.SuperAdmin content", Category = "DylanLo.SuperAdmin", IsInternal = true },
        new PermissionItem { Name = Permissions.DylanLo.SuperAdminEdit, Title = "Edit DylanLo.SuperAdmin content", Category = "DylanLo.SuperAdmin", IsInternal = true },
        new PermissionItem { Name = Permissions.DylanLo.SuperAdminDelete, Title = "Delete DylanLo.SuperAdmin content", Category = "DylanLo.SuperAdmin", IsInternal = true }
    };

    /// <summary>
    /// Gets the module author
    /// </summary>
    public string Author => "";

    /// <summary>
    /// Gets the module name
    /// </summary>
    public string Name => "";

    /// <summary>
    /// Gets the module version
    /// </summary>
    public string Version => Utils.GetAssemblyVersion(GetType().Assembly);

    /// <summary>
    /// Gets the module description
    /// </summary>
    public string Description => "";

    /// <summary>
    /// Gets the module package url
    /// </summary>
    public string PackageUrl => "";

    /// <summary>
    /// Gets the module icon url
    /// </summary>
    public string IconUrl => "/manager/PiranhaModule/piranha-logo.png";

    public void Init()
    {
        // Register permissions
        foreach (var permission in _permissions)
        {
            App.Permissions["DylanLo.SuperAdmin"].Add(permission);
        }

        // Add manager menu items
        Menu.Items.Add(new MenuItem
        {
            InternalId = "DylanLo.SuperAdmin",
            Name = "DylanLo.SuperAdmin",
            Css = "fas fa-box"
        });
        Menu.Items["DylanLo.SuperAdmin"].Items.Add(new MenuItem
        {
            InternalId = "DylanLo.SuperAdminStart",
            Name = "Module Start",
            Route = "~/manager/dylanlo.superadmin",
            Policy = Permissions.DylanLo.SuperAdmin,
            Css = "fas fa-box"
        });
    }
}
