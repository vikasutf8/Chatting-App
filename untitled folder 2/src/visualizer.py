import matplotlib.pyplot as plt
import seaborn as sns

class DataVisualizer:
    @staticmethod
    def plot_monthly_counts(monthly_counts):
        plt.figure(figsize=(10, 5))
        sns.barplot(x=monthly_counts.index.strftime('%Y-%m'), y=monthly_counts.values)
        plt.title('Monthly Article Counts')
        plt.xlabel('Month')
        plt.ylabel('Number of Articles')
        plt.xticks (rotation=45)
        plt.tight_layout()
        plt.show()

    @staticmethod
    def plot_common_words(common_words):
        words, counts = zip(*common_words)
        plt.figure(figsize=(10, 5))
        sns.barplot(x=list(words), y=list(counts))
        plt.title('Most Common Words in Articles')
        plt.xlabel('Words')
        plt.ylabel('Frequency')
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.show()