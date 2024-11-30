import pandas as pd
from datetime import datetime

class DataProcessor:
    @staticmethod
    def clean_data(articles):
        if not articles:
            return pd.DataFrame(columns=['title', 'summary', 'date'])
        
        df = pd.DataFrame(articles)
        df.drop_duplicates(subset=['title'], inplace=True)
        df['date'] = pd.to_datetime(df['date'], errors='coerce').fillna(pd.Timestamp.now())
        return df