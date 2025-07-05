using Piranha.AttributeBuilder;
using Piranha.Models;

namespace DylanLo.SuperWeb.Models;

/// <summary>
/// Represents a standard archive page type.
/// </summary>
/// <remarks>This class is used to define a page type that serves as an archive. It is marked as an archive
/// through the <see cref="PageTypeAttribute"/> with the <see cref="PageTypeAttribute.IsArchive"/> property set to <see
/// langword="true"/>.</remarks>
[PageType(Title = "Standard archive", IsArchive = true)]
public class StandardArchive : Page<StandardArchive>
{
}
