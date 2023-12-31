
using Microsoft.Extensions.Configuration;

using Microsoft.EntityFrameworkCore;
using WebApiDemoNet7.Models;




var builder = WebApplication.CreateBuilder(args);

// Add services to the container.



//string mySqlConnectionStr = "server=localhost; port=3306; database=test; user=root; password=root; Persist Security Info=False; Connect Timeout=300"; 

string mySqlConnectionStr = builder.Configuration.GetConnectionString("MovieContext");
builder.Services.AddDbContextPool<MovieContext>(options => options.UseMySql(mySqlConnectionStr, ServerVersion.AutoDetect(mySqlConnectionStr)));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
