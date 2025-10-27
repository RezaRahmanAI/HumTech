namespace HumTech.Api.Models;

public class Testimonial : EntityBase
{
    public string ClientName { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string Quote { get; set; } = string.Empty;
    public int Rating { get; set; }
    public string? PhotoUrl { get; set; }
}
