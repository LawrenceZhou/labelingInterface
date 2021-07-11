import generateController
import numpy as np
from tslearn.metrics import soft_dtw
from operator import itemgetter
from itertools import combinations

#conditions=["exploration", "exploitation", "intermediate"]
#conditions=["adaptive"]
conditions=["automatic"]
for c in conditions:
	for trial in range(0, 10):
		try:
			g1 = generateController.GenerateController('/home/yijun/Downloads/cat-mel_2bar_big.tar', "cat-mel_2bar_big", 4)
			#g = generateController.GenerateController('/home/yijun/Downloads/cat-mel_2bar_big.tar', "cat-mel_2bar_big", 4)
			result = g1.generateSamples([], "none", "bo", 4, "", "1.0")
			best_z = result[0]["z"]
			best_notes = result[0]['notes_info']['notes'] 
			g1.__del__()
			g = generateController.GenerateController('/home/yijun/Downloads/cat-mel_2bar_big.tar', "cat-mel_2bar_big", 4)
			result = g.generateSamples([], "none", "bo", 4, "", "1.0")
			for i in range(50):
				result = [r for r in result if r != None]
				for r in result:
					r["realsdtw"]=soft_dtw(g.notes_to_pitch_sequence(best_notes), g.notes_to_pitch_sequence(r["notes_info"]["notes"]), 1.0)
				result = sorted(result, key = itemgetter('realsdtw'))
				print(i, "how many?", len(result), result)
				balance = 0.0
				"""
				if result[0]["realsdtw"] > 700:
					balance = 1.6
				elif result[0]["realsdtw"] <= 700 and result[0]["realsdtw"] > 300:
					balance = 0.8
				elif result[0]["realsdtw"] <= 300 and result[0]["realsdtw"] > 100:
					balance = 0.4
				elif result[0]["realsdtw"] <= 100 and result[0]["realsdtw"] > 50:
					balance = 0.2
				elif result[0]["realsdtw"] <= 50 and result[0]["realsdtw"] > 10:
					balance = 0.1
				else:
					balance = 0.0
				"""
				if c == "exploitation":
					balance = 0.0
				if c == "exploration":
					balance = 1.6
				if c == "intermediate":
					balance = 0.4
				
				if i == 0:
					result = g.boSearch(result[0]["notes_info"], "bo", 0, 0, balance)
				else:
					comb = list(combinations(result,2))
					avg_sdtw = 0
					avg_eucl = 0
					for co in comb:	
						avg_sdtw += soft_dtw(g.notes_to_pitch_sequence(co[0]["notes_info"]["notes"]), g.notes_to_pitch_sequence(co[1]["notes_info"]["notes"]), 1.0)
						avg_eucl += np.linalg.norm(co[0]["z"] - co[1]["z"])
					avg_sdtw /= len(comb)
					avg_eucl /= len(comb)
					with open("experiment_result/" + c + "_variation_sdtw_eucli_trial_" + str(trial) + ".csv",'a') as fd:
						print(type(best_z), type(result[0]["z"]), best_z, result[0]["z"])
						fd.write(str(i) + ",")
						#fd.write(str(soft_dtw(g.notes_to_pitch_sequence(best_notes), g.notes_to_pitch_sequence(result[0]["notes_info"]["notes"]), 1.0)) + ",")
						#fd.write(str(np.linalg.norm(best_z - result[0]["z"])) + "\n")
						fd.write(str(avg_sdtw) +  "," + str(avg_eucl)+ "\n")
					result = g.boSearch(result[0]["notes_info"], "bo", 0, 0, balance)
	
		except:
			continue
				
	g.__del__()
