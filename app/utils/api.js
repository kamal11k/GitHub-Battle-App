import axios from 'axios'

const fetchPopularRepos = (language)=>{
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language +'&sort=stars&order=desc&type=Repositories');

    return axios.get(encodedURI)
        .then(function(response){
            console.log(response);
            return response.data.items;
        })
}

export default fetchPopularRepos

