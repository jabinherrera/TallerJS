let Player1 = {
    name: "",
    class: "",
    firstAttack: "",
    secondAttack: "",
    health: 1,
    speed: 1
}

let Player2 = {
    name: "",
    class: "",
    firstAttack: "",
    secondAttack: "",
    health: 1,
    speed: 1
}

let message = "";

const namesPersonaje1 = ["Jimin", "Jin", "Suga", "V"]

const namesPersonaje2 = ["Jennie", "Lisa", "Jisoo", "Rose"]

const classes = ["MAGICIAN", "KNIGHT", "WARRIOR", "FAIRY"]

const attacks = require("./attacks.json");

function generateRandomNumber(minimo, maximo) {
    let randomNumber = Math.floor(Math.random() * (maximo + 1 - minimo)) + minimo;
    return randomNumber;
}

const PhysicalAttacks = attacks.filter(attack => attack.type === "PHYSICAL")

const MagicAttacks = attacks.filter(attack => attack.type === "MAGIC")


//TODO: Ataques diferentes
function setAttacks(Player) {
    if (Player.class === "KNIGHT" || Player.class === "WARRIOR") {
        Player.firstAttack = PhysicalAttacks[generateRandomNumber(0, PhysicalAttacks.length-1)];
        Player.secondAttack = PhysicalAttacks[generateRandomNumber(0, PhysicalAttacks.length-1)];
    } else {
        Player.firstAttack = MagicAttacks[generateRandomNumber(0, MagicAttacks.length-1)];
        Player.secondAttack = MagicAttacks[generateRandomNumber(0, MagicAttacks.length-1)];
    }
}

function createPlayer1() {
    Player1.name = namesPersonaje1[generateRandomNumber(0, 3)];
    Player1.class = classes[generateRandomNumber(0, 3)];
    setAttacks(Player1);
    Player1.health = generateRandomNumber(100, 200);
    Player1.speed = generateRandomNumber(1, 10);
}

function createPlayer2() {
    Player2.name = namesPersonaje2[generateRandomNumber(0, 3)];
    Player2.class = classes[generateRandomNumber(0, 3)];
    setAttacks(Player2);
    Player2.health = generateRandomNumber(100, 200);
    Player2.speed = generateRandomNumber(1, 10);
}

function compareSpeed() {
    if (Player1.speed === Player2.speed) {
        let rng = generateRandomNumber(0, 1);
        if (rng ===0) {
            return true;
        } else {
            return false;
        }
    }else {
        if (Player1.speed > Player2.speed) {
            return true;
        } else {
            return false;
        }
    }
}

function decideOrder() {

}

function selectAttack(player) {
    let rng = generateRandomNumber(0, 1);
    if (rng === 0) {
        return player.firstAttack;
    } else {
        return player.secondAttack;
    }
}

function checkAccuracy(attack) {
    let rng = generateRandomNumber(0, 100);
    if (attack.accuracy >= rng) {
        message = "... Da en el blanco!";
        return attack.damage;
    } else {
        message = "... Falla!";
        return 0;
    }
}

function attack(player, objective) {
    let choseAttack = selectAttack(player);
    objective.health = objective.health - checkAccuracy(choseAttack);
    return choseAttack.name;
}

function play () {
    createPlayer1();
    createPlayer2();
    let turn = 1;
    let first;
    let second;
    let fightLogs = "";


    if (compareSpeed() === true) {
        first = Player1;
        second = Player2;
    } else {
        first = Player2;
        second = Player1;
    }

    fightLogs = fightLogs + ("### INICIO ###");
    fightLogs = fightLogs + ("\n")
    fightLogs = fightLogs + (`${first.name} ${"|"} ${first.class} ${"|"} ${first.health} ${"de vida VS"} ${second.name} ${"|"} ${second.class} ${"|"} ${second.health} ${"de vida"}`);
    fightLogs = fightLogs + ("\n")
    fightLogs = fightLogs + ("### BATALLA ###");


    do {
        fightLogs = fightLogs + ("\n")
        fightLogs = fightLogs + (`${"Turno"} ${turn}`)
        fightLogs = fightLogs + ("\n")
        turn = turn + 1;
        fightLogs = fightLogs + (`${first.name} ${"ataca con"} ${attack(first, second)}${message} ${"La vida de"} ${second.name} ${"queda en"} ${second.health}`);
        fightLogs = fightLogs +( "\n")
        fightLogs = fightLogs + (`${second.name} ${"ataca con"} ${attack(second, first)}${message} ${"La vida de"} ${first.name} ${"queda en"} ${first.health}`);
    } while (first.health > 0 && second.health > 0)

    return fightLogs;
}

function generateFileLog(logs, filename) {
    const fs = require("fs");
    fs.writeFile(filename, logs, (err) => {
        if (err) throw err;
    });
}

generateFileLog(play(), "logs_batalla.txt");


