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
	Num_cooked   int
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
		Num_cooked:   0,
		Keywords:     make([]string, 0),
		Ingredients:  make([]Ingredient, 0),
		Steps:        make([]Step, 0)}

	return &r

}

func RecipeFromId(id int, db *sql.DB) *Recipe {
	var rec Recipe
	var ingr Ingredient
	var step Step

	rows := db.QueryRow(`SELECT title, photo_urls, keywords,
			description, serving_size, cook_time, rating,
			num_cooked FROM recipes WHERE id = $1`, id)

	var rating, num_cooked, servings, cook_time int
	var title, photo_urls, keywords, desc string

	err := rows.Scan(&title, &photo_urls, &keywords, &desc,
		&servings, &cook_time, &rating, &num_cooked)

	if err == sql.ErrNoRows {
		return nil
	}

	rec = Recipe{
		Id:           id,
		Title:        title,
		Desc:         desc,
		Photos:       make([]string, 0),
		Serving_size: servings,
		Cook_time:    cook_time,
		Rating:       rating,
		Num_cooked:   num_cooked,
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
	rows_ingr, err := db.Query(`SELECT name, amount, unit
			FROM ingredients WHERE recipe_id = $1`,
		id)
	defer rows_ingr.Close()
	if err == nil {
		var i int
		for rows_ingr.Next() {
			rows_ingr.Scan(&name, &amount, &unit)
			ingr = Ingredient{
				Name:   name,
				Amount: amount,
				Unit:   unit,
			}
			rec.Ingredients = append(rec.Ingredients, ingr)
		}
	}

	var num, timer int
	rows_steps, err := db.Query(`SELECT step, description, timer
			FROM steps WHERE recipe_id = $1`, id)
	defer rows_steps.Close()
	if err == nil {
		for rows_steps.Next() {
			rows_steps.Scan(&num, &desc, &timer)
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

func AddRecipeDB(r *Recipe, db *sql.DB) error {
	var photo_urls, keywords strings.Builder
	var id int

	for _, u := range r.Photos {
		photo_urls.WriteString(u)
		photo_urls.WriteRune('|')
	}

	for _, k := range r.Keywords {
		keywords.WriteString(k)
		keywords.WriteRune('|')
	}

	err := db.QueryRow(`INSERT INTO recipes (title, photo_urls,
			keywords, description, serving_size, cook_time,
			rating, num_cooked)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
			RETURNING id`,
		r.Title,             //1
		photo_urls.String(), //2
		keywords.String(),   //3
		r.Desc,              //4
		r.Serving_size,      //5
		r.Cook_time,         //6
		r.Rating,            //7
		r.Num_cooked,        //8
	).Scan(&id)
	if err != nil {
		return err
	}

	for i, ingr := range r.Ingredients {
		res, err := db.Exec(`INSERT INTO ingredients
				(id, name, amount, unit, recipe_id)
				VALUES ($1, $2, $3, $4, $5)`,
			i,
			ingr.Name,
			ingr.Amount,
			ingr.Unit,
			id,
		)

		if ra, _ := res.RowsAffected(); ra == 0 || err != nil {
			r.Ingredients = append(r.Ingredients[:i],
				r.Ingredients[i+1:]...)
		}
	}

	for i, step := range r.Steps {
		res, err := db.Exec(`INSERT INTO steps
				(step, description, timer, recipe_id)
				VALUES ($1, $2, $3, $4)`,
			step.Num,
			step.Desc,
			step.Time,
			id,
		)

		if ra, _ := res.RowsAffected(); ra == 0 || err != nil {
			r.Ingredients = append(r.Ingredients[:i],
				r.Ingredients[i+1:]...)
		}
	}

	r.Id = id
	return nil
}
