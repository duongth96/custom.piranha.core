using Piranha.AttributeBuilder;
using Piranha.Models;
using DylanLo.SuperAdmin.Fields;
using Piranha.Extend;
using Piranha.Extend.Fields;

namespace DylanLo.SuperAdmin.Models.SiteTypes;


/// <summary>
/// More powerful than a standard site,
/// with additional features and capabilities.
/// </summary>
[SiteType(
    Title = "Super site", 
    Description = @"More powerful than a standard site, with additional features and capabilities.")]
public class SuperSite : SiteContent<SuperSite>
{
    #region Header
    /// <summary>
    /// Gets or sets the header template configuration.
    /// </summary>
    [Region(Title = "Header Configuration", Display = RegionDisplayMode.Setting)]
    public HeaderRegion Header { get; set; }

    /// <summary>
    /// Header region with template configuration options.
    /// </summary>
    public class HeaderRegion
    {
        /// <summary>
        /// Gets or sets the HTML template for the header.
        /// </summary>
        [Field(Title = "Header Template", Description = "HTML, CSS, and JavaScript for the site header")]
        public CodeEditorField Template { get; set; }

        /// <summary>
        /// Gets or sets whether the header is sticky.
        /// </summary>
        [Field(Title = "Sticky Header")]
        public CheckBoxField IsSticky { get; set; }

        /// <summary>
        /// Gets or sets the header logo.
        /// </summary>
        [Field(Title = "Header Logo")]
        public ImageField Logo { get; set; }
    }
    #endregion

    #region Footer
    /// <summary>
    /// Gets or sets the footer template configuration.
    /// </summary>
    [Region(Title = "Footer Configuration", Display = RegionDisplayMode.Setting)]
    public FooterRegion Footer { get; set; }

    /// <summary>
    /// Footer region with template configuration options.
    /// </summary>
    public class FooterRegion
    {
        /// <summary>
        /// Gets or sets the HTML template for the footer.
        /// </summary>
        [Field(Title = "Footer Template", Description = "HTML, CSS, and JavaScript for the site footer")]
        public CodeEditorField Template { get; set; }

        /// <summary>
        /// Gets or sets the copyright text.
        /// </summary>
        [Field(Title = "Copyright Text")]
        public StringField Copyright { get; set; }

        /// <summary>
        /// Gets or sets whether to show social media links.
        /// </summary>
        [Field(Title = "Show Social Media")]
        public CheckBoxField ShowSocialMedia { get; set; }
    }
    #endregion

    #region Global Settings
    /// <summary>
    /// Gets or sets the global site settings.
    /// </summary>
    [Region(Title = "Global Settings", Display = RegionDisplayMode.Setting)]
    public GlobalSettingsRegion GlobalSettings { get; set; }

    /// <summary>
    /// Global settings region with site-wide configuration options.
    /// </summary>
    public class GlobalSettingsRegion
    {
        /// <summary>
        /// Gets or sets the custom CSS and JavaScript for the entire site.
        /// </summary>
        [Field(Title = "Custom CSS/JS", Description = "Add custom CSS and JavaScript that will be applied site-wide")]
        public CodeEditorField CustomCode { get; set; }

        /// <summary>
        /// Gets or sets the site favicon.
        /// </summary>
        [Field(Title = "Favicon")]
        public ImageField Favicon { get; set; }

        /// <summary>
        /// Gets or sets the Google Analytics tracking ID.
        /// </summary>
        [Field(Title = "Google Analytics ID")]
        public StringField GoogleAnalyticsId { get; set; }

        /// <summary>
        /// Gets or sets whether to enable dark mode support.
        /// </summary>
        [Field(Title = "Enable Dark Mode Support")]
        public CheckBoxField EnableDarkMode { get; set; }
    }
    #endregion

    #region SEO Settings
    /// <summary>
    /// Gets or sets the SEO settings for the site.
    /// </summary>
    [Region(Title = "SEO Settings", Display = RegionDisplayMode.Setting)]
    public SeoSettingsRegion SeoSettings { get; set; }

    /// <summary>
    /// SEO settings region with meta tags and search engine configuration.
    /// </summary>
    public class SeoSettingsRegion
    {
        /// <summary>
        /// Gets or sets the default meta description.
        /// </summary>
        [Field(Title = "Default Meta Description", Description = "Default description used when a page doesn't have a specific one")]
        public TextField DefaultMetaDescription { get; set; }

        /// <summary>
        /// Gets or sets the default meta keywords.
        /// </summary>
        [Field(Title = "Default Meta Keywords", Description = "Default keywords used when a page doesn't have specific ones")]
        public StringField DefaultMetaKeywords { get; set; }

        /// <summary>
        /// Gets or sets the custom meta tags template.
        /// </summary>
        [Field(Title = "Custom Meta Tags", Description = "Add custom meta tags using HTML")]
        public CodeEditorField CustomMetaTags { get; set; }

        /// <summary>
        /// Gets or sets whether to enable Open Graph tags.
        /// </summary>
        [Field(Title = "Enable Open Graph Tags")]
        public CheckBoxField EnableOpenGraph { get; set; }

        /// <summary>
        /// Gets or sets whether to enable Twitter Card tags.
        /// </summary>
        [Field(Title = "Enable Twitter Cards")]
        public CheckBoxField EnableTwitterCards { get; set; }
    }
    #endregion

    #region Theme Customization
    /// <summary>
    /// Gets or sets the theme customization options.
    /// </summary>
    [Region(Title = "Theme Customization", Display = RegionDisplayMode.Setting)]
    public ThemeCustomizationRegion ThemeCustomization { get; set; }

    /// <summary>
    /// Theme customization region with options for styling the site.
    /// </summary>
    public class ThemeCustomizationRegion
    {
        /// <summary>
        /// Gets or sets the primary color.
        /// </summary>
        [Field(Title = "Primary Color")]
        public StringField PrimaryColor { get; set; }

        /// <summary>
        /// Gets or sets the secondary color.
        /// </summary>
        [Field(Title = "Secondary Color")]
        public StringField SecondaryColor { get; set; }

        /// <summary>
        /// Gets or sets the background color.
        /// </summary>
        [Field(Title = "Background Color")]
        public StringField BackgroundColor { get; set; }

        /// <summary>
        /// Gets or sets the text color.
        /// </summary>
        [Field(Title = "Text Color")]
        public StringField TextColor { get; set; }

        /// <summary>
        /// Gets or sets the custom CSS variables.
        /// </summary>
        [Field(Title = "Custom CSS Variables", Description = "Define custom CSS variables for theme customization")]
        public CodeEditorField CustomCssVariables { get; set; }

        /// <summary>
        /// Gets or sets the font family for headings.
        /// </summary>
        [Field(Title = "Heading Font")]
        public StringField HeadingFont { get; set; }

        /// <summary>
        /// Gets or sets the font family for body text.
        /// </summary>
        [Field(Title = "Body Font")]
        public StringField BodyFont { get; set; }
    }
    #endregion
}
