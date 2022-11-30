const randomInt = (max) => Math.floor(Math.random() * max); //returns integer in range [0, max)

const match = (array, string) => array.some(elem => string.includes(elem)); //returns true iff at least one element is contained within string

const responseObject = (keywords, response) => {return {keywords: keywords, response: response}};

const PHYSICS_KEYWORDS = ['physics', 'ece', 'one oh five'];
const CALI_KEYWORDS = ['cali', 'california', 'co-op'];
const POINTER_KEYWORDS = ['pointer', 'pointers'];
const ANTI_SON_KEYWORDS = ['son', 'father', 'derivative', 'antiderivative'];
const PIZZA_KEYWORDS = ['pizza', 'pizzas'];

const physicsResponse = () => {
    switch(randomInt(3)){
        case 1:
            return 'Physics is not of concern to us software engineers';
        case 2:
            return 'I hate physics, ECE 105 made me want to transfer to CS';
        default:
            let passChance = randomInt(50);
            return 'Based on my calculations, your chance of passing ECE 105 is ' + passChance + ' percent';
    }
}

const caliResponse = () => 'The only acceptable co-ops are Cali co-ops';

const pointerResponse = () => {
    switch(randomInt(3)){
        case 1:
            return "Don't ask me about pointers, I was written in JavaScript";
        case 2:
            return 'Kill the children before the parents'
        default:
            return 'Ahh yes, all was peaceful in CS 137 until the pointer nation attacked';
    }
}

const antiSonResponse = () => 'If the opposite of a derivative is an antiderivative, why is a father not called an antison?';

const pizzaResponse = () => 'That reminds me of a joke. If you have a businessman, an experimental physicist, a mathematician in pure math,' +
    ' and a large pepperoni pizza, which is the odd one out? The answer is the mathematician, because the other three can feed a family of four.';

const RESPONSE_ARRAY = [
    responseObject(PHYSICS_KEYWORDS, physicsResponse),
    responseObject(CALI_KEYWORDS, caliResponse),
    responseObject(POINTER_KEYWORDS, pointerResponse),
    responseObject(ANTI_SON_KEYWORDS, antiSonResponse),
    responseObject(PIZZA_KEYWORDS, pizzaResponse)
];

//returns special response if one found, null otherwise
const generateResponse = (input) => {
    let chosenResponse = RESPONSE_ARRAY.find(elem => match(elem.keywords, input));

    if(chosenResponse === undefined){
        return input;
    }

    return chosenResponse.response();
}

module.exports = {generateResponse};