from flask import Flask, request, render_template
from src.scraper import WebScraper
from src.data_processor import DataProcessor
from src.analyzer import DataAnalyzer
from src.visualizer import DataVisualizer

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/scrape', methods=['POST'])
def scrape():
    url = request.form['url']
    scraper = WebScraper()
    articles = scraper.scrape_news_articles(url)
    processor = DataProcessor()
    df = processor.clean_data(articles)
    analyzer = DataAnalyzer(df)

    monthly_counts = analyzer.get_monthly_article_count()
    common_words = analyzer.find_most_common_words()
    
    # Visualize data
    DataVisualizer.plot_monthly_counts(monthly_counts)
    DataVisualizer.plot_common_words(common_words)

    return render_template('results.html', articles=articles, monthly_counts=monthly_counts, common_words=common_words)

def run_ui():
    app.run(debug=True)

if __name__ == "__main__":
    run_ui()