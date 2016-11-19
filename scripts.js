var array;
var tempArray;
var SIZE_ARRAY = 40;

$(document).ready(function () {
    array = Create2DArray(SIZE_ARRAY);
    tempArray = Create2DArray(SIZE_ARRAY);

    start();

    $("#start").click(function (event) {
        event.preventDefault();

        start();
    });

    function start() {   
        clean();
        printGame();
    }

    $(document).keypress(function (e) {
        //console.log(e.which);
        if (e.which == 13) {
            nextRound();
        }

        if (e.which == 48) {
            start();
        }
    });


    $("#next").click(function (event) {
        event.preventDefault();

        nextRound();
    });

    $("#fill").click(function (event) {
        event.preventDefault();
        
        fill();        
    });

    $(document).on("click", ".life", function () {
        var clicked = $(this);

        var x = clicked.attr("x"),
            y = clicked.attr("y");

        array[y][x] ? array[y][x] = false : array[y][x] = true;

        clicked.toggleClass("dead");
        clicked.toggleClass("alive");

    });

});

function clean() {
    $('#gameOfLife').html('');
    for (x = 0; x < SIZE_ARRAY; x++) {
        for (y = 0; y < SIZE_ARRAY; y++) {
            array[x][y] = false;
        }
    }
}

function fill() {
    clean();

    array[3][2] = true;
    array[3][3] = true;
    array[3][4] = true;

    // top
    array[15][6] = true;
    array[15][5] = true;
    array[15][4] = true;
    array[10][6] = true;
    array[10][5] = true;
    array[10][4] = true;
    array[12][7] = true;
    array[13][7] = true;
    array[14][7] = true;
    array[12][2] = true;
    array[13][2] = true;
    array[14][2] = true;

    // bottom
    array[10][10] = true;
    array[10][11] = true;
    array[10][12] = true;
    array[15][10] = true;
    array[15][11] = true;
    array[15][12] = true;
    array[12][14] = true;
    array[13][14] = true;
    array[14][14] = true;
    array[12][9] = true;
    array[13][9] = true;
    array[14][9] = true;

    printGame();
}

function nextRound() {
    $('#gameOfLife').html('');
    
    for (y = 0; y < SIZE_ARRAY; y++) {
        for (x = 0; x < SIZE_ARRAY; x++) {
            var aliveN = getNumberLifeNeighbour(array, x, y);

            if ((aliveN == 2 || 3 == aliveN) && array[x][y] == true)
                tempArray[x][y] = true;
            else {
                if (3 == aliveN)
                    tempArray[x][y] = true;
                else
                    tempArray[x][y] = false;
            }
        }
    }

    for (y = 0; y < SIZE_ARRAY; y++) {
        for (x = 0; x < SIZE_ARRAY; x++) {
            array[x][y] = tempArray[x][y];
            tempArray[x][y] = false;
        }
    }

    printGame();
}

function getNumberLifeNeighbour(array, x, y) {
    var number = 0;


    try {
        if (array[x + -1][y - 1])
            number++;
    }
    catch (err) {
    }

    try {
        if (array[x + -1][y])
            number++;
    }
    catch (err) {
    }

    try {
        if (array[x + -1][y + 1])
            number++;
    }
    catch (err) {
    }

    try {
        if (array[x][y - 1])
            number++;
    }
    catch (err) {
    }

    try {
        if (array[x][y + 1])
            number++;
    }
    catch (err) {
    }

    try {
        if (array[x + 1][y - 1])
            number++;
    }
    catch (err) {
    }

    try {
        if (array[x + 1][y])
            number++;
    }
    catch (err) {
    }

    try {
        if (array[x + 1][y + 1])
            number++;
    }
    catch (err) {
    }

    return number;
}

function printGame() {
    for (x = 0; x < SIZE_ARRAY; x++) {
        for (y = 0; y < SIZE_ARRAY; y++) {
            if (array[y][x])
                $("#gameOfLife").append("<div class='life alive' x='" + x + "' y='" + y + "'></div>");
            else
                $("#gameOfLife").append("<div class='life dead' x='" + x + "' y='" + y + "'></div>");
        }
        $("#gameOfLife").append("<br>");
    }
}

function Create2DArray(rows) {
    var arr = [];

    for (var i = 0; i < rows; i++) {
        arr[i] = [];
    }

    return arr;
}

