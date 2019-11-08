package main

import "fmt"
import "net/http"

func RecipeList(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		fmt.Printf("Return all recipe names...\n")
	} else if r.Method == "POST" {
	} else if r.Method == "DELETE" {
	}
}

func HandleRecipe(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Path[len("/recipes/"):]
	if r.Method == "GET" {
		fmt.Printf("Return recipe \"%s\"...\n", name)
	} else if r.Method == "POST" {
		fmt.Printf("Create recipe \"%s\"...\n", name)
	} else if r.Method == "DELETE" {
		fmt.Printf("Delete recipe \"%s\"...\n", name)
	}
}

func main() {
	http.HandleFunc("/recipes", RecipeList)
	http.HandleFunc("/recipes/", HandleRecipe)
	http.ListenAndServe(":8888", nil)
}
