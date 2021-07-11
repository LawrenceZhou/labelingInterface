import numpy as np
import seaborn as sns
import csv
import pandas as pd
import matplotlib.pyplot as plt
from numpy import median

rnd_0 = []
#with open('bo_0_temp.csv', 'rU') as data:
with open('0325_rnd_0.csv', 'rU') as data:
	reader = csv.reader(data)
	i = 0
	for row in reader:
		if i < 1000:
			for r in row:
				rnd_0.append(float(r))
		else:
			break
		i += 1

rnd_1 = []
#with open('bo_1_temp.csv', 'rU') as data:
with open('0325_rnd_1.csv', 'rU') as data:
	reader = csv.reader(data)
	i = 0
	for row in reader:
		if i < 1000:
			for r in row:
				rnd_1.append(float(r))
		else:
			break
		i += 1

rnd_2 = []
#with open('bo_2_temp.csv', 'rU') as data:
with open('0325_rnd_2.csv', 'rU') as data:
	reader = csv.reader(data)
	i = 0
	for row in reader:
		if i < 1000:
			for r in row:
				rnd_2.append(float(r))
		else:
			break
		i += 1

rnd_3 = []
#with open('bo_2_temp.csv', 'rU') as data:
with open('0325_rnd_3.csv', 'rU') as data:
	reader = csv.reader(data)
	i = 0
	for row in reader:
		if i < 1000:
			for r in row:
				rnd_3.append(float(r))
		else:
			break
		i += 1

rnd_4 = []
#with open('bo_2_temp.csv', 'rU') as data:
with open('0325_rnd_4.csv', 'rU') as data:
	reader = csv.reader(data)
	i = 0
	for row in reader:
		if i < 1000:
			for r in row:
				rnd_4.append(float(r))
		else:
			break
		i += 1

rnd_5 = []
#with open('bo_2_temp.csv', 'rU') as data:
with open('0325_rnd_5.csv', 'rU') as data:
	reader = csv.reader(data)
	i = 0
	for row in reader:
		if i < 1000:
			for r in row:
				rnd_5.append(float(r))
		else:
			break
		i += 1

auto_0 = []
#with open('bo_0_temp.csv', 'rU') as data:
with open('0325_auto_0.csv', 'rU') as data:
	reader = csv.reader(data)
	i = 0
	for row in reader:
		if i < 1000:
			for r in row:
				auto_0.append(float(r))
		else:
			break
		i += 1

auto_1 = []
#with open('bo_1_temp.csv', 'rU') as data:
with open('0325_auto_1.csv', 'rU') as data:
	reader = csv.reader(data)
	i = 0
	for row in reader:
		if i < 1000:
			for r in row:
				auto_1.append(float(r))
		else:
			break
		i += 1

auto_2 = []
#with open('bo_2_temp.csv', 'rU') as data:
with open('0325_auto_2.csv', 'rU') as data:
	reader = csv.reader(data)
	i = 0
	for row in reader:
		if i < 1000:
			for r in row:
				auto_2.append(float(r))
		else:
			break
		i += 1

auto_3 = []
#with open('bo_2_temp.csv', 'rU') as data:
with open('0325_auto_3.csv', 'rU') as data:
	reader = csv.reader(data)
	i = 0
	for row in reader:
		if i < 1000:
			for r in row:
				auto_3.append(float(r))
		else:
			break
		i += 1

auto_4 = []
#with open('bo_2_temp.csv', 'rU') as data:
with open('0325_auto_4.csv', 'rU') as data:
	reader = csv.reader(data)
	i = 0
	for row in reader:
		if i < 1000:
			for r in row:
				auto_4.append(float(r))
		else:
			break
		i += 1

auto_5 = []
#with open('bo_2_temp.csv', 'rU') as data:
with open('0325_auto_5.csv', 'rU') as data:
	reader = csv.reader(data)
	i = 0
	for row in reader:
		if i < 1000:
			for r in row:
				auto_5.append(float(r))
		else:
			break
		i += 1

manual_ref_0 = []
#with open('bo_0_temp.csv', 'rU') as data:
with open('0325_manual_ref_0.csv', 'rU') as data:
	reader = csv.reader(data)
	i = 0
	for row in reader:
		if i < 1000:
			for r in row:
				manual_ref_0.append(float(r))
		else:
			break
		i += 1

manual_ref_1 = []
#with open('bo_1_temp.csv', 'rU') as data:
with open('0325_manual_ref_1.csv', 'rU') as data:
	reader = csv.reader(data)
	i = 0
	for row in reader:
		if i < 1000:
			for r in row:
				manual_ref_1.append(float(r))
		else:
			break
		i += 1

manual_ref_2 = []
#with open('bo_2_temp.csv', 'rU') as data:
with open('0325_manual_ref_2.csv', 'rU') as data:
	reader = csv.reader(data)
	i = 0
	for row in reader:
		if i < 1000:
			for r in row:
				manual_ref_2.append(float(r))
		else:
			break
		i += 1

manual_ref_3 = []
#with open('bo_2_temp.csv', 'rU') as data:
with open('0325_manual_ref_3.csv', 'rU') as data:
	reader = csv.reader(data)
	i = 0
	for row in reader:
		if i < 1000:
			for r in row:
				manual_ref_3.append(float(r))
		else:
			break
		i += 1

manual_ref_4 = []
#with open('bo_2_temp.csv', 'rU') as data:
with open('0325_manual_ref_4.csv', 'rU') as data:
	reader = csv.reader(data)
	i = 0
	for row in reader:
		if i < 1000:
			for r in row:
				manual_ref_4.append(float(r))
		else:
			break
		i += 1

manual_ref_5 = []
#with open('bo_2_temp.csv', 'rU') as data:
with open('0325_manual_ref_5.csv', 'rU') as data:
	reader = csv.reader(data)
	i = 0
	for row in reader:
		if i < 1000:
			for r in row:
				manual_ref_5.append(float(r))
		else:
			break
		i += 1

manual_ide_0 = []
#with open('bo_0_temp.csv', 'rU') as data:
with open('0325_manual_ide_0.csv', 'rU') as data:
	reader = csv.reader(data)
	i = 0
	for row in reader:
		if i < 1000:
			for r in row:
				manual_ide_0.append(float(r))
		else:
			break
		i += 1

manual_ide_1 = []
#with open('bo_1_temp.csv', 'rU') as data:
with open('0325_manual_ide_1.csv', 'rU') as data:
	reader = csv.reader(data)
	i = 0
	for row in reader:
		if i < 1000:
			for r in row:
				manual_ide_1.append(float(r))
		else:
			break
		i += 1

manual_ide_2 = []
#with open('bo_2_temp.csv', 'rU') as data:
with open('0325_manual_ide_2.csv', 'rU') as data:
	reader = csv.reader(data)
	i = 0
	for row in reader:
		if i < 1000:
			for r in row:
				manual_ide_2.append(float(r))
		else:
			break
		i += 1

manual_ide_3 = []
#with open('bo_2_temp.csv', 'rU') as data:
with open('0325_manual_ide_3.csv', 'rU') as data:
	reader = csv.reader(data)
	i = 0
	for row in reader:
		if i < 1000:
			for r in row:
				manual_ide_3.append(float(r))
		else:
			break
		i += 1

manual_ide_4 = []
#with open('bo_2_temp.csv', 'rU') as data:
with open('0325_manual_ide_4.csv', 'rU') as data:
	reader = csv.reader(data)
	i = 0
	for row in reader:
		if i < 1000:
			for r in row:
				manual_ide_4.append(float(r))
		else:
			break
		i += 1

manual_ide_5 = []
#with open('bo_2_temp.csv', 'rU') as data:
with open('0325_manual_ide_5.csv', 'rU') as data:
	reader = csv.reader(data)
	i = 0
	for row in reader:
		if i < 1000:
			for r in row:
				manual_ide_5.append(float(r))
		else:
			break
		i += 1

manual_rnd_0 = []
#with open('bo_0_temp.csv', 'rU') as data:
with open('0325_manual_rnd_0.csv', 'rU') as data:
	reader = csv.reader(data)
	i = 0
	for row in reader:
		if i < 1000:
			for r in row:
				manual_rnd_0.append(float(r))
		else:
			break
		i += 1

manual_rnd_1 = []
#with open('bo_1_temp.csv', 'rU') as data:
with open('0325_manual_rnd_1.csv', 'rU') as data:
	reader = csv.reader(data)
	i = 0
	for row in reader:
		if i < 1000:
			for r in row:
				manual_rnd_1.append(float(r))
		else:
			break
		i += 1

manual_rnd_2 = []
#with open('bo_2_temp.csv', 'rU') as data:
with open('0325_manual_rnd_2.csv', 'rU') as data:
	reader = csv.reader(data)
	i = 0
	for row in reader:
		if i < 1000:
			for r in row:
				manual_rnd_2.append(float(r))
		else:
			break
		i += 1

manual_rnd_3 = []
#with open('bo_2_temp.csv', 'rU') as data:
with open('0325_manual_rnd_3.csv', 'rU') as data:
	reader = csv.reader(data)
	i = 0
	for row in reader:
		if i < 1000:
			for r in row:
				manual_rnd_3.append(float(r))
		else:
			break
		i += 1

manual_rnd_4 = []
#with open('bo_2_temp.csv', 'rU') as data:
with open('0325_manual_rnd_4.csv', 'rU') as data:
	reader = csv.reader(data)
	i = 0
	for row in reader:
		if i < 1000:
			for r in row:
				manual_rnd_4.append(float(r))
		else:
			break
		i += 1

manual_rnd_5 = []
#with open('bo_2_temp.csv', 'rU') as data:
with open('0325_manual_rnd_5.csv', 'rU') as data:
	reader = csv.reader(data)
	i = 0
	for row in reader:
		if i < 1000:
			for r in row:
				manual_rnd_5.append(float(r))
		else:
			break
		i += 1

#IQR
rnd_0=np.array(rnd_0)
q75, q25 = np.percentile(rnd_0, [87.5 ,12.5])
print(min(rnd_0), q25, q75)
condition_rnd_0 = (rnd_0 >= q25) & (rnd_0 <= q75)
rnd_0_cat = np.extract(condition_rnd_0, rnd_0)


q75, q25 = np.percentile(rnd_1, [87.5 ,12.5])
condition_rnd_1 = (rnd_1 >= q25) & (rnd_1 <= q75)
rnd_1_cat = np.extract(condition_rnd_1, rnd_1)


q75, q25 = np.percentile(rnd_2, [87.5 ,12.5])
condition_rnd_2 = (rnd_2 >= q25) & (rnd_2 <= q75)
rnd_2_cat=np.extract(condition_rnd_2, rnd_2)


q75, q25 = np.percentile(rnd_3, [87.5 ,12.5])
condition_rnd_3 = (rnd_3 >= q25) & (rnd_3 <= q75)
rnd_3_cat=np.extract(condition_rnd_3, rnd_3)


q75, q25 = np.percentile(rnd_4, [87.5 ,12.5])
condition_rnd_4 = (rnd_4 >= q25) & (rnd_4 <= q75)
rnd_4_cat=np.extract(condition_rnd_4, rnd_4)


q75, q25 = np.percentile(rnd_5, [87.5 ,12.5])
condition_rnd_5 = (rnd_5 >= q25) & (rnd_5 <= q75)
rnd_5_cat=np.extract(condition_rnd_5, rnd_5)

q75, q25 = np.percentile(auto_0, [87.5 ,12.5])
condition_auto_0 = (auto_0 >= q25) & (auto_0 <= q75)
auto_0_cat = np.extract(condition_auto_0, auto_0)


q75, q25 = np.percentile(auto_1, [87.5 ,12.5])
condition_auto_1 = (auto_1 >= q25) & (auto_1 <= q75)
auto_1_cat = np.extract(condition_auto_1, auto_1)


q75, q25 = np.percentile(auto_2, [87.5 ,12.5])
condition_auto_2 = (auto_2 >= q25) & (auto_2 <= q75)
auto_2_cat=np.extract(condition_auto_2, auto_2)


q75, q25 = np.percentile(auto_3, [87.5 ,12.5])
condition_auto_3 = (auto_3 >= q25) & (auto_3 <= q75)
auto_3_cat=np.extract(condition_auto_3, auto_3)


q75, q25 = np.percentile(auto_4, [87.5 ,12.5])
condition_auto_4 = (auto_4 >= q25) & (auto_4 <= q75)
auto_4_cat=np.extract(condition_auto_4, auto_4)


q75, q25 = np.percentile(auto_5, [87.5 ,12.5])
condition_auto_5 = (auto_5 >= q25) & (auto_5 <= q75)
auto_5_cat=np.extract(condition_auto_5, auto_5)

q75, q25 = np.percentile(manual_ref_0, [87.5 ,12.5])
condition_manual_ref_0 = (manual_ref_0 >= q25) & (manual_ref_0 <= q75)
manual_ref_0_cat = np.extract(condition_manual_ref_0, manual_ref_0)


q75, q25 = np.percentile(manual_ref_1, [87.5 ,12.5])
condition_manual_ref_1 = (manual_ref_1 >= q25) & (manual_ref_1 <= q75)
manual_ref_1_cat = np.extract(condition_manual_ref_1, manual_ref_1)


q75, q25 = np.percentile(manual_ref_2, [87.5 ,12.5])
condition_manual_ref_2 = (manual_ref_2 >= q25) & (manual_ref_2 <= q75)
manual_ref_2_cat=np.extract(condition_manual_ref_2, manual_ref_2)


q75, q25 = np.percentile(manual_ref_3, [87.5 ,12.5])
condition_manual_ref_3 = (manual_ref_3 >= q25) & (manual_ref_3 <= q75)
manual_ref_3_cat=np.extract(condition_manual_ref_3, manual_ref_3)


q75, q25 = np.percentile(manual_ref_4, [87.5 ,12.5])
condition_manual_ref_4 = (manual_ref_4 >= q25) & (manual_ref_4 <= q75)
manual_ref_4_cat=np.extract(condition_manual_ref_4, manual_ref_4)


q75, q25 = np.percentile(manual_ref_5, [87.5 ,12.5])
condition_manual_ref_5 = (manual_ref_5 >= q25) & (manual_ref_5 <= q75)
manual_ref_5_cat=np.extract(condition_manual_ref_5, manual_ref_5)

q75, q25 = np.percentile(manual_ide_0, [87.5 ,12.5])
condition_manual_ide_0 = (manual_ide_0 >= q25) & (manual_ide_0 <= q75)
manual_ide_0_cat = np.extract(condition_manual_ide_0, manual_ide_0)


q75, q25 = np.percentile(manual_ide_1, [87.5 ,12.5])
condition_manual_ide_1 = (manual_ide_1 >= q25) & (manual_ide_1 <= q75)
manual_ide_1_cat = np.extract(condition_manual_ide_1, manual_ide_1)


q75, q25 = np.percentile(manual_ide_2, [87.5 ,12.5])
condition_manual_ide_2 = (manual_ide_2 >= q25) & (manual_ide_2 <= q75)
manual_ide_2_cat=np.extract(condition_manual_ide_2, manual_ide_2)


q75, q25 = np.percentile(manual_ide_3, [87.5 ,12.5])
condition_manual_ide_3 = (manual_ide_3 >= q25) & (manual_ide_3 <= q75)
manual_ide_3_cat=np.extract(condition_manual_ide_3, manual_ide_3)


q75, q25 = np.percentile(manual_ide_4, [87.5 ,12.5])
condition_manual_ide_4 = (manual_ide_4 >= q25) & (manual_ide_4 <= q75)
manual_ide_4_cat=np.extract(condition_manual_ide_4, manual_ide_4)


q75, q25 = np.percentile(manual_ide_5, [87.5 ,12.5])
condition_manual_ide_5 = (manual_ide_5 >= q25) & (manual_ide_5 <= q75)
manual_ide_5_cat=np.extract(condition_manual_ide_5, manual_ide_5)

q75, q25 = np.percentile(manual_rnd_0, [87.5 ,12.5])
condition_manual_rnd_0 = (manual_rnd_0 >= q25) & (manual_rnd_0 <= q75)
manual_rnd_0_cat = np.extract(condition_manual_rnd_0, manual_rnd_0)


q75, q25 = np.percentile(manual_rnd_1, [87.5 ,12.5])
condition_manual_rnd_1 = (manual_rnd_1 >= q25) & (manual_rnd_1 <= q75)
manual_rnd_1_cat = np.extract(condition_manual_rnd_1, manual_rnd_1)


q75, q25 = np.percentile(manual_rnd_2, [87.5 ,12.5])
condition_manual_rnd_2 = (manual_rnd_2 >= q25) & (manual_rnd_2 <= q75)
manual_rnd_2_cat=np.extract(condition_manual_rnd_2, manual_rnd_2)


q75, q25 = np.percentile(manual_rnd_3, [87.5 ,12.5])
condition_manual_rnd_3 = (manual_rnd_3 >= q25) & (manual_rnd_3 <= q75)
manual_rnd_3_cat=np.extract(condition_manual_rnd_3, manual_rnd_3)


q75, q25 = np.percentile(manual_rnd_4, [87.5 ,12.5])
condition_manual_rnd_4 = (manual_rnd_4 >= q25) & (manual_rnd_4 <= q75)
manual_rnd_4_cat=np.extract(condition_manual_rnd_4, manual_rnd_4)


q75, q25 = np.percentile(manual_rnd_5, [87.5 ,12.5])
condition_manual_rnd_5 = (manual_rnd_5 >= q25) & (manual_rnd_5 <= q75)
manual_rnd_5_cat=np.extract(condition_manual_rnd_5, manual_rnd_5)

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
"""

y_rnd=[1603.4, 1622.2, 1636.1, 1603.3, 1622.1, 1612.4]
y_auto=[1670.4, 752.3, 184.2, 7.5, -0.2, -1.0]
y_manual_ref=[1613.5, 695.3, 37.1,-1.7, -5.3, -12.3]
y_manual_ide=[1605.6, 1074.3, 782.2, 516.4, 617.1, 478.0]
y_manual_rnd=[1687.2, 595.2, 603.0, 588.3, 348.4, 316.4]


rnd_0=np.random.normal(1603.4, 1205.0, 6000)
condition_rnd_0 = rnd_0 > 1.0
rnd_0=np.extract(condition_rnd_0, rnd_0)
rnd_1=np.random.normal(1622.2, 1225.0, 6000)
condition_rnd_1 = rnd_1 > 0.7
rnd_1=np.extract(condition_rnd_1, rnd_1)
rnd_2=np.random.normal(1636.1, 1425.0, 6000)
condition_rnd_2 = rnd_2 > 1.2
rnd_2=np.extract(condition_rnd_2, rnd_2)
rnd_3=np.random.normal(1603.3, 1525.0, 6000)
condition_rnd_3 = rnd_3 > 1.3
rnd_3=np.extract(condition_rnd_3, rnd_3)
rnd_4=np.random.normal(1622.1, 1125.0, 6000)
condition_rnd_4 = rnd_4 > -1.0
rnd_4=np.extract(condition_rnd_4, rnd_4)
rnd_5=np.random.normal(1612.4, 1325.0, 6000)
condition_rnd_5 = rnd_5 > -0.5
rnd_5=np.extract(condition_rnd_5, rnd_5)



auto_0=np.random.normal(1670.4, 1325.0, 4000)
condition_auto_0 = auto_0 > 1.0
auto_0=np.extract(condition_auto_0, auto_0)
auto_1=np.random.normal(752.3, 825.0, 4000)
condition_auto_1 = auto_1 > -11.0
auto_1=np.extract(condition_auto_1, auto_1)
auto_2=np.random.normal(184.2, 325.0, 4000)
condition_auto_2 = auto_2 > -19.0
auto_2=np.extract(condition_auto_2, auto_2)
auto_3=np.random.normal(7.5, 135.0, 4000)
condition_auto_3 = auto_3 > -25.0
auto_3=np.extract(condition_auto_3, auto_3)
auto_4=np.random.normal(-0.2, 25.0, 4000)
condition_auto_4 = auto_4 > -40.0
auto_4=np.extract(condition_auto_4, auto_4)
auto_5=np.random.normal(-1.0, 15.0, 4000)
condition_auto_5 = auto_5 > -45.0
auto_5=np.extract(condition_auto_5, auto_5)



manual_ref_0=np.random.normal(1613.5, 1025.0, 4000)
condition_manual_ref_0 = manual_ref_0 > 8.0
manual_ref_0=np.extract(condition_manual_ref_0, manual_ref_0)
manual_ref_1=np.random.normal(695.3, 525.0, 4000)
condition_manual_ref_1 = manual_ref_1 > -11.0
manual_ref_1=np.extract(condition_manual_ref_1, manual_ref_1)
manual_ref_2=np.random.normal(37.1, 105.0, 4000)
condition_manual_ref_2 = manual_ref_2 > -23.0
manual_ref_2=np.extract(condition_manual_ref_2, manual_ref_2)
manual_ref_3=np.random.normal(-1.7, 85.0, 4000)
condition_manual_ref_3 = manual_ref_3 > -28.0
manual_ref_3=np.extract(condition_manual_ref_3, manual_ref_3)
manual_ref_4=np.random.normal(-5.3, 12.0, 4000)
condition_manual_ref_4 = manual_ref_4 > -48.0
manual_ref_4=np.extract(condition_manual_ref_4, manual_ref_4)
manual_ref_5=np.random.normal(-1.0, 9.0, 4000)
condition_manual_ref_5 = manual_ref_5 > -60.0
manual_ref_5=np.extract(condition_manual_ref_5, manual_ref_5)


manual_ide_0=np.random.normal(1605.6, 1225.0, 4000)
condition_manual_ide_0 = manual_ide_0 > -4.0
manual_ide_0=np.extract(condition_manual_ide_0, manual_ide_0)
manual_ide_1=np.random.normal(1074.3, 975.0, 4000)
condition_manual_ide_1 = manual_ide_1 > -12.0
manual_ide_1=np.extract(condition_manual_ide_1, manual_ide_1)
manual_ide_2=np.random.normal(782.2, 505.0, 4000)
condition_manual_ide_2 = manual_ide_2 > -15.0
manual_ide_2=np.extract(condition_manual_ide_2, manual_ide_2)
manual_ide_3=np.random.normal(516.4, 385.0, 4000)
condition_manual_ide_3 = manual_ide_3 > -24.0
manual_ide_3=np.extract(condition_manual_ide_3, manual_ide_3)
manual_ide_4=np.random.normal(617.1, 212.0, 4000)
condition_manual_ide_4 = manual_ide_4 > -26.0
manual_ide_4=np.extract(condition_manual_ide_4, manual_ide_4)
manual_ide_5=np.random.normal(478.0, 199.0, 4000)
condition_manual_ide_5 = manual_ide_5 > -32.0
manual_ide_5=np.extract(condition_manual_ide_5, manual_ide_5)


manual_rnd_0=np.random.normal(1687.2, 1214.0, 4000)
condition_manual_rnd_0 = manual_rnd_0 > 2.0
manual_rnd_0=np.extract(condition_manual_rnd_0, manual_rnd_0)
manual_rnd_1=np.random.normal(595.2, 725.0, 4000)
condition_manual_rnd_1 = manual_rnd_1 > -11.0
manual_rnd_1=np.extract(condition_manual_rnd_1, manual_rnd_1)
manual_rnd_2=np.random.normal(603.2, 475.0, 4000)
condition_manual_rnd_2 = manual_rnd_2 > -13.0
manual_rnd_2=np.extract(condition_manual_rnd_2, manual_rnd_2)
manual_rnd_3=np.random.normal(588.3, 297.0, 4000)
condition_manual_rnd_3 = manual_rnd_3 > -18.0
manual_rnd_3=np.extract(condition_manual_rnd_3, manual_rnd_3)
manual_rnd_4=np.random.normal(348.4, 142.0, 4000)
condition_manual_rnd_4 = manual_rnd_4 > -28.0
manual_rnd_4=np.extract(condition_manual_rnd_4, manual_rnd_4)
manual_rnd_5=np.random.normal(316.4, 109.0, 4000)
condition_manual_rnd_5 = manual_rnd_5 > -30.0
manual_rnd_5=np.extract(condition_manual_rnd_5, manual_rnd_5)


"""



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
plt.show()