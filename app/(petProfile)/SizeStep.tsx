import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { Color } from "@/constants/Colors";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  runOnJS,
  withSpring,
} from "react-native-reanimated";
import usePetStore from "@/store/usePetStore";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = 140;
const CARD_SPACING = 20;
const CARD_OFFSET = (SCREEN_WIDTH - CARD_WIDTH) / 2;

const sizes = [
  { id: 1, label: "Small", weight: "under 14kg", icon: "🐕" },
  { id: 2, label: "Medium", weight: "14-25kg", icon: "🐕" },
  { id: 3, label: "Large", weight: "over 25kg", icon: "🐕" },
];

const SizeStep = () => {
  const scrollX = useSharedValue(0);
  const scrollViewRef = React.useRef<Animated.ScrollView>(null);
  const [selectedSize, setSelectedSize] = React.useState(2);
  const isScrolling = useSharedValue(false);
  const { updateStageData } = usePetStore();

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      centerCard(1);
    }, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  const updateSelectedSize = (offset: number) => {
    const slideSize = CARD_WIDTH + CARD_SPACING / 2;
    const centerIndex = Math.round(offset / slideSize);
    if (centerIndex >= 0 && centerIndex < sizes.length) {
      setSelectedSize(sizes[centerIndex].id);
    }
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
      runOnJS(updateSelectedSize)(event.contentOffset.x);
    },
    onBeginDrag: () => {
      isScrolling.value = true;
    },
    onEndDrag: () => {
      isScrolling.value = false;
    },
    onMomentumEnd: () => {
      isScrolling.value = false;
    },
  });

  const centerCard = (index) => {
    if (scrollViewRef.current) {
      const xOffset = index * (CARD_WIDTH + CARD_SPACING / 2);
      scrollViewRef.current.scrollTo({
        x: xOffset,
        animated: true,
      });
    }
  };

  const handleSelectSize = (item, index) => {
    setSelectedSize(item.id);
    centerCard(index);
    console.log(item, "here is the size again");
    updateStageData("size", { size: item.label, weight: item.weight });
  };

  const SizeCard = ({ item, index }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const inputRange = [
        (index - 1) * (CARD_WIDTH + CARD_SPACING / 2),
        index * (CARD_WIDTH + CARD_SPACING / 2),
        (index + 1) * (CARD_WIDTH + CARD_SPACING / 2),
      ];

      const scale = interpolate(
        scrollX.value,
        inputRange,
        [0.8, selectedSize === item.id ? 1.1 : 1, 0.8],
        "clamp"
      );

      const opacity = interpolate(
        scrollX.value,
        inputRange,
        [0.5, 1, 0.5],
        "clamp"
      );

      return {
        transform: [
          {
            scale: withSpring(scale, {
              mass: 0.5,
              damping: 15,
              stiffness: 100,
            }),
          },
        ],
        opacity: withTiming(opacity, { duration: 150 }),
      };
    });

    return (
      <TouchableOpacity
        onPress={() => {
          if (!isScrolling.value) {
            runOnJS(handleSelectSize)(item, index);
          }
        }}
        activeOpacity={0.9}
      >
        <Animated.View style={[styles.sizeCard, animatedStyle]}>
          <View
            style={[
              styles.cardContent,
              selectedSize === item.id && styles.selectedCard,
            ]}
          >
            <View
              style={{
                backgroundColor: Color.blue[100],
                height: 55,
                width: 55,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 55 / 2,
                marginBottom: 12,
              }}
            >
              <Text style={styles.icon}>{item.icon}</Text>
            </View>
            <ThemedText
              color={
                selectedSize === item.id ? Color.blue[500] : Color.grey[800]
              }
              fontSize={16}
              style={styles.cardLabel}
            >
              {item.label}
            </ThemedText>
            <ThemedText
              color={
                selectedSize === item.id ? Color.blue[300] : Color.grey[800]
              }
              fontSize={14}
            >
              {item.weight}
            </ThemedText>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle}>
            <Image
              source={require("@/assets/images/dogPlaceholder.png")}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>

      <View style={styles.textContainer}>
        <ThemedText color={Color.grey[800]} fontSize={14} style={styles.label}>
          What's your pet's size?
        </ThemedText>
        <ThemedText
          color={Color.grey[700]}
          fontSize={12}
          lineHeight={20}
          style={styles.subtitle}
        >
          Automatic selection based on your pets breed. Adjust according to
          reality
        </ThemedText>
      </View>

      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + CARD_SPACING / 2}
        decelerationRate="fast"
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: SCREEN_WIDTH / 2 - CARD_WIDTH / 2 },
        ]}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {sizes.map((size, index) => (
          <SizeCard key={size.id} item={size} index={index} />
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default SizeStep;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
  },
  circleContainer: {
    marginTop: 20,
  },
  outerCircle: {
    width: 166,
    height: 166,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: Color.grey[150],
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 133,
    height: 133,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: Color.grey[150],
    padding: 16,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 200,
  },
  textContainer: {
    width: "100%",
    marginTop: 24,
    marginBottom: 40,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    paddingHorizontal: 24,
  },
  scrollContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  sizeCard: {
    width: CARD_WIDTH,
    marginHorizontal: CARD_SPACING / 6,
  },
  cardContent: {
    backgroundColor: "#ffffff",
    paddingVertical: 28,
    borderRadius: 12,
    shadowColor: Color.grey[300],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Color.grey[150],
  },
  selectedCard: {
    borderColor: Color.blue[500],
    borderWidth: 2,
  },
  icon: {
    fontSize: 24,
    marginBottom: 8,
  },
  cardLabel: {},
});
