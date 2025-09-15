using ApiMedGestionAlert.Model;
using Microsoft.EntityFrameworkCore;

namespace ApiMedGestionAlert.DataBase
{
    public partial class Context : DbContext
    {
        public Context(DbContextOptions<Context> options)
           : base(options)
        {
        }


        public virtual DbSet<UserModel> Users { get; set; }
        public virtual DbSet<RolModel> Rol { get; set; }
        public virtual DbSet<OptionModel> Options { get; set; }
        public virtual DbSet<RolOptionModel> RolOption { get; set; }
        public virtual DbSet<LogProcessModel> LogProcess { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                //optionsBuilder.UseSqlServer("server=localhost;user=sa;password=Flirt4free;database=Prueba");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Modern_Spanish_CI_AS");

            modelBuilder.Entity<UserModel>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("UserAplication");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("email");
                entity.Property(e => e.UserName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("userName");
                entity.Property(e => e.IdRol).HasColumnName("idRol");
                entity.Property(e => e.Token)
                .HasMaxLength(1000)
                .IsUnicode(false)
                .HasColumnName("token");
                entity.Property(e => e.PasswordApp)
               .HasMaxLength(1000)
               .IsUnicode(false)
               .HasColumnName("passwordApp");
                entity.Property(e => e.StateSession)
              .HasMaxLength(1)
              .IsUnicode(false)
              .HasColumnName("stateSession");

            });

            modelBuilder.Entity<RolModel>(entity => {
                entity.HasKey(e => e.Id);
                entity.ToTable("Rols");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.NameRol)
               .HasMaxLength(50)
               .IsUnicode(false)
               .HasColumnName("nameRol");
            });

            modelBuilder.Entity<OptionModel>(entity => {
                entity.HasKey(e => e.Id);
                entity.ToTable("Options");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.OptionName)
               .HasMaxLength(50)
               .IsUnicode(false)
               .HasColumnName("optionName");
                entity.Property(e => e.IdFather).HasColumnName("idFather");
                entity.Property(e => e.OrderOption)
               .HasMaxLength(2)
               .IsUnicode(false)
               .HasColumnName("orderOption");
                entity.Property(e => e.Children).HasColumnName("children");
            });

            modelBuilder.Entity<RolOptionModel>(entity => {
                entity.HasKey(e => e.Id);
                entity.ToTable("RolsOptions");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.IdRol).HasColumnName("idRol");
                entity.Property(e => e.IdOption).HasColumnName("idOption");

            });


            modelBuilder.Entity<LogProcessModel>(entity => {
                entity.HasKey(e => e.Id);
                entity.ToTable("LogProcess");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.DateProcess).HasColumnName("dateProcess");
                entity.Property(e => e.UserProcess)
               .HasMaxLength(200)
               .IsUnicode(false)
               .HasColumnName("userProcess");
                entity.Property(e => e.Class)
               .HasMaxLength(100)
               .IsUnicode(false)
               .HasColumnName("class");
                entity.Property(e => e.Method)
              .HasMaxLength(100)
              .IsUnicode(false)
              .HasColumnName("method");
                entity.Property(e => e.DescriptionProcess)
              .HasMaxLength(1000)
              .IsUnicode(false)
              .HasColumnName("descriptionProcess");
            });

            OnModelCreatingPartial(modelBuilder);

        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
