# Upload File Field and Block for Piranha CMS

## Overview

The Upload File Field and Block components allow content editors to upload and manage files, particularly CSS and JavaScript files, that can be used in client-side applications. These components are particularly useful for custom styling and scripting that needs to be included in web pages.

## Features

- Upload and manage CSS, JavaScript, and other text files
- Include files automatically in web pages or provide manual inclusion options
- Configure loading options for JavaScript files (async, defer)
- Display file information (size, type, upload date)
- Add descriptions to uploaded files

## Components

### UploadFileField

The `UploadFileField` is a field type that allows users to upload and manage files. It can be used in any content type, such as pages, posts, or site types.

#### Properties

- `Filename`: The name of the uploaded file
- `ContentType`: The MIME type of the file
- `Size`: The size of the file in bytes
- `PublicUrl`: The public URL where the file can be accessed
- `UploadDate`: The date and time when the file was uploaded
- `Description`: A description of the file

### UploadFileBlock

The `UploadFileBlock` is a block type that uses the `UploadFileField` to provide a complete interface for uploading and managing files within content. It includes additional configuration options for how the file should be included in web pages.

#### Properties

- `File`: The uploaded file (UploadFileField)
- `Title`: A title for the file
- `Description`: A description for the file
- `FileType`: The type of file (CSS, JavaScript, or Other)
- `IncludeAutomatically`: Whether the file should be included automatically when the page is displayed
- `LoadAsync`: Whether the JavaScript file should be loaded asynchronously
- `Defer`: Whether the JavaScript file should be deferred

## Usage

### Adding the UploadFileField to a Content Type

```csharp
public class MyContentType : ContentBase<MyContentType>
{
    [Region]
    public UploadFileField CustomCSS { get; set; }
}
```

### Using the UploadFileBlock in Content

1. Edit a page or post in the Piranha CMS manager
2. Add a new block and select "Upload File"
3. Upload a file (CSS, JavaScript, or other text file)
4. Configure the block settings:
   - Add a title and description
   - Select the file type
   - Choose whether to include the file automatically
   - For JavaScript files, configure async and defer options
5. Save the content

### Rendering the UploadFileBlock

The `UploadFileBlock` is rendered using the `UploadFileBlock.cshtml` display template. If `IncludeAutomatically` is set to true, the file will be automatically included in the page:

- CSS files are included using a `<link>` tag
- JavaScript files are included using a `<script>` tag with the configured async and defer options

If `IncludeAutomatically` is set to false, the block will display a download link and buttons to manually include the file.

## Frontend Assets

The following frontend assets are included for the UploadFileBlock:

- `upload-file-block.css`: Styles for the UploadFileBlock display
- `upload-file-block.js`: JavaScript functionality for the UploadFileBlock

These files should be included in your layout template to ensure proper display and functionality.

## Implementation Details

### Backend

- `UploadFileField.cs`: Defines the field type for uploading and managing files
- `UploadFileBlock.cs`: Defines the block type for embedding uploaded files

### Manager UI

- `upload-file-field.js`: Vue component for the field in the manager
- `upload-file-field.css`: Styles for the field in the manager
- `upload-file-block.js`: Vue component for the block in the manager
- `upload-file-block.css`: Styles for the block in the manager

### Frontend

- `UploadFileBlock.cshtml`: Display template for rendering the block
- `upload-file-block.css`: Styles for the block on the frontend
- `upload-file-block.js`: JavaScript functionality for the block on the frontend

## Requirements

- Piranha CMS 12.0.0 or later
- Font Awesome for icons
- Bootstrap 5 for styling