from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# 💡 どんな環境（127.0.0.1でもlocalhostでも）からの接続も100%許可する設定に強化しました
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/compare', methods=['POST'])
def compare():
    data = request.json
    if not data:
        return jsonify({"text": "データが空です"}), 400
        
    user_keyword = data.get('keyword', '')
    print(f"★フロントエンドから受け取ったキーワード: {user_keyword}")
    
    mermaid_code = f"graph TD\n    A[入力されたキーワード] --> B({user_keyword})"
    
    response_data = {
        "text": f"「{user_keyword}」の比較結果をここに表示します（Pythonサーバー通信成功）。",
        "mermaid": mermaid_code
    }
    
    return jsonify(response_data)

if __name__ == '__main__':
    # 💡 127.0.0.1だけでなく、パソコン内の全ての通り道（0.0.0.0）で待ち受けるように変更
    app.run(host='0.0.0.0', port=5000, debug=True)
