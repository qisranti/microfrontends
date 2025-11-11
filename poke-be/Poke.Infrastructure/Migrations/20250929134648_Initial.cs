using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Poke.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "battlePokemons",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PokemonName = table.Column<string>(type: "text", nullable: false),
                    PokemonHp = table.Column<float>(type: "real", nullable: false),
                    PokemonId = table.Column<int>(type: "integer", nullable: false),
                    IsAlive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_battlePokemons", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "battles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Player1Name = table.Column<string>(type: "text", nullable: false),
                    Player1Pokemons = table.Column<List<int>>(type: "integer[]", nullable: false),
                    Player2Name = table.Column<string>(type: "text", nullable: false),
                    Player2Pokemons = table.Column<List<int>>(type: "integer[]", nullable: false),
                    Winner = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_battles", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "battlePokemons");

            migrationBuilder.DropTable(
                name: "battles");
        }
    }
}
