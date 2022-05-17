using Microsoft.EntityFrameworkCore;

namespace ReactBlogSite.Data
{
    public class BlogPostDataContext : DbContext
    {
        private readonly string _connectionString;

        public BlogPostDataContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }
        
        public DbSet<BlogPost> BlogPosts { get; set; }
        public DbSet<Comment> Comments { get; set; }
    }
}