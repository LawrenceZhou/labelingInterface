import os
import sys
import time
import random 
import string 
import copy

from magenta import music as mm
from magenta.models.music_vae import configs
from magenta.models.music_vae import TrainedModel
import numpy as np
import tensorflow as tf

from magenta.protobuf import music_pb2
from . import pySequentialLineSearch #web
#import pySequentialLineSearch #sDTW
#from vae_utils import make_encoder, make_decoder, make_prior
from . import little_VAE #web
#import little_VAE  #sDTW

from . import convert_dir_to_note_sequences as ctns #web
#import convert_dir_to_note_sequences as ctns #sDTW
from magenta.protobuf import music_pb2

from sklearn.base import clone
from skopt import gp_minimize
from skopt.learning import GaussianProcessRegressor
from skopt.learning.gaussian_process.kernels import ConstantKernel, Matern

from tslearn.metrics import soft_dtw
from operator import itemgetter
from sklearn.decomposition import PCA


class GenerateController:
    def __init__(self, checkpoint_dir_or_path, config_tag, dimensions):
        self.optimizer = pySequentialLineSearch.SequentialLineSearchOptimizer(dimensions)
        self.dimensions=dimensions
        self.checkpoint_dir_or_path = os.path.expanduser(checkpoint_dir_or_path)
        self.model = TrainedModel(
            configs.CONFIG_MAP[config_tag], batch_size = 8,
            checkpoint_dir_or_path = self.checkpoint_dir_or_path)
        self.candidates = []
        self.synthesisCandidates_pb = []
        self.boResults = []
        self.bestSamplez = None
        self.bestSample = None
        self.seedZ = None
        self.seed = None
        self.seedOZ = None
        self.seedO = None
        self.BOcallCount = 0
        self.lastBOBeta = -1
        self.lastSubBest=[]
        #self.rangeChange_z_to_b_v = np.vectorize(self.rangeChange_z_to_b)
        #self.rangeChange_b_to_z_v = np.vectorize(self.rangeChange_b_to_z)
        datax = np.loadtxt(open("/hcilab/MusicVAE/Z_12aa74e34d3a43b9aab9104b9e865fd3.csv", "rb"), delimiter=",")
        datay = np.loadtxt(open("/hcilab/MusicVAE/Z_1358c1eb7e3e0ed245cd8b6d8025c0c6.csv", "rb"), delimiter=",")
        dataz = np.loadtxt(open("/hcilab/MusicVAE/Z_3ac592b6699da8e7cbb75591fd11ea8a.csv", "rb"), delimiter=",")
        dataa = np.loadtxt(open("/hcilab/MusicVAE/Z_524a78447c0b975669179f6284780d6f.csv", "rb"), delimiter=",")
        datab = np.loadtxt(open("/hcilab/MusicVAE/Z_7790cd2829ba4a0a1557011cadf40789.csv", "rb"), delimiter=",")
        datac = np.loadtxt(open("/hcilab/MusicVAE/Z_7e1c84dad93bdb77e6d40bd99ada800b.csv", "rb"), delimiter=",")
        datad = np.loadtxt(open("/hcilab/MusicVAE/Z_b02463cfe13241943f72eb0323446287.csv", "rb"), delimiter=",")
        datae = np.loadtxt(open("/hcilab/MusicVAE/Z_b53111155ce13409d7f7bfa07eb1d808.csv", "rb"), delimiter=",")
        dataf = np.loadtxt(open("/hcilab/MusicVAE/Z_b97c529ab9ef783a849b896816001748.csv", "rb"), delimiter=",")
        datag = np.loadtxt(open("/hcilab/MusicVAE/Z_c143652c391a4caca7b5bb7e38b9a9d6.csv", "rb"), delimiter=",")
        #self.data_dummy =  np.concatenate([datax,datay,dataz,dataa,datab,datac,datad,datae,dataf,datag])
        self.data_dummy =  np.concatenate([datax,dataz,datab,datad,datag])
        #self.data_dummy =  np.array(np.loadtxt(open("/hcilab/MusicVAE/Z_1d9d16a9da90c090809c153754823c2b.csv", "rb"), delimiter=","))
        self.little_vae = little_VAE.Little_VAE("/hcilab/MusicVAE/vae_model.ckpt")
        self.pca = PCA(n_components=8)
        #self.x_pca = list(self.pca.fit_transform(self.data_dummy))
        self.x_pca = list(np.loadtxt(open("/hcilab/MusicVAE/latent_code_vae.csv", "rb"), delimiter=","))
        self.x_pca_mean = np.mean(self.x_pca, 0)
        self.x_pca_var = np.std(self.x_pca, 0)

    def __del__(self):
        with open("countRecord.csv",'a') as fd:
            fd.write(time.ctime()+ "," +str(self.BOcallCount)+"\n")
        del self.optimizer
        del self.model
        print("Generator deleted.")

    def encode(self, notes):
        mu=[]
        for n in notes:
            try:
                _, m, _ = self.model.encode([n])
                mu.append(m[0])
            except Exception as e:
                print(e)
                continue
        return mu
        
    def generateSamples(self, seed_notes_info, seed_type, search_type, num, selected_ids, EorR):
        print("exiting! ", seed_type,search_type,len(self.boResults))
        if self.lastBOBeta != -1 and EorR != self.lastBOBeta:
            self.BOcallCount += 1
        self.lastBOBeta = EorR
        if seed_type == "seed" and search_type == "bo" and len(self.boResults) > 0:
            modified_results = []
            if EorR == 0:
                modified_results += random.sample(self.boResults, 4)
            elif EorR == 1.0:
                modified_results += random.sample(self.boResults, 4)
            elif EorR == 5.0:
                modified_results += random.sample(self.boResults, 4)
            elif EorR == 25.0:
                modified_results += random.sample(self.boResults, 4)
            elif EorR == 125.0:
                modified_results += random.sample(self.boResults, 4)
            else:
                modified_results += random.sample(self.boResults, 4)

            modified_results.insert(0, self.seedO)
            return modified_results
        else:
            if seed_type == "seed":
                print(11111)
                seedSample = self.seq_to_pb(seed_notes_info, 220, 120)
                print(22222)
                
                _, mu, _ = self.model.encode([seedSample])
                print(33333)

                self.seedOZ = mu[0]
                seed_encode_pb = self.model.decode(
                length=32,
                z=[self.seedOZ],
                temperature=0.5)
                print(44444)

                self.seedO={"cid":self.generateID(), "notes_info": self.pb_to_seq(seed_encode_pb[0])}
                print(55555)
           
            print(type([self.seedOZ]), type(list(self.data_dummy)))
            print(len(list(self.data_dummy)))
            dummy_sample = list(random.sample(list(self.data_dummy), 4))
            pb_results = self.model.decode(
                length=32,
                z=dummy_sample,
                temperature=0.5)
            print(pb_results)
            seq_results = [self.pb_to_seq(p) for p in pb_results]

            results = [ {"cid":self.generateID(), "notes_info": seq_results[s]} for s in range(len(seq_results))]
            print(results)
            temp_candidates = []
            for c in self.candidates:
                print("aaaabbbb", c["cid"], selected_ids)
                if c["cid"] in selected_ids:
                    temp_candidates.append(c)


            print("bbbbb111", temp_candidates)
            print("bbbbb222", self.candidates)
            self.candidates += results
            print("ccccc", self.candidates)
            for r in results:
                r['notes_info']['notes'] = self.compress_octave(r['notes_info']['notes'])

            if seed_type == "seed":
                pitch_seq_bo = [self.notes_to_pitch_sequence(r['notes_info']['notes']) for r in results]

                d_bo = [soft_dtw(self.notes_to_pitch_sequence(seed_notes_info['notes']), p, 1.0) for p in pitch_seq_bo]

                for i in range(len(results)):
                    results[i]["sdtw"] = d_bo[i]

                sortedResults = sorted(results, key=itemgetter('sdtw'))

                sortedResults.insert(0, self.seedO)

                return sortedResults[:5]

        return results

    def pb_to_seq(self, pbs):
        sequence = {"notes": []}
        for n in pbs.notes:
            sequence["notes"].append({'pitch': int(n.pitch), 'quantizedStartStep': int(8 * n.start_time), 'quantizedEndStep': int(8 * n.end_time) })

        return sequence
    
    def seq_to_pb(self, sequence, ticks_per_quarter, qpm):
        pb = music_pb2.NoteSequence()
        pb.ticks_per_quarter = ticks_per_quarter #220
        tempo = pb.tempos.add()
        tempo.qpm = qpm #120
        pb.total_time = 4.0 # notes[-1]['quantizedEndStep'] / 8

        for n in sequence['notes']:
            note = pb.notes.add()
            note.pitch = n['pitch']
            note.velocity = 80
            if n['quantizedStartStep'] == 0:
                note.start_time = 0.0
            else:
                note.start_time = n['quantizedStartStep'] / 8
            note.end_time = n['quantizedEndStep'] / 8

        return pb

    def slerp(self, p0, p1, t):
        """Spherical linear interpolation."""
        omega = np.arccos(
        np.dot(np.squeeze(p0/np.linalg.norm(p0)),
                np.squeeze(p1/np.linalg.norm(p1))))
        so = np.sin(omega)
        return np.sin((1.0-t)*omega) / so * p0 + np.sin(t*omega)/so * p1

    def line_interpolation(self, p0, p1, t):
        return p1 *t + p0 * (1.0 - t)

    def interpolate(self, ids, percents, starts, ends):
        for c in self.candidates:
            print(c["cid"])
        c_original = []
        original_candidates = copy.deepcopy(self.candidates) 
        for i in ids:
            c_original += [c for c in original_candidates if c["cid"] == i]
            if self.seedO != None and i == self.seedO["cid"]:
                c_original.append(copy.deepcopy(self.seedO))
            if self.bestSample!= None and i == self.bestSample["cid"]:
                c_original.append(copy.deepcopy(self.bestSample))
        print(c_original)
        temp = []
        for j in range(len(c_original)):
            tempS = []
            for n in c_original[j]["notes_info"]["notes"]:
                if n['quantizedStartStep'] >= starts[j] and n['quantizedEndStep']<= ends[j]:
                    tempS.append(n)
            temp.append(tempS)

        for k in range(len(c_original)):
            for j in range(len(c_original)):
                if j != k:
                    c_original[k]["notes_info"]["notes"] = [n for n in c_original[k]["notes_info"]["notes"] if not ((n['quantizedStartStep']>= starts[j] and n['quantizedEndStep']<= ends[j]) or (n['quantizedStartStep']<= starts[j] and n['quantizedEndStep']>= ends[j]) or (n['quantizedStartStep']<= ends[j] and n['quantizedEndStep']>= ends[j]))]
                    c_original[k]["notes_info"]["notes"] = [*c_original[k]["notes_info"]["notes"], *temp[j]]
        print("after filter",c_original)
        x=[]
        for i in ids:
            x+=[c for c in self.candidates if c["cid"] == i]
        print("original", x)
   
        result = [self.seq_to_pb(c["notes_info"], 220, 120) for c in c_original]
        
        _, mu, _ = self.model.encode(result)
        newPb = []
        for i in range(len(ids)):
            newPb.append({"cid": ids[i], "pb": mu[i]})          

        self.synthesisCandidates_pb = newPb

        if sum(percents) == 0:
            real_percents = [round(1/len(percents), 4)] * len(percents)
        else:
            real_percents = [round(p / sum(percents), 4) for p in percents]
        print(real_percents)

        z = self.synthesisCandidates_pb[0]["pb"] * real_percents[0]
        for i in range(1, len(real_percents)):
            z += self.synthesisCandidates_pb[i]["pb"] * real_percents[i]
        z = np.array([z])
        print(z)
        if not(self.bestSamplez is None):
            print(z - self.bestSamplez)
        self.bestSamplez = z

        interpolation_results = self.model.decode(
                            length=32,
                            z=z,
                        temperature=0.5)
        print(interpolation_results[0])
        seq_results = [self.pb_to_seq(i) for i in interpolation_results]
        results = [ {"cid":self.generateID(), "notes_info": s} for s in seq_results]
        for r in results:
            r['notes_info']['notes'] = self.compress_octave(r['notes_info']['notes'])
        return results


    def boSearch(self, notes_info, search_type, startStep, endStep, EorR):
        if self.lastBOBeta != -1 and EorR != self.lastBOBeta:
            self.BOcallCount += 1
        self.lastBOBeta = EorR
        bestSample = self.seq_to_pb(notes_info, 220, 120)
        print("000",bestSample)
        try:
            _, mu, _ = self.model.encode([bestSample])
        except Exception as e:
            self.bestSample={"cid":self.generateID(), "notes_info": notes_info}
            result_error = [self.bestSample]
            result_error.insert(0, self.seedO)
            return result_error

        self.bestSamplez = mu[0]
        if search_type == "bo" or search_type == "ucb":
            prevs_pb = [self.seq_to_pb(c["notes_info"], 220, 120) for c in self.candidates]
            mu = self.encode(prevs_pb)
            mu = [m for m in mu if np.sum((m - self.bestSamplez)**2) > 0.01]
            possible = []
            if len(mu) > 1:
                possible.append(mu[0])
                possible.append(mu[-1])
            else:
                possible = mu

            start_time = time.time()

            d_r = self.dimension_reduce(np.expand_dims(self.bestSamplez, axis=0))[0]
            possible = []

            if(len(self.lastSubBest)>0):
                possible=[m for m in self.lastSubBest if np.sum((m - d_r)**2) > 0.01]
            else:
                possible = list(random.sample(self.x_pca, 2))
                possible = [self.rangeChange_z_to_b_v(p) for p in possible]

            print(possible)
            if search_type == "bo":
                original_boCandidates = self.optimizer.submit_search_result(self.rangeChange_z_to_b_v(d_r), possible,20,200,4, float(EorR), False)
            else:
                original_boCandidates = self.optimizer.submit_search_result(self.rangeChange_z_to_b_v(d_r), possible,20,200,4, float(EorR), True)

            boCandidates=original_boCandidates
            print("dsfsfsfsfse1", search_type)
            print("dsfsfsfsfse2", float(EorR))
            if search_type == "ucb":
                if float(EorR) == 0.0:
                    print(boCandidates)
                    print(self.rangeChange_z_to_b_v(d_r))
                    boCandidates = [self.slerp(self.rangeChange_z_to_b_v(d_r), b, 0.05) for b in boCandidates]
                    print(boCandidates)
                    print("dfhgdhdhdhdfhd")
                if float(EorR) == 0.1:
                    boCandidates = [self.slerp(self.rangeChange_z_to_b_v(d_r), b, 0.1) for b in boCandidates]
                if float(EorR) == 0.2:
                    boCandidates = [self.slerp(self.rangeChange_z_to_b_v(d_r), b, 0.2) for b in boCandidates]
                if float(EorR) == 0.4:
                    boCandidates = [self.slerp(self.rangeChange_z_to_b_v(d_r), b, 0.4) for b in boCandidates]
                if float(EorR) == 0.8:
                    boCandidates = [self.slerp(self.rangeChange_z_to_b_v(d_r), b, 0.8) for b in boCandidates]
                if float(EorR) == 1.6:
                    boCandidates = [self.slerp(self.rangeChange_z_to_b_v(d_r), b, 1.0) for b in boCandidates]
            self.lastSubBest= boCandidates

            print("search done. time: ", time.time() - start_time)
            print(d_r, original_boCandidates)
            print(2, boCandidates)
            l_boCandidates = np.array([self.rangeChange_b_to_z_v(b) for b in boCandidates])
            print(3, l_boCandidates)
            boCandidates =self.dimension_enhance(l_boCandidates)
            l_boCandidates = [l for l in l_boCandidates]
            l_boCandidates.insert(0, d_r)
            print(type(boCandidates),boCandidates.shape,boCandidates)
            if search_type == "bo":
                boCandidates = [self.slerp( self.bestSamplez, boCandidates[0], t) for t in [0.1,0.2,0.4,1.0] ]
            else:
                boCandidates = [b for b in boCandidates]

            boCandidates.insert(0, self.bestSamplez)


            pb_results = self.model.decode(
                                length=32,
                                z=boCandidates,
                                temperature=0.5)
            elapsed_time = time.time() - start_time
            print('decode done. time: ', elapsed_time)
            seq_results = [self.pb_to_seq(p) for p in pb_results]

            results = [ {"cid":self.generateID(), "notes_info": seq_results[s]} for s in range(len(seq_results))]

            self.synthesisCandidates_pb= []

            self.optimizer.damp_data("/root/")
            for r in results:
                r['notes_info']['notes'] = self.compress_octave(r['notes_info']['notes'])

            pitch_seq_bo = [self.notes_to_pitch_sequence(r['notes_info']['notes']) for r in results]
            if startStep != endStep:
                d_bo_part = [soft_dtw(pitch_seq_bo[0][startStep:endStep], p[startStep:endStep], 1.0) / 16 for p in pitch_seq_bo]
            else:
                d_bo_part = [soft_dtw(pitch_seq_bo[0], p, 1.0) / 16 for p in pitch_seq_bo]

            d_bo = [soft_dtw(pitch_seq_bo[0], p, 1.0) for p in pitch_seq_bo]
            print("startstep, endstep", startStep, endStep)
            for i in range(len(results)):
                results[i]["sdtw"] = d_bo[i]
                results[i]["part_sdtw"] = d_bo_part[i]

            sorted_results = results[1:]

            seen = set()
            seen_add = seen.add
            sorted_results.insert(0, results[0])
            sorted_results = [s for s in sorted_results if not (str(s['sdtw']) in seen or seen_add(str(s['sdtw'])))]
            print("delete duplicates")
            sumdtw = 0
            for s in sorted_results:
                print(s['part_sdtw'], s['sdtw'])
                sumdtw += s['sdtw']
            avgdtw = sumdtw / len(sorted_results)
            

            modified_results = [sorted_results[0]]
            starting_index = 0
            aware_num = 0
            print(1)

            for i in range(1, len(sorted_results)):
                if str(sorted_results[i]['part_sdtw']) == str(sorted_results[0]['part_sdtw']):
                    starting_index = i
                    if aware_num < 2:
                        aware_num += 1
                        modified_results.append(sorted_results[i])
                else:
                    break

            self.boResults = sorted_results[1:]
            print("bo results length: ", len(self.boResults), " sorted results length: ", len(sorted_results))

            print(2)

            modified_results=sorted_results
            self.bestSample= sorted_results[0]
            print("how different? ", avgdtw)
            print("modified")
            for s in modified_results:
                print(s['part_sdtw'], s['sdtw'])
            self.candidates = self.boResults
            modified_results.insert(0, self.seedO)
            return modified_results

        else:
            pb_results = self.model.sample(
                n=4,
                length=32,
                temperature=0.5)
        
            seq_results = [self.pb_to_seq(p) for p in pb_results]
            results = [ {"cid":self.generateID(), "notes_info": s} for s in seq_results]
            results.insert(0, {"cid":self.generateID(), "notes_info": notes_info})
            self.candidates = results
            self.synthesisCandidates_pb= []
            #print(self.candidates)
            self.optimizer.damp_data("/root/")
            for r in results:
                r['notes_info']['notes'] = self.compress_octave(r['notes_info']['notes'])
            return results


    def generateID(self):
    # Generate a random string 
    # with 32 characters. 
        ID = ''.join([random.choice(string.ascii_letters 
            + string.digits) for n in range(32)]) 
        return ID

    def rangeChange_z_to_b(self, z):
        #return max(-2.0, min(2.0, z / 4 + 0.5))
        return max(-2.0, min(2.0, z / 4 + 0.5))

    

    def rangeChange_b_to_z(self, b):
        #return 4.0 * b - 2.0
        return 4.0 * b - 2.0


    def rangeChange_z_to_b_v(self, z):
        stats = self.little_vae.get_mean_std()
        result=(z - stats[1] + 0.05) / (stats[0] - stats[1] + 0.1)
        result[result>0.9999]=0.9999
        result[result<0.0001]=0.0001
        return result

    def rangeChange_b_to_z_v(self, b):
        stats = self.little_vae.get_mean_std()
        print("stats", stats)
        return b * (stats[0] - stats[1] + 0.1) + stats[1] - 0.05


    def compress_octave(self, notes):
        min_pitch = 128
        max_pitch = 0
        for n in notes:
            min_pitch = min(min_pitch, n['pitch'])
            max_pitch = max(max_pitch, n['pitch'])
        if max_pitch - min_pitch < 24:
            octave_num = min_pitch // 12
            pitch_num  = min_pitch % 12
        else:
            octave_num = min_pitch // 12 + 1
            pitch_num  = min_pitch % 12
        for n in notes:
            n['pitch'] = min(83, n['pitch'] +(5 - octave_num) * 12)
    
        return notes

    def notes_to_pitch_sequence(self, compressed_notes):
        seed_seq = [47] * 32
        for c_n in compressed_notes:
            for i in range(c_n['quantizedStartStep'], c_n['quantizedEndStep']):
                seed_seq[i] = c_n['pitch']
        return seed_seq

    def dimension_reduce(self, z):
        return self.little_vae.encode(z)

    def dimension_enhance(self, d_z):
        return self.little_vae.decode(d_z)


