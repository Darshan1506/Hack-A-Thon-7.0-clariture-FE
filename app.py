from flask import Flask, render_template, Response
# from flask_ngrok import run_with_ngrok
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
import numpy as np
import cv2
import time
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from twilio.rest import Client

app = Flask(__name__)
# run_with_ngrok(app)
url = "http://192.168.137.242:8080/video"

account_sid = 'ACffc287f021545f77a458481e94549e76'
auth_token = '2c9be3e747788e60f4c5557690301326'

# loading the stored model from file
model=load_model(r"C:\Users\saibh\Desktop\RJ HACK\upload\Fire-64x64-color-v7-soft.h5")

cap = cv2.VideoCapture(0)  # use 0 for web camera

time.sleep(2)

IMG_SIZE = 64

client = Client(account_sid, auth_token)


def gen_frames(): 
    while True:

        rval, image = cap.read()
        if image is None:
            break

        # imgResult = img.copy()

        orig = image.copy()
        image = cv2.resize(image, (IMG_SIZE, IMG_SIZE))  
        image = image.astype("float") / 255.0
        image = img_to_array(image)
        image = np.expand_dims(image, axis=0)
        
        tic = time.time()
        fire_prob = model.predict(image)[0][0] * 100
        toc = time.time()
        # print("Time taken = ", toc - tic)
        # print("FPS: ", 1 / np.float64(toc - tic))
        # print("Fire Probability: ", fire_prob)
        # print("Predictions: ", model.predict(image))
        # print(image.shape)

        while(fire_prob >=95):
            message = client.messages.create(
                              from_='+15177935675',
                              body = 'Anomaly is detected do cheak your CCTV feed on https://hack-a-thon-7-0-clariture-fe.vercel.app/',
                              to ='+919004178762'
                          )
            print("detected fire")
            time.sleep(2)
            break
        
        # label = "Fire Probability: " + str(fire_prob)
        # cv2.putText(orig, label, (10, 25),  cv2.FONT_HERSHEY_SIMPLEX,0.7, (0, 255, 0), 2)
        if not rval:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', orig)
            orig = buffer.tobytes()
            yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + orig + b'\r\n')  # concat frame one by one and show result


@app.route('/video_feed')
def video_feed():
    #Video streaming route. Put this in the src attribute of an img tag
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary= --frame')


@app.route('/')
def index():
    """Video streaming home page."""
    return render_template('index.html')


if __name__ == '__main__':
    app.run()