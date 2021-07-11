import numpy as np
import seaborn as sns
import csv
import pandas as pd
import matplotlib.pyplot as plt
from numpy import median


enjoyment_manual = [12,20,16,18,17,13,14,17,14,19,19,19,16,16,15,19,19,20]
enjoyment_auto = [15,15,15,15,13,12,11,15,18,14,11,12,14,16,13,13,16,14]
enjoyment_random = [12,5,14,13,11,18,13,16,8,3,5,8,20,8,7,5,6,19]


df_enjoyment_manual = pd.DataFrame({'Score':np.array(enjoyment_manual), 'factor':'Enjoyment', 'mode':'Manual'})
df_enjoyment_auto = pd.DataFrame({'Score':np.array(enjoyment_auto), 'factor':'Enjoyment', 'mode':'Auto'})
df_enjoyment_random = pd.DataFrame({'Score':np.array(enjoyment_random), 'factor':'Enjoyment', 'mode':'Random'})


exploration_manual = [6,20,16,19,17,17,12,20,18,18,19,19,18,16,15,20,17,16]
exploration_auto = [15,11,17,12,14,11,12,17,18,15,15,13,14,15,6,15,16,15]
exploration_random = [14,7,6,9,16,11,15,14,3,9,7,9,19,7,7,7,5,5]


df_exploration_manual = pd.DataFrame({'Score':np.array(exploration_manual), 'factor':'Exploration', 'mode':'Manual'})
df_exploration_auto = pd.DataFrame({'Score':np.array(exploration_auto), 'factor':'Exploration', 'mode':'Auto'})
df_exploration_random = pd.DataFrame({'Score':np.array(exploration_random), 'factor':'Exploration', 'mode':'Random'})


expressiveness_manual = [5,20,8,17,17,5,13,17,16,19,19,9,15,16,15,18,18,11]
expressiveness_auto = [16,15,14,14,14,5,12,15,18,13,14,7,14,17,6,12,14,18]
expressiveness_random = [9,4,10,11,12,16,12,14,2,5,6,9,20,9,4,8,13,10]


df_expressiveness_manual = pd.DataFrame({'Score':np.array(expressiveness_manual), 'factor':'Expressiveness', 'mode':'Manual'})
df_expressiveness_auto = pd.DataFrame({'Score':np.array(expressiveness_auto), 'factor':'Expressiveness', 'mode':'Auto'})
df_expressiveness_random = pd.DataFrame({'Score':np.array(expressiveness_random), 'factor':'Expressiveness', 'mode':'Random'})


immersion_manual = [7,20,5,14,18,8,12,18,6,19,18,19,15,16,6,18,19,19]
immersion_auto = [14,7,17,12,13,8,16,18,16,12,11,15,13,16,6,6,8,16]
immersion_random = [16,7,12,17,7,13,14,7,6,6,8,8,19,9,5,9,17,17]



df_immersion_manual = pd.DataFrame({'Score':np.array(immersion_manual), 'factor':'Immersion', 'mode':'Manual'})
df_immersion_auto = pd.DataFrame({'Score':np.array(immersion_auto), 'factor':'Immersion', 'mode':'Auto'})
df_immersion_random = pd.DataFrame({'Score':np.array(immersion_random), 'factor':'Immersion', 'mode':'Random'})


results_worth_effort_manual = [7,20,16,18,17,17,16,20,13,18,14,14,14,15,15,19,17,11]
results_worth_effort_auto = [17,15,17,10,18,9,16,16,19,15,14,8,16,20,8,12,13,15]
results_worth_effort_random = [15,13,16,12,17,18,13,16,20,12,17,17,13,20,6,16,15,17]


df_results_worth_effort_manual = pd.DataFrame({'Score':np.array(results_worth_effort_manual), 'factor':'Results Worth Effort', 'mode':'Manual'})
df_results_worth_effort_auto = pd.DataFrame({'Score':np.array(results_worth_effort_auto), 'factor':'Results Worth Effort', 'mode':'Auto'})
df_results_worth_effort_random = pd.DataFrame({'Score':np.array(results_worth_effort_random), 'factor':'Results Worth Effort', 'mode':'Random'})


collaboration_manual = [4,20,16,13,17,12,14,13,15,18,13,12,12,16,13,15,16,18]
collaboration_auto = [15,13,16,12,17,18,13,16,20,12,17,17,13,20,6,16,15,17]
collaboration_random = [16,9,14,17,15,9,17,12,4,15,10,8,19,9,2,7,13,16]


df_collaboration_manual = pd.DataFrame({'Score':np.array(collaboration_manual), 'factor':'Collaboration', 'mode':'Manual'})
df_collaboration_auto = pd.DataFrame({'Score':np.array(collaboration_auto), 'factor':'Collaboration', 'mode':'Auto'})
df_collaboration_random = pd.DataFrame({'Score':np.array(collaboration_random), 'factor':'Collaboration', 'mode':'Random'})


csi_manual = [37,100,61,86,86,60,67,92,67,93,89,80,78,79,66,94,90,77]
csi_auto = [77,63,80,63,72,45,67,81,89,69,65,55,71,84,39,58,67,78]
csi_random = [66,36,58,62,63,76,67,67,39,35,43,51,91,53,29,45,56,68]


df_csi_manual = pd.DataFrame({'CSI Score':np.array(csi_manual), 'factor':'CSI', 'mode':'Manual'})
df_csi_auto = pd.DataFrame({'CSI Score':np.array(csi_auto), 'factor':'CSI', 'mode':'Auto'})
df_csi_random = pd.DataFrame({'CSI Score':np.array(csi_random), 'factor':'CSI', 'mode':'Random'})



ranking_manual = [2,2,1,2,3,2,1,1,1,2,1,1,1,1,1,1,1,1]
ranking_auto = [1,1,2,1,1,1,2,2,2,1,2,2,2,2,2,2,2,2]
ranking_random = [3,3,3,3,2,3,3,3,3,3,3,3,3,3,3,3,3,3]


df_ranking_manual = pd.DataFrame({'Average Ranking':np.array(ranking_manual), 'factor':'ranking', 'mode':'Manual'})
df_ranking_auto = pd.DataFrame({'Average Ranking':np.array(ranking_auto), 'factor':'ranking', 'mode':'Auto'})
df_ranking_random = pd.DataFrame({'Average Ranking':np.array(ranking_random), 'factor':'ranking', 'mode':'Random'})

# Load the example Titanic dataset
titanic = sns.load_dataset("titanic")
df_data = pd.concat([df_enjoyment_manual, df_enjoyment_auto, df_enjoyment_random, 
	df_exploration_manual, df_exploration_auto, df_exploration_random, 
	df_expressiveness_manual, df_expressiveness_auto, df_expressiveness_random,
	df_immersion_manual, df_immersion_auto, df_immersion_random,
	df_results_worth_effort_manual, df_results_worth_effort_auto, df_results_worth_effort_random,
	df_collaboration_manual, df_collaboration_auto, df_collaboration_random,
	df_csi_manual, df_csi_auto, df_csi_random])

df_data_ranking = pd.concat([df_ranking_manual, df_ranking_auto, df_ranking_random])


#ax = plt.subplot(111)
#ax2 = ax.twinx()

# Draw a nested barplot to show survival for class and sex
#g = sns.catplot(x="factor", y="Score", hue="mode", data=df_data,
#                height=6, kind="bar", legend=False, ax=ax)
#g.despine(left=True)
#g.set_ylabels("Score")

#g2 = sns.catplot(x="factor", y="CSI Score", hue="mode",data=df_data,
#                height=6, kind="bar",  legend=False, legend_out=True,ax=ax2)

sns.set()
sns.set(font_scale=1.2)
g = sns.catplot(x="mode", y="Average Ranking", hue="mode", data=df_data_ranking,
               kind="bar", legend_out=False)
"""
medians = df_data_ranking.groupby(['mode'])['Average Ranking'].median().round(1)
ax1 = g.facet_axis(0,0)
i = 0
for p in ax1.patches:
    if str(p.get_height()) != 'nan':
        if i == 0:
            ax1.text(p.get_x(), p.get_height() * .8, "1.39", color='black', size='small')
        if i == 1:
            ax1.text(p.get_x(), p.get_height() * .8, "1.67", color='black', size='large')
        if i == 2:
            ax1.text(p.get_x(), p.get_height() * .8, "2.94", color='black', size='large')
        i+=1
"""
plt.show()