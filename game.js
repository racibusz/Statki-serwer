class Game {
    constructor(id) {
        this.id = id
    }
}


class Player {
    constructor(nickname) {
        this.nickname = nickname
        this.board = new Board()
        this.board.empty()
    }

    placeShip(start, end) {
        this.board.placeShip(start, end)
    }
}

module.exports = {
    Game: Game,
    Player: Player
};

class Board {
    constructor() {
        this.Ships = []
    }

    empty() {
        this.Ships = []
    }

    placeShip(start, end) {
        let newShip = new Ship(start, end)
        this.Ships.push(newShip)
    }

    shoot(coords) {
        for (let i = 0; i <= this.Ships.length - 1; i++) {
            let didIHit = this.Ships[i].shoot(coords)
            if (didIHit) return true
        }
        return false
    }
}
class Ship {
    STATUSSES = {
        PLACED: 0,
        HIT: 1,
        DESTROYED: 2
    }
    status = this.STATUSSES.PLACED


    types = {
        1: 'Lodz_Podwodna',
        2: 'Krazownik',
        3: 'Pancernik',
        4: 'Lotniskowiec'
    }
    fieldsHit = []
    fields = []

    getAllFields(start, end) {
        let fields = []
        if (start[0] === end[0]) {
            for (let i = start[1]; i <= end[1]; i++) {
                fields.push([start[0], i])
            }
        } else if (start[1] === end[1]) {
            for (let i = start[0]; i <= end[0]; i++) {
                fields.push([i, start[1]])
            }
        }
        return fields
    }

    determineTypeByLength(length) {
        if (this.types[length] === undefined) return false;
        return this.types[length]
    }

    checkIfDestroyed(){
        if(this.fieldsHit.length === this.fields.length){
            this.status = this.STATUSSES.DESTROYED
        }
        if(this.fieldsHit.length > 0){
            this.status = this.STATUSSES.HIT
        }
    }
    shoot(field) {
        for (let i = 0; i <= this.fields.length - 1; i++) {
//            Nie dzialalo (field == this.fields[i])
            if ((this.fields[i][0] === field[0]) && (this.fields[i][1] === field[1])) {
                this.fieldsHit.push(field)
                this.checkIfDestroyed()
                return true
            }
        }
        return false
    }

    constructor(start, end) {
//        Start: (x,y), end: (x,y)
        this.start = start;
        this.end = end;
        this.fields = this.getAllFields(start, end)
        this.length = this.fields.length
        this.type = this.determineTypeByLength(this.length)
        if (this.type === false) {
            throw new Error("Dlugosc przekracza maksymalna dlugosc statku!")
        }
    }
}

p1 = new Player("Majsions")
p1.placeShip([0, 0], [0, 3])
p1.board.shoot([0, 1])
console.log(p1.board.Ships)
