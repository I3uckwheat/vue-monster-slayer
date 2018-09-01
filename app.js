new Vue({
  el: '#app',
  data: {
    gameStarted: false,
    playerHealth: 100,
    monsterHealth: 100,
    gameLog: []
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.gameLog = [];
      this.gameStarted = true;
    },

    round(playerAction) {
      const monsterAttackDamage = this.calculateBaseDamage() + 3;
      const playerAttackDamage = this.calculateBaseDamage();

      this.playerHealth -= monsterAttackDamage;
      this.log('monster', monsterAttackDamage, 'player');

      switch (playerAction) {
        case 'attack':
          this.monsterHealth -= playerAttackDamage;
          this.log('player', playerAttackDamage, 'monster');
          break;
        case 'spAttack':
          this.monsterHealth -= playerAttackDamage + 10;
          this.log('player', playerAttackDamage, 'monster', 'special hits');
          break;
        case 'heal':
          this.playerHealth += (playerAttackDamage / 2) + 5;
          if (this.playerHealth > 100) this.playerHealth = 100;
          this.log('player', playerAttackDamage, 'player', 'heal');
          break;
        default:
          break;
      }

      if (this.playerHealth < 0) {
        this.gameStarted = false;
        this.playerLose();
        return;
      }

      if (this.monsterHealth < 0) {
        this.gameStarted = false;
        this.playerWin();
        return;
      }
    },


    calculateBaseDamage() {
      return Math.floor(Math.random() * 20 + 1)
    },

    log(character, amount, victim, action = 'hits') {
      this.gameLog.push({
        character,
        action,
        amount,
        victim
      });
    },

    playerLose() {
      alert("You've Lost!");
    },

    playerWin() {
      alert("You've Won!!!")
    }
  }
})