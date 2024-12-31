import { View, Image, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Color } from "@/constants/Colors";
import { SearchIcon } from "@/assets/icons";
import { NameRowCard, ThemedInput } from "@/components";
import { CARE_TAKERS } from "@/mock";

const SitterStep = () => {
  
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

      <View style={styles.rowCards}>
        <ThemedInput
          iconLeft={<SearchIcon />}
          placeholder={"Search by name, tag, email..."}
        />
        <ThemedText
          fontSize={14}
          color={Color.grey[800]}
          style={{ marginVertical: 16 }}
          type="Semibold"
        >
          Added Contacts
        </ThemedText>

        <View style={{ rowGap: 16 }}>
          {CARE_TAKERS.map((data) => {
            return <NameRowCard data={data} />;
          })}
        </View>
      </View>
    </View>
  );
};

export default SitterStep;
export const styles = StyleSheet.create({
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
  rowCards: {
    width: "100%",
    paddingHorizontal: 24,
    marginTop: 24,
  },
});
