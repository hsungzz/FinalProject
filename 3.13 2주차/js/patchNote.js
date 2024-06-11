document.addEventListener('DOMContentLoaded', function () {
  // 예시 데이터
  const patchNotes = [
    {
      date: '2024-06-02',
      title: '패치 11.15',
      content: '이번 패치에서는 여러 챔피언의 밸런스가 조정되었습니다...'
    },
    {
      date: '2024-06-09',
      title: '패치 11.16',
      content: '주요 변경 사항으로는 아이템 조정과 함께 일부 챔피언의 스킬이 개편되었습니다...'
    },
    {
      date: '2024-06-21',
      title: '패치 11.18',
      content: '이번 패치에서는 새로운 챔피언 2종이 추가되었습니다...'
    }

  ];

  const patchNotesContainer = document.getElementById('patchNotes');

  patchNotes.forEach(function (note) {
    const element = document.createElement('div');
    element.classList.add('patch-note');
    element.innerHTML = `<h2>${note.title} - ${note.date}</h2><p>${note.content}</p>`;
    patchNotesContainer.appendChild(element);
  });
});
