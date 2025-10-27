namespace HumTech.Api.Models;

public class JobPosting : EntityBase
{
    public string Title { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string EmploymentType { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string[] Responsibilities { get; set; } = Array.Empty<string>();
    public string[] Requirements { get; set; } = Array.Empty<string>();
    public DateTimeOffset PostedDate { get; set; }
    public bool RemoteFriendly { get; set; }
    public string? SalaryRange { get; set; }
}
