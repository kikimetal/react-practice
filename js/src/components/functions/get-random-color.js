const getRandomColor = (type = null) => {

    const getRandomInt = (min, max) => Math.floor( Math.random() * (max + 1 - min) ) + min

    if(!type){

        return `hsl(${getRandomInt(0, 360)}, ${getRandomInt(0, 100)}%, ${getRandomInt(0, 100)}%)`

    }else if(type && type === "pastel"){

        return `hsl(${getRandomInt(0, 360)}, ${getRandomInt(90, 100)}%, ${getRandomInt(92, 97)}%)`

    }else{

        return "hsl(0, 0%, 50%)" // グレーでも返しとくか

    }
}
export default getRandomColor
