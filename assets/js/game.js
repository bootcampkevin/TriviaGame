$(document).ready(function () {
  //
  //
  //
  //
  //Global Variables, then Objects, then Function Calls, yo.

  //GLOBALS

  
  //OBJECTS
  // Trivia Questions
  class Fighter {
    constructor([name, tag], hp, ap, cap, nature) {
      this.name = [name, tag];
      this.healthPoints = hp;
      this.attackPower = ap;
      this.counterAttackPower = cap;
      this.nature = nature;
      this.maxHP = hp;
      this.origAP = ap;

      // this.characterDiv = '<button class="player-card float-left m-1" data-fighter-nature="'+this.name[1]+'" style="width: 120px;">'+
      this.characterDiv = '<button class="player-card options float-left m-1 ' + this.nature + '" id="' + this.name[1] + '" data-fighter-nature="' + this.nature + '" style="width: 120px;">' +
        '<div class="name text-center">' + this.name[0] + '</div>' +
        '<img class="img-thumbnail" src="./assets/images/players/star-wars_' + this.nature + '_' + this.name[1] + '.png">' +
        '<div class="health text-center" id="health-' + this.name[1] + '">' + this.healthPoints + '</div>' + '</button>'

    }
    reset() {
      this.healthPoints = this.maxHP;
      this.attackPower = this.origAP;

    };
    greeting() {
      console.log(`Fighter: I'm ${this.name[0]}`);
    };

  }//class Questions

  //constructor([name, tag], hp, ap, cap, nature)
  let kylo = new Fighter(['Kylo Ren', 'kylo'], 100, 25, 15, 'evil');
 
});//document ready