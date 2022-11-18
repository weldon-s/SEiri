const randomInt = (max) => Math.floor(Math.random() * max); //returns integer in range [0, max)

const match = (array, string) => array.some(elem => string.includes(elem)); //returns true iff at least one element is contained within string

// counts the number of occurances of each canned response in the input, returns the most common one
const optimalresponse = (input, responsearray) => {
    let max = 0;
    let response = undefined;
    let len;

    for (let i = 0; i<responsearray.length; i++) {
        len = (responsearray[i].keywords.filter(value => input.includes(value))).length
        if (len > max) {
            max = len;
            response = responsearray[i]
        }
    }

    return response;
}

const responseObject = (keywords, response) => {return {keywords: keywords, response: response}};

const PHYSICS_KEYWORDS = ['physics', 'ece', 'one oh five'];
const CALI_KEYWORDS = ['cali', 'california', 'co-op'];
const POINTER_KEYWORDS = ['pointer', 'pointers'];
const ANTI_SON_KEYWORDS = ['son', 'father', 'derivative', 'antiderivative'];
const PIZZA_KEYWORDS = ['pizza', 'pizzas'];
const ECE_105_MIDTERM_MEAN_KEYWORDS = ['ece', 'one oh five', 'midterm', 'average', 'mean'];
const CS_137_MEAN_KEYWORDS = ['cs', 'one thirty seven', 'midterm', 'average', 'mean'];
const MATH_117_MEAN_KEYWORDS = ['math', 'one seventeen', 'midterm', 'average', 'mean'];
const MATH_135_FIRST_MEAN_KEYWORDS = ['math', 'one thirty five', 'midterm', 'average', 'mean', 'first'];
const MATH_115_MEAN_KEYWORDS = ['math', 'one fifteen', 'midterm', 'average', 'mean'];

const ece105midtermResponse = () => 'The average for the ece one oh five midterm was 58.9% and the median was 62.5%';
const cs137midtermResponse = () => 'The average for the cs one thirty seven midterm was 76.9% and the median was 82%';
const math117midtermResponse = () => 'The average for the math one seventeen midterm was 63.8% and the median was 64.9%';
const math135firstmidtermResponse = () => 'The average for the math one thrity five midterm was 76.4% and the median was 78.9%';
const math115midtermResponse = () => 'The average for the math one fifteen midterm was 79% and the median was 83.7%';
 

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

const randomResponse = () => {
    switch(randomInt(3)){
        case 0:
        return "Hello! I am SEiri! I mean, SEiri. Ugh, the text to speech doesn't seem to know it's pronounced Siri";

        case 1:
        return 'I am brought to you by the best of 1A Software Engineering!'

        default:
        return 'Sorry if you said something that should have a more interesting response. Our speech to text is experiencing logistical issues. Blame DeepSpeech.'
    }
}

const RESPONSE_ARRAY = [
    responseObject(PHYSICS_KEYWORDS, physicsResponse),
    responseObject(CALI_KEYWORDS, caliResponse),
    responseObject(POINTER_KEYWORDS, pointerResponse),
    responseObject(ANTI_SON_KEYWORDS, antiSonResponse),
    responseObject(PIZZA_KEYWORDS, pizzaResponse),
    responseObject(ECE_105_MIDTERM_MEAN_KEYWORDS, ece105midtermResponse),
    responseObject(CS_137_MEAN_KEYWORDS, cs137midtermResponse),
    responseObject(MATH_117_MEAN_KEYWORDS, math117midtermResponse),
    responseObject(MATH_135_FIRST_MEAN_KEYWORDS, math135firstmidtermResponse),
    responseObject(MATH_115_MEAN_KEYWORDS, math115midtermResponse)
];

//returns special response if one found, null otherwise
const generateResponse = (input) => {
    // let chosenResponse = RESPONSE_ARRAY.find(elem => match(elem.keywords, input));
    let chosenResponse = optimalresponse(input, RESPONSE_ARRAY);

    if(chosenResponse === undefined){
        return randomResponse();
    }

    return chosenResponse.response();
}

module.exports = {generateResponse};