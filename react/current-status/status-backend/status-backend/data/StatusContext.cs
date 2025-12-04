using Microsoft.EntityFrameworkCore;
using status_backend.models;

namespace status_backend.data;

public class StatusContext : DbContext
{
    public StatusContext(DbContextOptions<StatusContext> options) : base( options)
    {
        
    }

    public DbSet<StatusUpdate> StatusUpdates { get; set; }
}