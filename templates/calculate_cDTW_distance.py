import generateController
import random
import numpy as np
#from cdtw import cdtw_sakoe_chiba
from tslearn.metrics import soft_dtw
import csv 
import math

def compress_octave(notes):
	min_pitch = 128
	max_pitch = 0
	for n in notes:
		min_pitch = min(min_pitch, n['pitch'])
		max_pitch = max(max_pitch, n['pitch'])
	octave_num = min_pitch // 12
	pitch_num  = min_pitch % 12
	print('min: ', min_pitch, 'max: ', max_pitch, 'octave_num: ', octave_num, 'pitch_num: ', pitch_num)
	for n in notes:
		n['pitch'] = min(95, n['pitch'] +(5 - octave_num) * 12)
	
	return notes

def notes_to_sequence(compressed_notes):
	seed_seq = [59] * 32
	for c_n in compressed_notes:
		for i in range(c_n['quantizedStartStep'], c_n['quantizedEndStep']):
			seed_seq[i] = c_n['pitch']
	return seed_seq


def searching_simulate():
	m_r = []
	a_r = []
	
	for j in range(40):
	#try:	
		g = generateController.GenerateController('/home/yijun/Downloads/cat-mel_2bar_big.tar', "cat-mel_2bar_big", 512)
		#r = generateController.GenerateController('/home/yijun/Downloads/cat-mel_2bar_big.tar', "cat-mel_2bar_big", 512)
		#b = generateController.GenerateController('/home/yijun/Downloads/cat-mel_2bar_big.tar', "cat-mel_2bar_big", 512)
		samples = g.generateSamples({},"None","rnd", 4, {}, 0.5)
		#g.generateSamples({},"None","rnd", 4, {}, 0.5)
		#b.generateSamples({},"None","rnd", 4, {}, 0.5)
		seed = None
		for i in range(1):
			percent = random.random() / 2 + 0.25
			#3s2 = None
			if i == 0:
				for s in samples:
					print(len(s['notes_info']['notes']), "sdjhfsejkghsgvbh")
					if len(s['notes_info']['notes']) >= 3:
						if seed == None:
							seed = s
					#elif s2 == None:
					#	s2 = s
					#else:
					#	break			
			#seed = g.interpolate(s1["cid"], s2["cid"], percent)[0]
			m_EoR = 10
			#a_EoR = math.sqrt(102.4 * math.log10(2 * i + 2))
			print("12222222244333333333333333333333333333333333333333333333333333")
			print(seed['notes_info']['notes'])				
			samples = g.boSearch(seed['notes_info'], "bo", -1, -1, m_EoR)[1:]
			#samples_a = b.boSearch(seed['notes_info'], "seed", -1, -1, a_EoR)[1:]
			#print(samples)
			print("22222222244333333333333333333333333333333333333333333333333333")				
			#rnd_results = r.generateSamples({},"None","rnd", 4, {}, 0.5)
			#print(rnd_results)
			#print("32222222244333333333333333333333333333333333333333333333333333")				
			#compressed_notes = compress_octave(seed['notes_info']['notes'])
			#print("compressed notes: ", compressed_notes)
			#seq_seed = notes_to_sequence(compressed_notes)
			#print(seq_seed)				
			#compressed_notes_mnl = [compress_octave(b['notes_info']['notes']) for b in samples]
			#seq_mnl = [notes_to_sequence(c) for c in compressed_notes_mnl]
			#compressed_notes_atl = [compress_octave(b['notes_info']['notes']) for b in samples_a]
			#seq_atl = [notes_to_sequence(c) for c in compressed_notes_atl]				
			#compressed_notes_rnd = [compress_octave(b['notes_info']['notes']) for b in rnd_results]
			#seq_rnd = [notes_to_sequence(c) for c in compressed_notes_rnd]				
			#seq_seed_dtw = np.array(seq_seed, dtype="float64")
			#seq_mnl_dtw = [np.array(s, dtype="float64") for s in seq_mnl]
			#seq_atl_dtw = [np.array(s, dtype="float64") for s in seq_atl]
			#seq_rnd_dtw = [np.array(s, dtype="float64") for s in seq_rnd]								
			print("number ", i)
			#d_bo = [cdtw_sakoe_chiba(seq_seed_dtw, b, 3) for b in seq_bo_dtw]
			d_mnl = [b['sdtw'] for b in samples]
			#b_r.append(d_mnl)
			#d_atl = [soft_dtw(seq_seed_dtw, b, 1.0) for b in seq_atl]
			#b_r.append(d_atl)
			#print(d_bo)
			with open("0322_mnl_"+str(i)+".csv", "a") as file:
				writer = csv.writer(file)
				writer.writerow(d_mnl)
			seed=samples[random.randint(3,20)]
			print("experiment seed", seed)
			#with open("0322_atl_"+str(i)+".csv", "a") as file:
			#	writer = csv.writer(file)
			#	writer.writerow(d_atl)
			#print(d_bo)				
			#d_rnd = [cdtw_sakoe_chiba(seq_seed_dtw, b, 3) for b in seq_rnd_dtw]
			#d_rnd = [soft_dtw(seq_seed_dtw, b, 1.0) for b in seq_rnd_dtw]
			#r_r.append(d_rnd)
			#with open("/root/0322_rnd_"+str(i)+".csv", "a") as file:
			#	writer = csv.writer(file)
			#	writer.writerow(d_rnd)
			#print(d_rnd)			
		#print(b_r)
		#print(r_r)		
		#except Exception:
		#	continue	

def same_simulate():
	for j in range(1000):
		try:
			g = generateController.GenerateController('/home/yijun/Downloads/cat-mel_2bar_big.tar', "cat-mel_2bar_big", 512)
			samples = g.generateSamples(10)
			compressed_notes = [compress_octave(s['notes_info']['notes']) for s in samples]
			seq = [notes_to_sequence(c) for c in compressed_notes]
			seq_dtw = [np.array(s, dtype="float64") for s in seq]
			d_bo = [soft_dtw(b, b, 1.0) for b in seq_dtw]
			with open("/hcilab/InteractiveMusicComposition/templates/same.csv", "a") as file:
				writer = csv.writer(file)
				writer.writerow(d_bo)
		except Exception:
			continue	


searching_simulate()
