import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Scanner = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = async () => {
    if (!selectedImage) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      // Call the mock AI endpoint
      const response = await axios.post('http://localhost:5000/api/scan', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Navigate to result page with the AI response
      navigate('/scan-result', { state: { result: response.data } });
    } catch (error) {
      console.error('Scan error:', error);
      alert('Failed to scan the item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI Waste Scanner
          </h1>
          <p className="text-xl text-gray-600">
            Take or upload a photo of your waste item to identify it
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Preview Area */}
          <div className="mb-8">
            {preview ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-96 object-contain rounded-lg bg-gray-100"
                />
                <button
                  onClick={() => {
                    setPreview(null);
                    setSelectedImage(null);
                  }}
                  className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </motion.div>
            ) : (
              <div className="border-4 border-dashed border-gray-300 rounded-lg h-96 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No image selected</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              className="hidden"
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 bg-secondary text-white px-6 py-4 rounded-lg font-semibold hover:bg-primary transition-colors flex items-center justify-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Upload Image
            </button>

            <button
              onClick={handleScan}
              disabled={!selectedImage || loading}
              className={`flex-1 px-6 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                selectedImage && !loading
                  ? 'bg-primary text-white hover:bg-dark'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Camera className="w-5 h-5" />
                  Scan Item
                </>
              )}
            </button>
          </div>

          {/* Info Section */}
          <div className="mt-8 p-6 bg-green-50 rounded-lg">
            <h3 className="font-bold text-lg mb-2 text-gray-900">Tips for Best Results:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Ensure good lighting when taking the photo</li>
              <li>• Place the item on a plain background</li>
              <li>• Take the photo from a close distance</li>
              <li>• Make sure the item is clearly visible</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scanner;
