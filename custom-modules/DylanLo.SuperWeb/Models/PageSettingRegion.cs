using DylanLo.SuperAdmin.Fields;
using Piranha.Extend;
using Piranha.Extend.Fields;
using Piranha.Models;

namespace DylanLo.SuperWeb.Models
{
    public class PageSettingRegion
    {
        [Field(Title = "Template", Placeholder ="HTML")]
        public CodeEditorField Template { get; set; }
    }
}
