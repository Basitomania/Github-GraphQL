const mainInput = document.querySelector(".github__search");
const form = document.querySelector("#github--form--search");
const githubProfile = document.querySelector(".github__profile");
const imageAvatar = document.querySelector("#image--avatar");
const profileAvatar = document.querySelector("#profile--avatar");
const username = document.querySelector(".username");
const bio = document.querySelector(".bio");
const count = document.querySelector(".searched--result--count");
const repoCount = document.querySelector(".repo-counter");
const mobileUsername = document.querySelector(".mobile--username")
const mobileAvatar = document.querySelector(".mobile--image--avatar");
const mobileBio = document.querySelector(".mobile--bio")


const repositoriesContainer = document.querySelector(".repo--body--section");


const getUpdatedTimeSince = (date) => {
  if (!date) return;

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }

  interval = seconds / 2592000;

  if (interval > 1) {
    return Math.floor(interval) + " months";
  }

  interval = seconds / 86400;

  if (interval > 1) {
    return Math.floor(interval) + " days";
  }

  interval = seconds / 3600;

  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }

  interval = seconds / 60;

  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }

  return Math.floor(seconds) + " seconds";
}

const getProfileQuery = (keyword) => `
query { 
  user(login: "${keyword}") {
    login
    bio
    bioHTML
    name
    avatarUrl
    location
    repositories(last: 20, orderBy: {field: CREATED_AT, direction: DESC}){
      totalCount
      nodes{
        name
        url
        description
        createdAt
        updatedAt
        viewerHasStarred
        stargazers {
          totalCount
        }
        forks {
          totalCount
        }
        primaryLanguage {
          id
          name
          color
        }
      }
    }
  }
}`

const renderProfilePage = ({ data }) => {
  const { user } = data;
  if (user == null) {
    alert("User does not exist on github");
    return false;
  }

  const { repositories } = user;

  mainInput.style.display = 'none';
  githubProfile.style.display = 'block';

  const userDetails = `<h3>${user.name}</h3> <p>${user.login}</p>`;
  // const mobileUsername = `<h3>${user.name}</h3> <p>${user.login}</p>`;
  const userBio = `${user.bioHTML}`;
  const repository = `
  
  `

  imageAvatar.src = user.avatarUrl;
  profileAvatar.src = user.avatarUrl;
  mobileAvatar.src = user.avatarUrl;
  username.innerHTML = userDetails;
  mobileUsername.innerHTML = userDetails;
  bio.innerHTML = userBio;
  mobileBio.innerHTML = userBio;
  count.innerHTML = repositories.totalCount;
  repoCount.innerHTML = repositories.totalCount;

  repositories.nodes.map((repo) => {

    const repository = document.createElement('li');
    const starText = `${repo.viewerHasStarred}` ? 'Unstar' : 'Star';
    const starColor = `${repo.viewerHasStarred}` && 'star--fill';
    const updated = getUpdatedTimeSince(new Date(repo.updatedAt));

    // const descriptionText = 
    // `${repo.description !== null}` ? 'yes' : 'no'

    repository.className = 'repo--item--column';
    repository.innerHTML = 
    `
      <div class="repo--text--section">
        <div>
          <h3>
            <a href="">
              ${repo.name}
            </a>
          </h3>
          </div>
        <div>
          <p>
          ${repo.description}
          </p>
        </div>
        <div class="repo--footer">
          <span class="repo--footer--text">
            <span class="repo--language--color" style="background-color: ${repo?.primaryLanguage?.color}"></span>                          
            <span>${repo?.primaryLanguage?.name}</span>
          </span>
          <span class="repo--footer--text">
            <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
            ${repo?.stargazers?.totalCount}
          </span>
          <span class="repo--footer--text">
            <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16" width="16" class="icon">
              <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
            </svg>
            ${repo?.forks?.totalCount}
          </span>
          <span class="repo--footer--text">Updated ${updated} ago</span>
          
        </div>

      </div>
      <div class="repo--star--section">
        <div>
          <button class="btn btn-sm " type="submit" value="Star">
            <svg class="icon ${starColor}" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
            ${starText}
          </button>
        </div>
        
      </div>
    `
    repositoriesContainer.appendChild(repository);
  }
)}

const loadProfile = (e) => {
  e.preventDefault();
  const keyword = form.elements["search"].value;

  if (keyword == "") {
    alert("Enter a valid search query");
    return false;
  }

  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer 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`,
    },
    body: JSON.stringify({
      query: getProfileQuery(keyword)
    })
  };

  fetch(`https://api.github.com/graphql`, options)
    .then(res => res.json())
    .then(renderProfilePage);

  // form.reset();
}

form.addEventListener("submit", loadProfile)