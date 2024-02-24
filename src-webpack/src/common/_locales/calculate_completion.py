import os
import json

def compare_files(english_file, other_file):
    with open(english_file, 'r', encoding='utf-8') as f:
        english_data = json.load(f)
    with open(other_file, 'r', encoding='utf-8') as f:
        other_data = json.load(f)
    
    total_messages = len(english_data)
    different_messages = sum(1 for key, value in english_data.items() if value != other_data.get(key))
    total_messages_for_lang = len(other_data)
    percentage_completion = 100 - ((total_messages - different_messages) / total_messages) * 100
    return percentage_completion, total_messages_for_lang

def main():
    english_file = 'en/messages.json'
    locales_dir = "."

    english_data = {}
    with open(os.path.join(locales_dir, english_file), 'r', encoding='utf-8') as f:
        english_data = json.load(f)
    
    print("Percentage completion for each language:")
    for lang_dir in os.listdir(locales_dir):
        if lang_dir != 'en' and os.path.isdir(os.path.join(locales_dir, lang_dir)):
            lang_file = os.path.join(lang_dir, 'messages.json')
            if os.path.exists(os.path.join(locales_dir, lang_file)):
                completion_percentage, total_messages_for_lang = compare_files(os.path.join(locales_dir, english_file), os.path.join(locales_dir, lang_file))
                print(f"{lang_dir}: {completion_percentage:.2f}% complete ({total_messages_for_lang} items)")
            else:
                print(f"No localisation file found for {lang_dir}")

if __name__ == "__main__":
    main()
