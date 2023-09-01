const loadTabs = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const json = await res.json();
  const data = json.data;

  for (const i of data) {
    // console.log(i);
    document.getElementById(
      "tabs"
    ).innerHTML += `<a id="${i.category_id}" onclick="catagoryClicked('${i.category_id}')" class="tab  bg-gray-300 hover:bg-red-500 hover:text-white font-semibold px-5 rounded-[4px] text-base">${i.category}</a>`;
  }
};
const loadCards = async (id) => {
  document.getElementById("cardsContainer").innerHTML = "";
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const json = await res.json();
  const data = json.data;
  for (const i of data) {
    let v = "hidden";
    if (i.authors[0].verified) {
      v = "";
    }
    console.log(i.authors[0]);
    document.getElementById("cardsContainer").innerHTML += `
    <div><!-- card -->
        <div class="flex justify-center items-center relative">
            <figure class="max-w-[312px] max-h-[200px]">
                <img src="${i.thumbnail}" alt="" class="rounded-lg w-[312px] h-[200px]">
            </figure>
            <p class="absolute bg-slate-900 text-white px-2 rounded bottom-2 right-2">3hrs 56 min ago</p>
        </div>
        <div class="flex gap-3 mt-5 justify-start">
            <div class="flex gap-3">
                <div class="max-w-[70px] max-h-[50px] ">
                    <img src="${i.authors[0].profile_picture}" alt=""
                        class="w-[40px] h-[40px] rounded-[50%]">
                </div>
                <div>
                    <h3 class="font-bold text-black">
                        ${i.title}
                    </h3>
                    <div class="flex items-center">
                        <h4 class="py-2">
                        ${i.authors[0].profile_name}</h4>
                        <h4 class="text-blue-500 ml-3 text-xl relative">
                          <div class=${v}>
                            <i class="fa-solid fa-certificate"></i>
                            <i class="fa-solid fa-check absolute text-[8px] text-white top-[11px] right-[7px]"></i>
                          </div>
                        </h4>
                    </div>
                    <h4 class="">
                    ${i.others.views} views
                    </h4>
                </div>
            </div>
        </div>
    </div><!-- card end -->
      `;
  }
};
const catagoryClicked = (id) => {
  console.log(id);
  loadCards(id);
};
loadTabs();
loadCards("1000");
