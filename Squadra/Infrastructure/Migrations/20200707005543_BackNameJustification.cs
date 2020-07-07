using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Migrations
{
    public partial class BackNameJustification : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "alterjustification",
                table: "System");

            migrationBuilder.AddColumn<string>(
                name: "justification",
                table: "System",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "justification",
                table: "System");

            migrationBuilder.AddColumn<string>(
                name: "alterjustification",
                table: "System",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
