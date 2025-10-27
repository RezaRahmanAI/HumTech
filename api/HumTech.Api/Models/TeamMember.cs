namespace HumTech.Api.Models;

public class TeamMember : EntityBase
{
    public string Name { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public string PhotoUrl { get; set; } = string.Empty;
    public string[] Expertise { get; set; } = Array.Empty<string>();
    public SocialLink[] SocialLinks { get; set; } = Array.Empty<SocialLink>();
}
