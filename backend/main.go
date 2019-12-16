package main

import "fmt"
import "io"
import "io/ioutil"
import "net/http"
import "os"
import "strconv"
import "strings"
import _ "github.com/lib/pq"
import "database/sql"
import "encoding/json"

type APIStatus struct {
	Code int
	Msg  string
}

type APIResponse struct {
	Status APIStatus
	Data   interface{}
}

func MakeAPIResponse(status int, msg string, data interface{}) *APIResponse {
	return &APIResponse{
		Status: APIStatus{
			Code: status,
			Msg:  msg,
		},
		Data: data,
	}
}

func sendResponse(w http.ResponseWriter, code int, msg string, data interface{}) {
	w.Header().Set("Access-Control-Allow-Origin", "*") //Enable CORS
	w.Header().Set("Content-Type",
		"application/json; charset=UTF-8")

	w.WriteHeader(code)

	resp := MakeAPIResponse(code, msg, data)

	if err := json.NewEncoder(w).Encode(resp); err != nil {
		panic(err)
	}
}

func RecipeList(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		var ids []int
		var recipes []Recipe
		var id int
		var data interface{}
		var err error

		query, ok := r.URL.Query()["query"]

		if !ok || len(query[0]) < 1 {
			rows, err := db.Query("SELECT id FROM recipes")
			if err != nil {
				fmt.Println(err)
			} else {
				for rows.Next() {
					rows.Scan(&id)
					ids = append(ids, id)
				}
			}
			data = ids
		} else {
			recipes, err = SearchRecipes(strings.Split(query[0], " "), db)
			if err != nil {
				panic(err)
			}
			data = recipes
		}

		sendResponse(w, http.StatusOK, "Successful Request", data)

	} else if r.Method == "POST" {
		var recipe *Recipe

		body, err := ioutil.ReadAll(io.LimitReader(r.Body, 1048576))
		if err != nil {
			panic(err)
		}

		err = r.Body.Close()
		if err != nil {
			panic(err)
		}

		err = json.Unmarshal(body, &recipe)
		if err != nil {
			fmt.Println(err)
			sendResponse(w, http.StatusUnprocessableEntity,
				"Invalid Recipe", nil)
			return
		}

		err = AddRecipeDB(recipe, db)
		if err != nil {
			fmt.Println(err)
			sendResponse(w, http.StatusBadRequest,
				"Recipe could not be added", recipe)
			return
		}

		sendResponse(w, http.StatusCreated, "Recipe added successfully",
			recipe)

	} else if r.Method == "OPTIONS" {

		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS") //Enable CORS
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")       //Enable CORS
		sendResponse(w, http.StatusOK, "Set Allowed Methods CORS", nil)
	} else {
		sendResponse(w, http.StatusMethodNotAllowed, "Invalid method",
			nil)

	}
}

func SingleRecipe(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*") //Enable CORS

	recipe_id, err := strconv.Atoi(r.URL.Path[len("/recipes/"):])
	if err != nil {
		fmt.Println("Not a valid ID")
		return
	}
	if r.Method == "GET" {
		recipe := RecipeFromId(recipe_id, db)
		if recipe == nil {
			sendResponse(w, http.StatusNotFound, "Recipe not Found",
				nil)
		} else {
			sendResponse(w, http.StatusOK, "Successful", recipe)
		}

	} else if r.Method == "POST" {
		var status int
		row := db.QueryRow(`SELECT id FROM recipes WHERE id = $1`,
			recipe_id)

		err := row.Scan(&recipe_id)

		if err == sql.ErrNoRows {
			status = http.StatusNotFound
		} else {
			status = http.StatusConflict
		}

		sendResponse(w, status, "Cannot add to specific resource",
			nil)
	} else if r.Method == "PUT" {
		var recipe *Recipe

		body, err := ioutil.ReadAll(io.LimitReader(r.Body, 1048576))
		if err != nil {
			panic(err)
		}

		err = r.Body.Close()
		if err != nil {
			panic(err)
		}

		err = json.Unmarshal(body, &recipe)
		if err != nil {
			fmt.Println(err)
			sendResponse(w, http.StatusUnprocessableEntity,
				"Invalid Recipe", nil)
			return
		}

		recipe.Id = recipe_id

		err = UpdateRecipeDB(recipe, db)
		if err != nil {
			fmt.Println(err)
			sendResponse(w, http.StatusBadRequest,
				"Recipe could not be updated", recipe)

			return
		}

		sendResponse(w, http.StatusCreated, "Recipe added successfully",
			recipe)

	} else if r.Method == "DELETE" {

		res, err := db.Exec(`DELETE FROM recipes where id = $1`,
			recipe_id)
		if err != nil {
			panic(err)
		}

		if ra, _ := res.RowsAffected(); ra == 0 {
			sendResponse(w, http.StatusNotFound, "Recipe Not found",
				nil)
		} else {
			sendResponse(w, http.StatusOK,
				"Recipe Deleted Successfully", nil)
		}

	} else if r.Method == "OPTIONS" {

		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS") //Enable CORS
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")                    //Enable CORS
		sendResponse(w, http.StatusOK, "Set Allowed Methods CORS", nil)
	} else {
		sendResponse(w, http.StatusMethodNotAllowed, "Invalid method",
			nil)
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
	db, err = sql.Open("postgres", dbinfo)
	if err != nil {
		panic(err)
	}

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	http.HandleFunc("/recipes", RecipeList)
	http.HandleFunc("/recipes/", SingleRecipe)
	http.ListenAndServe(":8888", nil)
}
