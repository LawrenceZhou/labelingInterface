### Importing the required libraries   
import pandas as pd   
import numpy as np  
import seaborn as sns   
import matplotlib.pyplot as plt   
from matplotlib import cm 

from mpl_toolkits.mplot3d import Axes3D  
from matplotlib.ticker import LinearLocator, FormatStrFormatter  
# Creating a figure  
# projection = '3d' enables the third dimension during plot  
fig = plt.figure(figsize=(10,8))  
ax = fig.gca(projection='3d')  
# Initialize data   
X = np.arange(-5,5,0.1)  
Y = np.arange(-5,5,0.1)  
# Creating a meshgrid  
X, Y = np.meshgrid(X, Y)  
R = np.sqrt(np.abs(X**2 - Y**2))  
Z = np.exp(R)  
# plot the surface   
surf = ax.plot_surface(X, Y, Z, cmap=cm.viridis, antialiased=False)  
# Customize the z axis.  
ax.zaxis.set_major_locator(LinearLocator(10))  
ax.zaxis.set_major_formatter(FormatStrFormatter('%.02f'))  
ax.get_xaxis().set_ticks([])
ax.get_yaxis().set_ticks([]) 
ax.get_zaxis().set_ticks([]) 
# Add a color bar which maps values to colors.  
fig.colorbar(surf, shrink=0.5, aspect=5)  
plt.show()  