namespace HumTech.Api.Models;

public class ServiceOffering : EntityBase
{
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    public string? PrimaryLink { get; set; }
    public string[] Features { get; set; } = Array.Empty<string>();
    public string[] Benefits { get; set; } = Array.Empty<string>();
    public string[] Technologies { get; set; } = Array.Empty<string>();
    public string[] Tags { get; set; } = Array.Empty<string>();
}
