using Piranha.Extend;
using Piranha.Extend.Fields;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DylanLo.SuperAdmin.Fields;

/// <summary>
/// Represents a field type for uploading and managing files, particularly CSS and JavaScript files.
/// </summary>
/// <remarks>
/// This field type is designed for scenarios where file uploads are required, such as in web
/// development tools or content management systems. It provides a container for managing uploaded files
/// that can be used in client-side applications.
/// </remarks>
[FieldType(Name = "Upload File", Shorthand = "uploadfile", Component = "upload-file-field")]
public class SiteFilesUploaderField : SimpleField<SiteFilesUploaderField.UploadFile>
{
    /// <summary>
    /// Gets or sets the value of the upload file field.
    /// </summary>
    public UploadFile Value { get; set; } = new UploadFile();

    /// <summary>
    /// Represents an uploaded file with its metadata and content.
    /// </summary>
    public class UploadFile
    {
        /// <summary>
        /// Gets or sets the ID of the uploaded file.
        /// </summary>
        public Guid Id { get; set; } = Guid.NewGuid();

        /// <summary>
        /// Gets or sets the filename of the uploaded file.
        /// </summary>
        public string Filename { get; set; }

        /// <summary>
        /// Gets or sets the MIME type of the uploaded file.
        /// </summary>
        public string ContentType { get; set; }

        /// <summary>
        /// Gets or sets the size of the uploaded file in bytes.
        /// </summary>
        public long Size { get; set; }

        /// <summary>
        /// Gets or sets the public URL where the file can be accessed.
        /// </summary>
        public string PublicUrl { get; set; }

        /// <summary>
        /// Gets or sets the upload date of the file.
        /// </summary>
        public DateTime UploadDate { get; set; } = DateTime.Now;

        /// <summary>
        /// Gets or sets a description for the uploaded file.
        /// </summary>
        public string Description { get; set; }
    }

    /// <summary>
    /// Implicit operator for converting a string to an UploadFileField.
    /// </summary>
    /// <param name="str">The string to convert</param>
    public static implicit operator SiteFilesUploaderField(string str)
    {
        var field = new SiteFilesUploaderField
        {
            Value = new UploadFile
            {
                PublicUrl = str
            }
        };

        // Try to get the filename from the URL
        if (!string.IsNullOrWhiteSpace(str))
        {
            try
            {
                field.Value.Filename = str.Substring(str.LastIndexOf('/') + 1);
            }
            catch { }
        }

        return field;
    }

    /// <summary>
    /// Implicit operator for converting an UploadFileField to a string.
    /// </summary>
    /// <param name="field">The field</param>
    public static implicit operator string(SiteFilesUploaderField field)
    {
        if (field.Value != null && !string.IsNullOrWhiteSpace(field.Value.PublicUrl))
        {
            return field.Value.PublicUrl;
        }
        return "";
    }

    /// <summary>
    /// Gets the hash code for the field.
    /// </summary>
    /// <returns>The hash code</returns>
    public override int GetHashCode()
    {
        return Value?.PublicUrl?.GetHashCode() ?? 0;
    }

    /// <summary>
    /// Checks if the given object is equal to the field.
    /// </summary>
    /// <param name="obj">The object</param>
    /// <returns>True if the fields are equal</returns>
    public override bool Equals(object obj)
    {
        if (obj is SiteFilesUploaderField field)
        {
            return field.Value?.PublicUrl == Value?.PublicUrl;
        }
        return false;
    }
}