import axios from 'axios'


var id = 'adc020eab22613fd50ec';
var sec_id = '8b2bb942c3b323bb444e02fc32e6941011c5dcdd';
var params = "?client_id=" + id + "&client_secret=" + sec_id;

const getProfile = (username)=> (
    axios.get('https://api.github.com/users/' + username + params)
    .then((user)=>user.data)
)

const getRepos = (username)=> (
    axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100')
)

const getStarCount = (repos)=>(
    repos.data.reduce((count,repo)=>(count+repo.stargazers_count),0)
)

const calculateScore = (profile,repos)=> {
    var followers = profile.followers;
    var totalStars = getStarCount(repos);
    return (followers * 5) + totalStars;
}

const handleError  = (error)=> {
  console.warn(error);
  return null;
}

const getUserData = (player)=> (
    axios.all([getProfile(player),getRepos(player)])
        .then((data)=>{
            var profile = data[0];
            var repos = data[1];

            return {
              profile,
              score: calculateScore(profile, repos)
            }
        })
)

const sortPlayers = (players)=> (
    players.sort((a,b)=> (b.score - a.score))
)


export const battle = (players)=> (
    axios.all(players.map(getUserData))
        .then(sortPlayers)
        .catch(handleError)
)

export const fetchPopularRepos = (language)=>{
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language +'&sort=stars&order=desc&type=Repositories');

    return axios.get(encodedURI)
        .then((response)=> response.data.items)
}



