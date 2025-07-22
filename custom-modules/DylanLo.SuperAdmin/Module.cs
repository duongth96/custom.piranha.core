using DylanLo.SuperAdmin;
using Piranha;
using Piranha.Extend;
using Piranha.Manager;
using Piranha.Security;

namespace DylanLo.SuperAdmin;

public class Module : IModule
{
    private readonly List<PermissionItem> _permissions = new List<PermissionItem>
    {
        new PermissionItem { Name = Permissions.DylanLoSuperAdmin, Title = "List DylanLoSuperAdmin content", Category = "DylanLoSuperAdmin", IsInternal = true }
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
            App.Permissions["DylanLoSuperAdmin"].Add(permission);
        }

        // Register fields
        App.Fields.Register<DylanLo.SuperAdmin.Fields.CodeEditorField>();
        App.Fields.Register<DylanLo.SuperAdmin.Fields.SiteFilesUploaderField>();

        // Register blocks
        App.Blocks.Register<DylanLo.SuperAdmin.Blocks.CodeEditorBlock>();

        // Add manager menu items
        Menu.Items.Add(new MenuItem
        {
            InternalId = "DylanLoSuperAdmin",
            Name = "DylanLoSuperAdmin",
            Css = "fas fa-box"
        });
        //Menu.Items["DylanLoSuperAdmin"].Items.Add(new MenuItem
        //{
        //    InternalId = "DylanLoSuperAdminStart",
        //    Name = "Module Start",
        //    Route = "~/manager/DylanLoSuperAdmin",
        //    Policy = Permissions.DylanLoSuperAdmin,
        //    Css = "fas fa-box"
        //});

        // Register resources
        App.Modules.Manager().Scripts.Add("~/manager/DylanLoSuperAdmin/codemirror/js/codemirror.min.js");
        App.Modules.Manager().Styles.Add("~/manager/DylanLoSuperAdmin/codemirror/css/codemirror.min.css");

        // Register CodeMirror modes
        App.Modules.Manager().Scripts.Add("~/manager/DylanLoSuperAdmin/codemirror/js/mode/htmlmixed/htmlmixed.min.js");
        App.Modules.Manager().Scripts.Add("~/manager/DylanLoSuperAdmin/codemirror/js/mode/css/css.min.js");
        App.Modules.Manager().Scripts.Add("~/manager/DylanLoSuperAdmin/codemirror/js/mode/javascript/javascript.min.js");
        App.Modules.Manager().Scripts.Add("~/manager/DylanLoSuperAdmin/codemirror/js/mode/xml/xml.min.js");
        App.Modules.Manager().Scripts.Add("~/manager/DylanLoSuperAdmin/codemirror/js/addon/hint/show-hint.min.js");
        App.Modules.Manager().Styles.Add("~/manager/DylanLoSuperAdmin/codemirror/css/theme/material.min.css");

        // Register fields for site types
        App.Modules.Manager().Scripts.Add("~/manager/DylanLoSuperAdmin/fields/code-editor-field.js");
        App.Modules.Manager().Styles.Add("~/manager/DylanLoSuperAdmin/fields/code-editor-field.css");
        App.Modules.Manager().Scripts.Add("~/manager/DylanLoSuperAdmin/fields/upload-file-field.js");
        App.Modules.Manager().Styles.Add("~/manager/DylanLoSuperAdmin/fields/upload-file-field.css");

        // Register blocks for site types
        App.Modules.Manager().Scripts.Add("~/manager/DylanLoSuperAdmin/blocks/code-editor-block.js");
        App.Modules.Manager().Styles.Add("~/manager/DylanLoSuperAdmin/blocks/code-editor-block.css");
    }
}
