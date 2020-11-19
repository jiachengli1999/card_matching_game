let grid_container = $('.grid-container')
let images = ['astrologian', 'bard', 'black_mage', 'blue_mage', 'dancer', 
                'dark_knight', 'Dragoon', 'gun', 'gunbreaker', 'monk', 'ninja', 
                'paladin']
let clickedCard = null 
let cardid = null 
let matched = 0

// shuffle referenced from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    // dup values in array
    let res = array.slice()
    for (let i=0; i < images.length; i++){
        res.push(images[i])
    }

    // randomize values
    let currentIndex = res.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = res[currentIndex];
        res[currentIndex] = res[randomIndex];
        res[randomIndex] = temporaryValue;
    }
    
    return res;
}

function main(){
    // shuffle
    let cards = shuffle(images)

    // Make grid
    grid_container.empty();
    for (let i=0; i < 24; i++){
        // style=\"background-image: url('./among_us_assets/"+cards[i]+".PNG');\"
        grid_container.append($("<div class='card "+cards[i]+"' id='card-"+i+"'></div>"))
        // $('#card-'+i).css('background-image', "url('./among_us_assets/"+cards[i]+".PNG')")
    }

    // add click listener for each card
    cardListener(cards)
}

function cardListener(cards){
    grid_container.find('.card').bind('click', function(){
        if (!($(this).hasClass('matched'))){
            let card_name = $(this).attr('class').split(/\s+/)[1]
            $(this).css('background-image', "url('./among_us_assets/"+card_name+".PNG')")
            $(this).addClass('open')
            if (clickedCard === null){
                clickedCard = $(this).attr('class')
                cardid = $(this).attr('id')
                console.log('clickedcard:', clickedCard, cardid)
            }
            else{
                if ($(this).attr('class') === clickedCard && $(this).attr('id') != cardid){
                    grid_container.find('.open').addClass('matched');
                    grid_container.find('.matched').removeClass('open');
                    matched++;
                    console.log('matched')
                }
                else{
                    console.log('no match')
                    setTimeout(function () {
                        grid_container.find('.open').css('background-image', 'none')
                        grid_container.find('.open').removeClass('open'); 
                    },600)
                }
                clickedCard = null
            }
            
            if (matched === cards.length){
                console.log('win')
            }
        }
    })
}