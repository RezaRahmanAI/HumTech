using HumTech.Api.Data;
using HumTech.Api.Models;
using HumTech.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var corsOrigins = builder.Configuration.GetSection("Cors:Origins").Get<string[]>() ?? new[] { "http://localhost:4200" };

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy.WithOrigins(corsOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddSingleton<IRepository<HeroSection>>(_ => new InMemoryRepository<HeroSection>(SeedData.HeroSections));
builder.Services.AddSingleton<IRepository<ServiceOffering>>(_ => new InMemoryRepository<ServiceOffering>(SeedData.ServiceOfferings));
builder.Services.AddSingleton<IRepository<TeamMember>>(_ => new InMemoryRepository<TeamMember>(SeedData.TeamMembers));
builder.Services.AddSingleton<IRepository<Testimonial>>(_ => new InMemoryRepository<Testimonial>(SeedData.Testimonials));
builder.Services.AddSingleton<IRepository<JobPosting>>(_ => new InMemoryRepository<JobPosting>(SeedData.JobPostings));
builder.Services.AddSingleton<IRepository<BlogArticle>>(_ => new InMemoryRepository<BlogArticle>(SeedData.BlogArticles));
builder.Services.AddSingleton<IRepository<Course>>(_ => new InMemoryRepository<Course>(SeedData.Courses));
builder.Services.AddSingleton<IRepository<FaqItem>>(_ => new InMemoryRepository<FaqItem>(SeedData.FaqItems));
builder.Services.AddSingleton<IRepository<ContactProfile>>(_ => new InMemoryRepository<ContactProfile>(SeedData.ContactProfiles));
builder.Services.AddSingleton<IRepository<StatMetric>>(_ => new InMemoryRepository<StatMetric>(SeedData.StatMetrics));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("Frontend");

app.MapControllers();

app.Run();
