using Piranha.AttributeBuilder;
using Piranha.Extend;
using Piranha.Models;

namespace DylanLo.SuperWeb.Models;

[PageType(Title = "Standard page")]
public class StandardPage  : Page<StandardPage>
{
    [Region(Title = "Config")]
    public PageSettingRegion Config { get; set; }
}
