using System.IO;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace ReactBlogSite.Data
{
    public class BlogPostContextFactory : IDesignTimeDbContextFactory<BlogPostDataContext>
    {
        public BlogPostDataContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}ReactBlogSite.Web"))
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

            return new BlogPostDataContext(config.GetConnectionString("ConStr"));
        }
    }
}