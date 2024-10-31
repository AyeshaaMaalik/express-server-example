import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const API_URL = 'http://192.168.100.2:5000/api'; // Change this to your server's IP

const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [products, setProducts] = useState([]);

    // Register user
    const registerUser = () => {
        axios.post(`${API_URL}/register`, { username, password })
            .then(response => {
                Alert.alert('Success', response.data.message);
            })
            .catch(error => {
                Alert.alert('Error', error.response.data.message);
            });
    };

    // Login user
    const loginUser = () => {
        axios.post(`${API_URL}/login`, { username, password })
            .then(response => {
                Alert.alert('Success', response.data.message);
            })
            .catch(error => {
                Alert.alert('Error', error.response.data.message);
            });
    };

    // Fetch products
    const fetchProducts = () => {
        axios.get(`${API_URL}/products`)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                Alert.alert('Error', 'Failed to fetch products');
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Registration & Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Register" onPress={registerUser} />
            <Button title="Login" onPress={loginUser} />
            <Button title="Fetch Products" onPress={fetchProducts} />

            <FlatList
                data={products}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.productItem}>
                        <Text>{item.name} - ${item.price}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    productItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default App;
