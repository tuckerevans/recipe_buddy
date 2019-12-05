import {Component,OnInit} from '@angular/core';

/**
 * @title Card with multiple sections
 */
@Component({
  selector: 'card-fancy-example',
  templateUrl: 'card-fancy-example.html',
  styleUrls: ['card-fancy-example.css'],
})
export class CardFancyExample implements OnInit {
  recipeNumber: number;
  totalRecipeNum: number;
  recipeNames: string[] = ["Pizza", "Pancakes", "Pasta", "Chicken", "Eggs", "Sandwich", "Meatballs"];
  recipeName1: string;
  recipeName2: string;
  recipeName3: string;
  recipeImgs: string[] = ["https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&w=1000&q=80",
   "https://www.mamaknowsglutenfree.com/wp-content/uploads/2019/01/gluten-free-pancakes-rc.jpg",
   "https://feedmephoebe.com/wp-content/uploads/2017/10/Homemade-Gluten-Free-Pasta-Recipe-Tuscan-Pici-Spaghetti-Noodles-19.jpg", "https://images.all-free-download.com/images/graphicthumb/chicken_picture_3_167117.jpg", "https://www.photos-public-domain.com/wp-content/uploads/2011/11/fried-eggs.jpg", "https://image.freepik.com/free-photo/sandwich_1339-1108.jpg", "https://www.glutenfreepalate.com/wp-content/uploads/2019/05/Gluten-Free-Meatballs-3.2-720x720.jpg"];
   faceImgs: string[] = ["https://making-the-web.com/sites/default/files/clipart/174377/sad-face-pictures-free-174377-9562118.png","https://cdn.shopify.com/s/files/1/1061/1924/products/Neutral_Face_Emoji_large.png?v=1571606037","https://img.clipartlook.com/smiley-face-clipart-free-happy-face-clip-art-free-250_250.png" ]
  likeRatings: number[] = [2,2,0,1,2,0,1]
  likeRatingImg1: string;
  likeRatingImg2: string;
  likeRatingImg3: string;
  recipeImage1: string;
  recipeImage2: string;
  recipeImage3: string;

  ngOnInit() {
    this.recipeNumber = 0;
    this.totalRecipeNum = this.recipeNames.length;
    this.recipeName1 = this.recipeNames[this.recipeNumber];
    this.recipeName2 = this.recipeNames[this.recipeNumber + 1];
    this.recipeName3 = this.recipeNames[this.recipeNumber + 2];
    this.recipeImage1 = this.recipeImgs[this.recipeNumber];
    this.recipeImage2 = this.recipeImgs[this.recipeNumber + 1];
    this.recipeImage3 = this.recipeImgs[this.recipeNumber + 2];
    this.likeRatingImg1 = this.faceImgs[this.likeRatings[this.recipeNumber]];
    this.likeRatingImg2 = this.faceImgs[this.likeRatings[this.recipeNumber + 1]];
    this.likeRatingImg3 = this.faceImgs[this.likeRatings[this.recipeNumber + 2]];
  }

  addPage() {
    /**Code here to open add page */
  }
  submitSearch() {
    /**Code here to submit search */
  }
  shoppingCart() {
    /**Code here to open shopping cart with no ingredients */
  }

  previous() {
    if(this.recipeNumber > 2)
    {
      this.recipeNumber = this.recipeNumber - 3;
      this.recipeName1 = this.recipeNames[this.recipeNumber];
      this.recipeName2 = this.recipeNames[this.recipeNumber + 1];
      this.recipeName3 = this.recipeNames[this.recipeNumber + 2];
      this.recipeImage1 = this.recipeImgs[this.recipeNumber];
      this.recipeImage2 = this.recipeImgs[this.recipeNumber + 1];
      this.recipeImage3 = this.recipeImgs[this.recipeNumber + 2];
      this.likeRatingImg1 = this.faceImgs[this.likeRatings[this.recipeNumber]];
      this.likeRatingImg2 = this.faceImgs[this.likeRatings[this.recipeNumber + 1]];
      this.likeRatingImg3 = this.faceImgs[this.likeRatings[this.recipeNumber + 2]];
    } else
    {
      this.recipeNumber = 0;
      this.recipeName1 = this.recipeNames[this.recipeNumber];
      this.recipeName2 = this.recipeNames[this.recipeNumber + 1];
      this.recipeName3 = this.recipeNames[this.recipeNumber + 2];
      this.recipeImage1 = this.recipeImgs[this.recipeNumber];
      this.recipeImage2 = this.recipeImgs[this.recipeNumber + 1];
      this.recipeImage3 = this.recipeImgs[this.recipeNumber + 2];
      this.likeRatingImg1 = this.faceImgs[this.likeRatings[this.recipeNumber]];
      this.likeRatingImg2 = this.faceImgs[this.likeRatings[this.recipeNumber + 1]];
      this.likeRatingImg3 = this.faceImgs[this.likeRatings[this.recipeNumber + 2]];
    }
  }
  next() {
    this.recipeNumber = this.recipeNumber + 3;
    if(this.recipeNumber + 3 > this.totalRecipeNum)
    {
      this.recipeNumber = this.totalRecipeNum - 3;
    }
    this.recipeName1 = this.recipeNames[this.recipeNumber];
    this.recipeName2 = this.recipeNames[this.recipeNumber + 1];
    this.recipeName3 = this.recipeNames[this.recipeNumber + 2];
    this.recipeImage1 = this.recipeImgs[this.recipeNumber];
    this.recipeImage2 = this.recipeImgs[this.recipeNumber + 1];
    this.recipeImage3 = this.recipeImgs[this.recipeNumber + 2];
    this.likeRatingImg1 = this.faceImgs[this.likeRatings[this.recipeNumber]];
    this.likeRatingImg2 = this.faceImgs[this.likeRatings[this.recipeNumber + 1]];
    this.likeRatingImg3 = this.faceImgs[this.likeRatings[this.recipeNumber + 2]];
  }

  cookPage1(){
    /**Code here to go to cook page for recipe in position 1 */
  }
  edit1() {
    /**Code here to edit recipe in position 1 */
  }
  shoppingCart1() {
    /**Code here to open shopping cart with ingredients from the recipe in position 1 */
  }
  delete1() {
    /**Code here to delete recipe in position 1 */
  }

  cookPage2(){
    /**Code here to go to cook page for recipe in position 2 */
  }
  edit2() {
    /**Code here to edit recipe in position 2 */
  }
  shoppingCart2() {
    /**Code here to open shopping cart with ingredients from the recipe in position 2 */
  }
  delete2() {
    /**Code here to delete recipe in position 2 */
  }

  cookPage3(){
    /**Code here to go to cook page for recipe in position 3 */
  }
  edit3() {
    /**Code here to edit recipe in position 3 */
  }
  shoppingCart3() {
    /**Code here to open shopping cart with ingredients from the recipe in position 3 */
  }
  delete3() {
    /**Code here to delete recipe in position 3 */
  }

}


/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */