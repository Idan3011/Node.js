import axios from "axios";


const fetchJoke = async()=>{
    const result = await axios.get('https://v2.jokeapi.dev/joke/Any?amount=10')
    console.log(result.data);
    
}

fetchJoke()