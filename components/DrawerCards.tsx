import {
  Animated,
  Modal,
  PanResponder,
  PanResponderGestureState,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Text, View } from './Themed';

interface DrawerCardProps {
  translateYStart: Animated.Value;
  openPopup: boolean;
  setOpenPopup: (value: boolean) => void;
  animationType?: 'slide' | 'fade';
  style: any;
  children: JSX.Element;
}

export const DrawerCard = (props: DrawerCardProps) => {
  const { translateYStart, openPopup, setOpenPopup, animationType, style, children } = props;

  const closeStartPopup = () => {
    Animated.spring(translateYStart, {
      toValue: 400,
      useNativeDriver: false,
    }).start(() => setOpenPopup(false));
  };

  const onPanResponderReleaseStart = (e: any, gestureState: PanResponderGestureState) => {
    if (gestureState.dy > 50) {
      Animated.timing(translateYStart, {
        toValue: 300,
        duration: 100,
        useNativeDriver: false,
      }).start(() => closeStartPopup());
    } else {
      Animated.spring(translateYStart, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  };

  const panResponderStart = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dy: translateYStart }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: onPanResponderReleaseStart,
  });
  return (
    <Modal
      visible={openPopup}
      animationType={animationType}
      transparent={true}
      style={styles.modalContainer}
    >
      <View style={styles.modalContainer}>
        <Animated.View
          style={[style, { transform: [{ translateY: translateYStart }] }]}
          {...panResponderStart.panHandlers}
        >
          {/* <Text>Start Popup Content</Text>
          <Pressable style={styles.buttonStyle} onPress={closeStartPopup}>
            <Text>Close Popup</Text>
          </Pressable> */}
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  buttonStyle: {
    borderRadius: 10,
    backgroundColor: '#0077FF',
    padding: 15,
    margin: 5,
    alignItems: 'center',
  },
});

export default DrawerCard;
