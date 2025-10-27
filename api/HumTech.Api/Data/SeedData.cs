using HumTech.Api.Models;

namespace HumTech.Api.Data;

public static class SeedData
{
    public static IReadOnlyList<HeroSection> HeroSections => new List<HeroSection>
    {
        new()
        {
            Id = Guid.Parse("d0f97893-6b02-4ee9-9089-d6fa9b02e0bc"),
            Title = "Hum Tech builds the future of digital operations",
            Subtitle = "ERP, mobile, and AI solutions engineered for ambitious teams.",
            PrimaryCtaLabel = "Start a project",
            PrimaryCtaLink = "/contact",
            SecondaryCtaLabel = "View services",
            SecondaryCtaLink = "/services",
            BackgroundImageUrl = "https://images.humtech.com/hero/innovation-hub.webp",
            VideoUrl = "https://videos.humtech.com/overview.mp4",
            Badge = "Trusted by 120+ global brands"
        }
    };

    public static IReadOnlyList<ServiceOffering> ServiceOfferings => new List<ServiceOffering>
    {
        new()
        {
            Id = Guid.Parse("1d4a2641-2821-4c94-8840-6a3522fc4f42"),
            Title = "ERP Software Solutions",
            Slug = "erp-software-solutions",
            Summary = "Unified ERP platforms that connect finance, operations, and analytics.",
            Description = "Hum Tech designs modular ERP ecosystems that streamline enterprise workflows, integrate legacy platforms, and unlock real-time visibility across your business.",
            Category = "Enterprise",
            Icon = "ph-buildings",
            PrimaryLink = "/services/erp-software-solutions",
            Features = new[]
            {
                "Process automation and orchestration",
                "Role-based dashboards and analytics",
                "Secure integrations with existing systems"
            },
            Benefits = new[]
            {
                "Accelerate decision-making with live data",
                "Reduce operational costs via intelligent automation",
                "Support global teams with localized compliance"
            },
            Technologies = new[] { "Azure", "Power Platform", "Dynamics 365", "Azure Synapse" },
            Tags = new[] { "ERP", "Automation", "Integration" }
        },
        new()
        {
            Id = Guid.Parse("ed91336a-eb27-4f72-9654-b715ee2b0978"),
            Title = "Android App Development",
            Slug = "android-app-development",
            Summary = "Crafted Android experiences that scale across devices and markets.",
            Description = "From consumer marketplaces to industrial field tools, Hum Tech builds resilient Android applications backed by cloud-native APIs and observability.",
            Category = "Mobile",
            Icon = "ph-device-mobile",
            PrimaryLink = "/services/android-app-development",
            Features = new[]
            {
                "Native Kotlin and Jetpack Compose delivery",
                "Offline-first sync architecture",
                "CI/CD pipelines with automated QA"
            },
            Benefits = new[]
            {
                "Launch faster with reusable UI frameworks",
                "Deliver reliable experiences in low-connectivity environments",
                "Gather actionable telemetry with privacy-first analytics"
            },
            Technologies = new[] { "Kotlin", "Jetpack", "Firebase", "Azure App Center" },
            Tags = new[] { "Android", "Mobile", "Kotlin" }
        },
        new()
        {
            Id = Guid.Parse("3fb0bc58-951d-43a9-8e28-696e0badc9d7"),
            Title = "Artificial Intelligence Projects",
            Slug = "artificial-intelligence-projects",
            Summary = "Responsible AI and ML platforms from experimentation to production.",
            Description = "Hum Tech partners with enterprises to operationalize machine learning with transparent governance, MLOps automation, and human-centered design.",
            Category = "AI",
            Icon = "ph-brain",
            PrimaryLink = "/services/artificial-intelligence-projects",
            Features = new[]
            {
                "Model lifecycle management",
                "Domain-specific data pipelines",
                "Responsible AI audits and compliance"
            },
            Benefits = new[]
            {
                "Deploy trusted AI faster",
                "Scale experimentation with automated environments",
                "Ensure regulatory compliance across regions"
            },
            Technologies = new[] { "Azure ML", "TensorFlow", "PyTorch", "Databricks" },
            Tags = new[] { "AI", "ML", "MLOps" }
        },
        new()
        {
            Id = Guid.Parse("a7f2978c-2a0d-4d7c-8b2f-a2a8ba5a63c1"),
            Title = "Harm Academy",
            Slug = "harm-academy",
            Summary = "Tech and revenue enablement programs for modern teams.",
            Description = "Harm Academy delivers immersive training across engineering, AI, and GTM excellence with cohort-based learning and mentorship.",
            Category = "Education",
            Icon = "ph-graduation-cap",
            PrimaryLink = "/academy",
            Features = new[]
            {
                "Live cohort sessions",
                "Mentor office hours",
                "Capstone project delivery"
            },
            Benefits = new[]
            {
                "Upskill teams with real-world scenarios",
                "Improve retention with personalized learning paths",
                "Showcase outcomes with portfolio-ready work"
            },
            Technologies = new[] { "Azure", "Moodle", "Power BI" },
            Tags = new[] { "Academy", "Training", "Enablement" }
        }
    };

    public static IReadOnlyList<TeamMember> TeamMembers => new List<TeamMember>
    {
        new()
        {
            Id = Guid.Parse("13f57ae5-7198-4feb-86a8-3de89ddad6d1"),
            Name = "Amina Patel",
            Role = "Chief Technology Officer",
            Bio = "Architects enterprise platforms that balance innovation with resilience for regulated industries.",
            PhotoUrl = "https://images.humtech.com/team/amina-patel.webp",
            Expertise = new[] { "Cloud Strategy", "Security", "AI Governance" },
            SocialLinks = new[]
            {
                new SocialLink { Platform = "LinkedIn", Url = "https://www.linkedin.com/in/aminapatel" }
            }
        },
        new()
        {
            Id = Guid.Parse("fe2e1cf5-2278-446c-8f69-9035f3329d9d"),
            Name = "Logan Reyes",
            Role = "Director of Mobile Engineering",
            Bio = "Leads cross-functional squads delivering performant mobile apps with rapid release cadences.",
            PhotoUrl = "https://images.humtech.com/team/logan-reyes.webp",
            Expertise = new[] { "Android", "Product Discovery", "DevOps" },
            SocialLinks = new[]
            {
                new SocialLink { Platform = "LinkedIn", Url = "https://www.linkedin.com/in/loganreyes" },
                new SocialLink { Platform = "GitHub", Url = "https://github.com/loganreyes" }
            }
        },
        new()
        {
            Id = Guid.Parse("c08a59de-5fad-468d-98c0-97bd5f8acbbc"),
            Name = "Sara Müller",
            Role = "Head of Data Science",
            Bio = "Transforms complex datasets into strategic insights and production-grade ML services.",
            PhotoUrl = "https://images.humtech.com/team/sara-muller.webp",
            Expertise = new[] { "MLOps", "Data Strategy", "Responsible AI" },
            SocialLinks = new[]
            {
                new SocialLink { Platform = "LinkedIn", Url = "https://www.linkedin.com/in/saramuller" }
            }
        }
    };

    public static IReadOnlyList<Testimonial> Testimonials => new List<Testimonial>
    {
        new()
        {
            Id = Guid.Parse("c74a1142-9a3c-4c68-9a33-1dd49f41be27"),
            ClientName = "Jordan Blake",
            Company = "Northwind Logistics",
            Quote = "Hum Tech connected our global operations in under six months and unlocked reporting we have chased for years.",
            Rating = 5,
            PhotoUrl = "https://images.humtech.com/testimonials/jordan-blake.webp"
        },
        new()
        {
            Id = Guid.Parse("a074b2c2-87c9-4300-99a0-55cb3c0828f7"),
            ClientName = "Priya Natarajan",
            Company = "Vertex Retail",
            Quote = "Their Android team feels like an extension of our product org. Releases are faster and more stable than ever.",
            Rating = 5,
            PhotoUrl = "https://images.humtech.com/testimonials/priya-natarajan.webp"
        }
    };

    public static IReadOnlyList<JobPosting> JobPostings => new List<JobPosting>
    {
        new()
        {
            Id = Guid.Parse("3c92cd83-95c6-4b71-85f3-42b7928f6137"),
            Title = "Senior ERP Solutions Architect",
            Department = "Consulting",
            Location = "Hybrid - Toronto, Canada",
            EmploymentType = "Full-time",
            Description = "Design modular ERP ecosystems for enterprise clients across manufacturing and logistics.",
            Responsibilities = new[]
            {
                "Own discovery workshops and blueprint engagements",
                "Lead solution design and reference architecture",
                "Guide implementation teams through delivery"
            },
            Requirements = new[]
            {
                "8+ years designing ERP or large SaaS platforms",
                "Expertise with Microsoft Dynamics or SAP",
                "Experience leading client-facing technical engagements"
            },
            PostedDate = DateTimeOffset.UtcNow.AddDays(-12),
            RemoteFriendly = true,
            SalaryRange = "$140k - $165k CAD"
        },
        new()
        {
            Id = Guid.Parse("8344eab7-a5c9-4c5b-9685-7f7d94d25d94"),
            Title = "Android Staff Engineer",
            Department = "Engineering",
            Location = "Remote - North America",
            EmploymentType = "Full-time",
            Description = "Own architecture and delivery for flagship Android programs serving millions of users.",
            Responsibilities = new[]
            {
                "Shape mobile technical strategy and coding standards",
                "Pair with product partners on discovery and experimentation",
                "Mentor and level up engineering squads"
            },
            Requirements = new[]
            {
                "10+ years in Android development",
                "Expert Kotlin and Jetpack Compose skills",
                "Experience with CI/CD and observability tooling"
            },
            PostedDate = DateTimeOffset.UtcNow.AddDays(-5),
            RemoteFriendly = true,
            SalaryRange = "$170k - $195k USD"
        }
    };

    public static IReadOnlyList<BlogArticle> BlogArticles => new List<BlogArticle>
    {
        new()
        {
            Id = Guid.Parse("f19d8c63-3b4b-4dc6-85f9-4cf5027dffa4"),
            Title = "Modernizing ERP with Composable Architecture",
            Slug = "modernizing-erp-with-composable-architecture",
            Excerpt = "How Hum Tech helped a logistics leader modernize its ERP footprint with composable services.",
            Content = "<p>Composable ERP unlocks faster change cycles...</p>",
            Category = "ERP",
            Tags = new[] { "ERP", "Architecture", "Azure" },
            ImageUrl = "https://images.humtech.com/blog/erp-modernization.webp",
            PublishedOn = DateTimeOffset.UtcNow.AddDays(-21),
            Author = "Amina Patel",
            ReadingTime = "6 min read"
        },
        new()
        {
            Id = Guid.Parse("0c179ca8-4cc5-4dfa-a773-83f57e0d90f9"),
            Title = "Designing Resilient Offline-first Android Apps",
            Slug = "designing-offline-first-android-apps",
            Excerpt = "Strategies for delivering reliable mobile experiences in low-connectivity environments.",
            Content = "<p>Offline-first thinking begins with domain modeling...</p>",
            Category = "Mobile",
            Tags = new[] { "Android", "Offline", "DevOps" },
            ImageUrl = "https://images.humtech.com/blog/android-offline.webp",
            PublishedOn = DateTimeOffset.UtcNow.AddDays(-9),
            Author = "Logan Reyes",
            ReadingTime = "8 min read"
        }
    };

    public static IReadOnlyList<Course> Courses => new List<Course>
    {
        new()
        {
            Id = Guid.Parse("2d1482fb-9f2e-4c37-8f2a-68cc6e8c8920"),
            Title = "AI Product Strategy Intensive",
            Slug = "ai-product-strategy-intensive",
            Category = "Artificial Intelligence",
            Level = "Advanced",
            Duration = "6 weeks",
            Summary = "Build AI-enabled products with responsible governance from day zero.",
            Description = "A cohort-based program covering AI opportunity framing, roadmap design, and ethical guardrails.",
            InstructorName = "Sara Müller",
            InstructorBio = "Head of Data Science at Hum Tech with 12 years building ML platforms.",
            StartDate = DateTimeOffset.UtcNow.AddDays(30),
            EndDate = DateTimeOffset.UtcNow.AddDays(72),
            DeliveryMode = "Hybrid",
            Topics = new[] { "Responsible AI", "Roadmapping", "MLOps" },
            Skills = new[] { "AI Governance", "Stakeholder Alignment", "Experiment Design" },
            SeatsAvailable = 24,
            Price = 1899M
        },
        new()
        {
            Id = Guid.Parse("4fb1a6d1-86ce-4f1a-b5f6-145ba0c7c133"),
            Title = "Full-stack Android Delivery Lab",
            Slug = "full-stack-android-delivery-lab",
            Category = "Mobile",
            Level = "Intermediate",
            Duration = "4 weeks",
            Summary = "Hands-on Android lab focused on Compose, automation, and release excellence.",
            Description = "Teams build and ship a production-ready Android feature using modern tooling and quality gates.",
            InstructorName = "Logan Reyes",
            InstructorBio = "Director of Mobile Engineering with 100+ successful launches.",
            StartDate = DateTimeOffset.UtcNow.AddDays(45),
            EndDate = DateTimeOffset.UtcNow.AddDays(73),
            DeliveryMode = "Remote",
            Topics = new[] { "Compose", "CI/CD", "Testing" },
            Skills = new[] { "Kotlin", "Automation", "Observability" },
            SeatsAvailable = 30,
            Price = 1299M
        }
    };

    public static IReadOnlyList<FaqItem> FaqItems => new List<FaqItem>
    {
        new()
        {
            Id = Guid.Parse("f97eed25-2e66-4d32-b69e-f2705392ee47"),
            Question = "How quickly can Hum Tech kick off a new engagement?",
            Answer = "Discovery typically begins within two weeks of contract signature with a dedicated squad assembled.",
            Category = "Engagement"
        },
        new()
        {
            Id = Guid.Parse("f0a5c87a-c62e-4f07-858f-746a276bf660"),
            Question = "Do you support global deployments?",
            Answer = "Yes. We operate delivery hubs across North America, Europe, and Asia Pacific with localized expertise.",
            Category = "Delivery"
        }
    };

    public static IReadOnlyList<ContactProfile> ContactProfiles => new List<ContactProfile>
    {
        new()
        {
            Id = Guid.Parse("f5e7fda5-7d7e-47c7-9cb8-6e42a222f9c9"),
            CompanyName = "Hum Tech",
            Headline = "Let’s architect your next leap.",
            Address = "1200 Innovation Way, Suite 400, Toronto, ON, Canada",
            Email = "hello@humtech.com",
            Phone = "+1 (437) 555-0112",
            SupportEmail = "support@humtech.com",
            SalesEmail = "sales@humtech.com",
            Channels = new[] { "Phone", "Email", "Live Chat" },
            SocialLinks = new[]
            {
                new SocialLink { Platform = "LinkedIn", Url = "https://www.linkedin.com/company/humtech" },
                new SocialLink { Platform = "Twitter", Url = "https://twitter.com/humtech" }
            },
            Offices = new[]
            {
                new OfficeLocation
                {
                    Label = "Global HQ",
                    Address = "1200 Innovation Way, Suite 400",
                    City = "Toronto",
                    Country = "Canada",
                    Latitude = 43.6532,
                    Longitude = -79.3832
                },
                new OfficeLocation
                {
                    Label = "EMEA Delivery Center",
                    Address = "Friedrichstraße 68",
                    City = "Berlin",
                    Country = "Germany",
                    Latitude = 52.5200,
                    Longitude = 13.4050
                }
            }
        }
    };

    public static IReadOnlyList<StatMetric> StatMetrics => new List<StatMetric>
    {
        new()
        {
            Id = Guid.Parse("4f377761-1db6-493a-848e-9f51b9c31b44"),
            Label = "Projects delivered",
            Value = 185,
            Prefix = string.Empty,
            Suffix = "+"
        },
        new()
        {
            Id = Guid.Parse("21c4644b-2f83-4e14-90c7-f242ad1fe53a"),
            Label = "Client satisfaction",
            Value = 4.9M,
            Prefix = string.Empty,
            Suffix = "/5"
        },
        new()
        {
            Id = Guid.Parse("e52f3ab5-5e63-4804-9a9c-dc087068ab27"),
            Label = "Learners empowered",
            Value = 3200,
            Prefix = string.Empty,
            Suffix = "+"
        }
    };
}
