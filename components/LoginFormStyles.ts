import { StyleSheet } from "react-native";

// Enheten som används i Stylesheet.create i React Native är dp eller dip (density-independent pixels).
// Det är ett abstrakt mått som fungerar oavsett skärmupplösning eller pixeltäthet.
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  toggleContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
  toggleText: {
    color: "#007AFF",
    paddingLeft: 5,
  },
  error: {
    marginTop: 10,
    color: "red",
  },
  toggleTextWhite: {
    color: "white",
  },
  toggleTextBlack: {
    color: "Black",
  },
  disabledButton: {
    backgroundColor: "gray",
    color: "white",
  },
});

export default styles;
