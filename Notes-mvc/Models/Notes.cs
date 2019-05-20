using System;
using System.Collections.Generic;

namespace Notes_mvc.Models
{
    public partial class Notes
    {
        public int NoteId { get; set; }
        public string NoteTitle { get; set; }
        public string NoteText { get; set; }
        public string MadeBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTimeOffset? CreatedOn { get; set; }
        public DateTimeOffset? UpdatedOn { get; set; }
    }
}
