using Microsoft.EntityFrameworkCore;
using status_backend.data;
using status_backend.models;

DotNetEnv.Env.Load();
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<StatusContext>(options =>
    options.UseSqlite("DataSource=status.db"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwaggerUI();
    app.UseSwagger();
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapGet("/api/status", (StatusContext context) =>
{
    return context.StatusUpdates.ToList();
});

app.MapPost("/api/status", (StatusUpdate statusUpdate, StatusContext context) =>
{
    context.StatusUpdates.Add(statusUpdate);
    context.SaveChanges();
    return statusUpdate;
});

app.Run();