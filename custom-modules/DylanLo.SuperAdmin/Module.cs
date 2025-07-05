using Piranha;
using Piranha.Extend;
using Piranha.Manager;
using Piranha.Security;

namespace DylanLo.SuperAdmin;

public class Module : IModule
{
    private readonly List<PermissionItem> _permissions = new List<PermissionItem>
    {
        new PermissionItem { Name = Permissions.DylanLoSuperAdmin, Title = "List DylanLo.SuperAdmin content", Category = "DylanLo.SuperAdmin", IsInternal = true }
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

        // Register fields
        App.Fields.Register<Fields.CodeEditorField>();
        App.Fields.Register<Fields.SiteFilesUploaderField>();

        // Register blocks
        App.Blocks.Register<Blocks.CodeEditorBlock>();

        // Add manager menu items
        Menu.Items.Add(new MenuItem
        {
            InternalId = "DylanLo.SuperAdmin",
            Name = "DylanLo.SuperAdmin",
            Css = "fas fa-box"
        });
        Menu.Items["DylanLoSuperAdmin"].Items.Add(new MenuItem
        {
            InternalId = "DylanLo.SuperAdminStart",
            Name = "Module Start",
            Route = "~/manager/dylanlo.superadmin",
            Policy = Permissions.DylanLoSuperAdmin,
            Css = "fas fa-box"
        });

        // Register resources
        App.Modules.Manager().Scripts.Add("~/manager/DylanLo.SuperAdmin/js/codemirror.min.js");
        App.Modules.Manager().Styles.Add("~/manager/DylanLo.SuperAdmin/css/codemirror.min.css");
        
        // Register CodeMirror modes
        App.Modules.Manager().Scripts.Add("~/manager/DylanLo.SuperAdmin/js/mode/htmlmixed/htmlmixed.js");
        App.Modules.Manager().Scripts.Add("~/manager/DylanLo.SuperAdmin/js/mode/css/css.js");
        App.Modules.Manager().Scripts.Add("~/manager/DylanLo.SuperAdmin/js/mode/javascript/javascript.js");
        App.Modules.Manager().Scripts.Add("~/manager/DylanLo.SuperAdmin/js/mode/xml/xml.js");
        App.Modules.Manager().Scripts.Add("~/manager/DylanLo.SuperAdmin/js/addon/hint/show-hint.js");
        App.Modules.Manager().Styles.Add("~/manager/DylanLo.SuperAdmin/css/theme/material.css");

        // Register fields for site types
        App.Modules.Manager().Scripts.Add("~/manager/DylanLo.SuperAdmin/fields/code-editor-field.js");
        App.Modules.Manager().Styles.Add("~/manager/DylanLo.SuperAdmin/fields/code-editor-field.css");
        App.Modules.Manager().Scripts.Add("~/manager/DylanLo.SuperAdmin/fields/upload-file-field.js");
        App.Modules.Manager().Styles.Add("~/manager/DylanLo.SuperAdmin/fields/upload-file-field.css");

        // Register blocks for site types
        App.Modules.Manager().Scripts.Add("~/manager/DylanLo.SuperAdmin/blocks/code-editor-block.js");
        App.Modules.Manager().Styles.Add("~/manager/DylanLo.SuperAdmin/blocks/code-editor-block.css");
    }
}
