import numpy as np
import seaborn as sns
import csv
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
from numpy import median


iteration = list(range(1, 51))

# Read sdtw data
sdtw = {}
eucl = {}
for i in range(100):
    temp_s = []
    temp_e = []
    #with open('experiment_result/real_sdtw_eucli_trial_' + str(i) + '.csv', 'rU') as data:
    with open('experiment_result/adaptive_sdtw_eucli_trial_' + str(i) + '.csv', 'rU') as data:
        reader = csv.reader(data)
        j = 1
        for row in reader:
            if str(j) in sdtw:
                if j == 1 or float(row[1]) <= float(sdtw[str(j-1)][-1]):
                    sdtw[str(j)].append(float(row[1]))                    
                else:
                    sdtw[str(j)].append(sdtw[str(j-1)][-1])                    
                if j == 1 or float(row[2]) <= float(eucl[str(j-1)][-1]):
                    eucl[str(j)].append(float(row[2]))
                else:
                    eucl[str(j)].append(eucl[str(j-1)][-1])
            else:
                sdtw[str(j)] = [float(row[1])]
                eucl[str(j)] = [float(row[2])]
            j += 1


for j in range(1, 50):
  #q75, q25 = np.percentile(eucl[str(j)], [87.5 ,12.5])
  #condition = (eucl[str(j)] >= q25) & (eucl[str(j)] <= q75)
  #eucl[str(j)] = np.extract(condition, eucl[str(j)])
  #eucl[str(j)] = median(eucl[str(j)])
  #for i in range(100):
  for i in range(len(eucl[str(j)])):
    if j != 1 and eucl[str(j)][i] > eucl[str(j - 1)][i]:
      eucl[str(j)][i]= eucl[str(j - 1)][i]
    if j != 1 and sdtw[str(j)][i] > sdtw[str(j - 1)][i]:
      sdtw[str(j)][i]= sdtw[str(j - 1)][i]

  #q75, q25 = np.percentile(sdtw[str(j)], [87.5 ,12.5])
  #condition = (sdtw[str(j)] >= q25) & (sdtw[str(j)] <= q75)
  #sdtw[str(j)] = np.extract(condition, sdtw[str(j)])  
  #sdtw[str(j)] = median(sdtw[str(j)])
  #if j != 1 and sdtw[str(j)] > sdtw[str(j - 1)]:
  #  sdtw[str(j)]= sdtw[str(j - 1)]
  print(j, np.mean(sdtw[str(j)]), np.mean(eucl[str(j)]))
sdtw["50"]=sdtw["49"]
eucl["50"]=eucl["49"]


print(sdtw)
print(eucl)
# Create DataFrame
df_data = pd.DataFrame()
df_data_2 = pd.DataFrame()


for i in iteration:
    df = pd.DataFrame({
        's-DTW': list(np.array(sdtw[str(i)])),
        'Iteration': str(i + 1).zfill(2)
        #'Iteration': i
    })
    df_data = pd.concat([df_data, df])
    df = pd.DataFrame({
        'Euclidean distance': list(np.array(eucl[str(i)])),
        'Iteration': str(i + 1).zfill(2)
        #'Iteration': i
    })
    df_data_2 = pd.concat([df_data_2, df])

# Draw plots
sns.set()

plt.rc('font', family = 'serif', serif = 'cmr10') 
plt.rcParams.update({'font.size': 32})

"""
fig = plt.figure(figsize=(12, 4))
ax = fig.add_subplot(1, 1, 1)

# sdtw boxplot
box_plot = sns.boxplot(y='s-DTW',
                       x='Iteration',
                       showfliers=False,
                       data=df_data,
                       ax=ax)

fig.tight_layout()
plt.savefig("../boxplot.pdf")
"""
fig = plt.figure(figsize=(12, 4))
ax1 = fig.add_subplot(1, 2, 1)
ax2 = fig.add_subplot(1, 2, 2)


# Euclidean distance catplot
z_plot = sns.lineplot(y='Euclidean distance',
                       x='Iteration',
                       marker="o",
                       data=df_data_2,
                       ax=ax2)

z_plot.xaxis.set_major_locator(ticker.MultipleLocator(5))
z_plot.xaxis.set_major_formatter(ticker.ScalarFormatter())
z_plot.tick_params(axis='both', which='major', labelsize=16)
z_plot.tick_params(axis='both', which='minor', labelsize=14)
z_plot.xaxis.label.set_size(20)
z_plot.yaxis.label.set_size(20)
# sdtw catplot
sdtw_plot = sns.lineplot(y='s-DTW',
                          x='Iteration',
                          marker="o",# ms=4,
                          data=df_data,
                          ax=ax1)
sdtw_plot.xaxis.set_major_locator(ticker.MultipleLocator(5))
sdtw_plot.xaxis.set_major_formatter(ticker.ScalarFormatter())
sdtw_plot.tick_params(axis='both', which='major', labelsize=16)
sdtw_plot.tick_params(axis='both', which='minor', labelsize=14)
sdtw_plot.xaxis.label.set_size(20)
sdtw_plot.yaxis.label.set_size(20)
plt.show()
fig.tight_layout()
plt.savefig("../plot.pdf")
