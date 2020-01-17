/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/




    // function thatImUsedTo (){
    //   const call = new XMLHttpRequest()
    //       call.open('get','https://api.github.com/users/guytonoriji')
    //           call.onload=()=>{
    //               console.log(call.response)
    //           }
    //           call.send()
    // }

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/


/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

axios.get('https://api.github.com/users/guytonoriji')
    .then( (res) => {
          
       parent.append(createCard(res.data))
    })
    
const parent = document.querySelector(".cards")



function createCard(obj){
        let card = document.createElement("div")
        let card_info = document.createElement("div")
        let img = document.createElement("img")
        card.classList.add("card")
        img.setAttribute("src", ""+obj.avatar_url+"")

          card.append(img)


          card.append(card_info)
          let h3 = document.createElement("h3")
          h3.classList.add("name")
          h3.textContent = obj.name
          //Pz
          let p1 = document.createElement("p")
          p1.classList.add("username")
          p1.textContent = obj.login
          let p2 = document.createElement("p")
          p2.textContent = `Location: ${obj.location}`
          let p3 = document.createElement("p")
          p3.innerHTML = `Profile: <a href='${obj.html_url}'>${obj.html_url}</a>`
          let p4 = document.createElement("p")
          p4.textContent = `Followers: ${obj.followers}`
          let p5 = document.createElement("p")
          p5.textContent = `Following: ${obj.following}`
          let p6 = document.createElement("p")
          p6.textContent = `Bio: ${obj.bio}`


          card_info.append(h3)
          card_info.append(p1)
          card_info.append(p2)
          card_info.append(p3)
          card_info.append(p4)
          card_info.append(p5)
          card_info.append(p6)

          return card
}


const followersArray = [];



axios.get('https://api.github.com/users/guytonoriji/followers')
    .then( (res) => {
          // console.log(res.data);
                res.data.forEach(eachFollower=>{
                  followersArray.push(eachFollower)
                })
    })
    
setTimeout(function(){

  
  followersArray.forEach(eachFollowersInfo=>{
// console.log(eachFollowersInfo);
   axios.get(`https://api.github.com/users/${eachFollowersInfo.login}`).then(followersCardToSend=>{
            console.log(followersCardToSend);
            parent.append(createCard(followersCardToSend.data))
   })
  
})

},1000)




