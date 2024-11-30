import requests
from bs4 import BeautifulSoup
import logging
from datetime import datetime

class WebScraper:
    def __init__(self):
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)

    def scrape_news_articles(self, url):
        try:
            headers = {
                'User -Agent': 'Mozilla/5.0'
            }
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')

            title = self._extract_text(soup, ['h1.title', 'h1.article-title'])
            summary = self._extract_text(soup, ['div.article-body', 'div.content'])
            date = self._extract_date(soup) or datetime.now().strftime('%Y-%m-%d')

            return [{
                'title': title,
                'summary': summary,
                'date': date,
                'url': url
            }]
        except Exception as e:
            self.logger.error(f"Error scraping {url}: {e}")
            return []

    def _extract_text(self, soup, selectors):
        for selector in selectors:
            element = soup.select_one(selector)
            if element:
                return element.get_text(strip=True)
        return 'No Content Found'

    def _extract_date(self, soup):
        date_elem = soup.select_one('time')
        if date_elem:
            return date_elem.get('datetime') or date_elem.get_text(strip=True)
        return None