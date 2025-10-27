namespace HumTech.Api.Models;

public class FaqItem : EntityBase
{
    public string Question { get; set; } = string.Empty;
    public string Answer { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
}
