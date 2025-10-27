namespace HumTech.Api.Models;

public class BlogArticle : EntityBase
{
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Excerpt { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string[] Tags { get; set; } = Array.Empty<string>();
    public string ImageUrl { get; set; } = string.Empty;
    public DateTimeOffset PublishedOn { get; set; }
    public string Author { get; set; } = string.Empty;
    public string? ReadingTime { get; set; }
}
