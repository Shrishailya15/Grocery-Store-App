import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import AllItems from './AllItems';
import CreateScreen from './CreateScreen';
import { API_URL } from '@env';

const HomeScreen = () => {
    const [view, setview] = useState(0)
    const [data, setdata] = useState([]);

    const fetchItems = async () => {
        try {
            const response = await fetch(API_URL);
            console.log(response)
            const items = await response.json();
            console.log(items)
            if (items.length < 0)
                console.error("no data found")
            setdata(items);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
            <View style={styles.buttonContainer}>
                <Pressable style={[styles.button, view === 0 ? { backgroundColor: "#72C37AFF" } : null]} onPress={() => setview(0)}>
                    <Text style={[styles.btnText, view === 0 ? { color: "white" } : null]}>All Item</Text>
                </Pressable>
                <Pressable style={[styles.button, view === 1 ? { backgroundColor: "#72C37AFF" } : null]} onPress={() => setview(1)}>
                    <Text style={[styles.btnText, view === 1 ? { color: "white" } : null]}>Low Stock</Text>
                </Pressable>
                <Pressable style={[styles.button, view === 2 ? { backgroundColor: "#72C37AFF" } : null]} onPress={() => setview(2)}>
                    <Text style={[styles.btnText, view === 2 ? { color: "white" } : null]}>Create</Text>
                </Pressable>
            </View>

            {view === 0 && <AllItems data={data} />}
            {view === 1 && <AllItems data={data.filter((item) => item.stock < 20)} />}
            {view === 2 && <CreateScreen data={data} setdata={setdata} fetchItems={fetchItems} />}
        </View>

    )
}

export default HomeScreen

//Creating the style sheet to avoid the creation of the object again and again.
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        padding: "4%",
        backgroundColor: "#ffffff"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 10,
        marginVertical: 10
    },
    button: {
        paddingVertical: 3.5,
        paddingHorizontal: 10,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#72C37AFF",
    },
    btnText: {
        color: "green",
        fontSize: 12
    }
})

