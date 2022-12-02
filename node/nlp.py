import sys
import pandas as pd
from fuzzywuzzy import fuzz
import spacy
from collections import Counter
from string import punctuation
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize

nlp = spacy.load("en_core_web_sm")
nlp.disable_pipe("parser")
ps = PorterStemmer()

def getKeywords(text):
    result = []
    pos_tag = ['PROPN', 'ADJ', 'NOUN', 'NUM', 'VERB']

    if type(text) == list:
        text = ' '.join(text)

    doc = nlp(text.lower()) 
    for token in doc:
        if(token.text in nlp.Defaults.stop_words or token.text in punctuation):
            continue
        if(token.pos_ in pos_tag):
            result.append(token.text)
        
    for i in range(len(result)):
        result[i] = ps.stem(result[i])

    return result

# text 1 and 2 can be lists
def textToText(text1, text2):
    text1 = getKeywords(text1)
    text2 = getKeywords(text2)
    return fuzz.token_sort_ratio(text1, text2)


# print(textToText("what was the math one seventeen mean", ["math", "one seventeen"]))
# print(textToText("what was the math one seventeen mean", ["math", "one fifteen"]))

print(textToText(sys.argv[1], sys.argv[2]))
sys.stdout.flush()