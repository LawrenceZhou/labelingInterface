import tensorflow as tf
import numpy as np
import csv
tfd = tf.contrib.distributions
from . import vae_utils  
#import vae_utils  
CODE_SIZE = 4

class Little_VAE:
	def __init__(self, checkpoint_dir_or_path):
		self.checkpoint = checkpoint_dir_or_path


	def encode(self, original_vector):
		tf.reset_default_graph()
		data = tf.placeholder(tf.float32, [None, 512])
		posterior = vae_utils.make_encoder(data, code_size=CODE_SIZE)
		code = posterior.sample()
		with tf.Session() as sess:
		# Initialized, Load state
			sess.run(tf.global_variables_initializer())
			new_saver = tf.train.Saver()
			if self.checkpoint:
				print('Load little vae weights')
				new_saver.restore(sess, self.checkpoint)
				y_output = sess.run(code, feed_dict={data: original_vector})
				#tf.get_variable_scope().reuse_variables()
				return y_output
			else:
				print("no checkpoint!")
		return None


	def decode(self, latent_vector):
		tf.reset_default_graph()
		code = tf.placeholder(tf.float32, [None, CODE_SIZE])
		pred = vae_utils.make_decoder(code, [512])
		with tf.Session() as sess:
		# Initialized, Load state
			sess.run(tf.global_variables_initializer())
			new_saver = tf.train.Saver()
			if self.checkpoint:
				print('Load little vae weights')
				new_saver.restore(sess, self.checkpoint)
				y_output = sess.run(pred, feed_dict={code: latent_vector})
				#tf.get_variable_scope().reuse_variables()
				return y_output
			else:
				print("no checkpoint!")
		return None


	def get_mean_std(self):
		latent = np.loadtxt(open("/hcilab/MusicVAE/latent_code_vae.csv", "rb"), delimiter=",")
		return[np.max(latent, axis=0), np.min(latent, axis=0), np.mean(latent,axis=0), np.std(latent,axis=0)]