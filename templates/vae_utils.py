# Full example for my blog post at:
# https://danijar.com/building-variational-auto-encoders-in-tensorflow/

import numpy as np
import tensorflow as tf
tfd = tf.contrib.distributions
CODE_SIZE = 4


def make_encoder(data, code_size):
    with tf.variable_scope('encoder'):
        x = tf.layers.flatten(data)
        x = tf.layers.dense(x, 512, tf.nn.relu)
        x = tf.layers.dense(x, 512, tf.nn.relu)
        #x = tf.layers.dense(x, 128, tf.nn.relu)
        #x = tf.layers.dense(x, 64, tf.nn.relu)
        #x = tf.layers.dense(x, 32, tf.nn.relu)
        #x = tf.layers.dense(x, 16, tf.nn.relu)
        loc = tf.layers.dense(x, code_size)
        scale = tf.layers.dense(x, code_size, tf.nn.softplus)
        result = tfd.MultivariateNormalDiag(loc, scale)
    return result


def make_prior(code_size):
    #loc = tf.zeros(code_size)
    loc = np.array([0 for _ in range(code_size)], dtype=np.float32)
    #loc = (np.zeros(code_size, dtype=np.float32) + np.ones(code_size, dtype=np.float32)) / 2

    #scale = tf.ones(code_size)
    scale = np.array([0.2 for _ in range(code_size)], dtype=np.float32)
    return tfd.MultivariateNormalDiag(loc, scale)


def make_decoder(code, data_shape):
    with tf.variable_scope('decoder'):
        x = code
        #x = tf.layers.dense(x, 16, tf.nn.relu)
        #x = tf.layers.dense(x, 32, tf.nn.relu)
        x = tf.layers.dense(x, 64, tf.nn.relu)
        x = tf.layers.dense(x, 128, tf.nn.relu)
        x = tf.layers.dense(x, 256, tf.nn.relu)
        x = tf.layers.dense(x, 512, tf.nn.relu)
        #loc = tf.layers.dense(x, data_shape[0])
        #scale = tf.layers.dense(x, data_shape[0], tf.nn.softplus)
        x = tf.layers.dense(x, 512)
    return x
