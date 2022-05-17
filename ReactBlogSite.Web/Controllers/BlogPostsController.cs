using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactBlogSite.Data;
using ReactBlogSite.Web.Models;

namespace ReactBlogSite.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogPostsController : ControllerBase
    {
        private readonly string _connectionString;

        public BlogPostsController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("get")]
        public ViewBlogsViewModel GetBlogPosts(int page)
        {
            int pageCount = 3;
            int from = (page - 1) * pageCount;
            var repo = new BlogPostRepository(_connectionString);
            var posts = repo.GetBlogPosts(from, pageCount);
            var totalCount = repo.GetTotalBlogPostCount();
            return new ViewBlogsViewModel
            {
                BlogPosts = posts,
                TotalCount = totalCount
            };
        }

        [HttpPost]
        [Route("addpost")]
        public BlogPost AddPost(BlogPost post)
        {
            post.DateCreated = DateTime.Now;
            var repo = new BlogPostRepository(_connectionString);
            repo.Add(post);
            return post;
        }

        [HttpGet]
        [Route("getblogpost")]
        public BlogPost GetBlogPost(int id)
        {
            var repo = new BlogPostRepository(_connectionString);
            return repo.GetById(id);
        }

        [HttpPost]
        [Route("addcomment")]
        public void AddComment(Comment comment)
        {
            comment.DateCreated = DateTime.Now;
            var repo = new BlogPostRepository(_connectionString);
            repo.AddComment(comment);
        }

        [HttpGet]
        [Route("getcomments")]
        public List<Comment> GetComments(int blogPostId)
        {
            var repo = new BlogPostRepository(_connectionString);
            return repo.GetComments(blogPostId);
        }

        [HttpGet]
        [Route("getmostrecent")]
        public int GetMostRecent()
        {
            var repo = new BlogPostRepository(_connectionString);
            return repo.GetMostRecent();
        }

        [HttpGet]
        [Route("GetCommentCount")]
        public object GetCommentCount()
        {
            var repo = new BlogPostRepository(_connectionString);
            return new { count = repo.GetCommentCount() };
        }
    }
}