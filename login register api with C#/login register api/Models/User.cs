using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace login_register_api.Models
{
    public class User
    {

        [Key]
        public int ID { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Type { get; set; }
        public DateTime CreateAt { get; set; }

    }
}
