const loadTabs = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const json = await res.json();
  const data = json.data;

  for (const i of data) {
    console.log(i);
    document.getElementById(
      "tabs"
    ).innerHTML += `<a id="${i.category_id}" onclick="catagoryClicked('${i.category_id}')" class="tab  bg-gray-300 hover:bg-red-500 hover:text-white font-semibold px-5 rounded-[4px] text-base mx-3">${i.category}</a>`;
  }
};
const catagoryClicked = (id) => {
  console.log(id);
  loadCards(id);
};
loadTabs();
