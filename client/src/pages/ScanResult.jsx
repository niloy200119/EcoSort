import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Trash2, Recycle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

const ScanResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  useEffect(() => {
    if (!result) {
      navigate('/scanner');
    }
  }, [result, navigate]);

  if (!result) return null;

  const getDisposalIcon = (method) => {
    switch (method.toLowerCase()) {
      case 'recycle':
        return <Recycle className="w-16 h-16 text-green-500" />;
      case 'compost':
        return <CheckCircle className="w-16 h-16 text-green-600" />;
      case 'trash':
        return <Trash2 className="w-16 h-16 text-red-500" />;
      default:
        return <AlertCircle className="w-16 h-16 text-yellow-500" />;
    }
  };

  const getMethodColor = (method) => {
    switch (method.toLowerCase()) {
      case 'recycle':
        return 'bg-green-100 border-green-500 text-green-800';
      case 'compost':
        return 'bg-green-100 border-green-600 text-green-900';
      case 'trash':
        return 'bg-red-100 border-red-500 text-red-800';
      default:
        return 'bg-yellow-100 border-yellow-500 text-yellow-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/scanner')}
          className="flex items-center gap-2 text-primary hover:text-dark mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Scan Another Item
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Result Header */}
          <div className="bg-primary text-white p-8 text-center">
            <div className="flex justify-center mb-4">
              {getDisposalIcon(result.disposalMethod)}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Item Identified!
            </h1>
            <p className="text-xl opacity-90">
              {result.itemType}
            </p>
          </div>

          {/* Details Section */}
          <div className="p-8">
            {/* Disposal Method */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Disposal Method
              </h2>
              <div className={`border-4 rounded-lg p-6 ${getMethodColor(result.disposalMethod)}`}>
                <p className="text-2xl font-bold text-center">
                  {result.disposalMethod.toUpperCase()}
                </p>
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Instructions
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {result.instructions}
                </p>
              </div>
            </div>

            {/* Additional Info */}
            {result.additionalInfo && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                  Additional Information
                </h2>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
                  <p className="text-gray-700">
                    {result.additionalInfo}
                  </p>
                </div>
              </div>
            )}

            {/* Environmental Impact */}
            {result.impact && (
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2 text-primary flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Environmental Impact
                </h3>
                <p className="text-gray-700">
                  {result.impact}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/map')}
                className="flex-1 bg-secondary text-white px-6 py-4 rounded-lg font-semibold hover:bg-primary transition-colors"
              >
                Find Recycling Center
              </button>
              <button
                onClick={() => navigate('/scanner')}
                className="flex-1 bg-primary text-white px-6 py-4 rounded-lg font-semibold hover:bg-dark transition-colors"
              >
                Scan Another Item
              </button>
            </div>
          </div>
        </motion.div>

        {/* Points Earned */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6 text-center shadow-lg"
        >
          <p className="text-2xl font-bold text-gray-900 mb-2">
            🎉 +10 Impact Points Earned!
          </p>
          <p className="text-gray-800">
            Keep scanning to earn more rewards and help the environment!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ScanResult;
