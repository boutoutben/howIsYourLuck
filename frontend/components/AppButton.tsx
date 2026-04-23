import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from './themed-text';


export default function AppButton({ title, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button]}
    >
      <ThemedText style={styles.text}>
        {title}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#E9C46A",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth:2,
  },
  text: {
    color: 'black',
    fontSize: 18,

  },

});