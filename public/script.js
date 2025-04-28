const API_BASE = 'http://localhost:3000';

function register() {
  fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: document.getElementById('register-username').value,
      nama: document.getElementById('register-nama').value,
      password: document.getElementById('register-password').value
    })
  })
  .then(r => r.json()).then(alertResponse).catch(console.error);
}

function login() {
  fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: document.getElementById('login-username').value,
      password: document.getElementById('login-password').value
    })
  })
  .then(r => r.json())
  .then(data => {
    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
      alert('Login berhasil!');
    } else {
      alert('Login gagal!');
    }
  }).catch(console.error);
}

function logout() {
  fetch(`${API_BASE}/auth/logout`, {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
  })
  .then(r => r.json())
  .then(() => {
    localStorage.removeItem('accessToken');
    alert('Logout berhasil!');
  }).catch(console.error);
}

function fetchAnime() {
  fetch(`${API_BASE}/anime`, {
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
  })
  .then(r => r.json())
  .then(data => {
    const list = document.getElementById('anime-list');
    list.innerHTML = '';
    data.forEach(anime => {
      const li = document.createElement('li');
      li.className = 'bg-gray-200 p-2 rounded flex justify-between items-center';
      li.innerHTML = `
        <span><strong>${anime.id}.</strong> ${anime.judul}</span>
      `;
      list.appendChild(li);
    });
  }).catch(console.error);
}

function addAnime() {
  fetch(`${API_BASE}/anime`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    },
    body: JSON.stringify({ judul: document.getElementById('add-judul').value })
  })
  .then(r => r.json()).then(alertResponse).catch(console.error);
}

function editAnime() {
  const id = document.getElementById('edit-id').value;
  fetch(`${API_BASE}/anime/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    },
    body: JSON.stringify({ judul: document.getElementById('edit-judul').value })
  })
  .then(r => r.json()).then(alertResponse).catch(console.error);
}

function deleteAnime() {
  const id = document.getElementById('delete-id').value;
  fetch(`${API_BASE}/anime/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
  })
  .then(r => r.json()).then(alertResponse).catch(console.error);
}

function alertResponse(data) {
  console.log(data);
  alert(JSON.stringify(data));
}
