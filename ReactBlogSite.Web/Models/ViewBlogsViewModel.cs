using System.Collections.Generic;
using ReactBlogSite.Data;

namespace ReactBlogSite.Web.Models
{
    public class ViewBlogsViewModel
    {
        public List<BlogPost> BlogPosts { get; set; }
        public int TotalCount { get; set; }
    }
}