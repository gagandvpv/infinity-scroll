const container = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let loadedImages = 0;
let totalImages = 0;
let photos = [];

const count = 10;
const key = "Ysx4JeUl8xSJ8TBWksBPV4V_KLmGGrWod2xLk-kcuA0";

const api = `https://api.unsplash.com/photos/random/?client_id=${key}&count=${count}`;

//helper function

function helper(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function loaded() {
  loadedImages++;
  console.log(loadedImages);
  if (loadedImages == totalImages) {
    ready = true;
    loader.hidden = true;
    console.log("ready=", ready);
  }
}

function display() {
  loadedImages = 0;
  totalImages = photos.length;
  console.log("totalImages", totalImages);
  photos.forEach((photo) => {
    //an anchor tag to link to splash
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // //for new tab
    // item.setAttribute("target", "_blank");
    helper(item, {
      href: photo.links.html,
      target: "_blank",
    });
    //img for photos
    const images = document.createElement("img");
    // images.setAttribute("src", photo.urls.regular);
    // images.setAttribute("alt", photo.alt_description);
    // images.setAttribute("title", photo.alt_description);
    // put img in to a and then put both into conatinaer
    helper(images, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    images.addEventListener("load", loaded);
    item.appendChild(images);
    container.appendChild(item);
  });
}
async function getphotos() {
  try {
    const response = await fetch(api);
    photos = await response.json();
    display();
  } catch (error) {}
}

getphotos();

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getphotos();
  }
});
