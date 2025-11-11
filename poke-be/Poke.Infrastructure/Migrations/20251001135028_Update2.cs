using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Poke.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Update2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Player1Pokemons",
                table: "battles");

            migrationBuilder.DropColumn(
                name: "Player2Pokemons",
                table: "battles");

            migrationBuilder.AddColumn<int>(
                name: "BattleId",
                table: "battlePokemons",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "PlayerName",
                table: "battlePokemons",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BattleId",
                table: "battlePokemons");

            migrationBuilder.DropColumn(
                name: "PlayerName",
                table: "battlePokemons");

            migrationBuilder.AddColumn<List<int>>(
                name: "Player1Pokemons",
                table: "battles",
                type: "integer[]",
                nullable: false);

            migrationBuilder.AddColumn<List<int>>(
                name: "Player2Pokemons",
                table: "battles",
                type: "integer[]",
                nullable: false);
        }
    }
}
