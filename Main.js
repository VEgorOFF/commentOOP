import GetStartComments from "./GetStartComments.js";
import LoadContent from "./LoadContent.js";
import PlusMinusButtons from "./PlusMinusButtons.js";
import SortComments from "./SortComments.js";
import Count from "./Count.js";

document.addEventListener("DOMContentLoaded", mainStart);

const getStartComments = new GetStartComments();
const sortComments = new SortComments();
const loadContent = new LoadContent();
const plusMinusButtons = new PlusMinusButtons();
const count = new Count();

function mainStart() {
  getStartComments.drawStartComments();
  getStartComments.drawGetApi();
  loadContent.drawGetComments();
  loadContent.drawGetAnswers();
  count.workCommentsCount();
  count.workAnswerCount();
  loadContent.drawGetFavorites();
  sortComments.workSortFavorites();
  workSort();
  plusMinusButtons.workPlusMinusButtonsComments();
  plusMinusButtons.workPlusMinusButtonsAnswers();
  workSendComment();
}

function workSendComment() {
  const allComments = document.querySelector(".allComments");
  const buttonSend = document.querySelectorAll(".send")[0];
  const textArea = document.querySelectorAll(".message")[0];
  const maxText = document.querySelectorAll(".max_text")[0];
  const warningText = document.querySelectorAll(".warning_text")[0];
  let indexAuthorComment;

  if (localStorage.getItem("indexAuthorComment") !== null) {
    indexAuthorComment = localStorage.getItem("indexAuthorComment");
  } else {
    indexAuthorComment = 0;
  }

  textArea.addEventListener("input", function (event) {
    textArea.style.height = "5px";
    textArea.style.height = `${textArea.scrollHeight}px`;

    if (event.target.value.length === 0) {
      buttonSend.setAttribute("disabled", "");
      buttonSend.style.background = "#a1a1a1";
      buttonSend.classList.remove("hover-style");
    } else {
      buttonSend.removeAttribute("disabled");
      buttonSend.style.background = "#ABD873";
      buttonSend.classList.add("hover-style");
    }
    if (event.target.value.length > 0) {
      maxText.innerHTML = `${event.target.value.length}/1000`;
      if (event.target.value.length > 1000) {
        buttonSend.setAttribute("disabled", "");
        buttonSend.style.background = "#a1a1a1";
        buttonSend.classList.remove("hover-style");
        maxText.setAttribute("style", "color:red; opacity: 1;");
        warningText.style.display = "flex";
      } else {
        maxText.setAttribute("style", "color:black; opacity: 0.4;");
        warningText.style.display = "none";
      }
    } else {
      maxText.innerText = "Макс. 1000 символов";
    }
  });

  buttonSend.addEventListener("click", function () {
    //отправка комментария
    const newComment = document.createElement("div");
    newComment.className = "comment_people author_comments";
    newComment.setAttribute("data-index", document.querySelectorAll(".comment_people").length);

    const authorAndMessage = document.createElement("div");
    authorAndMessage.className = "author_and_message";

    var nowTime = new Date();
    const authorAvatar = document.getElementById("avatar");
    const cloneAuthorAvatar = authorAvatar.cloneNode(true);
    const authorAndText = document.createElement("div");
    authorAndText.className = "author_and_text";
    const authorName = document.getElementById("name");
    const cloneAuthorName = authorName.cloneNode(true);
    const timeComment = document.createElement("div");
    timeComment.className = "date_and_time";
    timeComment.innerText = `${padTo2Digits(nowTime.getDate())}.${padTo2Digits(nowTime.getMonth() + 1)} ${padTo2Digits(nowTime.getHours())}:${padTo2Digits(nowTime.getMinutes())}`;
    localStorage.setItem(`dateAuthorComment${indexAuthorComment}`, timeComment.textContent);
    const commentText = document.createElement("div");
    commentText.className = "comment_text";
    commentText.innerText = `${textArea.value}`;
    localStorage.setItem(`authorComment${indexAuthorComment}`, commentText.textContent);

    const underText = document.createElement("div");
    underText.className = "under_text";
    let likeRandom;
    likeRandom = random(0, 10);
    underText.innerHTML = `<div class="button_answer"><img src="images/otvet.svg" alt="otvet" /><p>Ответить</p></div><div class="button_favorites"><img src="images/izbran.svg" alt="izbran" /><p>В избранное</p></div><div><button class="button_minus">-</button><p class="number_likes">${likeRandom}</p><button class="button_plus">+</button></div>`;
    localStorage.setItem(`like${newComment.getAttribute("data-index")}`, likeRandom);
    authorAndText.appendChild(cloneAuthorName);
    authorAndText.appendChild(timeComment);
    authorAndMessage.appendChild(cloneAuthorAvatar);
    authorAndMessage.appendChild(authorAndText);
    authorAndMessage.appendChild(commentText);
    authorAndMessage.appendChild(underText);
    newComment.appendChild(authorAndMessage);
    allComments.insertBefore(newComment, allComments.firstChild);
    count.workCommentsCount();

    textArea.value = "";
    textArea.style.height = "43.531px";
    buttonSend.setAttribute("disabled", "");
    buttonSend.style.background = "#a1a1a1";
    buttonSend.classList.remove("hover-style");
    maxText.innerText = "Макс. 1000 символов";

    indexAuthorComment++;
    localStorage.setItem("indexAuthorComment", indexAuthorComment);
    plusMinusButtons.workPlusMinusButtonsComments();
    sortComments.workSortFavorites();
    workSort();
  });
}

function workSendAnswers(messageAtributeIndex) {
  document.getElementById("form_answer").style = "display: grid padding-left: 91px";
  document.getElementById("form_answer").style = "padding-left: 91px";

  const buttonSendAnswer = document.querySelector("#form_answer").querySelector(".send");
  const textAreaAnswer = document.querySelector("#form_answer").querySelector(".message");
  const maxTextAnswer = document.querySelector("#form_answer").querySelector(".max_text");
  const warningTextAnswer = document.querySelector("#form_answer").querySelector(".warning_text");

  let indexAuthorAnswer;
  if (localStorage.getItem("indexAuthorAnswer") !== null) {
    indexAuthorAnswer = localStorage.getItem("indexAuthorAnswer");
  } else {
    indexAuthorAnswer = 0;
  }

  buttonSendAnswer.style = "width: 100px";

  textAreaAnswer.addEventListener("input", function (event) {
    textAreaAnswer.style.height = "5px";
    textAreaAnswer.style.height = `${textAreaAnswer.scrollHeight}px`;

    if (event.target.value.length === 0) {
      buttonSendAnswer.setAttribute("disabled", "");
      buttonSendAnswer.style.background = "#a1a1a1";
      buttonSendAnswer.classList.remove("hover-style");
    } else {
      buttonSendAnswer.removeAttribute("disabled");
      buttonSendAnswer.style.background = "#ABD873";
      buttonSendAnswer.classList.add("hover-style");
    }
    if (event.target.value.length > 0) {
      maxTextAnswer.innerHTML = `${event.target.value.length}/1000`;
      if (event.target.value.length > 1000) {
        buttonSendAnswer.setAttribute("disabled", "");
        buttonSendAnswer.style.background = "#a1a1a1";
        buttonSendAnswer.classList.remove("hover-style");
        maxTextAnswer.setAttribute("style", "color:red; opacity: 1;");
        warningTextAnswer.style.display = "flex";
      } else {
        maxTextAnswer.setAttribute("style", "color:black; opacity: 0.4;");
        warningTextAnswer.style.display = "none";
      }
    } else {
      maxTextAnswer.innerText = "Макс. 1000 символов";
    }
  });

  buttonSendAnswer.addEventListener("click", function () {
    const answer = document.createElement("div");
    answer.className = "answer";

    const authorAndMessage = document.createElement("div");
    authorAndMessage.className = "author_and_message";
    const avatarAuthor = document.getElementById("avatar").cloneNode(true);
    avatarAuthor.className = "avatar_author";
    const authorAndText = document.createElement("div");
    authorAndText.className = "author_and_text author_and_text_answer";
    const authorName = document.getElementById("name");
    const cloneAuthorName = authorName.cloneNode(true);
    const timeComment = document.createElement("div");
    var nowTime = new Date();
    timeComment.className = "date_and_time";
    timeComment.innerText = `${padTo2Digits(nowTime.getDate())}.${padTo2Digits(nowTime.getMonth() + 1)} ${padTo2Digits(nowTime.getHours())}:${padTo2Digits(nowTime.getMinutes())}`;

    const arrowAnswer = document.createElement("img");
    arrowAnswer.src = "images/otvet.svg";
    arrowAnswer.alt = "ответ";
    const nameAuthorComment = document.createElement("div");
    nameAuthorComment.className = "name_author_comment";

    const commentText = document.createElement("div");
    commentText.className = "comment_text";
    commentText.innerText = `${textAreaAnswer.value}`;
    const underText = document.createElement("div");
    underText.className = "under_text under_text_answer";

    let likeRandom = random(0, 10);

    underText.innerHTML = `<div class="button_favorites"><img src="images/izbran.svg" alt="izbran" /><p>В избранное</p></div><div><button class="button_minus">-</button><p class="number_likes">${likeRandom}</p><button class="button_plus">+</button></div>`;

    authorAndText.appendChild(cloneAuthorName);
    authorAndText.appendChild(arrowAnswer);
    authorAndText.appendChild(nameAuthorComment);
    authorAndText.appendChild(timeComment);
    authorAndMessage.appendChild(underText);
    authorAndMessage.appendChild(commentText);
    authorAndMessage.appendChild(authorAndText);
    authorAndMessage.appendChild(avatarAuthor);
    answer.appendChild(authorAndMessage);

    document.querySelector(`.comment_people[data-index="${messageAtributeIndex}"]`).appendChild(answer);

    answer.setAttribute("data-index", answer.closest(".comment_people").querySelectorAll(".answer").length - 1);

    nameAuthorComment.innerText = `${nameAuthorComment.closest(".comment_people").querySelector(".name_author").textContent}`;

    textAreaAnswer.value = "";
    textAreaAnswer.style.height = "43.531px";
    buttonSendAnswer.setAttribute("disabled", "");
    buttonSendAnswer.style.background = "#a1a1a1";
    buttonSendAnswer.classList.remove("hover-style");
    maxTextAnswer.innerText = "Макс. 1000 символов";

    document.getElementById("form_answer").remove();

    localStorage.setItem(`likeAnswer${answer.closest(".comment_people").getAttribute("data-index")}.index${answer.getAttribute("data-index")}`, likeRandom);
    localStorage.setItem(`idAnswerParent${answer.closest(".comment_people").getAttribute("data-index")}.index${answer.getAttribute("data-index")}`, answer.closest(".comment_people").getAttribute("data-index"));
    localStorage.setItem(`dateAnswer${answer.closest(".comment_people").getAttribute("data-index")}.index${answer.getAttribute("data-index")}`, timeComment.textContent);
    localStorage.setItem(`authorAnswer${answer.closest(".comment_people").getAttribute("data-index")}.index${answer.getAttribute("data-index")}`, commentText.textContent);
    indexAuthorAnswer++;
    localStorage.setItem("indexAuthorAnswer", indexAuthorAnswer);
    plusMinusButtons.workPlusMinusButtonsAnswers();
    count.workAnswerCount();
  });
}

//кнопки ОТВЕТИТЬ
document.addEventListener("click", (event) => {
  const messages = document.querySelectorAll(".comment_people");

  if (event.target.closest(".button_answer")) {
    messages.forEach(function (mess) {
      //проверка есть ли блоки с отправкой ответа, то удалить
      if (mess.querySelector(".copy_form_answer") !== null) {
        mess.querySelector(".copy_form_answer").remove();
      }
    });

    const index = event.target.closest(".button_answer").getAttribute("data-index");
    const formSend = document.querySelector(".comment_author");
    const cloneFormSend = formSend.cloneNode(true);
    cloneFormSend.className += " copy_form_answer";
    cloneFormSend.id = "form_answer";

    document.querySelector(`.comment_people[data-index="${index}"]`).appendChild(cloneFormSend);
    workSendAnswers(index);
  }
});

//кнопки избранное
document.addEventListener("click", (event) => {
  const buttonFavorites = event.target.closest(".button_favorites");

  if (buttonFavorites) {
    const id = event.target.closest(".comment_people").getAttribute("data-index");

    if (event.target.closest(".answer") !== null) {
      if (buttonFavorites.hasAttribute(`active-favorites${id}-${buttonFavorites.closest(".answer").getAttribute("data-index")}`)) {
        localStorage.removeItem(`active-favorites${id}.${buttonFavorites.closest(".answer").getAttribute("data-index")}`);
        buttonFavorites.removeAttribute(`active-favorites${id}-${buttonFavorites.closest(".answer").getAttribute("data-index")}`);
        buttonFavorites.style = "color: black";
        buttonFavorites.innerHTML = '<img src="images/izbran.svg" alt="izbran" /><p>В избранное</p>';
      } else {
        buttonFavorites.style = "color: red";
        buttonFavorites.innerHTML = "<p>В избранном</p>";
        buttonFavorites.setAttribute(`active-favorites${id}-${buttonFavorites.closest(".answer").getAttribute("data-index")}`, true);
        localStorage.setItem(`active-favorites${id}.${buttonFavorites.closest(".answer").getAttribute("data-index")}`, buttonFavorites.getAttribute(`active-favorites${id}-${buttonFavorites.closest(".answer").getAttribute("data-index")}`));
      }
    } else {
      if (buttonFavorites.hasAttribute(`active-favorites${id}`) && localStorage.getItem(`active-favorites${id}`) !== null) {
        buttonFavorites.removeAttribute(`active-favorites${id}`);
        localStorage.removeItem(`active-favorites${id}`);
        buttonFavorites.style = "color: black";
        buttonFavorites.innerHTML = '<img src="images/izbran.svg" alt="izbran" /><p>В избранное</p>';
      } else {
        buttonFavorites.style = "color: red";
        buttonFavorites.innerHTML = "<p>В избранном</p>";

        buttonFavorites.setAttribute(`active-favorites${id}`, true);
        localStorage.setItem(`active-favorites${id}`, buttonFavorites.getAttribute(`active-favorites${id}`));
      }
    }
  }
});

function workSort() {
  const sortName = document.querySelector(".sort_name p");
  const sortDate = document.getElementById("date");
  const sortCountLikes = document.getElementById("count_likes");
  const sortActual = document.getElementById("actual");
  const sortCountAnswers = document.getElementById("count_answers");
  const arrow = document.getElementById("arrow");

  sortName.innerHTML = sortActual.querySelector("p").textContent;

  sortDate.addEventListener("click", function () {
    sortName.innerHTML = sortDate.querySelector("p").textContent;
    arrow.style.transform = "rotate(0deg)";
    arrow.style.transition = "500ms ease-out";
    sortComments.workSortDateComments();
  });

  sortCountLikes.addEventListener("click", function () {
    sortName.innerHTML = sortCountLikes.querySelector("p").textContent;
    arrow.style.transform = "rotate(0deg)";
    arrow.style.transition = "500ms ease-out";
    sortComments.workSortLikes();
  });

  sortActual.addEventListener("click", function () {
    sortName.innerHTML = sortActual.querySelector("p").textContent;
    arrow.style.transform = "rotate(0deg)";
    arrow.style.transition = "500ms ease-out";
  });

  sortCountAnswers.addEventListener("click", function () {
    sortName.innerHTML = sortCountAnswers.querySelector("p").textContent;
    arrow.style.transform = "rotate(0deg)";
    arrow.style.transition = "500ms ease-out";
    sortComments.workSortCountAnswers();
  });
}

function padTo2Digits(num) {
  return num.toString().padStart(2, "0"); // Преобразует 9 в 09, а 10 оставит без изменений
}

function random(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
