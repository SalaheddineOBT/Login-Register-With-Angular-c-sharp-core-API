using login_register_api.Data;
using login_register_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace login_register_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly UserDbContext userDbContext;
        public LoginController(UserDbContext userDbContext)
        {
            this.userDbContext = userDbContext;
        }

        [HttpGet("users")]
        public IActionResult GetUsers()
        {
            var userdetails = userDbContext.user.AsQueryable();
            return Ok(new
            {
                status = 200,
                users = userdetails
            });
        }

        [HttpPost("getUsers")]
        public IActionResult GetAllUsers([FromBody] string selected)
        {
            if (string.IsNullOrEmpty(selected))
            {
                return BadRequest();
            }
            else
            {
                int id =Convert.ToInt32(HttpContext.Request.Query["id"]);
                if (selected.Equals("ById") && !id.Equals(""))
                {
                    var userdetails = userDbContext.user.AsNoTracking().FirstOrDefault(a => a.ID == id);
                    if (userdetails != null)
                    {
                        return Ok(new
                        {
                            status = 200,
                            user = userdetails
                        });
                    }
                    else
                    {
                        return NotFound(new
                        {
                            status = 404,
                            message = "User Not Found !"
                        });
                    }
                }
                else if (selected.Equals("all"))
                {
                    var usersdetails = userDbContext.user.AsQueryable();
                    return Ok(new
                    {
                        status = 200,
                        users = usersdetails
                    });
                }
                else {
                    return BadRequest();
                }
            }
        }

        [HttpGet("getUser")]
        public IActionResult GetUser(int id)
        {
            //int idd = Convert.ToInt32(HttpContext.Request.Query["id"]);
            var user = userDbContext.user.Find(id);
            if(user != null)
            {
                return Ok(new
                {
                    status = 200,
                    user = user
                });
            }
            else
            {
                return NotFound(new
                {
                    status = 404,
                    message = "User Not Found !"
                });
            }
        }

        [HttpPost("signup")]
        public IActionResult SignUp([FromBody] User userObj)
        {
            if(userObj == null)
            {
                return BadRequest();
            }
            else
            {
                userDbContext.user.Add(userObj);
                userDbContext.SaveChanges();
                return Ok(new {
                    status = 200,
                    message = "You Have SuccessFully Registered !",
                });
            }
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User userObj)
        {
            if (userObj == null)
            {
                return BadRequest();
            }
            else
            {
                var user = userDbContext.user.Where( a => a.Email == userObj.Email && a.Password == userObj.Password ).Select( a => a.UserName ).FirstOrDefault();
                if (user != null)
                {
                    return Ok(new
                    {
                        status = 200,
                        message = "You Have SuccessFully  !",
                        username = user
                    });

                } else {
                    return NotFound(new
                    {
                        status = 404,
                        message ="User Not Found !"
                    });
                }
            }
        }

        [HttpPut("update_user")]
        public IActionResult UpdateUser([FromBody] User userObj)
        {
            if (userObj == null)
            {
                return BadRequest();
            }

            var user = userDbContext.user.AsNoTracking().FirstOrDefault(a => a.ID == userObj.ID);
            if(user != null)
            {
                userDbContext.Entry(userObj).State = EntityState.Modified;
                userDbContext.SaveChanges();
                return Ok(new
                {
                    status = 200,
                    message = "User Updated SuccessFully !",
                });
            }
            else
            {
                return NotFound(new
                {
                    status = 404,
                    message = "User Not Found !"
                });
            }

        }

        [HttpDelete("delete_user/{id}")]
        public IActionResult DeleteUser(int id)
        {
            if (id.Equals(""))
            {
                return BadRequest();
            }

            var user = userDbContext.user.Find(id);
            if(user != null)
            {
                userDbContext.Remove(user);
                userDbContext.SaveChanges();
                return Ok(new
                {
                    status = 200,
                    message = "User Deleted SuccessFully !",
                });
            }
            else
            {
                return NotFound(new
                {
                    status = 404,
                    message = "User Not Found !"
                });
            }
        }

    }
}
