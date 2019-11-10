package main

import "database/sql"
import "strings"

type Ingredient struct {
	Name   string
	Amount float64
	Unit   string
}

type Step struct {
	Num  int
	Desc string
	Time int
}

type Recipe struct {
	Id           int
	Title        string
	Desc         string
	Photos       []string
	Serving_size int
	Cook_time    int
	Rating       int
	Keywords     []string
	Ingredients  []Ingredient
	Steps        []Step
}

func MakeRecipe() *Recipe {
	var r Recipe

	r = Recipe{
		Id:           0,
		Title:        "",
		Desc:         "",
		Serving_size: 0,
		Cook_time:    0,
		Rating:       5,
		Keywords:     make([]string, 0),
		Ingredients:  make([]Ingredient, 0),
		Steps:        make([]Step, 0)}

	return &r

}

func RecipeFromId(id int, db *sql.DB) *Recipe {
	var rec Recipe
	var ingr Ingredient
	var step Step

	rows, err := db.Query("SELECT id, title, photo_urls, keywords, description, serving_size, cook_time, rating, num_cooked FROM recipes WHERE id = $1", id)
	if err == nil {
		var id, rating, num_cooked, servings, cook_time int
		var title, photo_urls, keywords, desc string

		defer rows.Close()
		if rows.Next() {
			rows.Scan(&id, &title, &photo_urls, &keywords, &desc, &servings, &cook_time, &rating, &num_cooked)
			rec = Recipe{
				Id:           id,
				Title:        title,
				Desc:         desc,
				Photos:       make([]string, 0),
				Serving_size: servings,
				Cook_time:    cook_time,
				Rating:       rating,
				Keywords:     make([]string, 0),
				Ingredients:  make([]Ingredient, 0),
				Steps:        make([]Step, 0)}

			if len(photo_urls) > 0 {
				photos := strings.Split(photo_urls, "|")
				for _, p := range photos {
					rec.Photos = append(rec.Photos, p)
				}
			}
			if len(keywords) > 0 {
				keyword_split := strings.Split(keywords, "|")
				for _, k := range keyword_split {
					rec.Keywords = append(rec.Keywords, k)
				}
			}

			var name, unit string
			var amount float64
			rows, err = db.Query("SELECT name, amount, unit FROM ingredients WHERE recipe_id = $1", id)
			if err == nil {
				for rows.Next() {
					rows.Scan(&name, &amount, &unit)
					ingr = Ingredient{
						Name:   name,
						Amount: amount,
						Unit:   unit,
					}
					rec.Ingredients = append(rec.Ingredients, ingr)
				}
			}

			var num, timer int
			rows, err = db.Query("SELECT step, description, timer FROM steps WHERE recipe_id = $1", id)
			if err == nil {
				for rows.Next() {
					rows.Scan(&num, &desc, &timer)
					step = Step{
						Num:  num,
						Desc: desc,
						Time: timer,
					}
					rec.Steps = append(rec.Steps, step)
				}
			}

			return &rec
		}
	}

	return nil
}
