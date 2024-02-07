const saveBtn = document.querySelector('.saveBtn');
const main = document.querySelector('.main');
let moods = JSON.parse(localStorage.getItem('moods'));
moods = moods ?? [];

saveBtn.addEventListener('click', function () {
  let newMood = {};
  let musicLink = main.querySelector('.music-input').value;
  let moodContent = main.querySelector('.mood-content').value;
  let id = JSON.parse(localStorage.getItem('id'));
  id = id ?? 0;
  let now = new Date();

  newMood.id = id;
  newMood.music = musicLink;
  newMood.content = moodContent;
  newMood.date = `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}`;
  moods.push(newMood);

  setMood();
  main.querySelector('.music-input').value = null;
  main.querySelector('.mood-content').value = null;
  localStorage.setItem('moods', JSON.stringify(moods));
  localStorage.setItem('id', JSON.stringify(++id));
});

function setMood() {
  const mood_list = main.querySelector('.mood-list');
  while(mood_list.firstChild) {
    mood_list.firstChild.remove();
  }
  for ( let i = moods.length - 1; i >= 0; i--) {
    let article = document.createElement('article');
    article.classList.add('list-article');
    article.setAttribute('data-id', moods[i].id);

    let music = document.createElement('h2');
    music.classList.add('list-music');
    music.textContent = moods[i].music;

    let data = document.createElement('span');
    data.textContent = moods[i].date;

    let content = document.createElement('p');
    content.classList.add('list-content');
    content.textContent = moods[i].content;

    let editBtn = document.createElement('button');
    editBtn.classList.add('editBtn');
    editBtn.textContent = '수정';
    editBtn.addEventListener('click', setEditBtn, false);

    let deleteBtn = document.createElement('button');
    editBtn.classList.add('deleteBtn');
    editBtn.textContent = '삭제';
    editBtn.addEventListener('click', setDeleteBtn, false);

    let btnWrap = document.createElement('div');
    btnWrap.classList.add('btnWrap');

    btnWrap.append(editBtn, deleteBtn);
    article.append(music, data, content, btnWrap);
    mood_list.append(article);
  }
}
function setDeleteBtn(e) {
  moods.forEach((a, i) => {
    if (a.id == e.target.parentNode.parentNode.dataset.id) {
      moods.splice(i, 1);
      localStorage.setItem('mood', JSON.stringify(moods));
      setMood();
      return;
    }
  });
}
function setEditBtn(e) {
  moods.forEach((a, i) => {
    if (a.id == e.target.parentNode.parentNode.dataset.id) {
      main.querySelector('.music-input').value = a.music;
      main.querySelector('.mood-content').value = a.content;
      moods.splice(i, 1);
      localStorage.setItem('mood', JSON.stringify(moods));
      setMood();
      return;
    }
  });
}
setMood();