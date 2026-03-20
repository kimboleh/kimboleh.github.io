document.addEventListener("DOMContentLoaded", () => {
    const videoEssaysContainer = document.querySelector("#video-essays");

    // asynchronously fetch the site pages and then add them to the list
    fetch("../src/video-essays.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const videoEssaysList = document.createElement("ul");
            videoEssaysList.id = "video--list";
            videoEssaysContainer.appendChild(videoEssaysList);

            for (video in data) {
                let listItem = document.createElement("li");
                let vidDiv = document.createElement("div");
                vidDiv.classList = "video-box";

                let vidThumb = document.createElement("img");
                vidThumb.src = "http://img.youtube.com/vi/" + data[video].id +"/maxresdefault.jpg";
                let vidDetails = document.createElement("div");
                vidDetails.classList = "video--details";
                let link = document.createElement("a");
                link.classList = "video--title";
                link.textContent = video;
                link.href = "https://www.youtube.com/watch?v=" + data[video].id;
                let creator = document.createElement("a");
                creator.classList = "video--creator";
                creator.textContent = data[video].creator;
                creator.href = data[video]["creator url"];
                let description = document.createElement("div");
                description.classList = "video--description";
                description.innerHTML = data[video].description;

                listItem.appendChild(vidDiv);
                vidDiv.appendChild(vidThumb);
                vidDiv.appendChild(vidDetails);
                vidDetails.appendChild(link);
                vidDetails.appendChild(creator);
                vidDetails.appendChild(description);
                videoEssaysList.appendChild(listItem);
            }
        })
        .catch(error => console.error('Failed to fetch data:', error));
});