using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Notes_mvc.Models;

namespace Notes_mvc.Controllers
{
    [Route("api/[controller]")]
    public class NoteController : Controller
    {
        private readonly MyDbContext _db;

        public NoteController(MyDbContext db)
        {
            _db = db;
        }
        [HttpGet]
        public List<Notes> GetNotes()
        {
            Console.WriteLine("Received HTTP GET all notes...");
            try
            {
                var result = _db.Notes.OrderByDescending(a => a.CreatedOn).ToList();
                if (result.Any())
                {
                    Console.WriteLine("... returned found results");
                    Console.WriteLine(result);
                    return result;
                }
                else
                {
                    Console.WriteLine("... no found results");
                    return null;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("... error handling request");
                Console.WriteLine(e.Message);
                return null;
            }
        }

        [HttpGet("[action]/{id}")]
        public Notes GetNote(int id)
        {
            Console.WriteLine("Received HTTP GET single note...");
            try { 
                var result = _db.Notes.Find(id);
                if (result != null)
                {
                    Console.WriteLine("... return found result");
                    return result;
                }
                else
                {
                    Console.WriteLine("... no result found");
                    return null;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Error with request");
                Console.WriteLine(e.Message);
                return null;
            }
        }

        [HttpPost]
        public IActionResult AddNewNote([FromBody]Notes item)
        {
            try {
                Console.WriteLine("New Note Received");
                Console.WriteLine(item);
                _db.Notes.Add(item);
                _db.SaveChanges();
                Console.WriteLine("Note added - Response sent");
                return Ok(new { success = true, returncode = "200" });
            }
            catch (Exception e)
            {
                Console.WriteLine("Error handing request");
                Console.WriteLine(e.Message);
                return NotFound();
            }
        }

        [HttpPut]
        public IActionResult UpdateNote([FromBody]Notes item)
        {
            try { 
                var noteToUpdate = _db.Notes.Find(item.NoteId);
                if (noteToUpdate == null)
                {
                    return NotFound();
                } else {
                    noteToUpdate.NoteText = item.NoteText;
                    noteToUpdate.UpdatedBy = item.UpdatedBy;
                    _db.Notes.Update(noteToUpdate);
                    _db.SaveChanges();
                    return Ok(new { success = true, returncode = "200" });
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return NotFound();
            }
        }

        [HttpDelete("[action]/{id}")]
        public IActionResult Delete(int id)
        {
            try { 
                var noteToDelete = _db.Notes.Find(id);
                if (noteToDelete == null)
                {
                    return NotFound();
                } else {
                    _db.Notes.Remove(noteToDelete);
                    _db.SaveChanges();
                    return Ok(new { success = true, returncode = "200" });
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return NotFound();
            }
        }
    }
}