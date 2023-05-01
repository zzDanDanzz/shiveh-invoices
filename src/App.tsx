import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  usePDF,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

const App = () => {
  const [instance] = usePDF({ document: <MyDocument /> });

  if (instance.loading) return <div>Loading ...</div>;

  if (instance.error) return <div>Something went wrong: {instance.error}</div>;

  return (
    <button
      onClick={() => {
        if (!instance.blob) return;
        const fileURL = URL.createObjectURL(instance.blob);
        //Open the URL on new Window
        const pdfWindow = window.open();
        if (!pdfWindow) return console.error("No window?");
        pdfWindow.location.href = fileURL;
      }}
    >
      Download
    </button>
  );
};
export default App;
