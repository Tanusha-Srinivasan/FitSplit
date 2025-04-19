import { useContext } from 'react';
import { motion } from 'framer-motion';
import { Activity, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ConsistencyContext from '../context/ConsistencyContext'; // Ensure correct path
import LoadingState from '../components/LoadingState';      // Ensure correct path
import BeginnerSplit from '../components/splits/BeginnerSplit'; // Ensure correct path
import IntermediateSplit from '../components/splits/IntermediateSplit'; // Ensure correct path
import AdvancedSplit from '../components/splits/AdvancedSplit'; // Ensure correct path
import Card from '../components/ui/Card';                 // Ensure correct path

const SplitPage = () => {
  // Destructure context, getting userData and loading state
  const { userData, loading } = useContext(ConsistencyContext);
  // Get score from userData
  const { score } = userData;

  // --- Animation Variants --- (Keep these)
   const pageVariants = {
      initial: { opacity: 0, y: 20 },
      in: { opacity: 1, y: 0 },
      out: { opacity: 0, y: -20 }
   };
   const transition = { duration: 0.4, ease: 'easeInOut' };
   // --- End Animation Variants ---

  const renderWorkoutSplit = () => {
    // Check score after loading is complete
    if (score === null || score === undefined) {
        // Handle case where score is not available (e.g., after failed fetch)
        return (
            <Card className="p-6 text-center">
                <p className="text-orange-600">Workout split information is currently unavailable.</p>
            </Card>
        );
    }

    if (score >= 80) {
      return <AdvancedSplit />;
    } else if (score >= 40) {
      return <IntermediateSplit />;
    } else {
      return <BeginnerSplit />;
    }
  };

  return (
    <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={transition}
        className="container mx-auto px-4 py-8"
    >
       {/* Back Link */}
       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
         <Link to="/" className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800 mb-6 group font-medium">
           <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
           Back to Dashboard
         </Link>
       </motion.div>

       {/* Page Header */}
       <motion.h1
           initial={{ opacity: 0, y: -10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="flex items-center text-3xl font-bold text-gray-800 mb-8"
       >
         <Activity className="mr-3 text-indigo-600" size={30}/>
         Your Recommended Workout Split
       </motion.h1>

       {/* Loading State */}
       {loading ? (
         <Card className="flex items-center justify-center min-h-[400px]">
            <LoadingState message="Determining Your Split..." />
         </Card>
       ) : (
           // Render the split component based on score
           renderWorkoutSplit()
       )}
    </motion.div>
  );
};

export default SplitPage;