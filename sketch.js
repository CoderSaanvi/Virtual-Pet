//Create variables here
var dog, happyDog;
var database;
var foodS, foodStock;
var feed, addFood;
var fedTime, lastFed;
var foodObj;
var changeState,readState;
var bedroomImg,gardenImg,washroomImg;
var gameState;

function preload() {
  //load images here
  bedroomImg = loadImage("virtual pet images/Bed Room.png");
  gardenImg = loadImage("virtual pet images/Garden.png");
  washroomImg = loadImage("virtual pet images/Wash Room.png");
  dogImg = loadImage("images/dogImg.png");
  dogHappyImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1000, 400);
  database = firebase.database();

  dog = createSprite(650, 300, 10, 10);
  dog.addImage(dogImg);
  dogImg.resize(100, 100);
  // dog.resize(10);

  foodObj = new Food();

  feed = createButton("Feed the dog");
  feed.position(650, 60);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(750, 60);
  addFood.mousePressed(addFoods);

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);

  fedTime = database.ref("FeedTime");
  fedTime.on("value", function (data) {
    lastFed = data.val();
  });

  //read gamState from database
  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  });

}


function draw() {
  background(46, 139, 87);
  drawSprites();
  /*database.ref("/").update({
    FeedTime:hour()
  })

  fedTime = database.ref("FeedTime");
  fedTime.on("value", function (data) {
    lastFed = data.val();
  });*/

 fill(255);

  if (lastFed >= 12) {
    text("Last Feed: " + lastFed % 12 + " PM", 670, 20);
  } else if (lastFed === 0) {
    text("Last Feed: 12 AM", 90, 70);
  } else {
    text("Last Feed: " + lastFed + " AM", 670, 20);
  }

  if(gameState!= "Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }

  else {
    feed.show();
    addFood.show();
    dog.addImage(dogImg);
  }

  currentTime = hour();
  if(currentTime === (lastFed+1)){
    update("Playing");
    foodObj.garden();
  }
  else if(currentTime === (lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }
  else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }
  else{
    update("Hungry");
    foodObj.display();
  }

  foodObj.display();


  drawSprites();
  //add styles here
  // text("Note: Press UP_ARROW Key To Feed Drago Milk!",100,30);
  // text("Food Remaining: " + foodS,180,50);
  textSize(10);

}

//Function to read values from DB
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

//Function to write values in DB
function writeStock(x) {
  if (x <= 0) {
    x = 20;
    dog.addImage(dogImg);
  }

  else {
    x = x - 1;
  }

  database.ref('/').update({ Food: x });
}

function addFoods() {
  foodS++
  database.ref('/').update({
    Food: foodS
  })
}

function feedDog() {
  dog.addImage(dogHappyImg);
  dogHappyImg.resize(100, 100);

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').update({
  Food: foodObj.getFoodStock(),
  FeedTime: hour(),
  gameState:"Hungry"
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}



