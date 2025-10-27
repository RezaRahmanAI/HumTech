namespace HumTech.Api.Models;

public class ContactProfile : EntityBase
{
    public string CompanyName { get; set; } = string.Empty;
    public string Headline { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string SupportEmail { get; set; } = string.Empty;
    public string SalesEmail { get; set; } = string.Empty;
    public string[] Channels { get; set; } = Array.Empty<string>();
    public SocialLink[] SocialLinks { get; set; } = Array.Empty<SocialLink>();
    public OfficeLocation[] Offices { get; set; } = Array.Empty<OfficeLocation>();
}
