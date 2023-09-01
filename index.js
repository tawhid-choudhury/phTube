const tabIds = [];
let activeTabNow = "";
let sbv = false;
const loadTabs = async (callback) => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const json = await res.json();
  const data = json.data;

  for (const i of data) {
    // console.log(i);
    tabIds.push(`${i.category_id}`);
    document.getElementById(
      "tabs"
    ).innerHTML += `<a id="${i.category_id}" onclick="catagoryClicked('${i.category_id}')" class="tab  bg-gray-300 hover:bg-red-500 hover:text-white font-semibold px-5 rounded-[4px] text-base">${i.category}</a>`;
  }
  callback("1000");
};
const loadCards = async (id, sbv) => {
  sbv = this.sbv;
  document.getElementById("cardsContainer").innerHTML = "";
  document.getElementById("noCards").innerHTML = "";
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const json = await res.json();
  let data = json.data;
  // console.log(data);
  if (sbv) {
    data = data.sort((a, b) => {
      const n1 = parseFloat(a.others.views);
      const n2 = parseFloat(b.others.views);
      if (n1 < n2) {
        return 1;
      } else if (n2 < n1) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  if (data.length === 0) {
    document.getElementById("noCards").innerHTML = `
    <div class="flex flex-col justify-center items-center mt-10 md:mt-48">
    <img src="./Icon.png" alt="">
    <h1 class="text-3xl text-center font-bold mt-8">Oops!! Sorry, There is no<br>content here</h1>
</div>
    `;
    return;
  }
  for (const i of data) {
    let v = "hidden";
    let t = "hidden";
    let time = 0;

    if (i.authors[0].verified) {
      v = "";
    }
    if (i.others.posted_date) {
      t = "";
      let giventime = parseFloat(i.others.posted_date);
      let hours = Math.floor(parseFloat(giventime) / 3600);
      let rem = parseFloat(giventime) % 3600;
      let minutes = Math.floor(parseFloat(rem) / 60);

      time = hours + " hrs " + minutes + " min ago";
    }
    // console.log(i.authors[0]);
    document.getElementById("cardsContainer").innerHTML += `
    <div class="flex flex-col max-w-[312px] m-auto"><!-- card -->
        <div class="flex justify-center items-center ">
            <figure class="max-w-[312px] max-h-[200px] relative">
                <img src="${i.thumbnail}" alt="" class="rounded-lg w-[312px] h-[200px]">
                <div class = "absolute bottom-2 right-2">
                  <div class=${t}>
                    <p class="bg-slate-900 text-white px-2 rounded">
                      ${time}
                     </p>
                  </div>
              </div>
            </figure>
            
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

const sortClicked = () => {
  // console.log("Sasas");
  if (!sbv) {
    document.getElementById("srtbnt").classList.add("bg-red-600");
    document.getElementById("srtbnt").classList.add("text-white");
    sbv = !sbv;
  } else {
    document.getElementById("srtbnt").classList.remove("bg-red-600");
    document.getElementById("srtbnt").classList.remove("text-white");
    sbv = !sbv;
  }
  this.sbv = sbv;
  loadCards(activeTabNow, sbv);
};
const tabActive = (id) => {
  for (i of tabIds) {
    document.getElementById(i).classList.remove("bg-red-600");
    document.getElementById(i).classList.remove("text-white");
  }
  document.getElementById(id).classList.add("bg-red-600");
  document.getElementById(id).classList.add("text-white");
};

const catagoryClicked = (id) => {
  // console.log(id);
  activeTabNow = id;
  loadCards(id);
  tabActive(id);
  // console.log(activeTabNow);
};
loadTabs(catagoryClicked);
