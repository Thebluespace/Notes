Use Note;
Create table Notes(
	NoteID int NOT NULL auto_increment,
    NoteTitle text not null,
    NoteText text,
    MadeBy text NOT NULL,
    UpdatedBy text,
    CreatedOn timestamp DEFAULT current_timestamp,
    UpdatedOn timestamp DEFAULT current_timestamp on update current_timestamp,
    PRIMARY KEY(NoteID)
    );