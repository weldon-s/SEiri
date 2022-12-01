import pandas as pd
from fuzzywuzzy import fuzz
import spacy
from collections import Counter
from string import punctuation

nlp = spacy.load("en_core_web_sm")

def getKeywords(text):
    result = []
    pos_tag = ['PROPN', 'ADJ', 'NOUN', 'NUM'] 
    doc = nlp(text.lower()) 
    for token in doc:
        if(token.text in nlp.Defaults.stop_words or token.text in punctuation):
            continue
        if(token.pos_ in pos_tag):
            result.append(token.text)

    return result

# text 1 and 2 can be lists
def textToText(text1, text2):
    if type(text1) == str:
        text1 = getKeywords(text1)
    if type(text2) == str:
        text2 = getKeywords(text2)
    return fuzz.token_sort_ratio(text1, text2)


# print(textToText("what was the math one seventeen mean", ["math", "one seventeen"]))
# print(textToText("what was the math one seventeen mean", ["math", "one fifteen"]))
