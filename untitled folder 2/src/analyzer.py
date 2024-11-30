import pandas as pd
from collections import Counter
import re
from textblob import TextBlob

class DataAnalyzer:
    def __init__(self, dataframe):
        self.df = dataframe

    def get_monthly_article_count(self):
        return self.df.groupby(pd.Grouper(key='date', freq='M')).size()

    def find_most_common_words(self, n=10):
        text = ' '.join(self.df['title'] + ' ' + self.df['summary'])
        words = re.findall(r'\w+', text.lower())
        words = [word for word in words if len(word) > 3]
        return pd.Series(Counter(words).most_common(n))

    def analyze_sentiment(self):
        self.df['sentiment'] = self.df['summary'].apply(lambda x: TextBlob(x).sentiment.polarity)
        return self.df[['title', 'sentiment']]