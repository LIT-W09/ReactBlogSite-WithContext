using System;
using System.Text.Json.Serialization;

namespace ReactBlogSite.Data
{
    public class Comment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public DateTime DateCreated { get; set; }
        public int BlogPostId { get; set; }
        
        [JsonIgnore]
        public BlogPost BlogPost { get; set; }
    }
}