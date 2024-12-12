const wrapper = document.querySelector(".wrapper")
const loader = document.querySelector('.loading')
const BASE_URL = "https://dummyjson.com"

async function fetchData(endPoint) {
    const response = await fetch(`${BASE_URL}${endPoint}`)
    response.json()
        .then(res => createUsercard(res))
        .catch(err => console.log(err))
        .finally(()=> {
            loader.style.display = 'none'
        })
}

window.addEventListener('load', ()=> {
    loader.style.display = 'grid'
    fetchData("/users?limit=28")
})

function createUsercard(cards){
    cards.users.forEach(card => {
        const userCard = document.createElement('div')
        userCard.className = "usercard"
        userCard.innerHTML = `
                <div class="usercard__imagebox">
                    <div class="usercard__image">
                        <img src=${card.image}>
                    </div>
                </div>
                <div class="usercard__info">
                    <h3>${card.firstName} ${card.lastName}</h3>
                    <p title="${card.address.country}">${card.address.state} ${card.address.country}</p>
                    <p title="${card.university}">${card.university}</p>
                    <p title="${card.company.name}">${card.company.name}</p>
                    <p title="${card.company.title}">${card.company.title}</p>
                    <button><a href=${card.email}>Email</a></button>
                </div>
        `

        wrapper.appendChild(userCard)
    })
}