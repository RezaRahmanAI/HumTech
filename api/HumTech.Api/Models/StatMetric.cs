namespace HumTech.Api.Models;

public class StatMetric : EntityBase
{
    public string Label { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal Value { get; set; }
    public string? Prefix { get; set; }
    public string? Suffix { get; set; }
}
