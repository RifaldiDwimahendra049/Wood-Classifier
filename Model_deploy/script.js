// Memuat model saat halaman website dibuka
document.addEventListener('DOMContentLoaded', function () {
    // Lakukan load model
    tf.loadLayersModel('http://localhost:8000/wood_classifier_model(95.56)/model.json')
        .then(function (loadedModel) {
            model = loadedModel;
            console.log('Berhasil memuat model:');
            // Menambahkan event listener pada form untuk melakukan klasifikasi saat submit
            var form = document.getElementById('classificationForm');
            var imageFileInput = document.getElementById('imageFile');
            imageFileInput.addEventListener('change', handleImageSelect);
        })
        .catch(function (error) {
            console.log('Gagal memuat model:', error);
        });
});

// Fungsi untuk menampilkan gambar yang dipilih di dalam wadah
function displaySelectedImage(image) {
    var selectedImageContainer = document.getElementById('selectedImageContainer');
    selectedImageContainer.style.display = 'block';
    selectedImageContainer.innerHTML = '';
  
    var selectedImage = document.createElement('img');
    selectedImage.src = image.src;
    selectedImage.classList.add('selected-image');
  
    selectedImageContainer.appendChild(selectedImage);
}

// Fungsi untuk melakukan preprocessing gambar sebelum prediksi
function preprocessImage(image) {
    // Ubah gambar menjadi tensor dan normalisasi nilai pikselnya
    var tensor = tf.browser.fromPixels(image)
        .resizeNearestNeighbor([255, 255])
        .toFloat()
        .div(tf.scalar(255))
        .expandDims();

    return tensor;
}

// Fungsi untuk mengirim gambar ke server dan menerima hasil klasifikasi
function classifyImage(event) {
    event.preventDefault();

    // Mengambil file gambar yang dipilih
    var imageFile = document.getElementById('imageFile').files[0];
    var reader = new FileReader();

    // Membaca file gambar sebagai URL data
    reader.onload = function (event) {
        var image = new Image();
        image.onload = function () {
            // Menampilkan gambar yang dipilih di dalam wadah
            displaySelectedImage(image);

            // Lakukan preprocessing gambar
            var tensor = preprocessImage(image);

            // Lakukan prediksi menggunakan model yang telah dimuat
            var prediction = model.predict(tensor);
            console.log(prediction);

            // Mengambil hasil prediksi
            var result = prediction.arraySync()[0];
            var maxIndex = result.indexOf(Math.max(...result));
            var classNames = ['Nantu', 'Palapi', 'Uru'];
            var predictedClass = classNames[maxIndex];
            console.log(predictedClass);

            // Menampilkan hasil prediksi
            document.getElementById('result').innerHTML = + predictedClass;
        };
        image.src = event.target.result;
    };
    reader.readAsDataURL(imageFile);
}

function handleImageSelect(event) {
    var imageFile = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
        var image = new Image();
        image.onload = function() {
            displaySelectedImage(image);
            var tensor = preprocessImage(image);
            var prediction = model.predict(tensor);
            var result = prediction.arraySync()[0];
            var maxIndex = result.indexOf(Math.max(...result));
            var classNames = ['Nantu', 'Palapi', 'Uru'];
            var predictedClass = classNames[maxIndex];
            var confidence = result[maxIndex] * 100;
            console.log(predictedClass);
            console.log(confidence);
            document.getElementById('result').innerHTML = 'Jenis Kayu :'+ predictedClass;
            document.getElementById('confidenceResult').innerHTML = 'Confidence : ' + confidence.toFixed(2) + '%';
        };
        image.src = event.target.result;
    };
    reader.readAsDataURL(imageFile);
}