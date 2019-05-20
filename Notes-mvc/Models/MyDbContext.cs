using System;
using Microsoft.EntityFrameworkCore;

namespace Notes_mvc.Models
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Notes> Notes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // for testing redundency 
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySQL("server=localhost;port=3306;user=root;password=r00t;database=note;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.4-servicing-10062");

            modelBuilder.Entity<Notes>(entity =>
            {
                entity.HasKey(e => e.NoteId);

                entity.ToTable("notes", "note");

                entity.Property(e => e.NoteId)
                    .HasColumnName("NoteID")
                    .HasColumnType("int(11)");

                entity.Property(e => e.CreatedOn).HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.MadeBy)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.NoteText).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.Property(e => e.NoteTitle)
                    .IsRequired()
                    .IsUnicode(false);
            });
        }
    }
}
