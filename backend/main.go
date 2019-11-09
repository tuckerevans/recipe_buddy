package main

import "fmt"
import "net/http"
import "os"
import _ "github.com/lib/pq"
import "database/sql"

func RecipeList(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		fmt.Printf("Return all recipe names...\n")
	} else if r.Method == "POST" {
	} else if r.Method == "DELETE" {
	}
}

func SingleRecipe(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Path[len("/recipes/"):]
	if r.Method == "GET" {
		fmt.Printf("Return recipe \"%s\"...\n", name)
	} else if r.Method == "POST" {
		fmt.Printf("Create recipe \"%s\"...\n", name)
	} else if r.Method == "DELETE" {
		fmt.Printf("Delete recipe \"%s\"...\n", name)
	}
}

var DB_PASSWORD string
var DB_USER string
var db *sql.DB

const DB_NAME = "Recipes"

func init() {
	DB_PASSWORD = os.Getenv("DATABASE_PASSWORD")
	DB_USER = os.Getenv("DATABASE_USER")
}

func main() {
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME)
	fmt.Println(dbinfo)
	db, err := sql.Open("postgres", dbinfo)
	if err != nil || db.Ping() != nil {
		fmt.Println("Error connecting to database")
	}

	http.HandleFunc("/recipes", RecipeList)
	http.HandleFunc("/recipes/", SingleRecipe)
	http.ListenAndServe(":8888", nil)
}
