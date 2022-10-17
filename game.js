class Game {
    constructor() {
        this.board = Board()
    }
}

class Board {
    constructor() {
        this.Ships = []
    }
}

class Ship {
    calculateLength(start, end) {
        if (start === end) return 1

        if (start[0] === end[0]) return start[1] - end[1]
        if (start[1] === end[1]) return start[0] - end[0]

        // Statki nie mogą stać po skosie
        // Zaladamy, ze start > end tzn, ze podano to w kolejnosci od lewej do prawej
    }

    constructor(start, end) {
//        Start: (x,y), end: (x,y)
        this.start = start;
        this.end = end;

        this.length = this.calculateLength(start, end)
        console.log(this.length)
    }
}
let x = new Ship((0,1), (0,5))
console.log(x.length)