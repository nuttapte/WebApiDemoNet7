using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;



using Microsoft.EntityFrameworkCore;

using WebApiDemoNet7.Models;

namespace WebApiDemoNet7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class MovieController : ControllerBase
    {

        private readonly MovieContext _context;

        public MovieController(MovieContext context)
        {
            _context = context;
        }


        //Get All Movies
        [HttpGet("/GetAllMovies")]
        public async Task<ActionResult<IEnumerable<Movie>>> GetMovies()
        {
            return await _context.Movie.ToListAsync();
        }

        //Get Movie By ID
        [HttpGet("/GetMovie/{id}")]
        public async Task<ActionResult<Movie>> GetMovie(int id)
        {
            var result = await _context.Movie.FindAsync(id);
            if(result != null)
            {
                return result;
            }
            else
            {
                return NoContent();
            }
        }

        //Add New Movie
        [HttpPost("/AddMovie")]
        public async Task<ActionResult<Movie>> CreatNew(Movie Mv)
        {
            var Exs = await _context.Movie.FindAsync(Mv.Id);
            if(Exs != null)
            {
                var message = string.Format("Movie with id = {0} is existing", Mv.Id);
                return BadRequest(message);
                //return Request.CreateErrorResponse(HttpStatusCode.NotFound, message);
            }
            else 
            {
                _context.Movie.Add(Mv);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetMovie", new {id = Mv.Id}, Mv);
            }


        }

        //Update Movie
        [HttpPut("/UpdateMovie/{id}")]
        public async Task<ActionResult<Movie>> UpdateMovie(int id, Movie Mv)
        {
            if( id != Mv.Id)
            {
                return BadRequest("id and Movie id dosen't match.");
            }


            try
            {
                _context.Entry(Mv).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetMovie", new {id = Mv.Id}, Mv);
            }
            catch(DbUpdateConcurrencyException ex)
            {
                return BadRequest(ex.Message);
            }


        }
    }
}


