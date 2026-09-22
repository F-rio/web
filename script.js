const inputfield = document.getElementById('input1');
const resultfield = document.getElementById('result-text');
const graphfield = document.getElementById('result-graph');

inputfield.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const text = inputfield.value;
        if (text.trim() === '') {
            resultfield.innerText = '検索キーワードを入力してください。';
            resultfield.classList.add('error');
            resultfield.classList.remove('success');
        } else {
            resultfield.innerText = 'AIが検索・比較しています。少々お待ちください...';
            resultfield.classList.remove('error');
            
            // 💡 起動しているPythonサーバー（app.py）へ文字を送信する仕組みです
            fetch('http://localhost:5000/compare', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ keyword: text })
            })
            .then(response => response.json())
            .then(data => {
                // Pythonから返ってきた文字（data.text）を表示
                resultfield.innerText = data.text;
                resultfield.classList.add('success');
                
                // Pythonから返ってきた図のデータ（data.mermaid）を表示エリアに入れる
                graphfield.removeAttribute('data-processed'); 
                graphfield.innerHTML = data.mermaid;
                
                // 画面に入れた文字を自動で綺麗な「図」に変換する命令
                if (window.mermaid) {
                    mermaid.init(undefined, graphfield);
                }
                
                inputfield.value = '';
            })
            .catch(error => {
                console.error('Error:', error);
                resultfield.innerText = 'サーバーとの通信に失敗しました。';
                resultfield.classList.add('error');
            });
        }
    }
});
