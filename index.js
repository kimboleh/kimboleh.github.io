document.addEventListener("DOMContentLoaded", async () => {

    // load in the project cards
  try {
    const response = await fetch('./portfolio-projects.json');
    const data = await response.json();

    const projectCards = document.getElementById("project-cards");

    if (data && projectCards) {
        data.projects.forEach(project => {
            addProjectCard(project, projectCards);
        });
    }
  } catch (err) {
    console.error("Failed to load projects:", err);
  }
});

function addProjectCard(project, div) {
    div.appendChild(createProjectCard(project));
}

function createProjectCard(project) {
    const link = document.createElement("a");
    const card = document.createElement("div");
    const cardInner = document.createElement("div");
    const contentContainerFront = document.createElement("div");
    const contentContainerBack = document.createElement("div");
    const cardImg = document.createElement("img");
    const cardFront = document.createElement("div");
    const cardBack = document.createElement("div");
    const titleContainer = document.createElement("div");
    const titleHeading = document.createElement("h3");
    const cardDesc = document.createElement("p");

    card.className = "card";
    cardInner.className = "card-inner";
    cardFront.className = "card-front";
    cardBack.className = "card-back";
    contentContainerFront.className = "card-content";
    contentContainerBack.className = "card-content";
    titleContainer.className = "title";

    link.appendChild(card);
    card.appendChild(cardInner);
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);

    link.href = project.link;
    cardImg.src = project.screenshot;
    titleHeading.textContent = project.name;
    cardDesc.textContent = project.description;

    cardFront.appendChild(contentContainerFront);
    contentContainerFront.appendChild(cardImg);
    cardFront.appendChild(titleContainer);
    titleContainer.appendChild(titleHeading);
    cardBack.appendChild(contentContainerBack);
    contentContainerBack.appendChild(titleHeading.cloneNode(true));
    contentContainerBack.appendChild(cardDesc);

    return link;

    // example:
    /* <a href="https://www.meatandright.com/">
        <div id="meat-and-right" class="card">
            <div class="card-inner">
                <div class="card-front">
                    <div class="card-img">
                        <img src="img/meatandright.png"/>
                    </div>
                    <h3>meat & right</h3>
                </div>
                <div class="card-back">
                    <div class="card-img">
                        <h3>meat & right</h3> 
                        <p>a tool for eastern orthodox christians to track their fasting calendar</p> 
                    </div>
                </div>
            </div>
        </div>
    </a> */
}

// animated skills list carousel!

function switchList(event) {
    const list1 = document.getElementById('list-1');
    const list2 = document.getElementById('list-2');

    if (list1.classList.contains('active-list')) {
        list1.classList.remove('active-list');
        list1.classList.add('inactive-list');
        list2.classList.remove('inactive-list');
        list2.classList.add('active-list');
    } else {
        list2.classList.remove('active-list');
        list2.classList.add('inactive-list');
        list1.classList.remove('inactive-list');
        list1.classList.add('active-list');
    }
}

// document.addEventListener('click', switchList, false);

