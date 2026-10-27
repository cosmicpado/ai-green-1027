const data = 보도자료;   // 데이터.js 에서 불러옴 (fetch 없이 동작 - 로컬 더블클릭 가능)
const q = document.getElementById('q');
const list = document.getElementById('list');
const count = document.getElementById('count');

// 본문 텍스트를 그대로 innerHTML 에 넣지 않도록 이스케이프
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

q.addEventListener('input', () => {
  const kw = q.value.trim().toLowerCase();
  const filtered = kw
    ? data.filter(a => [a.본문, a.제목, a.부처].some(f => f.toLowerCase().includes(kw)))
    : data;
  render(filtered);
});

function render(arr) {
  count.textContent = `결과 ${arr.length}건 / 전체 ${data.length}건`;
  if (!arr.length) {
    list.innerHTML = '<p class="empty">검색 결과가 없습니다.</p>';
    return;
  }
  list.innerHTML = arr.map(a => `
    <div class="card">
      <span class="label">${esc(a.부처)}</span>
      <div class="title">${esc(a.제목)}</div>
      <div class="body">${esc(a.본문)}</div>
    </div>`).join('');
}

render(data);
