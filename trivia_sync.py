import json
import os
from time import sleep

import pandas
import requests

params = {
    "amount": 50
}
filename = "trivia_questions"

total_questions = []

if not os.path.exists(f'{filename}.json'):
    open(f'{filename}.json', 'w', encoding='utf-8').close()

with open(f'{filename}.json', 'r+', encoding='utf-8') as f:
    try:
        questions = json.load(f)
    except ValueError:
        questions = []

    for i in range(50):
        response = requests.get('https://opentdb.com/api.php',
                                params=params, timeout=30)
        response.raise_for_status()
        data = response.json()["results"]
        questions.extend(data)
        unique = {each["question"]: each for each in questions}.values()
        total_questions.extend(list(unique))
        sleep(2)

    json.dump(total_questions, f, ensure_ascii=False, indent=4)


df = pandas.read_json(f'{filename}.json')
df.to_csv(f"{filename}.csv")
