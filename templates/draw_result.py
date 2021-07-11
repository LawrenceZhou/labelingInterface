import numpy as np
import seaborn as sns
import csv
import pandas as pd
import matplotlib.pyplot as plt
from numpy import median
import scipy.interpolate as it

avg_score = []
avg_dist = []
for g in [1, 10]:
	for l in [1, 10, 100, 1000]:
		score=[[] for _ in range(21)]
		dist=[[] for _ in range(21)]
		for index in range(1, 22):
			with open("experiment_result/small_real_EI_global_" + str(g) + "_local_" + str(l) + "_trial_" + str(index) + ".csv", 'rU') as data:
				reader = csv.reader(data)
				i = 0
				for row in reader:
					if i > 1:
						score[index-1].append(float(row[2]))
						dist[index-1].append(float(row[5]))
		
					i += 1
		score2=[]
		dist2=[]
		for i in range(50):
			score_t = [item[i] for item in score]
			dist_t = [item[i] for item in dist]
			score2.append(np.median(score_t))
			dist2.append(np.median(dist_t))
		avg_score.append(score2)
		avg_dist.append(dist2)



iteration = [i for i in range(50)]

fig = plt.figure()
ax = fig.add_subplot(1, 1, 1)
for i in range(len(avg_score)):
	x = it.InterpolatedUnivariateSpline(iteration, avg_dist[i])
	if i == 0:
		#pass
		#ax.plot(iteration, x(avg_dist[i]),  label="global:10^3, local^1")
		ax.plot(iteration, avg_dist[i],  label="global:10^1, local: 10^1")
	if i == 1:
		#pass
		#ax.plot(iteration, x(avg_dist[i]),  label="global:10^3, local^2")
		ax.plot(iteration, avg_dist[i],  label="global:10^1, local: 10^2")
	if i == 2:
		#pass
		#ax.plot(iteration, x(avg_dist[i]),  label="global:10^3, local^3")
		ax.plot(iteration, avg_dist[i],  label="global:10^1, local: 10^3")
	if i == 3:
		#pass
		#ax.plot(iteration, x(avg_dist[i]),  label="global:10^3, local^4")
		ax.plot(iteration, avg_dist[i],  label="global:10^1, local: 10^4")
	if i == 4:
		#pass
		#ax.plot(iteration, x(avg_dist[i]),  label="global:10^3, local^5")
		ax.plot(iteration, avg_dist[i],  label="global:10^2, local: 10^1")
	if i == 5:
		#ax.plot(iteration, x(avg_dist[i]),  label="global:10^4, local^1")
		ax.plot(iteration, avg_dist[i],  label="global:10^2, local: 10^2")
	if i == 6:
		#pass
		#ax.plot(iteration, x(avg_dist[i]),  label="global:10^4, local^2")
		ax.plot(iteration, avg_dist[i],  label="global:10^2, local: 10^3")
	if i == 7:
		#pass
		#ax.plot(iteration, x(avg_dist[i]),  label="global:10^4, local^3")
		ax.plot(iteration, avg_dist[i],  label="global:10^2, local: 10^4")





ax.set_title("median distance in 20 times, dimension = 8, acq= EI")
leg = ax.legend();
plt.show()
"""
print("min s-DTW of random mode in iteration 1: ", min(rnd_0))
print("min s-DTW of random mode in iteration 2: ", min(rnd_1))
print("min s-DTW of random mode in iteration 3: ", min(rnd_2))
print("min s-DTW of random mode in iteration 4: ", min(rnd_3))
print("min s-DTW of random mode in iteration 5: ", min(rnd_4))
print("min s-DTW of random mode in iteration 6: ", min(rnd_5))

print("min s-DTW of auto mode in iteration 1: ", min(auto_0))
print("min s-DTW of auto mode in iteration 2: ", min(auto_1))
print("min s-DTW of auto mode in iteration 3: ", min(auto_2))
print("min s-DTW of auto mode in iteration 4: ", min(auto_3))
print("min s-DTW of auto mode in iteration 5: ", min(auto_4))
print("min s-DTW of auto mode in iteration 6: ", min(auto_5))

print("min s-DTW of manual-refinement mode in iteration 1: ", min(manual_ref_0))
print("min s-DTW of manual-refinement mode in iteration 2: ", min(manual_ref_1))
print("min s-DTW of manual-refinement mode in iteration 3: ", min(manual_ref_2))
print("min s-DTW of manual-refinement mode in iteration 4: ", min(manual_ref_3))
print("min s-DTW of manual-refinement mode in iteration 5: ", min(manual_ref_4))
print("min s-DTW of manual-refinement mode in iteration 6: ", min(manual_ref_5))

print("min s-DTW of manual-ideation mode in iteration 1: ", min(manual_ide_0))
print("min s-DTW of manual-ideation mode in iteration 2: ", min(manual_ide_1))
print("min s-DTW of manual-ideation mode in iteration 3: ", min(manual_ide_2))
print("min s-DTW of manual-ideation mode in iteration 4: ", min(manual_ide_3))
print("min s-DTW of manual-ideation mode in iteration 5: ", min(manual_ide_4))
print("min s-DTW of manual-ideation mode in iteration 6: ", min(manual_ide_5))

print("min s-DTW of manual-random mode in iteration 1: ", min(manual_rnd_0))
print("min s-DTW of manual-random mode in iteration 2: ", min(manual_rnd_1))
print("min s-DTW of manual-random mode in iteration 3: ", min(manual_rnd_2))
print("min s-DTW of manual-random mode in iteration 4: ", min(manual_rnd_3))
print("min s-DTW of manual-random mode in iteration 5: ", min(manual_rnd_4))
print("min s-DTW of manual-random mode in iteration 6: ", min(manual_rnd_5))




df_rnd_0 = pd.DataFrame({'s-DTW':np.array(rnd_0), 'iteration':'1', 'mode':'random'})
df_rnd_1 = pd.DataFrame({'s-DTW':np.array(rnd_1), 'iteration':'2', 'mode':'random'})
df_rnd_2 = pd.DataFrame({'s-DTW':np.array(rnd_2), 'iteration':'3', 'mode':'random'})
df_rnd_3 = pd.DataFrame({'s-DTW':np.array(rnd_3), 'iteration':'4', 'mode':'random'})
df_rnd_4 = pd.DataFrame({'s-DTW':np.array(rnd_4), 'iteration':'5', 'mode':'random'})
df_rnd_5 = pd.DataFrame({'s-DTW':np.array(rnd_5), 'iteration':'6', 'mode':'random'})

df_auto_0 = pd.DataFrame({'s-DTW':np.array(auto_0), 'iteration':'1', 'mode':'automatic'})
df_auto_1 = pd.DataFrame({'s-DTW':np.array(auto_1), 'iteration':'2', 'mode':'automatic'})
df_auto_2 = pd.DataFrame({'s-DTW':np.array(auto_2), 'iteration':'3', 'mode':'automatic'})
df_auto_3 = pd.DataFrame({'s-DTW':np.array(auto_3), 'iteration':'4', 'mode':'automatic'})
df_auto_4 = pd.DataFrame({'s-DTW':np.array(auto_4), 'iteration':'5', 'mode':'automatic'})
df_auto_5 = pd.DataFrame({'s-DTW':np.array(auto_5), 'iteration':'6', 'mode':'automatic'})

df_manual_ref_0 = pd.DataFrame({'s-DTW':np.array(manual_ref_0), 'iteration':'1', 'mode':'refinement'})
df_manual_ref_1 = pd.DataFrame({'s-DTW':np.array(manual_ref_1), 'iteration':'2', 'mode':'refinement'})
df_manual_ref_2 = pd.DataFrame({'s-DTW':np.array(manual_ref_2), 'iteration':'3', 'mode':'refinement'})
df_manual_ref_3 = pd.DataFrame({'s-DTW':np.array(manual_ref_3), 'iteration':'4', 'mode':'refinement'})
df_manual_ref_4 = pd.DataFrame({'s-DTW':np.array(manual_ref_4), 'iteration':'5', 'mode':'refinement'})
df_manual_ref_5 = pd.DataFrame({'s-DTW':np.array(manual_ref_5), 'iteration':'6', 'mode':'refinement'})

df_manual_ide_0 = pd.DataFrame({'s-DTW':np.array(manual_ide_0), 'iteration':'1', 'mode':'ideation'})
df_manual_ide_1 = pd.DataFrame({'s-DTW':np.array(manual_ide_1), 'iteration':'2', 'mode':'ideation'})
df_manual_ide_2 = pd.DataFrame({'s-DTW':np.array(manual_ide_2), 'iteration':'3', 'mode':'ideation'})
df_manual_ide_3 = pd.DataFrame({'s-DTW':np.array(manual_ide_3), 'iteration':'4', 'mode':'ideation'})
df_manual_ide_4 = pd.DataFrame({'s-DTW':np.array(manual_ide_4), 'iteration':'5', 'mode':'ideation'})
df_manual_ide_5 = pd.DataFrame({'s-DTW':np.array(manual_ide_5), 'iteration':'6', 'mode':'ideation'})

df_manual_rnd_0 = pd.DataFrame({'s-DTW':np.array(manual_rnd_0), 'iteration':'1', 'mode':'intermediate'})
df_manual_rnd_1 = pd.DataFrame({'s-DTW':np.array(manual_rnd_1), 'iteration':'2', 'mode':'intermediate'})
df_manual_rnd_2 = pd.DataFrame({'s-DTW':np.array(manual_rnd_2), 'iteration':'3', 'mode':'intermediate'})
df_manual_rnd_3 = pd.DataFrame({'s-DTW':np.array(manual_rnd_3), 'iteration':'4', 'mode':'intermediate'})
df_manual_rnd_4 = pd.DataFrame({'s-DTW':np.array(manual_rnd_4), 'iteration':'5', 'mode':'intermediate'})
df_manual_rnd_5 = pd.DataFrame({'s-DTW':np.array(manual_rnd_5), 'iteration':'6', 'mode':'intermediate'})

df_data = pd.concat([df_rnd_0, df_rnd_1, df_rnd_2, df_rnd_3, df_rnd_4, df_rnd_5, df_auto_0, df_auto_1, df_auto_2, df_auto_3, df_auto_4, df_auto_5, df_manual_ref_0, df_manual_ref_1, df_manual_ref_2, df_manual_ref_3, df_manual_ref_4, df_manual_ref_5, df_manual_ide_0, df_manual_ide_1, df_manual_ide_2, df_manual_ide_3, df_manual_ide_4, df_manual_ide_5, df_manual_rnd_0, df_manual_rnd_1, df_manual_rnd_2, df_manual_rnd_3, df_manual_rnd_4, df_manual_rnd_5])
#sns.set_style("whitegrid")
sns.set(font_scale=1.2)
medians = df_data.groupby(['iteration','mode'])['s-DTW'].median().round(1)
print(df_data)
vertical_offset = df_data['s-DTW'].median() * 0.05
box_plot = sns.boxplot(y = 's-DTW', x = 'iteration', hue = 'mode', showfliers = False, data = df_data)



df_rnd_0_cat = pd.DataFrame({'s-DTW':np.array(rnd_0_cat), 'iteration':'1', 'mode':'random'})
df_rnd_1_cat = pd.DataFrame({'s-DTW':np.array(rnd_1_cat), 'iteration':'2', 'mode':'random'})
df_rnd_2_cat = pd.DataFrame({'s-DTW':np.array(rnd_2_cat), 'iteration':'3', 'mode':'random'})
df_rnd_3_cat = pd.DataFrame({'s-DTW':np.array(rnd_3_cat), 'iteration':'4', 'mode':'random'})
df_rnd_4_cat = pd.DataFrame({'s-DTW':np.array(rnd_4_cat), 'iteration':'5', 'mode':'random'})
df_rnd_5_cat = pd.DataFrame({'s-DTW':np.array(rnd_5_cat), 'iteration':'6', 'mode':'random'})

df_auto_0_cat = pd.DataFrame({'s-DTW':np.array(auto_0_cat), 'iteration':'1', 'mode':'automatic'})
df_auto_1_cat = pd.DataFrame({'s-DTW':np.array(auto_1_cat), 'iteration':'2', 'mode':'automatic'})
df_auto_2_cat = pd.DataFrame({'s-DTW':np.array(auto_2_cat), 'iteration':'3', 'mode':'automatic'})
df_auto_3_cat = pd.DataFrame({'s-DTW':np.array(auto_3_cat), 'iteration':'4', 'mode':'automatic'})
df_auto_4_cat = pd.DataFrame({'s-DTW':np.array(auto_4_cat), 'iteration':'5', 'mode':'automatic'})
df_auto_5_cat = pd.DataFrame({'s-DTW':np.array(auto_5_cat), 'iteration':'6', 'mode':'automatic'})

df_manual_ref_0_cat = pd.DataFrame({'s-DTW':np.array(manual_ref_0_cat), 'iteration':'1', 'mode':'refinement'})
df_manual_ref_1_cat = pd.DataFrame({'s-DTW':np.array(manual_ref_1_cat), 'iteration':'2', 'mode':'refinement'})
df_manual_ref_2_cat = pd.DataFrame({'s-DTW':np.array(manual_ref_2_cat), 'iteration':'3', 'mode':'refinement'})
df_manual_ref_3_cat = pd.DataFrame({'s-DTW':np.array(manual_ref_3_cat), 'iteration':'4', 'mode':'refinement'})
df_manual_ref_4_cat = pd.DataFrame({'s-DTW':np.array(manual_ref_4_cat), 'iteration':'5', 'mode':'refinement'})
df_manual_ref_5_cat = pd.DataFrame({'s-DTW':np.array(manual_ref_5_cat), 'iteration':'6', 'mode':'refinement'})

df_manual_ide_0_cat = pd.DataFrame({'s-DTW':np.array(manual_ide_0_cat), 'iteration':'1', 'mode':'ideation'})
df_manual_ide_1_cat = pd.DataFrame({'s-DTW':np.array(manual_ide_1_cat), 'iteration':'2', 'mode':'ideation'})
df_manual_ide_2_cat = pd.DataFrame({'s-DTW':np.array(manual_ide_2_cat), 'iteration':'3', 'mode':'ideation'})
df_manual_ide_3_cat = pd.DataFrame({'s-DTW':np.array(manual_ide_3_cat), 'iteration':'4', 'mode':'ideation'})
df_manual_ide_4_cat = pd.DataFrame({'s-DTW':np.array(manual_ide_4_cat), 'iteration':'5', 'mode':'ideation'})
df_manual_ide_5_cat = pd.DataFrame({'s-DTW':np.array(manual_ide_5_cat), 'iteration':'6', 'mode':'ideation'})

df_manual_rnd_0_cat = pd.DataFrame({'s-DTW':np.array(manual_rnd_0_cat), 'iteration':'1', 'mode':'intermediate'})
df_manual_rnd_1_cat = pd.DataFrame({'s-DTW':np.array(manual_rnd_1_cat), 'iteration':'2', 'mode':'intermediate'})
df_manual_rnd_2_cat = pd.DataFrame({'s-DTW':np.array(manual_rnd_2_cat), 'iteration':'3', 'mode':'intermediate'})
df_manual_rnd_3_cat = pd.DataFrame({'s-DTW':np.array(manual_rnd_3_cat), 'iteration':'4', 'mode':'intermediate'})
df_manual_rnd_4_cat = pd.DataFrame({'s-DTW':np.array(manual_rnd_4_cat), 'iteration':'5', 'mode':'intermediate'})
df_manual_rnd_5_cat = pd.DataFrame({'s-DTW':np.array(manual_rnd_5_cat), 'iteration':'6', 'mode':'intermediate'})

#df_data_cat = pd.concat([df_rnd_0_cat, df_rnd_1_cat, df_rnd_2_cat, df_rnd_3_cat, df_rnd_4_cat, df_rnd_5_cat, df_auto_0_cat, df_auto_1_cat, df_auto_2_cat, df_auto_3_cat, df_auto_4_cat, df_auto_5_cat, df_manual_ref_0_cat, df_manual_ref_1_cat, df_manual_ref_2_cat, df_manual_ref_3_cat, df_manual_ref_4_cat, df_manual_ref_5_cat, df_manual_ide_0_cat, df_manual_ide_1_cat, df_manual_ide_2_cat, df_manual_ide_3_cat, df_manual_ide_4_cat, df_manual_ide_5_cat, df_manual_rnd_0_cat, df_manual_rnd_1_cat, df_manual_rnd_2_cat, df_manual_rnd_3_cat, df_manual_rnd_4_cat, df_manual_rnd_5_cat])
df_data_cat = pd.concat([df_rnd_0, df_rnd_1, df_rnd_2, df_rnd_3, df_rnd_4, df_rnd_5, df_auto_0, df_auto_1, df_auto_2, df_auto_3, df_auto_4, df_auto_5, df_manual_ref_0, df_manual_ref_1, df_manual_ref_2, df_manual_ref_3, df_manual_ref_4, df_manual_ref_5, df_manual_ide_0, df_manual_ide_1, df_manual_ide_2, df_manual_ide_3, df_manual_ide_4, df_manual_ide_5, df_manual_rnd_0, df_manual_rnd_1, df_manual_rnd_2, df_manual_rnd_3, df_manual_rnd_4, df_manual_rnd_5])

cat_plot = sns.catplot(y = 's-DTW', x = 'iteration', hue = 'mode',
            #palette={"random": "g", "auto": "m", "refinement":"r", "ideation":"b", "intermediate":"y"},
            markers=["^", "o", "+", "^", "*"], linestyles=["-","-","-","-","-"],
            kind="point", data=df_data_cat)

plt.show()
"""

"""
for xtick in box_plot.get_xticks():
	print(xtick)
	if xtick == 3:
		box_plot.text(xtick - 0.2, medians[2 * xtick] + vertical_offset * 6, medians[2 * xtick], 
				horizontalalignment = 'center', size = 'small', color = 'black', weight = 'semibold')
	else:
		box_plot.text(xtick - 0.2, medians[2 * xtick] + vertical_offset, medians[2 * xtick], 
				horizontalalignment = 'center', size = 'small', color = 'black', weight = 'semibold')
	box_plot.text(xtick + 0.2, medians[2 * xtick + 1] + vertical_offset, medians[2 * xtick + 1], 
			horizontalalignment = 'center', size = 'small', color = 'w', weight = 'semibold')
"""
