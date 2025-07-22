using Piranha.Extend;
using Piranha.Extend.Fields;
using DylanLo.SuperAdmin.Fields;

namespace DylanLo.SuperAdmin.Blocks;

/// <summary>
/// Block for embedding HTML, CSS, and JavaScript code snippets.
/// </summary>
/// <remarks>
/// This block allows content editors to add code snippets with syntax highlighting
/// for HTML, CSS, and JavaScript. The code can be rendered directly in templates
/// or used for dynamic content generation.
/// </remarks>
[BlockType(Name = "Code Editor", Category = "Content", Icon = "fas fa-code", Component = "code-editor-block")]
public class CodeEditorBlock : Block
{
    /// <summary>
    /// Gets or sets the code editor field containing HTML, CSS, and JavaScript code.
    /// </summary>
    public CodeEditorField Code { get; set; } = new CodeEditorField();
}