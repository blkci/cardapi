import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Button, Card, Paragraph, Title } from 'react-native-paper';
import SafeAreaView from 'react-native-safe-area-view';


export default function App() {
  const baseURL = 'https://jsonplaceholder.typicode.com/users';
  const [data, setData] = useState([])


  useEffect(() => {

    axios.get(baseURL).then((res) => {
      setData(res.data)
    })


  }, [])
  function Delete({ id }) {
    axios.delete(baseURL + '/' + id).then((res) => console.log("deleted"))
  }

  function LeftContent(item) {
    return (
      <Avatar.Text
        label={`${item?.name.charAt(0)}`}
        color='white'
        size={50} />
    )
  }


  _renderItem = ({ item, index }) => {
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Title title={item.name + ' (' + item.username + ')'} subtitle={item.email} left={() => LeftContent(item)} />
          <Card.Content>
            <Text>Street: {item.address.street}  Suite:{item.address.suite}  City:{item.address.city}  Zipcode:{item.address.zipcode}</Text>
          </Card.Content>
          <Button style={styles.button} onPress={() => Delete(item.id)}>Delete</Button>
        </Card>
      </View>
    )
  }
  return (<SafeAreaView>
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={_renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#FFF',
  },
  item: {
    backgroundColor: 'orange',
    fontSize: 24,
  },
  card: {
    margin: '2%',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'blue',
    width: '80%',
    backgroundColor: '#ccc',
    fontSize: 24,
  },
  button: {
    alignSelf: 'flex-end',
    width: '30%',
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 0,
    borderColor: '#fff',
  }
});
