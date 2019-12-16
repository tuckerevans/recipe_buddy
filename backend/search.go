package main

import "database/sql"
import "strings"

func SearchRecipes(query []string, db *sql.DB) ([]Recipe, error) {
	var ts_query = strings.Join(query, "&")
	var ids []int
	var id int
	var matches []Recipe

	rows, err := db.Query(`SELECT id from recipes WHERE
			to_tsvector(title || ' ' ||
				COALESCE(keywords, '') || ' ' ||
				COALESCE(description, '')
				)
			@@ plainto_tsquery('$1')`, ts_query)

	if err != nil {
		return nil, err
	}

	for rows.Next() {
		rows.Scan(&id)
		ids = append(ids, id)
	}

	for i := 0; i < len(ids); i++ {
		matches = append(matches, *RecipeFromId(ids[i], db))
	}

	return matches, nil
}
