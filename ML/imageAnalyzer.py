import umap.umap_ as umap
import glob
import random

import numpy as np
import pandas as pd 
from PIL import Image

import tensorflow.keras as keras
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.imagenet_utils import preprocess_input
from tensorflow.keras.models import Model

from sklearn.preprocessing import StandardScaler
from sklearn.cluster import MiniBatchKMeans
from sklearn.cluster import KMeans
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import MinMaxScaler
import pickle
import matplotlib.pyplot as plt
# from keras.preprocessing.image import load_img 
import rasterfairy
model = keras.applications.VGG16(weights='imagenet', include_top=True)
feat_extractor = Model(inputs=model.input, outputs=model.get_layer("fc2").output)

file_name = "/content/drive/MyDrive/TARP/kmeans.pkl"
open_file = open(file_name, "rb")
kmeans = pickle.load(open_file)
open_file.close()
img = images[1]         # yaha image daalni hai
input_features = [] 
img = image.load_img(img, target_size=model.input_shape[1:3])
x = image.img_to_array(img)
x = np.expand_dims(x, axis=0)
x = preprocess_input(x)
feat = feat_extractor.predict(x)[0]
input_features.append(feat)

file_name = "/content/drive/MyDrive/TARP/ss.pkl"
open_file = open(file_name, "rb")
ss = pickle.load(open_file)
open_file.close()
input_scaled = ss.transform(input_features)

file_name = "/content/drive/MyDrive/TARP/umap_model.pkl"
open_file = open(file_name, "rb")
umap_model = pickle.load(open_file)
open_file.close()

input_embedding = umap_model.transform(input_scaled)

file_name = "/content/drive/MyDrive/TARP/scaler.pkl"
open_file = open(file_name, "rb")
input_scaler = pickle.load(open_file)
open_file.close()

input_embedding_scaled = input_scaler.transform(input_embedding)

input_cluster = kmeans.predict(input_embedding_scaled)

print(input_cluster)