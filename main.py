import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from tqdm import tqdm

def is_valid_url(url):
    parsed = urlparse(url)
    return bool(parsed.scheme) and bool(parsed.netloc)

def get_css_links(url):
    try:
        res = requests.get(url, timeout=10)
        res.raise_for_status()
        soup = BeautifulSoup(res.text, "html.parser")
        links = soup.find_all("link", rel="stylesheet")
        return [urljoin(url, link["href"]) for link in links if "href" in link.attrs]
    except Exception as e:
        print(f"[!] Failed to get CSS links from {url}: {e}")
        return []

def download_css(css_urls, output_file):
    with open(output_file, "w", encoding="utf-8") as f_out:
        for css_url in tqdm(css_urls, desc="Downloading CSS files"):
            try:
                res = requests.get(css_url, timeout=10)
                res.raise_for_status()
                f_out.write(f"/* From {css_url} */\n")
                f_out.write(res.text)
                f_out.write("\n\n")
            except Exception as e:
                print(f"[!] Failed to download {css_url}: {e}")

def main():
    target_url = input("Enter the target website URL: ").strip()
    output_css_file = "all_styles.css"

    if not is_valid_url(target_url):
        print("Invalid URL.")
        return

    css_urls = get_css_links(target_url)
    print(f"Found {len(css_urls)} CSS files.")

    if css_urls:
        download_css(css_urls, output_css_file)
        print(f"\n✅ All CSS content saved to: {output_css_file}")
    else:
        print("⚠️ No CSS links found.")

if __name__ == "__main__":
    main()
