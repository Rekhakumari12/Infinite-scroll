// make sure this is outside of a <form> because when we enclosed these elements in for, pressing Enter submitted the form and reloaded the page.
let pageCount;
var input = document.getElementById("input_query");
input.addEventListener("keyup", handleclick);
function handleclick(e) {

  // console.log(e.cancelable);
  if (e.keyCode === 13) {
    e.preventDefault();
    pageCount = 1;
    document.getElementById("search_button").click();
  }
}

//if want to use with <form>
// function searchKeyPress(e) {
//   if (e.keyCode === 13) {
//     document.getElementById("search_button").click();
//     return false;
//   }
//   // return true;
// }

let imageElements = '';
const generateImages = () => {
  let search_query = input.value;
  let query = search_query;
  search_query = '';
  if (query !== '') {
    fetchGetReq(query);
  }
}
const fetchGetReq = (query) => {
  let url = `https://api.unsplash.com/search/photos?page=${pageCount}&query=${query}&client_id=OsRP6Z7UVgxNrf13I-9rP7AsYLupKuHmWrLXzK1OQZ0`;
  fetch(url)
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp);
      let result = resp.results;
      for (let i = 0; i < 10; i++) {
        imageElements += `<img src="${result[i].urls.small}" class="img-fluid" alt="${result[i].alt_description}">`;
      }
      document.getElementById("image_area").innerHTML = imageElements;
    })
    .catch(error => {
      alert("Please Enter Valid Qyery", error);
    })
}
const loadMorePage = () => {
  setTimeout(() => {
    pageCount++;
    generateImages();
  }, 300)
}
window.addEventListener("scroll", () => {
  console.log("im at scrolling");
  const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
  if (clientHeight + scrollTop >= scrollHeight) {
    console.log("im at bottom");
    loadMorePage();
  }
  // if (scrollTop >= scrollHeight/2) {
  //   console.log("im at bottom");
  //   loadMorePage();
  // }
})
// fetchGetReq();