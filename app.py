from flask import Flask, render_template, jsonify
import json
import os

app = Flask(__name__)

def veri_yukle():
    # 1. Harita koordinatlarını oku
    geojson_yolu = 'sehirler.json'
    geojson_data = {}
    if os.path.exists(geojson_yolu):
        with open(geojson_yolu, 'r', encoding='utf-8') as f:
            geojson_data = json.load(f)

    # 2. SENİN GİRDİĞİN İSTATİSTİKLERİ OKU
    istatistik_yolu = 'istatistikler.json'
    istatistik_dict = {}
    if os.path.exists(istatistik_yolu):
        with open(istatistik_yolu, 'r', encoding='utf-8') as f:
            istatistik_dict = json.load(f)

    return geojson_data, istatistik_dict

@app.route('/')
def index():
    harita_verisi, istatistikler = veri_yukle()
    return render_template('index.html', geojson_data=harita_verisi, stats=istatistikler)

if __name__ == '__main__':
    app.run(debug=True)