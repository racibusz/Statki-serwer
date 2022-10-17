class Game {
    constructor(id,host) {
        this.player1 = host
        this.player2 = undefined
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
        try {
            let newShip = new Ship(start, end)
            this.Ships.push(newShip)
        } catch (e) {
            console.log("ERR")
        }
    }
}

class Ship {
    types = {
        1: 'Lodz_Podwodna',
        2: 'Krazownik',
        3: 'Pancernik',
        4: 'Lotniskowiec'
    }

    calculateLength(start, end) {
        if (start === end) return 1

        if (start[0] === end[0]) return Math.abs(start[1] - end[1]) + 1
        if (start[1] === end[1]) return Math.abs(start[0] - end[0]) + 1

        // Statki nie mogą stać po skosie
    }

    determineTypeByLength(length) {
        if (this.types[length] === undefined) return false;
        return this.types[length]
    }

    constructor(start, end) {
//        Start: (x,y), end: (x,y)
        this.start = start;
        this.end = end;

        this.length = this.calculateLength(start, end)
        this.type = this.determineTypeByLength(this.length)
        if (this.type === false) {
            throw new Error("Dlugosc przekracza maksymalna dlugosc statku!")
        }
        // Dlugosc dziala!
    }
}