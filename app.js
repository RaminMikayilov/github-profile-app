const api = 'https://api.github.com/users/';
const input = document.querySelector(".search-input");
const search = document.querySelector(".search-section i");

function getData(data) {
    fetch(`${api}${data}`)
        .then(response => response.json())
        .then(display)
        .catch(err => console.log(err));
}

function display(response) {

    if (response.message == 'Not Found') {
        // Show error
        document.querySelector(".github").style.display = "none";
        document.querySelector(".error").style.display = "block";
    } else {
        document.querySelector(".github").style.display = "grid";
        document.querySelector(".error").style.display = "none";
        input.value = '';

        document.querySelector(".profile-picture").src = response.avatar_url;
        document.querySelector(".name").innerHTML = response.name;
        document.querySelector(".login").innerHTML = response.login;
        document.querySelector(".bio").innerHTML = response.bio;

        document.querySelector(".repos-number").innerHTML = response.public_repos;
        document.querySelector(".follower-number").innerHTML = response.followers;
        document.querySelector(".following-number").innerHTML = response.following;

        // document.querySelector(".location").innerHTML = response.location;
        // document.querySelector(".company").innerHTML = response.company;

        const loc = document.querySelector(".location");
        const comp = document.querySelector(".company");

        response.location == null ? loc.innerHTML = 'Not Available' : loc.innerHTML = response.location;
        response.company == null ? comp.innerHTML = 'Not Available' : comp.innerHTML = response.company;

    }

    document.querySelector(".github").classList.remove("loading");
}

search.addEventListener("click", () => {
    getData(input.value);
});

input.addEventListener("keypress", (event) => {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        getData(input.value);
    }
});

// My account
getData('raminmikayilov');