class Food {
    constructor (){
        this.foodStock = null;
        this.lastFed = null;
        this.image = loadImage("js/Milk.png");
    }

    getFoodStock(){
        return this.foodStock;
    }

    updateFoodStock(foodS){
        this.foodStock = foodS;
        console.log(this.foodStock);
    }

    bedroom(){
        background(bedroomImg,500,200);
    }

    garden(){
        backgorund(gardenImg,500,200);
    }

    washroom(){
        background(washroomImg,500,200);
    }

    //deductFood(){

    //}

    display(){
        var x = 80, y = 100

        imageMode(CENTER);
        console.log(this.foodStock);
       // image(this.image,x,y,50,50);

        if(this.foodStock !== 0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10===0){
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x = x+30;
            }
        }
    }
}