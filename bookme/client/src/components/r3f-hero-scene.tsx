import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import { motion } from 'framer-motion-3d';

export default function R3FHeroScene() {
  return (
    <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <motion.mesh
        animate={{ rotateY: 6.28 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        <Box args={[1.5, 1.5, 1.5]}>
          <meshStandardMaterial color="#3B82F6" />
        </Box>
      </motion.mesh>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}
