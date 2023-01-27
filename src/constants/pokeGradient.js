export function getGradient(pokemon){
    switch(pokemon.types[0].type.name){
        case 'fire':
            return 'linear-gradient(90deg, rgba(255,154,154,1) 0%, rgba(201,38,38,1) 100%)';
        case 'dark':
            return 'linear-gradient(90deg, rgba(79,79,79,1) 0%, rgba(1,21,56,1) 100%)';
        case 'normal':
            return 'linear-gradient(90deg, rgba(230,213,173,1) 0%, rgba(227,194,90,1) 100%)';
        case 'electric':
            return 'linear-gradient(90deg, rgba(251,244,151,1) 0%, rgba(255,247,96,1) 100%)';
        default:
            return 'linear-gradient(90deg, rgba(195,245,198,1) 0%, rgba(117,213,117,1) 100%)';
    }
}

export function getFontColor(pokemon){
    switch(pokemon.types[0].type.name){
        case 'fire':
            return 'white';
        case 'dark':
            return 'white';
        default:
            return 'black';
    }
}
export default getGradient;