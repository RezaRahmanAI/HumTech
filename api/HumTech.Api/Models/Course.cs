namespace HumTech.Api.Models;

public class Course : EntityBase
{
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Level { get; set; } = string.Empty;
    public string Duration { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string InstructorName { get; set; } = string.Empty;
    public string InstructorBio { get; set; } = string.Empty;
    public DateTimeOffset StartDate { get; set; }
    public DateTimeOffset EndDate { get; set; }
    public string DeliveryMode { get; set; } = string.Empty;
    public string[] Topics { get; set; } = Array.Empty<string>();
    public string[] Skills { get; set; } = Array.Empty<string>();
    public int SeatsAvailable { get; set; }
    public decimal Price { get; set; }
}
