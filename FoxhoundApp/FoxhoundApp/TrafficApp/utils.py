import numpy as np
from FoxhoundApp.settings import BASE_DIR

class HeatMapDataGetter:
    lat_array = np.loadtxt(str(BASE_DIR  / 'data/lat_grid.txt'))
    lng_array = np.loadtxt(str(BASE_DIR  / 'data/lon_grid.txt'))
    data = {
        'food': np.loadtxt(str(BASE_DIR  / 'data/retail_grid.txt')),
        'bar': np.loadtxt(str(BASE_DIR  / 'data/cafe_grid.txt'))
    }

    def get_data(self, type):
        data = self.data[type]
        return_data = [
            {
                'lat': self.lat_array[i],
                'lng': self.lng_array[j],
                'value': data[i][j]
            }
            for i in range(len(self.lat_array))
            for j in range(len(self.lng_array))
        ]
        return return_data
