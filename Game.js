class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }
play(){
  form.hide()
  text("Game Started",120,100)
  Player.getplayerinfo()
  if (allplayers!==undefined){
    var displayposition=130
    for (var i in allplayers){
      if (i==="player"+player.index)
      fill("red")
      else 
      fill("black")
      displayposition=displayposition+20
      text(allplayers[i].name+": "+allplayers[i].distance,120,displayposition)
    }
  }
  if (keyIsDown(UP_ARROW)&&player.index!==null){
player.distance=player.distance+=50
player.update()
  }
  
}
  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playercountref=await database.ref('playerCount').once("value")
      if (playercountref.exists()){
        playerCount=playercountref.val()
        player.getCount()

      }
      
      form = new Form()
      form.display();
    }
  }
}
