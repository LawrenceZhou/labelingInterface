import numpy as np
import pySequentialLineSearch 
from operator import itemgetter
def rangeChange_z_to_b(z):
	return max(-2.0, min(2.0, z / 4 + 0.5))

def rangeChange_b_to_z(b):
	return 4.0 * b - 2.0

rangeChange_z_to_b_v = np.vectorize(rangeChange_z_to_b)
rangeChange_b_to_z_v = np.vectorize(rangeChange_b_to_z)

dist = 0
for i in range(1000):
	x1 = np.random.randn(512).astype(np.float32)
	x2 = np.random.randn(512).astype(np.float32)
	dist += np.linalg.norm(x1 - x2)
	print(np.linalg.norm(x1 - x2))

print(dist)
print(dist / 1000)

"""
seed = np.random.randn(512).astype(np.float64)
others = [np.array(np.random.randn(512).astype(np.float64)) for i in range(2)]
print("qewegfgg")
optimizer = pySequentialLineSearch.SequentialLineSearchOptimizer(512)

for i in range(6):
	results = optimizer.submit_search_result(rangeChange_z_to_b_v(seed), [rangeChange_z_to_b_v(o) for o in others], 0)
	print("xxxxx")
	results = [rangeChange_b_to_z_v(r) for r in results]
	dist = 0
	results_key = []
	for r in results:
		#print(r)
		x = {}
		x['r'] = r
		x['d'] = np.linalg.norm(seed - r)
		results_key.append(x)
		#dist += np.linalg.norm(seed - r)
	
	sorted_results = sorted(results_key, key=itemgetter('d'))
	for i in range(4):
		dist += sorted_results[i]['d']
	print(dist)
	print(dist / 4)

	seed = sorted_results[2]['r']
	others = [sorted_results[0]['r'], sorted_results[4]['r']]
	"""