namespace HumTech.Api.Models;

public class HeroSection : EntityBase
{
    public string Title { get; set; } = string.Empty;
    public string Subtitle { get; set; } = string.Empty;
    public string PrimaryCtaLabel { get; set; } = string.Empty;
    public string PrimaryCtaLink { get; set; } = string.Empty;
    public string? SecondaryCtaLabel { get; set; }
    public string? SecondaryCtaLink { get; set; }
    public string BackgroundImageUrl { get; set; } = string.Empty;
    public string? VideoUrl { get; set; }
    public string? Badge { get; set; }
}
