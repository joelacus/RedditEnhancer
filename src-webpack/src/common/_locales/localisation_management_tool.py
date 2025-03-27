#
#   _      __  __ _______ 
#  | |    |  \/  |__   __|
#  | |    | \  / |  | |   
#  | |    | |\/| |  | |   
#  | |____| |  | |  | |   
#  |______|_|  |_|  |_|   
#
#  Localisation Management Tool
#
#  Author:        github.com/joelacus
#  Version:       1.1
#  Description:   Easily manage localisation files for web extensions.
#
#  Features:      Add a new translation into each localisation file.
#                 Find and add missing translations in each localisation file. (auto translation help)
#                 Calculate percentage completion.
#                 Add a new locale directory and file.
#                 Remove a specific translation item from every localisation file.
#                 Alphabetise items in the localisation files.
#
#  Supports localisation files formatted like this:  {
#                                                        "IdName": {
#                                                            "message": "Hello World"
#                                                        }
#                                                    }

import os
import json
import signal
import sys
import platform
import argparse
import requests
import asyncio
import time
from typing import Dict, List, Tuple


# Configuration
MASTER_LOCALE = 'en'  # Master language to base translations on.
LOCALES_DIR = "."     # Directory containing locale directories.


# Text colours and formatting
class colours:
    LIGHTGREY = '\033[37m'
    DARKGREY = '\033[90m'
    LIGHTRED = '\033[91m'
    ORANGE = '\033[33m'
    LIGHTCYAN = '\033[96m'
    LIGHTGREEN = '\033[92m'
    RESET = '\033[0m'


# Check if the required libraries are installed.
def check_libraries(libraries):
    for library in libraries:
        try:
            __import__(library)
        except ImportError:
            print(f"{colours.LIGHTRED}! Error{colours.RESET}: The required library \"{colours.LIGHTCYAN}{library}{colours.RESET}\" is not installed.")
            print(f"> Please install the missing library with \"{colours.LIGHTCYAN}pip install {library}{colours.RESET}\" and try again.\n")
            sys.exit(1)
check_libraries(['googletrans', 'requests'])

from googletrans import Translator


# Arguments
parser = argparse.ArgumentParser("manage_locales")
parser.add_argument("-p", "--path", type=str, help="Set working path.")
args = parser.parse_args()
if args.path:
    LOCALES_DIR = args.path


# Handle kill
def signal_handler(sig, frame):
    print(f'\n\n{colours.LIGHTRED}! Killed by user{colours.RESET} - Any changes have been saved.')
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)


# Load and return JSON data from a locale file.
def load_locale_file(file_path: str) -> Dict:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return {}


# Save JSON data to a locale file.
def save_locale_file(data: Dict, file_path: str):
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent='\t', ensure_ascii=False)


# Get list of all locale directories except master locale.
def get_locale_paths() -> List[str]:
    return [d for d in os.listdir(LOCALES_DIR) 
            if os.path.isdir(os.path.join(LOCALES_DIR, d)) and d != MASTER_LOCALE]


# Set colour for text based on percentage completion.
def set_completion_colour(completion):
    if completion == 100.0:
        colour = colours.LIGHTGREEN
    elif completion > 90:
        colour = colours.LIGHTCYAN
    elif completion > 50:
        colour = colours.ORANGE
    else:
        colour = colours.LIGHTRED
    return colour


# Calculate the completion percentage of each locale based on the master locale.
def calculate_completion(return_as_var):
    if not return_as_var:
        os.system('cls' if os.name == 'nt' else 'clear')
    
    try:
        master_file = os.path.join(LOCALES_DIR, MASTER_LOCALE, 'messages.json')
        if not os.path.exists(master_file):
            print(f"\n{colours.LIGHTRED}!Error{colours.RESET} - Master locale file not found at {master_file}")
            return
        
        master_data = load_locale_file(master_file)
        if not master_data:
            print(f"\n{colours.LIGHTRED}!Error{colours.RESET} - Master locale file is empty or invalid")
            return
        
        master_keys = set(master_data.keys())
        master_count = len(master_keys) - 1 # version number doesn't need to be counted

        print(f"\n\n=== Completion Statistics (relative to {MASTER_LOCALE}) ===")
        print(f"\nMaster locale ({MASTER_LOCALE}) has {master_count} items")
        print("\nDetailed statistics:")

        completion_stats = {MASTER_LOCALE: 100.0}

        locales = get_locale_paths()
        if not locales:
            print("No other locale directories found")
            return

        for locale in sorted(locales):
            locale_file = os.path.join(LOCALES_DIR, locale, 'messages.json')
            if not os.path.exists(locale_file):
                print(f"\n> {locale}: No messages.json file found")
                continue

            locale_data = load_locale_file(locale_file)
            locale_keys = set(locale_data.keys())
            
            # Calculate statistics
            common_keys = master_keys.intersection(locale_keys)
            missing_keys = master_keys - locale_keys
            extra_keys = locale_keys - master_keys
            
            if master_count > 0:
                completion = (len(common_keys) / master_count) * 100
            else:
                completion = 0

            completion_stats[locale] = completion

            print(f"\n{locale}:")
            print(f"  Total items: {len(locale_data)}")
            completion_colour = set_completion_colour(completion)
            print(f"  Completion: {completion_colour}{completion:.1f}%{colours.RESET}")
            print(f"  Missing items: {colours.LIGHTRED}{len(missing_keys)}{colours.RESET}")
            if len(extra_keys) > 0:
                print(f"  Extra keys not in {MASTER_LOCALE}: {len(extra_keys)}")
                print(f"  Extra keys: {extra_keys}")
        
        # Display summary table
        print("\n=== Summary ===\n")
        # Find the longest locale name for padding
        max_length = max(len(locale) for locale in completion_stats.keys())
        
        # Sort by completion percentage in descending order
        sorted_stats = sorted(completion_stats.items(), key=lambda x: x[1], reverse=True)
        
        for locale, percentage in sorted_stats:
            completion_colour = set_completion_colour(percentage)
            print(f"{locale.ljust(max_length)} {completion_colour}{percentage:>5.1f}%{colours.RESET}")

        if return_as_var:
            return completion_stats
        input("\n> Press Enter to continue...")

    except Exception as e:
        print(f"\n! Error calculating completion: {str(e)}")
        input("\n> Press Enter to continue...")

 
# Choose a locale file to find missing keys (from master locale) and prompt for translation to append item.
def find_missing_translations_menu():
    try:
        # Fetch language codes
        def fetch_language_codes():
            try:
                url = "https://raw.githubusercontent.com/umpirsky/locale-list/refs/heads/master/data/en/locales.json"
                response = requests.get(url)
                response.raise_for_status()
                data = response.json()
                formatted_data = {key.replace("_", "-"): value for key, value in data.items()}
                return formatted_data
            except requests.RequestException as e:
                print(f"{colours.LIGHTRED}! Error{colours.RESET} - Could not fetch language codes - {e}")
                return {}
        language_codes = fetch_language_codes()
        
        # Get available locals
        locales = get_locale_paths()

        # Calculate locale completion
        completion = calculate_completion(True)
        
        # Create menu with language names
        def create_locale_menu(locales, language_codes, completion):
            menu_options = []
            menu_options.append("Back")
            max_percentage_length = max(len(locale) for locale in completion.keys()) + 1
            max_locale_length = max(len(locale) for locale in locales)
            locales = [MASTER_LOCALE] + locales

            for locale in locales:
                # Get language name
                lang_name = language_codes.get(locale, '')

                # Get completion percentage
                percent = completion.get(locale)
                
                # Create menu option with locale and language name
                completion_colour = set_completion_colour(percent)
                rounded_percent = str(round(percent, 2)) + '%'
                menu_option = f"{str(locale).ljust(max_locale_length)} {completion_colour}{rounded_percent.ljust(max_percentage_length)}{colours.RESET} {lang_name}"
                menu_options.append(menu_option)
            
            return menu_options
        menu_options = create_locale_menu(locales, language_codes, completion)
        title = "Finding Missing Translations"
        
        while True:
            menu = ArrowMenu(menu_options,title)
            choice = menu.run()
            
            # If Exit is selected
            if choice == 1:
                main()
            
            selected_locale = menu_options[choice - 1].split()[0]
            selected_locale_name = menu_options[choice - 1].split()[2]
            find_missing_translations(selected_locale,selected_locale_name)

    except KeyboardInterrupt:
        sys.exit(0)


# Find missing keys for selected locale.
def find_missing_translations(selected_locale, selected_locale_name):
    os.system('cls' if os.name == 'nt' else 'clear')
    master_file = os.path.join(LOCALES_DIR, MASTER_LOCALE, 'messages.json')
    master_data = load_locale_file(master_file)
    locale_file = os.path.join(LOCALES_DIR, selected_locale, 'messages.json')
    locale_data = load_locale_file(locale_file)
    
    print(f"\n=== Finding Missing Translations For {selected_locale_name} ({selected_locale}) ===\n")
    total_items = len(master_data.items())
    
    for i, (key, value) in enumerate(master_data.items()):
        if ((key not in locale_data) and (key != 'extensionVersion')):
            print(f"\n>{colours.LIGHTGREY} Item {colours.LIGHTRED}{i} {colours.LIGHTGREY}of {colours.LIGHTRED}{total_items}{colours.RESET}")
            print(f">{colours.LIGHTGREY} Key/ID:{colours.RESET} {key}")
            print(f">{colours.LIGHTGREY} ({MASTER_LOCALE}) value:{colours.RESET} {colours.LIGHTGREEN}{value.get('message', '')}{colours.RESET}")
            auto_translated = get_translation(selected_locale, value.get('message', ''))
            if not auto_translated == None:
                print(f"> Auto translated into {selected_locale_name} ({selected_locale}). Accept translation?:{colours.LIGHTGREEN} {auto_translated}{colours.RESET}")
            
            while True:
                response = input(f"? Enter translation for ({selected_locale}) {colours.DARKGREY}(or '/accept', '/custom' (retranslate), '/skip', '/back', '/exit'){colours.RESET}:").strip()
                if response.lower() == '/accept':
                    locale_data[key] = {'message': auto_translated}
                    save_locale_file(locale_data, locale_file)
                    print(f"> Added translation for: {key}: {auto_translated}")
                    break
                elif response.lower() == '/custom':
                    custom_translation = input(f"? Enter text to auto translation into ({selected_locale}):")
                    auto_translated = get_translation(selected_locale, custom_translation)
                    if not auto_translated == None:
                        print(f"> Translated into {selected_locale_name} ({selected_locale}). Accept translation?: {colours.LIGHTGREEN}{auto_translated}{colours.RESET}")
                elif response.lower() == '/skip':
                    break
                elif response.lower() == '/back':
                    time.sleep(0.5)
                    find_missing_translations_menu()
                elif response.lower() == '/exit':
                    sys.exit(1)
                elif response:
                    locale_data[key] = {'message': response}
                    save_locale_file(locale_data, locale_file)
                    print(f"> Added translation for: {key}: {response}")
                    break
                else:
                    print(f"{colours.LIGHTRED}!{colours.RESET} Translation cannot be empty. Please enter a valid translation (or '/s' (skip item), or '/sl' (skip locale))")


# Append a new translation item to each locale file.
def add_new_translation():
    # First, get the key and English translation
    while True:
        key = input("\n? Enter new translation key/id (or '/back): ").strip()
        if key == '/back':
            main()
        if key:
            break
        print(f"{colours.LIGHTRED}!{colours.RESET} Key cannot be empty.")

    master_file = os.path.join(LOCALES_DIR, MASTER_LOCALE, 'messages.json')
    master_data = load_locale_file(master_file)
    locales_done = []
    master_translation = ''
    
    while True:
        master_translation = input(f"? Enter ({MASTER_LOCALE}) translation: ").strip()
        if master_translation:
            master_data[key] = {'message': master_translation}
            save_locale_file(master_data, master_file)
            locales_done.append(MASTER_LOCALE)
            break
        print(f"{colours.LIGHTRED}!{colours.RESET} Translation cannot be empty.")

    # Then handle other locales
    skip_all = False
    for locale in get_locale_paths():
        if skip_all:
            break
        locale_file = os.path.join(LOCALES_DIR, locale, 'messages.json')
        locale_data = load_locale_file(locale_file)
        auto_translated = get_translation(locale, master_translation)
        
        while True:
            if not auto_translated == None:
                print(f"> Auto translated into ({locale}). Accept translation?:{colours.LIGHTGREEN} {auto_translated}{colours.RESET}")
            translation = input(f"? Enter ({locale}) translation {colours.DARKGREY}(or '/accept', or '/custom',or '/s' (skip), or '/back'){colours.RESET}: ").strip()
            if translation.lower() == '/accept':
                locale_data[key] = {'message': auto_translated}
                save_locale_file(locale_data, locale_file)
                locales_done.append(locale)
                break
            elif translation.lower() == '/custom':
                custom_translation = input(f"? Enter text to auto translation into ({locale}):")
                auto_translated = get_translation(locale, custom_translation)
            elif (translation.lower() == '/s') or (translation.lower() == '/skip'):
                break
            elif translation.lower() == '/back':
                skip_all = True
                break
            elif translation:
                locale_data[key] = {'message': translation}
                save_locale_file(locale_data, locale_file)
                locales_done.append(locale)
                break
            else:
                print(f"{colours.LIGHTRED}!{colours.RESET} Translation cannot be empty. Please enter a valid translation or '/s' (skip locale).")

    print(f"> Added '{key}' to {locales_done}")
    input("\n> Press Enter to continue...")
    


# Remove an item from each locale file by key.
def remove_translation():
    key = input("\n? Enter key/id to remove (or '/back'): ").strip()
    if key == '/back':
        main()
    if not key:
        print(f"{colours.LIGHTRED}!{colours.RESET} Key cannot be empty.")
        return
    
    locales_done = []

    # Remove from master locale first
    master_file = os.path.join(LOCALES_DIR, MASTER_LOCALE, 'messages.json')
    master_data = load_locale_file(master_file)
    
    if key in master_data:
        del master_data[key]
        save_locale_file(master_data, master_file)
        locales_done.append(MASTER_LOCALE)
    
    # Remove from other locales
    
    for locale in get_locale_paths():
        locale_file = os.path.join(LOCALES_DIR, locale, 'messages.json')
        locale_data = load_locale_file(locale_file)

        try:
            if key in locale_data:
                del locale_data[key]
                save_locale_file(locale_data, locale_file)
                locales_done.append(locale)
        except:
            print(f"! Failed to remove '{key}' from {locale}")
        
    print(f"> {colours.LIGHTRED}Removed{colours.RESET} '{key}' from {locales_done}")
    input("\n> Press Enter to continue...")
        


# Create a new locale directory and messages.json
def add_new_localisation():
    lang = input("\n? Enter the two letter ISO 639 language code (or '/back'): ").strip()
    if lang == '/back':
        main()

    locale_added = False
    newpath = os.path.join(LOCALES_DIR, lang)

    try:
        if not os.path.exists(newpath):
            os.makedirs(newpath)
            data = {}
            filepath = os.path.join(newpath, 'messages.json')
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent='\t', ensure_ascii=False)
            locale_added = True
    except:
        print(f"{colours.LIGHTRED}! Error{colours.RESET} - Failed to write locale file.")
    
    if locale_added:
        print(f"> Added '{lang}' to {LOCALES_DIR}")
    input("\n> Press Enter to continue...")


# Alphabetise items in all locales by key.
def alphabetise_locales():
    # Sort master locale first
    master_file = os.path.join(LOCALES_DIR, MASTER_LOCALE, 'messages.json')
    master_data = load_locale_file(master_file)
    special_keys = ["extensionVersion", "extensionName", "extensionDescription"]
    special_items = {}
    for key in special_keys:
        if key in master_data:
            special_items[key] = master_data[key]
    remaining_items = {k: v for k, v in master_data.items() if k not in special_keys}
    sorted_remaining = dict(sorted(remaining_items.items()))
    sorted_master = special_items | sorted_remaining
    save_locale_file(sorted_master, master_file)
    print(f"\n> Sorted {MASTER_LOCALE} translations")
    
    # Sort other locales
    for locale in get_locale_paths():
        locale_file = os.path.join(LOCALES_DIR, locale, 'messages.json')
        locale_data = load_locale_file(locale_file)
        special_keys = ["extensionName", "extensionDescription"]
        special_items = {}
        for key in special_keys:
            if key in locale_data:
                special_items[key] = locale_data[key]
        remaining_items = {k: v for k, v in locale_data.items() if k not in special_keys}
        sorted_remaining = dict(sorted(remaining_items.items()))
        sorted_locale = special_items | sorted_remaining
        save_locale_file(sorted_locale, locale_file)
        print(f"> Sorted {locale}")
    input("\n> Press Enter to continue...")


# Translate API
def get_translation(lang,str):
    try:
        response = asyncio.run(translate_text(lang,str))
        return response.text
    except:
        print(f"{colours.LIGHTRED}! Error{colours.RESET} - Failed to auto translate.")

async def translate_text(lang,str):
    async with Translator() as translator:
        return await translator.translate(str, src=MASTER_LOCALE, dest=lang)


# Arrow Menu
class ArrowMenu:
    def __init__(self, options, title):
        self.title = title
        self.options = options
        self.selected = 0
        self.is_windows = platform.system() == 'Windows'

    # Get a single character from standard input on Unix systems.
    def _getch_unix(self):
        import tty, termios
        fd = sys.stdin.fileno()
        old_settings = termios.tcgetattr(fd)
        try:
            tty.setraw(sys.stdin.fileno())
            ch = sys.stdin.read(1)
        finally:
            termios.tcsetattr(fd, termios.TCSADRAIN, old_settings)
        return ch

    # Get a single character from standard input on Windows.
    def _getch_windows(self):
        import msvcrt
        return msvcrt.getch()

    # Get arrow key input across different platforms.
    def _get_key(self):
        if self.is_windows:
            key = self._getch_windows()
            if key == b'\xe0':  # Arrow key prefix on Windows
                key = self._getch_windows()
                return {
                    b'H': 'up',
                    b'P': 'down',
                    b'M': 'right',
                    b'K': 'left'
                }.get(key)
            elif key == b'\r':  # Enter key
                return 'enter'
        else:
            key = self._getch_unix()
            if key == '\x1b':  # Escape sequence prefix
                key = self._getch_unix()
                if key == '[':  # Arrow key prefix
                    key = self._getch_unix()
                    return {
                        'A': 'up',
                        'B': 'down',
                        'C': 'right',
                        'D': 'left'
                    }.get(key)
            elif key == '\r':  # Enter key
                return 'enter'
        return None
    
    def clear_screen(self):
        os.system('cls' if self.is_windows else 'clear')

    # Display the menu options.
    def display(self):
        self.clear_screen()
        print(f"\n=== {self.title} ===\n")
        for i, option in enumerate(self.options):
            if i == self.selected:
                print(f" > {option}")
            else:
                print(f"   {option}")

    # Run the menu and return the selected option.
    def run(self):
        while True:
            self.display()
            key = self._get_key()
            
            if key == 'up' and self.selected > 0:
                self.selected -= 1
            elif key == 'down' and self.selected < len(self.options) - 1:
                self.selected += 1
            elif key == 'enter':
                return self.selected + 1  # Return 1-based index


def main():
    try:
        menu_options = [
            "Add new translation",
            "Find missing translations",
            "Calculate completion percentages",
            "Add new localisation",
            "Remove translation",
            "Alphabetise locales",
            "Exit"
        ]
        title = "Localisation Management Tool"

        while True:
            menu = ArrowMenu(menu_options, title)
            choice = menu.run()
            
            if choice == 1:
                add_new_translation()
            elif choice == 2:
                find_missing_translations_menu()
            elif choice == 3:
                calculate_completion(False)
            elif choice == 4:
                add_new_localisation()
            elif choice == 5:
                remove_translation()
            elif choice == 6:
                alphabetise_locales()
            elif choice == 7:
                print("\n")
                sys.exit(0)

    except KeyboardInterrupt:
        print('\n\n! Killed by user. Any changes have been saved.')
        sys.exit(0)

if __name__ == "__main__":
    main()