import { useState } from "react";
import AppButton from "./AppButton";
import { Modal } from "react-native";

const [visible, setVisible] = useState(false);

<AppButton
  title="Ajouter un accomplissement"
  onPress={() => setVisible(true)}
/>

<Modal
  visible={visible}
  transparent
  animationType="fade"
>
  <View style={styles.overlay}>
    <View style={styles.alertbox}>
      {/* Formulaire */}

      <AppButton
        title="Fermer"
        onPress={() => setVisible(false)}
      />
    </View>
  </View>
</Modal>