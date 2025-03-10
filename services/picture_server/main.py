from flask import Flask, request, send_from_directory, jsonify
import os
import random as rd

# Initialize Flask app
app = Flask(__name__)

# Directory to save uploaded images
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Configure upload folder
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def upload_image():
    """Endpoint to upload an image."""
    if 'image' not in request.files:
        return jsonify({"error": "No image file found in request."}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({"error": "No file selected."}), 400

    # Save the file
    filneName = str(rd.randint(0,1000))+ file.filename
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)

    while os.path.isfile(file_path):
        filneName = str(rd.randint(0,1000))+ filneName
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filneName)

    file.save(file_path)
    return jsonify({"message": "File uploaded successfully.", "filename": filneName}), 200

@app.route('/image/<filename>', methods=['GET'])
def get_image(filename):
    """Endpoint to retrieve an image by filename."""
    try:
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
    except FileNotFoundError:
        return jsonify({"error": "File not found."}), 404

@app.route('/')
def index():
    return jsonify({
        "message": "Welcome to the Image Server!",
        "routes": {
            "POST /upload": "Upload an image using the 'image' form field.",
            "GET /image/<filename>": "Retrieve an uploaded image by its filename."
        }
    })

if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0",port=5000)
