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
    <div className="min-h-screen bg-emerald-mist/40 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-comfortaa gradient-text-emerald">
            AI Waste Scanner
          </h1>
          <p className="text-xl text-sage font-nunito">
            Take or upload a photo of your waste item to identify it
          </p>
        </motion.div>

        <div className="glass-ultra rounded-3xl p-8">
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
                  className="w-full h-96 object-contain rounded-2xl bg-emerald-mist/30"
                />
                <button
                  onClick={() => {
                    setPreview(null);
                    setSelectedImage(null);
                  }}
                  className="absolute top-4 right-4 glass-soft text-moss px-4 py-2 rounded-full hover:scale-105 transition-transform focus:outline-none focus:ring-0"
                >
                  Remove
                </button>
              </motion.div>
            ) : (
              <div className="border-2 border-dashed border-emerald-soft/40 rounded-2xl h-96 flex items-center justify-center bg-emerald-mist/20">
                <div className="text-center">
                  <Camera className="w-16 h-16 text-emerald-soft mx-auto mb-4 animate-float-soft" />
                  <p className="text-sage text-lg font-nunito">No image selected</p>
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
              className="flex-1 glass-mint text-moss px-6 py-4 rounded-full font-quicksand font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 focus:outline-none focus:ring-0"
            >
              <Upload className="w-5 h-5" />
              Upload Image
            </button>

            <button
              onClick={handleScan}
              disabled={!selectedImage || loading}
              className={`flex-1 px-6 py-4 rounded-full font-quicksand font-semibold transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-0 ${
                selectedImage && !loading
                  ? 'glass-ultra text-moss hover:scale-105'
                  : 'bg-emerald-mist/40 text-sage/60 cursor-not-allowed'
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
          <div className="mt-8 p-6 glass-soft rounded-2xl">
            <h3 className="font-bold text-lg mb-2 text-moss font-comfortaa">Tips for Best Results:</h3>
            <ul className="space-y-2 text-sage font-nunito">
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
