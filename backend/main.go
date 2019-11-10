package main

import "fmt"
import "net/http"
import "os"
import "strconv"
import _ "github.com/lib/pq"
import "database/sql"
import "encoding/json"

func RecipeList(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		fmt.Printf("Return all recipe names...\n")
	}
}

func SingleRecipe(w http.ResponseWriter, r *http.Request) {
	recipe_id, err := strconv.Atoi(r.URL.Path[len("/recipes/"):])
	if err != nil {
		fmt.Println("Not a valid ID")
		return
	}
	if r.Method == "GET" {
		fmt.Printf("Return recipe \"%d\"...\n", recipe_id)
	} else if r.Method == "POST" {
		fmt.Printf("Create recipe \"%d\"...\n", recipe_id)
	} else if r.Method == "PUT" {
		fmt.Printf("Update recipe \"%d\"...\n", recipe_id)
	} else if r.Method == "DELETE" {
		fmt.Printf("Delete recipe \"%d\"...\n", recipe_id)
	}
}

var DB_PASSWORD string
var DB_USER string
var db *sql.DB

const DB_NAME = "recipe_buddy"

func init() {
	DB_PASSWORD = os.Getenv("DATABASE_PASSWORD")
	DB_USER = os.Getenv("DATABASE_USER")
}

func main() {
	var err error

	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME)
	fmt.Println(dbinfo)
	db, err = sql.Open("postgres", dbinfo)
	if err != nil || db.Ping() != nil {
		fmt.Println("Error connecting to database")
	}

	http.HandleFunc("/recipes", RecipeList)
	http.HandleFunc("/recipes/", SingleRecipe)
	http.ListenAndServe(":8888", nil)
}
