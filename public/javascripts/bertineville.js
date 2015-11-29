console.log('Starting.');

var flowers = {};
var titles = [];
var score = 10;

function init() {
    console.log('initing');
    score = 10;
    flowers = {};
    titles = [];
    $('.flower').each(function(index, flower) {
        var title = $('.title', flower).text();
        titles.push(title);
        flowers[title] = {
            elt: $(flower)
        };
        flowers[title].elt.css('height','200px');

        flowers[title].elt.click(function() {
            console.log('You clicked on '+title);
            if (flowers[title].needs) {
                water(title);
                delta(1);
                start(randomFlower());
            } else {

            }
        });
        delta(0);
    });
}

function water(title) {
    var elt = flowers[title].elt;
    var drop = $('<div class="drop"></div>');
    elt.append(drop);
    flowers[title].needs = false;
    clearTimeout(flowers[title].to);
    flowers[title].to = null;
    elt.find('.title').removeClass('blink');
    setTimeout(function() {
        elt.height('+=25px');
        drop.remove();
    }, 1000);
}

function shrink(title) {
    var elt = flowers[title].elt;
    elt.height('-=25px');
    elt.find('.title').removeClass('blink');
}

function start(title) {
    var elt = flowers[title].elt;
    if (!flowers[title].needs) {
        console.log(title+' needs attention!');
        flowers[title].needs = true;
        elt.find('.title').addClass('blink');

        flowers[title].to = setTimeout(function () {
            if (flowers[title].needs) {
                // too late!
                flowers[title].needs = false;
                shrink(title);
                delta(-1);
            }
        }, random(1000,5000));
    }
}

function delta(x) {
    score = score + x;
    $('#score').text(score);
}

function go() {
    start(randomFlower());
    setTimeout(function () {
        go();
    }, random(1000,9000));
}

function rnd(max) {
    return Math.round(Math.random() * max);
}
function random(min, max) {
    return min + rnd(max - min);
}
function randomFlower() {
    return titles[rnd(titles.length - 1)];
}

$(function() {
    init();
    go();
});

