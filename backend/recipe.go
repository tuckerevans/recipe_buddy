package main

import "database/sql"
import "strings"

type Ingredient struct {
	Name   string  `json:"name"`
	Amount float64 `json:"amount"`
	Unit   string  `json:"unit"`
}

type Step struct {
	Desc string `json:"instructions"`
	Time int    `json:"timer"`
}

type Recipe struct {
	Id           int          `json:"id"`
	Title        string       `json:"name"`
	Desc         string       `json:"description"`
	Photos       []string     `json:"photos"`
	Serving_size int          `json:"servingSize"`
	Cook_time    int          `json:"cookTime"`
	Rating       int          `json:"rating"`
	Num_cooked   int          `json:"timesCooked"`
	Keywords     []string     `json:"tags"`
	Ingredients  []Ingredient `json:"ingredients"`
	Steps        []Step       `json:"steps"`
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
			FROM steps WHERE recipe_id = $1 ORDER BY step`, id)
	defer rows_steps.Close()
	if err == nil {
		for rows_steps.Next() {
			rows_steps.Scan(&num, &desc, &timer)
			step = Step{
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

	tx, err := db.Begin()
	if err != nil {
		return err
	}
	err = tx.QueryRow(`INSERT INTO recipes (title, photo_urls,
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
		tx.Rollback()
		return err
	}

	for i, ingr := range r.Ingredients {
		res, err := tx.Exec(`INSERT INTO ingredients
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
		res, err := tx.Exec(`INSERT INTO steps
				(step, description, timer, recipe_id)
				VALUES ($1, $2, $3, $4)`,
			i,
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
	tx.Commit()
	return nil
}

func UpdateRecipeDB(r *Recipe, db *sql.DB) error {
	var photo_urls, keywords strings.Builder

	for _, u := range r.Photos {
		photo_urls.WriteString(u)
		photo_urls.WriteRune('|')
	}

	for _, k := range r.Keywords {
		keywords.WriteString(k)
		keywords.WriteRune('|')
	}

	tx, err := db.Begin()
	if err != nil {
		return err
	}
	_, err = tx.Exec(`UPDATE recipes SET (title, photo_urls,
			keywords, description, serving_size, cook_time,
			rating, num_cooked)
			= ($1, $2, $3, $4, $5, $6, $7, $8)
			WHERE id = $9`,
		r.Title,             //1
		photo_urls.String(), //2
		keywords.String(),   //3
		r.Desc,              //4
		r.Serving_size,      //5
		r.Cook_time,         //6
		r.Rating,            //7
		r.Num_cooked,        //8
		r.Id,                //9
	)
	if err != nil {
		tx.Rollback()
		return err
	}

	_, err = tx.Exec("DELETE FROM ingredients WHERE id > $1",
		len(r.Ingredients)-1)
	if err != nil {
		tx.Rollback()
		return err
	}

	for i, ingr := range r.Ingredients {
		_, err := tx.Exec(`INSERT INTO ingredients
				(id, name, amount, unit, recipe_id)
				VALUES ($1, $2, $3, $4, $5)
				ON CONFLICT (id, recipe_id)
				DO UPDATE SET
				(name, amount, unit)
				= ($2, $3, $4)`,

			i,
			ingr.Name,
			ingr.Amount,
			ingr.Unit,
			r.Id,
		)
		if err != nil {
			tx.Rollback()
			return err
		}
	}

	_, err = tx.Exec("DELETE FROM steps WHERE step > $1",
		len(r.Steps)-1)
	if err != nil {
		tx.Rollback()
		return err
	}

	for i, step := range r.Steps {
		_, err := tx.Exec(`INSERT INTO steps
				(step, description, timer, recipe_id)
				VALUES ($1, $2, $3, $4)
				ON CONFLICT (step,recipe_id)
				DO UPDATE SET
				(description, timer)
				= ($2, $3)`,
			i,
			step.Desc,
			step.Time,
			r.Id,
		)
		if err != nil {
			tx.Rollback()
			return err
		}
	}

	tx.Commit()
	return nil
}
