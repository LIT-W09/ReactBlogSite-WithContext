using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace ReactBlogSite.Data
{
    public class BlogPostRepository
    {
        private readonly string _connectionString;

        public BlogPostRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<BlogPost> GetBlogPosts(int skip, int amount)
        {
            using var ctx = new BlogPostDataContext(_connectionString);
            return ctx.BlogPosts.Include(b => b.Comments).OrderByDescending(b => b.DateCreated)
                .Skip(skip).Take(amount).ToList();
        }

        public int GetTotalBlogPostCount()
        {
            using var ctx = new BlogPostDataContext(_connectionString);
            return ctx.BlogPosts.Count();
        }

        public void Add(BlogPost post)
        {
            using var ctx = new BlogPostDataContext(_connectionString);
            ctx.BlogPosts.Add(post);
            ctx.SaveChanges();
        }

        public BlogPost GetById(int id)
        {
            using var ctx = new BlogPostDataContext(_connectionString);
            return ctx.BlogPosts.Include(b => b.Comments).FirstOrDefault(b => b.Id == id);
        }

        public void AddComment(Comment comment)
        {
            using var ctx = new BlogPostDataContext(_connectionString);
            ctx.Comments.Add(comment);
            ctx.SaveChanges();
        }

        public List<Comment> GetComments(int blogPostId)
        {
            using var ctx = new BlogPostDataContext(_connectionString);
            return ctx.Comments.Where(c => c.BlogPostId == blogPostId).ToList();
        }

        public int GetMostRecent()
        {
            using var ctx = new BlogPostDataContext(_connectionString);
            return ctx.BlogPosts.OrderByDescending(b => b.DateCreated).Select(b => b.Id).FirstOrDefault();
        }

        public int GetCommentCount()
        {
            using var ctx = new BlogPostDataContext(_connectionString);
            return ctx.Comments.Count();
        }
    }
}