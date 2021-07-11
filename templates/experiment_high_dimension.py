import numpy as np
from math import pi
from math import exp
import math
import pySequentialLineSearch #sDTW
from scipy import stats

dim = 4

class GenerateController:
    def __init__(self, dimensions):
        self.optimizer = pySequentialLineSearch.SequentialLineSearchOptimizer(dimensions)
        self.dimensions=dimensions


def dummy_objective_function(x, obj):
	#obj += np.random.normal(0, 0.05, dim)
	#result = 0
	#for i in range(x.size):
	#	result += stats.norm(obj[i], 0.05).pdf(x[i])# * (0.05 * math.sqrt(2*pi)) #1.0 / (0.05 * (2.0 * pi)**(1/2)) * exp(-1.0 * (x[i] - obj[i])**2 / (2.0 * (0.05**2)))
	#return result / dim
	return -np.linalg.norm(x - obj)

def distance(last_best, candidate):
	return np.linalg.norm(last_best - candidate)

def experiment(global_num, local_num, trial):
	obj = np.random.normal(0.5, 0.2, dim)
	#obj = np.random.uniform(0,0.99999,dim)
	obj[(obj>=1.0)] = 0.9999
	obj[(obj<-0.0)] = 0.0001
	print(obj)

	generator = GenerateController(dim)
	best = np.random.uniform(0,0.99999,dim)
	best = np.array([0.45282305, 0.29191734, 0.80486785, 0.43125253])
	prev = [np.random.uniform(0,0.99999,dim) for i in range(1)]
	#prev = [np.array([0.42153257, 0.80649168, 0.48242226, 0.5247317 , 0.39415461,
    #   0.50802864, 0.05797262, 0.5280526 ]), np.array([0.20181828, 0.43079631, 0.37516405, 0.50983167, 0.60393363,
    #   0.4425449 , 0.6432672 , 0.38323813])]

	#best = (prev[0] + prev[1] + prev[2] + prev[3]) / 4
	with open("experiment_result/small_real_EI_global_" + str(global_num) + "_local_" + str(local_num) + "_trial_" + str(trial) + ".csv",'a') as fd:
		fd.write("iteration,mean,max,std,dist_mean,dist_min\n")
		fd.write(str(0) + ",")
		fd.write(str(dummy_objective_function(best, obj)) + ",")
		fd.write(str(dummy_objective_function(best, obj)) + ",")
		fd.write("0,0,0\n")

	for i in range(50):
		#βi=0.2dlog(2i)
		beta = math.sqrt(0.2 * dim * math.log10(2* (i + 1)))
		candidates = generator.optimizer.submit_search_result(best, prev, generator.dimensions * 5 * global_num, 20 * local_num, 4, beta)
		candidates = np.array([np.array(c) for c in candidates])
		print(candidates)
		dist = [distance(best, c) for c in candidates]
		#print(candidates[0])
		d = np.std(candidates, axis=1)
		val = np.array([dummy_objective_function(c, obj) for c in candidates])
		best = candidates[np.argmax(val)]
	
		prev = []
		for x in range(len(candidates)):
			#if len(prev) >= 1:
			#	break
			if x != np.argmax(val):
				prev.append(candidates[x])
				break
		if len(prev) == 0:
			prev.append(np.random.uniform(0,0.99999,dim))

		print(i, np.mean(val), val[np.argmax(val)], np.mean(d), np.mean(dist), dist[np.argmin(dist)])
		with open("experiment_result/small_real_EI_global_" + str(global_num) + "_local_" + str(local_num) + "_trial_" + str(trial) + ".csv",'a') as fd:
			fd.write(str(i+1) + ",")
			fd.write(str(np.mean(val)) + ",")
			fd.write(str(val[np.argmax(val)]) + ",")
			fd.write(str(np.mean(d)) + ",")
			fd.write(str(np.mean(dist)) + ",")
			fd.write(str(dist[np.argmin(dist)]) + "\n")
		if val[np.argmax(val)] > -7e-1:
			pass
			#break

for i in range(100):
	for g in [1, 10]:
		for l in [10, 10, 100, 1000]:
			print("global: ", g, " local: ", l)
			experiment(g, l, i+1)
