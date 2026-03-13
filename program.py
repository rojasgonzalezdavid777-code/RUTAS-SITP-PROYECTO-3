from flask import Flask, jsonify
from flask_cors import CORS
import geopandas as gpd

app = Flask(__name__)
CORS(app)

@app.route('/api')
def get_data():
    # Lee el archivo usando GeoPandas
    gdf = gpd.read_file('paradero_zonal.geojson')
    
    # Convierte el GeoDataFrame a formato GeoJSON (String) y luego a Diccionario
    return jsonify(gdf.__geo_interface__)

if __name__ == '__main__':
    app.run(port=5000)