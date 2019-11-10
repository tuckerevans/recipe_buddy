package main

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

