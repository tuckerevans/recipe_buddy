package main

import "fmt"
import "net/http"
import "os"
import "strconv"
import _ "github.com/lib/pq"
import "database/sql"
import "encoding/json"

type APIError struct {
	Code int
	Msg  string
}

type APIDataIds struct {
	Ids interface{}
}

type APIDataRecipe struct {
	Recipe interface{}
}

type APIResponseList struct {
	Status APIError
	Data   []APIDataIds
}

type APIResponseItem struct {
	Status APIError
	Data   []APIDataRecipe
}

func RecipeList(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		var ids []int
		var id int

		rows, err := db.Query("SELECT id FROM recipes")
		if err != nil {
		} else {
			for rows.Next() {
				rows.Scan(&id)
				ids = append(ids, id)
			}
		}

		resp := APIResponseList{
			Status: APIError{Code: 200, Msg: "Successful Request"},
			Data:   make([]APIDataIds, 0),
		}
		resp.Data = append(resp.Data, APIDataIds{Ids: ids})

		w.Header().Set("Content-Type", "application/json; charset=UTF-8")
		w.WriteHeader(http.StatusOK)
		if err := json.NewEncoder(w).Encode(resp); err != nil {
			panic(err)
		}
	}
}

func SingleRecipe(w http.ResponseWriter, r *http.Request) {
	recipe_id, err := strconv.Atoi(r.URL.Path[len("/recipes/"):])
	if err != nil {
		fmt.Println("Not a valid ID")
		return
	}
	if r.Method == "GET" {
		var status int
		var msg string

		recipe := RecipeFromId(recipe_id, db)
		if recipe == nil {
			status = http.StatusNotFound
			msg = "Recipe not Found"
		} else {
			status = http.StatusOK
			msg = "Successful"
		}
		fmt.Println(status, msg, recipe)

		resp := APIResponseItem{
			Status: APIError{Code: status, Msg: msg},
			Data:   make([]APIDataRecipe, 0),
		}

		if status == http.StatusOK {
			resp.Data = append(resp.Data, APIDataRecipe{recipe})
		}

		w.Header().Set("Content-Type", "application/json; charset=UTF-8")
		w.WriteHeader(http.StatusOK)
		if err := json.NewEncoder(w).Encode(resp); err != nil {
			panic(err)
		}

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
