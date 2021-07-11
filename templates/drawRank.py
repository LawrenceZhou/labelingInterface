import matplotlib.pyplot as plt
import seaborn as sns

# Data
r = [0,1,2]

rank_3 = [17, 0, 1]

rank_2 = [1, 12, 5]

rank_1 = [0, 6, 12]

#Draw plot
sns.set(font_scale=1.2)
ax = plt.subplot(111)

names = ( 'Random', 'Auto', 'Manual')

plt.barh(r, rank_1, edgecolor='white', label="rank #1")

plt.barh(r, rank_2, left=rank_1, edgecolor='white',  label="rank #2")

plt.barh(r, rank_3, left=[i+j for i,j in zip(rank_1, rank_2)], edgecolor='white', label="rank #3")
 
# Custom x axis
plt.yticks(r, names)
plt.ylabel("Mode")
 
# Add a legend
handles, labels = ax.get_legend_handles_labels()
# sort both labels and handles by labels
labels, handles = zip(*sorted(zip(labels, handles), key=lambda t: t[0]))
ax.legend(handles, labels)
# Show graphic
plt.show()
