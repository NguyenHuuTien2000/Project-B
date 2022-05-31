using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Bussiness_Performance.Migrations
{
    public partial class MapBussinessResult : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BussinessResult",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyID = table.Column<string>(type: "varchar(20)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Time = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Net_Sales_And_Service_Provision = table.Column<double>(type: "double", nullable: false),
                    Cost_Of_Goods_Sold = table.Column<double>(type: "double", nullable: false),
                    Gross_Profit_On_Sales_And_Service_Delivery = table.Column<double>(type: "double", nullable: false),
                    Financial_Operating_Revenue = table.Column<double>(type: "double", nullable: false),
                    Financial_Expenses = table.Column<double>(type: "double", nullable: false),
                    Cost_Of_Sales = table.Column<double>(type: "double", nullable: false),
                    Business_Management_Expenses = table.Column<double>(type: "double", nullable: false),
                    Net_Profit_From_Business_Activities = table.Column<double>(type: "double", nullable: false),
                    Other_Profits = table.Column<double>(type: "double", nullable: false),
                    Profit_Or_Loss_Portion_From_The_Joint_Venture_Affiliate = table.Column<double>(type: "double", nullable: false),
                    Total_Accounting_Profit_Before_Tax = table.Column<double>(type: "double", nullable: false),
                    Profit_After_Corporate_Income_Tax = table.Column<double>(type: "double", nullable: false),
                    After_Tax_Profit_Of_Shareholders_Of_The_Parent_Company = table.Column<double>(type: "double", nullable: false),
                    Underlying_Earnings_Per_Share = table.Column<double>(type: "double", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.ID);
                    table.ForeignKey(
                        name: "CompanyID",
                        column: x => x.CompanyID,
                        principalTable: "company",
                        principalColumn: "CompanyID",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "businessresult_ibfk_1",
                table: "BussinessResult",
                column: "CompanyID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BussinessResult");
        }
    }
}
