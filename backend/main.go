package main

import "fmt"
import "io"
import "io/ioutil"
import "net/http"
import "os"
import "strconv"
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

func RecipeList(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*") //Enable CORS

	if r.Method == "GET" {
		var ids []int
		var id int

		rows, err := db.Query("SELECT id FROM recipes")
		if err != nil {
			fmt.Println(err)
		} else {
			for rows.Next() {
				rows.Scan(&id)
				ids = append(ids, id)
			}
		}

		resp := APIResponse{
			Status: APIStatus{Code: 200, Msg: "Successful Request"},
			Data:   ids,
		}

		w.Header().Set("Content-Type",
			"application/json; charset=UTF-8")
		w.WriteHeader(http.StatusOK)
		if err := json.NewEncoder(w).Encode(resp); err != nil {
			panic(err)
		}
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
			w.WriteHeader(http.StatusUnprocessableEntity)
			w.Header().Set("Content-Type",
				"application/json; charset=UTF-8")
			resp := APIResponse{
				Status: APIStatus{
					Code: http.StatusUnprocessableEntity,
					Msg:  "Invalid Recipe"},
			}

			err := json.NewEncoder(w).Encode(resp)
			if err != nil {
				panic(err)
			}
			return
		}

		err = AddRecipeDB(recipe, db)
		if err != nil {
			fmt.Println(err)
			resp := APIResponse{
				Status: APIStatus{Code: http.StatusBadRequest,
					Msg: "Recipe could not be added"},
				Data: recipe,
			}

			w.Header().Set("Content-Type",
				"application/json; charset=UTF-8")
			w.WriteHeader(http.StatusBadRequest)
			if err := json.NewEncoder(w).Encode(resp); err != nil {
				panic(err)
			}
			return
		}

		resp := APIResponse{
			Status: APIStatus{Code: http.StatusCreated,
				Msg: "Recipe added successfully"},
			Data: recipe,
		}

		w.Header().Set("Content-Type", "application/json; charset=UTF-8")
		w.WriteHeader(http.StatusCreated)
		if err := json.NewEncoder(w).Encode(resp); err != nil {
			panic(err)
		}

	} else {
		resp := APIResponse{
			Status: APIStatus{Code: http.StatusMethodNotAllowed,
				Msg: "Invalid method"},
			Data: nil,
		}

		w.Header().Set("Content-Type",
			"application/json; charset=UTF-8")
		w.WriteHeader(http.StatusMethodNotAllowed)
		if err := json.NewEncoder(w).Encode(resp); err != nil {
			panic(err)
		}
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

		resp := APIResponse{
			Status: APIStatus{Code: status, Msg: msg},
		}

		if status == http.StatusOK {
			resp.Data = recipe
		}

		w.Header().Set("Content-Type", "application/json; charset=UTF-8")
		w.WriteHeader(http.StatusOK)
		if err := json.NewEncoder(w).Encode(resp); err != nil {
			panic(err)
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
		resp := APIResponse{
			Status: APIStatus{Code: status, Msg: "Cannot add to specific resource"},
			Data:   nil,
		}

		w.Header().Set("Content-Type",
			"application/json; charset=UTF-8")
		w.WriteHeader(status)
		if err := json.NewEncoder(w).Encode(resp); err != nil {
			panic(err)
		}
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
			w.WriteHeader(http.StatusUnprocessableEntity)
			w.Header().Set("Content-Type", "application/json; charset=UTF-8")
			resp := APIResponse{
				Status: APIStatus{
					Code: http.StatusUnprocessableEntity,
					Msg:  "Invalid Recipe"},
			}
			if err := json.NewEncoder(w).Encode(resp); err != nil {
				panic(err)
			}
			return
		}

		recipe.Id = recipe_id

		err = UpdateRecipeDB(recipe, db)
		if err != nil {
			fmt.Println(err)
			resp := APIResponse{
				Status: APIStatus{Code: http.StatusBadRequest,
					Msg: "Recipe could not be updated"},
				Data: recipe,
			}

			w.Header().Set("Content-Type",
				"application/json; charset=UTF-8")
			w.WriteHeader(http.StatusBadRequest)
			if err := json.NewEncoder(w).Encode(resp); err != nil {
				panic(err)
			}
			return
		}

		resp := APIResponse{
			Status: APIStatus{Code: http.StatusCreated,
				Msg: "Recipe added successfully"},
			Data: recipe,
		}

		w.Header().Set("Content-Type", "application/json; charset=UTF-8")
		w.WriteHeader(http.StatusCreated)
		if err := json.NewEncoder(w).Encode(resp); err != nil {
			panic(err)
		}

	} else if r.Method == "DELETE" {

		res, err := db.Exec(`DELETE FROM recipes where id = $1`,
			recipe_id)
		if err != nil {
			panic(err)
		}

		var status int
		var msg string
		if ra, _ := res.RowsAffected(); ra == 0 {
			status = http.StatusNotFound
			msg = "Recipe Not found"
		} else {
			status = http.StatusOK
			msg = "Recipe Deleted Successfully"
		}

		resp := APIResponse{
			Status: APIStatus{Code: status, Msg: msg},
		}

		w.Header().Set("Content-Type",
			"application/json; charset=UTF-8")
		w.WriteHeader(http.StatusOK)
		if err := json.NewEncoder(w).Encode(resp); err != nil {
			panic(err)
		}

	} else {
		resp := APIResponse{
			Status: APIStatus{Code: http.StatusMethodNotAllowed,
				Msg: "Invalid method"},
			Data: nil,
		}

		w.Header().Set("Content-Type",
			"application/json; charset=UTF-8")
		w.WriteHeader(http.StatusMethodNotAllowed)
		if err := json.NewEncoder(w).Encode(resp); err != nil {
			panic(err)
		}
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
