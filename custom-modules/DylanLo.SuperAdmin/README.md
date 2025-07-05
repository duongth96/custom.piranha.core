# DylanLo.SuperAdmin Module for Piranha CMS

This module extends Piranha CMS with additional functionality, including a Code Editor field and Code Editor block for managing HTML, CSS, and JavaScript code snippets.

## Features

### Code Editor Field and Block

The Code Editor field and block allow content editors to manage HTML, CSS, and JavaScript code snippets within Piranha CMS. They provide a tabbed interface with syntax highlighting and code completion for each language.

- **Code Editor Field**: Use this field in your custom content types to add code editing capabilities.
- **Code Editor Block**: Use this block in your content areas to add code snippets that can be displayed or rendered directly on your pages.

#### Dependencies

The Code Editor field relies on the following dependencies:

- [CodeMirror](https://codemirror.net/) - A versatile text editor implemented in JavaScript for the browser

#### Installation

1. Download CodeMirror from https://codemirror.net/
2. Extract the following files to the appropriate directories in your module:

```
/assets/dist/js/codemirror.min.js
/assets/dist/css/codemirror.min.css
/assets/dist/js/mode/htmlmixed/htmlmixed.js
/assets/dist/js/mode/css/css.js
/assets/dist/js/mode/javascript/javascript.js
/assets/dist/js/mode/xml/xml.js
/assets/dist/js/addon/hint/show-hint.js
/assets/dist/css/theme/material.css
```

#### Usage

##### Using the Code Editor Field

To use the Code Editor field in your models:

```csharp
using DylanLo.SuperAdmin.Fields;

public class MyModel
{
    [Field(Title = "Code Editor")]
    public CodeEditorField CodeSnippet { get; set; }
}
```

In your views, you can access the HTML, CSS, and JavaScript values:

```cshtml
<div>
    <style>
        @Model.CodeSnippet.Value.Css
    </style>
    
    @Html.Raw(Model.CodeSnippet.Value.Html)
    
    <script>
        @Model.CodeSnippet.Value.Js
    </script>
</div>
```

##### Using the Code Editor Block

The Code Editor Block is automatically available in the content editor's block selection menu. It provides the following features:

- Title and description fields for labeling your code snippets
- Option to render the code directly on the page or display it as syntax-highlighted code
- Expandable editor interface for better editing experience

To use the Code Editor Block in your templates, ensure you have the display template in your project:

```cshtml
@* Pages/DisplayTemplates/CodeEditorBlock.cshtml *@
@model DylanLo.SuperAdmin.Blocks.CodeEditorBlock
```

The display template will automatically handle rendering the code either as syntax-highlighted code blocks or by executing the HTML, CSS, and JavaScript directly on the page.

## License

This module is licensed under the MIT license.