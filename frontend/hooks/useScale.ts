import { useWindowDimensions } from 'react-native';

const guidelineBaseWidth = 375;

export const useScale = () => {
  const { width } = useWindowDimensions();

  return (size) => (width / guidelineBaseWidth) * size;
};