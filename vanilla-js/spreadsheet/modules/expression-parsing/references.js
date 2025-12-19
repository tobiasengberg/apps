export const getLetterCombination = (id) => {
    let [row, column] = id.split("-").map(i => parseInt(i));
    let firstLetter = Math.floor(column / 25);
    let secondLetter = column % 25;
    return column > 25 ? `${String.fromCharCode(64 + firstLetter)}${String.fromCharCode(64 + secondLetter)}${row}`
        : `${String.fromCharCode(64 + column)}${row}`;
}

