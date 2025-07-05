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
public class CodeEditorField : SimpleField<CodeEditorField.CodeEditor>
{
    public CodeEditor Value { get; set; } = new CodeEditor();

    public class CodeEditor
    {
        // Placeholder for the actual implementation of the CodeEditor class
        // This class should handle the logic for the code editor field, such as rendering and validation.
        public string Html { get; set; }
        public string Css { get; set; }
        public string Js { get; set; }
    }
}
