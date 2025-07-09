using Piranha.Extend;
using Piranha.Extend.Fields;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DylanLo.SuperAdmin.Fields;

/// <summary>
/// Represents a field type for a code editor, allowing users to input and manage HTML, CSS, and JavaScript code.
/// </summary>
/// <remarks>This field type is designed for scenarios where structured code input is required, such as in web
/// development tools or content management systems. It provides a container for managing code snippets in multiple
/// languages.</remarks>
[FieldType(Name = "Code Editor", Shorthand = "codeeditor", Component = "code-editor-field")]
public class CodeEditorField : SimpleField<string>
{
    public string Value { get; set; } = string.Empty;

    
}
