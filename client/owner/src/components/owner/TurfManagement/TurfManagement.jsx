import { useEffect, useState } from "react";
import useTurfManagement from "@hooks/owner/useTurfManagement";
import EditTurfForm from "./EditTurfForm";
import TurfCardSkeleton from "./TurfCardSkeleton";
import TurfCard from "./TurfCard";
import { motion } from "framer-motion";

const TurfManagement = () => {
  const { turfs, isLoading, error, fetchTurfs, editTurf } = useTurfManagement();
  const [editingTurf, setEditingTurf] = useState(null);

  useEffect(() => {
    fetchTurfs();
  }, []);

  const handleEdit = (turf) => {
    setEditingTurf(turf);
  };

  const handleSaveEdit = (updatedTurf, turfId) => {
    editTurf(updatedTurf, turfId);
    setEditingTurf(null);
  };

  const handleCancelEdit = () => {
    setEditingTurf(null);
  };

  if (error) {
    return <div className="text-error text-center mt-8">{error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-[#1e293b] min-h-screen px-4 py-10 text-[#e2e8f0]"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8 text-[#e2e8f0] text-center tracking-tight">
          Turf Management
        </h1>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="w-full">
                <TurfCardSkeleton />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {turfs.map((turf) => (
              <motion.div
                key={turf.id}
                className="w-full"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 * turfs.indexOf(turf) }}
              >
                <TurfCard turf={turf} onEdit={() => handleEdit(turf)} />
              </motion.div>
            ))}
          </div>
        )}
        {editingTurf && (
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <EditTurfForm
              turf={editingTurf}
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default TurfManagement;
