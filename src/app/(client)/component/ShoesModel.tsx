import { useGLTF } from '@react-three/drei';
import { Group } from 'three';

interface ShoeModelProps {
  url: string;
  scale?: number;
}

type GLTFResult = {
  scene: Group;
};

export const ShoeModel = ({ url, scale = 2 }: ShoeModelProps) => {
  const { scene } = useGLTF(url) as GLTFResult;
  return <primitive object={scene} scale={scale} />;
};

useGLTF.preload('/models/shoes1.glb');
