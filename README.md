<!DOCTYPE html>
<html>
<head>
    <title>Klasifikasi Jenis Kayu</title>
    <style>
        .container {
            width: 400px;
            margin: auto;
            padding: 20px;
            text-align: center;
        }

        .form-group {
            margin-bottom: 15px;
        }

        .form-group label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .form-group input[type="file"],
        .form-group input[type="submit"] {
            width: 100%;
            padding: 10px;
            font-size: 16px;
        }

        .form-group input[type="submit"] {
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
        }

        .result {
            font-weight: bold;
            padding: 10px;
            background-color: rgb(139, 245, 171);
            height: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .selected-image {
            width: 200px;
            height: 200px;
            margin: 5px;
            border: 1px solid #000000;
        }

        #selectedImageContainer {
            width: 212px; 
            height: 212px;
            margin: 0 auto;
            background-color: rgb(195, 199, 211);
            display: flex;
            justify-content: center;
            align-items: center;
        }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.11.0/dist/tf.min.js" type="text/javascript"> </script>
</head>
<body>
    <div class="container">
        <h1>Klasifikasi Jenis Kayu</h1>

        <form id="classificationForm" action="#" method="post" enctype="multipart/form-data">
            <div class="form-group">
                <input type="file" id="imageFile" name="imageFile" accept="image/*" required>
                <div id="selectedImageContainer"> citra kayu</div>
                <label>Hasil :</label>
                <div id="result" class="result">Jenis Kayu :</div>
                <div id="confidenceResult" class="result">Confidence : </div>
            </div>
        </form>
    </div>

    <script src="script.js"></script>
</body>
</html>
