import os
import requests
from dotenv import load_dotenv

# 1. .envファイルから環境変数を読み込む
load_dotenv()
HF_TOKEN = os.getenv("HF_TOKEN")

# 2.設定
MODEL_ID = "Qwen/Qwen2.5-1.5B-Instruct"
API_URL = f"https://huggingface.co{MODEL_ID}"
headers = {"Authorization": f"Bearer {HF_TOKEN}"}

def judge_input(user_text):
    # 3.命令
    prompt = f"""
    Analyze the following user input and classify it into exactly one of these categories:
    - 'compare' (if they want to compare things)
    - 'search' (if they want to search or find similar information)
    
    Respond with ONLY the lowercase word 'compare' or 'search'. Do not include any other text, periods, or formatting.
    
    User Input: {user_text}
    """
    
    # 4. AIにメッセージを送信する
    response = requests.post(API_URL, headers=headers, json={"inputs": prompt})
    
    if response.status_code == 200:
        ai_reply = response.json()[0]['generated_text'].strip()
        
        # security
        safe_reply = "".join([char for char in ai_reply if char.isalnum()])
        
        return safe_reply
    else:
        return "error"

# test
test_input = "iPhoneとAndroidのバッテリー持ちの違いを調べて"
result = judge_input(test_input)

print(f"AIの判断結果: {result}") # 画面には「compare」か「search」だけが表示
