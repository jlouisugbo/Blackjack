export function initializeCards() {
    const cardList = [
        // 2s
        ['2_of_clubs.svg', '2', 2],
        ['2_of_diamonds.svg', '2', 2],
        ['2_of_hearts.svg', '2', 2],
        ['2_of_spades.svg', '2', 2],
        // 3s
        ['3_of_clubs.svg', '3', 3],
        ['3_of_diamonds.svg', '3', 3],
        ['3_of_hearts.svg', '3', 3],
        ['3_of_spades.svg', '3', 3],
        // 4s
        ['4_of_clubs.svg', '4', 4],
        ['4_of_diamonds.svg', '4', 4],
        ['4_of_hearts.svg', '4', 4],
        ['4_of_spades.svg', '4', 4],
        // 5s
        ['5_of_clubs.svg', '5', 5],
        ['5_of_diamonds.svg', '5', 5],
        ['5_of_hearts.svg', '5', 5],
        ['5_of_spades.svg', '5', 5],
        // 6s
        ['6_of_clubs.svg', '6', 6],
        ['6_of_diamonds.svg', '6', 6],
        ['6_of_hearts.svg', '6', 6],
        ['6_of_spades.svg', '6', 6],
        // 7s
        ['7_of_clubs.svg', '7', 7],
        ['7_of_diamonds.svg', '7', 7],
        ['7_of_hearts.svg', '7', 7],
        ['7_of_spades.svg', '7', 7],
        // 8s
        ['8_of_clubs.svg', '8', 8],
        ['8_of_diamonds.svg', '8', 8],
        ['8_of_hearts.svg', '8', 8],
        ['8_of_spades.svg', '8', 8],
        // 9s
        ['9_of_clubs.svg', '9', 9],
        ['9_of_diamonds.svg', '9', 9],
        ['9_of_hearts.svg', '9', 9],
        ['9_of_spades.svg', '9', 9],
        // 10s
        ['10_of_clubs.svg', '10', 10],
        ['10_of_diamonds.svg', '10', 10],
        ['10_of_hearts.svg', '10', 10],
        ['10_of_spades.svg', '10', 10],
        // Jacks
        ['jack_of_clubs.svg', 'jack', 10],
        ['jack_of_diamonds.svg', 'jack', 10],
        ['jack_of_hearts.svg', 'jack', 10],
        ['jack_of_spades.svg', 'jack', 10],
        // Queens
        ['queen_of_clubs.svg', 'queen', 10],
        ['queen_of_diamonds.svg', 'queen', 10],
        ['queen_of_hearts.svg', 'queen', 10],
        ['queen_of_spades.svg', 'queen', 10],
        // Kings
        ['king_of_clubs.svg', 'king', 10],
        ['king_of_diamonds.svg', 'king', 10],
        ['king_of_hearts.svg', 'king', 10],
        ['king_of_spades.svg', 'king', 10],
        // Aces
        ['ace_of_clubs.svg', 'ace', [1, 11]],
        ['ace_of_diamonds.svg', 'ace', [1, 11]],
        ['ace_of_hearts.svg', 'ace', [1, 11]],
        ['ace_of_spades.svg', 'ace', [1, 11]]
    ];
    return cardList;
}

export function calculateBestValue(values){
    let total = 0;
    let aces = 0;

    values.forEach(val => {
        if(Array.isArray(val)){
            aces++;
            total+=11;
        } else {
            total += val;
        }
    });

    while(total > 21 && aces > 0){
        total -= 10;
        aces--;
    }
    return total;
}