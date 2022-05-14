let res = fetch(
  "https://pixabay.com/api/?key=27331294-afe6255fef91293a0e27af3ea&per_page=200"
);

res
  .then((e) => e.json())
  .then((e) => {
    viewElements(e);
  })
  .catch((e) => console.log(e));

function viewElements(e) {
  document.querySelector("#memes__collection").innerHTML = "";
  document.querySelector("#recent__memes").innerHTML = "";

  e.hits.forEach((e, i) => {
    // random border generator
    let rc1 = Math.floor(Math.random() * 256);
    let rc2 = Math.floor(Math.random() * 256);
    let rc3 = Math.floor(Math.random() * 256);
    let color = "rgb" + "(" + rc1 + "," + rc2 + "," + rc3 + ")";

    let filter = (document.querySelector(
      "#memes__collection"
    ).innerHTML += `<div class="memes-card" style="border:2px solid ${color}">
              <img class="memes--coll--img" src="${e.webformatURL}" />
              <div class="memes--footer"> 
                <h5>${e.tags}</h5>
              </div>
          </div>`);

    // console.log(i);
    if (i >= 20 && i <= 26) {
      let recent = (document.querySelector(
        "#recent__memes"
      ).innerHTML += `<div class="recent-card" style="border:1px solid transparent">
                      <img class="recent--coll--img" src="${e.webformatURL}" />
                  </div>`);
    }
  });
}

function viewSuggestion(res) {
  let acknowledge;
  document.querySelector("#suggestion").style.visibility = "visible";
  if (res.hits.length == 0) {
    document.querySelector(
      "#sugges__ul"
    ).innerHTML += `<li> Result not found... </li>`;
    return;
  }

  //================================
  //to clean suggestin before fetching
  if (res.hits[0] == 1) {
    document.querySelector("#sugges__ul").innerHTML = "";
    return;
  }
  document.querySelector("#sugges__ul").innerHTML = "";
  res.hits.forEach((res) => {
    document.querySelector(
      "#sugges__ul"
    ).innerHTML += `<li class="sugges_li" onclick="showApp()"> ${res.tags} <img src="${res.previewURL}" alt="suggestion image" class="suggestion_img"/> </li>`;
    // console.log(res);
  });
}

//======================
function showApp() {
  // console.log(event.target);/
  let value = event.target.innerText;
  value = value.trim().split(",")[0].trim();
  console.log(value);
  fetch(
    `https://pixabay.com/api/?key=27331294-afe6255fef91293a0e27af3ea&per_page=200&q=${value}`
  )
    .then((res) => res.json())
    .then((res) => viewElements(res))
    .catch((err) => console.log(err));
}

//=========================
const searchBox = document.getElementById("search__box");

let id;
searchBox.addEventListener("input", (e) => {
  clearTimeout(id);

  id = setTimeout(() => {
    let value = e.target.value;
    if (value == "" || value.length == 0) {
      document.querySelector("#sugges__ul").innerHTML = "";
      document.querySelector("#suggestion").style.visibility = "hidden";

      return;
    }
    fetch(
      `https://pixabay.com/api/?key=27331294-afe6255fef91293a0e27af3ea&per_page=5&q=${value}`
    )
      .then((res) => res.json())
      .then((res) => viewSuggestion(res))
      .catch((err) => console.log(err));
  }, 1000);
});

//==================================
// document.getElementsByTagName("body")[0].style.scrollBehavior = "show";
document.getElementById("container").onscroll = function () {
  infiniteScroll();
};

function infiniteScroll() {
  const element = document.getElementById("container");
  let scrollerHeight = element.clientHeight;
  let totalHeight = element.scrollHeight;
  let scrolled = element.scrollTop;

  // console.log(scrolled);
  if (scrolled == 0) {
    let value = document.querySelector("#search__box").value;
    fetch(
      `https://pixabay.com/api/?key=27331294-afe6255fef91293a0e27af3ea&per_page=200&q=${value}`
    )
      .then((res) => res.json())
      .then((res) => viewElements(res));
  }

  if (Math.ceil(scrolled + scrollerHeight) == totalHeight) {
    console.log(scrolled);
    let value = document.querySelector("#search__box").value;
    fetch(
      `https://pixabay.com/api/?key=27331294-afe6255fef91293a0e27af3ea&per_page=25&q=${value}`
    )
      .then((res) => res.json())
      .then((res) => addData(res));
  }

  function addData(e) {
    e.hits.forEach((e) => {
      // random border generator
      let rc1 = Math.floor(Math.random() * 256);
      let rc2 = Math.floor(Math.random() * 256);
      let rc3 = Math.floor(Math.random() * 256);
      let color = "rgb" + "(" + rc1 + "," + rc2 + "," + rc3 + ")";

      let filter = (document.querySelector(
        "#memes__collection"
      ).innerHTML += `<div class="memes-card" style="border:2px solid ${color}">
                <img class="memes--coll--img" src="${e.webformatURL}" />
                <div class="memes--footer"> 
                  <h5>${e.tags}</h5>
                </div>
            </div>`);
    });
  }

  // console.log(typeof scrolled);
  // console.log(element.scrollLeft.toFixed());
}
//==========================================================
